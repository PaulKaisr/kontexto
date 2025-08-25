// Plugins
import Components from "unplugin-vue-components/vite";
import Vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import Fonts from "unplugin-fonts/vite";
import tailwindcss from "@tailwindcss/vite";
import { seoPlugin } from "./src/plugins/seo";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    seoPlugin(),
    tailwindcss(),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify(),
    Components(),
    Fonts({
      fontsource: {
        families: [
          {
            name: "Roboto",
            // Reduce font weights to only what's actually used
            weights: [300, 400, 500, 700],
            styles: ["normal"],
            display: "swap", // Add font-display: swap for better FCP
          },
        ],
      },
      custom: {
        families: [],
        display: "swap",
        preload: false, // Disable preload to avoid blocking critical path
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["vuetify"],
  },
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler",
      },
      scss: {
        api: "modern-compiler",
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core framework chunks for optimal caching
          vendor: ["vue", "vue-router", "pinia"],
          ui: ["vuetify"],
          
          // Split analytics and fonts into separate chunks to defer loading
          analytics: ["@vercel/analytics", "@vercel/speed-insights"],
          fonts: ["@fontsource/roboto", "@mdi/font"],
          
          // Split large components into their own chunks
          components: [
            "./src/components/StatsCard.vue",
            "./src/components/ClosestWords.vue",
            "./src/components/PreviousGames.vue",
            "./src/components/HowToPlay.vue",
            "./src/components/Settings.vue"
          ],
        },
      },
    },
    // Performance optimizations
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
      },
      mangle: {
        safari10: true,
      },
    },
    // Optimize chunk size limits
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    sourcemap: false, // Disable source maps in production for smaller bundle
  },
});
