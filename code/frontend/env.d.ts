/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // @ts-expect-error - Generic Vue component type
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
