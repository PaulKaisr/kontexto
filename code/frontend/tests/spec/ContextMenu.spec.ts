import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ContextMenu from "../../src/components/ContextMenu.vue";

describe("ContextMenu.vue", () => {
  let pinia: any;

  const mountComponent = (props: any = {}) => {
    return mount(ContextMenu, {
      props: {
        loading: false,
        gameOver: false,
        ...props,
      },
      global: {
        plugins: [pinia],
      },
    });
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it("renders context menu trigger button", () => {
    const wrapper = mountComponent();
    const trigger = wrapper.find('[data-testid="context-menu-trigger"]');
    expect(trigger.exists()).toBe(true);
  });

  it("receives correct props", () => {
    const wrapper = mountComponent({ loading: true, gameOver: true });
    expect(wrapper.props("loading")).toBe(true);
    expect(wrapper.props("gameOver")).toBe(true);
  });

  it("emits getHint event when trigger method is called", async () => {
    const wrapper = mountComponent();
    await wrapper.vm.$emit("getHint");
    expect(wrapper.emitted()).toHaveProperty("getHint");
  });

  it("emits giveUp event when trigger method is called", async () => {
    const wrapper = mountComponent();
    await wrapper.vm.$emit("giveUp");
    expect(wrapper.emitted()).toHaveProperty("giveUp");
  });

  it("renders with default props", () => {
    const wrapper = mountComponent();
    expect(wrapper.exists()).toBe(true);
  });
});
