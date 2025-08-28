import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import GuessHistory from "../../src/components/GuessHistory/GuessHistory.vue";

describe("GuessHistory.vue", () => {
  let pinia: any;

  const mountComponent = (props: any = {}) => {
    return mount(GuessHistory, {
      props: {
        guesses: [],
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

  it("renders guess history container", () => {
    const wrapper = mountComponent();
    const container = wrapper.find('[data-testid="guess-history"]');
    expect(container.exists()).toBe(true);
  });

  it("renders no guess items when guesses array is empty", () => {
    const wrapper = mountComponent({ guesses: [] });
    const guessItems = wrapper.findAll('[data-testid="guess-item"]');
    expect(guessItems).toHaveLength(0);
  });

  it("renders correct number of guess items", () => {
    const guesses = [
      { guess: "word1", similarity: 100 },
      { guess: "word2", similarity: 200 },
      { guess: "word3", similarity: 50 },
    ];
    const wrapper = mountComponent({ guesses });
    const guessItems = wrapper.findAll('[data-testid="guess-item"]');
    expect(guessItems).toHaveLength(3);
  });

  it("sorts guesses by similarity (ascending)", () => {
    const guesses = [
      { guess: "word1", similarity: 300 },
      { guess: "word2", similarity: 100 },
      { guess: "word3", similarity: 200 },
    ];
    const wrapper = mountComponent({ guesses });

    // The component should render them in order: word2 (100), word3 (200), word1 (300)
    const guessItems = wrapper.findAll('[data-testid="guess-item"]');
    expect(guessItems[0].text()).toContain("word2");
    expect(guessItems[1].text()).toContain("word3");
    expect(guessItems[2].text()).toContain("word1");
  });

  it("highlights the last guess when provided", () => {
    const guesses = [
      { guess: "word1", similarity: 100 },
      { guess: "word2", similarity: 200 },
    ];
    const lastGuess = { guess: "word2", similarity: 200 };

    const wrapper = mountComponent({ guesses, lastGuess });
    const highlightedItems = wrapper
      .findAll('[data-testid="guess-item"]')
      .filter((item) => item.attributes("style")?.includes("border: 2px solid"));

    expect(highlightedItems).toHaveLength(1);
  });

  it("does not highlight any guess when lastGuess is not provided", () => {
    const guesses = [
      { guess: "word1", similarity: 100 },
      { guess: "word2", similarity: 200 },
    ];

    const wrapper = mountComponent({ guesses });
    const highlightedItems = wrapper
      .findAll('[data-testid="guess-item"]')
      .filter((item) => item.attributes("style")?.includes("border: 2px solid"));

    expect(highlightedItems).toHaveLength(0);
  });
});
