import random
from collections import OrderedDict

import progressbar
from dotenv import load_dotenv

from src.database.entities.similarity import SimilarityEntity
from src.services.game_service import GameService
from src.services.similarity_service import SimilarityService
from src.services.word_service import WordService


def get_solution_word_from_file(file_path: str) -> str:
    """
    Get the solution word from a file.
    :param file_path: The path to the file containing a bunch of words, each in a new line.
    :return: The random solution word.
    """
    with open(file_path, "r", encoding="utf-8") as file:
        words = file.read().splitlines()
    return random.choice(words) if words else None


def main():
    """
    Fill similarity table with words from word service
    """
    game_service = GameService()
    similarity_service = SimilarityService()
    word_service = WordService()

    # Delete all games and similarities from the database
    similarity_service.delete_all_entries()
    game_service.delete_all_games()

    # Create a new game
    game = game_service.new_game()
    solution = get_solution_word_from_file("../../data/solutions_de.txt")
    print(f"New game created with ID: {game.game_id} and solution word: {solution}")

    similarity_service.set_reference(solution)
    words = word_service.get_all_words_from_db()
    scores: dict[str, float] = {}
    p_bar = progressbar.ProgressBar(max_value=len(words))
    for i, word in enumerate(words):
        scores[word] = similarity_service.get_similarity(word)
        p_bar.update(i + 1)
    p_bar.finish()

    # Sort similarities by similarity value
    sorted_scores: OrderedDict = OrderedDict(
        sorted(
            scores.items(),
            key=lambda key_value_pair: key_value_pair[1],
            reverse=True,
        )
    )

    similarity_orms: list[SimilarityEntity] = []
    for rank, word in enumerate(sorted_scores):
        similarity = SimilarityEntity(game_id=game.game_id, word=word, similarity_rank=rank)
        similarity_orms.append(similarity)

    similarity_service.add_similarities(similarity_orms)


if __name__ == "__main__":
    load_dotenv()
    main()
