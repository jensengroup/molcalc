
import numpy as np

import rdkit.Chem as Chem
import rdkit.Chem.AllChem as AllChem

from io import StringIO
import sys

Chem.WrapLogs()

global __ATOM_LIST__
__ATOM_LIST__ = [ x.strip() for x in ['h ','he', \
      'li','be','b ','c ','n ','o ','f ','ne', \
      'na','mg','al','si','p ','s ','cl','ar', \
      'k ','ca','sc','ti','v ','cr','mn','fe','co','ni','cu', \
      'zn','ga','ge','as','se','br','kr', \
      'rb','sr','y ','zr','nb','mo','tc','ru','rh','pd','ag', \
      'cd','in','sn','sb','te','i ','xe', \
      'cs','ba','la','ce','pr','nd','pm','sm','eu','gd','tb','dy', \
      'ho','er','tm','yb','lu','hf','ta','w ','re','os','ir','pt', \
      'au','hg','tl','pb','bi','po','at','rn', \
      'fr','ra','ac','th','pa','u ','np','pu'] ]


def get_atom(atom):
    """
    """
    global __ATOM_LIST__
    atom = atom.lower()
    return __ATOM_LIST__.index(atom) + 1


def molobj_to_sdfstr(mol):
    """
    """

    sio = StringIO()
    w = Chem.SDWriter(sio)
    w.write(mol)
    w.flush()
    sdfstr = sio.getvalue()

    return sdfstr


def sdf_to_smiles(sdfstr):
    """
    """

    sio = sys.stderr = StringIO()
    mol = Chem.MolFromMolBlock(sdfstr)

    if mol is None:
        return None, sio.getvalue()

    smiles = Chem.MolToSmiles(mol)
    status = ""

    return smiles, status


def molstr_to_smiles(molstr):
    """
    """

    sio = sys.stderr = StringIO()
    mol = Chem.MolFromMolBlock(molstr)

    if mol is None:
        return None, sio.getvalue()

    smiles = Chem.MolToSmiles(mol)
    status = ""

    return string, status


def smiles_to_sdfstr(smilesstr):
    """
    """

    # sio = sys.stderr = StringIO()
    mol = Chem.MolFromSmiles(smilesstr)

    if mol is None:
        return None, sio.getvalue()

    sdfstr = molobj_to_sdfstr(mol)
    status = ""

    return sdfstr, status

