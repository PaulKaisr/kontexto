"""
Table bases module
"""
from sqlalchemy.orm import declarative_base

class TableBase:  # pylint: disable=too-few-public-methods
    """
    Holds SQLAlchemy bases (reflected and non-reflected meta-information) for all tables in
    the database.
    """
    BASE = None

    @classmethod
    def init_base(cls):
        """
        Initialise base classes, which contain meta-information about the defined tables that
        inherit from it.
        """
        # BASE contains meta-information about the tables in the main schema
        cls.BASE = declarative_base()


TableBase.init_base()
