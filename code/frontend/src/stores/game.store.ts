import { defineStore } from "pinia";
import {
  getMostRecentGame,
  getSimilarityByGameIdAndWord,
} from "@/services/supabase";
import type { Game } from "@/types/game";

export const useGameStore = defineStore("game", {
  state: () => ({
    currentGuess: "",
    recentGame: null as Game | null,
    pastGuesses: [] as { guess: string; similarity: number }[],
    numHints: 0, // Added number of hints
    hasGivenUp: false, // Track if user gave up the game
  }),
  persist: true,
  actions: {
    async fetchAndSetRecentGame() {
      const game = await getMostRecentGame();
      // Only reset if the fetched game is different from the current one
      if (
        game &&
        (!this.recentGame || game.game_id !== this.recentGame.game_id)
      ) {
        this.resetStore();
        this.recentGame = game;
      }
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
        // Get similarity data for the current guess
        const similarity = await getSimilarityByGameIdAndWord(
          this.recentGame.game_id,
          this.currentGuess
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
        if (this.pastGuesses.some(g => g.guess === similarity.matchedWord)) {
          return { success: false, error: "duplicate" };
        }
        
        // Add the correctly capitalized word to guesses
        this.pastGuesses.push({
          guess: similarity.matchedWord, // Use the correctly capitalized word that got the best match
          similarity: similarity.similarity,
        });
        this.currentGuess = "";
        return { success: true };
      }
      return { success: false, error: "not_found" };
    },
    resetStore() {
      this.currentGuess = "";
      this.recentGame = null;
      this.pastGuesses = [];
      this.numHints = 0;
      this.hasGivenUp = false;
    },
    async getHint() {
      if (!this.recentGame) return;
      const guessedRanks = this.pastGuesses.map((g) => g.similarity);
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

      const hint = await import("@/services/supabase").then((m) =>
        m.getHintForGame(this.recentGame!.game_id, nextHintRank)
      );
      if (hint && hint.word) {
        this.pastGuesses.push({
          guess: hint.word,
          similarity: hint.similarity!,
        });
        this.numHints++;
      }
    },
    async giveUp() {
      if (!this.recentGame || this.hasGivenUp || this.solution) return;

      // Get the solution word (rank 1)
      const solution = await import("@/services/supabase").then((m) =>
        m.getHintForGame(this.recentGame!.game_id, 1)
      );
      if (solution && solution.word) {
        this.pastGuesses.push({ guess: solution.word, similarity: 1 });
        this.hasGivenUp = true;
      }
    },
  },
  getters: {
    mostRecentGuess(state) {
      if (state.pastGuesses.length === 0) return null;
      return state.pastGuesses[state.pastGuesses.length - 1];
    },
    solution(state): string | null {
      // if the pastGuesses include the word that has similarity 1, return it
      const solutionGuess = state.pastGuesses.find((g) => g.similarity === 1);
      if (solutionGuess) {
        return solutionGuess.guess;
      }
      return null;
    },
    isGameOver(state): boolean {
      return this.solution !== null || state.hasGivenUp;
    },
  },
});
