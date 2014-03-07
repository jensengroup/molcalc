
<section class="body">
    <section class="container">

        <h1>About MolCalc</h1>

        <div class="view_navigation">
            <ul>
                <li class="student"><a class="button active">Student</a></li>
                <li class="teacher"><a class="button">Teacher</a></li>
                <li class="developer"><a class="button">Developer</a></li>
            </ul>
        </div>

        <div class="section student">
            <div style="width:500px;height:400px;float:right;overflow:hidden;background:#efefef;margin:0 0 20px 20px;">
                <iframe width="500" height="400" src="http://www.youtube.com/embed/ODdGGrzNp9Y?wmode=opaque" frameborder="0" allowfullscreen></iframe>
            </div>
            <h2>Student</h2>
            <p>
                For usage, watch the tutorial video.
            </p>

            <h3>FAQ</h3>

            <p>
                <strong>How do I measure distances in MolCalc?</strong><br />
                You double-click on atom 1 and then double-click on atom 2, in the JSmol window. Starts at 3:24 in the video.
            </p>
            <p>
                <strong>How do I measure angles in MolCalc?</strong><br />
                You double-click on atom 1, single click on atom 2, and then double-click on atom 3, in the JSmol window.
            </p>
            <p>
                <strong>The JSmol looks broken?</strong><br />
                Touch it with your cursor and it will look great again.
            </p>

            <div class="clean"></div>
        </div>


        <div class="section teacher">
            <!-- http://pubs.acs.org/doi/abs/10.1021/ed400164n -->
            <h2>Teacher</h2>

            <div style="width:48%;float:right;">

                <h3>How can I use MolCalc in teaching?</h3>

                <p>
                Just like a pocket calculator or a symbolic math program (such as Mathematica or MAPLE),
                MolCalc allows one to assign "higher level" chemical problems,
                that are not practically possible to solve previously.
                </p>

                <p>
                For example, one might now ask students to compute the effect of a
                substituent on a particular vibration, and then rationalize it using molecular
                orbitals. Or one might ask more open ended questions such as "build a molecule
                with an unusually long C-C single bond".
                </p>

                <p>
                For more further examples and information read these <a href="http://molecularmodelingbasics.blogspot.dk/search/label/molecule%20calculator">blog posts</a>, the <a href="http://pubs.acs.org/doi/abs/10.1021/ed400164n">paper</a> or
                <a href="http://pubs.acs.org/doi/suppl/10.1021/ed400164n/suppl_file/ed400164n_si_001.pdf">supplementary information</a>.</p>

                <p>
                Jan H. Jensen and Jimmy C. Kromann,<br />
                <strong>The Molecule Calculator: A Web Application for Fast Quantum Mechanics-Based Estimation of Molecular Properties</strong>,<br />
                Journal of Chemical Education, 2013, <a href="http://pubs.acs.org/doi/abs/10.1021/ed400164n">DOI: 10.1021/ed400164n</a>
                </p>



            </div>

            <div style="width:48%;">

                <h3>What is MolCalc?</h3>

                <p>
                MolCalc is a web interface that allows anyone to build
                <a class="explain">
                    <span class="hvrHlpCnt "><span class="hvrHlp">
                        MolCalc only allows calculations on (closed shell) molecules
                        with only doubly occupied molecular orbitals and with less than 11 non-hydrogen 
                        atoms.
                    </span></span>
                    small molecules
                </a>
                and estimate molecular properties such as</p>

                <ul>
                    <li>molecular structure</li>
                    <li>heats of formation and other thermodynamic properties</li>
                    <li>vibrational frequencies and vibrational modes</li>
                    <li>molecular orbitals and orbital energies</li>
                    <li>dipole moment and solvation surface</li>

                </ul>

                <p>
                in a matter of seconds or minutes - depending on the size.
                </p>


                <p>
                MolCalc is designed for teaching as opposed to research -
                specifically for assignments in which students build their own 
                molecules and estimate their own molecular properties.
                </p>

                <p>
                It is designed to run fast and therefore estimated
                molecular properties will not match experimental values exactly, and in some 
                cases be quite different.
                </p>

                <p>
                The idea is to have students develop a "chemical intuition"
                about how molecular structure affects molecular properties, without performing 
                the underlying calculations by hand (which would be near impossible for all but 
                the simplest chemical systems).
                </p>

            </div>

            <div class="clean"></div>

        </div>


        <div class="section developer">
            <h2>Developer</h2>

            <div style="width:48%;float:left;">

            <h3>How does MolCalc work?</h3>

            <p>
            Simply, using
            <a href="http://chemapps.stolaf.edu/jmol/jsmol/test2.htm">JSmol</a>
            and the <a href="<?php print BASEURL ?>">editor</a> you create a molecule.
            The structure is then send via AJAX to the server and optimized using GAMESS.
            </p>

            <p>
            After the optimization the user is then told (again AJAX) the ID of the molecule
            and send to the calculation page.
            Here it is possible to do all the calculations based on whatever procedure is
            setup for the specific calculation.
            </p>

            <p>
            The calculation procedures are easily extended and changed. See the folder 'methods' on GitHub.
            </p>


            <h3>Can I modify and/or install MolCalc on my own server?</h3>

            <p>
            Yes, MolCalc is distributed through GitHub under the GPL license
            </p>
            <p>
            <a href="https://github.com/jensengroup/molcalc">github.com/jensengroup/molcalc</a>.
            </p>
            <p>
            You must obtain a copy of the GAMESS code separately from <a href="http://www.msg.ameslab.gov/gamess/download.html">www.msg.ameslab.gov/gamess/download.html</a>
            </p>

            <p>
            The interface code uses PHP, jQuery, HTML, CSS3 and Bash.
            However the code is very modular and
            it therefore quite easy to add new capabilities to MolCalc,
            including new calculation types or changing existing.
            </p>

            </div>


            <div style="width:48%;float:right;">


            <h3>Installation and Dependencies</h3>

            <p>See installation guide on the <a href="https://github.com/jensengroup/molcalc">github page</a>.</p>


            <h3>Who is involved with MolCalc?</h3>

            <p>
            MolCalc developed by <a href="http://jimmy.charnley.dk">Jimmy Charnley Kromann</a> and Maher Channir,
            based on an idea by <a href="http://molecularmodelingbasics.blogspot.dk/">Jan Jensen</a>.
            The development of MolCalc is supported by the University of Copenhagen through the Education
            at its Best initiative (Den Gode Uddannelse).
            </p>

            <h3>Feedback and bugs</h3>

            <p>
            Bug reports and feature requests can be given here:
            <a href="https://github.com/jensengroup/molcalc/issues?state=open">github.com/jensengroup/molcalc/issues</a>
            </p>

            <h3>Older Versions</h3>

            <p>
                Link to older versions of MolCalc:
            </p>

            <ul>
                <li><a href="http://dgu.ki.ku.dk/molcalc-1.0">dgu.ki.ku.dk/molcalc-1.0/</a></li>
                <li><a href="http://dgu.ki.ku.dk/molcalc-1.1">dgu.ki.ku.dk/molcalc-1.1/</a></li>
                <li><a href="http://dgu.ki.ku.dk/molcalc-1.2">dgu.ki.ku.dk/molcalc-1.2/</a></li>
            </ul>

            </div>

            <div class="clean"></div>

        </div>

        <p style="margin-bottom:0;">
            <strong>Cite as:</strong>
            J. H. Jensen and J. C. Kromann,<br>
            <em>The Molecule Calculator: A Web Application for Fast Quantum Mechanics-Based Estimation of Molecular Properties</em>,<br>
            J. Chem. Educ., 2013, 90 (8), pp 1093–1095.
            <a href="http://pubs.acs.org/doi/abs/10.1021/ed400164n">DOI: 10.1021/ed400164n</a>
        </p>


    </section>
</section>
