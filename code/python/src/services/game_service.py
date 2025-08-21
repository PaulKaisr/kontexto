from datetime import date
from src.database.entities.game import GameEntity
from src.database.repositories.game_repository import GameRepository


class GameService:
    def __init__(self):
        self.game_repository = GameRepository()

    def delete_all_games(self):
        """
        Delete all games from the database.
        """
        self.game_repository.delete_all()

    def get_game_by_id(self, game_id: int) -> GameEntity | None:
        """
        Get a game by its ID.
        :param game_id: The ID of the game to retrieve.
        :return: The GameEntity or None if not found.
        """
        return self.game_repository.get_game_by_id(game_id)

    def delete_game_by_id(self, game_id: int) -> bool:
        """
        Delete a game by its ID.
        :param game_id: The ID of the game to delete.
        :return: True if the game was deleted, False if it didn't exist.
        """
        return self.game_repository.delete_game_by_id(game_id)

    def new_game_with_date(self, game_date: date) -> GameEntity:
        """
        Add a new game to the database with a specific date.
        :param game_date: The date for the new game.
        :return: A new GameEntity object.
        """
        return self.game_repository.new_game_with_date(game_date)

    def new_game(self) -> GameEntity:
        """
        Add a new game to the database.
        """
        return self.game_repository.new_game()
