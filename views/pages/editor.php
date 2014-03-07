
<script type="text/javascript">
var myJmol1;
var myInfo1 = {
    height: '100%',
    width: '100%',
    j2sPath: "assets/script/jsmol-14.0.2/j2s",
    use: 'HTML5',
    console: "myJmol1_infodiv",
    disableInitialConsole: true,
    allowJavaScript: true,
    debug: false
};
</script>


<section class="body">
    <section class="container">

        <!-- PAGE -->
        <section class="column_editor">

            <section class="column alpha">
                <div class="editor">
                    <div class="category">

                        <h3>Structure</h3>

                        <div class="editorset">
                            <div class="actions">
                                <ul>
                                    <li class="action load search"><a rel="" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Search for molecule structure</span></span><span class="text">Search</span></a></li>
                                    <li class="action load methane"><a rel="" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Start from Methane</span></span><span class="text">Methane</span></a></li>
                                    <li class="action load benzene"><a rel="" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Start from Benzene</span></span><span class="text">Benzene</span></a></li>
                                    <li class="action load diwater"><a rel="" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Start from Water Dimer</span></span><span class="text">Water Dimer</span></a></li>
                                </ul>
                                <div class="clean"></div>
                            </div>
                        </div>

                        <div class="editorset">
                            <div class="actions">
                                <ul>
                                    <!--<li class="action load"><a rel="" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Load molecule structure</span></span><span class="text">Load</span></a></li>-->
                                    <!-- <li class="action save"><a rel="" class="button"><span class="hvrHlpCnt "><span class="hvrHlp">Temporarily save state </span></span>	<span class="text">Save</span></a></li> -->
                                    <!-- <li class="action restore"><a rel="" class="button"><span class="hvrHlpCnt "><span class="hvrHlp">Restore saved state</span></span>	<span class="text">Restore</span></a></li> -->
                                    <li class="action minimize"><a rel="" class="button"><span class="hvrHlpCnt "><span class="hvrHlp">Optimize structure using MMFF forcefield</span></span><span class="text">Optimize</span></a></li>
                                </ul>
                                <div class="clean"></div>
                            </div>
                        </div>

                        <h3>Atom Manipulation</h3>

                        <div class="editorset">
                            <div class="actions">
                                <ul>
                                    <li class="action atom"><a rel="off" class="button"><span class="hvrHlpCnt "><span class="hvrHlp">Turn off atom manipulation</span></span>	<span class="text">Off</span></a></li>
                                    <li class="action atom"><a rel="dra" class="button"><span class="hvrHlpCnt "><span class="hvrHlp">Drag selected atom</span></span>	<span class="text">Drag</span></a></li>
                                    <li class="action atom"><a rel="x" class="button"><span class="hvrHlpCnt "><span class="hvrHlp">Remove selected atom from stucture</span></span>	<span class="text">Delete</span></a></li>
                                </ul>
                                <div class="clean"></div>
                            </div>

                            <div class="actions atoms">
                                <ul>
                                    <li class="action atom"><a rel="H"  class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Hydrogen</span></span><span class="text">H</span></a></li>
                                    <li class="action atom"><a rel="Li" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Lithium</span></span><span class="text">Li</span></a></li>
                                    <li class="action atom"><a rel="Be" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Beryllium</span></span><span class="text">Be</span></a></li>
                                    <!--<li class="action atom"><a rel="B"  class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Boron</span></span><span class="text">B</span></a></li> --><!-- not in pm3 -->
                                    <li class="action atom"><a rel="C"  class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Carbon</span></span><span class="text">C</span></a></li>
                                    <li class="action atom"><a rel="N"  class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Nitrogen</span></span><span class="text">N</span></a></li>
                                    <li class="action atom"><a rel="O"  class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Oxygen</span></span><span class="text">O</span></a></li>
                                    <li class="action atom"><a rel="F"  class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Fluorine</span></span><span class="text">F</span></a></li>
                                    <li class="action atom"><a rel="Ne" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Neon</span></span><span class="text">Ne</span></a></li>
                                    <li class="action atom"><a rel="Na" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Sodium</span></span><span class="text">Na</span></a></li>
                                    <li class="action atom"><a rel="Mg" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Magnesium</span></span><span class="text">Mg</span></a></li>
                                    <li class="action atom"><a rel="Al" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Aluminium</span></span><span class="text">Al</span></a></li>
                                    <li class="action atom"><a rel="Si" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Silicon</span></span><span class="text">Si</span></a></li>
                                    <li class="action atom"><a rel="P"  class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Phosphorus</span></span><span class="text">P</span></a></li>
                                    <li class="action atom"><a rel="S"  class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Sulfur</span></span><span class="text">S</span></a></li>
                                    <li class="action atom"><a rel="Cl" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Chlorine</span></span><span class="text">Cl</span></a></li>
                                    <li class="action atom"><a rel="Ar" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Argon</span></span><span class="text">Ar</span></a></li>
                                </ul>
                                <div class="clean"></div>
                            </div>

                            <div class="actions">
                                <ul>
                                    <li class="action atom remove"><a rel="Pl" class="button"><span class="hvrHlpCnt "><span class="hvrHlp">Increase charge of selected atom</span></span>	<span class="text">+1</span></a></li>
                                    <li class="action atom remove"><a rel="Mi" class="button"><span class="hvrHlpCnt "><span class="hvrHlp">Decrease charge of selected atom</span></span>	<span class="text">-1</span></a></li>
                                </ul>
                                <div class="clean"></div>
                            </div>
                        </div>

                        <h3>Bond Manipulation</h3>

                        <div class="editorset">
                            <div class="actions">
                                <ul>
                                    <li class="action bond"><a rel="n" href="#" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Turn off bond editing</span></span><span class="text">Off</span></a></li>
                                    <li class="action bond"><a rel="0" href="#" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Break bond</span></span><span class="text">Break</span></a></li>
                                    <li class="action bond"><a rel="1" href="#" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Change Bond type</span></span><span class="text">Single</span></a></li>
                                    <li class="action bond"><a rel="2" href="#" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Change Bond type</span></span><span class="text">Double</span></a></li>
                                    <li class="action bond"><a rel="3" href="#" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">Change Bond type</span></span><span class="text">Triple</span></a></li>
                                </ul>
                                <div class="clean"></div>
                            </div>
                        </div>

                        <h3>Calculate Molecule Properties</h3>

                        <div class="editorset">
                            <div class="actions center calculation">
                                <ul style="display:none;">
                                    <li class="action name"><a rel="" class="green button"><span class="hvrHlpCnt "><span class="hvrHlp">Get the name of current structure</span></span><span class="text">Find Name</span></a></li>
                                </ul>
                                <br />
                                <a class="green button calculate"><span class="hvrHlpCnt"><span class="hvrHlp">Is it time to calculate some properties?</span></span><span class="text">Calculate Properties</span></a>
                            </div>
                        </div>

                    </div>
                </div>

            </section>

            <section class="column gamma">
                <div class="canvas_jsmol">
                    <script type="text/javascript">
                    myJmol1 = Jmol.getApplet("myJmol1", myInfo1);
                    Jmol.script(myJmol1, 'load "assets/molstruc/methane.xyz";');
                    Jmol.script(myJmol1, 'background "#f7f7f7"');
                    Jmol.script(myJmol1, 'set bondRadiusMilliAngstroms 100; set multipleBondSpacing -0.3');
                    </script>
                </div>
            </section>
            <div class="clean"></div>
        </section>
        <!-- /PAGE -->

    </section>
</section>

