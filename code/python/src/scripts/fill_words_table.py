"""Script to fill words table initially."""
from pathlib import Path
import argparse
import progressbar
from dotenv import load_dotenv

from src.database.entities.word import WordEntity
from src.database.repositories.word_repository import WordRepository
from src.services.language import LanguageService
from src.services.word_service import WordService
from src.database.database_config import DatabaseConfig

MIN_FREQ = 20000

# Derive important project paths regardless of CWD
SCRIPTS_DIR = Path(__file__).resolve().parent                      # .../code/python/src/scripts
SRC_DIR = SCRIPTS_DIR.parent                                       # .../code/python/src
PYTHON_DIR = SRC_DIR.parent                                        # .../code/python
CODE_DIR = PYTHON_DIR.parent                                       # .../code
PROJECT_ROOT = CODE_DIR.parent                                     # .../kontexto
DATA_DIR = PYTHON_DIR / "data"                                    # .../code/python/data
FRONTEND_DIR = CODE_DIR / "frontend"                              # .../code/frontend


def configure_env(args):
    """Select environment file using flags or auto-detect in frontend dir."""
    if args.local and args.production:
        raise SystemExit("Cannot specify both --local and --production")

    candidate = None
    if args.local:
        candidate = FRONTEND_DIR / ".env.local"
    elif args.production:
        candidate = FRONTEND_DIR / ".env"
    else:  # auto-detect preference
        if (FRONTEND_DIR / ".env.local").exists():
            candidate = FRONTEND_DIR / ".env.local"
        elif (FRONTEND_DIR / ".env").exists():
            candidate = FRONTEND_DIR / ".env"

    if not candidate or not candidate.exists():
        raise SystemExit("No suitable environment file found (.env.local / .env) in frontend directory")

    DatabaseConfig.set_environment(str(candidate))
    load_dotenv(str(candidate), override=True)
    print(f"Loaded environment: {candidate}")


def main(args):
    configure_env(args)
    print("Filling words table with words from word service...")
    word_service = WordService()
    words, freqs = word_service.get_all_words(include_freq=True)

    word_orms: list[WordEntity] = [WordEntity(word=w, occurrences=f) for w, f in zip(words, freqs)]

    # Frequency filter
    word_orms = [w for w in word_orms if w.occurrences > MIN_FREQ]
    print(f"{len(word_orms)} passed frequency test.")

    # Length filter
    word_orms = [w for w in word_orms if len(w.word) >= 3]
    print(f"{len(word_orms)} passed min-character test.")

    # Validity filter
    valid_chars = set("abcdefghijklmnopqrstuvwxyzäöüß")
    valid_first = set("ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜabcdefghijklmnopqrstuvwxyzäöüß")
    word_orms = [w for w in word_orms if set(w.word[1:]).issubset(valid_chars) and w.word[0] in valid_first]
    print(f"{len(word_orms)} passed validity test.")

    # Profane/unfitting filter
    word_orms = filter_profane_or_unfitting(word_orms)
    print(f"{len(word_orms)} passed unfitting filter.")

    # Lemma uniqueness
    language_service = LanguageService()
    unique_words_orms: list[WordEntity] = []
    p_bar = progressbar.ProgressBar(max_value=len(word_orms))
    for i, w in enumerate(word_orms):
        word = w.word
        if word and set(word[1:]).issubset(valid_chars) and word[0] in valid_first:
            nlp_obj = language_service.get_nlp_object(word)
            if word == nlp_obj.lemma_:
                unique_words_orms.append(
                    WordEntity(
                        word=word,
                        lemma=nlp_obj.lemma_,
                        occurrences=int(w.occurrences),
                        word_type=nlp_obj.pos_,
                        number=nlp_obj.morph.to_dict().get("Number"),
                        case=nlp_obj.morph.to_dict().get("Case"),
                        gender=nlp_obj.morph.to_dict().get("Gender"),
                        degree=nlp_obj.morph.to_dict().get("Degree"),
                        tense=nlp_obj.morph.to_dict().get("Tense"),
                        verb_form=nlp_obj.morph.to_dict().get("VerbForm"),
                        mood=nlp_obj.morph.to_dict().get("Mood"),
                        person=nlp_obj.morph.to_dict().get("Person"),
                        is_stop=nlp_obj.is_stop,
                        is_punct=nlp_obj.is_punct,
                    )
                )
        if i % 1000 == 0:
            p_bar.update(i + 1)
    p_bar.finish()
    print(f"{len(unique_words_orms)} unique lemmas.")

    # Attribute-based filter
    unique_words_orms = [w for w in unique_words_orms if w.word_type not in (None, "X")]
    print(f"{len(unique_words_orms)} passed additional filter based on attributes test.")

    # Word-type-specific frequency filtering
    original_count_freq = len(unique_words_orms)
    unique_words_orms = apply_word_type_frequency_filter(unique_words_orms)
    freq_excluded_count = original_count_freq - len(unique_words_orms)
    print(f"{len(unique_words_orms)} passed word-type-specific frequency filtering (removed {freq_excluded_count} words).")

    # Remove duplicates by word (shouldn't happen but let's be safe)
    seen_words = set()
    deduped_words = []
    for word_orm in unique_words_orms:
        if word_orm.word not in seen_words:
            seen_words.add(word_orm.word)
            deduped_words.append(word_orm)
    
    if len(deduped_words) != len(unique_words_orms):
        print(f"Removed {len(unique_words_orms) - len(deduped_words)} duplicate words from processing pipeline.")
        unique_words_orms = deduped_words

    # Persist in chunks with progress bar
    CHUNK_SIZE = 1000
    total_words = len(unique_words_orms)
    print(f"Inserting {total_words} words into the database in chunks of {CHUNK_SIZE}...")
    repo = WordRepository()
    insert_pbar = progressbar.ProgressBar(max_value=total_words)
    for i in range(0, total_words, CHUNK_SIZE):
        chunk = unique_words_orms[i:i+CHUNK_SIZE]
        repo.insert_all(chunk)
        insert_pbar.update(min(i + CHUNK_SIZE, total_words))
    insert_pbar.finish()
    print("Insertion complete.")


def filter_profane_or_unfitting(words: list[WordEntity]) -> list[WordEntity]:
    unfitting_file = DATA_DIR / "unfittingwords_de.txt"
    with open(unfitting_file, "r", encoding="utf-8") as f:
        profane = set(f.read().splitlines())
    filtered = [w for w in words if w.word not in profane]
    print(f"Filtered {len(words) - len(filtered)} profane or unfitting words.")
    return filtered


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fill words table")
    parser.add_argument("--local", action="store_true", help="Use .env.local from frontend")
    parser.add_argument("--production", action="store_true", help="Use .env from frontend")
    main(parser.parse_args())
