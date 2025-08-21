import { defineStore } from "pinia";
import {
  getMostRecentGame,
  getSimilarityByGameIdAndWord,
  getHintForGame,
} from "@/services/supabase";
import type { Game } from "@/types/game";
import { useAnalytics } from "@/composables/useAnalytics";

// Game progress interface for tracking individual games
interface GameProgress {
  gameId: number;
  guesses: { guess: string; similarity: number }[];
  numHints: number;
  hasGivenUp: boolean;
  lastPlayed: string; // ISO timestamp
}

// Game state enum for German status display
export enum GameState {
  NOT_STARTED = "Nicht begonnen",
  IN_PROGRESS = "Angefangen",
  GIVEN_UP = "Aufgegeben",
  SOLVED = "Gelöst",
}

export const useGameStore = defineStore("game", {
  state: () => ({
    currentGuess: "",
    recentGame: null as Game | null,
    // Multi-game progress tracking
    gamesProgress: {} as Record<number, GameProgress>,
  }),
  persist: true,
  actions: {
    // Initialize progress for a game if it doesn't exist
    initializeGameProgress(gameId: number) {
      if (!this.gamesProgress[gameId]) {
        this.gamesProgress[gameId] = {
          gameId,
          guesses: [],
          numHints: 0,
          hasGivenUp: false,
          lastPlayed: new Date().toISOString(),
        };
      }
    },

    // Update last played timestamp for current game
    updateLastPlayed(gameId: number) {
      if (this.gamesProgress[gameId]) {
        this.gamesProgress[gameId].lastPlayed = new Date().toISOString();
      }
    },

    async fetchAndSetRecentGame() {
      const game = await getMostRecentGame();
      // Only reset if the fetched game is different from the current one
      if (
        game &&
        (!this.recentGame || game.game_id !== this.recentGame.game_id)
      ) {
        // Don't reset the entire store - just set the new game
        this.recentGame = game;
        this.currentGuess = "";

        // Initialize progress for this game if it doesn't exist
        this.initializeGameProgress(game.game_id);
        this.updateLastPlayed(game.game_id);

        // Track game start
        const { trackGameEvent } = useAnalytics();
        trackGameEvent("game_start", { game_id: game.game_id });
      }
    },

    // Switch to a specific game
    async switchToGame(gameId: number) {
      if (this.recentGame?.game_id === gameId) return;

      // Initialize progress for this game if it doesn't exist
      this.initializeGameProgress(gameId);
      this.updateLastPlayed(gameId);

      // Reset current guess when switching games
      this.currentGuess = "";
    },

    /**
     * Returns an object describing the result of the guess attempt.
     * { success: boolean, error?: 'duplicate' | 'not_found' | 'empty' }
     */
    async submitGuess(): Promise<{
      success: boolean;
      error?: "duplicate" | "not_found" | "empty";
    }> {
      if (!this.currentGuess || !this.currentGuess.trim()) {
        return { success: false, error: "empty" };
      }
      if (this.recentGame) {
        const gameId = this.recentGame.game_id;
        this.initializeGameProgress(gameId);

        // Get similarity data for the current guess
        const similarity = await getSimilarityByGameIdAndWord(
          gameId,
          this.currentGuess,
        );

        // Check if word was not found
        if (
          !similarity ||
          similarity.similarity === undefined ||
          similarity.similarity === null ||
          !similarity.matchedWord
        ) {
          return { success: false, error: "not_found" };
        }

        // Check if this matched word is already in our guesses
        if (
          this.gamesProgress[gameId].guesses.some(
            (g: { guess: string; similarity: number }) =>
              g.guess === similarity.matchedWord,
          )
        ) {
          return { success: false, error: "duplicate" };
        }

        // Add the correctly capitalized word to guesses
        this.gamesProgress[gameId].guesses.push({
          guess: similarity.matchedWord, // Use the correctly capitalized word that got the best match
          similarity: similarity.similarity,
        });
        this.currentGuess = "";
        this.updateLastPlayed(gameId);

        // Track successful guess
        const { trackGameEvent } = useAnalytics();
        trackGameEvent("game_complete", {
          game_id: gameId,
          guess_count: this.gamesProgress[gameId].guesses.length,
          hints_used: this.gamesProgress[gameId].numHints,
          similarity: similarity.similarity,
          was_correct: similarity.similarity === 1,
        });

        return { success: true };
      }
      return { success: false, error: "not_found" };
    },

    resetStore() {
      this.currentGuess = "";
      this.recentGame = null;
      this.gamesProgress = {};
    },

    async getHint() {
      if (!this.recentGame) return;
      const gameId = this.recentGame.game_id;
      this.initializeGameProgress(gameId);

      const guessedRanks = this.gamesProgress[gameId].guesses.map(
        (g: { guess: string; similarity: number }) => g.similarity,
      );
      const bestRank =
        guessedRanks.length > 0 ? Math.min(...guessedRanks) : Infinity;

      let nextHintRank: number;
      if (bestRank <= 1) {
        let candidate = 2;
        while (guessedRanks.includes(candidate)) candidate++;
        nextHintRank = candidate;
      } else if (bestRank <= 300) {
        let candidate = Math.max(2, Math.floor(bestRank / 2));
        while (guessedRanks.includes(candidate)) candidate++;
        nextHintRank = candidate;
      } else {
        let candidate = 300;
        while (guessedRanks.includes(candidate)) candidate++;
        nextHintRank = candidate;
      }

      const hint = await getHintForGame(gameId, nextHintRank);
      if (hint && hint.word) {
        this.gamesProgress[gameId].guesses.push({
          guess: hint.word,
          similarity: hint.similarity!,
        });
        this.gamesProgress[gameId].numHints++;
        this.updateLastPlayed(gameId);

        // Track hint usage
        const { trackGameEvent } = useAnalytics();
        trackGameEvent("hint_used", {
          game_id: gameId,
          hint_number: this.gamesProgress[gameId].numHints,
          hint_rank: nextHintRank,
          total_guesses: this.gamesProgress[gameId].guesses.length,
        });
      }
    },

    async giveUp() {
      if (!this.recentGame) return;
      const gameId = this.recentGame.game_id;
      this.initializeGameProgress(gameId);

      if (this.gamesProgress[gameId].hasGivenUp || this.getGameSolution(gameId))
        return;

      // Get the solution word (rank 1)
      const solution = await getHintForGame(gameId, 1);
      if (solution && solution.word) {
        this.gamesProgress[gameId].guesses.push({
          guess: solution.word,
          similarity: 1,
        });
        this.gamesProgress[gameId].hasGivenUp = true;
        this.updateLastPlayed(gameId);

        // Track give up event
        const { trackGameEvent } = useAnalytics();
        trackGameEvent("give_up", {
          game_id: gameId,
          guess_count: this.gamesProgress[gameId].guesses.length - 1, // Subtract 1 because we just added the solution
          hints_used: this.gamesProgress[gameId].numHints,
          solution_word: solution.word,
        });
      }
    },

    // Get game state for a specific game
    getGameState(gameId: number): GameState {
      const progress = this.gamesProgress[gameId];
      if (!progress || progress.guesses.length === 0) {
        return GameState.NOT_STARTED;
      }

      const solution = progress.guesses.find((g) => g.similarity === 1);
      if (solution) {
        return progress.hasGivenUp ? GameState.GIVEN_UP : GameState.SOLVED;
      }

      return GameState.IN_PROGRESS;
    },

    // Get solution for a specific game
    getGameSolution(gameId: number): string | null {
      const progress = this.gamesProgress[gameId];
      if (!progress) return null;

      const solutionGuess = progress.guesses.find((g) => g.similarity === 1);
      return solutionGuess ? solutionGuess.guess : null;
    },
  },
  getters: {
    // Get current game's progress
    currentGameProgress(state): GameProgress | null {
      if (!state.recentGame) return null;
      return state.gamesProgress[state.recentGame.game_id] || null;
    },

    // Get past guesses for current game
    pastGuesses(): { guess: string; similarity: number }[] {
      return this.currentGameProgress?.guesses || [];
    },

    // Get number of hints for current game
    numHints(): number {
      return this.currentGameProgress?.numHints || 0;
    },

    // Check if current game was given up
    hasGivenUp(): boolean {
      return this.currentGameProgress?.hasGivenUp || false;
    },

    // Get most recent guess for current game
    mostRecentGuess(): { guess: string; similarity: number } | null {
      const guesses = this.pastGuesses;
      if (guesses.length === 0) return null;
      return guesses[guesses.length - 1];
    },

    // Get solution for current game
    solution(): string | null {
      if (!this.recentGame) return null;
      const progress = this.currentGameProgress;
      if (!progress) return null;

      const solutionGuess = progress.guesses.find((g) => g.similarity === 1);
      return solutionGuess ? solutionGuess.guess : null;
    },

    // Check if current game is over
    isGameOver(): boolean {
      return this.solution !== null || this.hasGivenUp;
    },

    // Get all games with their progress status
    allGamesWithProgress(state) {
      const games: Array<{
        gameId: number;
        state: GameState;
        guessCount: number;
        hintsUsed: number;
        lastPlayed: string | null;
        solution: string | null;
      }> = [];

      // Helper function to get game state
      const getGameState = (gameId: number): GameState => {
        const progress = state.gamesProgress[gameId];
        if (!progress || progress.guesses.length === 0) {
          return GameState.NOT_STARTED;
        }

        const solution = progress.guesses.find((g) => g.similarity === 1);
        if (solution) {
          return progress.hasGivenUp ? GameState.GIVEN_UP : GameState.SOLVED;
        }

        return GameState.IN_PROGRESS;
      };

      // Helper function to get game solution
      const getGameSolution = (gameId: number): string | null => {
        const progress = state.gamesProgress[gameId];
        if (!progress) return null;

        const solutionGuess = progress.guesses.find((g) => g.similarity === 1);
        return solutionGuess ? solutionGuess.guess : null;
      };

      // Add games that have progress
      Object.keys(state.gamesProgress).forEach((gameIdStr) => {
        const gameId = parseInt(gameIdStr);
        const progress = state.gamesProgress[gameId];
        games.push({
          gameId,
          state: getGameState(gameId),
          guessCount: progress.guesses.length,
          hintsUsed: progress.numHints,
          lastPlayed: progress.lastPlayed,
          solution: getGameSolution(gameId),
        });
      });

      return games.sort((a, b) => b.gameId - a.gameId); // Sort by game ID descending
    },

    // Progress statistics for header indicator
    progressStats(state) {
      // Helper function to get game state
      const getGameState = (gameId: number): GameState => {
        const progress = state.gamesProgress[gameId];
        if (!progress || progress.guesses.length === 0) {
          return GameState.NOT_STARTED;
        }

        const solution = progress.guesses.find(
          (g: { guess: string; similarity: number }) => g.similarity === 1,
        );
        if (solution) {
          return progress.hasGivenUp ? GameState.GIVEN_UP : GameState.SOLVED;
        }

        return GameState.IN_PROGRESS;
      };

      const totalGames = Object.keys(state.gamesProgress).length;
      const completedGames = Object.keys(state.gamesProgress).filter(
        (gameIdStr) => {
          const gameId = parseInt(gameIdStr);
          const gameState = getGameState(gameId);
          return (
            gameState === GameState.SOLVED || gameState === GameState.GIVEN_UP
          );
        },
      ).length;

      return {
        completed: completedGames,
        total: totalGames,
        percentage:
          totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0,
      };
    },
  },
});
