import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    themePreference: "system" as "light" | "dark" | "system",
  }),
  persist: true,
});
