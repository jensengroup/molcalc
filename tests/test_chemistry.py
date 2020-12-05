import pytest
from context import CONFIG, SCR, molcalc_lib
from rdkit import Chem
from rdkit.Chem import AllChem

import ppqm
from molcalc_lib import gamess_calculations
from ppqm import chembridge

GAMESS_OPTIONS = {
    "scr": SCR,
    "cmd": CONFIG["gamess"].get("rungms"),
    "gamess_scr": CONFIG["gamess"].get("scr"),
    "gamess_userscr": CONFIG["gamess"].get("userscr"),
}


SMALL_SMILES = ["[Na+]", "[O-2]", "[H-]", "[H][H]", "N#N", "[C]"]


@pytest.mark.parametrize("smi", SMALL_SMILES)
def test_small_smiles(smi):
    molobj = chembridge.smiles_to_molobj(smi)

    n_atoms = len(molobj.GetAtoms())

    assert n_atoms > 0

    AllChem.Compute2DCoords(molobj)

    properties = gamess_calculations.optimize_coordinates(
        molobj, GAMESS_OPTIONS
    )
    assert ppqm.constants.COLUMN_COORDINATES in properties

    properties_list = gamess_calculations.calculate_all_properties(
        molobj, GAMESS_OPTIONS
    )

    assert isinstance(properties_list, tuple)

    prop_vib, prop_orb, prop_sol = properties_list

    assert isinstance(prop_vib, dict)
    assert isinstance(prop_orb, dict)
    assert isinstance(prop_sol, dict)

    # Single atoms don't vibrate
    if n_atoms > 1:
        assert "error" not in prop_vib

    assert "error" not in prop_orb
    assert "error" not in prop_sol


def test_mg():

    smi = "[Mg]"
    gamess_options = GAMESS_OPTIONS
    gamess_options["filename"] = "test_mg"

    molobj = Chem.MolFromSmiles(smi)
    AllChem.Compute2DCoords(molobj)

    properties = molcalc_lib.gamess_calculations.optimize_coordinates(
        molobj, gamess_options
    )
    assert ppqm.constants.COLUMN_COORDINATES in properties

    properties_list = gamess_calculations.calculate_all_properties(
        molobj, GAMESS_OPTIONS
    )

    assert isinstance(properties_list, tuple)

    prop_vib, prop_orb, prop_sol = properties_list

    assert isinstance(prop_vib, dict)
    assert isinstance(prop_orb, dict)
    assert isinstance(prop_sol, dict)

    # Vibrations and solvation will fail
    # assert "error" in prop_vib
    assert "error" in prop_sol

    # Orbitals should work
    assert "error" not in prop_orb
