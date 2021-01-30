import copy
import logging
from multiprocessing import Pipe, Process

import ppqm

_logger = logging.getLogger("molcalc:calc")

MAX_TIME = 10  # seconds


def optimize_coordinates(molobj, gamess_options):

    calculation_options = {
        "basis": {"gbasis": "PM3"},
        "contrl": {"runtyp": "optimize"},
        "statpt": {"opttol": 0.0005, "nstep": 300, "projct": False},
    }

    gamess_options.get("filename", None)

    calc_obj = ppqm.gamess.GamessCalculator(**gamess_options)
    results = calc_obj.calculate(molobj, calculation_options)

    properties = results[0]

    return properties


def calculate_vibrations(molobj, gamess_options):

    # Vibrate molecule
    calculation_options = {
        "basis": {"gbasis": "PM3"},
        "contrl": {"runtyp": "hessian", "maxit": 60},
    }

    calc_obj = ppqm.gamess.GamessCalculator(**gamess_options)
    results = calc_obj.calculate(molobj, calculation_options)
    properties = results[0]

    return properties


def calculate_orbitals(molobj, gamess_options):

    calculation_options = {
        "contrl": {
            "coord": "cart",
            "units": "angs",
            "scftyp": "rhf",
            "maxit": 60,
        },
        "basis": {"gbasis": "sto", "ngauss": 3},
    }

    calc_obj = ppqm.gamess.GamessCalculator(**gamess_options)
    try:
        results = calc_obj.calculate(molobj, calculation_options)
        properties = results[0]
    except TypeError:
        properties = dict()
        properties["error"] = "Failed orbital calculation"

    return properties


def calculate_solvation(molobj, gamess_options):

    calculation_options = dict()
    calculation_options["basis"] = {"gbasis": "PM3"}
    calculation_options["system"] = {"mwords": 125}
    calculation_options["pcm"] = {
        "solvnt": "water",
        "mxts": 15000,
        "icav": 1,
        "idisp": 1,
    }
    calculation_options["tescav"] = {"mthall": 4, "ntsall": 60}

    calc_obj = ppqm.gamess.GamessCalculator(**gamess_options)
    try:
        results = calc_obj.calculate(molobj, calculation_options)
        properties = results[0]
    except TypeError:
        properties = dict()
        properties["error"] = "Solvation calculation failed"

    if "charges" not in properties:
        properties = dict()
        properties["error"] = "Solvation calculation failed"

    return properties


def calculate_all_properties(molobj, gamess_options):

    funcs = [
        calculate_vibrations,
        calculate_orbitals,
        calculate_solvation,
    ]

    def procfunc(conn, func, *args, **kwargs):
        properties = func(*args, **kwargs)
        conn.send(properties)
        conn.close()

    procs = []
    conns = []

    filename = gamess_options.get("filename", "gamess_calc")

    for func in funcs:

        # Change scr
        gamess_options = copy.deepcopy(gamess_options)
        gamess_options["filename"] = filename + "_" + func.__name__

        parent_conn, child_conn = Pipe()
        p = Process(
            target=procfunc,
            args=(child_conn, func, molobj, gamess_options),
        )
        p.start()

        procs.append(p)
        conns.append(parent_conn)

    for proc in procs:
        proc.join(timeout=MAX_TIME)

    properties_vib = conns[0].recv()
    properties_orb = conns[1].recv()
    properties_sol = conns[2].recv()

    return properties_vib, properties_orb, properties_sol
