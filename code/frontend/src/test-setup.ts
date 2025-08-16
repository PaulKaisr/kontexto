import { vi } from "vitest";

// Mock global objects that may be needed
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Make vi available globally with proper typing
(globalThis as any).vi = vi;
