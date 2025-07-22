from dotenv import load_dotenv

from src.database.database import Database
from src.database.entities.base import TableBase
from src.database.entities.game import GameEntity  # noqa: F401
from src.database.entities.similarity import SimilarityEntity  # noqa: F401
from src.database.entities.word import WordEntity  # noqa: F401


def init_db(db: Database = None):
    db = db or Database()
    engine = db.get_engine()
    TableBase.BASE.metadata.create_all(engine)


def main():
    print("Initializing tables...")
    load_dotenv()
    init_db()


if __name__ == "__main__":
    main()
