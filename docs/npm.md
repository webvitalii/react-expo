# npm Cheat Sheet

Quick reference for the npm commands used most often in this project.
Every script defined in `package.json` is listed here, plus the
day-to-day npm CLI commands worth remembering.

## Setup

```bash
# Install all dependencies from package-lock.json
npm install

# Clean, reproducible install (CI; respects package-lock.json exactly)
npm ci
```

## Development

```bash
# Start the Vite dev server
npm run dev

# Start with specific host and port
npm run dev -- --host 0.0.0.0 --port 3000
```

## Building & preview

```bash
# Type-check then build for production (tsc && vite build)
npm run build

# Preview the production build locally
npm run preview

# Type-check only (no emit)
npm run typecheck
```

## Linting (oxlint)

```bash
# Lint the whole project (ignores src/components/ui/**)
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

## Formatting (oxfmt)

```bash
# Format every file (writes changes)
npm run fmt

# Check formatting without writing (CI-friendly)
npm run fmt:check
```

## Internationalization

See [`docs/i18n.md`](./i18n.md) for the full workflow.

```bash
# Rewrite JSON files from source (extract + prune)
npm run i18n:extract

# CI check: fail if JSON files are out of sync
npm run i18n:check

# Translation completeness report
npm run i18n:status

# Generate typed t() keys (src/types/i18next.d.ts)
npm run i18n:types
```

## Run binaries directly with npx

Useful when you want to bypass the script and pass custom flags.

```bash
# Lint
npx oxlint

# Lint with auto-fix
npx oxlint --fix

# Check formatting
npx oxfmt --check

# Format all files
npx oxfmt
```

## shadcn/ui

```bash
# Add (or refresh) every shadcn component
npx shadcn@latest add --all --overwrite

# Add only the components this project uses
npx shadcn@latest add button input checkbox textarea select radio-group label table tabs dropdown-menu pagination card carousel spinner field separator navigation-menu sonner --overwrite
```

## Dependency maintenance

```bash
# Show installed versions vs. latest
npm outdated

# Update dependencies within the ranges in package.json
npm update

# Install / upgrade a single package to the latest version
npm install <pkg>@latest

# Install a dev dependency
npm install -D <pkg>

# Remove a package
npm uninstall <pkg>

# List top-level installed packages
npm list --depth=0

# Print where a package resolves from (and why it's installed)
npm explain <pkg>
```

## Security

```bash
# Audit for known vulnerabilities
npm audit

# Apply non-breaking fixes
npm audit fix

# Apply fixes that may include breaking changes
npm audit fix --force
```

## Inspecting scripts & cache

```bash
# List all scripts defined in package.json
npm run

# Print the resolved config npm is using
npm config list

# Wipe the npm cache (rarely needed)
npm cache clean --force
```

## Git workflow

This project uses husky hooks (`pre-commit` runs lint-staged, `pre-push`
runs `i18n:check`). See [`docs/git.md`](./git.md) for the day-to-day Git
commands and how to bypass hooks when needed.
