# Performance reports format

## npm install

```bash
$ npm install

> react-expo@0.0.0 prepare
> husky


up to date, audited 224 packages in 1s

79 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## npm run dev

```bash
$ npm run dev

> react-expo@0.0.0 dev
> vite


  VITE v8.0.10  ready in 971 ms

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
✓ 2497 modules transformed.
computing gzip size...
dist/index.html                             0.61 kB │ gzip:   0.34 kB
dist/assets/index-By8AkuK7.css             64.42 kB │ gzip:  10.92 kB
dist/assets/movies-D8D_V237.js              0.07 kB │ gzip:   0.08 kB
dist/assets/tv-shows-DTESTmyH.js            0.07 kB │ gzip:   0.08 kB
dist/assets/forms-CIZti7iR.js               0.07 kB │ gzip:   0.08 kB
dist/assets/tmdb-4lNOjPht.js                0.12 kB │ gzip:   0.13 kB
dist/assets/posts-DV4_lmQV.js               0.16 kB │ gzip:   0.15 kB
dist/assets/forms-BgTuSjWY.js               0.19 kB │ gzip:   0.17 kB
dist/assets/chevron-right-8hL0uPvo.js       0.19 kB │ gzip:   0.16 kB
dist/assets/_lang-CepYoKD0.js               0.29 kB │ gzip:   0.24 kB
dist/assets/chunk-CaILmz35.js               0.56 kB │ gzip:   0.36 kB
dist/assets/table-simple-BblneEdK.js        0.68 kB │ gzip:   0.32 kB
dist/assets/_lang-Cwo-moWR.js               0.89 kB │ gzip:   0.38 kB
dist/assets/test-Cb2jGDuu.js                0.95 kB │ gzip:   0.45 kB
dist/assets/table-Bq0isTr1.js               1.21 kB │ gzip:   0.50 kB
dist/assets/card-D2e35FF6.js                1.42 kB │ gzip:   0.57 kB
dist/assets/_postId-DEtBC4yn.js             1.42 kB │ gzip:   0.66 kB
dist/assets/rating-BuMxD5D6.js              1.48 kB │ gzip:   0.80 kB
dist/assets/posts-CjbSwHl9.js               1.87 kB │ gzip:   0.82 kB
dist/assets/pagination-BjeWnLtB.js          1.88 kB │ gzip:   0.76 kB
dist/assets/search-DrJNXIcA.js              1.91 kB │ gzip:   0.94 kB
dist/assets/input-CTTb7P2J.js               2.23 kB │ gzip:   1.16 kB
dist/assets/tmdb-BWsC_XcJ.js                3.21 kB │ gzip:   1.57 kB
dist/assets/sonner-yPSMnYsQ.js              3.74 kB │ gzip:   1.20 kB
dist/assets/bmi-BZMvveyw.js                 4.80 kB │ gzip:   1.41 kB
dist/assets/counter-DpZxk7Es.js             5.83 kB │ gzip:   2.17 kB
dist/assets/checkbox-DAA_tLVY.js            6.01 kB │ gzip:   2.81 kB
dist/assets/radio-group-BdFifUwY.js         7.62 kB │ gzip:   3.16 kB
dist/assets/browser-ponyfill-D3fcr6xd.js   10.47 kB │ gzip:   3.57 kB
dist/assets/diff-DZoSq3VN.js               10.65 kB │ gzip:   3.87 kB
dist/assets/carousel-DQdDyCSa.js           22.94 kB │ gzip:   8.85 kB
dist/assets/utils-DNQKxVT4.js              26.41 kB │ gzip:   8.43 kB
dist/assets/table-Co9vCiFp.js              84.67 kB │ gzip:  24.68 kB
dist/assets/tanstack-form-CVWuZXQP.js     105.40 kB │ gzip:  28.16 kB
dist/assets/index-kEPe9uMr.js             595.35 kB │ gzip: 188.31 kB

✓ built in 862ms
[plugin builtin:vite-reporter]
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rolldownOptions.output.codeSplitting to improve chunking: https://rolldown.rs/reference/OutputOptions.codeSplitting
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
```

## npm run lint

```bash
$ npm run lint


Found 33 warnings and 21 errors.
Finished in 1.4s on 70 files with 137 rules using 8 threads.
```

## npm run fmt:check

```bash
$ npm run fmt:check

> react-expo@0.0.0 fmt:check
> oxfmt --check

Checking formatting...

.oxlintrc.json (184ms)
README.md (252ms)
components.json (253ms)
performance/2026-03-20-vite-7-baseline.md (15ms)
performance/2026-03-21-vite-8-migration.md (18ms)
performance/2026-03-26-oxlint-oxfmt-migration.md (67ms)
performance/2026-04-22-oxlint-type-aware.md (7ms)
performance/2026-04-28-performance.md (61ms)
performance/README.md (65ms)
public/locales/en/navbar.json (4ms)
public/locales/fr/navbar.json (4ms)

Format issues found in above 11 files. Run without `--check` to fix.
Finished in 464ms on 92 files using 8 threads.
```
