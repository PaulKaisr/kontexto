"""
DB model for the word similarity table.
"""
from sqlalchemy import Column, ForeignKey, Integer, String

from src.database.entities.base import TableBase
from src.database.entities.game import GameEntity


class SimilarityEntity(TableBase.BASE):
    """
    DB model for the similarity table.
    """

    __tablename__ = "similarity"
    similarity_id = Column(
        "similarity_id", Integer, primary_key=True, autoincrement=True
    )
    game_id = Column("game_id", Integer, ForeignKey(GameEntity.game_id))
    word = Column("word", String)
    similarity_rank = Column("similarity", Integer)
