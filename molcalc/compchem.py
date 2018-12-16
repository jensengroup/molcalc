
import numpy as np

import rdkit.Chem as Chem
import rdkit.Chem.AllChem as AllChem
import rdkit.Chem.Draw as Draw

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

    *

    """
    global __ATOM_LIST__
    atom = atom.lower()
    return __ATOM_LIST__.index(atom) + 1


def molobj_add_hydrogens(molobj):

    molobj = Chem.AddHs(molobj)

    return molobj

def molobj_optimize(molobj):

    print(Chem.MolToMolBlock(molobj))

    AllChem.EmbedMolecule(molobj)
    AllChem.MMFFOptimizeMolecule(molobj)

    print()
    print(Chem.MolToMolBlock(molobj))

    return


def molobj_to_sdfstr(mol):
    """

    .

    """

    sio = StringIO()
    w = Chem.SDWriter(sio)
    w.write(mol)
    w.flush()
    sdfstr = sio.getvalue()

    return sdfstr


def molobj_to_smiles(mol):
    """

    RDKit Mol Obj to SMILES wrapper

    """

    smiles = Chem.MolToSmiles(mol)

    return smiles


def molobj_to_svgstr(molobj,
                     highlights=None,
                     pretty=False):
    """

    Returns SVG in string format

    """

    svg = Draw.MolsToGridImage(
        [molobj],
        molsPerRow=1,
        subImgSize=(400,400),
        useSVG=True,
        highlightAtomLists=[highlights])

    svg = svg.replace("xmlns:svg", "xmlns")

    if pretty:

        svg = svg.split("\n")

        for i, line in enumerate(svg):

            # Atom letters
            if "text" in line:

                replacetext = "font-size"
                borderline = "fill:none;fill-opacity:1;stroke:#FFFFFF;stroke-width:10px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;"

                # Add border to text
                border_text = line
                border_text = border_text.replace('stroke:none;', '')
                border_text = border_text.replace(replacetext, borderline+replacetext )

                svg[i] = border_text + "\n" + line

                continue


            if "path" in line:

                # thicker lines
                line = line.replace('stroke-width:2px', 'stroke-width:3px')
                svg[i] = line

        svg = "\n".join(svg)

    return svg


def sdfstr_to_molobj(sdfstr):
    """
    SDF to mol obj
    """

    sio = sys.stderr = StringIO()
    mol = Chem.MolFromMolBlock(sdfstr)

    if mol is None:
        return None, sio.getvalue()

    return mol, ""


def sdf_to_smiles(sdfstr):
    """
    SDF to SMILES converter
    """

    sio = sys.stderr = StringIO()
    mol = Chem.MolFromMolBlock(sdfstr)

    if mol is None:
        return None, sio.getvalue()

    smiles = Chem.MolToSmiles(mol)
    status = ""

    return smiles, status


def smiles_to_sdfstr(smilesstr):
    """
    SMILES to SDF converter
    """

    sio = sys.stderr = StringIO()
    mol = Chem.MolFromSmiles(smilesstr)

    if mol is None:
        return None, sio.getvalue()

    sdfstr = molobj_to_sdfstr(mol)
    status = ""

    return sdfstr, status

