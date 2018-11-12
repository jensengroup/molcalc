
from pyramid.view import view_config, view_defaults

from pyramid.encode import urlencode

import hashlib
import compchem

import urllib.request


@view_config(route_name='editor', renderer='templates/home.html')
def editor(request):
    return {}

@view_config(route_name='about', renderer='templates/about.html')
def about(request):
    return {}

@view_config(route_name='help', renderer='templates/page_help.html')
def page_help(request):
    return {}

@view_config(route_name='sdf_to_smiles', renderer='json')
def ajax_sdf_to_smiles(request):

    if len(request.POST) == 0:
        return {'error':'Error 55 - Missing key', 'message': "Error. Missing information."}

    try:
        sdf = request.POST["sdf"].encode('utf-8')
    except:
        return {'error':'Error 60 - get error', 'message': "Error. Missing information."}

    # Get smiles
    smiles, status = compchem.sdf_to_smiles(sdf)
    if smiles is None:

        status = status.split("]")
        status = status[-1]

        return {'error':'Error 69 - rdkit error', 'message': status}

    msg = {
        'smiles' : smiles
    }

    return msg


@view_config(route_name='smiles_to_sdf', renderer='json')
def ajax_smiles_to_sdf(request):

    if len(request.POST) == 0:
        return {'error':'Error 53 - Missing key', 'message': "Error. Missing information."}

    try:
        smiles = request.POST["smiles"].encode('utf-8')
    except:
        return {'error':'Error 58 - get error', 'message': "Error. Missing information."}

    sdfstr = compchem.smiles_to_sdfstr(smiles)

    msg = {"sdf" : sdfstr}

    return msg


@view_config(route_name='generate_ajax_data', renderer='json')
def my_ajax_view(request):

    # check if empty
    if len(request.POST) == 0:
        return {'error':'Error 55 - Missing key', 'message': "Error. Missing information."}

    # get input
    try:
        molecule = request.POST["mol"].encode('utf-8')
    except:
        return {'error':'Error 67 - get error', 'message': "Error. Missing information."}

    # get hash
    try:
        m = hashlib.md5()
        m.update(request.POST["mol"].encode('utf-8'))
        hashkey = m.hexdigest()
    except:
        return {'error':'Error 76 - Hash error', 'message': "Error. Could not understand the molecule input."}

    # Get smiles
    smiles, status = compchem.sdf_to_smiles(molecule)
    if smiles is None:

        status = status.split("]")
        status = status[-1]

        return {'error':'Error 76 - rdkit error', 'message': status}

    msg = {
        'message' : hashkey,
        'smiles' : smiles
    }

    # get iupac name 
    try:
        cmd = "https://cactus.nci.nih.gov/chemical/structure/{:}/iupac_name"

        # encode smiles
        smiles = smiles.replace("[", "%5B")
        smiles = smiles.replace("]", "%5D")
        smiles = smiles.replace("@", "%40")
        smiles = smiles.replace("=", "%3D") #double bond
        smiles = smiles.replace("#", "%23") #triple bond

        # search = urlencode(smiles)
        url = cmd.format(smiles)

        contents = urllib.request.urlopen(url).read()

        name = contents
        name = name.decode()
        name = name.lower()
        name = name.strip()

        msg['name'] = name

    except urllib.error.HTTPError:
        msg['message'] = "Unable to find IUPAC name on cactus.nci.nih.gov for " + smiles
        msg['error'] = "error cactus 404"

    return msg


