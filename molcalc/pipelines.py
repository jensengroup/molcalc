from io import StringIO
import datetime
import hashlib
import os

import numpy as np
from pyramid.view import notfound_view_config, view_config

import models

from chemhelp import cheminfo
from chemhelp.chemistry import gamess


def gamess_quantum_view(calculation):

    # The viewers want to read in Joules
    calories_to_joule = 4.186798
    hartree_to_ev = 27.2114

    # enthalpy = Column(Float)
    # charges = Column(String)
    #
    # islinear = Column(String)
    # vibjsmol = Column(String)
    # vibfreq = Column(String)
    # vibintens = Column(String)
    #
    # thermo = Column(String)
    #
    # orbitals = Column(String)
    # orbitalstxt = Column(String)
    #
    # soltotal = Column(Float)
    # solpolar = Column(Float)
    # solnonpolar = Column(Float)
    # solsurface = Column(Float)
    # soldipole = Column(String)
    # soldipoletotal = Column(Float)

    data = calculation.__dict__

    if calculation.name is None:
        data["name"] = calculation.smiles
    else:
        data["name"] = calculation.name

    data["svg"] = data["svg"].replace("<?xml version='1.0' encoding='iso-8859-1'?>", "")

    fmt = "{:.2f}"

    data["enthalpy"] = fmt.format(data["enthalpy"]*calories_to_joule)

    #               E         H         G         CV        CP        S
    #            KJ/MOL    KJ/MOL    KJ/MOL   J/MOL-K   J/MOL-K   J/MOL-K
    #  ELEC.      0.000     0.000     0.000     0.000     0.000     0.000
    #  TRANS.     3.718     6.197   -36.542    12.472    20.786   143.348
    #  ROT.       3.718     3.718   -15.045    12.472    12.472    62.932
    #  VIB.     119.279   119.279   119.164     2.252     2.252     0.385
    #  TOTAL    126.716   129.194    67.577    27.195    35.509   206.665
    #  VIB. THERMAL CORRECTION E(T)-E(0) = H(T)-H(0) =        99.870 J/MOL

    thermotable = calculation.thermo
    thermotable = load_array(thermotable)

    data["h_elect"] = fmt.format(thermotable[0,1])
    data["h_trans"] = fmt.format(thermotable[1,1])
    data["h_rotat"] = fmt.format(thermotable[2,1])
    data["h_vibra"] = fmt.format(thermotable[3,1])
    data["h_total"] = fmt.format(thermotable[4,1])

    data["cp_elect"] = fmt.format(thermotable[0,4])
    data["cp_trans"] = fmt.format(thermotable[1,4])
    data["cp_rotat"] = fmt.format(thermotable[2,4])
    data["cp_vibra"] = fmt.format(thermotable[3,4])
    data["cp_total"] = fmt.format(thermotable[4,4])

    data["s_elect"] = fmt.format(thermotable[0,5])
    data["s_trans"] = fmt.format(thermotable[1,5])
    data["s_rotat"] = fmt.format(thermotable[2,5])
    data["s_vibra"] = fmt.format(thermotable[3,5])
    data["s_total"] = fmt.format(thermotable[4,5])


    # Molecular orbitals format
    data["orbitals"] = load_array(data["orbitals"])
    data["orbitals"] *= hartree_to_ev
    data["orbitals"] = [fmt.format(x) for x in data["orbitals"]]


    # Vibrational Frequencies format
    data["vibfreq"] = load_array(data["vibfreq"])
    islinear = int(data["islinear"]) == int(1)
    offset = 5
    if not islinear:
        offset = 6
    data["vibfreq"] = data["vibfreq"][offset:]
    data["vibfreq"] = [fmt.format(x) for x in data["vibfreq"]]
    data["viboffset"] = offset


    dipoles = load_array(data["soldipole"])

    data["dipolex"] = dipoles[0]
    data["dipoley"] = dipoles[1]
    data["dipolez"] = dipoles[2]

    data["soltotal"] = fmt.format(data["soltotal"]*calories_to_joule)
    data["solpolar"] = fmt.format(data["solpolar"]*calories_to_joule)
    data["solnonpolar"] = fmt.format(data["solnonpolar"]*calories_to_joule)
    data["solsurface"] = fmt.format(data["solsurface"])
    data["soldipoletotal"] = fmt.format(data["soldipoletotal"])



    charges = load_array(data["charges"])

    charge = sum(charges)
    charge = np.round(charge, decimals=0)

    data["charge"] = int(charge)

    return data


def load_array(txt):

    s = StringIO(txt)
    arr = np.loadtxt(s)

    return arr


def save_array(arr):

    s = StringIO()
    np.savetxt(s, arr)

    return s.getvalue()


def gamess_quantum_pipeline(request, molinfo):
    """

    Assumed that rdkit understands the molecule

    """

    # Read input
    molobj = molinfo["molobj"]
    sdfstr = molinfo["sdfstr"]

    if "name " in request.POST:
        name = request.POST["name"].encode('utf-8')
    else:
        name = None

    # Get that smile on your face
    smiles = cheminfo.molobj_to_smiles(molobj, remove_hs=True)

    # hash on sdf (conformer)
    hshobj = hashlib.md5(sdfstr.encode())
    hashkey = hshobj.hexdigest()

    # Start respond message
    msg = {
        "smiles" : smiles,
        "hashkey" : hashkey
    }


    # Check if calculation already exists
    if False:
        calculation = request.dbsession.query(models.GamessCalculation) \
            .filter_by(hashkey=hashkey).first()

        if calculation is not None:
            calculation.created = datetime.datetime.now()
            return msg


    # Create new calculation
    calculation = models.GamessCalculation()

    # check if folder exists
    here = os.path.abspath(os.path.dirname(__file__)) + "/"
    datahere = here + "data/"

    if not os.path.isdir(datahere + hashkey):
        os.mkdir(datahere + hashkey)

    os.chdir(datahere + hashkey)

    # GAMESS DEBUG

    # Optimize molecule

    gmsargs = {
        "scr" : datahere+hashkey,
        "autoclean": True,
        "debug": False,
    }
    properties = gamess.calculate_optimize(molobj, **gmsargs)

    if properties is None:
        return {'error':'Error g-80 - gamess optimization error', 'message': "Error. Server was unable to optimize molecule"}

    print(smiles, list(properties.keys()))

    # Save and set coordinates
    coord = properties["coord"]
    calculation.coordinates = save_array(coord)
    calculation.enthalpy = properties["h"]
    cheminfo.molobj_set_coordinates(molobj, coord)

    # Vibrate molecule
    header = """
 $basis
     gbasis=PM3
 $end

 $contrl
    scftyp=RHF
    runtyp=hessian
    icharg={:}
    maxit=60
 $end
"""

    stdout, status = gamess.calculate(molobj, header, **gmsargs)
    properties = gamess.read_properties_vibration(stdout)

    if properties is None:
        return {'error':'Error g-104 - gamess vibration error', 'message': "Error. Server was unable to vibrate molecule"}

    print(smiles, list(properties.keys()))

    calculation.islinear = properties["linear"]
    calculation.vibjsmol = properties["jsmol"]
    calculation.vibfreq = save_array(properties["freq"])
    calculation.vibintens = save_array(properties["intens"])
    calculation.thermo = save_array(properties["thermo"])

    #

    header = """
 $contrl
 coord=cart
 units=angs
 scftyp=rhf
 icharg={:}
 maxit=60
 $end
 $basis gbasis=sto ngauss=3 $end
"""

    stdout, status = gamess.calculate(molobj, header, **gmsargs)
    properties = gamess.read_properties_orbitals(stdout)

    if properties is None:
        return {'error':'Error g-128 - gamess orbital error', 'message': "Error. Server was unable to orbital the molecule"}

    print(smiles, list(properties.keys()))
    calculation.orbitals = save_array(properties["orbitals"])
    calculation.orbitalstxt = stdout

    #

    header = """
 $system
    mwords=125
 $end
 $basis
    gbasis=PM3
 $end
 $contrl
    scftyp=RHF
    runtyp=energy
    icharg={:}
 $end
 $pcm
    solvnt=water
    mxts=15000
    icav=1
    idisp=1
 $end
 $tescav
    mthall=4
    ntsall=60
 $end

"""

    #

    stdout, status = gamess.calculate(molobj, header, **gmsargs)
    properties = gamess.read_properties_solvation(stdout)

    if properties is None:
        return {'error':'Error g-159 - gamess solvation error', 'message': "Error. Server was unable to run solvation calculation"}

    # 'charges', 'solvation_total', 'solvation_polar', 'solvation_nonpolar',
    # 'surface', 'total_charge', 'dipole', 'dipole_total'
    print(smiles, list(properties.keys()))

    charges = properties["charges"]

    calculation.charges = save_array(charges)
    calculation.soltotal = properties["solvation_total"]
    calculation.solpolar = properties["solvation_polar"]
    calculation.solnonpolar = properties["solvation_nonpolar"]
    calculation.solsurface = properties["surface"]
    calculation.soldipole = save_array(properties["dipole"])
    calculation.soldipoletotal = properties["dipole_total"]

    # GAMESS DEBUG

    os.chdir(here)

    # Saveable sdf and reset title
    sdfstr = cheminfo.molobj_to_sdfstr(molobj)
    sdfstr = str(sdfstr)
    for _ in range(2):
        i = sdfstr.index('\n')
        sdfstr = sdfstr[i+1:]
    sdfstr = "\n\n" + sdfstr

    # Save mol2 fmt

    mol2 = cheminfo.molobj_to_mol2(molobj, charges=charges)
    calculation.mol2 = mol2

    # Get a 2D Picture
    # TODO Compute 2D coordinates
    svgstr = cheminfo.molobj_to_svgstr(molobj, removeHs=True)

    # Success, setup database
    # calculation = models.GamessCalculation()
    calculation.smiles = smiles
    calculation.hashkey = hashkey
    calculation.sdf = sdfstr
    calculation.svg = svgstr
    calculation.created = datetime.datetime.now()

    # Add calculation to the database
    request.dbsession.add(calculation)

    # Add smiles to counter
    countobj = request.dbsession.query(models.Counter) \
        .filter_by(smiles=smiles).first()

    if countobj is None:
        counter = models.Counter()
        counter.smiles = smiles
        counter.count = 1
        request.dbsession.add(counter)
    else:
        countobj.count += 1

    return msg

