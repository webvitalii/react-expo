# React + TypeScript + Vite

### Setup and Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# Start with specific host and port (example)
npm run dev -- --host 0.0.0.0 --port 3000
```

### Building and Publishing

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

### Linting (oxlint)

```bash
# Scan all files in the project (except ignored ones like src/components/ui/**)
npm run lint
```

### Formatting (oxfmt)

```bash
# Format all files in the project (writes changes)
npm run fmt

# Check if all files are formatted (no writes, useful for CI)
npm run fmt:check
```

### Other Useful Commands

```bash
# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Run security audit
npm audit
npm audit fix

# View all available npm scripts
npm run
```

## Main shadcn update command:

```bash
npx shadcn@latest add --all --overwrite

npx shadcn@latest add button input checkbox textarea select radio-group label table dropdown-menu pagination card carousel spinner field separator navigation-menu sonner --overwrite
```
