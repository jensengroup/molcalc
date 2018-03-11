<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');?>

<section class="body">
    <section class="container">
<!-- CONTENT -->

<?php
// Specific calculation
if(isset($hash)):

    // VARIABLES
    // $hash - $molid
    // $molInfo - array of molecule info

    $calculationTypes = $ini['methods'];

    chdir('data/'.$hash);

    $lines = file('molecule.db');
    $moleculeInfo = array();

    foreach($lines as $data)
    {
        if($data == "\n") continue; // ops, extra line
        $array = explode(':', $data);
        $moleculeInfo[$array[0]] = str_replace("\n", "", $array[1]);
    }

    $molName = $moleculeInfo['name'];


?>

<script>
var MOLECULEID = '<?php print $hash ?>';
</script>

<script type="text/javascript">
var myJmol1;
var myInfo1 = {
    height: '100%',
    width: '100%',
    j2sPath: "../assets/script/jsmol-13.2.4/j2s",
    use: 'HTML5',
    console: "myJmol1_infodiv",
    debug: false
};
</script>

<h1><?php print $molName != "0" && $molName != "" ? $molName : "&nbsp;";  ?></h1>

<div class="calculation-specific">
    <div class="view_navigation">
        <ul>
            <li class="info"><a class="button active" href="#/">Molecule</a></li>

            <?php foreach($calculationTypes as $type => $name): ?>
            <li class="<?php print $type ?>"><a class="button" href="#/<?php print $type ?>"><?php print $name ?></a></li>
            <?php endforeach; ?>

        </ul>
    </div>

    <div class="calculationtype info">
        <h2>Molecule Viewer</h2>
        <br />

        <div class="viewer" style="float:right;width:500px;height:500px;margin-bottom:20px;">
            <script type="text/javascript">
            jmol_intro = Jmol.getApplet("jmol_intro", myInfo1);
            Jmol.script(jmol_intro, 'load "<?php print BASEURL?>/data/<?php print $hash ?>/coordinates.mol2";');
            Jmol.script(jmol_intro, 'set bondRadiusMilliAngstroms 100; set multipleBondSpacing -0.3');
            </script>
        </div>

        <div style="width:400px;padding:100px 0 0 0;">
        <img src="<?php print BASEURL ?>/data/<?php print $hash ?>/thumbnail.png" />
        </div>

        <div class="clean"></div>
    </div>

<?php

    foreach($calculationTypes as $calculationType => $calculationName):

    $exists = is_dir($calculationType);

?>
    <div class="calculationtype <?php print $calculationType ?>">

        <?php if($exists): ?>

            <?php
                chdir($calculationType);
                require(CALPATH.'/'.$calculationType.'/view.php');
                chdir('..');
            ?>

        <?php else: ?>

            <p><a class="button calculate-now">Calculate</a></p>

        <?php endif; ?>


        <div class="clean"></div>
    </div>
<?php
    endforeach;
?>


</div>



<?php // LIST OF CALCULATIONS ?>
<?php else:?>

  <br />

<?php

$calculations = scandir('data');

function cmp($a, $b)
{
    if($b["name"] == "")
    {
        return -1;
    }
    if($a["name"] == "")
    {
        return 1;
    }
    return strcmp($a["name"], $b["name"]);
}

$calculationlist = array();

foreach($calculations as $calid)
{
    if($calid == '..' || $calid == '.'  || $calid == 'index.html') continue;

    $lines = file('data/'.$calid.'/molecule.db');
    $molInfo = array();
    foreach($lines as $line)
    {
        if($line == "\n") continue; // ops, extra line
        $array = explode(':', $line);
        $molInfo[$array[0]] = str_replace("\n", "", $array[1]);
    }
    $molInfo['hash'] = $calid;
    $calculationlist[] = $molInfo;
}

usort($calculationlist, "cmp");

?>

<div class="calculation-list">
    <ul>
    <?php foreach($calculationlist as $cal): ?>

        <li>
            <a href="<?php print BASEURL ?>/calculation/<?php print $cal['hash'] ?>">
                <img src="<?php print BASEURL ?>/data/<?php print $cal['hash'] ?>/thumbnail.png" />
                <span class="title">
                    <?php print $cal['name'] != "0" && $cal['name'] != "" ? $cal['name'] : $cal['inchi'];  ?>
                </span>
            </a>
        </li>

    <?php endforeach ?>
    </ul>
    <div class="clean"></div>	
</div>


<?php endif; ?>
<!-- END CONTENT -->
	</section>
</section>


