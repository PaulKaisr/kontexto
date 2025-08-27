import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Game from "../../src/components/Game.vue";
import { useGameStore } from "@/stores/game.store";

// Mock the useTheme composable
vi.mock("@/composables/useTheme", () => ({
  useTheme: () => ({
    logoSrc: { value: "/favicon.svg" },
  }),
}));

describe("Game.vue", () => {
  let pinia: any;
  let gameStore: any;
  let wrapper: any;

  const mountComponent = () => {
    return mount(Game, {
      global: {
        plugins: [pinia],
      },
    });
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    gameStore = useGameStore();

    // Mock store methods
    gameStore.submitGuess = vi.fn();
    gameStore.getHint = vi.fn();
    gameStore.giveUp = vi.fn();
    gameStore.fetchAndSetRecentGame = vi.fn();

    // Reset store state
    gameStore.$reset();

    // Mount component for each test
    wrapper = mountComponent();
  });

  it("renders the game title", () => {
    // Check for the logo image
    const logo = wrapper.find('img[alt="Kontexto Logo"]');
    expect(logo.exists()).toBe(true);

    // Check for the complete title text (including screen reader text)
    expect(wrapper.text()).toContain("Kontexto");
  });

  it("renders the text input field", () => {
    const textField = wrapper.find(".v-text-field");
    expect(textField.exists()).toBe(true);
  });

  it("does not show stats card when game is not over", () => {
    expect(wrapper.find("[data-testid=stats-card]").exists()).toBe(false);
  });

  it("shows stats card when game is over", () => {
    // Set up a game with a winning state
    gameStore.recentGame = { game_id: 1, date: "2025-01-01" };
    gameStore.gamesProgress = {
      1: {
        gameId: 1,
        guesses: [{ guess: "test", similarity: 1 }],
        numHints: 0,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString(),
      },
    };

    // Remount component to reflect the state change
    wrapper = mountComponent();

    expect(wrapper.find("[data-testid=stats-card]").exists()).toBe(true);
  });

  it("calls submitGuess when Enter is pressed", async () => {
    gameStore.submitGuess.mockResolvedValue({ success: true });

    const textField = wrapper.find(".v-text-field input");
    await textField.trigger("keyup.enter");
    await wrapper.vm.$nextTick(); // Wait for Vue reactivity

    expect(gameStore.submitGuess).toHaveBeenCalled();
  });
});
