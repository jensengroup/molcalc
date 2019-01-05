
import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))

with open(os.path.join(here, 'readme.rst')) as f:
    README = f.read()
with open(os.path.join(here, 'requirements.txt')) as f:
    requirements = f.read()
    requirements = requirements.split("\n")
    requirements = list(filter(None, requirements))

tests_require = [
    'WebTest >= 1.3.1',  # py3 compat
    'pytest >= 3.7.4',
    'pytest-cov',
]

setup(
    name='molcalc',
    version='3.0',
    description='MolCalc is a web-interface build for fast properity estimation of molecules using quantum chemistry (Education purpose)',
    long_description=README,
    classifiers=[
        'Programming Language :: Python',
        'Framework :: Pyramid',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: WSGI :: Application',
    ],
    author='',
    author_email='',
    url='',
    keywords='',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    extras_require={
        'testing': tests_require,
    },
    install_requires=requirements,
    entry_points={
        'paste.app_factory': [
            'main = molcalc:main',
        ],
        'console_scripts': [
            'initialize_molcalc_db=molcalc.models.initialize_db:main',
        ],
    },
)

