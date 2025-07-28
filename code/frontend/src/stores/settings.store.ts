import {defineStore} from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    darkMode: false // default is light mode
  }),
  persist: true,
})

