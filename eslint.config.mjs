import { defineConfig } from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default defineConfig([
  { ignores: ["dist/**", "out/**", "build/**", ".next/**", ".astro/**", ".wrangler/**", "node_modules/**"] },
  ...eslintPluginAstro.configs.recommended,
  // TypeScript in .astro frontmatter/<script> and in .ts files.
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
  })),
]);
