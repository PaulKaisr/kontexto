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

// Styles
import "unfonts.css";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");

// Defer analytics loading to after app mount to improve FCP
if (import.meta.env.PROD) {
  // Use requestIdleCallback to load analytics when browser is idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(async () => {
      const { inject } = await import("@vercel/analytics");
      inject();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(async () => {
      const { inject } = await import("@vercel/analytics");
      inject();
    }, 100);
  }
}
