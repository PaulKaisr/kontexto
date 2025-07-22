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

    def new_game(self) -> GameEntity:
        """
        Add a new game to the database.
        """
        return self.game_repository.new_game()
