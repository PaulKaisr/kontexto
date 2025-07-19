import fasttext as ft
import fasttext.util as ft_util


class WordsService:
    """
    Service class to handle operations neccessary to retrieve the similarity and frequency of words.
    """

    def __init__(self, language="de", model="cc.de.300.bin") -> None:
        ft_util.download_model(language, if_exists="ignore")
        self.model = ft.load_model(model)

    def get_all_words(self, include_freq: bool = False):
        """
        Get all words from the model.
        """
        return self.model.get_words(include_freq=include_freq)
