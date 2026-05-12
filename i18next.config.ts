import { defineConfig } from 'i18next-cli';

/**
 * Configuration for `i18next-cli` (https://github.com/i18next/i18next-cli).
 *
 * Run `npm run i18n:extract` to scan `src/**\/*.{ts,tsx}` for every `t(...)` /
 * `<Trans>` call and rewrite `public/locales/{lang}/{ns}.json` to contain
 * exactly the keys the source code uses. Run `npm run i18n:check` in CI to
 * fail the build whenever the JSON files drift from the code.
 *
 * Two extraction strategies coexist in this project:
 *
 * 1. **Static keys (preferred)** — write `t('view.split', 'Split')` directly
 *    in components. The extractor reads both the key and the inline default,
 *    so the English JSON is generated automatically and unused keys are
 *    pruned (the "Tailwind tree-shake" behavior).
 *
 * 2. **Dynamic keys** — when a key is computed at runtime, e.g.
 *    `t(entry.i18nKey)` in the Navbar, the extractor can't see the literal
 *    string. Those keys must be listed under `preservePatterns` below so
 *    that `removeUnusedKeys` does not delete them on every run.
 */
export default defineConfig({
  locales: ['en', 'fr'],

  extract: {
    input: ['src/**/*.{ts,tsx}'],
    output: 'public/locales/{{language}}/{{namespace}}.json',

    primaryLanguage: 'en',
    defaultNS: 'navbar',

    // Tailwind-style pruning: any key absent from source code is removed.
    removeUnusedKeys: true,

    // Stable diffs.
    sort: true,
    indentation: 2,

    // Don't extract from JSDoc / comments — avoids false positives.
    extractFromComments: false,

    // English picks up the inline default from `t('key', 'Default')` calls.
    // Missing keys (and every key in secondary languages) become `""` so
    // translators can spot work to do.

    // Keys that are referenced via dynamic strings (e.g. `t(entry.i18nKey)`
    // in `src/components/Navbar/index.tsx`). The extractor can't statically
    // resolve them, so we whitelist the whole namespace.
    preservePatterns: ['navbar:*'],
  },

  // Optional but recommended: generate types so `t('view.split')` becomes
  // a typed key and `t('view.spilt')` is a TypeScript error.
  types: {
    input: ['public/locales/en/*.json'],
    output: 'src/types/i18next.d.ts',
  },
});
