"""
Script to fill words table initially.
"""
import progressbar
from dotenv import load_dotenv

from src.database.entities.word import WordEntity
from src.database.repositories.word_repository import WordRepository
from src.services.language import LanguageService
from src.services.word_service import WordService

MIN_FREQ = 10000


def main():
    """
    Fill words table with words from word service
    """
    print("Filling words table with words from word service...")
    load_dotenv()
    word_service = WordService()
    words, freqs = word_service.get_all_words(include_freq=True)

    word_orms: list[WordEntity] = []
    for word, freq in zip(words, freqs):
        word_orms.append(WordEntity(word=word, occurrences=freq))

    # Filter words by minimum frequency
    min_freq = MIN_FREQ
    word_orms = [word_orm for word_orm in word_orms if word_orm.occurrences > min_freq]
    print(f"{len(word_orms)} passed frequency test.")

    # Filter words by minimum word length
    min_word_length = 3
    word_orms = [
        word_orm for word_orm in word_orms if len(word_orm.word) >= min_word_length
    ]
    print(f"{len(word_orms)} passed min-character test.")

    # Filter words by valid characters
    valid_characters = set("abcdefghijklmnopqrstuvwxyzäöüß")
    valid_first_characters = set(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜabcdefghijklmnopqrstuvwxyzäöüß"
    )
    word_orms = [
        word_orm
        for word_orm in word_orms
        if set(word_orm.word[1:]).issubset(valid_characters)
           and word_orm.word[0] in valid_first_characters
    ]
    print(f"{len(word_orms)} passed validity test.")

    # Filter out profane or unfitting words
    word_orms = filter_profane_or_unfitting(word_orms)

    # Filter words by lemma duplicates
    language_service = LanguageService()
    unique_words_orms: list[WordEntity] = []
    p_bar = progressbar.ProgressBar(max_value=len(word_orms))
    for i, word_orm in enumerate(word_orms):
        word = word_orm.word
        if (
                word is not None
                and set(word[1:]).issubset(valid_characters)
                and word[0] in valid_first_characters
        ):
            nlp_object = language_service.get_nlp_object(word)
            if word == nlp_object.lemma_:
                unique_words_orms.append(
                    WordEntity(
                        word=word,
                        lemma=nlp_object.lemma_,
                        occurrences=int(word_orm.occurrences),
                        word_type=nlp_object.pos_,
                        number=nlp_object.morph.to_dict().get("Number", None),
                        case=nlp_object.morph.to_dict().get("Case", None),
                        gender=nlp_object.morph.to_dict().get("Gender", None),
                        degree=nlp_object.morph.to_dict().get("Degree", None),
                        tense=nlp_object.morph.to_dict().get("Tense", None),
                        verb_form=nlp_object.morph.to_dict().get("VerbForm", None),
                        mood=nlp_object.morph.to_dict().get("Mood", None),
                        person=nlp_object.morph.to_dict().get("Person", None),
                        is_stop=nlp_object.is_stop,
                        is_punct=nlp_object.is_punct,
                    )
                )
        p_bar.update(i + 1)
    p_bar.finish()
    print(f"{len(unique_words_orms)} unique lemmas before deduplication.")

    # Save to database
    word_repo = WordRepository()
    word_repo.insert_all(unique_words_orms)


def filter_profane_or_unfitting(words: list[WordEntity]) -> list[WordEntity]:
    """
    Filter out profane words from the list.
    :param words: List of WordEntity objects.
    :return: Filtered list of WordEntity objects.
    """
    with open(
            "../..data/unfittingwords_de.txt",
            "r",
    ) as f:
        profane_words = f.read().splitlines()

    profane_words = set(profane_words)
    filtered_words = [
        word for word in words if word.word not in profane_words and word.lemma not in profane_words
    ]
    print(f"Filtered {len(words) - len(filtered_words)} profane or unfitting words.")
    return filtered_words


if __name__ == "__main__":
    main()
