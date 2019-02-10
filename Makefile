
PYTHON=anaconda
CONDA=anaconda-conda

serve_development:
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
	env/bin/python setup.py develop

env_venv:
	# I would do it like this if I didn't have to do it with rdkit/conda
	${PYTHON} -m venv env
	env/bin/pip install --upgrade pip setuptools
	env/bin/pip install -e ".[testing]"

db_molecules.sqlite:


setup_alembic:
	# TODO
	setup alembic
	edit ini and env
	rm ${DATABASE}
	alembic upgrade head
	alembic revision --autogenerate -m "baseline"
	alembic upgrade head
	# do changes to models.py
	alembic revision --autogenerate -m "changes to models"
	alembic upgrade head


apache_config:
	# get path
	# ask questions


setup_assets: molcalc/assets/chemdoodle molcalc/assets/jsmol molcalc/assets/fontawesome molcalc/assets/jquery

molcalc/assets/chemdoodle:
	wget

molcalc/assets/jsmol:
	wget

molcalc/assets/fontawesome:
	wget

molcalc/assets/jquery:
	wget



dev_download_font:
	wget Montserrat
	setup


