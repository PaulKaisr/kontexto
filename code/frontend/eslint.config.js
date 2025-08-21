import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import * as parserVue from "vue-eslint-parser";
import configTypeScript from "@vue/eslint-config-typescript";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**", "**/*.spec.ts"],
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  ...configTypeScript(),

  {
    name: "app/vue-rules",
    files: ["**/*.vue"],
    languageOptions: {
      parser: parserVue,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // Vue-specific rules
      "vue/multi-word-component-names": "off",
      "vue/no-unused-vars": "error",
      "vue/component-definition-name-casing": ["error", "PascalCase"],
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
      "vue/prefer-import-from-vue": "error",
      "vue/no-empty-component-block": "warn",
      "vue/padding-line-between-blocks": ["error", "always"],
      "vue/component-tags-order": [
        "warn",
        {
          order: ["template", "script", "style"],
        },
      ],
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/html-self-closing": "off",
      "vue/attributes-order": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/html-indent": "off",
    },
  },

  {
    name: "app/typescript-rules",
    files: ["**/*.{ts,mts,tsx}"],
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  {
    name: "app/general-rules",
    rules: {
      // General JavaScript/TypeScript rules
      "no-console": "warn",
      "no-debugger": "error",
      "prefer-const": "error",
      "no-unused-vars": "off", // Use TypeScript version instead
      quotes: ["error", "double"],
      semi: ["error", "always"],
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "space-before-function-paren": ["error", "never"],
      "keyword-spacing": "error",
      "space-infix-ops": "error",
      "eol-last": ["error", "always"],
      "no-trailing-spaces": "error",
      "max-len": [
        "warn",
        { code: 120, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true },
      ],
    },
  },
];
