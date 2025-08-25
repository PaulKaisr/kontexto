from src.database.database import Database
from src.database.entities.word import WordEntity


class WordRepository:
    def __init__(self, db: Database = None):
        self.db = db or Database()

    def insert_all(self, words: list[WordEntity]):
        """
        Insert a list of words into the database.
        :param words: List of Word objects to insert.
        """
        session = self.db.get_session()
        try:
            # Get existing words in bulk to avoid repeated queries
            existing_words = set()
            if words:
                word_texts = [word.word for word in words]
                existing_records = session.query(WordEntity.word).filter(WordEntity.word.in_(word_texts)).all()
                existing_words = {record[0] for record in existing_records}
            
            # Filter out existing words
            new_words = [word for word in words if word.word not in existing_words]
            skipped_count = len(words) - len(new_words)
            
            # Bulk insert new words
            if new_words:
                session.bulk_save_objects(new_words)
                session.commit()
                inserted_count = len(new_words)
            else:
                inserted_count = 0
            
            print(f"Inserted {inserted_count} words, skipped {skipped_count} duplicates.")
            
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
            session.query(WordEntity).delete()
            session.commit()
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    def get_all_words(self, min_freq: int | None = None) -> list[WordEntity]:
        """
        Get all words from the database.
        :return: List of WordEntity objects.
        """
        session = self.db.get_session()
        try:
            words = session.query(WordEntity).filter(WordEntity.occurrences >= min_freq).all()
            return words
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    def get_solution_words(self, top_n) -> list[WordEntity]:
        session = self.db.get_session()
        try:
            word = session.query(WordEntity).filter(
                (
                        (WordEntity.word_type == "NOUN")
                        & (WordEntity.case == "Nom")
                        & (WordEntity.number == "Sing")
                )
                | (
                        (WordEntity.word_type == "VERB")
                        & (WordEntity.tense == "Pres")
                        & (WordEntity.number == "Plur")
                )
                | (
                        (WordEntity.word_type.in_(["ADV", "ADJ"]))
                        & (WordEntity.degree == "Pos")
                        & (WordEntity.gender is None)
                )
            ).filter(
                # Filter out words that are not equal to their lemma
                WordEntity.lemma
                == WordEntity.word
            ).order_by(WordEntity.occurrences.desc()).limit(top_n).all()
            return word
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()
