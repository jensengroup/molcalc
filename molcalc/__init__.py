
import sys
import os

here = os.path.dirname(__file__)
sys.path.append(here)


from pyramid.config import Configurator
from wsgiref.simple_server import make_server

from pyramid_jinja2.filters import static_url_filter

def get_config(config=None):
    """ This function defines the configuration of the site
    """

    if config is None:
        config = Configurator()

    # Setup jinja templating
    config.include('pyramid_jinja2')
    config.add_jinja2_renderer('.html')

    # Static files
    config.add_static_view('static', 'static')
    config.add_static_view('assets', 'assets')

    # Home page is the editor
    config.add_route('editor', '/')

    # Calculation views
    config.add_route('calculations', '/calculations')
    config.add_route('calculation', '/calculations/{one}')

    # Static pages
    config.add_route('about', '/about')
    config.add_route('help', '/help')

    # Ajax paths
    config.add_route('submitquantum', '/ajax/submitquantum')
    config.add_route('smiles_to_sdf', '/ajax/smiles')
    config.add_route('sdf_to_smiles', '/ajax/sdf')

    # Scan a Python package and any of its subpackages for objects marked with
    # configuration decoration
    config.scan()


    # Commit any pending configuration actions.
    config.commit()

    # Setup jinja enviroment
    jinja2_env = config.get_jinja2_environment()
    jinja2_env.filters['static_url'] = static_url_filter

    return config


def main(global_settings, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = get_config(config=Configurator(settings=settings))
    return config.make_wsgi_app()


if __name__ == "__main__":

    config = get_config()
    app = config.make_wsgi_app()

    HOST = '0.0.0.0'
    PORT = 6540

    SERVER = make_server(HOST, PORT, app)
    SERVER.serve_forever()

