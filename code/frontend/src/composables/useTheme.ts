import { useSettingsStore } from "@/stores/settings.store";
import { computed, ref, watch } from "vue";

// Global reactive theme state
const currentTheme = ref<"light" | "dark">("light");

// Function to get system theme preference
const getSystemTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light"; // fallback
};

// Function to update current theme based on preference
const updateCurrentTheme = (themePreference: "light" | "dark" | "system") => {
  const resolvedTheme = themePreference === "system" ? getSystemTheme() : themePreference;
  currentTheme.value = resolvedTheme;
};

// Set up system theme change listener (only once)
let systemThemeListenerSetup = false;

export const useTheme = () => {
  const settingsStore = useSettingsStore();

  // Set up system theme change listener if not already done
  if (!systemThemeListenerSetup && typeof window !== "undefined" && window.matchMedia) {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", () => {
      if (settingsStore.themePreference === "system") {
        updateCurrentTheme("system");
      }
    });
    systemThemeListenerSetup = true;
  }

  // Watch for theme preference changes
  watch(
    () => settingsStore.themePreference,
    (newPreference) => {
      if (newPreference) {
        updateCurrentTheme(newPreference);
      }
    },
    { immediate: true },
  );

  // Computed properties for convenience
  const isDark = computed(() => currentTheme.value === "dark");
  const isLight = computed(() => currentTheme.value === "light");
  const logoSrc = computed(() =>
    currentTheme.value === "dark" ? "/favicon_dark.svg" : "/favicon.svg",
  );

  return {
    currentTheme: computed(() => currentTheme.value),
    isDark,
    isLight,
    logoSrc,
    themePreference: computed(() => settingsStore.themePreference),
  };
};
