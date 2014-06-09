# The Molecule Calculator (MolCalc)

Hosted at [molcalc.org](http://molcalc.org)

![Editor Screenshot](http://pubs.acs.org/appl/literatum/publisher/achs/journals/content/jceda8/2013/jceda8.2013.90.issue-8/ed400164n/production/images/large/ed-2013-00164n_0003.jpeg)


## Installation

If you want to install it on your own server with PHP support, of course.


### Install Dependencies

* PHP5 / Apache2

* [OpenBabel w/ PNG Support](http://openbabel.org/docs/dev/Installation/install.html)
  Make sure that the the correct libs are installed before compile open babel. See above link.
  If you are using Ubuntu, OpenBabel is install via

        sudo apt-get install openbabel


* [GAMESS](http://www.msg.ameslab.gov/gamess/). You must obtain a copy of the GAMESS code separately from their website.

* mod rewrite. MolCalc uses a .htaccess script for redirecting the web requests.
  Please make sure mod\_rewrite is enabled. On ubuntu this is done by running the command

        sudo a2enmod rewrite


### Installation

- Clone MolCalc

        git clone https://github.com/jensengroup/molcalc.git molcalc

  and a new folder is created named 'molcalc'


- Setup MolCalc settings.
  Copy and paste settings.default.ini to settings.ini in the root folder

        cp settings.default.ini settings.ini

   fill in the settings needed

   * tmpfolder: Path to temporary working folder. Must be read/writable by the www-user.

   * rungms: The path to the rungms executable


- Make the "data"-folder in MolCalc root with write rights for www-data

        mkdir data
        chmod 777 data

- Check health\_check.php via a browser to check if everything is setup correctly.

- Done, Happy Mol-Calculating

### GAMESS Note

There might be some issues for some 'rungms' scripts.
Note that the MolCalc application will be run default on the www-data user (via apache),
and will not have the $HOME variable set for rungms.

My advice is to copy rungms to rungms\_molcalc, remove all $HOME variables
and use that rungms instead.

### Changelog

Changes in 1.3


## For Developers

MolCalc uses

* JSmol to edit and visualise the properties of molecules.

* OpenBabel to convert file formats and creation of 2D PNG structures.

* GAMESS for all QM calculations.

and the source is released under the GPL license.

### Extend calculations

Please see the source located in the methods folder.

### Credits

MolCalc is written by Jimmy Charnley Kromann and Maher Channir, based on an idea by Jan Jensen.

The development of MolCalc is supported by the University of Copenhagen through the Education at its Best Initiative (Den Gode Uddannelse).


## FAQ

### Setting up OpenBabel

For OpenBabel to work with PNG bindings (which is needed for the nice Calculation List), you will need
to install OpenBabel yourself.

Firstly, install the package dependencies.
On Ubuntu you will need the following packages

    apt-get install libxml2-dev zlib1g-dev libcairo2-dev libeigen2-dev python-dev

Now we can [download OpenBabel 2.3.1](http://sourceforge.net/projects/openbabel/files/openbabel/2.3.2/openbabel-2.3.2.tar.gz/download) and compile

    tar zxf openbabel-2.3.2.tar.gz
    mkdir build
    cd build
    cmake ../openbabel-2.3.2 -DPYTHON_BINDINGS=ON
    make
    sudo make install

Now export the path to Python.

    export PYTHONPATH=/usr/local/lib:$PYTHONPATH

Read the full [installation description here](http://openbabel.org/docs/dev/Installation/install.html).

### Setting up ModRewrite

On ubuntu the command is simply

        sudo a2enmod rewrite


### Compiling GAMESS on your server

Please see [this guide](http://computerandchemistry.blogspot.dk/2014/02/compiling-and-setting-up-gamess.html) on how to compile GAMESS.


