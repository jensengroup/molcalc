<?php

 /* Using Cactus to find chemical structure from
  * search pattern.
  * The use babel to generate 3D structure based in inchi
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

$cactus_inchi  = "http://cactus.nci.nih.gov/chemical/structure/".$search."/inchi";
$cactus_smiles = "http://cactus.nci.nih.gov/chemical/structure/".$search."/smiles";

$inchi = file_get_contents($cactus_inchi);
$inchi = str_replace("\n", '', $inchi);

print shell_exec("echo \"".$inchi."\" | obabel -iinchi -omol2 -h --gen3d");

