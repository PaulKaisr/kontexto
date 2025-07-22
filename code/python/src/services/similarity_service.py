import spacy

from src.database.repositories.similarity_repository import SimilarityRepository


class SimilarityService:
    def __init__(self, reference: str = None, model="de_core_news_lg"):
        """
        Service class to handle operations related to word similarities.
        :param reference:
        """
        self.similarity_repository = SimilarityRepository()
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
        self._reference = self._nlp(reference) if reference else None

    def delete_all_entries(self):
        """
        Delete all games from the database.
        """
        self.similarity_repository.delete_all()

    def set_reference(self, reference: str) -> None:
        """
        Set the reference string for similarity calculation.
        """
        self._reference = self._nlp(reference)

    def get_similarity(self, word: str) -> float:
        """
        Calculate similarity using the language model and cos similarity scoring.
        :param word: Word to compare to reference
        :return: The similarity between these words using cos similarity scoring
        """
        word_nlp = self._nlp(word)
        return word_nlp.similarity(self._reference)

    def add_similarities(self, similarity_orms):
        """
        Add a list of similarities to the database.
        :param similarity_orms: List of SimilarityEntity objects to insert.
        """
        self.similarity_repository.insert_all(similarity_orms)
