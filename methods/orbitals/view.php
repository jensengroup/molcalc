<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

// Molecular Orbital Results

# $calculationType        // Calculation Type
# $hash                   // Molecule Hash ID

$RESULTS = file_get_contents('results.log');


// Check status of result
$gamessCrashStatus = "GAMESS TERMINATED -ABNORMALLY-";
$gamessScfStatus   = "SCF IS UNCONVERGED, TOO MANY ITERATIONS";
$gamessDatStatus   = "Please save, rename, or erase these files from a previous run:";
$results_failed = strpos($RESULTS, $gamessCrashStatus);
$results_unconv = strpos($RESULTS, $gamessScfStatus);

if($results_failed || $results_unconv)
{
    print "<h2>Calculation failed</h2>";

    $cmd_fail = 'grep -B10 "ABNORM" results.log';
    $cmd_unco = 'grep -A4 "SCF IS UNCONVERGED" results.log';
    print str_replace(array('<br /><br /><br />',"<br /><br />"),'<br />', str_replace("\n",'<br />',shell_exec($cmd_fail)));
    print str_replace(array('<br /><br /><br />',"<br /><br />"),'<br />', str_replace("\n",'<br />',shell_exec($cmd_unco)));

    die();
}

?>

<h2>Molecular Orbitals</h2>
<br />

<div class="orbitals choicelist" style="width:300px;height:520px;float:left;">
<ul>
<?php

$file = explode("EIGENVECTORS", $RESULTS);
$file = explode("END OF RHF CALCULATION", $file[count($file)-1]);
$file = explode("\n", $file[0]);
$result = array();

for($i=0;$i<count($file);$i++){
    if($file[$i]==""){
        $energies = explode(" ",$file[$i+2]);
        for($j=0;$j<count($energies);$j++)
        {
            if($energies[$j]!="")
            {
                array_push($result, $energies[$j]);
            }
        }
    }
}

for($k=0;$k<count($result);$k++): ?>
<li>
    <span class="number" style=""><?php print $k+1  ?></span>
    <span class="amount" style=""><?php print format($result[$k]*27.21) ?></span>
    <span class="unit">eV</span>
    <a href="#" rel="<?php print ($k+1); ?>" class="viewOrbital button">
      View
    </a>
</li>
<?php endfor; ?>

</ul>

</div>

<div class="orbitals viewer" style="float:right;width:580px;height:500px;margin-bottom:20px;">

  <script type="text/javascript">
  jmol_orbitals = Jmol.getApplet("jmol_orbitals", myInfo1);
  Jmol.script(jmol_orbitals, 'load "<?php print BASEURL?>/data/<?php print $hash.'/'.$calculationType ?>/results.log";');
  Jmol.script(jmol_orbitals, 'set bondRadiusMilliAngstroms 100; set multipleBondSpacing -0.3');

  //jmol mol format
  //http://chemapps.stolaf.edu/jmol/docs/#mo
  Jmol.script(jmol_orbitals, 'mo TITLEFORMAT ""');
  </script>

</div>

<script type="text/javascript">
$(function()
{
    // View Orbital
    $('.viewOrbital').click(function()
    {
        // Check for getProperty fileName
        var orbital = $(this).attr('rel');
        Jmol.script(jmol_orbitals, 'mo '+orbital);
        return false;
    });
});
</script>

<div class="clean"></div>

