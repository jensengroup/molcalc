import configparser
import pathlib
import sys
import logging

try:
    import molcalc
    import molcalc_lib
except ImportError:
    parent = str(pathlib.Path(__file__).absolute().parent.parent)
    sys.path.insert(0, parent)
    import molcalc
    import molcalc_lib

import ppqm

# TODO Should be handled by pytest
SCR = ".test/"
RESOURCES = pathlib.Path("tests/resources/chemistry")


def ini_settings(filename):
    config = configparser.ConfigParser()
    config.read(filename)
    return config


# Init enviroment
CONFIG = ini_settings("development.ini")
pathlib.Path(SCR).mkdir(parents=True, exist_ok=True)

molcalc = molcalc
molcalc_lib = molcalc_lib
ppqm = ppqm

logging.basicConfig(level=logging.DEBUG)
