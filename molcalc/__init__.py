
from wsgiref.simple_server import make_server
from waitress import serve

from pyramid.config import Configurator

from pyramid_jinja2.filters import static_url_filter

def generate_config():

    config = Configurator()

    # Public assets files
    config.add_static_view(name='assets', path='assets')

    # Render jinja2 html templates
    config.include('pyramid_jinja2')
    config.add_jinja2_renderer('.html')

    # Add paths

    # Home
    config.add_route('editor', '/')

    # Calculation views
    config.add_route('calculations_search', '/calculations')
    config.add_route('calculations_page', '/calculations/{hash}')

    # Static pages
    config.add_route('about', '/about')
    config.add_route('help', '/help')

    # Ajax paths
    config.add_route('generate_ajax_data', '/ajax')
    config.add_route('smiles_to_sdf', '/ajax/smiles')
    config.add_route('sdf_to_smiles', '/ajax/sdf')

    config.scan('views')

    # Configure the site
    config.commit()
    jinja2_env = config.get_jinja2_environment()
    jinja2_env.filters['static_url'] = static_url_filter

    return config


def main(global_config, **settings):
    config = Configurator(settings=settings)
    blog_title = settings['blog.title']
    # you can also access you settings via config
    comments_enabled = config.registry.settings['blog.comments_enabled']
    return config.make_wsgi_app()


def serve_molcalc(host='0.0.0.0', port=6543):

    config = generate_config()
    app = config.make_wsgi_app()

    # serve(app, host='0.0.0.0', port=6543)
    server = make_server(host, port, app)
    server.serve_forever()

    return


if __name__ == '__main__':
    serve_molcalc()

