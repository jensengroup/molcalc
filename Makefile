
PYTHON=anaconda

all:
	# check assets paths
	# check python modules


test:
	# run python test
	# run backend tests
	# run javascript tests


install:



python_wsgi:
	# get path
	# ask questions

python_env:
	${PYTHON} -m venv env
	env/bin/pip install --upgrade pip setuptools
	env/bin/pip install -e ".[testing]"

apache:
	# get path
	# ask questions


download_chemdoodle:
	wget

download_jsmol:
	wget

download_fontawesome:
	wget

download_jquery:
	wget


dev_download_font:
	wget Montserrat
	setup


