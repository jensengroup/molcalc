import copy
import pathlib

import pytest
from context import CONFIG, RESOURCES, SCR
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


TEST_SMILES = ["C"]

TEST_SMILES_COORD = [
    ("CCC", -23.62341),
]

TEST_ERROR_SDF = ["wrong_methane.sdf", "wrong_benzene.sdf"]


TEST_SMILES_SOLVATION = [
    "C",
    "CCCBr",
    "C[NH3+]",
]


def _prepare_molobj(smiles):
    """
    Helper function for getting 3D coordinates from SMILES
    """
    mol = Chem.MolFromSmiles(smiles)
    mol = Chem.AddHs(mol)
    _ = AllChem.EmbedMolecule(mol)
    _ = AllChem.UFFOptimizeMolecule(mol)
    return mol


@pytest.mark.parametrize("smiles, test_energy", TEST_SMILES_COORD)
def test_optimize_coordinates(smiles, test_energy):

    molobj = _prepare_molobj(smiles)
    properties = gamess_calculations.optimize_coordinates(
        molobj, GAMESS_OPTIONS
    )

    assert properties[ppqm.constants.COLUMN_ENERGY] == pytest.approx(
        test_energy
    )


@pytest.mark.parametrize("smiles", TEST_SMILES_SOLVATION)
def test_calculate_solvation(smiles):

    # Get molecule with 3D coordinates
    molobj = _prepare_molobj(smiles)

    # Optimize coordinates
    properties = gamess_calculations.optimize_coordinates(
        molobj, GAMESS_OPTIONS
    )
    coord = properties[ppqm.constants.COLUMN_COORDINATES]

    # Set new coordinates
    chembridge.molobj_set_coordinates(molobj, coord)

    # Calculate solvation properties
    properties = gamess_calculations.calculate_solvation(
        molobj, GAMESS_OPTIONS
    )

    assert properties is not None


@pytest.mark.parametrize("smiles", TEST_SMILES)
def test_calculate_all_properties(smiles):

    # Get molecule with 3D coordinates
    molobj = _prepare_molobj(smiles)

    # Optimize coordinates
    properties = gamess_calculations.optimize_coordinates(
        molobj, GAMESS_OPTIONS
    )
    coord = properties[ppqm.constants.COLUMN_COORDINATES]

    # Set new coordinates
    chembridge.molobj_set_coordinates(molobj, coord)

    # Calculate solvation properties
    (
        properties_vib,
        properties_orb,
        properties_sol,
    ) = gamess_calculations.calculate_all_properties(molobj, GAMESS_OPTIONS)

    assert properties_vib is not None
    assert properties_orb is not None
    assert properties_sol is not None


@pytest.mark.parametrize("filename", TEST_ERROR_SDF)
def test_error_smiles(tmpdir, filename):

    filename = RESOURCES / filename
    with open(filename, "r") as f:
        sdfstr = f.read()

    gamess_options = copy.deepcopy(GAMESS_OPTIONS)
    gamess_options["scr"] = tmpdir

    # Get molecule with 3D coordinates
    molobj = chembridge.sdfstr_to_molobj(sdfstr)

    # Optimize coordinates, unsuccessfully
    properties = gamess_calculations.optimize_coordinates(
        molobj, gamess_options
    )

    assert "error" in properties
    assert type(properties["error"]) is str


if __name__ == "__main__":

    tmpdir = pathlib.Path(".tmptest")
    tmpdir.mkdir(parents=True, exist_ok=True)

    # test_optimize_coordinates("C", 5.0)
    # test_calculate_all_properties("C")
    # test_error_smiles(tmpdir, TEST_ERROR_SDF[0])
