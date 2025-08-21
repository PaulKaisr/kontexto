import spacy

from src.database.repositories.similarity_repository import SimilarityRepository
from src.services.interfaces.i_similarity_service import ISimilarityService


class SpacySimilarityService(ISimilarityService):
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

    def delete_similarities_by_game_id(self, game_id: int) -> None:
        """
        Delete all similarity entries for a specific game from the database.
        
        :param game_id: The ID of the game whose similarities should be deleted
        """
        self.similarity_repository.delete_by_game_id(game_id)

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

    def get_similarities(self, words: list[str]) -> dict[str, float]:
        """
        Calculate similarities for a list of words using batch processing.
        :param words: List of words to compare to reference
        :return: Dictionary mapping word to similarity score
        """
        if self._reference is None:
            raise ValueError("Reference word not set.")
        docs = list(self._nlp.pipe(words))
        ref_vector = self._reference.vector
        similarities = {}
        for word, doc in zip(words, docs):
            # Use cosine similarity between vectors
            if doc.vector_norm and ref_vector.any():
                sim = doc.similarity(self._reference)
            else:
                sim = 0.0
            similarities[word] = sim
        return similarities
