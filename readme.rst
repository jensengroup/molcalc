
MolCalc - The Molecule Calculator
=================================

Note: Currently version 2.0 is under construction. Version 1.3 is still hosted
at molcalc.org_ and source is avaliable at `github.com/jensengroup/molcalc-1.3`__.

The molcule calculator is a small web-based interface for doing small-scale
quantum chemistry calculation with the intent of giving chemical intution to
students, from high-school to university.
Hosted at molcalc.org_.

.. _molcalc.org: http://molcalc.org

.. _github_molcalc13: https://github.com/jensengroup/molcalc-1.3

__ github_molcalc13_

Installation
------------

Simply clone the repo and install dependencies.
Easiest is to use Anaconda_, because we use RDKit in the background (sorry).

.. _Anaconda: https://www.anaconda.com/download

The following steps are included in the ``Makefile`` for convienced, so

.. code-block:: bash
    git clone https://github.com/jensengroup/molcalc
    cd molcalc
    make

will execute the following points.

1. Clone the repository

.. code-block:: bash

    git clone https://github.com/jensengroup/molcalc

2. Create the Python enviroment using Conda and Pip

.. code-block:: bash

    conda env create -f environment.yml -p env
    env/bin/python setup.py develop

3. Download the JavaScript and frontend libaries, using the scripts

.. code-block:: bash

    bash scripts/setup_datadir.sh
    bash scripts/setup_chemdoodle.sh
    bash scripts/setup_jsmol.sh
    bash scripts/setup_fontawesome.sh
    bash scripts/setup_jquery.sh


Deploy
------

Deploy using either development or production ``ini`` files.

.. code-block:: bash

    env/bin/pserve development.ini --reload


And molcalc should now be avaliable on ``localhost:6543``, based on the settings of development.ini.


Dependencies
------------

conda

    conda install -c rdkit rdkit

pip

    pyramid
    rdkit

modules

    fontawesome

    jquery
    chemdoodle
    jsmol


programs

    gamess

note on GAMESS setup



Setup on Apache server
----------------------


Test
----

TODO. should add tests to ``molcalc/tests.py``


TODO
----

    Failed to load resource: net::ERR_INTERNET_DISCONNECTED
    ichemlabs.cloud.chemdoodle.com/icl_cdc_v070001/WebHQ


TODO computation
----------------

    spectrum
        H/C-NMR
        mass spectrum
        vibrational

    open shell systems


TODO Better texts
-----------------

    Tutorials and assignment examples (with answers)

    Better FAQ interface

