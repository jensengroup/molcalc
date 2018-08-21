//
// console.log(child);


// var sketcher = new ChemDoodle.SketcherCanvas('sketcherSingle', 500, 300, {useServices:true, oneMolecule:true});

// var chemOptions = {
//     useServices:false,
//     oneMolecule:true
// }
// var sketcher = new ChemDoodle.SketcherCanvas('sketcherSingle', 600, 600, chemOptions);

// sketcher.resize(200, 200);
// sketcher.resize(412, 616);
//
// console.log(sketcher);



// function getMolFromChemDoodle(canvas) {
//     var mol = canvas.getMolecule();
//     var molFile = ChemDoodle.writeMOL(mol);
//     return molFile;
// }
//
// // console.log(getMolFromChemDoodle(sketcher));


// sketcher.loadMolecule(ChemDoodle.readMOL('Molecule Name\n  CHEMDOOD01011121543D 0   0.00000     0.00000     0\n[Insert Comment Here]\n  6  6  0  0  0  0  0  0  0  0  1 V2000\n    0.0000    1.0000    0.0000   N 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.0000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  2  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  2  0  0  0  0\n  6  1  1  0  0  0  0\nM  END'));


// var sketcher = new ChemDoodle.SketcherCanvas('sketcher', 500, 300, {useServices:false, oneMolecule:true});

$(document).ready(function() {

    // Editor functions

    function getEditorDimensions()
    {
        var $content = $('.mc-content');
        var width = $content.innerWidth();
        var height = $content.innerHeight();
        return [width, height];
    }


    // Set functions for chemdoodle

    function chemdoodleResize(canvas)
    {
        var dim = getEditorDimensions();
        var width = dim[0];
        var height = dim[1];
        canvas.resize(width, height);
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
        return false;
    }



    // Production
    $('.toolset.chemdoodle a.button.chemdoodle').click(function () {
        chemdoodleEditorBtn($(this));
        return false;
    });


    $('.button.quantum').click(function () {
        console.log(chemdoodleGetMol(sketcher));
    });

    // Reset


	var molTest = 'Molecule Name\n  CHEMDOOD01011121543D 0   0.00000     0.00000     0\n[Insert Comment Here]\n  6  6  0  0  0  0  0  0  0  0  1 V2000\n    0.0000    1.0000    0.0000   N 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.0000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  2  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  2  0  0  0  0\n  6  1  1  0  0  0  0\nM  END'

//     var molBenzene = "Benzene\n6  6  0  0  0  0            999 V2000\n
//     0.7145   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
//     0.0000   -0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
//     0.7145    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
//     0.0000    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
//    -0.7145   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
//    -0.7145    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
//   2  1  2  0  0  0  0
//   3  1  1  0  0  0  0
//   4  3  2  0  0  0  0
//   5  2  1  0  0  0  0
//   6  4  1  0  0  0  0
//   5  6  2  0  0  0  0
// M  END"


	// Init chemdoodle
    chemdoodleResize(sketcher); // Resize
    chemdoodleSetMol(sketcher, molTest); // Load start molecule
	chemdoodleClick('#sketcherSingle_button_scale_plus'); // Zoom

    // Resize editors on window resize
    $(window).on('resize', function() {
        chemdoodleResize(sketcher);
    });




    // Searchbar

    var $searchBar = $("mc-editor-searchbar");
    var $searchBtn = $(".mc-editor-searchbar a");
    var $searchInp = $(".mc-editor-searchbar input");



});
