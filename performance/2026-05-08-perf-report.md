# Performance report

# Summary:

- updated tsconfig options
- Added theme switch
- Use default shadcn css and inter font

## npm install

```bash
$ npm install

> react-expo@0.0.0 prepare
> husky


up to date, audited 494 packages in 2s

171 packages are looking for funding
  run `npm fund` for details

2 moderate severity vulnerabilities

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
```

## npm run dev

```bash
$ npm run dev

> react-expo@0.0.0 dev
> vite


  VITE v8.0.10  ready in 981 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## npm run build

```bash
$ npm run build


> react-expo@0.0.0 build
> tsc && vite build

vite v8.0.10 building client environment for production...
✓ 2465 modules transformed.
computing gzip size...
dist/index.html                                              1.02 kB │ gzip:  0.42 kB
dist/assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2     10.25 kB
dist/assets/inter-greek-ext-wght-normal-DlzME5K_.woff2      11.23 kB
dist/assets/inter-cyrillic-wght-normal-DqGufNeO.woff2       18.74 kB
dist/assets/inter-greek-wght-normal-CkhJZR-_.woff2          18.99 kB
dist/assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2   25.96 kB
dist/assets/inter-latin-wght-normal-Dx4kXJAl.woff2          48.25 kB
dist/assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2      85.06 kB
dist/assets/index-BwY4b08l.css                              80.32 kB │ gzip: 13.24 kB
dist/assets/movies-Wws6hoZr.js                               0.07 kB │ gzip:  0.08 kB
dist/assets/tv-shows-DSlHWq5s.js                             0.07 kB │ gzip:  0.08 kB
dist/assets/forms-jOHwvweL.js                                0.07 kB │ gzip:  0.08 kB
dist/assets/tmdb-Bb53a16H.js                                 0.15 kB │ gzip:  0.14 kB
dist/assets/posts-C5JTYGH6.js                                0.22 kB │ gzip:  0.18 kB
dist/assets/forms-DzsRse2J.js                                0.26 kB │ gzip:  0.20 kB
dist/assets/_lang-D60Hak5p.js                                0.40 kB │ gzip:  0.28 kB
dist/assets/rolldown-runtime-jpDsebLB.js                     0.56 kB │ gzip:  0.36 kB
dist/assets/table-simple-BuhL4o9n.js                         0.75 kB │ gzip:  0.34 kB
dist/assets/counter-BHjwnydz.js                              0.87 kB │ gzip:  0.41 kB
dist/assets/input-DrQQZotd.js                                0.92 kB │ gzip:  0.49 kB
dist/assets/test-DqIp5Jf3.js                                 0.99 kB │ gzip:  0.47 kB
dist/assets/rating-C6Jk1lnW.js                               1.13 kB │ gzip:  0.60 kB
dist/assets/checkbox-C0XKRaBX.js                             1.14 kB │ gzip:  0.55 kB
dist/assets/preload-helper-DWTEM3RW.js                       1.19 kB │ gzip:  0.68 kB
dist/assets/table-BdjxNCb7.js                                1.25 kB │ gzip:  0.50 kB
dist/assets/card-B6wxGN8I.js                                 1.42 kB │ gzip:  0.58 kB
dist/assets/_postId-Z7zsOyKH.js                              1.42 kB │ gzip:  0.64 kB
dist/assets/pagination-D4ZOR_pk.js                           1.70 kB │ gzip:  0.68 kB
dist/assets/_lang-CtYzCDJV.js                                1.93 kB │ gzip:  0.67 kB
dist/assets/posts-DKPpd9SJ.js                                1.94 kB │ gzip:  0.85 kB
dist/assets/search-BNzA51Ay.js                               1.99 kB │ gzip:  0.97 kB
dist/assets/radio-group-CEGtxxSY.js                          2.26 kB │ gzip:  0.80 kB
dist/assets/tmdb-Ccl1qgF3.js                                 3.28 kB │ gzip:  1.61 kB
dist/assets/sonner-NIvpDznY.js                               3.81 kB │ gzip:  1.23 kB
dist/assets/carousel-C10z-lMp.js                             3.83 kB │ gzip:  1.35 kB
dist/assets/table-Dc6_-wWp.js                                5.05 kB │ gzip:  1.80 kB
dist/assets/bmi-DxCbAEXi.js                                  7.51 kB │ gzip:  2.19 kB
dist/assets/error-boundary-DAceN7ya.js                       8.25 kB │ gzip:  2.37 kB
dist/assets/tanstack-form-5yxjL5X_.js                        8.39 kB │ gzip:  2.52 kB
dist/assets/diff-CF7bmJuU.js                                10.87 kB │ gzip:  3.42 kB
dist/assets/index-CqooS8ZF.js                               42.43 kB │ gzip: 11.78 kB
dist/assets/i18n-BewfsDek.js                                53.70 kB │ gzip: 17.62 kB
dist/assets/zod-gifmIp-w.js                                 59.28 kB │ gzip: 16.04 kB
dist/assets/vendor-Cv1L3RYx.js                              98.89 kB │ gzip: 32.45 kB
dist/assets/react-B7lphd9s.js                              189.64 kB │ gzip: 59.64 kB
dist/assets/base-ui-BWx_JFL9.js                            201.02 kB │ gzip: 66.00 kB
dist/assets/tanstack-BrDJh0Bw.js                           210.86 kB │ gzip: 59.46 kB

✓ built in 949ms
```

## npm run lint

```bash
$ npm run lint

Found 40 warnings and 13 errors.
Finished in 1.2s on 91 files with 137 rules using 8 threads.
```

## npm run fmt:check

```bash
$ npm run fmt:check

> react-expo@0.0.0 fmt:check
> oxfmt --check

Checking formatting...

.oxlintrc.json (215ms)
README.md (51ms)
components.json (224ms)
performance/2026-03-20-vite-7-baseline.md (62ms)
performance/2026-03-21-vite-8-migration.md (76ms)
performance/2026-03-26-oxlint-oxfmt-migration.md (74ms)
performance/2026-04-22-oxlint-type-aware.md (5ms)
public/locales/en/navbar.json (4ms)
public/locales/fr/navbar.json (6ms)
src/pages/TMDB/Search/index.tsx (0ms)
src/pages/TanStackFormPage/index.tsx (2ms)
src/queries/tmdb.ts (0ms)

Format issues found in above 12 files. Run without `--check` to fix.
Finished in 484ms on 117 files using 8 threads.

```
