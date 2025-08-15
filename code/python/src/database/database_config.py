"""
Centralized database configuration management.
Allows setting the environment once at application startup,
then all Database instances automatically use the correct configuration.
"""


class DatabaseConfig:
    """
    Global configuration manager for database environment selection.
    """
    _env_file = None
    
    @classmethod
    def set_environment(cls, env_file: str = None):
        """
        Set the environment file to use for database configuration.
        
        Args:
            env_file: Path to environment file ('.env.local' or '.env')
                     If None, uses default behavior (prefer .env.local if exists)
        """
        cls._env_file = env_file
        # Reset Database singleton to force reinitialization with new config
        from src.database.database import Database
        Database._instance = None
        Database._engine = None
        Database._SessionLocal = None
        print(f"Database environment set to: {env_file or 'default (auto-detect)'}")
    
    @classmethod
    def get_env_file(cls) -> str | None:
        """
        Get the currently configured environment file.
        
        Returns:
            Path to environment file or None for default behavior
        """
        return cls._env_file
    
    @classmethod
    def reset(cls):
        """
        Reset to default behavior (auto-detect .env.local vs .env).
        """
        cls._env_file = None
        print("Database environment reset to default (auto-detect)")