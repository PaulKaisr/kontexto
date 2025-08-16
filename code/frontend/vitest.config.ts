import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [Vue()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/test-setup.ts"],
    include: ["tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    typecheck: {
      tsconfig: "./tsconfig.vitest.json",
    },
    css: false,
    server: {
      deps: {
        inline: ["vuetify"],
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
});
