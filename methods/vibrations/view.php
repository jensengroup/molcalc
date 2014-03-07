<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

// Molecular Vibration Results

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

// Get Number of atoms
$file = '../coordinates.xyz';
$lines = count(file($file));
$NA = $lines-2 ;

// Get Vibrational States
$vibs = array();
$ints = array();
$pattern = "/       FREQUENCY:[a-zA-Z0-9 \.]+/";
$pattern2 = "/    IR INTENSITY:[a-zA-Z0-9 \.]+/";
preg_match_all($pattern,  $RESULTS, $vibration_list);
preg_match_all($pattern2, $RESULTS, $intensity_list);

$count = count($vibration_list[0]);

for($i = 0; $i<$count; $i++)
{
    preg_match_all("/[0-9]+\.[0-9]+/", $vibration_list[0][$i], $levels);
    preg_match_all("/[0-9]+\.[0-9]+/", $intensity_list[0][$i], $ilevels);
    $vibs = array_merge($vibs, $levels[0]);
    $ints = array_merge($ints, $ilevels[0]);
}

// Check if molecule is linear
$linear_string = "THIS MOLECULE IS RECOGNIZED AS BEING LINEAR";
$linear = false;
if(strpos($RESULTS, $linear_string) > 0 )
{
    $linear = true;
}

if($linear)
{
    $start = 5;
}
else
{
    $start = 6;
}

?>

<h2>Vibrational Frequencies</h2>
<br />

<div class="vibrations lhs" style="width:400px;float:left;">
  <table>
    <tr>
      <td width="50%">Vibration</td>
      <td class="center">

        <div class="onoffswitch">
            <input type="checkbox" class="onoffswitch-checkbox" id="vibration_switch" name="vibration_switch" checked />
            <label class="onoffswitch-label" for="vibration_switch">
                <div class="onoffswitch-inner"></div>
                <div class="onoffswitch-switch"></div>
            </label>
        </div>

      </td>
    </tr>
    <tr>
      <td>Vectors</td>
      <td class="center">

        <div class="onoffswitch">
            <input type="checkbox" class="onoffswitch-checkbox" id="vector_switch" name="vector_switch" />
            <label class="onoffswitch-label" for="vector_switch">
                <div class="onoffswitch-inner"></div>
                <div class="onoffswitch-switch"></div>
            </label>
        </div>

      </td>
    </tr>
    <tr>
      <td>Balls</td>
      <td class="center">

        <div class="onoffswitch">
            <input type="checkbox" class="onoffswitch-checkbox" id="spacefill_switch" name="spacefill_switch" checked />
            <label class="onoffswitch-label" for="spacefill_switch">
                <div class="onoffswitch-inner"></div>
                <div class="onoffswitch-switch"></div>
            </label>
        </div>

      </td>
    </tr>
  </table>

  <div class="outputbox vibrations choicelist">
        <ul>
        <?php $j = 1; ?>
        <?php for($i = $start; $i <= count($vibs)-1; $i++ ): ?>
            <li>
                <span class="number"><?php print $j++; ?></span>
                <span class="amount vib" style=""><?php print $vibs[$i] ?></span>
                <span class="unit" style="">cm<sup>-1</sup></span>
                <a href="#" class="button vibration_level" rel="<?php print $i+1 ?>">View</a>
            </li>
        <?php endfor; ?>
        </ul>
  </div>

</div>


<div class="vibrations viewer" style="width:500px;height:500px;float:right;">

  <script type="text/javascript">
  jmol_vib = Jmol.getApplet("jmol_vib", myInfo1);
  Jmol.script(jmol_vib, 'load "<?php print BASEURL?>/data/<?php print $hash ?>/vibrations/results.log";');
  Jmol.script(jmol_vib, 'set bondRadiusMilliAngstroms 100; set multipleBondSpacing -0.3');

  Jmol.script(jmol_vib, 'font echo 20 serif;fsize=20;set echo top center;echo echo test');
  Jmol.script(jmol_vib, 'color echo black; font echo 20 serif;fsize=20;set echo top right;echo echo test;');
  Jmol.script(jmol_vib, 'echo "Vibration: <?php print $vibs[$start] ?> cm<sup>-1</sup>"');
  Jmol.script(jmol_vib, 'vibration on');

  // Switch to the first real vibration
  Jmol.script(jmol_vib, 'frame <?php print $start+1 ?>');
  </script>

</div>


<script type="text/javascript">
$(function()
{

    // Animation on off
    $('#vibration_switch').change(function()
    {
        var checked = $(this).prop('checked');
        var rel;

        if(checked)
        {
            rel = 'on';
        }
        else
        {
            rel = 'off';
        }

        Jmol.script(jmol_vib, 'vibration '+rel);
    });

    // Vectors on off
    $('#vector_switch').change(function()
    {
        var checked = $(this).prop('checked');
        var rel;

        if(checked)
        {
            rel = 'on';
        }
        else
        {
            rel = 'off';
        }

        Jmol.script(jmol_vib, 'vectors '+rel+'; color vectors black;');
        Jmol.script(jmol_vib, 'set vectorScale 3');
    });

    // Balls on off
    $('#spacefill_switch').change(function()
    {
        var checked = $(this).prop('checked');
        var rel;

        if(checked)
        {
            rel = 'on; spacefill 24%;';
        }
        else
        {
            rel = 'off';
        }

        Jmol.script(jmol_vib, 'cpk '+rel);
    });

    // Show Vibration
    $('.vibration_level').click(function() {
        var rel = $(this).attr('rel');
        var rcm = $(this).parent().find('.vib').html();
        jmolCmd  = "frame "+rel;
        Jmol.script(jmol_vib, jmolCmd);
        Jmol.script(jmol_vib, 'echo "Vibration: '+rcm+'"');
        return false;
    });

});
</script>

<div class="clean"></div>

