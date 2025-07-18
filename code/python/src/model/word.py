from pydantic import BaseModel

class Word(BaseModel):
    """
    Represents a word with its associated properties.
    """
    word: str