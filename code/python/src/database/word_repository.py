
from database import Database
from src.database.entities.word import Word


class WordRepository:
    def __init__(self, db: Database = None):
        self.db = db or Database()

    def insert_all(self, words: Word):
        """
        Insert a list of words into the database.
        :param words: List of Word objects to insert.
        """
        session = self.db.get_session()
        try:
            session.add_all(words)
            session.commit()
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()