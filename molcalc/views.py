
import hashlib
import os

import pyramid.httpexceptions as httpexceptions
from pyramid.view import notfound_view_config, view_config

import compchem
from qm_packages import gamess


# Error Views

@notfound_view_config(renderer='templates/page_404.html')
def not_found(request):
    request.response.status = 404
    return {}


# Calculation Views

@view_config(route_name='editor', renderer='templates/page_editor.html')
def editor(request):
    """

    Standard view for MolCalc. Static HTML.

    """
    return {}

@view_config(route_name='calculation', renderer='templates/page_calculation.html')
def view_calculation(request):
    """

    View for looking up calculations.

    """

    matches = request.matchdict
    hashkey = matches['one']

    # Get from database
    print(hashkey)

    data = {}

    data["hashkey"] = hashkey
    data["smiles"] = "Cc1ccc2cc3ccccc3cc2c1"
    data["name"] = "2-methylanthracene"

    if hashkey == "404":
        raise httpexceptions.exception_response(404)

    return data


@view_config(route_name='calculations', renderer='templates/page_calculation.html')
def view_calculations(request):
    """

    Statistic about current calculations? Iono, maybe not.
    Kind of destroyed the IO / browser last time


    """
    return {}


# Static page view

@view_config(route_name='about', renderer='templates/page_about.html')
def about(request):
    return {}

@view_config(route_name='help', renderer='templates/page_help.html')
def page_help(request):
    return {}

@view_config(route_name='sdf_to_smiles', renderer='json')
def ajax_sdf_to_smiles(request):

    if not request.POST:
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


# Ajax views

@view_config(route_name='smiles_to_sdf', renderer='json')
def ajax_smiles_to_sdf(request):

    if not request.POST:
        return {'error':'Error 53 - Missing key', 'message': "Error. Missing information."}

    try:
        smiles = request.POST["smiles"].encode('utf-8')
    except:
        return {'error':'Error 58 - get error', 'message': "Error. Missing information."}

    sdfstr = compchem.smiles_to_sdfstr(smiles)

    msg = {"sdf" : sdfstr}

    return msg


@view_config(route_name='submitquantum', renderer='json')
def ajax_submitquantum(request):

    if not request.POST:
        return {'error':'Error 128 - empty post', 'message': "Error. Empty post."}

    if not request.POST["sdf"]:
        return {'error':'Error 132 - sdf key error', 'message': "Error. Missing information."}

    sdf = request.POST["sdf"].encode('utf-8')
    # smiles, status = compchem.sdf_to_smiles(sdf)

    molobj, status = compchem.sdfstr_to_molobj(sdf)
    smiles = compchem.molobj_to_smiles(molobj)

    if smiles is None:

        status = status.split("]")
        status = status[-1]

        return {'error':'Error 141 - rdkit error', 'message': status}


    hshobj = hashlib.md5(smiles.encode('utf-8'))
    hashkey = hshobj.hexdigest()

    msg = {
        "smiles" : smiles,
        "hashkey" : hashkey
    }

    # TODO Either create "data" or create table in database

    # check if folder exists
    here = os.path.abspath(os.path.dirname(__file__)) + "/"
    datahere = here + "data/"

    if os.path.isdir(datahere + hashkey):
        # return msg
        pass

    else:
        os.mkdir(datahere + hashkey)

    os.chdir(datahere + hashkey)


    # Minimize with forcefield first
    molobj = compchem.molobj_add_hydrogens(molobj)
    compchem.molobj_optimize(molobj)

    headerfilename = here + "settings/gamess/header_pm3_opt"

    with open(headerfilename) as headerfile:
        header = headerfile.read()

    # Prepare gamess input
    inpstr = gamess.molobj2gmsinp(molobj, header)

    # Save and run file
    with open("optimize.inp", "w") as f:
        f.write(inpstr)
        f.close()

    gamess.calculate("optimize.inp")
    gamess.clean()

    # Check output
    status, message = gamess.check("optimize.log")

    os.chdir(here)

    if not status:
        msg["error"] = "error 192: QM Calculation fail"
        msg["message"] = message
        return msg


    # Success, setup database


    return msg



