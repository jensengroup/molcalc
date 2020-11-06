
from multiprocessing import Process, Pipe
import datetime
import hashlib
import os

import numpy as np
from pyramid.view import notfound_view_config, view_config

import models

from molcalc_lib import gamess_calculations
from chemhelp import cheminfo
from chemhelp import misc

import logging

logger = logging.getLogger('molcalc')


def calculation_pipeline(molinfo, settings):
    """

    Assumed that rdkit understands the molecule

    args:
        molinfo - dict
        settings -


    """

    scratch_dir = settings["scr.scr"]

    gamess_options = {
        "cmd": settings["gamess.rungms"],
        "gamess_scr": settings["gamess.scr"],
        "gamess_userscr": settings["gamess.userscr"],
        "scr": scratch_dir,
        "autoclean": True,
        "debug": False,
    }

    logger.info("test info")

    # Read input
    molobj = molinfo["molobj"]
    sdfstr = molinfo["sdfstr"]

    if "name" in molinfo:
        name = info["name"]

    # Get that smile on your face
    try:
        smiles = cheminfo.molobj_to_smiles(molobj, remove_hs=True)
    except:
        smiles = cheminfo.molobj_to_smiles(molobj)

    # hash on sdf (conformer)
    hshobj = hashlib.md5(sdfstr.encode())
    hashkey = hshobj.hexdigest()

    # Start respond message
    msg = {
        "smiles": smiles,
        "hashkey": hashkey
    }


    # Create new calculation
    calculation = models.GamessCalculation()

    hashdir = os.path.join(scratch_dir + hashkey)

    # check if folder exists
    if not os.path.isdir(hashdir):
        os.mkdir(hashdir)

    os.chdir(hashdir)

    # GAMESS DEBUG

    # TODO Add error messages when gamess fails
    # TODO add timeouts for all gamess calls

    # Optimize molecule

    gamess_options["scr"] = hashdir

    try:
        properties = gamess_calculations.optimize_coordinates(
            molobj, **gamess_options
        )
    except:
        properties = None

    if properties is None:
        return {'error':'Error g-80 - gamess optimization error', 'message': "Error. Unable to optimize molecule"}, None

    if "error" in properties:
        return {
            'error': 'Error g-93 - gamess optimization error known',
            'message': properties["error"]
        }

    if "coord" not in properties:
        return {'error':'Error g-98 - gamess optimization error', 'message': "Error. Unable to optimize molecule"}, None

    print(smiles, list(properties.keys()))

    # Save and set coordinates
    coord = properties["coord"]
    calculation.coordinates = misc.save_array(coord)
    calculation.enthalpy = properties["h"]
    cheminfo.molobj_set_coordinates(molobj, coord)

    # Optimization is finished, do other calculation async-like

    properties_vib, properties_orb, properties_sol = (
        gamess_calculations.calculate_all_properties(
            molobj, **gamess_options
        )
    )

    # Check results

    if properties_vib is None:
        return {'error':'Error g-104 - gamess vibration error', 'message': "Error. Unable to vibrate molecule"}, None

    print(smiles, list(properties_vib.keys()))

    calculation.islinear = properties_vib["linear"]
    calculation.vibjsmol = properties_vib["jsmol"]
    calculation.vibfreq = misc.save_array(properties_vib["freq"])
    calculation.vibintens = misc.save_array(properties_vib["intens"])
    calculation.thermo = misc.save_array(properties_vib["thermo"])

    if properties_orb is None:
        return {'error':'Error g-128 - gamess orbital error', 'message': "Error. Unable to calculate molecular orbitals"}, None

    print(smiles, list(properties_orb.keys()))
    calculation.orbitals = misc.save_array(properties_orb["orbitals"])
    calculation.orbitalstxt = properties_orb["stdout"]

    if properties_sol is None:
        return {'error':'Error g-159 - gamess solvation error', 'message': "Error. Unable to calculate solvation"}

    # 'charges', 'solvation_total', 'solvation_polar', 'solvation_nonpolar',
    # 'surface', 'total_charge', 'dipole', 'dipole_total'
    print(smiles, list(properties_sol.keys()))

    charges = properties_sol["charges"]
    calculation.charges = misc.save_array(charges)
    calculation.soltotal = properties_sol["solvation_total"]
    calculation.solpolar = properties_sol["solvation_polar"]
    calculation.solnonpolar = properties_sol["solvation_nonpolar"]
    calculation.solsurface = properties_sol["surface"]
    calculation.soldipole = misc.save_array(properties_sol["dipole"])
    calculation.soldipoletotal = properties_sol["dipole_total"]

    # Saveable sdf and reset title
    sdfstr = cheminfo.molobj_to_sdfstr(molobj)
    sdfstr = cheminfo.clean_sdf_header(sdfstr)

    # Save mol2 fmt
    mol2 = cheminfo.molobj_to_mol2(molobj, charges=charges)
    calculation.mol2 = mol2

    # Get a 2D Picture
    # TODO Compute 2D coordinates
    svgstr = cheminfo.molobj_to_svgstr(molobj, removeHs=True)

    # Success, store results database
    calculation.smiles = smiles
    calculation.hashkey = hashkey
    calculation.sdf = sdfstr
    calculation.svg = svgstr
    calculation.created = datetime.datetime.now()

    return msg, calculation


def update_smiles_counter(request, smiles):

    # Add smiles to counter
    countobj = request.dbsession \
        .query(models.Counter) \
        .filter_by(smiles=smiles).first()

    if countobj is None:
        counter = models.Counter()
        counter.smiles = smiles
        counter.count = 1
        request.dbsession.add(counter)
    else:
        countobj.count += 1

    return

