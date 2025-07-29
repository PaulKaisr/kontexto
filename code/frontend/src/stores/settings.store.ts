import {defineStore} from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    themePreference: null as 'light' | 'dark' | null,
  }),
  persist: true,
})
