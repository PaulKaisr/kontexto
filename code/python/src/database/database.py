import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class Database:
    _instance = None
    _engine = None
    _SessionLocal = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
        return cls._instance

    def __init__(
        self,
        user=None,
        password=None,
        host=None,
        port=None,
        dbname=None
    ):
        if not hasattr(self, "_initialized"):
            self.user = user or os.getenv("user")
            self.password = password or os.getenv("password")
            self.host = host or os.getenv("host")
            self.port = port or os.getenv("port")
            self.dbname = dbname or os.getenv("dbname")
            self._initialized = True

    def get_engine(self):
        if self._engine is None:
            url = f"postgresql+psycopg2://{self.user}:{self.password}@{self.host}:{self.port}/{self.dbname}"
            self._engine = create_engine(url)
        return self._engine

    def get_session(self):
        if self._SessionLocal is None:
            engine = self.get_engine()
            self._SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        return self._SessionLocal()
