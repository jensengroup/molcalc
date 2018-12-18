
# MolCalc - Molecule Calculator

A Pyramid/ Python based server for doing fast quantum chemistry, primarily for educational purposes.
Live at [molcalc.org](http://molcalc.org).


## Installation

Simply clone the repo and install dependencies.
Easiest is to use [Anaconda](https://www.anaconda.com/download), because we use RDKit in the background (sorry).

    git clone <repo>
    conda install rdkit


### Dependencies

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



### Setup

apache


## Test


## Usage


## TODO



# mobile nav
https://dvc.org/doc/get-started/compare-experiments
    - color change
    - transistion
    - fixed

# Important

    Failed to load resource: net::ERR_INTERNET_DISCONNECTED
    ichemlabs.cloud.chemdoodle.com/icl_cdc_v070001/WebHQ

# UI

    # toggle / light and dark css scheme?

    specific calculation
        show orbitals first
        back button for other calculation type
        for a more "full screen view"

    search bar
        => like the google calendar bar
        => find systematic names, then put into search bar

        => when pressing "ctrl+v", then paste in searchbar and search!


# TODO

    Big search field. A mobile search first apporach
        For easier SMILES interpertation
        mobile: searchbar in top (extend over logo)
        auto-complete? how?

    Better structure to name analysation

    Use RDKit for SMILES and Cactus for names
        => show the user what service ajax is using / load the structure right away

    database based? instead of files
        => only look at cactus for new names
        => cache with cloudflare

    seo
        molecule viewer 3d web

    2d editor

    3dmol
        javascript based editor for 3dmoljs
            => MMFF in javascript
            => molecule information

# TODO computation

    spectrum
        H/C-NMR
        mass spectrum
        vibrational

    open shell systems

# Better texts

    Tutorials and assignment examples (with answers)

    Better FAQ interface

