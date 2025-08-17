import torch
from transformers import AutoTokenizer, AutoModel
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

from src.database.repositories.similarity_repository import SimilarityRepository
from src.services.interfaces.i_similarity_service import ISimilarityService


class TransformerSimilarityService(ISimilarityService):
    def __init__(self, reference: str = None, model="bert-base-german-cased"):
        """
        Service class to handle operations related to word similarities using BERT transformers.
        
        :param reference: Reference word for similarity calculations
        :param model: BERT model name (default: bert-base-german-cased)
        """
        self.similarity_repository = SimilarityRepository()
        self._model_name = model
        self._tokenizer = AutoTokenizer.from_pretrained(model)
        self._model = AutoModel.from_pretrained(model)
        self._model.eval()  # Set to evaluation mode
        
        self._reference = reference
        self._reference_embedding = None
        
        if reference:
            self._reference_embedding = self._get_word_embedding(reference)

    def _get_word_embedding(self, word: str) -> np.ndarray:
        """
        Get the embedding for a single word using BERT.
        
        :param word: Word to get embedding for
        :return: Word embedding as numpy array
        """
        # Tokenize the word
        inputs = self._tokenizer(word, return_tensors="pt", padding=True, truncation=True)
        
        # Get embeddings without gradient computation
        with torch.no_grad():
            outputs = self._model(**inputs)
            # Use the [CLS] token embedding (first token) as word representation
            embeddings = outputs.last_hidden_state[:, 0, :].squeeze()
        
        return embeddings.numpy()

    def _get_batch_embeddings(self, words: list[str]) -> np.ndarray:
        """
        Get embeddings for multiple words efficiently using batch processing.
        
        :param words: List of words to get embeddings for
        :return: Array of word embeddings
        """
        # Tokenize all words in batch
        inputs = self._tokenizer(words, return_tensors="pt", padding=True, truncation=True)
        
        # Get embeddings without gradient computation
        with torch.no_grad():
            outputs = self._model(**inputs)
            # Use the [CLS] token embedding for each word
            embeddings = outputs.last_hidden_state[:, 0, :]
        
        return embeddings.numpy()

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
        self._reference_embedding = self._get_word_embedding(reference)

    def get_similarity(self, word: str) -> float:
        """
        Calculate similarity between a word and the reference word.
        
        :param word: Word to compare to reference
        :return: The similarity score between the words (cosine similarity)
        """
        if self._reference_embedding is None:
            raise ValueError("Reference word not set.")
        
        word_embedding = self._get_word_embedding(word)
        
        # Calculate cosine similarity
        similarity = cosine_similarity(
            [self._reference_embedding], 
            [word_embedding]
        )[0][0]
        
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
        
        # Get embeddings for all words in batch
        word_embeddings = self._get_batch_embeddings(words)
        
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