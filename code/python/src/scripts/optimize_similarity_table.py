import argparse
from pathlib import Path
from dotenv import load_dotenv

from src.database.database import Database
from src.database.database_config import DatabaseConfig

# Path derivations (independent of CWD)
SCRIPTS_DIR = Path(__file__).resolve().parent
SRC_DIR = SCRIPTS_DIR.parent
PYTHON_DIR = SRC_DIR.parent
CODE_DIR = PYTHON_DIR.parent


def configure_env(args):
    if args.local and args.production:
        raise SystemExit("Cannot specify both --local and --production")

    candidate = None
    if args.local:
        candidate = PYTHON_DIR / ".env.local"
    elif args.production:
        candidate = PYTHON_DIR / ".env"
    else:  # auto-detect preference
        if (PYTHON_DIR / ".env.local").exists():
            candidate = PYTHON_DIR / ".env.local"
        elif (PYTHON_DIR / ".env").exists():
            candidate = PYTHON_DIR / ".env"

    if not candidate or not candidate.exists():
        raise SystemExit("No suitable environment file found (.env.local in frontend or .env in python directory)")

    DatabaseConfig.set_environment(str(candidate))
    load_dotenv(str(candidate), override=True)
    print(f"Loaded environment: {candidate}")


def add_similarity_indexes(db: Database = None):
    """
    Add optimized indexes to the similarity table for better query performance.
    """
    from sqlalchemy import text
    
    db = db or Database()
    engine = db.get_engine()
    
    print("Adding optimized indexes to similarity table...")
    
    with engine.begin() as connection:
        try:
            # Add composite index for word lookups (game_id, word)
            print("Creating index for word lookups: idx_similarity_game_word...")
            connection.execute(text(
                "CREATE INDEX IF NOT EXISTS idx_similarity_game_word "
                "ON similarity (game_id, word)"
            ))
            print("✓ Index idx_similarity_game_word created successfully")
            
            # Add index for ranking queries (game_id, similarity)
            print("Creating index for ranking queries: idx_similarity_game_rank...")
            connection.execute(text(
                "CREATE INDEX IF NOT EXISTS idx_similarity_game_rank "
                "ON similarity (game_id, similarity)"
            ))
            print("✓ Index idx_similarity_game_rank created successfully")
            
        except Exception as e:
            print(f"✗ Failed to create indexes: {e}")
            raise


def check_existing_indexes(db: Database = None):
    """
    Check what indexes currently exist on the similarity table.
    """
    from sqlalchemy import text
    
    db = db or Database()
    engine = db.get_engine()
    
    print("Checking existing indexes on similarity table...")
    
    with engine.begin() as connection:
        # Query to get indexes for similarity table (PostgreSQL specific)
        result = connection.execute(text("""
            SELECT indexname, indexdef 
            FROM pg_indexes 
            WHERE tablename = 'similarity'
            ORDER BY indexname
        """))
        
        indexes = result.fetchall()
        if indexes:
            print("Existing indexes:")
            for idx_name, idx_def in indexes:
                print(f"  - {idx_name}: {idx_def}")
        else:
            print("No indexes found on similarity table")


def main(args):
    configure_env(args)
    
    if args.check:
        check_existing_indexes()
        return
    
    print("Optimizing similarity table with performance indexes...")
    
    # Check existing indexes first
    check_existing_indexes()
    print()
    
    # Add new indexes
    add_similarity_indexes()
    
    print("\nOptimization completed successfully!")
    print("New indexes added:")
    print("  - idx_similarity_game_word: Optimizes word lookups by (game_id, word)")
    print("  - idx_similarity_game_rank: Optimizes ranking queries by (game_id, similarity)")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Optimize similarity table with performance indexes')
    parser.add_argument('--local', action='store_true', help='Use .env.local from frontend')
    parser.add_argument('--production', action='store_true', help='Use .env from python directory')
    parser.add_argument('--check', action='store_true', help='Only check existing indexes, do not create new ones')
    args = parser.parse_args()
    main(args)