/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'

// Types
import type {App} from 'vue'
import {createPinia} from "pinia";

export function registerPlugins(app: App) {
  app.use(vuetify)
  app.use(createPinia())
}
