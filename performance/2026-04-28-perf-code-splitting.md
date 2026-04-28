# Performance reports format

## Summary

| Metric              | perf-report (before) | perf-code-splitting (after) | Δ                      |
| ------------------- | -------------------- | --------------------------- | ---------------------- |
| Modules transformed | 2497                 | 2424                        | −73 (devtools removed) |
| Entry chunk (raw)   | 595.35 kB            | 34.32 kB                    | −94% ⭐                |
| Entry chunk (gzip)  | 188.31 kB            | 9.11 kB                     | −95% ⭐                |
| >500 kB warning     | Yes                  | No                          | resolved               |

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


  VITE v8.0.10  ready in 966 ms

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
✓ 2424 modules transformed.
computing gzip size...
dist/index.html                             0.93 kB │ gzip:  0.41 kB
dist/assets/index-By8AkuK7.css             64.42 kB │ gzip: 10.92 kB
dist/assets/movies-FiDFj3aX.js              0.07 kB │ gzip:  0.08 kB
dist/assets/tv-shows-CatBuxVe.js            0.07 kB │ gzip:  0.08 kB
dist/assets/forms-4cC0Dvz0.js               0.07 kB │ gzip:  0.08 kB
dist/assets/tmdb-Cisb2z2x.js                0.15 kB │ gzip:  0.14 kB
dist/assets/posts-CvZ--s9M.js               0.22 kB │ gzip:  0.18 kB
dist/assets/forms-D3wr04Rn.js               0.25 kB │ gzip:  0.20 kB
dist/assets/_lang-DewhbFl6.js               0.40 kB │ gzip:  0.28 kB
dist/assets/rolldown-runtime-jpDsebLB.js    0.56 kB │ gzip:  0.36 kB
dist/assets/table-simple-B9ptnAW2.js        0.75 kB │ gzip:  0.35 kB
dist/assets/counter-DJUnsY9j.js             0.87 kB │ gzip:  0.41 kB
dist/assets/_lang-DikNUdYY.js               0.92 kB │ gzip:  0.40 kB
dist/assets/input-DTVsKmxz.js               0.92 kB │ gzip:  0.49 kB
dist/assets/test-D-8jX0aU.js                0.99 kB │ gzip:  0.47 kB
dist/assets/rating-DYUuDO3F.js              1.13 kB │ gzip:  0.60 kB
dist/assets/checkbox-BEixR4CL.js            1.14 kB │ gzip:  0.55 kB
dist/assets/table-C3zlYY8O.js               1.22 kB │ gzip:  0.49 kB
dist/assets/card-BVwVBNF9.js                1.42 kB │ gzip:  0.57 kB
dist/assets/_postId-CnqoybPw.js             1.42 kB │ gzip:  0.63 kB
dist/assets/pagination-DP1fYRoc.js          1.70 kB │ gzip:  0.67 kB
dist/assets/posts-Bh3IRKSX.js               1.94 kB │ gzip:  0.84 kB
dist/assets/search-Bs_vCQ1H.js              1.99 kB │ gzip:  0.97 kB
dist/assets/radio-group-D4HVEr87.js         2.26 kB │ gzip:  0.80 kB
dist/assets/diff-dydLdDE5.js                2.38 kB │ gzip:  0.94 kB
dist/assets/tmdb-B0l-b7k8.js                3.28 kB │ gzip:  1.60 kB
dist/assets/sonner-VSFJeDjO.js              3.81 kB │ gzip:  1.23 kB
dist/assets/carousel-CTLQzO1f.js            3.83 kB │ gzip:  1.36 kB
dist/assets/bmi-Ry-Xpj-0.js                 4.84 kB │ gzip:  1.42 kB
dist/assets/table-mkWF-Ixl.js               7.37 kB │ gzip:  2.54 kB
dist/assets/tanstack-form-B62jmtRP.js       8.39 kB │ gzip:  2.52 kB
dist/assets/index-0YtMDjo3.js              34.32 kB │ gzip:  9.11 kB
dist/assets/zod-BCRQ3Wky.js                56.45 kB │ gzip: 15.46 kB
dist/assets/i18n-DZBiZ6rP.js               60.47 kB │ gzip: 19.65 kB
dist/assets/vendor-CRKlJKBh.js            103.88 kB │ gzip: 33.70 kB
dist/assets/react-B7lphd9s.js             189.64 kB │ gzip: 59.64 kB
dist/assets/base-ui-C48i11As.js           194.29 kB │ gzip: 64.15 kB
dist/assets/tanstack-Dz-waMfv.js          211.61 kB │ gzip: 60.72 kB

✓ built in 691ms
```

## npm run lint

```bash
$ npm run lint


Found 33 warnings and 21 errors.
Finished in 1.6s on 71 files with 137 rules using 8 threads.
```

## npm run fmt:check

```bash
$ npm run fmt:check


> react-expo@0.0.0 fmt:check
> oxfmt --check

Checking formatting...

.oxlintrc.json (160ms)
README.md (49ms)
components.json (135ms)
performance/2026-03-20-vite-7-baseline.md (11ms)
performance/2026-03-21-vite-8-migration.md (14ms)
performance/2026-03-26-oxlint-oxfmt-migration.md (64ms)
performance/2026-04-22-oxlint-type-aware.md (6ms)
public/locales/en/navbar.json (5ms)
public/locales/fr/navbar.json (4ms)

Format issues found in above 9 files. Run without `--check` to fix.
Finished in 528ms on 94 files using 8 threads.
```
