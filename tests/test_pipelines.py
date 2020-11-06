from context import CONFIG, SCR

from chemhelp import cheminfo
from molcalc import pipelines

GAMESS_OPTIONS = {
    "scr": SCR,
    "cmd": CONFIG["gamess"].get("rungms"),
    "gamess_scr": CONFIG["gamess"].get("scr"),
    "gamess_userscr": CONFIG["gamess"].get("userscr"),
    "debug": True,
}


def test_pipelines():

    settings = dict()
    settings["scr.scr"] = SCR
    settings["gamess.rungms"] = GAMESS_OPTIONS["cmd"]
    settings["gamess.scr"] = GAMESS_OPTIONS["gamess_scr"]
    settings["gamess.userscr"] = GAMESS_OPTIONS["gamess_userscr"]

    print(settings)

    sdf = """


  2  1  0  0  0  0  0  0  0  0999 V2000
    0.7500    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
   -0.7500    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  3  0
M  END """

    # smi = "N#N"
    # molobj = Chem.MolFromSmiles(smi)
    # AllChem.Compute2DCoords(molobj)
    molobj = cheminfo.sdfstr_to_molobj(sdf)
    sdf = cheminfo.molobj_to_sdfstr(molobj)
    print(sdf)

    molecule_info = {"sdfstr": sdf, "molobj": molobj, "hashkey": "TEST"}

    results = pipelines.calculation_pipeline(molecule_info, settings)

    print(results)

    return


if __name__ == "__main__":
    test_pipelines()
