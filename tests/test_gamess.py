import numpy as np
from context import CONFIG, SCR

from ppqm import chembridge, gamess

GAMESS_OPTIONS = {
    "scr": SCR,
    "cmd": CONFIG["gamess"].get("rungms"),
    "gamess_scr": CONFIG["gamess"].get("scr"),
    "gamess_userscr": CONFIG["gamess"].get("userscr"),
    "debug": True,
}


def test_optimization():

    methane = """


  5  4  0  0  0  0  0  0  0  0999 V2000
    0.0000   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000   -0.8900   -0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000    0.8900   -0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
   -0.8900   -0.0000    0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
    0.8900   -0.0000    0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  1  0  0  0  0
  1  3  1  0  0  0  0
  1  4  1  0  0  0  0
  1  5  1  0  0  0  0
M  END
$$$$
    """

    header = """ $basis gbasis=pm3 $end
 $contrl runtyp=optimize icharg={:} $end
 $statpt opttol=0.0005 nstep=300 projct=.F. $end
"""

    molobj = chembridge.sdfstr_to_molobj(methane)
    stdout, stderr = gamess.calculate(molobj, header, **GAMESS_OPTIONS)

    properties = gamess.get_properties_coordinates(stdout)

    atoms = properties["atoms"]
    energy = properties["h"]

    assert (atoms == np.array([6, 1, 1, 1, 1], dtype=int)).all()
    np.testing.assert_almost_equal(energy, -13.0148)

    return


def test_output():

    with open("tests/data/gamess_methane.log", "r") as f:
        output = f.readlines()

    properties = gamess.get_properties_coordinates(output)

    atoms = properties["atoms"]
    energy = properties["h"]

    assert (atoms == np.array([6, 1, 1, 1, 1], dtype=int)).all()
    np.testing.assert_almost_equal(energy, -13.0148)

    return


def test_vibration():

    methane = """


  5  4  0  0  0  0  0  0  0  0999 V2000
    0.0000   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000   -0.8900   -0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000    0.8900   -0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
   -0.8900   -0.0000    0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
    0.8900   -0.0000    0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  1  0  0  0  0
  1  3  1  0  0  0  0
  1  4  1  0  0  0  0
  1  5  1  0  0  0  0
M  END
$$$$
    """

    coordinates = np.array(
        [
            [
                0.0,
                -0.0,
                0.0,
            ],
            [-0.0, -0.88755027, -0.62754422],
            [-0.0, 0.88755027, -0.62754422],
            [-0.88755027, 0.0, 0.62754422],
            [0.88755027, 0.0, 0.62754422],
        ]
    )

    molobj = chembridge.sdfstr_to_molobj(methane)
    chembridge.molobj_set_coordinates(molobj, coordinates)

    header = """
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

    stdout, stderr = gamess.calculate(molobj, header, **GAMESS_OPTIONS)

    properties = gamess.get_properties_vibration(stdout)

    assert properties is not None
    assert "thermo" in properties

    return


def test_vibration_read():

    with open("tests/data/gamess_methane_vib.log", "r") as f:
        output = f.readlines()

    properties = gamess.get_properties_vibration(output)

    vibs = properties["freq"]
    result = np.array(
        [
            5.757000e00,
            5.757000e00,
            9.600000e-02,
            6.419200e01,
            7.002200e01,
            7.002200e01,
            1.362606e03,
            1.362741e03,
            1.362741e03,
            1.451008e03,
            1.451231e03,
            3.207758e03,
            3.207864e03,
            3.207864e03,
            3.311312e03,
        ]
    )

    np.testing.assert_almost_equal(vibs, result)

    return


def test_orbitals():

    methane = """


  5  4  0  0  0  0  0  0  0  0999 V2000
    0.0000   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000   -0.8900   -0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000    0.8900   -0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
   -0.8900   -0.0000    0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
    0.8900   -0.0000    0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  1  0  0  0  0
  1  3  1  0  0  0  0
  1  4  1  0  0  0  0
  1  5  1  0  0  0  0
M  END
$$$$
    """

    header = """
 $contrl
 coord=cart
 units=angs
 scftyp=rhf
 icharg=0
 maxit=60
 $end
 $basis gbasis=sto ngauss=3 $end
"""

    molobj = chembridge.sdfstr_to_molobj(methane)

    stdout, stderr = gamess.calculate(molobj, header, **GAMESS_OPTIONS)

    properties = gamess.get_properties_orbitals(stdout)

    orbitals = properties["orbitals"]
    results = [
        -11.0303,
        -0.9085,
        -0.5177,
        -0.5177,
        -0.5177,
        0.713,
        0.713,
        0.713,
        0.7505,
    ]
    np.testing.assert_almost_equal(orbitals, results)


def test_orbitals_read():

    with open("tests/data/gamess_methane_orb.log", "r") as f:
        output = f.readlines()

    properties = gamess.get_properties_orbitals(output)

    orbitals = properties["orbitals"]
    results = [
        -11.0303,
        -0.9085,
        -0.5177,
        -0.5177,
        -0.5177,
        0.713,
        0.713,
        0.713,
        0.7505,
    ]
    np.testing.assert_almost_equal(orbitals, results)


def test_solvation():

    methane = """


  5  4  0  0  0  0  0  0  0  0999 V2000
    0.0000   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000   -0.8900   -0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000    0.8900   -0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
   -0.8900   -0.0000    0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
    0.8900   -0.0000    0.6293 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  1  0  0  0  0
  1  3  1  0  0  0  0
  1  4  1  0  0  0  0
  1  5  1  0  0  0  0
M  END
$$$$
    """

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

    molobj = chembridge.sdfstr_to_molobj(methane)
    stdout, stderr = gamess.calculate(molobj, header, **GAMESS_OPTIONS)
    properties = gamess.get_properties_solvation(stdout)

    total_solvation = properties["solvation_total"]
    result = 1.24
    np.testing.assert_almost_equal(total_solvation, result)


def test_solvation_read():

    with open("tests/data/gamess_methane_sol.log", "r") as f:
        output = f.readlines()

    properties = gamess.get_properties_solvation(output)

    total_solvation = properties["solvation_total"]
    result = 1.24
    np.testing.assert_almost_equal(total_solvation, result)
