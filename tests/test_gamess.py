
import re
import sys
import os
import numpy as np

import context
from context import molcalc_lib
from context import config

from molcalc_lib import gamess
from molcalc_lib import cheminfo

from rdkit import Chem

GAMESS_OPTIONS = {
    "scr": context.scr,
    "cmd": config["gamess"].get("rungms"),
    "gamess_scr": config["gamess"].get("scr"),
    "gamess_userscr": config["gamess"].get("userscr"),
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

    molobj = molcalc_lib.cheminfo.sdfstr_to_molobj(methane)
    stdout, stderr = gamess.calculate(molobj, header, **GAMESS_OPTIONS)

    properties = gamess.read_properties_coordinates(stdout)

    atoms = properties["atoms"]
    energy = properties["h"]

    assert (atoms == np.array([6,1,1,1,1], dtype=int)).all()
    np.testing.assert_almost_equal(energy, -13.0148)

    return


def test_output():

    with open("tests/data/gamess_methane.log", 'r') as f:
        output = f.read()

    properties = molcalc_lib.gamess.read_properties_coordinates(output)

    atoms = properties["atoms"]
    energy = properties["h"]

    assert (atoms == np.array([6,1,1,1,1], dtype=int)).all()
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

    coordinates = np.array([
        [ 0., -0., 0., ],
        [-0., -0.88755027, -0.62754422],
        [-0., 0.88755027, -0.62754422],
        [-0.88755027, 0., 0.62754422],
        [ 0.88755027, 0., 0.62754422],
    ])

    molobj = cheminfo.sdfstr_to_molobj(methane)
    cheminfo.molobj_set_coordinates(molobj, coordinates)

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

    properties = gamess.read_properties_vibration(stdout)

    assert properties is not None
    assert 'thermo' in properties

    return


def test_vibration_read():

    with open("tests/data/gamess_methane_vib.log", 'r') as f:
        output = f.read()


    properties = gamess.read_properties_vibration(output)

    vibs = properties["freq"]
    result = np.array([
        5.757000e+00,
        5.757000e+00,
        9.600000e-02,
        6.419200e+01,
        7.002200e+01,
        7.002200e+01,
        1.362606e+03,
        1.362741e+03,
        1.362741e+03,
        1.451008e+03,
        1.451231e+03,
        3.207758e+03,
        3.207864e+03,
        3.207864e+03,
        3.311312e+03])

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

    molobj = cheminfo.sdfstr_to_molobj(methane)

    stdout, stderr = gamess.calculate(molobj, header, **GAMESS_OPTIONS)

    properties = gamess.read_properties_orbitals(stdout)

    orbitals = properties["orbitals"]
    results = [-11.0303, -0.9085, -0.5177, -0.5177, -0.5177, 0.713, 0.713, 0.713, 0.7505]
    np.testing.assert_almost_equal(orbitals, results)

    return


def test_orbitals_read():

    with open("tests/data/gamess_methane_orb.log", 'r') as f:
        output = f.read()

    properties = gamess.read_properties_orbitals(output)

    orbitals = properties["orbitals"]
    results = [-11.0303, -0.9085, -0.5177, -0.5177, -0.5177, 0.713, 0.713, 0.713, 0.7505]
    np.testing.assert_almost_equal(orbitals, results)

    return


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

    molobj = cheminfo.sdfstr_to_molobj(methane)
    stdout, stderr = gamess.calculate(molobj, header, **GAMESS_OPTIONS)
    properties = gamess.read_properties_solvation(stdout)

    total_solvation = properties["solvation_total"]
    result = 1.24
    np.testing.assert_almost_equal(total_solvation, result)

    return


def test_solvation_read():

    with open("tests/data/gamess_methane_sol.log", 'r') as f:
        output = f.read()

    properties = gamess.read_properties_solvation(output)

    total_solvation = properties["solvation_total"]
    result = 1.24
    np.testing.assert_almost_equal(total_solvation, result)

    return


def main():

    # test_output()
    # test_optimization()
    # test_vibration_read()
    test_vibration()
    # test_orbitals_read()
    # test_orbitals()
    # test_solvation_read()
    # test_solvation()

    return

if __name__ == '__main__':
    main()

