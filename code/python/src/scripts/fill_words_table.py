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

# Frequency thresholds based on word type analysis
# Analysis showed that German surnames heavily cluster in the 20k-100k range for PROPN words
# while legitimate nouns, verbs, adjectives are valuable even at lower frequencies
MIN_FREQ_GENERAL = 5000    # Lower threshold for non-PROPN words (nouns, verbs, adjectives, etc.)
MIN_FREQ_PROPN = 5000     # Higher threshold for PROPN words to filter out most surnames

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
    
    # Reset table if requested
    if args.reset:
        print("Resetting words table (clearing all existing words)...")
        word_repo = WordRepository()
        word_repo.delete_all()
        print("Words table cleared.")
    
    print("Filling words table with words from word service...")
    word_service = WordService()
    words, freqs = word_service.get_all_words(include_freq=True)

    word_orms: list[WordEntity] = [WordEntity(word=w, occurrences=f) for w, f in zip(words, freqs)]

    # Initial frequency filter (apply general minimum to reduce processing load)
    word_orms = [w for w in word_orms if w.occurrences > MIN_FREQ_GENERAL]
    print(f"{len(word_orms)} passed initial frequency test (>{MIN_FREQ_GENERAL}).")

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

    # Lemma uniqueness (case-insensitive for German nouns)
    language_service = LanguageService()
    unique_words_orms: list[WordEntity] = []
    p_bar = progressbar.ProgressBar(max_value=len(word_orms))
    for i, w in enumerate(word_orms):
        word = w.word
        if word and set(word[1:]).issubset(valid_chars) and word[0] in valid_first:
            nlp_obj = language_service.get_nlp_object(word)
            
            # Check if word equals lemma (case-insensitive comparison for better German support)
            is_lemma_match = (word == nlp_obj.lemma_ or 
                            word.lower() == nlp_obj.lemma_.lower())
            
            if is_lemma_match:
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

    # Persist
    WordRepository().insert_all(unique_words_orms)
    print("Insertion complete.")


def apply_word_type_frequency_filter(words: list[WordEntity]) -> list[WordEntity]:
    """
    Apply different frequency thresholds based on word type.
    PROPN words need higher frequency to avoid surname contamination.
    Other word types can have lower frequency requirements.
    """
    filtered_words = []
    stats = {"PROPN": 0, "other": 0, "PROPN_excluded": 0, "other_excluded": 0}
    
    for word in words:
        if word.word_type == "PROPN":
            stats["PROPN"] += 1
            if word.occurrences >= MIN_FREQ_PROPN:
                filtered_words.append(word)
            else:
                stats["PROPN_excluded"] += 1
        else:
            stats["other"] += 1
            if word.occurrences >= MIN_FREQ_GENERAL:
                filtered_words.append(word)
            else:
                stats["other_excluded"] += 1
    
    print(f"  PROPN words: {stats['PROPN']:,} total, {stats['PROPN_excluded']:,} excluded (freq < {MIN_FREQ_PROPN:,})")
    print(f"  Other words: {stats['other']:,} total, {stats['other_excluded']:,} excluded (freq < {MIN_FREQ_GENERAL:,})")
    
    return filtered_words


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
    parser.add_argument("--reset", action="store_true", help="Clear all existing words before refilling")
    main(parser.parse_args())
