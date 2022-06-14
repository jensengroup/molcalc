import os
import sys

here = os.path.dirname(__file__)
sys.path.append(here)

import configparser
import json
from wsgiref.simple_server import make_server

import models
import zope.sqlalchemy
from pyramid.config import Configurator
from pyramid_jinja2.filters import static_url_filter
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker


def get_engine(settings, prefix="sqlalchemy."):
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager):
    """
    Get a ``sqlalchemy.orm.Session`` instance backed by a transaction.

    This function will hook the session to the transaction manager which
    will take care of committing any changes.

    - When using pyramid_tm it will automatically be committed or aborted
      depending on whether an exception is raised.

    - When using scripts you should wrap the session in a manager yourself.
      For example::

          import transaction

          engine = get_engine(settings)
          session_factory = get_session_factory(engine)
          with transaction.manager:
              dbsession = get_tm_session(session_factory, transaction.manager)

    """
    dbsession = session_factory()
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager
    )
    return dbsession


def get_config(config=None):
    """This function defines the configuration of the site"""

    if config is None:
        config = Configurator()

    # Setup jinja templating
    config.include("pyramid_jinja2")
    config.add_jinja2_renderer(".html")

    # Static files
    config.add_static_view("static", "static")
    config.add_static_view("assets", "assets")

    # Home page is the editor
    config.add_route("editor", "/")

    # Calculation views
    config.add_route("calculations", "/calculations")
    config.add_route("calculation", "/calculations/{one}")

    # Static pages
    config.add_route("about", "/about")
    config.add_route("help", "/help")

    # Ajax paths
    config.add_route("submitquantum", "/ajax/submitquantum")
    config.add_route("smiles_to_sdf", "/ajax/smiles")
    config.add_route("sdf_to_smiles", "/ajax/sdf")

    # database
    settings = config.get_settings()
    settings["tm.manager_hook"] = "pyramid_tm.explicit_manager"

    # use pyramid_tm to hook the transaction lifecycle to the request
    config.include("pyramid_tm")

    # use pyramid_retry to retry a request when transient exceptions occur
    config.include("pyramid_retry")

    #
    engine = get_engine(settings)
    models.initialize_db(engine)

    session_factory = get_session_factory(engine)
    config.registry["dbsession_factory"] = session_factory

    # make request.dbsession available for use in Pyramid
    config.add_request_method(
        # r.tm is the transaction manager used by pyramid_tm
        lambda r: get_tm_session(session_factory, r.tm),
        "dbsession",
        reify=True,
    )

    # Scan a Python package and any of its subpackages for objects marked with
    # configuration decoration
    config.scan()

    # Commit any pending configuration actions.
    config.commit()

    # Setup jinja enviroment
    jinja2_env = config.get_jinja2_environment()
    jinja2_env.filters["static_url"] = static_url_filter

    return config


def main(global_conf, **settings):
    """This function returns a Pyramid WSGI application."""

    # Load custom sections from ini file
    # TODO Is there a better solution to read settings?
    sections = ["gamess", "scr", "molcalc"]
    parser = configparser.ConfigParser()
    parser.read(global_conf["__file__"])
    for section in sections:
        if not section in parser:
            continue
        for k, v in parser.items(section):
            settings[section + "." + k] = v

    print(json.dumps(settings, indent=1))

    config = get_config(config=Configurator(settings=settings))

    return config.make_wsgi_app()


if __name__ == "__main__":

    config = get_config()
    app = config.make_wsgi_app()

    HOST = "0.0.0.0"
    PORT = 6540

    SERVER = make_server(HOST, PORT, app)
    SERVER.serve_forever()
