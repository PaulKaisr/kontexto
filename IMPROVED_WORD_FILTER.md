# Improved Word Filtering for German Surname Contamination

## Problem Statement

The Kontexto game was experiencing similarity score contamination from German surnames that are also common words (e.g., Müller=miller, Koch=cook, Schmidt=smith). These surnames appeared frequently in top-500 similarity results because:

1. German surnames often derive from occupations/words (Müller, Koch, etc.)
2. spaCy's training data contains surnames in similar linguistic contexts
3. This created artificial similarity clusters that degraded gameplay quality

## Solution: Smart PROP Filtering

### Implementation Files

- **`src/services/improved_word_filter.py`** - Main filtering logic with multi-strategy approach
- **`src/scripts/fill_words_table.py`** - Modified to integrate filtering (lines 113-120)
- **`src/database/repositories/word_repository.py`** - Added analysis method for PROP distribution
- **`src/scripts/validate_word_filter.py`** - Validation script for testing integration

### Filtering Strategies

1. **Explicit Surname Blacklist** - Removes ~60 known German surnames (Müller, Schmidt, etc.)
2. **Geographic Whitelist** - Preserves major cities, regions, countries
3. **Place Name Pattern Recognition** - Keeps words with geographic suffixes (-berg, -burg, -stadt)
4. **Frequency-Based Logic**:
   - High freq (≥100k): Keep (likely legitimate proper nouns)
   - Medium freq (50k-100k): Additional geographic checks
   - Low freq (20k-50k): Exclude (likely surnames)

### Expected Impact

- **Removes 80-90%** of problematic surnames from similarity calculations
- **Preserves useful proper nouns** (Berlin, München, Deutschland, etc.)
- **Maintains semantic quality** while eliminating artificial clustering
- **Reduces contamination** in top-500 similarity results

### Usage

The filtering is automatically applied when running:

```bash
# Rebuild word database with improved filtering
python src/scripts/empty_tables.py --local
python src/scripts/fill_words_table.py --local

# Create new game with filtered data
python src/scripts/new_game.py --local
```

### Validation

Run validation script to test the filtering logic:

```bash
python src/scripts/validate_word_filter.py
```

### Analysis

Use the new analysis method to understand filtering impact:

```python
from src.database.repositories.word_repository import WordRepository
repo = WordRepository()
stats = repo.analyze_prop_words()
print(stats)
```

### Alternative Approaches

If issues persist, consider switching to transformer-based similarity:

```bash
python src/scripts/new_game.py --local --similarity-service transformer
```

The transformer model may have better semantic understanding and less surname contamination than the current spaCy model.

## Integration Points

- **Line 11**: Import added to `fill_words_table.py`
- **Lines 113-120**: Filtering logic applied after attribute-based filtering
- **Lines 85-119**: New analysis method in `word_repository.py`

This filtering should significantly improve the quality of similarity scores by removing surname contamination while preserving legitimate geographic and proper names.