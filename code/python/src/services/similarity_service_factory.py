from src.services.interfaces.i_similarity_service import ISimilarityService
from src.services.similarity_service import SpacySimilarityService


class SimilarityServiceFactory:
    """
    Factory class for creating similarity service instances.
    """
    
    @staticmethod
    def create_similarity_service(service_type: str = "spacy", **kwargs) -> ISimilarityService:
        """
        Create a similarity service instance based on the specified type.
        
        :param service_type: Type of similarity service to create (default: "spacy")
        :param kwargs: Additional arguments to pass to the service constructor
        :return: Instance of ISimilarityService
        """
        if service_type.lower() == "spacy":
            return SpacySimilarityService(**kwargs)
        else:
            raise ValueError(f"Unknown similarity service type: {service_type}")
    
    @staticmethod
    def get_available_services() -> list[str]:
        """
        Get a list of available similarity service types.
        
        :return: List of available service type names
        """
        return ["spacy"]