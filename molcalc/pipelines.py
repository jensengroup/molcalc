import datetime
import logging
import pathlib

import models

import ppqm
from molcalc_lib import gamess_calculations
from ppqm import chembridge, misc
from ppqm.constants import COLUMN_COORDINATES

_logger = logging.getLogger("molcalc:pipe")


def calculation_pipeline(molinfo, settings):
    """

    Assumed that rdkit understands the molecule

    args:
        molinfo - dict
        settings -

    """

    # Read input
    molobj = molinfo["molobj"]
    sdfstr = molinfo["sdfstr"]
    hashkey = molinfo["hashkey"]

    scratch_dir = settings["scr.scr"]
    scratch_dir = pathlib.Path(scratch_dir)

    # TODO Get molecule names

    # Get that smile on your face
    try:
        smiles = chembridge.molobj_to_smiles(molobj, remove_hs=True)
    except Exception:
        smiles = chembridge.molobj_to_smiles(molobj)

    # Start respond message
    msg = {"smiles": smiles, "hashkey": hashkey}

    atoms = chembridge.molobj_to_atoms(molobj)
    _logger.info(f"{hashkey} '{smiles}' {atoms}")

    # Create new calculation
    calculation = models.GamessCalculation()

    # Switch to scrdir / hashkey
    hashdir = scratch_dir / hashkey
    hashdir.mkdir(parents=True, exist_ok=True)

    gamess_options = {
        "cmd": settings["gamess.rungms"],
        "gamess_scr": settings["gamess.scr"],
        "gamess_userscr": settings["gamess.userscr"],
        "scr": hashdir,
        "filename": hashkey,
    }

    # TODO Add error messages when gamess fails
    # TODO add timeouts for all gamess calls

    # Optimize molecule
    try:
        properties = gamess_calculations.optimize_coordinates(
            molobj, gamess_options
        )

    except Exception:
        # TODO Logger + rich should store these exceptions somewhere. One file
        # per exception for easy debugging.
        # TODO Should store SDF of the molecule if exception
        sdfstr = chembridge.molobj_to_sdfstr(molobj)
        _logger.error(f"{hashkey} OptimizationError", exc_info=True)
        _logger.error(sdfstr)
        properties = None

    if properties is None:
        return {
            "error": "Error g-80 - gamess optimization error",
            "message": "Error. Unable to optimize molecule",
        }, None

    if "error" in properties:
        return {
            "error": "Error g-93 - gamess optimization error known",
            "message": properties["error"],
        }, None

    if (
        COLUMN_COORDINATES not in properties
        or properties[COLUMN_COORDINATES] is None
    ):
        return {
            "error": "Error g-104 - gamess optimization error",
            "message": "Error. Unable to optimize molecule",
        }, None

    _logger.info(f"{hashkey} OptimizationSucces")

    # Save and set coordinates
    coord = properties[ppqm.constants.COLUMN_COORDINATES]
    calculation.coordinates = misc.save_array(coord)
    calculation.enthalpy = properties[ppqm.constants.COLUMN_ENERGY]
    chembridge.molobj_set_coordinates(molobj, coord)

    # Optimization is finished, do other calculation async-like

    (
        properties_vib,
        properties_orb,
        properties_sol,
    ) = gamess_calculations.calculate_all_properties(molobj, gamess_options)

    # Check results

    if properties_vib is None or "error" in properties_vib:
        return {
            "error": "Error g-104 - gamess vibration error",
            "message": "Error. Unable to vibrate molecule",
        }, None

    _logger.info(f"{hashkey} VibrationSuccess")

    # TODO Make a custom reader and move this out of ppqm
    calculation.islinear = properties_vib["linear"]
    calculation.vibjsmol = properties_vib["jsmol"]
    calculation.vibfreq = misc.save_array(properties_vib["freq"])
    calculation.vibintens = misc.save_array(properties_vib["intens"])
    calculation.thermo = misc.save_array(properties_vib["thermo"])

    if properties_orb is None or "error" in properties_orb:
        return {
            "error": "Error g-128 - gamess orbital error",
            "message": "Error. Unable to calculate molecular orbitals",
        }, None

    _logger.info(f"{hashkey} OrbitalsSuccess")
    calculation.orbitals = misc.save_array(properties_orb["orbitals"])
    calculation.orbitalstxt = properties_orb["stdout"]

    if properties_sol is None or "error" in properties_sol:

        # Is okay solvation didn't converge, just warn.
        _logger.warning(f"{hashkey} SolvationError")

    else:
        # 'charges', 'solvation_total', 'solvation_polar',
        # 'solvation_nonpolar', 'surface', 'total_charge', 'dipole',
        # 'dipole_total'
        _logger.info(f"{hashkey} SolvationSuccess")

        charges = properties_sol["charges"]
        calculation.charges = misc.save_array(charges)
        calculation.soltotal = properties_sol["solvation_total"]
        calculation.solpolar = properties_sol["solvation_polar"]
        calculation.solnonpolar = properties_sol["solvation_nonpolar"]
        calculation.solsurface = properties_sol["surface"]
        calculation.soldipole = misc.save_array(properties_sol["dipole"])
        calculation.soldipoletotal = properties_sol["dipole_total"]

        # Save mol2 fmt
        mol2 = chembridge.molobj_to_mol2(molobj, charges=charges)
        calculation.mol2 = mol2

    # Saveable sdf and reset title
    sdfstr = chembridge.molobj_to_sdfstr(molobj)
    sdfstr = chembridge.clean_sdf_header(sdfstr)

    # Get a 2D Picture
    svgstr = chembridge.molobj_to_svgstr(molobj, removeHs=True, use_2d=True)

    # Success, store results database
    calculation.smiles = smiles
    calculation.hashkey = hashkey
    calculation.sdf = sdfstr
    calculation.svg = svgstr
    calculation.created = datetime.datetime.now()

    return msg, calculation


def update_smiles_counter(request, smiles):

    # Add smiles to counter
    countobj = (
        request.dbsession.query(models.Counter)
        .filter_by(smiles=smiles)
        .first()
    )

    if countobj is None:
        counter = models.Counter()
        counter.smiles = smiles
        counter.count = 1
        request.dbsession.add(counter)
    else:
        countobj.count += 1

    return
