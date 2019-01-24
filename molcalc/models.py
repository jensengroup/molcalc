
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


def db_connect():
    """
    Performs database connection using database settings from settings.py.
    Returns sqlalchemy engine instance
    """

    connect_string = "sqlite:///database.sqlite"

    return create_engine(connect_string)


class MyModel(Base):
    __tablename__ = 'mymodel'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    value = Column(Integer)

    def __repr__(self):
        fmt = "<Molecule {:} {:}>"
        return fmt.format(
            self.id,
            self.name)


class Calculation(Base):
    __tablename__ = "calculations"
    id = Column(Integer, primary_key=True)
    hashkey = Column(String)
    created = Column(DateTime)
    name = Column(String)
    smiles = Column(String)
    sdf = Column(String)
    svg = Column(String)

    def __repr__(self):
        fmt = "<Calculation {:} {:} >"
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
