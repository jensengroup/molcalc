
MolCalc - The Molecule Calculator
=================================

|screenshot|

Important! Currently version 2.0 is *under construction*. Version 1.3 is still hosted
at molcalc.org_ and source is available at `github.com/jensengroup/molcalc-1.3`__.

The molecule calculator is a small web-based interface for doing small-scale
quantum chemistry calculation with the intent of giving chemical intuition to
students, from high-school to university.
Hosted at molcalc.org_.

.. _molcalc.org: http://molcalc.org

.. _github_molcalc13: https://github.com/jensengroup/molcalc-1.3

__ github_molcalc13_

.. |screenshot| image:: https://raw.githubusercontent.com/jensengroup/molcalc/master/screenshot.jpg

Installation
------------

Simply clone the repo and install dependencies.
Easiest is to use Anaconda_, because we use RDKit in the background.

.. _Anaconda: https://www.anaconda.com/download

The following steps are included in the ``Makefile``.

.. code-block:: bash

    git clone https://github.com/jensengroup/molcalc
    cd molcalc
    make

will execute the following points.

1. Clone the repository

.. code-block:: bash

    git clone https://github.com/jensengroup/molcalc

2. Create the Python environment using Conda and Pip

.. code-block:: bash

    conda env create -f environment.yml -p env
    env/bin/python setup.py develop

3. Download the JavaScript and frontend libaries, using the scripts. You need `unzip` and `wget` installed.

.. code-block:: bash

    bash scripts/setup_datadir.sh
    bash scripts/setup_chemdoodle.sh
    bash scripts/setup_jsmol.sh
    bash scripts/setup_fontawesome.sh
    bash scripts/setup_jquery.sh


Deploy locally
--------------

Deploy using either development or production ``ini`` files.

.. code-block:: bash

    env/bin/pserve development.ini --reload


And molcalc should now be available on ``localhost:6543``, based on the settings of development.ini.


Deploy cloud
------------

# TODO add guide to deploy on AWS


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

Easy config is just to host the service on port and use ProxyPass, for example for port `6543`.

   <VirtualHost *:80>
         ServerName hostname.com
         ProxyPreserveHost On
         ProxyPass / http://127.0.0.1:6543/
         ProxyPassReverse / http://127.0.0.1:6543/
   </VirtualHost>


Test
----

Remmember to edit configuriation for your GAMESS setup. Then run

   python -m pytest tests



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


Problems
--------

if rdkit has problems finding libxrender.so then you need to install some of the following

    apt install -y libxrender-dev

or

    ./env/bin/conda install nox
    ./env/bin/conda install cairo
