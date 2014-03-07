<!DOCTYPE html>
<html lang="en" xml:lang="en">
<head>

    <!-- Molecule Calculator -->
    <!-- github.com/jensengroup/molcalc/LICENSE -->


    <meta charset="utf-8">
    <meta name="google" content="notranslate" />
<?php if(isset($molInfo)): ?>
    <title><?php print $molInfo['name'] != "0" && $molInfo['name'] != "" ? $molInfo['name'] : $molInfo['inchi'];  ?> - MolCalc</title>
<?php else: ?>
    <title>Molecule Calculator (MolCalc)</title>
<?php endif; ?>


    <!-- style -->
    <link rel="stylesheet" href="<?php print BASEURL ?>/assets/style/screen.css" />


    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <link rel="stylesheet" href="/sites/all/themes/rsldc2012/style/screenIE7.css">
    <![endif]-->


    <!-- JSmol & jQuery -->
<?php if($view=='editor'): ?>

    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-14.0.2/jquery/jquery.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-14.0.2/js/JSmoljQueryExt.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-14.0.2/js/JSmolCore.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-14.0.2/js/JSmolApplet.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-14.0.2/js/JSmolApi.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-14.0.2/js/JSmolControls.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-14.0.2/js/j2sjmol.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-14.0.2/js/JSmol.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-14.0.2/js/JSmolConsole.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-14.0.2/js/JSmolMenu.js"></script>

<?php else: ?>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-13.2.4/jquery/jquery.js"></script>

    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-13.2.4/js/JSmoljQueryExt.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-13.2.4/js/JSmolCore.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-13.2.4/js/JSmolApplet.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-13.2.4/js/JSmolApi.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-13.2.4/js/JSmolControls.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-13.2.4/js/j2sjmol.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-13.2.4/js/JSmol.js"></script>
    <!-- // following two only necessary for WebGL version -->
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-13.2.4/js/JSmolThree.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol-13.2.4/js/JSmolGLmol.js"></script>
<?php endif; ?>


    <!-- MolCalc -->
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/web-ui/script/jquery.prompt.js"></script>
    <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jquery.molcalc_main.js"></script> 


    <!-- view -->
    <?php if(isset($view)) print '<script type="text/javascript" src="'.BASEURL.'/assets/script/views/'.$view.'.js"></script>' ?>


    <!-- google analytics -->
    <!-- TODO insert in live version -->

</head>
<body>

<header>
    <section class="container">
        <section class="logo">
            <a href="<?php print BASEURL ?>">
                <h1><span class="sep">MolCalc</span><span class="ret">The Molecule Calculator</span></h1>
            </a>
        </section>
        <nav>
            <ul>
                <?php foreach($menu as $key => $item): ?>
                    <?php if($key == $view) {$class = 'class="active"'; } else {$class = ''; } ?>
                    <?php if($key == 'editor') $key = ''; ?>
                    <li <?php print $class; ?>>
                        <a href="<?php print BASEURL ?>/<?php print $key; ?>"><?php print $item ?></a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </nav>
    </section>
</header>

<!-- Content -->
<article>
    <section class="container">
<?php

    $page_view = 'views/pages/'.$view.'.php';

    if(file_exists($page_view))
    {
        include($page_view);
    }
    else
    {
        include('views/pages/404.php');
    }

?>
    </section>
</article>
<footer>
    <section class="container">

        <span class="right">
            Bugs or feature request? Open an issue on
            <a href="http://github.com/jensengroup/molcalc/issues">GitHub</a>
        </span>

        <span class="left">
            Fork us on <a href="http://github.com/jensengroup/molcalc">GitHub</a>
        </span>


    </section>
</footer>

</body>
</html>
