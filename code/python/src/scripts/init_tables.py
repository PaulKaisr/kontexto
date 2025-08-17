import argparse
from pathlib import Path
from dotenv import load_dotenv

from src.database.database import Database
from src.database.database_config import DatabaseConfig
from src.database.entities.base import TableBase
from src.database.entities.game import GameEntity  # noqa: F401
from src.database.entities.similarity import SimilarityEntity  # noqa: F401
from src.database.entities.word import WordEntity  # noqa: F401

# Path derivations (independent of CWD)
SCRIPTS_DIR = Path(__file__).resolve().parent
SRC_DIR = SCRIPTS_DIR.parent
PYTHON_DIR = SRC_DIR.parent
CODE_DIR = PYTHON_DIR.parent
FRONTEND_DIR = CODE_DIR / "frontend"


def configure_env(args):
    if args.local and args.production:
        raise SystemExit("Cannot specify both --local and --production")

    candidate = None
    if args.local:
        candidate = FRONTEND_DIR / ".env.local"
    elif args.production:
        candidate = PYTHON_DIR / ".env"
    else:  # auto-detect preference
        if (FRONTEND_DIR / ".env.local").exists():
            candidate = FRONTEND_DIR / ".env.local"
        elif (PYTHON_DIR / ".env").exists():
            candidate = PYTHON_DIR / ".env"

    if not candidate or not candidate.exists():
        raise SystemExit("No suitable environment file found (.env.local in frontend or .env in python directory)")

    DatabaseConfig.set_environment(str(candidate))
    load_dotenv(str(candidate), override=True)
    print(f"Loaded environment: {candidate}")


def enable_rls(db: Database = None):
    """
    Enable Row Level Security (RLS) on all tables.
    """
    from sqlalchemy import text
    
    db = db or Database()
    engine = db.get_engine()
    
    # Get all table names from metadata
    table_names = [table.name for table in TableBase.BASE.metadata.tables.values()]
    
    print(f"Enabling RLS on {len(table_names)} tables...")
    
    with engine.begin() as connection:
        for table_name in table_names:
            try:
                # Enable RLS on each table
                connection.execute(text(f"ALTER TABLE {table_name} ENABLE ROW LEVEL SECURITY"))
                print(f"✓ RLS enabled on table: {table_name}")
            except Exception as e:
                print(f"✗ Failed to enable RLS on table {table_name}: {e}")


def init_db(db: Database = None):
    db = db or Database()
    engine = db.get_engine()
    TableBase.BASE.metadata.create_all(engine)


def main(args):
    configure_env(args)
    print("Initializing tables...")
    init_db()
    print("Tables created successfully.")
    
    # Determine if we should enable RLS
    is_local_env = args.local or (not args.production and (FRONTEND_DIR / ".env.local").exists())
    should_enable_rls = not args.no_rls and not is_local_env
    
    if should_enable_rls:
        enable_rls()
        print("RLS configuration completed.")
    else:
        if args.no_rls:
            print("RLS enablement skipped (--no-rls flag used).")
        elif is_local_env:
            print("RLS enablement skipped (local environment detected).")
        else:
            print("RLS enablement skipped.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Initialize database tables')
    parser.add_argument('--local', action='store_true', help='Use .env.local from frontend (automatically disables RLS)')
    parser.add_argument('--production', action='store_true', help='Use .env from python directory (enables RLS)')
    parser.add_argument('--no-rls', action='store_true', help='Force skip enabling Row Level Security on tables')
    args = parser.parse_args()
    main(args)
