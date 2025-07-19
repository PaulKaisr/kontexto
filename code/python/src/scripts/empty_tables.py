from dotenv import load_dotenv

from src.database.word_repository import WordRepository


def empty_word_table():
    load_dotenv()
    word_repo = WordRepository()
    word_repo.delete_all()


if __name__ == "__main__":
    empty_word_table()
