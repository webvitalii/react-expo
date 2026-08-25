# Spec: Table Simple

**Status:** Implemented
**Component:** `src/pages/TableSimplePage/index.tsx`
**Route:** `/tables/table-simple` (`src/routes/tables/table-simple.tsx`)

## Overview

A minimal, static rendering of blog posts in a plain HTML-style table (via the shared
`@/components/ui/table` primitives). It does **not** use TanStack Table — there is no
sorting, filtering, pagination, or row selection, just a direct `.map()` over the fetched
posts. Because it has no TanStack Table usage, it is unaffected by the v9 migration applied
to `TablePage` (see `src/pages/TablePage/spec/README.md`).

## Route

Registered at `/tables/table-simple` via `createFileRoute('/tables/table-simple')` in
`src/routes/tables/table-simple.tsx`. Not `$lang`-prefixed. The route `loader` calls
`queryClient.ensureQueryData(allPostsQueryOptions)`. Linked from the "Tables" group in
`src/components/Navbar/navConfig.ts` (`to: '/tables/table-simple'`, label "Table Simple").

## UI

A single `Table` with a static header row (`ID`, `User ID`, `Title`, `Body`) and one body
row per post.

| Field   | Type        | Notes                              |
| ------- | ----------- | ---------------------------------- |
| ID      | `TableCell` | `post.id`, column width 80px.      |
| User ID | `TableCell` | `post.userId`, column width 100px. |
| Title   | `TableCell` | `post.title`.                      |
| Body    | `TableCell` | `post.body`.                       |

## Flow

1. Data loads via `useSuspenseQuery(allPostsQueryOptions)`.
2. Every post renders as a row, in fetch order, with no further interaction.

## State

None — no local component state; posts come directly from the suspense query.

## i18n Keys

N/A — this page does not use `useTranslation`; all copy is inline English.

## Logic / Helpers

Self-contained; no sibling modules.

## Output

Static rendered table. No persistence, network side effects beyond the initial fetch, or
clipboard interaction.

## Files to Touch

```
src/pages/TableSimplePage/index.tsx  ← rendering
src/routes/tables/table-simple.tsx   ← route + posts query preload
src/components/Navbar/navConfig.ts   ← "Tables" nav entry (to: '/tables/table-simple')
src/queries/posts.ts                 ← allPostsQueryOptions
```

## Out of Scope

- Sorting, filtering, pagination, row selection (see `TablePage` for a full-featured
  TanStack Table v9 example).
