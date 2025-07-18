"""
Script to fill words table initially.
"""
from dotenv import load_dotenv

def main():
    """
    Fill words table with words from word service
    """
    print("Filling words table with words from word service...")
    load_dotenv()

if __name__ == "__main__":
    main()
