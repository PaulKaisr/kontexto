import random

import fasttext as ft
import fasttext.util as ft_util

from src.database.repositories.word_repository import WordRepository


class WordService:
    """
    Service class to handle operations neccessary to retrieve the similarity and frequency of words.
    """

    def __init__(self, language="de", model="cc.de.300.bin") -> None:
        ft_util.download_model(language, if_exists="ignore")
        self.model = ft.load_model(model)
        self.word_repository = WordRepository()

    def get_all_words(self, include_freq: bool = False) -> list[str]:
        """
        Get all words from the model.
        """
        return self.model.get_words(include_freq=include_freq)

    def get_all_words_from_db(self, min_freq: int = 0) -> list[str]:
        """
        Get all words from the database.
        :return: List of words.
        """
        word_entities = self.word_repository.get_all_words(min_freq)
        return [word.word for word in word_entities]

    def get_solution_word(self, top_n: int = 500) -> str:
        """
        Get the solution word from the model.
        :param top_n: The number of top words to consider for the solution.
        :return: The solution word.
        """
        words = self.word_repository.get_solution_words(top_n=top_n)
        return random.choice(words).word if words else None
