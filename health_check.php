
<head>
    <title>MolCalc Installation Test</title>
    <link rel="stylesheet" href="assets/style/screen.css" />
</head>

<body>
<div style="width:600px;padding:30px;">

<h1>MolCalc Installation Health Check</h1>

<p>
    Use this page to check what why your MolCalc is not working.
    If there is any issues report it on
    <a href="http://github.com/jensengroup/molcalc/issues">github.com/jensengroup/molcalc/issues</a>
</p>


<table>
  <tr>
    <td><strong>Testname</strong></td>
    <td><strong>Result</strong></td>
    <td><strong>Note</strong></td>
  </tr>


  <tr>
    <td>settings.ini</td>
    <td>
<?php

    if(file_exists('settings.ini'))
    {
        print "PASSED";
    }
    else
    {
        print "FAILED";
    }
?>
    </td>
    <td>

        Please set the settings.ini file, based on settings.default.ini

    </td>
  <tr>


<!--   <tr> -->
<!--     <td>&#45;INDEXES</td> -->
<!--     <td> -->
<!--     </td> -->
<!--     <td> -->
<!--  -->
<!--     </td> -->
<!--   <tr> -->


  <tr>
    <td>Mod Rewrite</td>
    <td>
<?php

    $modules = apache_get_modules();

    if(in_array('mod_rewrite', $modules))
    {
        print "PASSED";
    }
    else
    {
        print "FAILED";
    }
?>
    </td>
    <td>

        Enable mod_rewrite for apache

    </td>
  <tr>

  <tr>
    <td>GAMESS</td>
    <td>
<?php

    // Load the settings file
    $ini = parse_ini_file("settings.ini");
    $rungms = $ini['rungms'];
    $output = shell_exec($rungms.' | grep "execution"');

    if($output=='')
    {
        print "FAILED";
    }
    else
    {
        print "PASSED";
    }

?>
    </td>
    <td>

        Check the README for FAQ about GAMESS installation.

    </td>
  <tr>


  <tr>
    <td>Read/Write Temporary folder </td>
    <td>
<?php

    if(is_writable($ini['tmpfolder']))
    {
        print "PASSED";
    }
    else
    {
        print "FAILED";
    }

?>
    </td>
    <td>

        Make the tmp folder in the settings file Read/Writable by
        the www-data user.

    </td>
  <tr>


  <tr>
    <td>OpenBabel</td>
    <td>
<?php


    $output = shell_exec('babel | grep "Open Babel"');
    if($output=="")
    {
        print "FAILED";
    }
    else
    {
        print "PASSED";
    }

?>
    </td>
    <td>

        Check the README for FAQ about compiling OpenBabel w/ PNG.

    </td>
  <tr>


  <tr>
    <td>OpenBabel w/ PNG</td>
    <td>
<?php

    $here = getcwd();
    chdir($ini['tmpfolder']);
    $filename = 'molcalc_molecule';

    file_put_contents($filename.'.smi', 'CN=C=O');
    $output = shell_exec('babel -ismi '.$filename.'.smi -opng '.$filename.'.png 2>&1');

    if(strpos($output, 'molecule converted') !== false)
    {
        print "PASSED";
    }
    else
    {
        print "FAILED";
    }

    unlink($filename.'.smi');
    unlink($filename.'.png');

    chdir($here);

?>
    </td>
    <td>

        Check the README for FAQ about compiling OpenBabel w/ PNG.

    </td>
  <tr>






</table>


</div>
</body>

