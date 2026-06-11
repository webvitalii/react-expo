<!--
Canonical template for a colocated page spec.

Usage:
1. Copy this file to `src/pages/<PageName>/spec/README.md`.
2. Replace every <PLACEHOLDER> and fill each section; delete sections that genuinely
   don't apply (but prefer noting "N/A" over silent omission).
3. Add a `// Spec: ./spec/README.md` comment above the page's exported component.
4. As the spec grows, split it into more docs in the same `spec/` folder
   (e.g. `spec/state.md`, `spec/i18n.md`) and link them from this README.

Scale the spec to the page's complexity: a simple page (e.g. a single counter) may need
only Overview / Route / UI, while a feature-rich page warrants every section. Lean on
"N/A" or omission rather than padding.

Keep this in sync with `.devin/rules/page-spec-sync.md`.
-->

# Spec: <Page Name>

**Status:** <Implemented | Scaffold | Planned> (<optional qualifier>)
**Component:** `src/pages/<PageName>/index.tsx`
**Route:** `<path>` (`src/routes/<route-file>.tsx`) <!-- quick-ref path only; details go in the Route section below -->

## Overview

<One or two paragraphs: what this page does, for whom, and the key constraint or boundary.>

## Route

<The registered path, whether it is `$lang`-prefixed, and any loader / namespace preloading.
Reference the file under `src/routes/` and the nav entry in
`src/components/Navbar/navConfig.ts`.>

## UI

<Describe the layout. For form-like pages use a field table; for multi-card or multi-pane
pages use a subsection per region.>

| Field   | Type      | Notes                                      |
| ------- | --------- | ------------------------------------------ |
| <field> | <control> | <behaviour / source / disabled conditions> |

## Flow

<Numbered, observable steps from user action to result. Note status/error states surfaced to
the user.>

1. <step>

## State

<Local component state and derived values. Use a table for `useState` / `useMemo` fields.>

| State  | Type   | Default   | Purpose          |
| ------ | ------ | --------- | ---------------- |
| <name> | <type> | <default> | <what it drives> |

## i18n Keys

<Namespace used by `useTranslation` and the keys this page reads. Point at
`public/locales/<lang>/<namespace>.json`. Use "N/A" if the page has no translations.>

| Key     | English |
| ------- | ------- |
| `<key>` | <value> |

## Logic / Helpers

<Sibling modules the page depends on (utils, examples, sub-components) and what they provide.
Omit if the page is self-contained.>

## Output

<What the page produces — rendered results, clipboard writes, persisted state. Omit if none.>

## Files to Touch

<Prune any line that doesn't apply — e.g. drop the locales line for a page with no i18n,
or the navConfig line for a page that isn't in the nav.>

```
src/pages/<PageName>/index.tsx          ← <change>
src/routes/<route-file>.tsx             ← <change>
src/components/Navbar/navConfig.ts      ← <change>
public/locales/<lang>/<namespace>.json  ← <change>
```

## Out of Scope

<Bullet list of intentionally deferred or excluded behaviour.>

- <excluded item>
