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

// Initialize Vercel Analytics
// Will only track in production due to Vercel's domain restrictions
inject();

app.mount("#app");
