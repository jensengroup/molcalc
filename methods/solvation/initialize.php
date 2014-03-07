<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

// Thermodynamic Calculation

if(isset($_POST['calculation'])) $calculation = $_POST['calculation'];
if(isset($_POST['step'])) $step = $_POST['step'];
if(isset($_POST['moleculeid'])) $hash = $_POST['moleculeid'];

if(!isset($calculation) && !isset($step) && !isset($hash))
{
    print 'Not enough POST information.';
    die();
}


// Get molecule information
$dataFolder = './data/';
$moleculeFolder = $dataFolder.$hash.'/';
chdir($moleculeFolder);


// Get Charge
$lines = file('molecule.db');
$db = array();

foreach($lines as $line)
{
    $line = str_replace("\n","",$line); // Remove trailling \n
    if($line=="") continue; // Ignore empty lines
    $array = explode(':', $line);
    $db[$array[0]] = $array[1];
}

$moleculeCharge = $db['charge'];


// init JSON
$json = array(
    'next_pct' => 0,
    'next_step' => 0,
    'next_msg' => '',
);

switch($step)
{
    // Step: Check
    case 0:

        $datFile = TMPFOLDER.$hash.'.';

        $filetypes = array('F05', 'dat', 'rst');
        $status = true;

        foreach($filetypes as $filetype)
        {
            if(file_exists($datFile.$filetype))
            {
                $status = false;
            }
        }

        if(!$status)
        {
            print "A calculation for this molecule is already running. Please try again in a few minutes.";
        }
        else
        {
            $json['next_step'] = 1;
            $json['next_pct']  = 30;
            $json['next_msg']  = 'Setting up calculation files';
            print json_encode($json);
        }

        break;

    // Step: Setup
    case 1:

        if(is_dir($calculationType))
        {
            // What to do if folder exist?
            print "Something went wrong. Seems like calculation has been prepared already.";
            die();
        }

        // okay, so everything is empty,
        // so lets create folder and files.
        mkdir($calculationType);

        shell_exec('babel -xf '.CALPATH.'/'.$calculationType.'/header -ixyz coordinates.xyz -ogamin '.$calculationType.'/'.$hash.'.inp');
        shell_exec('sed -i "s/ICHARG=0/ICHARG='.$moleculeCharge.'/" '.$calculationType.'/'.$hash.'.inp');

        $json['next_step'] = 2;
        $json['next_pct']  = 95;
        $json['next_msg']  = 'Running calculation';
        print json_encode($json);

        break;

    // Step: Run GAMESS
    case 2:

        chdir($calculationType);

        # Execute rungms input.inp > results.log
        shell_exec(RUNGMS.' '.$hash.'.inp > results.log');

        $json['next_step'] = 3;
        $json['next_pct']  = 95;
        $json['next_msg']  = 'Generating surface';
        print json_encode($json);

        break;


    case 3:

        chdir($calculationType);

        # Create mol2 file
        shell_exec('babel -igamout results.log -omol2 results.mol2');

        $json['next_step'] = 0;
        $json['next_pct']  = 100;
        $json['next_msg']  = 'Done';
        print json_encode($json);

        break;

    // Finished
}


