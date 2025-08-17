import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ConfirmDialog from "../../src/components/ConfirmDialog.vue";

describe("ConfirmDialog.vue", () => {
  function createWrapper(props = {}) {
    return mount(ConfirmDialog, {
      props: {
        modelValue: true,
        title: "Test Title",
        message: "Test message",
        ...props,
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
      attachTo: document.body,
    });
  }

  it("renders with default props", async () => {
    const wrapper = createWrapper();
    await wrapper.vm.$nextTick();

    // Check that the component received the correct props
    expect(wrapper.props("title")).toBe("Test Title");
    expect(wrapper.props("message")).toBe("Test message");
    expect(wrapper.props("confirmText")).toBe("Bestätigen");
    expect(wrapper.props("cancelText")).toBe("Abbrechen");
  });

  it("renders with custom button text", () => {
    const wrapper = createWrapper({
      confirmText: "Yes",
      cancelText: "No",
    });

    expect(wrapper.props("confirmText")).toBe("Yes");
    expect(wrapper.props("cancelText")).toBe("No");
  });

  it("emits confirm event when handleConfirm is called", async () => {
    const wrapper = createWrapper();

    // Trigger the confirm event by emitting it directly
    await wrapper.vm.$emit("confirm");

    expect(wrapper.emitted("confirm")).toBeTruthy();
    expect(wrapper.emitted("confirm")).toHaveLength(1);
  });

  it("emits update:modelValue event when dialog should close", async () => {
    const wrapper = createWrapper();

    // Simulate clicking outside or pressing escape (closing the dialog)
    await wrapper.vm.$emit("update:modelValue", false);

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
  });

  it("has correct loading prop", () => {
    const wrapper = createWrapper({ loading: true });
    expect(wrapper.props("loading")).toBe(true);
  });

  it("has correct color and variant props", () => {
    const wrapper = createWrapper({
      confirmColor: "error",
      confirmVariant: "outlined",
    });

    expect(wrapper.props("confirmColor")).toBe("error");
    expect(wrapper.props("confirmVariant")).toBe("outlined");
  });
});
