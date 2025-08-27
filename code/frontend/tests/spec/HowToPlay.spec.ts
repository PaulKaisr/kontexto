import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import HowToPlay from "../../src/components/HowToPlay.vue";

describe("HowToPlay.vue", () => {
  let pinia: any;

  const mountComponent = () => {
    return mount(HowToPlay, {
      global: {
        plugins: [pinia],
      },
    });
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it("renders how to play card", () => {
    const wrapper = mountComponent();
    const card = wrapper.find('[data-testid="how-to-play"]');
    expect(card.exists()).toBe(true);
  });

  it("displays the main title", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Wie spielt man Kontexto?");
  });

  it("displays game objective section", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Spielziel");
    expect(wrapper.text()).toContain("Errate das geheime Wort des Tages!");
  });

  it("displays how it works section", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Wie funktioniert's?");
    expect(wrapper.text()).toContain("Gib ein deutsches Wort ein");
    expect(wrapper.text()).toContain("semantischer Ähnlichkeit");
  });

  it("displays color code section", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Farbcode");
    expect(wrapper.text()).toContain("Weit entfernt");
    expect(wrapper.text()).toContain("Etwas näher");
    expect(wrapper.text()).toContain("Näher dran");
    expect(wrapper.text()).toContain("Sehr nah");
    expect(wrapper.text()).toContain("Gefunden!");
  });

  it("displays hints section", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Hinweise");
    expect(wrapper.text()).toContain("Du kannst jederzeit einen Hinweis erhalten");
  });

  it("displays tips section", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Tipps");
    expect(wrapper.text()).toContain("Denke an Synonyme");
    expect(wrapper.text()).toContain("verschiedene Wortarten");
    expect(wrapper.text()).toContain("Statistikleiste");
    expect(wrapper.text()).toContain("nur einmal geraten");
  });

  it("displays technical note", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Technischer Hinweis");
    expect(wrapper.text()).toContain("FastText-Worteinbettungen");
  });

  it("displays close button", () => {
    const wrapper = mountComponent();
    const closeButton = wrapper.find('[data-testid="close-button"]');
    expect(closeButton.exists()).toBe(true);
    expect(closeButton.text()).toContain("Schließen");
  });

  it("emits close event when close button is clicked", async () => {
    const wrapper = mountComponent();
    const closeButton = wrapper.find('[data-testid="close-button"]');

    await closeButton.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("close");
    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("renders all color chips", () => {
    const wrapper = mountComponent();
    const chips = wrapper.findAll(".v-chip");

    // Should have chips for red, orange, yellow, green, and success
    expect(chips.length).toBeGreaterThanOrEqual(5);
  });

  it("contains proper rank information for each color", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain("Rang > 3000");
    expect(wrapper.text()).toContain("1500 - 3000");
    expect(wrapper.text()).toContain("300 - 1500");
    expect(wrapper.text()).toContain("Rang ≤ 300");
    expect(wrapper.text()).toContain("Rang 1");
  });

  it("displays proper icons", () => {
    const wrapper = mountComponent();
    const icons = wrapper.findAll(".v-icon");

    // Should have multiple icons for different sections
    expect(icons.length).toBeGreaterThan(10);
  });
});
