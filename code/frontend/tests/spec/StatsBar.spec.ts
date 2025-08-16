import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import StatsBar from "../../src/components/StatsBar.vue";

describe("StatsBar.vue", () => {
  let pinia: any;

  const mountComponent = (props: any = {}) => {
    return mount(StatsBar, {
      props: {
        gameId: 42,
        numGuesses: 5,
        numHints: 2,
        ...props,
      },
      global: {
        plugins: [pinia],
      },
    });
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it("renders stats bar", () => {
    const wrapper = mountComponent();
    const statsBar = wrapper.find('[data-testid="stats-bar"]');
    expect(statsBar.exists()).toBe(true);
  });

  it("displays game ID stat", () => {
    const wrapper = mountComponent({ gameId: 42 });
    const gameIdStat = wrapper.find('[data-testid="game-id-stat"]');
    expect(gameIdStat.exists()).toBe(true);
    expect(gameIdStat.text()).toContain("Spiel");
    expect(gameIdStat.text()).toContain("42");
  });

  it("displays dash when game ID is null", () => {
    const wrapper = mountComponent({ gameId: null });
    const gameIdStat = wrapper.find('[data-testid="game-id-stat"]');
    expect(gameIdStat.text()).toContain("-");
  });

  it("displays guesses stat", () => {
    const wrapper = mountComponent({ numGuesses: 7 });
    const guessesStat = wrapper.find('[data-testid="guesses-stat"]');
    expect(guessesStat.exists()).toBe(true);
    expect(guessesStat.text()).toContain("Versuche");
    expect(guessesStat.text()).toContain("7");
  });

  it("displays hints stat", () => {
    const wrapper = mountComponent({ numHints: 3 });
    const hintsStat = wrapper.find('[data-testid="hints-stat"]');
    expect(hintsStat.exists()).toBe(true);
    expect(hintsStat.text()).toContain("Hinweise");
    expect(hintsStat.text()).toContain("3");
  });

  it("displays zero values correctly", () => {
    const wrapper = mountComponent({ 
      gameId: 0, 
      numGuesses: 0, 
      numHints: 0 
    });
    
    expect(wrapper.find('[data-testid="game-id-stat"]').text()).toContain("0");
    expect(wrapper.find('[data-testid="guesses-stat"]').text()).toContain("0");
    expect(wrapper.find('[data-testid="hints-stat"]').text()).toContain("0");
  });

  it("has proper layout structure", () => {
    const wrapper = mountComponent();
    const statsBar = wrapper.find('[data-testid="stats-bar"]');
    
    // Should have flexbox layout classes
    expect(statsBar.classes()).toContain('flex');
    expect(statsBar.classes()).toContain('flex-row');
    expect(statsBar.classes()).toContain('justify-evenly');
  });

  it("displays all stat labels", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Spiel");
    expect(wrapper.text()).toContain("Versuche");
    expect(wrapper.text()).toContain("Hinweise");
  });
});