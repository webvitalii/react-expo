# AGENTS.md

Guidance for AI agents (Devin, etc.) working in this repo.

## Project

React + TypeScript + Vite playground. Stack: TanStack Router (file-based routing in
`src/routes/`, `routeTree.gen.ts` is generated — never hand-edit), TanStack Query/Table/Form/
Store, Tailwind + shadcn/ui, i18next (`public/locales/<lang>/<namespace>.json`), oxlint +
oxfmt.

## Commands

- `npm run dev` — start the dev server
- `npm run build` — typecheck + production build
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` / `npm run lint:fix` — oxlint
- `npm run fmt` / `npm run fmt:check` — oxfmt

## Colocated page specs (IMPORTANT)

Every page under `src/pages/<PageName>/` is documented **colocated with its code**: the
component is `index.tsx` and its spec is `spec/README.md`. **Specs and code MUST stay in
sync.**

**Before editing any file under a page folder, read that page's `spec/README.md` first** and
treat it as the source of intended behavior. Use it to ground your change, then reconcile the
code and the spec together.

Whenever you change a page's code in a way that affects its UI, flow, state, route, i18n
keys, or status — or when you add, rename, or remove a page — update that page's
`spec/README.md` **in the same change set** (create it if missing).

- Full workflow and what-to-update rules: `.devin/rules/page-spec-sync.md`
- Spec template for new pages: `.devin/templates/page-spec.md`

When creating a new page, copy the template to `src/pages/<PageName>/spec/README.md` and add
a `// Spec: ./spec/README.md — read before changing this page` comment above the page's
exported component.
