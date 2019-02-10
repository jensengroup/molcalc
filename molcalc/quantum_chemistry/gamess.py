
import re
import sys
import os

here = os.path.dirname(__file__)
sys.path.append(here)

import cheminfo
import shell
import rmsd

import rdkit
import rdkit.Chem as Chem
import rdkit.Chem.AllChem as AllChem

# TODO get settings from ini file

global __rungms__
global __tmp__
global __scr__


__rungms__ = "/home/charnley/opt/gamess/gamess-github/rungms"
__scr__ = "/home/charnley/scr/"
__tmp__ = "/home/charnley/scr/"


re_coordinates = re.compile('COORDINATES OF ALL ATOMS ARE (.*?)------------\n(.*?)\n\n', re.DOTALL)
re_error = re.compile('^( \*\*\*|Error:)')

def calculate_optimize(molobj):
    """
    Optimize, get coordinates


    """



    return dict()


def calculate_thermodynamics(molobj):

    header = """

"""


    return dict()


def calculate_orbitals(molobj):


    return dict()


def calculate_vibrations():


    return dict()


def calculate_solvation():


    return dict()



def setup(rungms, tmp, scr):
    """
    """

    return



def prepare_atoms(atoms, coordinates):

    lines = []
    line = "{:2s}    {:2.1f}    {:f}     {:f}    {:f}"

    for atom, coord in zip(atoms, coordinates):
        idx = cheminfo.get_atom(atom)
        lines.append(line.format(atom, idx, *coord))

    lines = [" $data", "Title", "C1"] + lines + [" $end"]

    return "\n".join(lines)



def prepare_xyz(filename, charge, header):
    """
    """

    atoms, coordinates = rmsd.get_coordinates_xyz("test.xyz")

    lines = prepare_atoms(atoms, coordinates)
    header = header.format(charge)

    gmsin = header + lines

    return gmsin



def prepare_mol(filename, header, add_hydrogens=True):
    """
    """

    atoms = []
    coordinates = []

    with open(filename, 'r') as f:
        molfmt = f.read()
        mol = Chem.MolFromMolBlock(molfmt)

    # get formal charge
    charge = Chem.GetFormalCharge(mol)

    # Add hydrogens
    if add_hydrogens:
        mol = Chem.AddHs(mol)
        AllChem.EmbedMolecule(mol, AllChem.ETKDG())

    # Get coordinates
    conf = mol.GetConformer(0)
    for atom in mol.GetAtoms():
        pos = conf.GetAtomPosition(atom.GetIdx())
        xyz = [pos.x, pos.y, pos.z]
        coordinates.append(xyz)
        atoms.append(atom.GetSymbol())
        # print(atom.GetSymbol(), xyz)

    header = header.format(charge)
    lines = prepare_atoms(atoms, coordinates)

    return header + lines


def molobj2gmsinp(mol, header, add_hydrogens=False):
    """
    RDKit Mol object to GAMESS input file

    returns:
        str - GAMESS input file
    """

    coordinates = []
    atoms = []

    # get formal charge
    charge = Chem.GetFormalCharge(mol)

    # Add hydrogens
    if add_hydrogens:
        mol = Chem.AddHs(mol)
        AllChem.EmbedMolecule(mol, AllChem.ETKDG())

    # Get coordinates
    conf = mol.GetConformer(0)
    for atom in mol.GetAtoms():
        pos = conf.GetAtomPosition(atom.GetIdx())
        xyz = [pos.x, pos.y, pos.z]
        coordinates.append(xyz)
        atoms.append(atom.GetSymbol())

    header = header.format(charge)
    lines = prepare_atoms(atoms, coordinates)

    return header + lines


def calculate(filename, folder="./", store_output=True):
    """
    Use GAMESS shell and calculate
    """

    logfile = filename.replace(".inp", ".log")

    cmd = __rungms__ + " " + filename
    if store_output:
        cmd += " > " + folder + logfile

    stdout, stderr = shell.shell(cmd, shell=True)

    return stdout, stderr


def gmslog2molobj(logfile):

    



    return


def clean():
    """
    """

    # TODO rewrite

    shell.shell("rm ~/scr/*", shell=True)

    return


def check_output(output):

    # TODO ELECTRONS, WITH CHARGE ICHARG=

    # TODO redo in Python. Real categories of fail. Better output
    # TODO Did gasphase or solvent phase not converge?
    # TODO How many steps?
    #
    # grep  "FAILURE" *.log
    # grep  "Failed" *.log
    # grep  "ABNORMALLY" *.log
    # grep  "SCF IS UNCONVERGED" *.log
    # grep "resubmit" *.log
    # grep "IMAGINARY FREQUENCY VIBRATION" *.log


    return True, ""


def check_filename(filename):
    """
    Check that the GAMESS calculation is not crashed
    """

    return True, ""



if __name__ == "__main__":


    with open("header_pm3_opt") as f:
        header = f.readlines()
        header = "".join(header)


    # gmsinp = prepare_xyz("test.xyz", 0, header)

    gmsinp = prepare_mol("test_charge.mol", header)

    f = open("test.inp", 'w')
    f.write(gmsinp)
    f.close()

    calculate("test.inp", folder="./")
    clean() # In production this should be automatic!


