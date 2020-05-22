
import pytest
from rdkit import Chem
from rdkit.Chem import AllChem

from context import molcalc_lib
from context import chemhelp
from context import CONFIG, SCR
import context

GAMESS_OPTIONS = {
    "scr": SCR,
    "cmd": CONFIG["gamess"].get("rungms"),
    "gamess_scr": CONFIG["gamess"].get("scr"),
    "gamess_userscr": CONFIG["gamess"].get("userscr"),
    "debug": True,
}


TEST_SMILES_COORD = [
   ('CCC', -23.62341),
]

TEST_SMILES_SOLVATION = [
    'C',
    'CCCBr',
    'C[NH3+]',
]


def prepare_molobj(smiles):
    """
    Helper function for getting 3D coordinates from SMILES
    """
    mol = Chem.MolFromSmiles(smiles)
    mol = Chem.AddHs(mol)
    status = AllChem.EmbedMolecule(mol)
    status = AllChem.UFFOptimizeMolecule(mol)
    return mol


@pytest.mark.parametrize("smiles, test_energy", TEST_SMILES_COORD)
def test_optimize_coordinates(smiles, test_energy):

    molobj = prepare_molobj(smiles)
    properties = molcalc_lib.gamess_calculations.optimize_coordinates(molobj, **GAMESS_OPTIONS)
    assert properties["h"] == pytest.approx(test_energy)

    return


@pytest.mark.parametrize("smiles", TEST_SMILES_SOLVATION)
def test_calculate_solvation(smiles):

    # Get molecule with 3D coordinates
    molobj = prepare_molobj(smiles)

    # Optimize coordinates
    properties = molcalc_lib.gamess_calculations.optimize_coordinates(molobj, autoclean=True, **GAMESS_OPTIONS)
    coord = properties["coord"]

    # Set new coordinates
    chemhelp.cheminfo.molobj_set_coordinates(molobj, coord)

    # Calculate solvation properties
    properties = molcalc_lib.gamess_calculations.calculate_solvation(molobj, **GAMESS_OPTIONS)

    assert properties is not None

    return


def main():

    return

if __name__ == "__main__":
    main()
