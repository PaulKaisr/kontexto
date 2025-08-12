# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kontexto is a German context-based word guessing game with a frontend built in Vue 3 and backend services in Python.
Players guess words that are semantically similar to a secret solution word, with similarity scored using FastText word
embeddings.

## Commands

### Frontend (Vue 3/Vite)

Navigate to `code/frontend/` directory for all frontend commands:

- `pnpm dev` - Start development server (http://localhost:3000)
- `pnpm build` - Build for production (runs type-check and build-only)
- `pnpm type-check` - Run Vue TypeScript compiler
- `pnpm preview` - Preview production build locally

### Python Backend

Navigate to `code/python/` directory:

- `poetry install` - Install dependencies

**Database Scripts:**
All scripts support explicit environment selection via command-line flags:

- `python src/scripts/new_game.py [--local|--production]` - Create new game with similarity calculations
- `python src/scripts/init_tables.py [--local|--production]` - Initialize database tables  
- `python src/scripts/empty_tables.py [--local|--production]` - Clear all database data
- `python src/scripts/fill_words_table.py [--local|--production]` - Fill words table with German corpus

**Environment Selection:**
- `--local`: Use local Supabase database (.env.local)
- `--production`: Use production database (.env)
- No flag: Auto-detect (prefers .env.local if present, otherwise .env)

**Common Usage Examples:**
```bash
# Local development (recommended for testing)
python src/scripts/init_tables.py --local
python src/scripts/fill_words_table.py --local  
python src/scripts/new_game.py --local

# Production deployment
python src/scripts/new_game.py --production

# Auto-detect environment
python src/scripts/new_game.py
```

### Database (Supabase)

**Local Development Setup:**

1. Ensure Docker Desktop is installed and running
2. From `code/frontend/` directory:
    - `supabase start` - Start local Supabase development environment
    - `supabase stop` - Stop local Supabase services
    - `supabase reset` - Reset local database to clean state
3. Local services run on:
    - Database: port 54322
    - API: port 54321
    - Studio: port 54323

**Environment Configuration:**

The system supports two database environments with automatic detection:

- **Local development**: `.env.local` → Local Supabase (127.0.0.1:54322)
- **Production**: `.env` → Hosted Supabase

**Centralized Environment Management:**
- Uses `DatabaseConfig` class for global environment selection
- All services/repositories automatically use the configured environment
- No need to pass database parameters through service constructors

**Environment File Priority:**
1. Explicit flags (`--local` or `--production`) take highest priority
2. Auto-detect mode prefers `.env.local` if it exists
3. Falls back to `.env` if `.env.local` not found

**Local Development Workflow:**
```bash
# Start local Supabase
supabase start

# Initialize local database  
python src/scripts/init_tables.py --local
python src/scripts/fill_words_table.py --local
python src/scripts/new_game.py --local

# Develop with local data...
```

Data persists across local restarts via Docker volumes.

## Architecture

### Frontend Structure

- **Vue SPA** using Vuetify for UI components and Tailwind for styling
- **Pinia stores**: `game.store.ts` (game state, guesses, hints), `settings.store.ts` (user preferences)
- **Supabase client** for database operations in `services/supabase.ts`
- **Type safety** with generated types from Supabase in `generated-sources/database.types.ts`

### Backend Structure

- **Service layer**: GameService, SimilarityService, WordService handle business logic
- **Repository pattern**: Database access abstracted through repositories
- **SQLAlchemy ORM** with entities for Game, Similarity, Word
- **FastText embeddings** for semantic similarity calculations (model: `cc.de.300.bin`)

### Database Schema

- **game**: Stores individual game instances with date
- **similarity**: Pre-calculated similarity scores for all words against solution word, ranked by similarity
- **word**: German word corpus with frequency data

### Game Flow

1. Python script creates new game and calculates word similarities using FastText
2. Frontend fetches most recent game and allows guessing
3. Similarity scores are pre-calculated and ranked, not computed real-time
4. Game state persisted in browser using Pinia persistence plugin

## Key Patterns

### Word Similarity System

The core mechanic pre-calculates similarity scores for ~20k German words against each game's solution word using
FastText embeddings. Scores are ranked and stored in the similarity table for fast lookup during gameplay.

### State Management

Game state (current guess, past guesses, hints) is managed through Pinia with persistence, allowing users to resume
games across browser sessions.

### Type Safety

Frontend uses generated TypeScript types from Supabase schema, ensuring type safety between database and UI components.