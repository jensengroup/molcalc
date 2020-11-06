import configparser
import os
import sys
from pathlib import Path

try:
    pass
except:
    here = os.path.dirname(__file__)
    sys.path.append(here + "/..")


SCR = ".test/"


def ini_settings(filename):
    config = configparser.ConfigParser()
    config.read(filename)
    return config


# Init enviroment
CONFIG = ini_settings("development.ini")
Path(SCR).mkdir(parents=True, exist_ok=True)
