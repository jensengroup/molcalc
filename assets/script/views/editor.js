
// Jmol / JSmol Documentation
// for developers who want to work with
// jmol; good luck : )
// http://chemapps.stolaf.edu/jmol/docs/

// Settings for WebGL:
// seems not to matter with html5
// set antialiasDisplay false
// set antialiasDisplay true

$(function() {

    //
    // Functions
    //

    function runMolCmd(cmd) 
    {
        // Define Jmol object
        var editorJsmol = myJmol1;
        return Jmol.script(myJmol1, cmd);
    }


    function truncate(_value)
    {
        if (_value<0) return Math.ceil(_value);
        else return Math.floor(_value);
    }


    //
    // BUTTON LIST
    //
    //
    // Auto Minimize
    //
    // jmolScript('set useMinimizationThread on'); // FALSE or ON
    //
    // $('.canvas').mouseout(function()
    // {
    //     jmolScript('minimize');
    // });

    //
    //  Reset Molecule
    //
    // $('.action.reset .button').click(function () {
    //     jmolScript('reset ALL');
    //     return false;
    // });

    //
    //  Load Molecule Structure
    //
    $('.action.load.methane .button').click(function() {
        var xyz = "assets/molstruc/methane.mol2";
        runMolCmd('load '+xyz);

        // Reset manipulation buttons
        $('.action.atom .button.active').removeClass('active');
        $('.action.bond .button.active').removeClass('active');
    });

    $('.action.load.benzene .button').click(function() {
        var xyz = "assets/molstruc/benzene.mol2";
        runMolCmd('load '+xyz);

        // Reset manipulation buttons
        $('.action.atom .button.active').removeClass('active');
        $('.action.bond .button.active').removeClass('active');
    });

    $('.action.load.diwater .button').click(function() {
        var xyz = "assets/molstruc/dih2o.xyz";
        runMolCmd('load '+xyz);

        // Reset manipulation buttons
        $('.action.atom .button.active').removeClass('active');
        $('.action.bond .button.active').removeClass('active');
    });

    $('.action.load.search .button').click(function() {

        var askuser = new $.Prompt();
        askuser.setTitle('Load Structure');

        var message = $('<div class="form"></div>');

        // Search Field
        var field = $('<input placeholder="fx. Ethanol" type="text" />');
        message.append(field);
        message.append('<p><br />Large molecules will be ignored.</p>');

        askuser.setMessage(message);

        var load_button = askuser.addResponseBtn('Load', function()
        {
            var state = field.attr('class');
            if (state != 'success') return false;
            var val = field.val().replace(/\s/g,"%20");
            var xyz = "assets/molstruc/search.php?search="+val;
            runMolCmd('load '+xyz);
            askuser.cancel();

            // Reset manipulation buttons
            $('.action.atom .button.active').removeClass('active');
            $('.action.bond .button.active').removeClass('active');
        });

        askuser.addCancelBtn();
        askuser.show();
        field.focus();

        load_button.addClass('inactive');

        /* AJAX Search */
        var min_length = 2; // min length before searching
        var req = null; // init ajax request

        field.keyup(function(event)
        {
            // If enter
            if (event.keyCode == '13') {
                load_button.click();
                return false;
            }

            load_button.removeClass('inactive');
            load_button.addClass('inactive');

            var that = $(this);
            value = that.val();
            if(req != null) req.abort();
            that.removeClass(); // remove all classes

            if(value.length >= min_length)
            {
                that.addClass('loading');
                req = $.ajax({
                    type: "GET",
                    url: "assets/molstruc/check.php",
                    data: {'search' : value.replace(/\s/g,"%20")},
                    dataType: "text",
                    success: function(msg){
                        that.removeClass('loading');
                        if(msg==0)
                        {
                            that.addClass('fail');
                        }
                        else
                        {
                            load_button.removeClass('inactive')
                            that.addClass('success');
                        }
                    }
                });
            }
        });

        return false;
    }); // load search


    //
    // Restore Molecule State
    //
    $('.action.restore .button').click(function()
    {
        runMolCmd('restore STATE temp');
        return false;
    });

    //
    //  Save Molecule
    //
    $('.action.save .button').click(function()
    {
        runMolCmd('save STATE temp');
        return false;
    });

    //
    // Undo last action
    //
    $('.action.undo .button').click(function ()
    {
        // Not implemented yet
    });

    //
    // Minimize structure using MMFF
    //
    $('.action.minimize .button').click(function ()
    {
        runMolCmd('set forcefield "MMFF"');
        runMolCmd('minimize');

        // TODO
        // Faster minimization
        // echo("Minimization using MMFF&hellip;")
        // delete hydrogens; delay 1; minimze steps 3; calculate hydrogens;
        // centerat boundbox;
        // zoom 0;
        // set echo top left;echo;
        // Maybe put $.Prompt, when minimising?
        // JSmol minimse status? pct? eta?

        return false;
    });

    //
    // Get the name of the current structre
    //
    $('.action.name .button').click(function ()
    {


        var asdf = Jmol.evaluateVar(myJmol1, 'image/png');
        console.log(asdf);

        var namePrompt = new $.Prompt();
        var message = $('<div class="main-message"></div>');
        namePrompt.setTitle('Name Finder');
        namePrompt.setMessage(message);

        var loadingbar = "<div class=\"loading_bar\"><div class=\"bar\" style=\"width: 100%;\"></div></div>";
        message.append(loadingbar);
        message.append("<p>Searching for structure name&hellip;</p>");

        namePrompt.show();

        // Get the structure
        // for JSmol 14.0.2
        var smiles = Jmol.evaluateVar(myJmol1, '{*}.find("SMILES", true)');
        var names = [];

        console.log(smiles);

        smilesList = smiles.split("\n");
        smilesList.shift();

        for(var i = 0; i < smilesList.length; i++)
        {
            item = smilesList[i].substr(8);


            var itemReq = item;

            req = $.ajax()

            var req = $.ajax({
                type: "POST",
                url: 'http://cactus.nci.nih.gov/chemical/structure/'+itemReq+'/iupac_name',
                /* url: 'http://cactus.nci.nih.gov/chemical/structure/'+item+'/names', */
                dataType: "text"
            });


            req.done(function(data) {

                var names = data.split("\n");
                var namesHTML = $('<ul style=""></ul>');

                for(var i = 0; i < names.length; i++)
                {
                    namesHTML.append($('<li>'+names[i]+'</li>'))
                }

                message.html('<strong>Names for '+item+'</strong>');
                message.append(namesHTML);
                namePrompt.addCancelBtn('Okay');
            });


            req.fail(function() {
                var errPrompt = new $.Prompt();
                errPrompt.setMessage('Could not find name for '+item);
                errPrompt.addCancelBtn('Okay');
                errPrompt.show();
                namePrompt.cancel();
            });


        }



        return false;
    });


    /*
    * Add Atom
    */
    $('.action.atom .button').click(function()
    {

        var atom = $(this).attr('rel');
        $('.action.atom .button.active').removeClass('active');

        switch(atom)
        {
            case 'off':
                runMolCmd('set atomPicking off');
                break;
            case 'dra':

                // set allowMoveAtoms FALSE
                // Set this parameter TRUE to allow the moving of selected atoms (not just whole molecules) using ALT-LEFT drag and ALT-SHIFT-LEFT drag.

                runMolCmd('set atomPicking on');
                runMolCmd('set picking dragMinimize'); // on off
                //jmolScript('set picking dragAtom'); // on off

                $(this).addClass('active');
                break;
            default:
                runMolCmd('set atomPicking on');
                runMolCmd('set picking dragMinimize');
                runMolCmd('set picking assignAtom_'+atom);
                $(this).addClass('active');
        }

        //notes:
        //jmolScript('set atompicking false;');
        //jmolScript("set minimizationRefresh false;set useMinimizationThread false");
        //jmolScript("set picking dragmolecule;");
        //jmolScript('set picking off');

        // set picking MEASURE
        //   Same as set picking MEASURE DISTANCE but also displays a distance
        //   measurement on the molecule.
        // set picking MEASURE DISTANCE
        //   Turns picking on and returns atom identities and distance between
        //    two atoms. Three messages are sent to the MessageCallback function,
        //    if defined: Atom #1 (after the first click) and then Atom #2 and
        //    Distance (after the second click).

        return false;
    });


    //
    // Set Bond Type
    //
    $('.action.bond .button').click(function()
    {
        var bond = $(this).attr('rel');

        $('.action.bond .button.active').removeClass('active');

        if(bond == 'n')
        {
            runMolCmd('set bondpicking false;');
        }
        else
        {
            runMolCmd('set picking assignBond_'+bond+';');
            $(this).addClass('active');
        }

        return false;
    });


    //
    // Calculate Button
    //
    $('.actions.calculation .button.calculate').click(function()
    {

        // Calculate Partial charges on molecule
        runMolCmd('calculate partialCharge');

        // jsmol
        var atominfo = Jmol.getPropertyAsArray(myJmol1, "atominfo", "all"); // returns a JSON object with all the atoms

        // Check Molecule size
        var Natoms=atominfo.length, Nhydrogens=0;
        for(var i = 0; i < Natoms; i++)
        {
            if(atominfo[i].elemno == 1)
            {
                Nhydrogens = Nhydrogens + 1;
            }
        }

        if(Natoms-Nhydrogens > 10)
        {
            var tellUser = new $.Prompt;
            tellUser.setMessage("Your molecule is too complex. <br /> Restrict yourself to 10 non-hydrogen atoms.");
            tellUser.addCancelBtn("Okay");
            tellUser.show();
            return false;
        }

        // Calculate Charges
        mole_charges = 0;
        core_charges = 0;

        for(var i=0; i < Natoms; i++)
        {
            formal_charge = atominfo[i].formalCharge;
            partial_charge = atominfo[i].partialCharge;
            elem_no = atominfo[i].elemno;

            mole_charges += formal_charge;
            core_charges += elem_no;
        }

        mole_charges = truncate(mole_charges);
        odd = (core_charges - mole_charges) % 2;

        if(odd)
        {
            var tellUser = new $.Prompt;
            var odd_message = "";
            odd_message += "MolCalc only works for molecules with all doubly occupied orbitals.";
            odd_message += "<br /><br /> ";
            odd_message += "Your current molecule has an odd number of electrons. ";
            odd_message += "With core charge of <strong>"+core_charges+"</strong> and a molecule charge of <strong>"+mole_charges+"</strong>. ";
            odd_message += "<br /><br />";
            odd_message += "Did you remmeber to minimize the molecule? <br >";
            odd_message += "Try to add charges to the molecule. <br />";
            tellUser.setTitle('Bad molecule')
            tellUser.setMessage(odd_message);
            tellUser.addCancelBtn("Okay, I\'ll fix it");
            tellUser.show();
            return false;
        }

        // Prepare Calculation
        var askCal = new $.Prompt();
        askCal.setMessage('<p>Are you sure?</p> <p>&nbsp;</p> <p>You won\'t be able to change the molecule structure.</p>');

        askCal.addResponseBtn('Yes, I\'m sure.', function()
        {
            askCal.cancel();

            // Loading screen
            var tellUser = new $.Prompt;
            var msg = $('<div></div>');
            var loadingbar = "<div class=\"loading_bar\"><div class=\"bar\" style=\"width: 100%;\"></div></div>";
            msg.append(loadingbar);
            msg.append("<p>Preparing molecule for property calculation&hellip;</p>");
            tellUser.setTitle('Loading&hellip;');
            tellUser.setMessage(msg);
            tellUser.show();

            // Create XYZ Coordinates
            var xyz = ""+Natoms;
            var sce = "    ";
            xyz = xyz + "\n"
            for(var i=0; i<Natoms;i++)
            {
                var e = atominfo[i].sym // Atom Symbol
                var x = atominfo[i].x
                var y = atominfo[i].y
                var z = atominfo[i].z
                xyz = xyz + "\n"
                xyz = xyz + e + sce + x + sce + y + sce + z
            }

            // Check molecule and prepare calculation
            req = $.ajax(
            {
                type: "POST",
                url: "initialize/initialize",
                data: {'xyz' : xyz, 'charge' : mole_charges, ajax: true},
                dataType: "text",
                success: function(data)
                {
                    if(data.length==32) // Length of a hash key
                    {
                        // Success
                        tellUser.setMessage('Fast Forwarding&hellip;');
                        url = window.location.href.replace('editor', '');
                        url = url + 'calculation/'+data;
                        window.location = url;
                    }
                    else
                    {
                        // Fail
                        var tellUser2 = new $.Prompt();
                        tellUser2.setMessage(data);
                        tellUser2.addCancelBtn('Okay');

                        tellUser.cancel();
                        tellUser2.show();
                    }
                }
            });


        });

        askCal.addCancelBtn('No, wait!');
        askCal.show();

        // Check charge setup
        //var molecule = jmolScript('getProperty extractModel');
        //$.infoPrompt(molecule);

        return false;
    });



});
