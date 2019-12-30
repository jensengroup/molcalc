
// Check storage compability

var storage;
var fail;
var uid;

try {
	uid = new Date;
	(storage = window.localStorage).setItem(uid, uid);
	fail = storage.getItem(uid) != uid;
	storage.removeItem(uid);
	fail && (storage = false);
} catch (exception) {}



// Wait for element to exists

var waitForElement = function(selector, callback) {
	if (jQuery(selector).length) {
		callback();
	} else {
		setTimeout(function() {
			waitForElement(selector, callback);
		}, 100);
	}
};


// AJAX wrapper

function request(url, data, successFunction, failedFunction)
{
    var $xhr = $.ajax({
        type: "POST",
        url: url,
        data: data,
        timeout: 6000,
        error: function(xhr, textStatus, errorThrown)
        {
            // Frontend error
            var promptError= new $.Prompt();
            promptError.addCancelBtn("Okay");

            if(textStatus==="timeout") {
                promptError.setMessage("Connection problems. Are you still connected to the internet? Wait a bit and try again");
                promptError.show();
            }

            if(xhr.status === 404) {
                promptError.setMessage("Connection problems. Try refreshing the site.");
                promptError.show();
            }

            if(xhr.status === 500) {
                promptError.setMessage("Internal server error. Please submit issue.");
                promptError.show();
            }

            if (failedFunction === undefined){}
            else{
                failedFunction();
            }

        },
        success: function(data)
        {

            if(data['error'])
            {
                // Backend error
                console.log(data["error"]);

                var promptError= new $.Prompt();
                promptError.setMessage(data["message"]);
                promptError.addCancelBtn("Okay");
                promptError.show();

                if (failedFunction === undefined){}
                else {
                    failedFunction();
                }
            }
            else
            {
                // Success
                successFunction(data);
            }

        }
    });

    return $xhr
}


function requestCactus(from, to, successFunction, failedFunction)
{

    // for example
    // https://cactus.nci.nih.gov/chemical/structure/butanol/smiles

    search = from
    search = search.replace("[", "%5B");
    search = search.replace("]", "%5D");
    search = search.replace("@", "%40");
    search = search.replace("=", "%3D");
    search = search.replace("#", "%23");

    var url = "https://cactus.nci.nih.gov/chemical/structure/"+ search +"/" + to

    var promptError= new $.Prompt();
    promptError.addCancelBtn("Okay");

    var $xhr = $.ajax({
        type: "GET",
        url: url,
        timeout: 5000,
        error: function(xhr, textStatus, errorThrown) {

            // Error
            var status = xhr.status;

            if(status == 0)
            {
                // connection problem
                promptError.setMessage("Connection problems to cactus.nci.nih.gov. Wait a bit and try again");
            }
            else if (status == 404)
            {
                // unable to find
                promptError.setMessage("Unable to find molecule in cactus.nci.nih.gov database");
            }

            promptError.show();

            failedFunction(status);

            return false;
        },
        success: function(data, status, jqXHR) {

            // Success, now check that the result is not html
            if(jqXHR.getResponseHeader('content-type').indexOf('text/plain') < 0 ) {
                promptError.setMessage("Problems reading answer from cactus.nci.nih.gov.");
                promptError.show();
                failedFunction();
            }else{
                successFunction(data);
            }

            return data;
        }
    });
}



// functions

$(function()
{
	// Prompt function

	/*

	USAGE:
    Create a new prompt for the user like following, then add header, message,
    responses etc like this;

		var askuser = new $.Prompt();
		askuser.setTitle('This is the title');
		askuser.setMessage('This is the body text');
		askuser.addResponseBtn('Hello', function() {
            alert('action');
            askuser.cancel();
		});
        askuser.addCancelBtn();
        askuser.show();

	*/

    // Create AJAX Area
    $('body').append('<div class="ajaxarea"></div>');
    var ajaxarea = $('.ajaxarea');

    // jQuery selector for elements to hide when prompt
    // this could be java applets like Jmol
    var hideElements = $('.canvas');

    /*
     * Center object in vertical alignment
     * because that is still not possible with
     * CSS only.
     */
    jQuery.fn.center = function ()
    {
        var top_margin = Math.max(($(window).height() - $(this).outerHeight() )/ 2);
        this.css('margin-top',top_margin+'px');
        return this;
    }

    /**
     * Prompt gives the user a prompt message to respond too.
     */
    jQuery.Prompt = function Prompt()
    {
        // Define the parent block
        var stamp = new Date().getTime();
        this.stamp = stamp;
        this.parentblock = $('<div></div>');
        this.parentblock.attr('id', stamp);
        this.parentblock.hide();
        ajaxarea.append(this.parentblock);

        // Define some HTML Blocks
        var background = $('<div class="prompt-container"></div>');
        var box = $('<div class="prompt-box"></div>');
        var boxHeader = $('<div class="prompt-header"></div>');
        var boxMessage = $('<div class="prompt-message"></div>');
        var boxFooter = $('<div class="prompt-respond"></div>');

        // Hide Elements by default
        boxHeader.hide();
        boxFooter.hide();

        // Define the class variables
        this.title = "&nbsp;";
        this.message = "&nbsp;";
        this.response = "&nbsp;";
        this.responselist = $('<ul></ul>');

        this.addClass = function addClass() {}
        this.removeClass = function removeClass() {}

        this.setMessage = function addMessage(message)
        {
            this.message = message;
        }

        this.setTitle = function addTitle(title)
        {
            this.title = title;
            boxHeader.show();
        }

        this.setType = function setType(type)
        {
            // Set the type of message, ask-prompt or tell-prompt.
            // Default should be ask.
            box.addClass(type);
        }

        this.addResponseBtn = function addResponseBtn(msg, action)
        {
            boxFooter.show();

            var btn = $('<a class="button">'+msg+'</a>');
            btn.click(action);
            this.responselist.append($('<li></li>').append(btn));
            return btn;
        }

        this.addCancelBtn = function addCancelBtn(msg)
        {
            stamp = this.stamp;
            msg = typeof msg !== 'undefined' ? msg : "Cancel";
            this.addResponseBtn(msg, function()
            {
                hide();
                $('#'+stamp).remove();
            });
        }

        this.getStamp = function getStamp()
        {
            return this.stamp;
        }

        this.show = function show()
        {
            //if(this.responselist.find('li').size() > 0)
            //{
            this.response = this.responselist;
            //}

            // Insert Variable
            boxMessage.append(this.message);
            boxFooter.html('<div></div>');
            boxFooter.append(this.response);
            boxFooter.append('<div class="clean"></div>');

            // Filling
            var html = box;

            html.append(boxHeader.html($('<strong></strong>').html(this.title)));
            html.append(boxMessage.html(this.message));
            html.append(boxFooter);

            html = background.append(html);

            hideElements.hide();

            this.parentblock.html(html);
            this.parentblock.show();

            document.activeElement.blur();

        }

        function hide()
        {
            $('#'+stamp).fadeOut(100, function()
            {
                hideElements.show();
            });

            // Unbind window resize
            $(window).unbind('resize');
        }

        this.cancel = function cancel()
        {
            hide();
        }

    } // end Prompt

}); // end functions

// RDKit ////////////////////////////////////////////////////////


function smilesToSdf(smi)
{

    var mol = RDKit.Molecule.fromSmiles( smi );

	mol.addHs();
	mol.Embedmolecule3D();
	mol.removeHs();
	mol3d = mol.sdwrite();

	return mol3d;
}

function sdfToSmiles(sdf)
{
    /*

        NOTE Seems like removeHs is added automatically

    */
    var mol = RDKit.Molecule.MolBlockToMol(sdf);

    var smi = mol.smilewrite();
    var arr = smi.split(" ");
    var first = arr.shift();
    smi = first

    return smi;
}


// JSmol ////////////////////////////////////////////////////////

function jsmolGetMol(canvasObj, include_hydrogen=false)
{
    // returns a JSON object with all the atoms
    // var atominfo = Jmol.getPropertyAsArray(canvasObj, "atominfo", "all");

    // The extractModel keyword delivers text in the form of a MOL file,
    // allowing up to 999 atoms and 999 bonds to be "extracted" from the
    // model as an independent structure.
    var sdf;
    if(include_hydrogen)
    {
        sdf = Jmol.getPropertyAsString(canvasObj, "extractModel", "all");
    }
    else {
        sdf = Jmol.getPropertyAsString(canvasObj, "extractModel", "not hydrogen");
    }

    return sdf;
}

function jsmolGetSmiles(canvasObj)
{
    // Get the structure JSmol 14.0.2 syntax
    var smiles = Jmol.evaluateVar(canvasObj, '{*}.find("SMILES/noaromatic")');

    // remove comments
    smilesList = smiles.split("\n");
    smilesList.shift();

    return smiles;
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

// ChemDoodle

function chemdoodleResize(canvas, dim)
{
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
    molcd = ChemDoodle.readMOL(mol);
    canvas.loadMolecule(molcd);
    return false;
}



// Production ///////////////////////////////////////////////////////

$(document).ready(function()
{


// Check storage compatibility

if (storage == undefined)
{
    // TODO Prompt user to change settings
    // Usually for chrome

    // link:
    // https://www.chromium.org/for-testers/bug-reporting-guidelines/uncaught-securityerror-failed-to-read-the-localstorage-property-from-window-access-is-denied-for-this-document
    // console.log(storage);
    // console.log(fail);
    // console.log(uid);

}


// Navigation

var $sidebarBtns = $('.btnSidebar');
var $sidebarCloseBtns = $('.btnCloseSidebar');

$sidebarBtns.click(function (){
    $('.sidebar').removeClass("active");
	var link = $(this).attr('href');
    $sidebar = $(link);
    $sidebar.addClass("active");
    return false;
});

$sidebarCloseBtns.click(function (){
	var link = $(this).attr('href');
    $sidebar = $(link);
    $sidebar.removeClass("active");
    return false;
});


///////////////////////////////////////////////////////////

});

