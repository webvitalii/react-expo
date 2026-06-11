# Spec: Diff Viewer

**Status:** Implemented
**Component:** `src/pages/DiffPage/index.tsx`
**Route:** `/$lang/tools/diff` (`src/routes/$lang/tools/diff.tsx`)

## Overview

A text diff viewer. The user edits two text panes (left/right) and sees the difference
rendered in one of three modes — split, inline, or unified patch. Diffing is performed
client-side with the `diff` library; options control granularity and noise. The page is
`$lang`-prefixed and localized via the `diff` i18n namespace.

## Route

Registered at `/$lang/tools/diff` via `createFileRoute('/$lang/tools/diff')` in
`src/routes/$lang/tools/diff.tsx`. The route `loader` preloads the `diff` i18n namespace
(`i18n.loadNamespaces('diff')`). Linked from the "Tools" group in
`src/components/Navbar/navConfig.ts` (`to: '/$lang/tools/diff'`), which is flagged as needing
the `lang` param.

## UI

Top: two side-by-side `Textarea` panes (left/right) seeded with `initialLeftText` /
`initialRightText` from `./examples`. Below: a `DiffControls` bar, then a result panel.

### DiffControls (`./DiffControls.tsx`)

| Field              | Type                                          | Notes                                                            |
| ------------------ | --------------------------------------------- | ---------------------------------------------------------------- |
| View mode          | `RadioGroup` (`split` \| `inline` \| `patch`) | Selects the renderer.                                            |
| Diff method        | `RadioGroup` (`chars` \| `words` \| `lines`)  | Shown **only** in inline mode.                                   |
| Collapse Unchanged | `Checkbox`                                    | Shown **only** in split mode.                                    |
| Word Wrap          | `Checkbox`                                    | Always shown; toggles `whitespace-pre-wrap` vs `whitespace-pre`. |
| Ignore Whitespace  | `Checkbox`                                    | Hidden when `inline` + `chars`.                                  |
| Ignore Case        | `Checkbox`                                    | Hidden in `patch` mode.                                          |

### Result panel

Header shows added (`+N`, green) and removed (`−N`, red) counts. In `patch` mode a **Copy
patch** button appears. Body renders one of `InlineView`, `SplitView`, or `PatchView`. In
split mode, `replaced` rows additionally get **intra-line word-level highlighting** (via
`diffWordsWithSpace`) so the exact changed tokens stand out within an otherwise-similar line.

## Flow

1. User edits the left/right textareas.
2. Text is normalized to lowercase first when **Ignore Case** is on (`normalizedLeft` /
   `normalizedRight`).
3. The active `viewMode` drives which diff is memoized:
   - `split` → `buildDiffRows(diffLines(...))`; rows optionally compressed by `collapseRows`
     when **Collapse Unchanged** is on (`CONTEXT_LINES = 3` context lines kept).
   - `inline` → `diffChars` / `diffWords` (or `diffWordsWithSpace` when whitespace is
     respected) / `diffLines`, per the selected `diffMethod`.
   - `patch` → `createTwoFilesPatch('left', 'right', ...)` with `context: CONTEXT_LINES`.
4. Added/removed counts come from `splitDiff` (split), or `countChanges(...)` (inline/patch).
5. In split mode, clicking a collapsed block calls `expandBlock(id)`, adding its id to
   `expandedBlocks` to reveal hidden context rows.
6. In patch mode, **Copy patch** writes `patchText` to the clipboard via
   `navigator.clipboard.writeText`, shows "Copied!" for 1500ms, and silently ignores
   clipboard failures.

## State

| State               | Type                  | Default            | Purpose                                         |
| ------------------- | --------------------- | ------------------ | ----------------------------------------------- |
| `leftText`          | `string`              | `initialLeftText`  | Left pane content.                              |
| `rightText`         | `string`              | `initialRightText` | Right pane content.                             |
| `viewMode`          | `ViewMode`            | `'split'`          | Active renderer.                                |
| `diffMethod`        | `DiffMethod`          | `'lines'`          | Inline granularity.                             |
| `ignoreCase`        | `boolean`             | `false`            | Lowercase before diffing.                       |
| `ignoreWhitespace`  | `boolean`             | `true`             | Passed to diff/patch helpers.                   |
| `wordWrap`          | `boolean`             | `true`             | Wrap vs horizontal scroll in views.             |
| `collapseUnchanged` | `boolean`             | `true`             | Collapse runs of common lines (split).          |
| `expandedBlocks`    | `ReadonlySet<string>` | `new Set()`        | Ids of expanded collapsed blocks.               |
| `patchCopied`       | `boolean`             | `false`            | Transient "Copied!" state for the patch button. |

Derived (`useMemo`): `inlineParts`, `splitDiff`, `viewItems`, `patchText`, `stats`.

## i18n Keys

Namespace: `diff` (`useTranslation('diff')`). Files: `public/locales/<lang>/diff.json`
(`en`, `fr`). Each `t(...)` call provides an English fallback as the second argument.

| Key                                              | English                |
| ------------------------------------------------ | ---------------------- |
| `title`                                          | Diff Page              |
| `result`                                         | Diff Result            |
| `copy`                                           | Copy patch             |
| `copied`                                         | Copied!                |
| `view.split` / `view.inline` / `view.patch`      | Split / Inline / Patch |
| `method.chars` / `method.words` / `method.lines` | Chars / Words / Lines  |
| `options.collapseUnchanged`                      | Collapse Unchanged     |
| `options.wordWrap`                               | Word Wrap              |
| `options.ignoreWhitespace`                       | Ignore Whitespace      |
| `options.ignoreCase`                             | Ignore Case            |

## Logic / Helpers

| Module               | Provides                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `./diff-utils.ts`    | `ViewMode`, `DiffMethod`, `DiffRow`, `ViewItem` types; `CONTEXT_LINES`; `buildDiffRows`, `collapseRows`, `countChanges`, `splitLines`, `rowKey`. |
| `./examples.ts`      | `initialLeftText`, `initialRightText` seed content.                                                                                              |
| `./DiffControls.tsx` | Options bar (view mode, method, toggles).                                                                                                        |
| `./InlineView.tsx`   | Renders inline `Change[]` parts.                                                                                                                 |
| `./SplitView.tsx`    | Renders side-by-side rows with collapsible blocks; highlights changed tokens inside `replaced` lines via `diffWordsWithSpace` (`WordSpans`).     |
| `./PatchView.tsx`    | Renders the unified patch text.                                                                                                                  |
| `diff` (npm)         | `diffChars`, `diffWords`, `diffWordsWithSpace`, `diffLines`, `createTwoFilesPatch`.                                                              |

## Output

Renders the diff (split/inline/patch) and add/remove counts. In patch mode, writes the
unified patch to the clipboard on demand. No persistence or network.

## Files to Touch

```
src/pages/DiffPage/index.tsx          ← page orchestration, state, memoized diffs
src/pages/DiffPage/diff-utils.ts      ← diff row building / collapsing / counting
src/pages/DiffPage/DiffControls.tsx   ← options UI
src/pages/DiffPage/{Inline,Split,Patch}View.tsx ← renderers
src/pages/DiffPage/examples.ts        ← seed text
src/routes/$lang/tools/diff.tsx       ← route + diff namespace preload
src/components/Navbar/navConfig.ts    ← "Tools" nav entry (to: '/$lang/tools/diff')
public/locales/{en,fr}/diff.json      ← translations
```

## Out of Scope

- File upload / drag-and-drop input (text is typed/pasted only).
- Syntax highlighting within diff lines.
- Persisting pane content or options across sessions.
- Per-method ignore-whitespace for `chars` inline mode (the toggle is hidden there).
