<?php

// How do we write the url of links? (BASEURL)
$protocol   = 'http';
$servername = $_SERVER['SERVER_NAME'];
$serverport = ($_SERVER['SERVER_PORT'] == '80') ? '' : ':' . $_SERVER['SERVER_PORT'];
$path       = dirname($_SERVER["SCRIPT_NAME"]);
$path       = str_replace('\\', '/', $path); // helps with windows
$base       = $protocol . '://' . preg_replace('/\/+/', '/', $servername . $serverport . $path);
$base       = preg_replace('/application/','', $base); // remove 'application'
define('BASEURL', preg_replace("/\/$/i", '', $base)); // no trailing slashes


// path to the system folder
$system_path = '.';
if (realpath($system_path) !== FALSE)
{
    $system_path = realpath($system_path).'/';
}


// ensure there's a trailing slash
$system_path = rtrim($system_path, '/').'/';


// Path to the system folder
define('BASEPATH', str_replace("\\", "/", $system_path));


// Load the common functions
require(BASEPATH.'system/common.php');


// Views path
define('VIEWSPATH', BASEPATH.'views/');


// Calculation path
define('CALPATH', realpath('methods/'));


// Check if call is ajax type
define('AJAX', isset($_POST['ajax']));
/* define('AJAX', True); */


// Load config
$ini = get_config();


// Temp folder
$path = $ini['tmpfolder'];
$path = rtrim($path, '/') . '/';
define('TMPFOLDER', $path);


// Define GAMESS
define('RUNGMS', $ini['rungms']);


// Define Menu
$menu = array(
    'editor' => 'New Molecule',
    'calculation' => 'Molecule List',
    'about' => 'Help'
);


// Parse the request
if(isset($_GET['request']))
{
    $request = explode('/', $_GET['request']);
}
else
{
    $request = array(0 => '');
}

if(AJAX)
{
    if(isset($request[1])) $calculationType = $request[1];

    if(isset($calculationType))
    {
        $type   = $calculationType;
        $script = 'initialize';
    }
    else
    {
        $type   = 'initialize';
        $script = 'initialize';
    }



    require(CALPATH.'/'.$type.'/'.$script.'.php');
}
else
{
    if($request[0] == '')
    {
        $view = 'editor';
    }
    else
    {
        $view = $request[0];
    }

    if(isset($request[1]))
    {
        $hash = $request[1];
        if(!is_dir('data/'.$hash)) $view = '404';
    }

    // Normal view
    include('views/main.php');
}

