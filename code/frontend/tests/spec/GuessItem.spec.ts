import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import GuessItem from "../../src/components/GuessHistory/GuessItem.vue";

describe("GuessItem.vue", () => {
  let pinia: any;

  const mountComponent = (props: any = {}) => {
    return mount(GuessItem, {
      props: {
        guess: "test",
        similarity: 100,
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

  it("renders guess word", () => {
    const wrapper = mountComponent({ guess: "example", similarity: 50 });
    expect(wrapper.text()).toContain("example");
  });

  it("renders similarity rank", () => {
    const wrapper = mountComponent({ guess: "test", similarity: 123 });
    expect(wrapper.text()).toContain("123");
  });

  it("applies highlight styling when highlighted", () => {
    const wrapper = mountComponent({ highlight: true });
    const card = wrapper.find('[data-testid="guess-item"]');
    expect(card.attributes("style")).toContain("border: 2px solid");
  });

  it("does not apply highlight styling when not highlighted", () => {
    const wrapper = mountComponent({ highlight: false });
    const card = wrapper.find('[data-testid="guess-item"]');
    // When highlight is false, there should be no inline style or different styling
    const style = card.attributes("style");
    // Since Vue may not render empty style objects, we check that it's either empty or contains border: none
    expect(style === undefined || style === "" || style.includes("border: none")).toBe(true);
  });

  it("applies correct color class for very close words (rank ≤ 300)", () => {
    const wrapper = mountComponent({ similarity: 100 });
    const progressBar = wrapper.find(".bg-success");
    expect(progressBar.exists()).toBe(true);
  });

  it("applies correct color class for close words (rank 300-1500)", () => {
    const wrapper = mountComponent({ similarity: 800 });
    const progressBar = wrapper.find(".bg-orange-400");
    expect(progressBar.exists()).toBe(true);
  });

  it("applies correct color class for far words (rank > 1500)", () => {
    const wrapper = mountComponent({ similarity: 2000 });
    const progressBar = wrapper.find(".bg-red-500");
    expect(progressBar.exists()).toBe(true);
  });

  it("shows progress bar when similarity is provided", () => {
    const wrapper = mountComponent({ similarity: 500 });
    const progressBar = wrapper.find(".absolute.left-0.bottom-0");
    expect(progressBar.exists()).toBe(true);
  });

  it("shows similarity when provided", () => {
    const wrapper = mountComponent({ similarity: 100 });
    expect(wrapper.text()).toContain("test");
    expect(wrapper.text()).toContain("100");
  });
});
