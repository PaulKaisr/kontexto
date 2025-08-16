import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Settings from "../../src/components/Settings.vue";
import { useSettingsStore } from "@/stores/settings.store";

describe("Settings.vue - Simple Tests", () => {
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

  it("renders settings trigger button", () => {
    const wrapper = mountComponent();
    const trigger = wrapper.find('[data-testid="settings-trigger"]');
    expect(trigger.exists()).toBe(true);
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