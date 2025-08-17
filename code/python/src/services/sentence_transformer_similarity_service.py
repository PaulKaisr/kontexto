from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from src.database.repositories.similarity_repository import SimilarityRepository
from src.services.interfaces.i_similarity_service import ISimilarityService


class SentenceTransformerSimilarityService(ISimilarityService):
    def __init__(self, reference: str = None, model="paraphrase-multilingual-MiniLM-L12-v2"):
        """
        Service class to handle operations related to word similarities using sentence transformers.
        
        :param reference: Reference word for similarity calculations
        :param model: SentenceTransformer model name (default: multilingual MiniLM)
        """
        self.similarity_repository = SimilarityRepository()
        self._model = SentenceTransformer(model)
        self._reference = reference
        self._reference_embedding = None
        
        if reference:
            self._reference_embedding = self._model.encode([reference])[0]

    def delete_all_entries(self) -> None:
        """
        Delete all similarity entries from the database.
        """
        self.similarity_repository.delete_all()

    def set_reference(self, reference: str) -> None:
        """
        Set the reference string for similarity calculation.
        
        :param reference: The reference word to compare against
        """
        self._reference = reference
        self._reference_embedding = self._model.encode([reference])[0]

    def get_similarity(self, word: str) -> float:
        """
        Calculate similarity between a word and the reference word.
        
        :param word: Word to compare to reference
        :return: The similarity score between the words (cosine similarity)
        """
        if self._reference_embedding is None:
            raise ValueError("Reference word not set.")
        
        word_embedding = self._model.encode([word])[0]
        similarity = self._model.similarity(self._reference_embedding, word_embedding)

        return float(similarity)

    def add_similarities(self, similarity_orms) -> None:
        """
        Add a list of similarities to the database.
        
        :param similarity_orms: List of SimilarityEntity objects to insert
        """
        self.similarity_repository.insert_all(similarity_orms)

    def get_similarities(self, words: list[str]) -> dict[str, float]:
        """
        Calculate similarities for a list of words using batch processing.
        
        :param words: List of words to compare to reference
        :return: Dictionary mapping word to similarity score
        """
        if self._reference_embedding is None:
            raise ValueError("Reference word not set.")
        
        # Encode all words in batch for efficiency
        word_embeddings = self._model.encode(words)
        
        # Calculate cosine similarities in batch
        similarities_matrix = cosine_similarity(
            [self._reference_embedding], 
            word_embeddings
        )[0]
        
        # Create dictionary mapping words to their similarity scores
        similarities = {}
        for word, similarity in zip(words, similarities_matrix):
            similarities[word] = float(similarity)
        
        return similarities