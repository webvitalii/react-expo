# Performance: Vite 7 Baseline

## Local Development - 3853 ms

```
>npm run dev

> react-expo@0.0.0 dev
> vite


  VITE v7.3.1  ready in 3853 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## Build - 6.70s

```
>npm run build

> react-expo@0.0.0 build
> tsc && vite build

vite v7.3.1 building client environment for production...
✓ 2502 modules transformed.
dist/index.html                                   0.46 kB │ gzip:   0.30 kB
dist/assets/index-ChHdydds.css                   61.13 kB │ gzip:  10.54 kB
dist/assets/index-BqMThedm.js                     0.07 kB │ gzip:   0.08 kB
dist/assets/index-t7DKSsGu.js                     0.11 kB │ gzip:   0.12 kB
dist/assets/serializeValue-B8e3iXO-.js            0.13 kB │ gzip:   0.13 kB
dist/assets/index-CTmjbo4B.js                     0.15 kB │ gzip:   0.15 kB
dist/assets/EventClient-C3NHPNPQ.js               0.16 kB │ gzip:   0.15 kB
dist/assets/index-BasFPfvo.js                     0.19 kB │ gzip:   0.17 kB
dist/assets/chevron-right-BQ3zrGSL.js             0.22 kB │ gzip:   0.19 kB
dist/assets/_lang-9cDZd4Hw.js                     0.30 kB │ gzip:   0.24 kB
dist/assets/useValueChanged-UQPzjGqR.js           0.30 kB │ gzip:   0.25 kB
dist/assets/clsx-B-dksMZM.js                      0.37 kB │ gzip:   0.24 kB
dist/assets/forms-8P3QnQEq.js                     0.40 kB │ gzip:   0.26 kB
dist/assets/posts-Bl8GDJo5.js                     0.47 kB │ gzip:   0.29 kB
dist/assets/index-Dc_MyOUy.js                     0.79 kB │ gzip:   0.40 kB
dist/assets/counter-D0idRrBw.js                   1.16 kB │ gzip:   0.55 kB
dist/assets/table-DDgqZICU.js                     1.16 kB │ gzip:   0.48 kB
dist/assets/index-C9C-jaDB.js                     1.16 kB │ gzip:   0.52 kB
dist/assets/test-FhwdnqUQ.js                      1.23 kB │ gzip:   0.59 kB
dist/assets/table-simple-DOH7_Cv6.js              1.26 kB │ gzip:   0.62 kB
dist/assets/card-B1joyOrt.js                      1.36 kB │ gzip:   0.55 kB
dist/assets/rating-D6yL8lta.js                    1.68 kB │ gzip:   0.89 kB
dist/assets/pagination-CorLr0Ld.js                1.83 kB │ gzip:   0.75 kB
dist/assets/goober.modern-DF6QySbH.js             1.88 kB │ gzip:   1.12 kB
dist/assets/_postId-Dz-K7DWW.js                   2.08 kB │ gzip:   0.94 kB
dist/assets/tv-shows-DgLl-BXO.js                  2.26 kB │ gzip:   1.14 kB
dist/assets/input-BU8s4dY5.js                     2.28 kB │ gzip:   1.17 kB
dist/assets/index-9YbfSbwY.js                     2.30 kB │ gzip:   1.11 kB
dist/assets/search-Ctlq07fx.js                    2.30 kB │ gzip:   1.17 kB
dist/assets/movies-W_tCGLsz.js                    2.32 kB │ gzip:   1.16 kB
dist/assets/config-DRunFnp6.js                    2.54 kB │ gzip:   1.08 kB
dist/assets/button-BR1N5w0H.js                    2.89 kB │ gzip:   1.03 kB
dist/assets/useField-BrMIUaFY.js                  2.89 kB │ gzip:   1.31 kB
dist/assets/bmi-DVgtytle.js                       3.26 kB │ gzip:   1.27 kB
dist/assets/tmdb-Zxefqhx7.js                      3.50 kB │ gzip:   1.71 kB
dist/assets/useTranslation-BHKBmn8o.js            3.55 kB │ gzip:   1.73 kB
dist/assets/plugin-W3ivlmy3.js                    4.09 kB │ gzip:   1.37 kB
dist/assets/sonner-C_fk-nPj.js                    4.11 kB │ gzip:   1.46 kB
dist/assets/CompositeItem-C-jqU7Qy.js             4.61 kB │ gzip:   2.08 kB
dist/assets/checkbox-DanMknj9.js                  5.61 kB │ gzip:   2.59 kB
dist/assets/useBaseUiId-BInqjW36.js               6.72 kB │ gzip:   2.96 kB
dist/assets/dayjs.min-DuL28YNh.js                 7.15 kB │ gzip:   3.11 kB
dist/assets/label-CqA5a1qw.js                     7.75 kB │ gzip:   3.16 kB
dist/assets/diff-C2PzShtp.js                      9.23 kB │ gzip:   3.59 kB
dist/assets/index-edH1w3fe.js                     9.37 kB │ gzip:   3.53 kB
dist/assets/browser-ponyfill-DqXh9yBF.js         10.30 kB │ gzip:   3.52 kB
dist/assets/getPseudoElementBounds-Cdj-1eRC.js   22.41 kB │ gzip:   8.44 kB
dist/assets/carousel-D_IJJbfT.js                 23.78 kB │ gzip:   9.42 kB
dist/assets/index-H00PZ0Cq.js                    26.83 kB │ gzip:   6.78 kB
dist/assets/select-CsjBJ4KZ.js                   30.60 kB │ gzip:  10.98 kB
dist/assets/index-B0jliwP5.js                    32.67 kB │ gzip:  10.55 kB
dist/assets/section-DViy8t7e.js                  34.03 kB │ gzip:   9.19 kB
dist/assets/createLucideIcon-B-1qNVGF.js         36.84 kB │ gzip:  12.58 kB
dist/assets/index-CZFxPqIF.js                    48.29 kB │ gzip:  12.23 kB
dist/assets/chevron-down-BtghWhje.js             67.28 kB │ gzip:  24.38 kB
dist/assets/table-B6jZ-Yfk.js                    94.51 kB │ gzip:  27.92 kB
dist/assets/LF5QLUHI-CjEpSuOa.js                100.68 kB │ gzip:  38.01 kB
dist/assets/tanstack-form-Ct1AK6u6.js           101.64 kB │ gzip:  27.76 kB
dist/assets/index-DFHttE0M.js                   439.20 kB │ gzip: 139.25 kB
✓ built in 6.70s
```
