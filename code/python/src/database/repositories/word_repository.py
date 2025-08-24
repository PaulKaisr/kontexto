from src.database.database import Database
from src.database.entities.word import WordEntity


class WordRepository:
    def __init__(self, db: Database = None):
        self.db = db or Database()

    def insert_all(self, words: list[WordEntity]):
        """
        Insert a list of words into the database, ignoring duplicates.
        :param words: List of Word objects to insert.
        """
        session = self.db.get_session()
        try:
            # Insert words one by one to handle duplicates gracefully
            inserted_count = 0
            skipped_count = 0
            
            for word in words:
                try:
                    # Check if word already exists
                    existing = session.query(WordEntity).filter(WordEntity.word == word.word).first()
                    if existing is None:
                        session.add(word)
                        session.flush()  # Flush to catch any constraint violations
                        inserted_count += 1
                    else:
                        skipped_count += 1
                except Exception:
                    # If there's a constraint violation, skip this word
                    session.rollback()
                    skipped_count += 1
                    continue
            
            session.commit()
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
