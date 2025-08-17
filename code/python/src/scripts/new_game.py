import argparse
import random
from collections import OrderedDict
from pathlib import Path
from dotenv import load_dotenv

from src.database.database_config import DatabaseConfig
from src.database.entities.similarity import SimilarityEntity
from src.services.game_service import GameService
from src.services.similarity_service import SimilarityService
from src.services.word_service import WordService

MIN_FREQ = 20000

# Path derivations (independent of CWD)
SCRIPTS_DIR = Path(__file__).resolve().parent
SRC_DIR = SCRIPTS_DIR.parent
PYTHON_DIR = SRC_DIR.parent
CODE_DIR = PYTHON_DIR.parent
DATA_DIR = PYTHON_DIR / "data"
FRONTEND_DIR = CODE_DIR / "frontend"
SOLUTIONS_FILE = DATA_DIR / "solutions_de.txt"


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


def get_solution_word_from_file(file_path: Path) -> str | None:
    if not file_path.exists():
        print(f"Solution file not found: {file_path}")
        return None
    with open(file_path, "r", encoding="utf-8") as file:
        words = [w for w in (line.strip() for line in file) if w]
    return random.choice(words) if words else None


def main(args):
    configure_env(args)
    game_service = GameService()
    similarity_service = SimilarityService()
    word_service = WordService()

    # Reset tables relevant for new game (only if --reset flag is provided)
    if args.reset:
        print("Resetting previous games and similarities...")
        similarity_service.delete_all_entries()
        game_service.delete_all_games()
        print("Reset completed.")

    # Create the specified number of games
    num_games = args.number
    print(f"Creating {num_games} game(s)...")
    
    for i in range(num_games):
        print(f"\nCreating game {i + 1}/{num_games}:")
        
        # Create a new game & choose solution
        game = game_service.new_game()
        solution = get_solution_word_from_file(SOLUTIONS_FILE)
        if not solution:
            raise SystemExit("No solution word could be selected.")
        print(f"New game created with ID: {game.game_id}, Date: {game.date}, Solution: {solution}")

        # Prepare similarity reference & compute scores
        similarity_service.set_reference(solution)
        words = word_service.get_all_words_from_db(min_freq=MIN_FREQ)
        scores = similarity_service.get_similarities(words)
        print(f"Calculated similarities for {len(words)} words.")

        # Sort by similarity descending
        sorted_scores: OrderedDict[str, float] = OrderedDict(
            sorted(scores.items(), key=lambda kv: kv[1], reverse=True)
        )

        similarity_orms: list[SimilarityEntity] = []
        for rank, word in enumerate(sorted_scores, start=1):
            similarity_orms.append(
                SimilarityEntity(game_id=game.game_id, word=word, similarity_rank=rank)
            )

        similarity_service.add_similarities(similarity_orms)
        print(f"Inserted {len(similarity_orms)} similarity rows.")
    
    print(f"\nCompleted creating {num_games} game(s).")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Create a new game with similarity calculations')
    parser.add_argument('--local', action='store_true', help='Use .env.local from frontend')
    parser.add_argument('--production', action='store_true', help='Use .env from frontend')
    parser.add_argument('--reset', action='store_true', help='Reset all previous games and similarities before creating new game')
    parser.add_argument('-n', '--number', type=int, default=1, help='Number of games to create (default: 1)')
    args = parser.parse_args()
    main(args)
