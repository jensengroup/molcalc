
from chemhelp import gamess


def optimize_coordinates(molobj, **kwargs):

    header = """ $basis gbasis=pm3 $end
 $contrl runtyp=optimize icharg={:} $end
 $statpt opttol=0.0005 nstep=300 projct=.F. $end
"""

    filename = "_tmp_optimize.inp"

    parser = gamess.read_properties_coordinates

    stdout, stderr = gamess.calculate(molobj, header, **kwargs)

    # TODO Check stderr and return None

    properties = parser(stdout)

    return properties


def calculate_vibrations(molobj,
    scr=None,
    autoclean=True,
    debug=False):

    # Vibrate molecule
    vibheader = """
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

    filename = "_tmp_vibrations.inp"
    parser = gamess.read_properties_vibration
    stdout, status = gamess.calculate(molobj, header, **kwargs)
    properties = parser(stdout)

    return properties


def calculate_orbitals(molobj,
    scr=None,
    autoclean=True,
    debug=False):

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

    filename = "_tmp_orbitals.inp"
    parser = gamess.read_properties_orbitals
    stdout, status = gamess.calculate(molobj, header, **kwargs)
    properties = parser(stdout)

    return properties


def calculate_solvation(molobj, **kwargs):

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

    filename = "_tmp_solvation.inp"
    parser = gamess.read_properties_solvation
    stdout, status = gamess.calculate(molobj, header, **kwargs)
    properties = parser(stdout)

    return properties





# DEPRECATED

def gamess_quantum_pipeline(request, molinfo):

    headers = [vibheader, orbheader, solheader]
    readers = [gamess.read_properties_vibration, gamess.read_properties_orbitals, gamess.read_properties_solvation]

    def procfunc(conn, reader, *args, **kwargs):
        stdout, status = gamess.calculate(*args, **kwargs)
        try:
            properties = reader(stdout)
        except:
            # TODO Error reading properties
            properties = None
        conn.send(properties)
        conn.close()

    procs = []
    conns = []

    for header, reader in zip(headers, readers):

        parent_conn, child_conn = Pipe()
        p = Process(target=procfunc, args=(child_conn, reader, molobj, header), kwargs=gmsargs)
        p.start()

        procs.append(p)
        conns.append(parent_conn)

    for proc in procs:
        proc.join()

    properties_vib = conns[0].recv()
    properties_orb = conns[1].recv()
    properties_sol = conns[2].recv()

    if properties_vib is None:
        return {'error':'Error g-104 - gamess vibration error', 'message': "Error. Server was unable to vibrate molecule"}

    print(smiles, list(properties_vib.keys()))

    calculation.islinear = properties_vib["linear"]
    calculation.vibjsmol = properties_vib["jsmol"]
    calculation.vibfreq = save_array(properties_vib["freq"])
    calculation.vibintens = save_array(properties_vib["intens"])
    calculation.thermo = save_array(properties_vib["thermo"])

    if properties_orb is None:
        return {'error':'Error g-128 - gamess orbital error', 'message': "Error. Server was unable to orbital the molecule"}

    print(smiles, list(properties_orb.keys()))
    calculation.orbitals = save_array(properties_orb["orbitals"])
    calculation.orbitalstxt = properties_orb["stdout"]
    # calculation.orbitalstxt = models.compress(properties_orb["stdout"])

    if properties_sol is None:
        return {'error':'Error g-159 - gamess solvation error', 'message': "Error. Server was unable to run solvation calculation"}

    # 'charges', 'solvation_total', 'solvation_polar', 'solvation_nonpolar',
    # 'surface', 'total_charge', 'dipole', 'dipole_total'
    print(smiles, list(properties_sol.keys()))

    charges = properties_sol["charges"]
    calculation.charges = save_array(charges)
    calculation.soltotal = properties_sol["solvation_total"]
    calculation.solpolar = properties_sol["solvation_polar"]
    calculation.solnonpolar = properties_sol["solvation_nonpolar"]
    calculation.solsurface = properties_sol["surface"]
    calculation.soldipole = save_array(properties_sol["dipole"])
    calculation.soldipoletotal = properties_sol["dipole_total"]

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

