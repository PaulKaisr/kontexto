"""Validation script to test the improved word filter integration."""

import sys
from pathlib import Path

# Add src to path for imports
sys.path.append(str(Path(__file__).parent.parent))

from services.improved_word_filter import ImprovedWordFilter

def validate_integration():
    """Validate that the word filter integration is working correctly."""
    print("Validating ImprovedWordFilter integration...")
    
    # Test filter creation
    try:
        word_filter = ImprovedWordFilter()
        print("✓ Successfully created ImprovedWordFilter instance")
    except Exception as e:
        print(f"✗ Failed to create ImprovedWordFilter: {e}")
        return False
    
    # Test basic functionality
    test_cases = [
        ("Müller", "PROP", 50000, True, "Known surname should be excluded"),
        ("Berlin", "PROP", 150000, False, "Major city should be preserved"),
        ("Haus", "NOUN", 100000, False, "Regular noun should not be excluded"),
    ]
    
    all_passed = True
    for word, word_type, occurrences, expected_exclude, description in test_cases:
        try:
            should_exclude, reason = word_filter.should_exclude_word(word, word_type, occurrences)
            if should_exclude == expected_exclude:
                print(f"✓ {description}")
            else:
                print(f"✗ {description} - Expected {expected_exclude}, got {should_exclude}")
                all_passed = False
        except Exception as e:
            print(f"✗ Error testing {word}: {e}")
            all_passed = False
    
    # Test analysis functionality
    try:
        test_data = [
            ("Müller", "PROP", 45000),
            ("Berlin", "PROP", 150000),
            ("Haus", "NOUN", 100000),
        ]
        stats = word_filter.analyze_filtering_impact(test_data)
        print(f"✓ Analysis functionality works: {stats['total_excluded']} excluded, {stats['total_preserved']} preserved")
    except Exception as e:
        print(f"✗ Analysis functionality failed: {e}")
        all_passed = False
    
    if all_passed:
        print("\n✓ All validation tests passed - integration is working correctly!")
        return True
    else:
        print("\n✗ Some validation tests failed - check the integration")
        return False

if __name__ == "__main__":
    success = validate_integration()
    sys.exit(0 if success else 1)