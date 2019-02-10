#!/bin/bash

cd molcalc/static

wget https://sourceforge.net/projects/jmol/files/Jmol/Version%2014.29/Jmol%2014.29.31/Jmol-14.29.31-binary.zip

unzip Jmol-14.29.31-binary.zip

cd jmol-14.29.31
unzip jsmol.zip

cd ..

mv jmol-14.29.31/jsmol jsmol

rm -r jmol-14.29.31
rm Jmol-14.29.31-binary.zip

