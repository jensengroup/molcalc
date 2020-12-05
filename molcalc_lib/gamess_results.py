import numpy as np

from ppqm import misc, units


def view_gamess_calculation(calculation):
    """

    arg:
        calculation - SQLAlchemy GamessCalculation

    return:
        data - dict of information needed for the view template

    """

    # enthalpy = Column(Float)
    # charges = Column(String)
    #
    # islinear = Column(String)
    # vibjsmol = Column(String)
    # vibfreq = Column(String)
    # vibintens = Column(String)
    #
    # thermo = Column(String)
    #
    # orbitals = Column(String)
    # orbitalstxt = Column(String)
    #
    # soltotal = Column(Float)
    # solpolar = Column(Float)
    # solnonpolar = Column(Float)
    # solsurface = Column(Float)
    # soldipole = Column(String)
    # soldipoletotal = Column(Float)

    # Convert model to dictionary
    data = calculation.__dict__

    if calculation.name is None:
        data["name"] = calculation.smiles
    else:
        data["name"] = calculation.name

    fmt = "{:.2f}"

    data["enthalpy"] = fmt.format(data["enthalpy"] * units.calories_to_joule)

    #               E         H         G         CV        CP        S
    #            KJ/MOL    KJ/MOL    KJ/MOL   J/MOL-K   J/MOL-K   J/MOL-K
    #  ELEC.      0.000     0.000     0.000     0.000     0.000     0.000
    #  TRANS.     3.718     6.197   -36.542    12.472    20.786   143.348
    #  ROT.       3.718     3.718   -15.045    12.472    12.472    62.932
    #  VIB.     119.279   119.279   119.164     2.252     2.252     0.385
    #  TOTAL    126.716   129.194    67.577    27.195    35.509   206.665
    #  VIB. THERMAL CORRECTION E(T)-E(0) = H(T)-H(0) =        99.870 J/MOL

    thermotable = calculation.thermo
    thermotable = misc.load_array(thermotable)

    data["h_elect"] = fmt.format(thermotable[0, 1])
    data["h_trans"] = fmt.format(thermotable[1, 1])
    data["h_rotat"] = fmt.format(thermotable[2, 1])
    data["h_vibra"] = fmt.format(thermotable[3, 1])
    data["h_total"] = fmt.format(thermotable[4, 1])

    data["cp_elect"] = fmt.format(thermotable[0, 4])
    data["cp_trans"] = fmt.format(thermotable[1, 4])
    data["cp_rotat"] = fmt.format(thermotable[2, 4])
    data["cp_vibra"] = fmt.format(thermotable[3, 4])
    data["cp_total"] = fmt.format(thermotable[4, 4])

    data["s_elect"] = fmt.format(thermotable[0, 5])
    data["s_trans"] = fmt.format(thermotable[1, 5])
    data["s_rotat"] = fmt.format(thermotable[2, 5])
    data["s_vibra"] = fmt.format(thermotable[3, 5])
    data["s_total"] = fmt.format(thermotable[4, 5])

    # Molecular orbitals format
    data["orbitals"] = misc.load_array(data["orbitals"])
    data["orbitals"] *= units.hartree_to_ev
    data["orbitals"] = [fmt.format(x) for x in data["orbitals"]]

    # Vibrational Frequencies format
    data["vibfreq"] = misc.load_array(data["vibfreq"])
    islinear = int(data["islinear"]) == int(1)
    offset = 5
    if not islinear:
        offset = 6
    data["vibfreq"] = data["vibfreq"][offset:]
    data["vibfreq"] = [fmt.format(x) for x in data["vibfreq"]]
    data["viboffset"] = offset

    # Solvation calculations
    if data["charges"] is None:
        data["has_solvation"] = False

    else:

        data["has_solvation"] = True

        dipoles = misc.load_array(data["soldipole"])

        data["dipolex"] = dipoles[0]
        data["dipoley"] = dipoles[1]
        data["dipolez"] = dipoles[2]

        data["soltotal"] = fmt.format(
            data["soltotal"] * units.calories_to_joule
        )
        data["solpolar"] = fmt.format(
            data["solpolar"] * units.calories_to_joule
        )
        data["solnonpolar"] = fmt.format(
            data["solnonpolar"] * units.calories_to_joule
        )
        data["solsurface"] = fmt.format(data["solsurface"])
        data["soldipoletotal"] = fmt.format(data["soldipoletotal"])

        charges = misc.load_array(data["charges"])
        charges = np.array(charges)
        charge = np.sum(charges)
        charge = np.round(charge, decimals=0)

        data["charge"] = int(charge)

    return data
