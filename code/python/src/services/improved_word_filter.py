"""Improved word filtering to address German surname contamination in similarity scores."""

from typing import Dict, List, Set, Tuple
import re


class ImprovedWordFilter:
    """
    Smart filtering system to remove problematic proper nouns (mainly German surnames)
    while preserving useful geographic and proper names.
    """
    
    def __init__(self):
        self.surname_blacklist = self._get_german_surname_blacklist()
        self.geographic_whitelist = self._get_geographic_whitelist()
        self.place_suffixes = {'-berg', '-burg', '-stadt', '-dorf', '-hausen', '-heim', '-furt', '-tal', '-bach'}
    
    def _get_german_surname_blacklist(self) -> Set[str]:
        """Common German surnames that are also everyday words."""
        return {
            # Occupation-based surnames that are also common words
            'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 
            'Becker', 'Schulz', 'Hoffmann', 'Koch', 'Richter', 'Klein', 'Wolf', 
            'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun', 'Krüger',
            'Hofmann', 'Hartmann', 'Lange', 'Schmitt', 'Werner', 'Schmitz',
            'Krause', 'Meier', 'Lehmann', 'Schmid', 'Schulze', 'Maier',
            'Köhler', 'Herrmann', 'König', 'Walter', 'Mayer', 'Huber',
            'Kaiser', 'Fuchs', 'Peters', 'Lang', 'Scholz', 'Möller',
            'Weiß', 'Jung', 'Hahn', 'Schubert', 'Schuster', 'Roth',
            'Franke', 'Albrecht', 'Schäfer', 'Arnold', 'Sommer', 'Stein',
            'Groß', 'Brandt', 'Simon', 'Ludwig', 'Böhm', 'Winter',
            'Kramer', 'Berg', 'Vogt', 'Grimm', 'Vogel', 'Bauer',
            'Otto', 'Horn', 'Graf', 'Rose', 'Engel', 'Busch'
        }
    
    def _get_geographic_whitelist(self) -> Set[str]:
        """Important geographic names to preserve."""
        return {
            # Major German cities
            'Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart',
            'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden',
            'Hannover', 'Nürnberg', 'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld',
            'Bonn', 'Münster', 'Karlsruhe', 'Mannheim', 'Augsburg', 'Wiesbaden',
            'Gelsenkirchen', 'Mönchengladbach', 'Braunschweig', 'Chemnitz',
            'Kiel', 'Aachen', 'Halle', 'Magdeburg', 'Freiburg', 'Krefeld',
            'Lübeck', 'Oberhausen', 'Erfurt', 'Mainz', 'Rostock', 'Kassel',
            'Hagen', 'Potsdam', 'Saarbrücken', 'Hamm', 'Mülheim', 'Ludwigshafen',
            
            # German states/regions
            'Bayern', 'Sachsen', 'Baden', 'Württemberg', 'Hessen', 'Rheinland',
            'Westfalen', 'Niedersachsen', 'Schleswig', 'Holstein', 'Brandenburg',
            'Mecklenburg', 'Vorpommern', 'Sachsen-Anhalt', 'Thüringen',
            'Pfalz', 'Saarland', 'Bremen',
            
            # Countries and major regions
            'Deutschland', 'Österreich', 'Schweiz', 'Europa', 'Amerika', 'Afrika',
            'Asien', 'Australien', 'Frankreich', 'Italien', 'Spanien', 'England',
            'Polen', 'Tschechien', 'Niederlande', 'Belgien', 'Dänemark',
            
            # Rivers and geographic features
            'Rhein', 'Elbe', 'Weser', 'Donau', 'Main', 'Neckar', 'Ruhr',
            'Alpen', 'Nordsee', 'Ostsee', 'Bodensee'
        }
    
    def _has_place_suffix(self, word: str) -> bool:
        """Check if word has typical German place name suffix."""
        for suffix in self.place_suffixes:
            if word.lower().endswith(suffix.lower()):
                return True
        return False
    
    def should_exclude_word(self, word: str, word_type: str, occurrences: int) -> Tuple[bool, str]:
        """
        Determine if a word should be excluded from the database.
        
        Args:
            word: The word to evaluate
            word_type: spaCy POS tag (e.g., 'PROP', 'NOUN', etc.)
            occurrences: Frequency count in corpus
            
        Returns:
            Tuple of (should_exclude: bool, reason: str)
        """
        # Only filter PROP words - leave other word types unchanged
        if word_type != "PROP":
            return False, "Not a proper noun"
        
        # Strategy 1: Explicit surname blacklist
        if word in self.surname_blacklist:
            return True, f"Known German surname: {word}"
        
        # Strategy 2: Geographic whitelist (always preserve)
        if word in self.geographic_whitelist:
            return False, f"Important geographic name: {word}"
        
        # Strategy 3: Place name patterns (preserve)
        if self._has_place_suffix(word):
            return False, f"Has geographic suffix: {word}"
        
        # Strategy 4: Frequency-based filtering
        if occurrences >= 100000:
            # Very high frequency PROP words are likely legitimate
            return False, f"High frequency PROP (≥100k): {word}"
        elif 50000 <= occurrences < 100000:
            # Medium frequency - additional checks for place names
            if any(suffix in word.lower() for suffix in ['-berg', '-burg', '-stadt', '-dorf']):
                return False, f"Medium frequency geographic name: {word}"
            # Otherwise exclude medium frequency PROP words (likely surnames)
            return True, f"Medium frequency PROP word (likely surname): {word}"
        elif 20000 <= occurrences < 50000:
            # Low frequency PROP words are very likely surnames
            return True, f"Low frequency PROP word (likely surname): {word}"
        else:
            # Below our minimum frequency threshold anyway
            return True, f"Below minimum frequency: {word}"
    
    def analyze_filtering_impact(self, words_data: List[Tuple[str, str, int]]) -> Dict[str, int]:
        """
        Analyze the impact of filtering on the word dataset.
        
        Args:
            words_data: List of (word, word_type, occurrences) tuples
            
        Returns:
            Dictionary with filtering statistics
        """
        stats = {
            'total_words': len(words_data),
            'total_prop': 0,
            'excluded_surname_blacklist': 0,
            'excluded_medium_freq': 0,
            'excluded_low_freq': 0,
            'preserved_geographic': 0,
            'preserved_high_freq': 0,
            'preserved_place_suffix': 0,
            'total_excluded': 0,
            'total_preserved': 0
        }
        
        for word, word_type, occurrences in words_data:
            if word_type == "PROP":
                stats['total_prop'] += 1
                should_exclude, reason = self.should_exclude_word(word, word_type, occurrences)
                
                if should_exclude:
                    stats['total_excluded'] += 1
                    if "Known German surname" in reason:
                        stats['excluded_surname_blacklist'] += 1
                    elif "Medium frequency" in reason:
                        stats['excluded_medium_freq'] += 1
                    elif "Low frequency" in reason:
                        stats['excluded_low_freq'] += 1
                else:
                    stats['total_preserved'] += 1
                    if "Important geographic" in reason:
                        stats['preserved_geographic'] += 1
                    elif "High frequency" in reason:
                        stats['preserved_high_freq'] += 1
                    elif "geographic suffix" in reason:
                        stats['preserved_place_suffix'] += 1
        
        return stats


def test_word_filter():
    """Test cases for the word filter."""
    filter_obj = ImprovedWordFilter()
    
    test_cases = [
        # Known surnames (should be excluded)
        ("Müller", "PROP", 50000, True, "Should exclude common surname"),
        ("Schmidt", "PROP", 45000, True, "Should exclude common surname"),
        ("Koch", "PROP", 30000, True, "Should exclude common surname"),
        
        # Geographic names (should be preserved)
        ("Berlin", "PROP", 150000, False, "Should preserve major city"),
        ("München", "PROP", 80000, False, "Should preserve major city"),
        ("Deutschland", "PROP", 200000, False, "Should preserve country"),
        
        # Place names with suffixes (should be preserved)
        ("Heidelberg", "PROP", 60000, False, "Should preserve place with -berg"),
        ("Würzburg", "PROP", 40000, False, "Should preserve place with -burg"),
        ("Darmstadt", "PROP", 35000, False, "Should preserve place with -stadt"),
        
        # High frequency PROP words (should be preserved)
        ("Europa", "PROP", 120000, False, "High frequency geographic term"),
        
        # Low frequency PROP words (should be excluded - likely surnames)
        ("Kleinmann", "PROP", 25000, True, "Low frequency, likely surname"),
        ("Mustermann", "PROP", 22000, True, "Low frequency, likely surname"),
        
        # Non-PROP words (should never be excluded by this filter)
        ("Haus", "NOUN", 100000, False, "Regular noun should not be excluded"),
        ("laufen", "VERB", 80000, False, "Regular verb should not be excluded"),
    ]
    
    print("Testing ImprovedWordFilter...")
    for word, word_type, occurrences, expected_exclude, description in test_cases:
        should_exclude, reason = filter_obj.should_exclude_word(word, word_type, occurrences)
        
        if should_exclude == expected_exclude:
            print(f"✓ PASS: {word} - {description}")
        else:
            print(f"✗ FAIL: {word} - {description}")
            print(f"   Expected exclude={expected_exclude}, got exclude={should_exclude}")
            print(f"   Reason: {reason}")
    
    print("\nFilter test completed.")


if __name__ == "__main__":
    test_word_filter()