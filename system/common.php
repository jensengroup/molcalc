<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');


/**
 * Load the settings.ini file
 *
 * @return array
 */
function get_config()
{
    $ini = parse_ini_file("settings.ini");
    return $ini;
}

function format($number)
{
    return number_format($number, 2, '.', '');
}


