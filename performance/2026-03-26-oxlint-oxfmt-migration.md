# Performance: Oxlint + Oxfmt Migration

## Summary

- Removed ESLint, Prettier, and 9 related packages (eslint, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, @typescript-eslint/eslint-plugin, @typescript-eslint/parser, typescript-eslint, globals, prettier)
- Added oxlint + oxfmt (2 packages)
- Removed 228 node_modules packages, added 5
- Updates for package-lock.json: +1,713 / -4,446
  - Before: 7341 lines
  - After: 3608 lines

## Local Development - 1086 ms

```
>npm run dev

> react-expo@0.0.0 dev
> vite


  VITE v8.0.1  ready in 1086 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## Build - 830ms

```
>npm run build

> react-expo@0.0.0 build
> tsc && vite build

vite v8.0.1 building client environment for production...
✓ 2476 modules transformed.
computing gzip size...
dist/index.html                                                     2.12 kB │ gzip:  0.62 kB
dist/assets/index-BtvHI5h5.css                                     61.72 kB │ gzip: 10.58 kB
dist/assets/root-BWrmMTUK.js                                        0.03 kB │ gzip:  0.05 kB
dist/assets/batch-D6Ird5Ov.js                                       0.11 kB │ gzip:  0.12 kB
dist/assets/serializeValue-DrzMczll.js                              0.13 kB │ gzip:  0.12 kB
dist/assets/EventClient-CFm-VEwX.js                                 0.14 kB │ gzip:  0.14 kB
dist/assets/PageTitle-Cwq6CCm9.js                                   0.15 kB │ gzip:  0.15 kB
dist/assets/tmdb-BKhGpLZU.js                                        0.15 kB │ gzip:  0.15 kB
dist/assets/chevron-right-Dre4C3Lv.js                               0.20 kB │ gzip:  0.17 kB
dist/assets/useSearch-DxgZdv36.js                                   0.21 kB │ gzip:  0.16 kB
dist/assets/useParams-CwO2BggG.js                                   0.25 kB │ gzip:  0.19 kB
dist/assets/forms-B6jYFodO.js                                       0.31 kB │ gzip:  0.23 kB
dist/assets/forms-_D5Wa8Nf.js                                       0.33 kB │ gzip:  0.25 kB
dist/assets/useValueChanged-C9rknRdu.js                             0.35 kB │ gzip:  0.27 kB
dist/assets/clsx-DnqN-uhr.js                                        0.36 kB │ gzip:  0.23 kB
dist/assets/useNavigate-DiyUoZb8.js                                 0.38 kB │ gzip:  0.27 kB
dist/assets/posts-C6CLwEYH.js                                       0.39 kB │ gzip:  0.26 kB
dist/assets/_lang-C44CgZ7l.js                                       0.46 kB │ gzip:  0.32 kB
dist/assets/redirect-mn106cdD.js                                    0.47 kB │ gzip:  0.29 kB
dist/assets/chunk-DECur_0Z.js                                       0.68 kB │ gzip:  0.41 kB
dist/assets/GenreControl-DnRGl-D6.js                                0.84 kB │ gzip:  0.40 kB
dist/assets/useMatch-dVD6oCDw.js                                    0.91 kB │ gzip:  0.50 kB
dist/assets/useRouter-CtyMp6qF.js                                   0.95 kB │ gzip:  0.54 kB
dist/assets/counter-C9Do96-i.js                                     1.06 kB │ gzip:  0.49 kB
dist/assets/_lang-QFrakKOq.js                                       1.08 kB │ gzip:  0.47 kB
dist/assets/test-DDgg4h9Q.js                                        1.17 kB │ gzip:  0.55 kB
dist/assets/table-simple-BxWwVniT.js                                1.18 kB │ gzip:  0.56 kB
dist/assets/table-C0h6Itb-.js                                       1.22 kB │ gzip:  0.50 kB
dist/assets/card-suj-UmjZ.js                                        1.42 kB │ gzip:  0.58 kB
dist/assets/rating-St6qJNTa.js                                      1.66 kB │ gzip:  0.88 kB
dist/assets/goober.modern-BorvG7DF.js                               1.88 kB │ gzip:  1.08 kB
dist/assets/pagination-ncAxVJ7C.js                                  1.92 kB │ gzip:  0.77 kB
dist/assets/useStore-DnJxcPUj.js                                    1.92 kB │ gzip:  0.84 kB
dist/assets/tv-shows-CPJB_oYu.js                                    2.12 kB │ gzip:  1.05 kB
dist/assets/movies-BnDm1wIr.js                                      2.18 kB │ gzip:  1.08 kB
dist/assets/_postId-CZBmlZMf.js                                     2.23 kB │ gzip:  0.97 kB
dist/assets/search-Cfq6hr-d.js                                      2.32 kB │ gzip:  1.15 kB
dist/assets/input-DvPLG9km.js                                       2.33 kB │ gzip:  1.20 kB
dist/assets/posts-MXqtvYwE.js                                       2.40 kB │ gzip:  1.11 kB
dist/assets/button-BK9z6JM5.js                                      2.94 kB │ gzip:  1.05 kB
dist/assets/useField-CqDgQrFu.js                                    2.97 kB │ gzip:  1.34 kB
dist/assets/config-KMeny4zd.js                                      3.04 kB │ gzip:  1.21 kB
dist/assets/store-k3ZwuxUm.js                                       3.28 kB │ gzip:  1.40 kB
dist/assets/tiny-invariant-DYbevgx9.js                              3.33 kB │ gzip:  1.50 kB
dist/assets/tmdb-B8rWstVS.js                                        3.46 kB │ gzip:  1.70 kB
dist/assets/react-dom-CbejMdZT.js                                   3.57 kB │ gzip:  1.36 kB
dist/assets/useTranslation-DYbD4U4z.js                              3.61 kB │ gzip:  1.75 kB
dist/assets/sonner-BUE1zhf3.js                                      4.03 kB │ gzip:  1.33 kB
dist/assets/plugin-BbmGQrt-.js                                      4.06 kB │ gzip:  1.36 kB
dist/assets/CompositeItem-D30PlAFx.js                               4.58 kB │ gzip:  2.05 kB
dist/assets/link-D6daL6nC.js                                        4.72 kB │ gzip:  2.31 kB
dist/assets/lazyRouteComponent-C3qJoz-t.js                          4.94 kB │ gzip:  1.58 kB
dist/assets/bmi-DzR1u4xg.js                                         5.06 kB │ gzip:  1.51 kB
dist/assets/store-DJGTpIYk.js                                       5.50 kB │ gzip:  2.01 kB
dist/assets/checkbox-DzOrV0AD.js                                    5.60 kB │ gzip:  2.60 kB
dist/assets/useBaseUiId-D0qxZ2Tu.js                                 6.90 kB │ gzip:  3.00 kB
dist/assets/radio-group-BlIyIICt.js                                 7.72 kB │ gzip:  3.18 kB
dist/assets/jsx-runtime-CP2iHdEU.js                                 7.88 kB │ gzip:  2.98 kB
dist/assets/Loading-DHFIMiL8.js                                     9.32 kB │ gzip:  3.54 kB
dist/assets/browser-ponyfill-BJzCONsv.js                            9.72 kB │ gzip:  3.23 kB
dist/assets/diff-D-6QKhXD.js                                       10.50 kB │ gzip:  3.89 kB
dist/assets/web-hNgU1AOg.js                                        11.06 kB │ gzip:  4.53 kB
dist/assets/preload-helper-Cm7HaCsf.js                             14.68 kB │ gzip:  5.21 kB
dist/assets/solid-qxHxZ_jz.js                                      15.31 kB │ gzip:  5.93 kB
dist/assets/FloatingTanStackRouterDevtools-B7vy70jP-LByakPIj.js    19.26 kB │ gzip:  5.03 kB
dist/assets/ToolbarRootContext-cjQVsChC.js                         22.21 kB │ gzip:  8.17 kB
dist/assets/carousel-SoF0HB4y.js                                   23.19 kB │ gzip:  8.94 kB
dist/assets/select-Bf8Va4Ea.js                                     30.09 kB │ gzip: 10.61 kB
dist/assets/esm-CGQqJHbq.js                                        31.47 kB │ gzip:  8.55 kB
dist/assets/PageLayout-Dx7Ij_Ue.js                                 33.10 kB │ gzip: 10.56 kB
dist/assets/createLucideIcon-LXV1uvao.js                           36.52 kB │ gzip: 12.62 kB
dist/assets/i18n-BxDHHIQX.js                                       53.69 kB │ gzip: 16.95 kB
dist/assets/components-DUKnFWBw.js                                 55.25 kB │ gzip: 14.87 kB
dist/assets/BaseTanStackRouterDevtoolsPanel-Bmws3ikM-DnYZE-is.js   55.83 kB │ gzip: 17.98 kB
dist/assets/chevron-down-fD2jc7Um.js                               65.73 kB │ gzip: 23.50 kB
dist/assets/table-drf7pFjV.js                                      91.36 kB │ gzip: 26.48 kB
dist/assets/tanstack-form-n_xiejPZ.js                              99.85 kB │ gzip: 26.65 kB
dist/assets/LF5QLUHI-Da5kKwWE.js                                  105.19 kB │ gzip: 38.70 kB
dist/assets/index-D0ZwhAED.js                                     309.08 kB │ gzip: 95.15 kB

✓ built in 830ms
```

## Lint (oxlint)

```
> npm run lint


> react-expo@0.0.0 lint
> oxlint .


  ⚠ eslint-plugin-react(no-children-prop): Avoid passing children using a prop.
    ╭─[src/pages/TanStackFormPage/index.tsx:77:13]
 76 │             name="username"
 77 │             children={(field) => {
    ·             ────────
 78 │               const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
    ╰────
  help: The canonical way to pass children in React is to use JSX elements

  ⚠ eslint-plugin-react(no-children-prop): Avoid passing children using a prop.
     ╭─[src/pages/TanStackFormPage/index.tsx:100:13]
  99 │             name="description"
 100 │             children={(field) => {
     ·             ────────
 101 │               const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
     ╰────
  help: The canonical way to pass children in React is to use JSX elements

  ⚠ eslint-plugin-react(no-children-prop): Avoid passing children using a prop.
     ╭─[src/pages/TanStackFormPage/index.tsx:124:13]
 123 │             name="email"
 124 │             children={(field) => {
     ·             ────────
 125 │               const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
     ╰────
  help: The canonical way to pass children in React is to use JSX elements

  ⚠ eslint-plugin-react(no-children-prop): Avoid passing children using a prop.
     ╭─[src/pages/TanStackFormPage/index.tsx:148:13]
 147 │             name="gender"
 148 │             children={(field) => {
     ·             ────────
 149 │               const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
     ╰────
  help: The canonical way to pass children in React is to use JSX elements

  ⚠ eslint-plugin-react(no-children-prop): Avoid passing children using a prop.
     ╭─[src/pages/TanStackFormPage/index.tsx:182:13]
 181 │             name="notifications"
 182 │             children={(field) => {
     ·             ────────
 183 │               const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
     ╰────
  help: The canonical way to pass children in React is to use JSX elements

  ⚠ eslint-plugin-react(no-children-prop): Avoid passing children using a prop.
     ╭─[src/pages/TanStackFormPage/index.tsx:223:13]
 222 │             name="agreeToTerms"
 223 │             children={(field) => {
     ·             ────────
 224 │               const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
     ╰────
  help: The canonical way to pass children in React is to use JSX elements

Found 6 warnings and 0 errors.
Finished in 16ms on 64 files with 93 rules using 8 threads.
```

## Format check (oxfmt)

```
>npm run fmt:check

> react-expo@0.0.0 fmt:check
> oxfmt --check .

Checking formatting...

.oxfmtrc.json (250ms)
.vscode/extensions.json (7ms)
README.md (153ms)
components.json (169ms)
package.json (56ms)
public/locales/en/navbar.json (5ms)
public/locales/fr/navbar.json (4ms)
src/components/Navbar/index.tsx (1ms)
src/components/PageLayout/index.tsx (0ms)
src/components/PageTitle/index.tsx (0ms)
src/components/Rating/index.tsx (0ms)
src/components/TMDB/GenreControl/index.tsx (0ms)
src/components/TMDB/Menu/index.tsx (0ms)
src/components/TMDB/SortControl/index.tsx (0ms)
src/i18n.ts (0ms)
src/lib/utils.ts (0ms)
src/main.css (86ms)
src/main.tsx (0ms)
src/pages/CarouselPage/index.tsx (0ms)
src/pages/CounterPage/index.tsx (0ms)
src/pages/DiffPage/index.tsx (0ms)
src/pages/HomePage/index.tsx (0ms)
src/pages/PostsPage/PostsList.tsx (0ms)
src/pages/RatingPage/index.tsx (0ms)
src/pages/SonnerPage/index.tsx (0ms)
src/pages/TMDB/Movies/index.tsx (1ms)
src/pages/TMDB/Search/index.tsx (0ms)
src/pages/TMDB/TVShows/index.tsx (0ms)
src/pages/TablePage/index.tsx (1ms)
src/pages/TableSimplePage/index.tsx (0ms)
src/pages/TanStackFormPage/index.tsx (1ms)
src/pages/TestPage/index.tsx (0ms)
src/routes/sonner.tsx (0ms)
src/state/counter/counterStore.ts (0ms)
src/state/store.ts (0ms)
src/types/Post.tsx (0ms)

Format issues found in above 36 files. Run without `--check` to fix.
Finished in 508ms on 80 files using 8 threads.
```

## ESLint + Prettier → Oxlint + Oxfmt: Dependency Impact

### Direct Packages Removed (9)

| Package                            | Role                        | Version |
| ---------------------------------- | --------------------------- | ------- |
| `eslint`                           | Core linter                 | ^9.39.3 |
| `@eslint/js`                       | ESLint JS rules             | ^9.39.3 |
| `eslint-plugin-react`              | React linting rules         | ^7.37.5 |
| `eslint-plugin-react-hooks`        | React Hooks linting         | ^7.0.1  |
| `@typescript-eslint/eslint-plugin` | TS linting rules            | ^8.56.1 |
| `@typescript-eslint/parser`        | TS parser for ESLint        | ^8.56.1 |
| `typescript-eslint`                | TS-ESLint integration       | ^8.56.1 |
| `globals`                          | Global variable definitions | ^17.4.0 |
| `prettier`                         | Code formatter              | ^3.7.4  |

### Direct Packages Added (2)

| Package  | Role                                            |
| -------- | ----------------------------------------------- |
| `oxlint` | Rust-based linter (replaces ESLint + 6 plugins) |
| `oxfmt`  | Rust-based formatter (replaces Prettier)        |

### Transitive Dependencies Removed (~228 packages)

Grouped by why they existed:

#### 1. ESLint Core Infrastructure (15 packages)

These powered ESLint's config system, plugin loading, and file handling.

`@eslint/config-array`, `@eslint/config-helpers`, `@eslint/core`, `@eslint/eslintrc`, `@eslint/object-schema`, `@eslint/plugin-kit`, `@humanfs/core`, `@humanfs/node`, `@humanwhocodes/module-importer`, `@humanwhocodes/retry`, `espree`, `esquery`, `esrecurse`, `estraverse`, `file-entry-cache`

#### 2. TypeScript-ESLint (4 packages)

Bridge between TypeScript and ESLint.

`@typescript-eslint/scope-manager`, `@typescript-eslint/typescript-estree`, `@typescript-eslint/utils`, `ts-api-utils`

#### 3. ESLint CLI & Reporting (12 packages)

Command-line execution, output formatting, option parsing.

`optionator`, `levn`, `prelude-ls`, `type-check`, `deep-is`, `fast-levenshtein`, `word-wrap`, `strip-json-comments`, `natural-compare`, `chalk`, `supports-color`, `has-flag`

#### 4. Config Resolution & Module Loading (8 packages)

Finding and loading config files and plugins.

`resolve`, `resolve-from`, `import-fresh`, `parent-module`, `callsites`, `ajv`, `uri-js`, `punycode`

#### 5. File Discovery & Matching (13 packages)

Globbing, ignoring, and path matching.

`minimatch`, `brace-expansion`, `balanced-match`, `concat-map`, `ignore`, `p-locate`, `p-limit`, `path-exists`, `cross-spawn`, `which`, `isexe`, `shebang-command`, `shebang-regex`

#### 6. ES Specification Polyfills (~100+ packages)

The biggest category — pulled in by `eslint-plugin-react` and `eslint-plugin-react-hooks` to introspect JS values at a spec level.

`es-abstract`, `es-errors`, `es-object-atoms`, `call-bind`, `call-bound`, `get-intrinsic`, `get-proto`, `set-proto`, `define-properties`, `define-data-property`, `has-symbols`, `has-tostringtag`, `has-proto`, `has-property-descriptors`, `gopd`, `side-channel`, `side-channel-list`, `side-channel-map`, `side-channel-weakmap`, `object-keys`, `object.assign`, `object.entries`, `object.fromentries`, `object.values`, `string.prototype.trim`, `string.prototype.trimend`, `string.prototype.trimstart`, `string.prototype.matchall`, `string.prototype.repeat`, `typed-array-buffer`, `typed-array-byte-length`, `typed-array-byte-offset`, `typed-array-length`, `regexp.prototype.flags`, `reflect.getprototypeof`, `safe-array-concat`, `safe-push-apply`, `safe-regex-test`, `which-boxed-primitive`, `which-builtin-type`, `which-collection`, `which-typed-array`, `unbox-primitive`, `is-regex`, `is-string`, `is-symbol`, `is-bigint`, `is-boolean-object`, `is-number-object`, `is-date-object`, `is-map`, `is-set`, `is-weakmap`, `is-weakset`, `is-weakref`, `is-typed-array`, `is-async-function`, `is-generator-function`, `is-finalizationregistry`, `is-core-module`, `isarray`, `for-each`, `available-typed-arrays`, `possible-typed-array-names`, `internal-slot`, `stop-iteration-iterator`, `array.prototype.flatmap`, `function.prototype.name`, `functions-have-names`, `set-function-length`, `set-function-name`, `function-bind`, `dunder-proto`, `math-intrinsics`, `own-keys`, and more.

#### 7. React Plugin Specific (3 packages)

Used by `eslint-plugin-react` for prop-types analysis.

`prop-types`, `react-is`, `object-assign`

#### 8. Other Utilities (5+ packages)

`js-yaml`, `argparse`, `json-stable-stringify-without-jsonify`, `yocto-queue`, `node-exports-info`, `zod-validation-error`, `normalize-path`

### Transitive Dependencies Added (~5 packages)

| Package                          | Role                                                                     |
| -------------------------------- | ------------------------------------------------------------------------ |
| `@oxfmt/binding-win32-x64-msvc`  | Native binary for oxfmt (+ 18 platform variants, only your OS installs)  |
| `@oxlint/binding-win32-x64-msvc` | Native binary for oxlint (+ 18 platform variants, only your OS installs) |
| `tinypool`                       | Worker pool used by oxfmt                                                |

### Overall Impact

| Metric                      | Before (ESLint + Prettier) | After (Oxlint + Oxfmt)  |
| --------------------------- | -------------------------- | ----------------------- |
| **Direct devDependencies**  | 9 packages                 | 2 packages              |
| **Transitive dependencies** | ~228                       | ~5                      |
| **package-lock.json lines** | 7,341                      | 4,608 **(−37%)**        |
| **package-lock.json diff**  | —                          | +1,713 / −4,446 = -2733 |

The overwhelming majority of removed packages (~100+) were ES spec polyfills — an artifact of `eslint-plugin-react` doing deep JavaScript value introspection in pure JS. Oxlint avoids this entirely by being a compiled Rust binary with all rules built in.
