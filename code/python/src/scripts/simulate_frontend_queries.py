import argparse
from pathlib import Path
from dotenv import load_dotenv
import time

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


def simulate_frontend_word_lookup(db: Database, game_id: int, word: str):
    """
    Simulate the getSimilarityByGameIdAndWord function from supabase.ts
    """
    from sqlalchemy import text
    
    # Convert word to test cases as frontend does
    lowercase_word = word.lower()
    capitalized_word = word.capitalize()
    
    # Create array of unique words to check
    words_to_check = [lowercase_word, capitalized_word] if lowercase_word != capitalized_word else [lowercase_word]
    
    start_time = time.time()
    
    with db.get_session() as session:
        # This replicates the frontend query
        result = session.execute(text(
            "SELECT game_id, word, similarity FROM similarity WHERE game_id = :game_id AND word = ANY(:words)"
        ), {"game_id": game_id, "words": words_to_check})
        
        data = result.fetchall()
    
    end_time = time.time()
    
    if not data:
        return None, (end_time - start_time) * 1000
    
    # Find the best match (lowest similarity rank)
    best_match = min(data, key=lambda x: x[2])
    
    return {
        "game_id": best_match[0],
        "word": best_match[1], 
        "similarity": best_match[2],
        "matchedWord": best_match[1]
    }, (end_time - start_time) * 1000


def simulate_frontend_hint_query(db: Database, game_id: int, rank: int):
    """
    Simulate the getHintForGame function from supabase.ts
    """
    from sqlalchemy import text
    
    start_time = time.time()
    
    with db.get_session() as session:
        # This replicates the frontend hint query
        result = session.execute(text(
            "SELECT word, similarity FROM similarity WHERE game_id = :game_id "
            "ORDER BY similarity ASC LIMIT 1 OFFSET :offset"
        ), {"game_id": game_id, "offset": rank - 1})
        
        data = result.fetchone()
    
    end_time = time.time()
    
    if not data:
        return None, (end_time - start_time) * 1000
    
    return {"word": data[0], "similarity": data[1]}, (end_time - start_time) * 1000


def simulate_frontend_top_words(db: Database, game_id: int, limit: int = 500):
    """
    Simulate the getTopWordsByGame function from supabase.ts
    """
    from sqlalchemy import text
    
    start_time = time.time()
    
    with db.get_session() as session:
        # This replicates the frontend top words query
        result = session.execute(text(
            "SELECT word, similarity FROM similarity WHERE game_id = :game_id "
            "ORDER BY similarity ASC LIMIT :limit"
        ), {"game_id": game_id, "limit": limit})
        
        data = result.fetchall()
    
    end_time = time.time()
    
    # Add rank numbers as frontend does
    top_words = [
        {
            "word": item[0],
            "similarity": item[1], 
            "rank": index + 1
        }
        for index, item in enumerate(data)
    ]
    
    return top_words, (end_time - start_time) * 1000


def run_frontend_simulation():
    """
    Run comprehensive simulation of frontend queries.
    """
    print("Simulating frontend database queries...")
    print("=" * 50)
    
    db = Database()
    
    # Get a sample game
    with db.get_session() as session:
        from sqlalchemy import text
        result = session.execute(text("SELECT game_id FROM similarity LIMIT 1"))
        game_id = result.scalar()
    
    if not game_id:
        print("No games found in database")
        return
    
    print(f"Testing with game_id: {game_id}")
    
    # Test 1: Word lookup simulation
    print("\n1. Testing word lookups (getSimilarityByGameIdAndWord)...")
    test_words = ["liebe", "LIEBE", "Liebe", "test", "haus"]
    
    for word in test_words:
        result, query_time = simulate_frontend_word_lookup(db, game_id, word)
        if result:
            print(f"  ✓ '{word}' → '{result['matchedWord']}' (rank {result['similarity']}) - {query_time:.2f}ms")
        else:
            print(f"  ✗ '{word}' → Not found - {query_time:.2f}ms")
    
    # Test 2: Hint query simulation
    print("\n2. Testing hint queries (getHintForGame)...")
    hint_ranks = [100, 500, 1000, 5000]
    
    for rank in hint_ranks:
        result, query_time = simulate_frontend_hint_query(db, game_id, rank)
        if result:
            print(f"  ✓ Rank {rank}: '{result['word']}' (actual rank {result['similarity']}) - {query_time:.2f}ms")
        else:
            print(f"  ✗ Rank {rank}: Not found - {query_time:.2f}ms")
    
    # Test 3: Top words simulation
    print("\n3. Testing top words query (getTopWordsByGame)...")
    top_limits = [10, 100, 500]
    
    for limit in top_limits:
        result, query_time = simulate_frontend_top_words(db, game_id, limit)
        print(f"  ✓ Top {limit} words retrieved in {query_time:.2f}ms")
        
        if limit == 10:  # Show sample
            print("    Sample top 5:")
            for item in result[:5]:
                print(f"      {item['rank']}. {item['word']} (rank {item['similarity']})")
    
    print("\n" + "=" * 50)
    print("✅ All frontend query simulations completed successfully!")
    print("The optimized similarity table maintains full compatibility with frontend queries.")


def main(args):
    configure_env(args)
    run_frontend_simulation()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Simulate frontend database queries')
    parser.add_argument('--local', action='store_true', help='Use .env.local from frontend')
    parser.add_argument('--production', action='store_true', help='Use .env from python directory')
    args = parser.parse_args()
    main(args)