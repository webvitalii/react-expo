# Performance reports format

## Summary

Added shadcn as a dependency to the project.
The shadcn install added +274 npm packages (224 → 498, +122%) and 4 moderate vulnerabilities appeared, all in dev-only dependencies.

## npm install

```bash
$ npm install

> react-expo@0.0.0 prepare
> husky


removed 3 packages, changed 1 package, and audited 498 packages in 2s

170 packages are looking for funding
  run `npm fund` for details

4 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

## npm run dev

```bash
$ npm run dev

> react-expo@0.0.0 dev
> vite


  VITE v8.0.10  ready in 973 ms

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
✓ 2459 modules transformed.
computing gzip size...
dist/index.html                             0.93 kB │ gzip:  0.41 kB
dist/assets/index-C_m24vzK.css             79.90 kB │ gzip: 12.68 kB
dist/assets/movies-DD-YevbH.js              0.07 kB │ gzip:  0.08 kB
dist/assets/tv-shows-DmPhF-PH.js            0.07 kB │ gzip:  0.08 kB
dist/assets/forms-Dbij1CgU.js               0.07 kB │ gzip:  0.08 kB
dist/assets/tmdb-CDR3uG5l.js                0.15 kB │ gzip:  0.14 kB
dist/assets/posts-D8zW2bwf.js               0.22 kB │ gzip:  0.18 kB
dist/assets/forms-xCZTrXKg.js               0.26 kB │ gzip:  0.20 kB
dist/assets/_lang-CZJngRhA.js               0.40 kB │ gzip:  0.28 kB
dist/assets/rolldown-runtime-jpDsebLB.js    0.56 kB │ gzip:  0.36 kB
dist/assets/table-simple-B8AQfMld.js        0.75 kB │ gzip:  0.35 kB
dist/assets/counter-CG_Fn9ny.js             0.87 kB │ gzip:  0.41 kB
dist/assets/input-CH3So3l7.js               0.92 kB │ gzip:  0.49 kB
dist/assets/test-B2bem4h5.js                0.99 kB │ gzip:  0.47 kB
dist/assets/rating-pnqmOm97.js              1.13 kB │ gzip:  0.60 kB
dist/assets/checkbox-BMF4Jpo8.js            1.14 kB │ gzip:  0.55 kB
dist/assets/table-BccPgg18.js               1.25 kB │ gzip:  0.50 kB
dist/assets/card-OJxszZT3.js                1.42 kB │ gzip:  0.58 kB
dist/assets/_postId-BZe5UaUQ.js             1.42 kB │ gzip:  0.64 kB
dist/assets/pagination-B6rDfZnW.js          1.70 kB │ gzip:  0.68 kB
dist/assets/_lang-BPNpgQ7u.js               1.93 kB │ gzip:  0.67 kB
dist/assets/posts-DUWecYBJ.js               1.94 kB │ gzip:  0.85 kB
dist/assets/search-C3gt_LWM.js              1.99 kB │ gzip:  0.97 kB
dist/assets/radio-group-CRuB2jv_.js         2.26 kB │ gzip:  0.79 kB
dist/assets/tmdb-aGKUDf8z.js                3.28 kB │ gzip:  1.61 kB
dist/assets/sonner-BoajCmSm.js              3.81 kB │ gzip:  1.23 kB
dist/assets/carousel-CcBjA7J-.js            3.83 kB │ gzip:  1.36 kB
dist/assets/table-DWS27y_R.js               7.37 kB │ gzip:  2.54 kB
dist/assets/bmi-TtP77Pej.js                 7.51 kB │ gzip:  2.19 kB
dist/assets/error-boundary-BhTRLRi0.js      8.25 kB │ gzip:  2.37 kB
dist/assets/tanstack-form-DgTQL7pb.js       8.39 kB │ gzip:  2.52 kB
dist/assets/diff-CXodfN00.js               10.87 kB │ gzip:  3.42 kB
dist/assets/index-D3Pdw1Xq.js              36.77 kB │ gzip: 10.36 kB
dist/assets/zod-BCRQ3Wky.js                56.45 kB │ gzip: 15.46 kB
dist/assets/i18n-CrQxGdaB.js               60.47 kB │ gzip: 19.65 kB
dist/assets/vendor-CATt8UvJ.js            108.53 kB │ gzip: 35.38 kB
dist/assets/react-B7lphd9s.js             189.64 kB │ gzip: 59.64 kB
dist/assets/base-ui-L1ywNkm2.js           201.03 kB │ gzip: 66.22 kB
dist/assets/tanstack-B5sykQiE.js          211.57 kB │ gzip: 59.64 kB

✓ built in 755ms
```

## npm run lint

```bash
$ npm run lint


Found 39 warnings and 19 errors.
Finished in 1.3s on 89 files with 137 rules using 8 threads.
```

## npm run fmt:check

```bash
$ npm run fmt:check


> react-expo@0.0.0 fmt:check
> oxfmt --check

Checking formatting...

.oxlintrc.json (329ms)
README.md (54ms)
components.json (237ms)
performance/2026-03-20-vite-7-baseline.md (9ms)
performance/2026-03-21-vite-8-migration.md (16ms)
performance/2026-03-26-oxlint-oxfmt-migration.md (88ms)
performance/2026-04-22-oxlint-type-aware.md (74ms)
public/locales/en/navbar.json (125ms)
public/locales/fr/navbar.json (7ms)
src/pages/TMDB/Search/index.tsx (0ms)
src/pages/TanStackFormPage/index.tsx (1ms)
src/queries/tmdb.ts (0ms)

Format issues found in above 12 files. Run without `--check` to fix.
Finished in 566ms on 114 files using 8 threads.
```
