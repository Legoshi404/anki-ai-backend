import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import importPlugin from "eslint-plugin-import";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),

  {
    files: ["**/*.{ts,mts,cts}"],

    extends: [js.configs.recommended, ...tseslint.configs.recommended],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
    },

    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Node.js built-in modules
            ["^node:"],

            // External packages
            ["^@?\\w"],

            // Absolute imports (if path aliases are introduced later)
            ["^@/"],

            // Relative imports
            ["^\\."],
          ],
        },
      ],

      "simple-import-sort/exports": "error",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "import/newline-after-import": [
        "error",
        {
          count: 1,
        },
      ],

      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
      ],

      // Console is acceptable for backend logging
      "no-console": "off",
    },
  },
]);
