"""
DB model for the word similarity table.
"""
from sqlalchemy import Column, Date, Integer

from src.database.entities.base import TableBase


class GameEntity(TableBase.BASE):
    """
    DB model for the similarity table.
    """

    __tablename__ = "game"
    game_id = Column("game_id", Integer, primary_key=True, autoincrement=True)
    date = Column("date", Date)
