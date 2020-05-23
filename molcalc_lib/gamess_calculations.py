
from multiprocessing import Process, Pipe
from chemhelp import gamess


def optimize_coordinates(molobj, **kwargs):

    header = """ $basis gbasis=pm3 $end
 $contrl runtyp=optimize icharg={:} $end
 $statpt opttol=0.0005 nstep=300 projct=.F. $end
"""

    stdout, stderr = gamess.calculate(molobj, header, **kwargs)

    # TODO Check stderr and return None

    key = " ddikick.x: Fatal error detected."
    error = key in stderr

    if not error:
        properties = gamess.read_properties_coordinates(stdout)

    else:
        # check why calculation failed
        properties = gamess.read_errors(stdout)

    return properties


def calculate_vibrations(molobj, **kwargs):

    # Vibrate molecule
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

    parser = gamess.read_properties_vibration
    stdout, status = gamess.calculate(molobj, header, **kwargs)
    properties = parser(stdout)

    return properties


def calculate_orbitals(molobj, **kwargs):

    header = """
 $contrl
 coord=cart
 units=angs
 scftyp=rhf
 icharg={:}
 maxit=60
 $end
 $basis gbasis=sto ngauss=3 $end
"""

    parser = gamess.read_properties_orbitals
    stdout, status = gamess.calculate(molobj, header, **kwargs)
    properties = parser(stdout)

    return properties


def calculate_solvation(molobj, **kwargs):

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

    parser = gamess.read_properties_solvation
    stdout, status = gamess.calculate(molobj, header, **kwargs)
    properties = parser(stdout)

    return properties



def calculate_all_properties(molobj, **kwargs):

    funcs = [
        calculate_vibrations,
        calculate_orbitals,
        calculate_solvation,
    ]

    def procfunc(conn, func, *args, **kwargs):
        try:
            properties = func(*args, **kwargs)
        except:
            properties = None
        conn.send(properties)
        conn.close()

    procs = []
    conns = []

    for func in funcs:

        parent_conn, child_conn = Pipe()
        p = Process(target=procfunc, args=(child_conn, func, molobj), kwargs=kwargs)
        p.start()

        procs.append(p)
        conns.append(parent_conn)

    for proc in procs:
        proc.join()

    properties_vib = conns[0].recv()
    properties_orb = conns[1].recv()
    properties_sol = conns[2].recv()

    return properties_vib, properties_orb, properties_sol

