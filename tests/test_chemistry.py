import numpy as np
from context import CONFIG, SCR, molcalc_lib
from rdkit import Chem
from rdkit.Chem import AllChem

from ppqm import chembridge

GAMESS_OPTIONS = {
    "scr": SCR,
    "cmd": CONFIG["gamess"].get("rungms"),
    "gamess_scr": CONFIG["gamess"].get("scr"),
    "gamess_userscr": CONFIG["gamess"].get("userscr"),
    "debug": True,
}


EDGE_SMILES = ["[Na+]", "[O-2]", "[H-]", "[H][H]", "N#N"]


def test_single_hydrogen():

    smi = "[H-]"
    molobj = Chem.MolFromSmiles(smi)
    assert molobj


def test_dihydrogen():

    smi = "[H][H]"
    molobj = chembridge.smiles_to_molobj(smi)
    assert molobj


def test_dinitrogen():

    smi = "N#N"

    molobj = Chem.MolFromSmiles(smi)
    AllChem.Compute2DCoords(molobj)

    sdfstr = chembridge.molobj_to_sdfstr(molobj)
    print(sdfstr)

    assert False

    # Test optimize
    properties = molcalc_lib.gamess_calculations.optimize_coordinates(
        molobj, **GAMESS_OPTIONS
    )

    assert properties is not None
    assert properties["coord"] is not None
    assert isinstance(properties["coord"], np.ndarray)

    coord = properties["coord"]
    chembridge.molobj_set_coordinates(molobj, coord)

    # Vibrate
    properties = molcalc_lib.gamess_calculations.calculate_vibrations(
        molobj, **GAMESS_OPTIONS
    )

    vib, orb, sol = molcalc_lib.gamess_calculations.calculate_all_properties(
        molobj, **GAMESS_OPTIONS
    )

    assert vib is not None
    assert orb is not None
    assert sol is not None

    assert properties is not None


if __name__ == "__main__":
    test_dinitrogen()
