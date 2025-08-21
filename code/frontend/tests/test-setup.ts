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

// Mock window.matchMedia for dark mode detection
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock CSS imports
vi.mock('*.css', () => ({}));
vi.mock('*.scss', () => ({}));
vi.mock('*.sass', () => ({}));

// Mock Supabase client
vi.mock('@/services/supabase', () => ({
  getMostRecentGame: vi.fn(() => Promise.resolve(null)),
  getSimilarityByGameIdAndWord: vi.fn(() => Promise.resolve(null)),
  getHintForGame: vi.fn(() => Promise.resolve(null)),
  getTopSimilarWords: vi.fn(() => Promise.resolve([])),
  getTopWordsByGame: vi.fn(() => Promise.resolve([])),
  getAllGames: vi.fn(() => Promise.resolve([])),
}));

// Mock analytics
vi.mock('@/composables/useAnalytics', () => ({
  useAnalytics: () => ({
    trackGameEvent: vi.fn(),
    trackPageView: vi.fn(),
  }),
}));

// Mock router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  useRoute: () => ({
    params: {},
    query: {},
    path: '/',
  }),
}));
