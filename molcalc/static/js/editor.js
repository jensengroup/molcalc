$(document).ready(function() {

// Editor specific wrapper functions

function getEditorDimensions()
{
    var $content = $('.mc-content');
    var width = $content.innerWidth();
    var height = $content.innerHeight();
    return [width, height];
}


// Chemdoodle functions
function chemdoodleResize(canvas)
{
    var dim = getEditorDimensions();
    var width = dim[0];
    var height = dim[1];
    canvas.resize(width, height);
    setTimeout(function() {
        chemdoodleClick('#sketcherSingle_button_scale_plus');
    }, 50);
}

function chemdoodleClick(btnId)
{
    var $btn;

    if (btnId.includes("#"))
    {
        $btn = $(btnId)[0];
    }
    else
    {
        $btn = $('#'+btnId)[0];
    }

    $btn.click();
    return 1;
}

function chemdoodleEditorBtn($btn)
{
    var btnId = $btn.attr("href");
    chemdoodleClick(btnId);
    return false;
}

function chemdoodleGetMol(canvas)
{
    var mol = canvas.getMolecule();
    var molFile = ChemDoodle.writeMOL(mol);
    return molFile;
}

function chemdoodleSetMol(canvas, mol)
{
    molcd = ChemDoodle.readMOL(mol)
    canvas.loadMolecule(molcd);
    chemdoodleResize(canvas);
    return false;
}


// JSmol functions
function jsmolSetMol(canvasObj, molStr)
{
    // http://wiki.jmol.org/index.php/File_formats/Chemical_Structure

    jsmolCmd(canvasObj, "load inline '"+molStr+"'");
    jsmolCmd(canvasObj, "minimize addHydrogens");

    return false;
}

function jsmolSetSmiles(canvasObj, smilesStr)
{
    // TODO

    //load $smilesString

    // You can load SMILES strings, and Jmol will turn them into 3D models
    // using the NIH Cactus server. As for reading files from any source
    // outside your domain, you will have to use the signed applet or Jmol
    // application to do this. These files can be saved as MOL files using
    // write xxx.mol or load $xxxx AS "myfile.mol", and if the conformation
    // is not to your liking, switching to set modelkitMode or using set
    // picking dragMinimize you can quickly adjust the model to the desired
    // conformation. Quotation marks should be used for names that include
    // the space character: load "$ethyl acetate".

    return false;
}

function jsmolResize(canvasObj)
{
    var dim = getEditorDimensions();
    var width = dim[0];
    var height = dim[1];

    // canvas.resize(width, height);
    // chemdoodleClick('#sketcherSingle_button_scale_plus'); // Zoom

    return false;
}

function jsmolCmd(jmolObj, cmd)
{
    Jmol.script(jmolObj, cmd);
    return false;
}

// View checking

function getView()
{
    rel = $('.toolset.tool-choice .button.active').attr("rel");
    return rel;
}

function setCurrentSDF(sdf)
{
    var view = getView();
    if (view == "2d")
    {
        mol = chemdoodleSetMol(sketcher, sdf);
    }
    else
    {
        jsmolSetMol(myJmol1, sdf);
    }
    return false;
}

function getCurrentSDF()
{
    var view = getView();
    var mol;

    if (view == "2d")
    {
        mol = chemdoodleGetMol(sketcher);
    }
    else
    {
        mol = jsmolGetMol(myJmol1);
    }

    return mol;
}


// Production ///////////////////////////////////////////////////



// Chemdoodle
$('.toolset.chemdoodle a.button.chemdoodle').click(function () {
    chemdoodleEditorBtn($(this));
    return false;
});

waitForElement("#sketcherSingle", function() {
    // Init chemdoodle
    // var molTest = 'Molecule Name\n  CHEMDOOD01011121543D 0   0.00000     0.00000     0\n[Insert Comment Here]\n  6  6  0  0  0  0  0  0  0  0  1 V2000\n    0.0000    1.0000    0.0000   N 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.0000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  2  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  2  0  0  0  0\n  6  1  1  0  0  0  0\nM  END'
    // chemdoodleSetMol(sketcher, molTest); // Load start molecule

    setTimeout(function() {
        chemdoodleResize(sketcher); // Resize
    }, 100);
});


// Jsmol
var $jsmolAtomBtns = $('.action.atom .button');
$jsmolAtomBtns.click(function ()
{

    var cmd = $(this).attr('rel');
    $('.toolset.jsmol .action.atom .button.active').removeClass("active");

    switch(cmd)
    {
        case 'off':
            jsmolCmd(myJmol1, 'set atomPicking off');
            break;
        case 'dra':

            jsmolCmd(myJmol1, 'set atomPicking on');
            jsmolCmd(myJmol1, 'set picking dragMinimize'); // on off
            $(this).addClass('active');
            break;
        default:
            jsmolCmd(myJmol1, 'set atomPicking on');
            jsmolCmd(myJmol1, 'set picking dragMinimize');
            jsmolCmd(myJmol1, 'set picking assignAtom_'+cmd);
            $(this).addClass('active');
    }

    return false;
});


$jsmolBondBtns = $('.toolset.jsmol .action.bond .button')
$jsmolBondBtns.click(function()
{
    var bond = $(this).attr('rel');
    $(".toolset.jsmol .action.bond .button.active").removeClass('active');

    if(bond == 'n')
    {
        jsmolCmd(myJmol1, 'set bondpicking false;');
    }
    else
    {
        jsmolCmd(myJmol1, 'set picking assignBond_'+bond+';');
        $(this).addClass('active');
    }

    return false;
});


// Resize editors on window resize
function onWindowResize()
{
    $(window).on('resize', function()
    {
        chemdoodleResize(sketcher);
    });
}

// Refresh before play
onWindowResize();


// Switch between 3D and 2D
$('#editor-jsmol').hide();
$('.toolset.jsmol').hide();

swithBtns = $('.toolset.tool-choice .button').click(function () {

    $that = $(this);

    if($that.hasClass("active"))
    {
        return false;
    }

    var cont = $that.attr("rel");

    if(cont == "3d")
    {
        var sdf = chemdoodleGetMol(sketcher);
        jsmolSetMol(myJmol1, sdf);
        $('#editor-chemdoodle').hide();
        $('.toolset.chemdoodle').hide();
        $('#editor-jsmol').show();
        $('.toolset.jsmol').show();
    }
    else if (cont == "2d")
    {
        var sdf = jsmolGetMol(myJmol1);
        chemdoodleSetMol(sketcher, sdf);
        $('#editor-jsmol').hide();
        $('.toolset.jsmol').hide();
        $('#editor-chemdoodle').show();
        $('.toolset.chemdoodle').show();
    }

    swithBtns.removeClass("active");
    $that.addClass("active");

    return false;

});

// Load molecules
$('.toolset .load_methane').click(function () {

    var filename = "static/molecules/methane.sdf";

    request(filename, {}, function(data) {
        var sdf = data;
        setCurrentSDF(sdf);
    }, function(data) {
        // TODO alert
    });

    return false;
});
$('.toolset .load_benzene').click(function () {

    var filename = "static/molecules/benzene.sdf";

    request(filename, {}, function(data) {
        var sdf = data;
        setCurrentSDF(sdf);
    }, function(data) {
        // TODO alert
    });

    return false;
});
$('.toolset .load_water').click(function () {

    var filename = "static/molecules/dioxidane.sdf";

    request(filename, {}, function(data) {
        var sdf = data;
        setCurrentSDF(sdf);
    }, function(data) {
        // TODO alert
    });

    return false;
});


// Move to quantum
$('.button.quantum').click(function () {

    var promptQuantum = new $.Prompt();
    promptQuantum.setMessage('See quantum properties for the molecule?');
    promptQuantum.addResponseBtn('Indeed', function()
    {
        var $loading = $('<div class="meter"><span style="width: 100%"></span></div>');
        var promptCalculation = new $.Prompt();
        promptCalculation.setMessage($loading);
        promptCalculation.setType("transparent");
        promptCalculation.show();

        var mol = getCurrentSDF();
        request("/ajax/submitquantum", {sdf:mol}, function (data)
        {
            url = window.location.href.replace('editor', '');
            url = url + 'calculations/' + data["hashkey"];
            window.location = url;
            promptCalculation.cancel();
        }, function() {
            promptCalculation.cancel();
        });
        promptQuantum.cancel();
    });
    promptQuantum.addCancelBtn("Not yet");
    promptQuantum.show();

    return false;
});



// Get name
$('.button.getName').click(function () {

    // Setup loading
    var $loading = $('<div class="meter"><span style="width: 100%"></span></div>');
    var promptWait = new $.Prompt();
    promptWait.setMessage($loading);
    promptWait.show();

    var mol = getCurrentSDF();

    request("/ajax/sdf", {"sdf": mol}, function (data)
    {
        promptWait.cancel();
        var promptCalculation = new $.Prompt();

        if(data["error"]) {

            promptCalculation.setMessage(data["message"]);

        } else {

            // contact cactus
            promptCalculation.setMessage($loading);
            promptCalculation.setType("transparent");

            // prepare smiles
            search = data["smiles"];

            requestCactus(search, 'iupac_name', function(data)
            {

                name = data;
                name = name.toLowerCase();

                var promptCactus = new $.Prompt();
                promptCactus.setMessage(name);
                promptCactus.addCancelBtn("Thanks");
                promptCactus.show();

                promptCalculation.cancel();


            }, function(status)
            {
                promptCalculation.cancel();
            });

        } // data

        promptCalculation.show();

    }, function() {
        promptWait.cancel();
    });

    return false;
});




// // Searchbar
var $searchFrm = $(".mc-editor-searchbar form");
var $searchBar = $(".mc-editor-searchbar");
var $searchBtn = $(".mc-editor-searchbar a");
var $searchInp = $(".mc-editor-searchbar input");
var $searchBarBtn = $(".mc-mobile-search a");


function changeInputStatus(input, stats) {

    input.removeClass();
    input.addClass(stats);

    if(stats == "loading") {
        input.prop('disabled', true);
    }
    else{
        input.prop('disabled', false);
    }

}

$searchInp.on('blur', function() {

    $searchBar.removeClass("active");

});

$searchInp.on('focus', function() {

});

$searchBarBtn.click(function () {

    $searchBar.addClass("active");

    setTimeout(function() {
        $searchBar.find("input:first").focus();
        return false;
    }, 100);


    return false;

});

$searchFrm.submit(function(event) {

    event.preventDefault();

    changeInputStatus($searchInp, "loading");

    var search = $searchInp.val();

    if (!search || 0 === search.length)
    {
        changeInputStatus($searchInp, "empty");
        $searchInp.focus();
        return false;
    }

    requestCactus(search, 'smiles', function(data)
    {
        var promptSearch = new $.Prompt();
        promptSearch.setMessage("Converting " + data);
        promptSearch.show();

        data = {"smiles": data};

        request("/ajax/smiles", data, function(rtnData)
        {
            var sdfstr = rtnData["sdf"][0];

            setCurrentSDF(sdfstr);

            promptSearch.cancel();
            onWindowResize();
        });

        // reset search on success
        $searchInp.focus();
        $searchInp.val("");
        changeInputStatus($searchInp, 'success');

    }, function(status)
    {
        changeInputStatus($searchInp, 'failed');
    });

    return false;
});


});

