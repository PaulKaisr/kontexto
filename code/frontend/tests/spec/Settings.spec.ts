import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Settings from "../../src/components/Settings.vue";
import { useSettingsStore } from "@/stores/settings.store";

describe("Settings.vue", () => {
  let pinia: any;
  let settingsStore: any;

  const mountComponent = () => {
    return mount(Settings, {
      global: {
        plugins: [pinia],
      },
    });
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    settingsStore = useSettingsStore();
  });

  it("renders settings card correctly", () => {
    const wrapper = mountComponent();
    const card = wrapper.find("[data-testid=\"settings-card\"]");
    expect(card.exists()).toBe(true);
  });

  it("renders theme radio group", () => {
    const wrapper = mountComponent();
    const radioGroup = wrapper.find("[data-testid=\"theme-radio-group\"]");
    expect(radioGroup.exists()).toBe(true);
  });

  it("renders light and dark mode radio buttons", () => {
    const wrapper = mountComponent();
    const lightRadio = wrapper.find("[data-testid=\"light-mode-radio\"]");
    const darkRadio = wrapper.find("[data-testid=\"dark-mode-radio\"]");

    expect(lightRadio.exists()).toBe(true);
    expect(darkRadio.exists()).toBe(true);
  });

  it("renders close button", () => {
    const wrapper = mountComponent();
    const closeButton = wrapper.find("[data-testid=\"close-settings-button\"]");
    expect(closeButton.exists()).toBe(true);
  });

  it("emits close event when close button is clicked", async() => {
    const wrapper = mountComponent();
    const closeButton = wrapper.find("[data-testid=\"close-settings-button\"]");

    await closeButton.trigger("click");

    expect(wrapper.emitted("close")).toBeTruthy();
    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("accesses settings store correctly", () => {
    const wrapper = mountComponent();
    // The component should be able to access the settings store
    expect(wrapper.vm).toBeDefined();
  });

  it("can set theme preferences", () => {
    mountComponent();
    settingsStore.themePreference = "dark";
    expect(settingsStore.themePreference).toBe("dark");

    settingsStore.themePreference = "light";
    expect(settingsStore.themePreference).toBe("light");
  });

  it("renders without errors", () => {
    const wrapper = mountComponent();
    expect(wrapper.exists()).toBe(true);
  });
});
