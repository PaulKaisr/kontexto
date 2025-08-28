# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kontexto is a German context-based word guessing game with a frontend built in Vue 3 and backend services in Python.
Players guess words that are semantically similar to a secret solution word, with similarity scored using FastText word
embeddings.

## Commands

### Frontend (Vue 3/Vite)

Navigate to `code/frontend/` directory for all frontend commands:

- `pnpm dev` - Start development server (http://localhost:3000, auto-increments if port taken)
- `pnpm build` - Build for production (runs type-check and build-only)
- `pnpm type-check` - Run Vue TypeScript compiler
- `pnpm preview` - Preview production build locally

### Testing Commands (All tests must pass for CI/CD)

- `pnpm test` - Run frontend tests with Vitest in watch mode (development)
- `pnpm test --run` - Run tests once in CI mode (required for pull requests)
- `pnpm test:ui` - Run tests with interactive web UI interface

**CI/CD Pipeline Requirements:**
- All unit tests must pass before PR can be merged
- Type checking must pass (`pnpm type-check`)
- Build must succeed (`pnpm build`)
- Tests are run automatically on push/PR to main branch

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
- `--replace <game_id>`: Replace similarities for an existing game with newly calculated ones (preserves game ID and date)
- `-n <number>`: Create multiple games at once (default: 1)
- `--similarity-service <service>`: Choose similarity service (spacy, transformer, sentence-transformer)

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

# Replace similarities for an existing game with new ones (preserves game ID and date)
python src/scripts/new_game.py --local --replace <game_id>
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
- **Vue Router** for client-side routing with legal pages (Data Protection, Contact/Impressum)
- **Vercel Analytics** integrated for production usage tracking
- **Pinia stores**:
  - `game.store.ts` (game state, guesses, hints, win detection)
  - `settings.store.ts` (user preferences, theme settings with light/dark mode)
- **Supabase client** for database operations in `services/supabase.ts`
- **Type safety** with generated types from Supabase in `generated-sources/database.types.ts`
- **Testing framework**: Vitest with Vue Test Utils for component testing

### Testing Setup

**Frontend Tests:**

- **Framework**: Vitest + Vue Test Utils + jsdom for DOM environment
- **Test files**: Located in `tests/spec/` directory
- **Configuration**:
  - `vitest.config.ts` - Main Vitest configuration with Vue plugin and path aliases
  - `tsconfig.vitest.json` - TypeScript config for tests with path aliases
  - `tests/test-setup.ts` - Global test setup with Vuetify plugin registration and mocks
- **Run tests**: `pnpm test` (watch mode) or `pnpm test --run` (single run)
- **Test UI**: `pnpm test:ui` for browser-based test interface

**Test Patterns:**

- Use real components without mocking for full integration testing
- Global Vuetify plugin registration in test setup eliminates component resolution warnings
- Use Pinia for state management testing with `createPinia()` and `setActivePinia()`
- Shared `mountComponent()` helper function in `beforeEach()` for consistent test setup
- Test user interactions, component rendering, and store integration
- Dialog testing requires special handling (use `teleport: true` stubs, `attachTo: document.body`)

### CI/CD Pipeline & Testing Guidelines

**GitHub Actions Workflow:**
- **Automatic Testing**: All tests run on push/PR to main branch
- **Required Checks**: Tests, type checking, and build must pass
- **Branch Protection**: Pull requests cannot be merged unless all checks pass
- **Workflow File**: Located at `.github/workflows/frontend-ci.yml`

**Test Coverage:**
- **9 Component Tests**: All major components have comprehensive test suites
  - `ConfirmDialog.spec.ts` - Dialog component with event testing
  - `ContextMenu.spec.ts` - Menu interactions and props
  - `Game.spec.ts` - Main game component with store integration
  - `GuessHistory.spec.ts` - Guess list rendering and sorting
  - `GuessItem.spec.ts` - Individual guess styling and highlighting
  - `HowToPlay.spec.ts` - Instructions modal content
  - `Settings.spec.ts` - Theme settings and cookie preferences
  - `StatsBar.spec.ts` - Game statistics display
  - `StatsCard.spec.ts` - Victory card with sharing functionality

**Testing Best Practices:**
- **Always run tests before committing**: `pnpm test --run`
- **Fix failing tests immediately** - do not push broken tests
- **Test data-testid attributes** for reliable element selection
- **Mock external dependencies** (navigator.clipboard, etc.)
- **Test component props, events, and computed properties**
- **Verify both success and error states**

**Development Workflow:**
1. Make code changes
2. Run `pnpm test` to ensure tests pass
3. Run `pnpm type-check` to verify TypeScript
4. Run `pnpm build` to ensure build succeeds
5. Commit changes and create PR
6. CI pipeline automatically runs all checks
7. PR can only be merged after all checks pass

### Components Structure

- **Game.vue**: Main game interface with input field and game state
- **StatsCard.vue**: Victory celebration card with game statistics and sharing options
- **ClosestWords.vue**: Post-game popup showing top 500 closest words using reusable GuessItem components
- **HowToPlay.vue**: Game instructions modal with comprehensive styling and mobile responsiveness
- **ContextMenu.vue**: Three-dot menu containing hints, instructions, settings, and give up functionality
- **Settings.vue**: Reusable settings card component with theme preferences (light/dark mode) and German localization
- **ConfirmDialog.vue**: Reusable confirmation dialog component for destructive actions (e.g., give up game)
- **GuessHistory/**: Reusable components for displaying word guesses with similarity rankings
- **PreviousGames.vue**: Dialog showing historical games with mobile-responsive design
- **AppFooter.vue**: Sticky footer with legal links (Data Protection, Contact/Impressum)

**Component Architecture Patterns:**

- **Mobile-first responsive design**: All dialogs and components adapt to screen sizes using Vuetify breakpoints
- **Reusable dialog components**: Separated from container components for better modularity
- **Consistent styling**: Follows established patterns with primary color headers, outlined card sections, and proper spacing
- **German localization**: All user-facing text in German with proper terminology
- **Event-driven communication**: Components emit events rather than directly manipulating parent state

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

- **Responsive Design**: Works on desktop and mobile devices with mobile-first approach
- **Theme Support**: Light/dark mode toggle in settings with automatic persistence
- **German Localization**: All UI text in German with proper terminology
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Consistent Styling**: Exclusive use of Tailwind CSS and Vuetify components with established design patterns
- **IMPORTANT**: ALWAYS use Tailwind CSS for styling when possible. Avoid inline styles and custom CSS unless absolutely necessary. Tailwind provides consistent spacing, colors, and responsive design utilities that should be preferred over manual styling.
- **CRITICAL**: ALWAYS prioritize native Vuetify components over custom implementations. Use Vuetify's extensive component library (v-card, v-btn, v-dialog, v-list, v-chip, v-avatar, v-divider, etc.) for consistent Material Design styling and built-in functionality. Only create custom components when Vuetify doesn't provide the needed functionality.
- **Component Priority Order**:
  1. Native Vuetify components (v-card, v-btn, v-list, etc.)
  2. Tailwind CSS classes for spacing, colors, and layout
  3. Custom Vue components only when absolutely necessary
- **Dialog System**: Comprehensive modal system with mobile optimization (fullscreen on xs, responsive sizing)
- **Legal Compliance**: Integrated data protection and contact pages via Vue Router

### State Management

Game state (current guess, past guesses, hints, win status) is managed through Pinia with persistence, allowing users to resume games across browser sessions. Win state automatically shows victory card and enables post-game features.

### Type Safety

Frontend uses generated TypeScript types from Supabase schema, ensuring type safety between database and UI components. All components use proper TypeScript definitions with strict typing.

## Deployment

- **Frontend**: Deployed to Vercel at `https://kontexto.app/` with integrated Vercel Analytics
- **Database**: Supabase (hosted PostgreSQL)
- **Game Data**: New games created manually via Python scripts
- **Analytics**: Vercel Analytics tracks production usage (privacy-compliant)
- **Legal Pages**: Data Protection and Contact pages accessible via `/legal` and `/impressum` routes
