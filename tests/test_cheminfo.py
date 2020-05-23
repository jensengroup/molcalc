
from context import chemhelp

from chemhelp import cheminfo


TEST_ERROR_SMILES = "C[NH4+]"


@pytest.mark.parametrize("smiles", TEST_ERROR_SMILES)
def test_capture_error(smiles):

    molobj, msg = cheminfo.smiles_to_molobj(smiles, return_status=True)

    assert "ERROR" in msg
    assert molobj is None

    return

if __name__ == "__main__":
    main()

