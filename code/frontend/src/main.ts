/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Analytics
import { inject } from "@vercel/analytics";

// Styles
import "unfonts.css";

const app = createApp(App);

registerPlugins(app);

if (import.meta.env.PROD) {
  inject();
}

app.mount("#app");
