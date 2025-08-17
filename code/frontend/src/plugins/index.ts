/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "../router";

// Types
import type { App } from "vue";
import { createPinia } from "pinia";

export function registerPlugins(app: App) {
  app.use(vuetify);
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);
  app.use(router);
}
