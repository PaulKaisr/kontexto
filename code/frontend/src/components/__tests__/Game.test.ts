import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Game from "../Game.vue";
import { useGameStore } from "@/stores/game.store";

// Mock child components to simplify testing
vi.mock("@/components/GuessHistory/GuessHistory.vue", () => ({
  default: { template: '<div data-testid="guess-history"></div>' },
}));
vi.mock("@/components/StatsBar.vue", () => ({
  default: { template: '<div data-testid="stats-bar"></div>' },
}));
vi.mock("@/components/GuessHistory/GuessItem.vue", () => ({
  default: { template: '<div data-testid="guess-item"></div>' },
}));
vi.mock("@/components/ContextMenu.vue", () => ({
  default: { template: '<div data-testid="context-menu"></div>' },
}));
vi.mock("@/components/StatsCard.vue", () => ({
  default: { template: '<div data-testid="stats-card"></div>' },
}));

describe("Game.vue", () => {
  let pinia: any;
  let gameStore: any;

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
  });

  it("renders the game title", () => {
    const wrapper = mount(Game, {
      global: {
        plugins: [pinia],
        stubs: {
          "v-text-field": {
            template:
              '<input type="text" @keyup.enter="$emit(\'keyup.enter\')" />',
          },
        },
      },
    });

    expect(wrapper.text()).toContain("Kontexto");
  });

  it("renders the text input field", () => {
    const wrapper = mount(Game, {
      global: {
        plugins: [pinia],
        stubs: {
          "v-text-field": {
            template:
              '<input type="text" @keyup.enter="$emit(\'keyup.enter\')" />',
          },
        },
      },
    });

    const textField = wrapper.find('input[type="text"]');
    expect(textField.exists()).toBe(true);
  });

  it("does not show stats card when game is not over", () => {
    const wrapper = mount(Game, {
      global: {
        plugins: [pinia],
        stubs: {
          "v-text-field": {
            template:
              '<input type="text" @keyup.enter="$emit(\'keyup.enter\')" />',
          },
        },
      },
    });

    expect(wrapper.find('[data-testid="stats-card"]').exists()).toBe(false);
  });

  it("shows stats card when game is over", () => {
    // Add a winning guess to trigger game over state
    gameStore.pastGuesses = [{ guess: "test", similarity: 1 }];

    const wrapper = mount(Game, {
      global: {
        plugins: [pinia],
        stubs: {
          "v-text-field": {
            template:
              '<input type="text" @keyup.enter="$emit(\'keyup.enter\')" />',
          },
        },
      },
    });

    expect(wrapper.find('[data-testid="stats-card"]').exists()).toBe(true);
  });

  it("calls submitGuess when Enter is pressed", async () => {
    gameStore.submitGuess.mockResolvedValue({ success: true });

    const wrapper = mount(Game, {
      global: {
        plugins: [pinia],
        stubs: {
          "v-text-field": {
            template:
              '<input type="text" @keyup.enter="$emit(\'keyup.enter\')" />',
          },
        },
      },
    });

    const textField = wrapper.find('input[type="text"]');
    await textField.trigger("keyup.enter");

    expect(gameStore.submitGuess).toHaveBeenCalled();
  });
});
