<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if(isset($_POST['xyz']))
{
    $xyz         = $_POST['xyz'];
    $mol_charges = $_POST['charge'];
}
else
{
    print "No XYZ data";
    exit();
}


// Functions


// IF 404
function get_http_response_code($url) {
    $headers = get_headers($url);
    return substr($headers[0], 9, 3);
}


function get_name($search)
{
    // If smiles contains ., it means it is too molecules
    // and naming will not work.

    if($search == "") return "";

    $search = str_replace("[", "%5B", $search);
    $search = str_replace("]", "%5D", $search);
    $search = str_replace("@", "%40", $search);
    //$search = str_replace(")", "", $search);
    //$search = str_replace("(", "", $search);
    $search = str_replace("=", "%3D", $search); #double bond
    $search = str_replace("#", "%23", $search); #triple bond

    // Get Name from http://cactus.nci.nih.gov/chemical/structure
    // http://cactus.nci.nih.gov/chemical/structure/C%28N%29N/names
    // http://cactus.nci.nih.gov/chemical/structure/C%28N%29N/iupac_name
    $cactus = "http://cactus.nci.nih.gov/chemical/structure/".$search."/iupac_name";
    $name;

    // TODO Cactus name
    // Check if the response is HTML code
    // because catus response is a .html file
    // when SMILE is empty

    if(get_http_response_code($cactus) != "404")
    {
        $names = file_get_contents($cactus);
        $names = explode("\n", $names);
        $name = end($names);
    }
    else
    {
        $name = "";
    }

    // Check if name contains '$'
    if(strpos($name, '$') !== false)
    {
        $name = "";
    }

    return $name;
}



// Get the temp folder
$tmp = TMPFOLDER;


// Get HASH of the coordinates
$hash = md5($xyz); // Primary ID of the molecule


// Integer charge
$mol_charges = intval($mol_charges);


// Check if single atom
$xyz_array = explode("\n", $xyz);
$single_atom = False;
if(intval($xyz_array[0]) == 1)
{
    $single_atom = True;
}


// Change folder
$folder = 'data/'.$hash;
if(!is_dir($folder))
{
    mkdir($folder);
}
else
{
    // Folder already exist,
    // send the user to $hash_folder
    print $hash;
    exit();
}

chdir($folder);

// Save Structure in hash-dir
if($single_atom)
{
    // Only single atom, do not minimize
    file_put_contents('coordinates.xyz', $xyz);
}
else
{
    // Okay, seems fine, now minimize and save the
    // molecule

    // Save jmol_structure
    $jmol_struc = "coordinates_jmol.xyz";
    file_put_contents($jmol_struc, $xyz);

    // Prepare Minimization
    shell_exec('babel -xf ../../methods/initialize/minimize_header -ixyz coordinates_jmol.xyz -ogamin '.$hash.'.inp');
    shell_exec('sed -i "s/icharg=0/icharg='.$mol_charges.'/" '.$hash.'.inp');

    // Minimize jmol structure
    shell_exec(RUNGMS.' '.$hash.' > '.$hash.'.log');

    // Check output for abnormally
    $pattern  = "EXECUTION OF GAMESS TERMINATED -ABNORMALLY-";
    $pattern2 = "TOO MANY ITERATIONS";
    $min = file_get_contents($hash.'.log');
    if(strpos($min, $pattern) or strpos($min, $pattern2))
    {
        // Delete and die
        chdir('..');
        shell_exec('rm -r '.$hash);
        print "Minimization ended abnormally. Please check your molecule.";
        die();
        exit();
    }

    // Save XYZ
    shell_exec('babel -igamess '.$hash.'.log -oxyz coordinates.xyz');
    shell_exec('babel -igamess '.$hash.'.log -omol2 coordinates.mol2');
}


if(file_get_contents('coordinates.xyz')=='')
{
    // chdir('..');
    // shell_exec('rm -r '.$hash);
    print 'Minimization failed. Please check your molecule.';
    die();
}


// Get Common name and Inchi code
// Sometimes inchi didnt work with this search, sometimes not with smiles
$smiles   = shell_exec('babel -ixyz coordinates.xyz -osmiles --title " "');
$smiles   = str_replace("\n",'', $smiles);
$smiles   = preg_replace("/\s+/",'', $smiles);

$inchi    = shell_exec('babel -ixyz coordinates.xyz -oinchi --title " "');
$inchi    = str_replace("\n",'', $inchi);

$inchikey = shell_exec('babel -ixyz coordinates.xyz -oinchikey --title " "');
$inchikey = str_replace("\n",'', $inchikey);
$inchikey = preg_replace("/\s+/",'', $inchikey);

$name     = "";

if(!strpos($smiles, "."))
{
    $name = get_name($smiles);
}
else
{
    foreach(explode('.', $smiles) as $smile)
    {
        $parname = get_name($smile);
        if($parname != '')
        {
            $name .= ' '.$parname;
        }
    }
}

// Write Molecule Information to flat-file db
$db = array();
$db['charge'] = intval($mol_charges);
$db['name']   = ucfirst(strtolower($name)); // Str to lower, caps first, remove linebreak
$db['inchi']  = $inchi;
$db['smiles'] = $smiles;

$string = "";
foreach($db as $key => $entry)
{
    $string = $string.$key.":".$entry;
    $string = $string."\n";
}

file_put_contents('molecule.db', $string);

// Create 2D image (using openbabel)
shell_exec('babel -ixyz coordinates.xyz -opng thumbnail.png --title " " -d');

// Finished
print $hash;
