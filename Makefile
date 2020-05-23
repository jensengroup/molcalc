
PYTHON=env/bin/python
PSERVE=env/bin/pserve
PIP=env/bin/pip
CONDA=conda

all: env setup_assets molcalc/data molcalc/chemhelp

serve_development:
	ip a | grep inet
	env/bin/pserve development.ini --reload

serve_production:
	env/bin/pserve production.ini

serve: serve_development

test:
	env/bin/pytest
	# run backend tests
	# run javascript tests

env:
	${CONDA} env create -f environment.yml -p env
	${PIP} install -r requirements.txt

dependencies:
	sudo apt install -y libxrender-dev

molcalc/data: scripts/setup_datadir.sh
	bash scripts/setup_datadir.sh

setup_assets: molcalc/static/chemdoodleweb molcalc/static/jsmol molcalc/static/fontawesome molcalc/static/jquery/jquery.min.js molcalc/static/rdkit/rdkit.js

chemhelp:
	git clone https://github.com/charnley/chemhelp chemhelp --depth 1

molcalc/static/chemdoodleweb: scripts/setup_chemdoodle.sh
	bash scripts/setup_chemdoodle.sh

molcalc/static/jsmol: scripts/setup_jsmol.sh
	bash scripts/setup_jsmol.sh
	
molcalc/static/fontawesome: scripts/setup_fontawesome.sh
	bash scripts/setup_fontawesome.sh

molcalc/static/jquery/jquery.min.js: scripts/setup_jquery.sh
	bash scripts/setup_jquery.sh

molcalc/static/rdkit/rdkit.js: scripts/setup_rdkit.sh
	bash scripts/setup_rdkit.sh


backup:
	# Make backup of database
	cp database.sqlite database-`date +%m-%d-%Y`.sqlite

clean:
	# Remove database
	rm database.sqlite

super-clean:
	rm -r molcalc/static/jquery/jquery.min.js molcalc/static/fontawesome molcalc/static/jsmol molcalc/static/chemdoodleweb

