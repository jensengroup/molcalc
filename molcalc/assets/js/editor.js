
$(document).ready(function() {

    // Editor functions

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
        chemdoodleClick('#sketcherSingle_button_scale_plus'); // Zoom
		// setTimeout(function() {
		// 	// chemdoodleClick('#sketcherSingle_button_scale_plus'); // Zoom
		// 	// chemdoodleClick('#sketcherSingle_button_scale_plus'); // Zoom
		// }, 50);
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
        canvas.loadMolecule(ChemDoodle.readMOL(mol));
        chemdoodleResize(canvas);
        return false;
    }


    // jsmol functions
    function jsmolGetMol()
    {
        return
    }

    function jsmolSetMol()
    {
        return
    }


    // Production
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

    // Resize editors on window resize
    function onWindowResize() {
        $(window).on('resize', function() {
            chemdoodleResize(sketcher);
            console.log("resize");
        });
    }

    onWindowResize();


    // Move to quantum
    $('.button.quantum').click(function () {

		var promptQuantum = new $.Prompt();
		// promptQuantum.setTitle('This is the title');
		promptQuantum.setMessage('See quantum properties for the molecule?');
	    promptQuantum.addResponseBtn('Indeed', function()
        {

            mol = chemdoodleGetMol(sketcher);
            request("/ajax", {mol:mol}, function (data) {

                var $loading = $('<div class="meter"><span style="width: 100%"></span></div>');

                var promptCalculation = new $.Prompt();
                promptCalculation.setTitle("Starting " + data['smiles']);
                promptCalculation.setMessage($loading);
                promptCalculation.addCancelBtn();
                promptCalculation.show();


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

        mol = chemdoodleGetMol(sketcher);
        request("/ajax/sdf", {"sdf": mol}, function (data)
        {
            promptWait.cancel();
            var promptCalculation = new $.Prompt();

            if(data["error"]) {

                promptCalculation.setMessage(data["message"]);

            } else {

                // contact cactus
                promptCalculation.setMessage($loading);

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

        console.log("focus");

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

            // request(url, data, successFunction)
            request("/ajax/smiles", data, function (rtnData)
            {
                var sdfstr = rtnData["sdf"][0];
                chemdoodleSetMol(sketcher, sdfstr);
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
            $searchInp.focus();
        });

        return false;
    });

});

