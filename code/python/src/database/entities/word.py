from sqlalchemy import Boolean, Column, Integer, String

from src.database.entities.base import TableBase


class Word(TableBase.BASE):
    __tablename__ = "words"
    word_id = Column("word_id", Integer, primary_key=True, autoincrement=True)
    word = Column("word", String, unique=True)
    lemma = Column("lemma", String, unique=False, nullable=True)
    occurrences = Column("occurrences", Integer)
    word_type = Column("word_type", String, nullable=True)
    # Sing or Plur
    number = Column("number", String, nullable=True)
    # Nom, Gen, Dat, Akk
    case = Column("case", String, nullable=True)
    # Masc, Fem, Neut
    gender = Column("gender", String, nullable=True)
    # Degree of comparison
    degree = Column("degree", String, nullable=True)
    # is stop word
    is_stop = Column("is_stop", Boolean, nullable=True)
    # is punctuation
    is_punct = Column("is_punct", Boolean, nullable=True)
    # tense (for verbs)
    tense = Column("tense", String, nullable=True)
    # verb form
    verb_form = Column("verb_form", String, nullable=True)
    # mood
    mood = Column("mood", String, nullable=True)
    # Person (for verbs)
    person = Column("person", String, nullable=True)