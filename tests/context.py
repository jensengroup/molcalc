
import os
import sys
import configparser
from pathlib import Path

try:
    import molcalc
    import molcalc_lib
except:
    here = os.path.dirname(__file__)
    sys.path.append(here + "/..")
    import molcalc
    import molcalc_lib

scr = ".test/"

def ini_settings(filename):
    config = configparser.ConfigParser()
    config.read(filename)
    return config


config = ini_settings("gamess.ini")

Path(scr).mkdir(parents=True, exist_ok=True)

