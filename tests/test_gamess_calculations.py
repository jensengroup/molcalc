import pytest
import copy
import pathlib
from context import CONFIG, SCR
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

TEST_ERROR_SDF = [
    """


  4  3  0  0  0  0  0  0  0  0999 V2000
    0.0000   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000   -0.8900   -0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000    0.8900   -0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
   -0.8900   -0.0000    0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  1  0  0  0  0
  1  3  1  0  0  0  0
  1  4  1  0  0  0  0
M  END
""",
    """
Benzene

 12 12  0  0  0  0  0  0  0  0999 V2000
    0.8065   -1.1431    0.0149 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.3933    0.1268   -0.0021 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.5868    1.2699   -0.0170 C   0  0  0  0  0  0  0  0  0  0  0  0
   -0.8065    1.1431   -0.0149 C   0  0  0  0  0  0  0  0  0  0  0  0
   -1.3933   -0.1268    0.0021 C   0  0  0  0  0  0  0  0  0  0  0  0
   -0.5868   -1.2699    0.0171 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.4304   -2.0274    0.0264 H   0  0  0  0  0  0  0  0  0  0  0  0
    2.4712    0.2250   -0.0038 H   0  0  0  0  0  0  0  0  0  0  0  0
    1.0407    2.2524   -0.0302 H   0  0  0  0  0  0  0  0  0  0  0  0
   -1.4304    2.0274   -0.0265 H   0  0  0  0  0  0  0  0  0  0  0  0
   -2.4712   -0.2250    0.0038 H   0  0  0  0  0  0  0  0  0  0  0  0
   -1.0407   -2.2524    0.0302 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  2  0
  2  3  1  0
  3  4  2  0
  4  5  1  0
  5  6  2  0
  6  1  1  0
  1  7  1  0
  2  8  1  0
  3  9  1  0
  4 10  1  0
  5 11  1  0
  6 12  1  0
M  END
""",
]


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


@pytest.mark.parametrize("sdfstr", TEST_ERROR_SDF)
def test_error_smiles(tmpdir, sdfstr):

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


