from typing import Dict
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

    def analyze_prop_words(self) -> Dict[str, int]:
        """
        Analyze PROP word distribution in database to understand filtering impact.
        
        Returns:
            Dictionary with statistics about PROP words by frequency ranges
        """
        session = self.db.get_session()
        try:
            prop_words = session.query(WordEntity).filter(WordEntity.word_type == "PROP").all()
            
            stats = {
                'total_prop': len(prop_words),
                'high_freq_100k_plus': len([w for w in prop_words if w.occurrences >= 100000]),
                'medium_freq_50k_100k': len([w for w in prop_words if 50000 <= w.occurrences < 100000]),
                'low_freq_20k_50k': len([w for w in prop_words if 20000 <= w.occurrences < 50000]),
                'very_low_freq_under_20k': len([w for w in prop_words if w.occurrences < 20000])
            }
            
            # Add some example words for each category for debugging
            if prop_words:
                high_freq_examples = [w.word for w in prop_words if w.occurrences >= 100000][:5]
                medium_freq_examples = [w.word for w in prop_words if 50000 <= w.occurrences < 100000][:5]
                low_freq_examples = [w.word for w in prop_words if 20000 <= w.occurrences < 50000][:5]
                
                stats['high_freq_examples'] = high_freq_examples
                stats['medium_freq_examples'] = medium_freq_examples
                stats['low_freq_examples'] = low_freq_examples
            
            return stats
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()
