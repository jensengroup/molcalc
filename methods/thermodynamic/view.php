<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

// Thermodynamics Results

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


$hof;

foreach(preg_split("/(\r?\n)/", $RESULTS) as $line)
{
    $booHof = strpos($line, "HEAT OF FORMATION IS");

    if($booHof !== false)
    {
        // Note: Heat of Formation is in kCal mol^-1
        $pattern = "/[\-]*[0-9]+\.[0-9]+/";
        preg_match($pattern, $line, $hof);
        $hof = $hof[0];
    }
}


# Get rest of thermodata
$thermodata = shell_exec('grep -B1 -A5 "          KJ/MO" results.log');
$table = array();

foreach(preg_split("/\n/", $thermodata) as $line)
{
    $table[] = preg_split("/\s+/", $line);
}

# Variables for table
$entropy_total = $table[6][7];
$enthalpy_total = $table[6][3];
$g_total = $table[6][4]; # Free Energy
$cp_total = $table[6][6]; # Heat Cap. at const. pressure

$entropy_tra = $table[3][7];
$entropy_rot = $table[4][7];
$entropy_vib = $table[5][7];

$enthalpy_tra = $table[3][3];
$enthalpy_rot = $table[4][3];
$enthalpy_vib = $table[5][3];

# Free Energy
$g_tra = $table[3][4];
$g_rot = $table[4][4];
$g_vib = $table[5][4];

# Heat Cap. at const. pressure
$cp_tra = $table[3][6];
$cp_rot = $table[4][6];
$cp_vib = $table[5][6];

# cal to joule conversion
$c2j = 4.18;

?>

<h2>Thermodynamics at 298.15 K and standard pressure</h2>
<br />

<div style="width:445px;float:left;">
  <table>
    <tr><td class="center" colspan="3" style="font-weight:bold">Enthalpy</td></tr>
    <tr><td class="center" style="width:50%">Property</td><td style="width:25%" class="center">Value</td><td style="width:25%" class="center">Unit</td></tr>
    <tr><td>Translational</td><td class="right"><?php print format($enthalpy_tra) ?></td><td class="right">kJ mol<sup>-1</sup> </td><tr>
    <tr><td>Rotational</td><td class="right"><?php print format($enthalpy_rot) ?></td><td class="right">kJ mol<sup>-1</sup> </td><tr>
    <tr><td>Vibrational</td><td class="right"><?php print format($enthalpy_vib) ?></td><td class="right">kJ mol<sup>-1</sup></td><tr>
    <tr><td>Total (Trans. + Rot. + Vib.)</td><td class="right"><?php print format($enthalpy_total) ?></td><td class="right">kJ mol<sup>-1</sup></td><tr>
  </table>

  <table>
    <tr><td class="center" colspan="3" style="font-weight:bold">Heat Capacity at Constant Pressure</td></tr>
    <tr><td class="center" style="width:50%">Property</td><td style="width:25%" class="center">Value</td><td style="width:25%" class="center">Unit</td></tr>
    <tr><td>Translational</td><td class="right"><?php print format($cp_tra) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Rotational</td><td class="right"><?php print format($cp_rot) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Vibrational</td><td class="right"><?php print format($cp_vib) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Total (Trans. + Rot. + Vib.)</td><td class="right"><?php print format($cp_total) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
  </table>
</div>

<div style="width:445px;float:right;">
  <table>
    <tr><td class="center" colspan="3" style="font-weight:bold">Entropy</td></tr>
    <tr><td class="center" style="width:50%">Property</td><td style="width:25%" class="center">Value</td><td style="width:25%" class="center">Unit</td></tr>
    <tr><td>Translational</td><td class="right"><?php print format($entropy_tra) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Rotational</td><td class="right"><?php print format($entropy_rot) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Vibrational</td><td class="right"><?php print format($entropy_vib) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Total (Trans. + Rot. + Vib.)</td><td class="right"><?php print format($entropy_total) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
  </table>

  <table>
    <tr><td class="center" colspan="3" style="font-weight:bold">Other Properties</td></tr>
    <tr><td class="center" style="width:50%">Property</td><td style="width:25%" class="center">Value</td><td style="width:25%" class="center">Unit</td></tr>
    <tr><td>Heat of Formation</td><td class="right"><?php print format($hof*$c2j) ?></td><td class="right">kJ mol<sup>-1</sup></td><tr>
  </table>
</div>

<div class="clean"></div>

