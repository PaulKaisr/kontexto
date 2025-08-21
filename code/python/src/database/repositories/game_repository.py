from datetime import date, timedelta
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

    def get_latest_game(self) -> GameEntity | None:
        """
        Get the latest game by date.
        :return: The latest GameEntity or None if no games exist.
        """
        session = self.db.get_session()
        try:
            latest_game = session.query(GameEntity).order_by(GameEntity.date.desc()).first()
            return latest_game
        except Exception as e:
            raise e
        finally:
            session.close()

    def get_game_by_id(self, game_id: int) -> GameEntity | None:
        """
        Get a game by its ID.
        :param game_id: The ID of the game to retrieve.
        :return: The GameEntity or None if not found.
        """
        session = self.db.get_session()
        try:
            game = session.query(GameEntity).filter(GameEntity.game_id == game_id).first()
            return game
        except Exception as e:
            raise e
        finally:
            session.close()

    def delete_game_by_id(self, game_id: int) -> bool:
        """
        Delete a game by its ID.
        :param game_id: The ID of the game to delete.
        :return: True if the game was deleted, False if it didn't exist.
        """
        session = self.db.get_session()
        try:
            deleted_count = session.query(GameEntity).filter(GameEntity.game_id == game_id).delete()
            session.commit()
            return deleted_count > 0
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    def new_game_with_date(self, game_date: date) -> GameEntity:
        """
        Add a new game to the database with a specific date.
        :param game_date: The date for the new game.
        :return: A new GameEntity object.
        """
        game = GameEntity()
        game.date = game_date
        
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

    def new_game(self) -> GameEntity:
        """
        Add a new game to the database with a date that is one day after the last game.
        If no previous games exist, uses the current date.
        :return: A new GameEntity object.
        """
        # Get the latest game to determine the next date
        latest_game = self.get_latest_game()
        
        if latest_game:
            # Set date to last game's date + 1 day
            next_date = latest_game.date + timedelta(days=1)
        else:
            # No previous games, use current date
            next_date = date.today()
        
        game = GameEntity()
        game.date = next_date
        
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
