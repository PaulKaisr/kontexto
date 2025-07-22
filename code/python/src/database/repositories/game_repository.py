from src.database.database import Database
from src.database.entities.game import GameEntity


class GameRepository:
    def __init__(self, db: Database = None):
        self.db = db or Database()

    def delete_all(self):
        """
        Delete all games from the database.
        """
        session = self.db.get_session()
        try:
            session.query(GameEntity).delete()
            session.commit()
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    def new_game(self) -> GameEntity:
        """
        Add a new game to the database.
        :return: A new GameEntity object.
        """
        game = GameEntity()
        session = self.db.get_session()
        try:
            session.add(game)
            session.commit()
            session.refresh(game)
            return game
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()
