
python=env/bin/python
conda=conda

line_length=79
blackargs=--line-length ${line_length}

src=molcalc/*.py molcalc_lib/*.py tests/*.py

## Development

lint:
	${python} -m isort --check-only ${src}
	${python} -m flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
	${python} -m flake8 . --count --exit-zero --max-complexity=10 --statistics
	${python} -m black --check ${BLACKARGS} ${src}

format:
	${python} -m isort ${src}
	${python} -m autoflake --in-place --remove-unused-variables ${src}
	${python} -m black ${BLACKARGS} ${src}

test:
	${python} -m pytest -vrs tests
	@# TODO backend tests
	@# TODO javascript tests

## Serve service

serve_development:
	ip a | grep inet
	${python} -m pserve development.ini --reload

serve_production:
	env/bin/pserve production.ini

serve: serve_development

## Setup enviroment

env:
	${conda} env create -f environment.yml -p env
	${python} -m pip install -r requirements.txt

env-dev:
	${python} -m pip install -r requirements.dev.txt

dependencies:
	sudo apt install -y libxrender-dev

molcalc/data: scripts/setup_datadir.sh
	bash scripts/setup_datadir.sh

setup_assets: molcalc/static/chemdoodleweb molcalc/static/jsmol molcalc/static/fontawesome molcalc/static/jquery/jquery.min.js molcalc/static/rdkit/rdkit.js

ppqm:
	git clone https://github.com/ppqm/ppqm ppqm --depth 1

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

## Admin

backup:
	# Make backup of database
	cp database.sqlite database-`date +%m-%d-%Y`.sqlite

clean:
	# Remove database
	rm database.sqlite

super-clean:
	rm -r molcalc/static/jquery/jquery.min.js molcalc/static/fontawesome molcalc/static/jsmol molcalc/static/chemdoodleweb

