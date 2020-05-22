
import os
import sys
import configparser
from pathlib import Path

try:
    import molcalc
except:
    here = os.path.dirname(__file__)
    sys.path.append(here + "/..")
    import molcalc

import molcalc_lib
import chemhelp

SCR = ".test/"

def ini_settings(filename):
    config = configparser.ConfigParser()
    config.read(filename)
    return config

# Init enviroment
CONFIG = ini_settings("gamess.ini")
Path(SCR).mkdir(parents=True, exist_ok=True)

