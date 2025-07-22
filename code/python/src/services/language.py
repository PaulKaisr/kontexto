import spacy


class LanguageService:
    """
    Service class for lemmatization.
    """

    def __init__(self, model="de_core_news_lg") -> None:
        self._nlp = spacy.load(
            model,
            disable=[
                "tagger",
                "ner",
                "parser",
                "attribute_ruler",
                "senter",
            ],
        )

    def get_nlp_object(self, word):
        """
        Return the nlp object for the given word.
        :param word: The word to get the nlp object for
        """
        return self._nlp(word)[0]
