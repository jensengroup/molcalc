
from sqlalchemy import create_engine, Column, Table, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import MetaData
from sqlalchemy import (
    Integer,
    SmallInteger,
    String,
    Date,
    DateTime,
    Float,
    Boolean,
    Text,
    LargeBinary)

import sqlalchemy as sa

import zlib
import gzip

# Recommended naming convention used by Alembic, as various different database
# providers will autogenerate vastly different names making migrations more
# difficult. See: http://alembic.zzzcomputing.com/en/latest/naming.html
NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=NAMING_CONVENTION)
Base = declarative_base(metadata=metadata)


def compress(s):
    if type(s) == str:
        s = s.encode()
    b = gzip.compress(s)
    return b


def decompress(b):
    s = gzip.decompress(b)
    return s


class CompressedString(sa.types.TypeDecorator):
    """
    Storage datatype for large blobs of text
    """
    impl = LargeBinary

    def process_bind_param(self, value, dialect):
        return compress(value)

    def process_result_value(self, value, dialect):
        return decompress(value)


class NumpyArray(sa.types.TypeDecorator):
    """
    Storage datatype for numpy arrays
    """

    impl = LargeBinary

    def save_array(arr):
        s = StringIO()
        np.savetxt(s, arr)
        return s.getvalue()

    def load_array(txt):
        s = StringIO(txt)
        arr = np.loadtxt(s)
        return arr

    def process_bind_param(self, value, dialect):
        value = self.save_array(value)
        return compress(value)

    def process_result_value(self, value, dialect):
        value = decompress(value)
        value = self.load_array(value)
        return value


def db_connect():
    """
    Performs database connection using database settings from settings.py.
    Returns sqlalchemy engine instance
    """

    connect_string = "sqlite:///database.sqlite"

    return create_engine(connect_string)


class GamessCalculation(Base):
    __tablename__ = "gamesscalculations"
    id = Column(Integer, primary_key=True)

    # Basic descriptors
    hashkey = Column(String)
    created = Column(DateTime)
    name = Column(String)
    smiles = Column(String)
    sdf = Column(String)
    mol2 = Column(String)
    svg = Column(String)
    coordinates = Column(String)

    # GAMESS Results
    enthalpy = Column(Float)
    charges = Column(String)

    islinear = Column(String)
    vibjsmol = Column(CompressedString)
    vibfreq = Column(String)
    vibintens = Column(String)
    thermo = Column(String)

    orbitals = Column(String)
    orbitalstxt = Column(CompressedString)

    soltotal = Column(Float)
    solpolar = Column(Float)
    solnonpolar = Column(Float)
    solsurface = Column(Float)
    soldipole = Column(String)
    soldipoletotal = Column(Float)

    def __repr__(self):
        fmt = "<GamessCalculation {:} {:} >"
        return fmt.format(self.smiles, self.hashkey)


class Counter(Base):
    __tablename__ = "molecules"
    smiles = Column(String, primary_key=True)
    count = Column(Integer)

    def __repr__(self):
        fmt = "<Molecule {:} {:} >"
        return fmt.format(self.smiles, self.count)


def initialize_db(engine):
    Base.metadata.create_all(engine)
    return


if __name__ == "__main__":
    engine = db_connect()
    initialize_db(engine)
