from src.database.database import Database
from src.database.entities.word import Word


class WordRepository:
    def __init__(self, db: Database = None):
        self.db = db or Database()

    def insert_all(self, words: list[Word]):
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

    def delete_all(self):
        """
        Delete all words from the database.
        """
        session = self.db.get_session()
        try:
            session.query(Word).delete()
            session.commit()
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()
