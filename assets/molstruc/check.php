<?php

 /* Using Cactus to find chemical structure from
  * search pattern.
  */

if(isset($_GET['search']))
{
  $search = $_GET['search'];
}
else
{
  print "0";
  die();
}


# Prepare search, if in SMILES format.
$search = str_replace(" ", "%20", $search);
$search = str_replace("[", "%5B", $search);
$search = str_replace("]", "%5D", $search);
$search = str_replace("@", "%40", $search);
//$search = str_replace(")", "", $search);
//$search = str_replace("(", "", $search);
$search = str_replace("=", "%3D", $search); #double bond
$search = str_replace("#", "%23", $search); #triple bond

$cactus_inchi  = "http://cactus.nci.nih.gov/chemical/structure/".$search."/iupac_name";
$cactus_smiles = "http://cactus.nci.nih.gov/chemical/structure/".$search."/smiles";

// IF 404
function get_http_response_code($url) {
  $headers = get_headers($url);
  return substr($headers[0], 9, 3);
}

if(get_http_response_code($cactus_smiles) != "404")
{
  $smiles = file_get_contents($cactus_smiles);
  $smiles = str_replace("\n",'',$smiles);
}else{
  print "0";
  die();
}

// Check the size of the molecule
// to avoid lag

// I know, there should be something too look for
// single amount of atoms, but this is just to avoid
// very large molecules.
$pattern = '/[a-zA-Z]{1,2}\_\{[0-9]{1,10}\}/';
preg_match_all($pattern, $smiles, $matches);

$matches = $matches[0];
$Natoms = 0;

foreach($matches as $match)
{
  if($match[0] == 'H') continue;
  preg_match_all('!\d+!', $match, $numbers);
  $Natoms += intval($numbers[0][0]);
}

if($Natoms > 20)
{
  print "0";
  die();
}

print "1";
