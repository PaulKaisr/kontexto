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
- `pnpm test` - Run frontend tests with Vitest
- `pnpm test:ui` - Run tests with web UI interface

### Python Backend

Navigate to `code/python/` directory:

- `poetry install` - Install dependencies

**Database Scripts:**
All scripts support explicit environment selection via command-line flags:

- `python src/scripts/new_game.py [--local|--production] [--reset]` - Create new game with similarity calculations
- `python src/scripts/init_tables.py [--local|--production]` - Initialize database tables  
- `python src/scripts/empty_tables.py [--local|--production]` - Clear all database data
- `python src/scripts/fill_words_table.py [--local|--production]` - Fill words table with German corpus

**Environment Selection:**
- `--local`: Use local Supabase database (.env.local)
- `--production`: Use production database (.env)
- No flag: Auto-detect (prefers .env.local if present, otherwise .env)

**New Game Options:**
- `--reset`: Clear all previous games and similarities before creating new game (use with caution in production)

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

# Reset and create new game (local development)
python src/scripts/new_game.py --local --reset
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
- **Pinia stores**: 
  - `game.store.ts` (game state, guesses, hints, win detection)
  - `settings.store.ts` (user preferences, theme settings)
- **Supabase client** for database operations in `services/supabase.ts`
- **Type safety** with generated types from Supabase in `generated-sources/database.types.ts`
- **Testing framework**: Vitest with Vue Test Utils for component testing

### Testing Setup

**Frontend Tests:**
- **Framework**: Vitest + Vue Test Utils + jsdom for DOM environment
- **Test files**: Located in `src/components/__tests__/` directory
- **Configuration**: 
  - `vitest.config.ts` - Main Vitest configuration with Vue plugin
  - `tsconfig.vitest.json` - TypeScript config for tests with path aliases
  - `src/test-setup.ts` - Global test setup (mocks, utilities)
- **Run tests**: `pnpm test` (watch mode) or `pnpm test --run` (single run)
- **Test UI**: `pnpm test:ui` for browser-based test interface

**Test Patterns:**
- Mock child components to isolate component under test
- Use Pinia for state management testing with `createPinia()` and `setActivePinia()`
- Stub Vuetify components to avoid CSS/styling issues in tests
- Test user interactions, component rendering, and store integration

### Components Structure

- **Game.vue**: Main game interface with input field and game state
- **StatsCard.vue**: Victory celebration card with game statistics and sharing options
- **ClosestWords.vue**: Post-game popup showing top 500 closest words using reusable GuessItem components
- **HowToPlay.vue**: Game instructions modal with comprehensive styling
- **ContextMenu.vue**: Three-dot menu containing hints, instructions, and settings
- **GuessHistory/**: Reusable components for displaying word guesses with similarity rankings
- **Settings**: Theme preferences (light/dark mode)

### Backend Structure

- **Service layer**: GameService, SimilarityService, WordService handle business logic
- **Repository pattern**: Database access abstracted through repositories
- **SQLAlchemy ORM** with entities for Game, Similarity, Word
- **FastText embeddings** for semantic similarity calculations (model: `cc.de.300.bin`)

### Database Schema

- **game**: Stores individual game instances with date and game_id
- **similarity**: Pre-calculated similarity scores for all words against solution word, ranked by similarity (1 = exact match)
- **word**: German word corpus (~55k words) with frequency data and linguistic attributes

### Game Flow

1. Python script creates new game and calculates word similarities using FastText (~55k similarity calculations)
2. Frontend fetches most recent game and allows unlimited guessing
3. Similarity scores are pre-calculated and ranked, not computed real-time
4. Game state persisted in browser using Pinia persistence plugin
5. Victory triggers StatsCard with sharing functionality and closest words viewer

## Key Features

### Word Similarity System

The core mechanic pre-calculates similarity scores for ~55k German words against each game's solution word using
FastText embeddings. Words are ranked 1-55000 by similarity and stored for fast lookup during gameplay.

### Color-Coded Feedback System

Words are color-coded based on their similarity ranking:
- **Green**: Rank ≤ 300 (very close)
- **Yellow**: Rank 300-1500 (close)  
- **Orange**: Rank 1500-3000 (getting warmer)
- **Red**: Rank > 3000 (far away)

### Win Condition & Post-Game Features

- **Win Detection**: Game is won when a word with rank 1 (exact match) is guessed
- **Statistics Card**: Shows celebration message, attempt count, hint usage, and color-coded statistics
- **Social Sharing**: Copy-to-clipboard functionality with formatted social media message
- **Closest Words Viewer**: Shows top 500 closest words after winning, reusing existing GuessItem components

### Hint System

- **Smart Hints**: Provides words with good similarity rankings based on current progress
- **Hint Tracking**: Counts hint usage separately from regular guesses
- **Context Menu Integration**: Hint button moved to context menu for cleaner UI

### User Interface

- **Responsive Design**: Works on desktop and mobile devices
- **Theme Support**: Light/dark mode toggle in settings
- **German Localization**: All UI text in German
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Consistent Styling**: Exclusive use of Tailwind CSS and Vuetify components

### State Management

Game state (current guess, past guesses, hints, win status) is managed through Pinia with persistence, allowing users to resume games across browser sessions. Win state automatically shows victory card and enables post-game features.

### Type Safety

Frontend uses generated TypeScript types from Supabase schema, ensuring type safety between database and UI components. All components use proper TypeScript definitions with strict typing.

## Deployment

- **Frontend**: Deployed to Vercel at `https://kontexto.vercel.app/`
- **Database**: Supabase (hosted PostgreSQL)
- **Game Data**: New games created manually via Python scripts