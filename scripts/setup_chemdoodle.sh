#!/bin/bash

cd molcalc/static/

wget https://web.chemdoodle.com/downloads/ChemDoodleWeb-8.0.0.zip

unzip ChemDoodleWeb-8.0.0.zip

mkdir chemdoodle

cp -r ChemDoodleWeb-8.0.0/install/* chemdoodle/
cp -r ChemDoodleWeb-8.0.0/src/* chemdoodle/

rm -r ChemDoodleWeb-8.0.0*


