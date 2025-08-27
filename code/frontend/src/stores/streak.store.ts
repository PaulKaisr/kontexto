import { getAllGames } from "@/services/supabase";
import { GameState, useGameStore } from "@/stores/game.store";
import { defineStore } from "pinia";

export const useStreakStore = defineStore("streak", {
  state: () => ({
    currentStreak: 0,
    longestStreak: 0,
    lastUpdated: null as string | null,
  }),
  persist: true,
  actions: {
    /**
     * Calculates the current streak based on completed games.
     * A streak is consecutive days with completed games (solved or given up).
     * Missing a day (game exists but not completed) breaks the streak.
     */
    async calculateStreak() {
      const gameStore = useGameStore();

      // Get all available games
      const allGames = await getAllGames();
      if (!allGames || allGames.length === 0) {
        this.currentStreak = 0;
        return;
      }

      // Sort games by date ascending (oldest first) for streak calculation
      const sortedGames = [...allGames].sort(
        (a, b) => new Date(a.date || "").getTime() - new Date(b.date || "").getTime(),
      );

      // Get today's date for comparison
      const today = new Date().toISOString().split("T")[0];
      const todayDate = new Date(today);

      let currentStreak = 0;
      let tempLongestStreak = 0;

      // Start from the most recent date and work backwards
      const currentDate = new Date(todayDate);

      // Check if today's game exists and is completed
      const todaysGame = sortedGames.find((game) => game.date === today);
      let includeToday = false;

      if (todaysGame) {
        const todaysState = gameStore.getGameState(todaysGame.game_id);
        includeToday = todaysState === GameState.SOLVED || todaysState === GameState.GIVEN_UP;
      }

      // Start checking from today (or yesterday if today is not completed)
      if (!includeToday) {
        currentDate.setDate(currentDate.getDate() - 1);
      }

      // Go backwards day by day to count consecutive completed games
      while (true) {
        const dateStr = currentDate.toISOString().split("T")[0];

        // Find game for this date
        const gameForDate = sortedGames.find((game) => game.date === dateStr);

        if (!gameForDate) {
          // No game exists for this date, break the streak
          break;
        }

        // Check if this game was completed
        const gameState = gameStore.getGameState(gameForDate.game_id);
        const isCompleted = gameState === GameState.SOLVED || gameState === GameState.GIVEN_UP;

        if (!isCompleted) {
          // Game exists but wasn't completed, break the streak
          break;
        }

        // This day counts toward the streak
        currentStreak++;

        // Move to previous day
        currentDate.setDate(currentDate.getDate() - 1);
      }

      // Update longest streak if current is higher
      tempLongestStreak = Math.max(this.longestStreak, currentStreak);

      this.currentStreak = currentStreak;
      this.longestStreak = tempLongestStreak;
      this.lastUpdated = new Date().toISOString();
    },

    /**
     * Updates the streak when a game is completed.
     * Should be called whenever a player solves or gives up on a game.
     */
    async updateStreakOnGameComplete() {
      await this.calculateStreak();
    },

    /**
     * Resets all streak data (for testing/debugging purposes)
     */
    resetStreak() {
      this.currentStreak = 0;
      this.longestStreak = 0;
      this.lastUpdated = null;
    },
  },
  getters: {
    /**
     * Gets streak display text for UI
     */
    streakDisplayText(): string {
      if (this.currentStreak === 0) {
        return "Keine Serie";
      } else if (this.currentStreak === 1) {
        return "1 Tag Serie";
      } else {
        return `${this.currentStreak} Tage Serie`;
      }
    },

    /**
     * Gets longest streak display text for UI
     */
    longestStreakDisplayText(): string {
      if (this.longestStreak === 0) {
        return "Längste Serie: 0 Tage";
      } else if (this.longestStreak === 1) {
        return "Längste Serie: 1 Tag";
      } else {
        return `Längste Serie: ${this.longestStreak} Tage`;
      }
    },
  },
});
