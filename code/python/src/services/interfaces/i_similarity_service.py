from abc import ABC, abstractmethod


class ISimilarityService(ABC):
    """
    Interface for similarity services that can calculate word similarities.
    """

    @abstractmethod
    def delete_all_entries(self) -> None:
        """
        Delete all similarity entries from the database.
        """
        pass

    @abstractmethod
    def set_reference(self, reference: str) -> None:
        """
        Set the reference string for similarity calculation.
        
        :param reference: The reference word to compare against
        """
        pass

    @abstractmethod
    def get_similarity(self, word: str) -> float:
        """
        Calculate similarity between a word and the reference word.
        
        :param word: Word to compare to reference
        :return: The similarity score between the words
        """
        pass

    @abstractmethod
    def add_similarities(self, similarity_orms) -> None:
        """
        Add a list of similarities to the database.
        
        :param similarity_orms: List of SimilarityEntity objects to insert
        """
        pass

    @abstractmethod
    def get_similarities(self, words: list[str]) -> dict[str, float]:
        """
        Calculate similarities for a list of words using batch processing.
        
        :param words: List of words to compare to reference
        :return: Dictionary mapping word to similarity score
        """
        pass