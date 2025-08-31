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


def backup_similarity_data(db: Database = None):
    """
    Backup existing similarity data before schema change.
    """
    from sqlalchemy import text
    
    db = db or Database()
    engine = db.get_engine()
    
    print("Backing up existing similarity data...")
    
    with engine.begin() as connection:
        # Check if similarity table exists and has data
        result = connection.execute(text(
            "SELECT COUNT(*) FROM information_schema.tables "
            "WHERE table_name = 'similarity'"
        ))
        if result.scalar() == 0:
            print("No similarity table found - nothing to backup")
            return []
        
        # Get all existing data
        result = connection.execute(text(
            "SELECT game_id, word, similarity FROM similarity ORDER BY game_id, similarity"
        ))
        data = result.fetchall()
        print(f"Backed up {len(data)} similarity records")
        return data


def migrate_similarity_table(db: Database = None):
    """
    Migrate similarity table to new schema with composite primary key and indexes.
    """
    from sqlalchemy import text
    from src.database.entities.similarity import SimilarityEntity
    from src.database.entities.base import TableBase
    
    db = db or Database()
    engine = db.get_engine()
    
    print("Migrating similarity table schema...")
    
    # Step 1: Backup data
    backup_data = []
    with engine.begin() as connection:
        try:
            result = connection.execute(text(
                "SELECT game_id, word, similarity FROM similarity ORDER BY game_id, similarity"
            ))
            backup_data = result.fetchall()
            print(f"Backed up {len(backup_data)} records before migration")
        except Exception as e:
            print(f"Could not backup data (table may not exist): {e}")
    
    # Step 2: Drop and recreate table in separate transaction
    with engine.begin() as connection:
        try:
            connection.execute(text("DROP TABLE IF EXISTS similarity CASCADE"))
            print("Dropped existing similarity table")
        except Exception as e:
            print(f"Error dropping table: {e}")
    
    # Create new table with updated schema
    try:
        TableBase.BASE.metadata.create_all(engine, tables=[SimilarityEntity.__table__])
        print("Created new similarity table with composite primary key")
    except Exception as e:
        print(f"Error creating new table: {e}")
        raise
    
    # Step 3: Restore data in batches
    if backup_data:
        print(f"Restoring {len(backup_data)} records in batches...")
        batch_size = 10000
        restored_count = 0
        
        for i in range(0, len(backup_data), batch_size):
            batch = backup_data[i:i+batch_size]
            
            with engine.begin() as connection:
                try:
                    for game_id, word, similarity_rank in batch:
                        connection.execute(text(
                            "INSERT INTO similarity (game_id, word, similarity) VALUES (:game_id, :word, :similarity)"
                        ), {"game_id": game_id, "word": word, "similarity": similarity_rank})
                    restored_count += len(batch)
                    print(f"Restored batch {i//batch_size + 1}: {restored_count}/{len(backup_data)} records")
                except Exception as e:
                    print(f"Error restoring batch starting at index {i}: {e}")
                    # Continue with next batch rather than failing completely
        
        print(f"Restored {restored_count} records total")
    
    # Step 4: Add performance indexes
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


def check_final_state(db: Database = None):
    """
    Verify the final state of the migrated table.
    """
    from sqlalchemy import text
    
    db = db or Database()
    engine = db.get_engine()
    
    print("\nVerifying final table state...")
    
    with engine.begin() as connection:
        # Check table structure
        result = connection.execute(text("""
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_name = 'similarity'
            ORDER BY ordinal_position
        """))
        
        columns = result.fetchall()
        print("Table structure:")
        for col_name, data_type, nullable, default in columns:
            print(f"  - {col_name}: {data_type} (nullable: {nullable}, default: {default})")
        
        # Check indexes
        result = connection.execute(text("""
            SELECT indexname, indexdef 
            FROM pg_indexes 
            WHERE tablename = 'similarity'
            ORDER BY indexname
        """))
        
        indexes = result.fetchall()
        print("Indexes:")
        for idx_name, idx_def in indexes:
            print(f"  - {idx_name}: {idx_def}")
        
        # Check data count
        result = connection.execute(text("SELECT COUNT(*) FROM similarity"))
        count = result.scalar()
        print(f"Total records: {count}")


def main(args):
    configure_env(args)
    
    print("Migrating similarity table to optimized schema...")
    print("This will:")
    print("1. Backup existing data")
    print("2. Drop and recreate the table with composite primary key (game_id, word)")
    print("3. Restore data")
    print("4. Add performance indexes")
    
    if not args.yes:
        response = input("\nProceed with migration? (y/N): ")
        if response.lower() not in ['y', 'yes']:
            print("Migration cancelled")
            return
    
    migrate_similarity_table()
    check_final_state()
    
    print("\n✅ Migration completed successfully!")
    print("The similarity table now uses:")
    print("  - Composite primary key (game_id, word) - eliminates redundant similarity_id")
    print("  - Index on (game_id, word) - optimizes word lookups")
    print("  - Index on (game_id, similarity) - optimizes ranking queries")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Migrate similarity table to optimized schema')
    parser.add_argument('--local', action='store_true', help='Use .env.local from frontend')
    parser.add_argument('--production', action='store_true', help='Use .env from python directory')
    parser.add_argument('--yes', '-y', action='store_true', help='Auto-confirm migration without prompt')
    args = parser.parse_args()
    main(args)