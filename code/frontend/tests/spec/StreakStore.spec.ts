import { describe, it, expect, beforeEach, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useStreakStore } from "../../src/stores/streak.store";
import { useGameStore, GameState } from "../../src/stores/game.store";
import * as supabaseService from "../../src/services/supabase";

// Mock the supabase service
vi.mock("../../src/services/supabase", () => ({
  getAllGames: vi.fn(),
}));

describe("StreakStore", () => {
  let pinia: any;
  let streakStore: ReturnType<typeof useStreakStore>;
  let gameStore: ReturnType<typeof useGameStore>;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    streakStore = useStreakStore();
    gameStore = useGameStore();
    
    // Clear any existing state
    streakStore.resetStreak();
    gameStore.resetStore();
  });

  describe("streak calculation", () => {
    it("calculates streak of 0 when no games exist", async () => {
      vi.mocked(supabaseService.getAllGames).mockResolvedValue([]);
      
      await streakStore.calculateStreak();
      
      expect(streakStore.currentStreak).toBe(0);
    });

    it("calculates streak of 1 for single completed game today", async () => {
      const today = new Date().toISOString().split('T')[0];
      
      vi.mocked(supabaseService.getAllGames).mockResolvedValue([
        { game_id: 1, date: today }
      ]);
      
      // Mock game as completed
      gameStore.gamesProgress[1] = {
        gameId: 1,
        guesses: [{ guess: "test", similarity: 1 }], // Solved
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString()
      };
      
      await streakStore.calculateStreak();
      
      expect(streakStore.currentStreak).toBe(1);
    });

    it("calculates streak of 0 when today's game exists but is not completed", async () => {
      const today = new Date().toISOString().split('T')[0];
      
      vi.mocked(supabaseService.getAllGames).mockResolvedValue([
        { game_id: 1, date: today }
      ]);
      
      // Mock game as not completed (no solution guess)
      gameStore.gamesProgress[1] = {
        gameId: 1,
        guesses: [{ guess: "test", similarity: 500 }], // Not solved
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString()
      };
      
      await streakStore.calculateStreak();
      
      expect(streakStore.currentStreak).toBe(0);
    });

    it("calculates consecutive streak correctly", async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      
      vi.mocked(supabaseService.getAllGames).mockResolvedValue([
        { game_id: 3, date: today.toISOString().split('T')[0] },
        { game_id: 2, date: yesterday.toISOString().split('T')[0] },
        { game_id: 1, date: twoDaysAgo.toISOString().split('T')[0] }
      ]);
      
      // Mock all games as completed
      gameStore.gamesProgress[3] = {
        gameId: 3,
        guesses: [{ guess: "test", similarity: 1 }],
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString()
      };
      gameStore.gamesProgress[2] = {
        gameId: 2,
        guesses: [{ guess: "test", similarity: 1 }],
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString()
      };
      gameStore.gamesProgress[1] = {
        gameId: 1,
        guesses: [{ guess: "test", similarity: 1 }],
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString()
      };
      
      await streakStore.calculateStreak();
      
      expect(streakStore.currentStreak).toBe(3);
    });

    it("breaks streak when a day is missed", async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const threeDaysAgo = new Date(today);
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3); // Skip day -2
      
      vi.mocked(supabaseService.getAllGames).mockResolvedValue([
        { game_id: 3, date: today.toISOString().split('T')[0] },
        { game_id: 2, date: yesterday.toISOString().split('T')[0] },
        { game_id: 1, date: threeDaysAgo.toISOString().split('T')[0] }
      ]);
      
      // Mock all games as completed
      gameStore.gamesProgress[3] = {
        gameId: 3,
        guesses: [{ guess: "test", similarity: 1 }],
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString()
      };
      gameStore.gamesProgress[2] = {
        gameId: 2,
        guesses: [{ guess: "test", similarity: 1 }],
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString()
      };
      gameStore.gamesProgress[1] = {
        gameId: 1,
        guesses: [{ guess: "test", similarity: 1 }],
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString()
      };
      
      await streakStore.calculateStreak();
      
      expect(streakStore.currentStreak).toBe(2); // Only today and yesterday
    });

    it("breaks streak when a game exists but was not completed", async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      
      vi.mocked(supabaseService.getAllGames).mockResolvedValue([
        { game_id: 3, date: today.toISOString().split('T')[0] },
        { game_id: 2, date: yesterday.toISOString().split('T')[0] },
        { game_id: 1, date: twoDaysAgo.toISOString().split('T')[0] }
      ]);
      
      // Mock today and two days ago as completed, yesterday as not completed
      gameStore.gamesProgress[3] = {
        gameId: 3,
        guesses: [{ guess: "test", similarity: 1 }],
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString()
      };
      gameStore.gamesProgress[2] = {
        gameId: 2,
        guesses: [{ guess: "test", similarity: 500 }], // Not completed
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString()
      };
      gameStore.gamesProgress[1] = {
        gameId: 1,
        guesses: [{ guess: "test", similarity: 1 }],
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString()
      };
      
      await streakStore.calculateStreak();
      
      expect(streakStore.currentStreak).toBe(1); // Only today
    });

    it("counts given up games as completed for streak", async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      vi.mocked(supabaseService.getAllGames).mockResolvedValue([
        { game_id: 2, date: today.toISOString().split('T')[0] },
        { game_id: 1, date: yesterday.toISOString().split('T')[0] }
      ]);
      
      // Mock today as solved, yesterday as given up
      gameStore.gamesProgress[2] = {
        gameId: 2,
        guesses: [{ guess: "test", similarity: 1 }],
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString()
      };
      gameStore.gamesProgress[1] = {
        gameId: 1,
        guesses: [{ guess: "solution", similarity: 1 }],
        numHints: 0,
        hasGivenUp: true, // Given up
        lastPlayed: new Date().toISOString()
      };
      
      await streakStore.calculateStreak();
      
      expect(streakStore.currentStreak).toBe(2);
    });
  });

  describe("longest streak tracking", () => {
    it("updates longest streak when current streak exceeds it", async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      vi.mocked(supabaseService.getAllGames).mockResolvedValue([
        { game_id: 2, date: today.toISOString().split('T')[0] },
        { game_id: 1, date: yesterday.toISOString().split('T')[0] }
      ]);
      
      gameStore.gamesProgress[2] = {
        gameId: 2,
        guesses: [{ guess: "test", similarity: 1 }],
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString()
      };
      gameStore.gamesProgress[1] = {
        gameId: 1,
        guesses: [{ guess: "test", similarity: 1 }],
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString()
      };
      
      // Initial calculation
      streakStore.longestStreak = 1; // Set a previous longest
      await streakStore.calculateStreak();
      
      expect(streakStore.currentStreak).toBe(2);
      expect(streakStore.longestStreak).toBe(2);
    });

    it("does not decrease longest streak when current is lower", async () => {
      vi.mocked(supabaseService.getAllGames).mockResolvedValue([]);
      
      streakStore.longestStreak = 5; // Set a higher longest streak
      await streakStore.calculateStreak();
      
      expect(streakStore.currentStreak).toBe(0);
      expect(streakStore.longestStreak).toBe(5); // Should remain unchanged
    });
  });

  describe("display text getters", () => {
    it("returns correct display text for zero streak", () => {
      streakStore.currentStreak = 0;
      expect(streakStore.streakDisplayText).toBe("Keine Serie");
    });

    it("returns correct display text for single day streak", () => {
      streakStore.currentStreak = 1;
      expect(streakStore.streakDisplayText).toBe("1 Tag Serie");
    });

    it("returns correct display text for multi-day streak", () => {
      streakStore.currentStreak = 5;
      expect(streakStore.streakDisplayText).toBe("5 Tage Serie");
    });

    it("returns correct longest streak display text for zero", () => {
      streakStore.longestStreak = 0;
      expect(streakStore.longestStreakDisplayText).toBe("Längste Serie: 0 Tage");
    });

    it("returns correct longest streak display text for single day", () => {
      streakStore.longestStreak = 1;
      expect(streakStore.longestStreakDisplayText).toBe("Längste Serie: 1 Tag");
    });

    it("returns correct longest streak display text for multiple days", () => {
      streakStore.longestStreak = 10;
      expect(streakStore.longestStreakDisplayText).toBe("Längste Serie: 10 Tage");
    });
  });

  describe("store actions", () => {
    it("resets streak data correctly", () => {
      streakStore.currentStreak = 5;
      streakStore.longestStreak = 8;
      streakStore.lastUpdated = "2023-01-01T00:00:00.000Z";
      
      streakStore.resetStreak();
      
      expect(streakStore.currentStreak).toBe(0);
      expect(streakStore.longestStreak).toBe(0);
      expect(streakStore.lastUpdated).toBeNull();
    });

    it("updateStreakOnGameComplete calls calculateStreak", async () => {
      const calculateStreakSpy = vi.spyOn(streakStore, "calculateStreak");
      vi.mocked(supabaseService.getAllGames).mockResolvedValue([]);
      
      await streakStore.updateStreakOnGameComplete();
      
      expect(calculateStreakSpy).toHaveBeenCalledOnce();
    });
  });

  describe("edge cases", () => {
    it("handles null dates gracefully", async () => {
      vi.mocked(supabaseService.getAllGames).mockResolvedValue([
        { game_id: 1, date: null }
      ]);
      
      await streakStore.calculateStreak();
      
      expect(streakStore.currentStreak).toBe(0);
    });

    it("handles games without progress data", async () => {
      const today = new Date().toISOString().split('T')[0];
      
      vi.mocked(supabaseService.getAllGames).mockResolvedValue([
        { game_id: 1, date: today }
      ]);
      
      // Don't add game to gamesProgress (no progress data)
      await streakStore.calculateStreak();
      
      expect(streakStore.currentStreak).toBe(0);
    });

    it("handles API error gracefully", async () => {
      vi.mocked(supabaseService.getAllGames).mockResolvedValue(null);
      
      await streakStore.calculateStreak();
      
      expect(streakStore.currentStreak).toBe(0);
    });
  });
});