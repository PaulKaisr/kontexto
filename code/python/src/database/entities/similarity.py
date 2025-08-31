"""
DB model for the word similarity table.
"""
from sqlalchemy import Column, ForeignKey, Integer, String

from src.database.entities.base import TableBase
from src.database.entities.game import GameEntity


class SimilarityEntity(TableBase.BASE):
    """
    DB model for the similarity table.
    Optimized with composite primary key (game_id, word) for better query performance.
    """

    __tablename__ = "similarity"
    game_id = Column("game_id", Integer, ForeignKey(GameEntity.game_id), primary_key=True)
    word = Column("word", String, primary_key=True)
    similarity_rank = Column("similarity", Integer)
