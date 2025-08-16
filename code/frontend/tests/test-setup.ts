import { vi } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { config } from "@vue/test-utils";

const vuetify = createVuetify({
  components,
  directives,
});

// Set global Vuetify plugin for all tests
config.global.plugins = [vuetify];

global.ResizeObserver = require("resize-observer-polyfill");

// Mock visualViewport for Vuetify dialogs
Object.defineProperty(window, 'visualViewport', {
  value: {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    width: 1024,
    height: 768,
  },
  writable: true,
});

// Mock CSS imports
vi.mock('*.css', () => ({}));
vi.mock('*.scss', () => ({}));
vi.mock('*.sass', () => ({}));
