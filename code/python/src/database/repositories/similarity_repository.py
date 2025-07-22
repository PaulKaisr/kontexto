from src.database.database import Database
from src.database.entities.similarity import SimilarityEntity


class SimilarityRepository:
    def __init__(self, db: Database = None):
        self.db = db or Database()

    def delete_all(self):
        """
        Delete all similarities from the database.
        """
        session = self.db.get_session()
        try:
            session.query(SimilarityEntity).delete()
            session.commit()
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    def insert_all(self, similarities: list[SimilarityEntity]):
        """
        Insert a list of similarities into the database.
        :param similarities: List of SimilarityEntity objects to insert.
        """
        session = self.db.get_session()
        try:
            session.add_all(similarities)
            session.commit()
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()
