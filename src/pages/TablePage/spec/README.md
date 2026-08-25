# Spec: Table

**Status:** Implemented
**Component:** `src/pages/TablePage/index.tsx`
**Route:** `/tables/table` (`src/routes/tables/table.tsx`)

## Overview

A data table of blog posts with column sorting, a title text filter, row selection, and
pagination, built on TanStack Table v9's `useTable` API (feature-explicit; no
`useLegacyTable` shim). Data comes from `useSuspenseQuery(allPostsQueryOptions)`; the route
loader preloads it.

## Route

Registered at `/tables/table` via `createFileRoute('/tables/table')` in
`src/routes/tables/table.tsx`. Not `$lang`-prefixed. The route `loader` calls
`queryClient.ensureQueryData(allPostsQueryOptions)`. Linked from the "Tables" group in
`src/components/Navbar/navConfig.ts` (`to: '/tables/table'`, label "Table").

## UI

| Field                              | Type                                                      | Notes                                                                                                    |
| ---------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Filter posts...                    | `Input`                                                   | Filters rows by the `title` column's filter value.                                                       |
| Select column                      | `Checkbox` (header + per-row)                             | Header toggles all rows on the current page; indeterminate when some but not all page rows are selected. |
| id / userId / title / body columns | Sortable header (`Button`)                                | Click toggles asc/desc/none; shows an up/down/unsorted arrow icon.                                       |
| Actions column                     | Dropdown menu (`MoreHorizontal` trigger)                  | "Copy post title" (writes to clipboard), "Edit post" and "Delete post" (no-op placeholders).             |
| Pagination                         | `Pagination` (prev / numbered pages with ellipses / next) | Prev/next disabled at the first/last page. Shows up to 3 page numbers around the current page.           |
| Selection count                    | Text (`"{n} of {m} row(s) selected."`)                    | Derived from `getFilteredSelectedRowModel()` / `getFilteredRowModel()`.                                  |

## Flow

1. Data loads via `useSuspenseQuery(allPostsQueryOptions)`.
2. User types in the "Filter posts..." input → sets the `title` column's filter value →
   `getFilteredRowModel()` recomputes.
3. User clicks a sortable column header → toggles that column's sort direction.
4. User checks row/header checkboxes → updates `rowSelection` state; the selection count and
   header indeterminate state update.
5. User clicks pagination controls → `setPageIndex` / `previousPage` / `nextPage` change the
   visible page of `getRowModel()`.
6. User opens the actions dropdown on a row → "Copy post title" copies `post.title` to the
   clipboard via `navigator.clipboard.writeText`; "Edit post" / "Delete post" have no handlers
   yet.

## State

| State              | Type                    | Default | Purpose                                                |
| ------------------ | ----------------------- | ------- | ------------------------------------------------------ |
| `sorting`          | `SortingState`          | `[]`    | Controlled sort state passed to `useTable`.            |
| `columnFilters`    | `ColumnFiltersState`    | `[]`    | Controlled column filter state (title text filter).    |
| `columnVisibility` | `ColumnVisibilityState` | `{}`    | Controlled column visibility state (no UI toggle yet). |
| `rowSelection`     | `RowSelectionState`     | `{}`    | Controlled row selection state.                        |

Pagination (`pagination.pageIndex` / `pageSize`) is left uncontrolled — TanStack Table owns it
internally and it is read from `table.state.pagination` (the default `useTable` selector
exposes the full registered table state, matching the previous v8-style behaviour).

### TanStack Table v9 setup

- `features = tableFeatures({ columnFilteringFeature, columnVisibilityFeature,
rowPaginationFeature, rowSelectionFeature, rowSortingFeature, filteredRowModel:
createFilteredRowModel(), paginatedRowModel: createPaginatedRowModel(), sortedRowModel:
createSortedRowModel(), filterFns: { includesString: filterFn_includesString } })` — only
  the row models this page uses are registered.
- Columns are built with `createColumnHelper<typeof features, Post>()` and
  `columnHelper.columns([...])` for value-type inference.
- Headers/cells render via `<table.FlexRender header={header} />` /
  `<table.FlexRender cell={cell} />` instead of the standalone `flexRender` function.
- No column sets an explicit `sortFn`, so no `sortFns` registry is needed —
  `column.getAutoSortFn()` returns the resolved built-in function directly regardless of
  registration. Filtering is different: `column.getAutoFilterFn()` looks its chosen name up
  in the `filterFns` registry and returns `undefined` (silently disabling the filter) if it
  isn't registered there, so `filterFns: { includesString: filterFn_includesString }` is
  required for the `title` text filter to work.

## i18n Keys

N/A — this page does not use `useTranslation`; all copy is inline English.

## Logic / Helpers

Self-contained in `index.tsx`: `generateSortableHeader` (shared sortable header renderer,
typed generically over cell value via `Column<typeof features, Post, any>` since `Column`'s
value parameter is otherwise invariant), the `columns` array, and inline `renderHeader` /
`renderBody` closures plus the numbered pagination control builder.

## Output

Renders the filtered/sorted/paginated post rows and the selection count. "Copy post title"
writes to the clipboard; no other persistence or network side effects.

## Files to Touch

```
src/pages/TablePage/index.tsx       ← table setup, columns, rendering
src/routes/tables/table.tsx         ← route + posts query preload
src/components/Navbar/navConfig.ts  ← "Tables" nav entry (to: '/tables/table')
src/queries/posts.ts                ← allPostsQueryOptions
src/types/Post.tsx                  ← Post type used by columns
```

## Out of Scope

- Column visibility UI (state exists, no toggle control rendered).
- "Edit post" / "Delete post" actions (menu items have no handlers).
- Server-side sorting/filtering/pagination (all client-side row models).
