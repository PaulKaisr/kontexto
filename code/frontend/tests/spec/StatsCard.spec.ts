import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import StatsCard from "../../src/components/StatsCard.vue";
import { useGameStore } from "@/stores/game.store";

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
});

describe("StatsCard.vue", () => {
  let pinia: any;
  let gameStore: any;

  const mountComponent = () => {
    return mount(StatsCard, {
      global: {
        plugins: [pinia],
      },
    });
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    gameStore = useGameStore();

    // Set up default game state with new structure
    gameStore.recentGame = { game_id: 42, date: "2025-01-01" };
    gameStore.gamesProgress = {
      42: {
        gameId: 42,
        guesses: [
          { guess: "word1", similarity: 100 },
          { guess: "word2", similarity: 500 },
          { guess: "testword", similarity: 1 }, // This makes testword the solution
        ],
        numHints: 1,
        hasGivenUp: false,
        lastPlayed: new Date().toISOString(),
      },
    };
  });

  it("renders stats card", () => {
    const wrapper = mountComponent();
    const card = wrapper.find('[data-testid="stats-card"]');
    expect(card.exists()).toBe(true);
  });

  it("shows congratulations message when game is won", () => {
    gameStore.gamesProgress[42].hasGivenUp = false;
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Glückwunsch!");
  });

  it("shows give up message when game is given up", () => {
    gameStore.gamesProgress[42].hasGivenUp = true;
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Aufgegeben!");
  });

  it("displays game day and solution word", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Tag 42");
    expect(wrapper.text()).toContain("testword");
  });

  it("calculates attempts correctly when won", () => {
    gameStore.gamesProgress[42] = {
      gameId: 42,
      guesses: [
        { guess: "word1", similarity: 100 },
        { guess: "word2", similarity: 500 },
        { guess: "word3", similarity: 1 }, // winning guess
      ],
      numHints: 1,
      hasGivenUp: false,
      lastPlayed: new Date().toISOString(),
    };

    const wrapper = mountComponent();
    // Should show 2 attempts (3 guesses - 1 hint)
    expect(wrapper.text()).toContain("2 Versuchen");
  });

  it("calculates attempts correctly when given up", () => {
    gameStore.gamesProgress[42] = {
      gameId: 42,
      guesses: [
        { guess: "word1", similarity: 100 },
        { guess: "word2", similarity: 500 },
        { guess: "word3", similarity: 2000 },
      ],
      numHints: 1,
      hasGivenUp: true,
      lastPlayed: new Date().toISOString(),
    };

    const wrapper = mountComponent();
    // Should show 1 attempt (3 guesses - 1 hint - 1 for give up)
    expect(wrapper.text()).toContain("1 Versuche");
  });

  it("displays number of hints used", () => {
    gameStore.gamesProgress[42].numHints = 2;
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("2 Hinweise");
  });

  it("generates color chart correctly", () => {
    gameStore.gamesProgress[42].guesses = [
      { guess: "green1", similarity: 100 }, // green
      { guess: "green2", similarity: 200 }, // green
      { guess: "yellow1", similarity: 800 }, // yellow
      { guess: "orange1", similarity: 2500 }, // orange
      { guess: "red1", similarity: 4000 }, // red
    ];

    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("🟩 : 2");
    expect(wrapper.text()).toContain("🟨 : 1");
    expect(wrapper.text()).toContain("🟧 : 1");
    expect(wrapper.text()).toContain("🟥 : 1");
  });

  it("shows share button", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Teilen");
  });

  it("shows closest words button", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Ähnlichste Wörter");
  });

  it("shows previous games button", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Frühere Spiele");
  });

  it("copies stats to clipboard when share button is clicked", async () => {
    const wrapper = mountComponent();
    const shareButtons = wrapper.findAll("button");
    const shareButton = shareButtons.find((button) =>
      button.text().includes("Teilen")
    );
    expect(shareButton).toBeDefined();

    await shareButton!.trigger("click");
    await wrapper.vm.$nextTick(); // Wait for Vue reactivity

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    const clipboardText = (navigator.clipboard.writeText as any).mock
      .calls[0][0];
    expect(clipboardText).toContain("Kontexto-Rätsel von Tag 42");
    expect(clipboardText).toContain("testword");
  });

  it("changes button text after copying", async () => {
    const wrapper = mountComponent();
    const shareButtons = wrapper.findAll("button");
    const shareButton = shareButtons.find((button) =>
      button.text().includes("Teilen")
    );
    expect(shareButton).toBeDefined();

    await shareButton!.trigger("click");
    await wrapper.vm.$nextTick(); // Wait for Vue reactivity

    expect(wrapper.text()).toContain("Kopiert");
  });

  it("has closest words button that can be clicked", async () => {
    const wrapper = mountComponent();
    const buttons = wrapper.findAll("button");
    const closestWordsButton = buttons.find((button) =>
      button.text().includes("Ähnlichste Wörter")
    );
    expect(closestWordsButton).toBeDefined();

    // Just verify we can click it without error
    await closestWordsButton!.trigger("click");
    // Dialog testing is complex in jsdom, so we just verify the click works
  });

  it("has previous games button that can be clicked", async () => {
    const wrapper = mountComponent();
    const buttons = wrapper.findAll("button");
    const previousGamesButton = buttons.find((button) =>
      button.text().includes("Frühere Spiele")
    );
    expect(previousGamesButton).toBeDefined();

    // Just verify we can click it without error
    await previousGamesButton!.trigger("click");
    // Dialog testing is complex in jsdom, so we just verify the click works
  });
});
