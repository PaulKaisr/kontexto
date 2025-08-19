# Multi-Game Progress Tracking Feature

## Overview

I have implemented a comprehensive multi-game progress tracking system for Kontexto that allows users to:

1. **Track progress across all available games** - The system now maintains state for multiple games simultaneously
2. **See game status indicators** - Games are categorized as "Nicht begonnen", "Angefangen", "Aufgegeben", or "Gelöst"
3. **Switch between games seamlessly** - Users can switch to any available game and continue from where they left off
4. **View detailed game information** - The PreviousGames component now shows progress details, attempt counts, hints used, and solutions

## Implementation Details

### 1. Enhanced Game Store (`src/stores/game.store.ts`)

**New State Structure:**

- Replaced single-game state (`pastGuesses`, `numHints`, `hasGivenUp`) with a multi-game structure
- Added `gamesProgress: Record<number, GameProgress>` to track all games
- Each `GameProgress` contains: `gameId`, `guesses[]`, `numHints`, `hasGivenUp`, `lastPlayed`

**New Game States (German):**

```typescript
export enum GameState {
  NOT_STARTED = "Nicht begonnen", // No guesses made
  IN_PROGRESS = "Angefangen", // Has guesses, not solved/given up
  GIVEN_UP = "Aufgegeben", // User gave up
  SOLVED = "Gelöst", // Successfully solved
}
```

**New Actions:**

- `initializeGameProgress(gameId)` - Creates progress entry for a game
- `switchToGame(gameId)` - Switches active game context
- `getGameState(gameId)` - Returns the current state of a specific game
- `updateLastPlayed(gameId)` - Updates timestamp for game activity

**New Getters:**

- `currentGameProgress` - Returns progress for the currently active game
- `pastGuesses`, `numHints`, `hasGivenUp` - Computed properties that return current game data
- `allGamesWithProgress` - Returns all games with their progress status

### 2. Updated PreviousGames Component (`src/components/PreviousGames.vue`)

**New Features:**

- **Visual Status Indicators:** Each game shows a colored avatar with an icon representing its state

  - Grey circle with play icon: "Nicht begonnen"
  - Orange circle with clock icon: "Angefangen"
  - Green circle with check icon: "Gelöst"
  - Red circle with X icon: "Aufgegeben"

- **Progress Information:** Shows attempt count and hints used for each game
- **Solution Display:** Completed games show the solution word
- **Smart Game List:** Combines database games with local progress data

**Color Coding:**

- **Grey** (`grey-lighten-1`): Not started
- **Orange** (`orange`): In progress
- **Green** (`success`): Successfully solved
- **Red** (`error`): Given up

### 3. Game Persistence

The system uses Pinia's persistence plugin to automatically save all game progress to localStorage. This means:

- All game states persist across browser sessions
- Users can close and reopen the app without losing progress
- Game switching is instantaneous (no need to refetch data)

### 4. Backward Compatibility

The implementation maintains full backward compatibility:

- Existing game store getters (`pastGuesses`, `numHints`, etc.) still work for the current game
- All existing components continue to function without modification
- The migration from single-game to multi-game is transparent

## User Experience Improvements

1. **Seamless Game Switching:** Users can now switch between any available game without losing progress
2. **Visual Progress Overview:** The PreviousGames dialog provides a clear overview of all game states at a glance
3. **Continue Where You Left Off:** Partial progress is automatically saved and restored when switching games
4. **Clear Status Communication:** German status labels make it immediately clear which games are completed, in progress, or untouched

## Technical Benefits

1. **Scalable Architecture:** The new structure can handle an unlimited number of games
2. **Efficient Memory Usage:** Only active game data is kept in memory; historical data is persisted to localStorage
3. **Type Safety:** Full TypeScript support with proper interfaces and enums
4. **Testability:** Updated test suite ensures the new functionality is properly tested

## Testing

The test suite has been updated to work with the new multi-game structure:

- Fixed `Game.spec.ts` to properly mock game progress data
- Updated `StatsCard.spec.ts` to use the new progress structure
- All core functionality tests pass with the new implementation

## Usage

Users can now:

1. **Start multiple games:** Each day's game maintains its own progress
2. **View game status:** Open "Frühere Spiele" to see all available games with their status
3. **Switch games:** Click on any game to switch to it and continue playing
4. **Track progress:** See exactly how many attempts and hints were used for each game
5. **View solutions:** Completed games show the solution word for reference

This implementation provides a much richer and more engaging user experience while maintaining the simplicity and ease of use that makes Kontexto enjoyable.
