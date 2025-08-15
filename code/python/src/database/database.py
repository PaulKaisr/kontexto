import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from src.database.database_config import DatabaseConfig


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
            # Clear existing environment variables to avoid conflicts
            env_vars_to_clear = ['user', 'password', 'host', 'port', 'dbname']
            for var in env_vars_to_clear:
                if var in os.environ:
                    del os.environ[var]
            
            # Load environment file based on DatabaseConfig setting
            env_file = DatabaseConfig.get_env_file()
            if env_file:
                load_dotenv(env_file, override=True)
                print(f"Using database config from: {env_file}")
            else:
                # Default: prefer .env.local if it exists, otherwise use .env
                if os.path.exists('.env.local'):
                    load_dotenv('.env.local', override=True)
                    print("Using local database config (.env.local)")
                else:
                    load_dotenv('.env', override=True)
                    print("Using production database config (.env)")
            
            def first_env(*keys, default=None):
                for k in keys:
                    val = os.getenv(k)
                    if val:
                        return val
                return default
            
            # Accept multiple possible naming conventions + sensible defaults for local Supabase
            self.user = user or first_env('user', 'DB_USER', 'PGUSER', default='postgres')
            self.password = password or first_env('password', 'DB_PASSWORD', 'PGPASSWORD', 'SUPABASE_DB_PASSWORD', default='postgres')
            self.host = host or first_env('host', 'DB_HOST', 'PGHOST', default='localhost')
            self.port = port or first_env('port', 'DB_PORT', 'PGPORT', default='54322')
            self.dbname = dbname or first_env('dbname', 'DB_NAME', 'PGDATABASE', default='postgres')
            
            # Debug print
            print(f"Database config loaded: user={self.user}, host={self.host}, port={self.port}, dbname={self.dbname}")
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
