# Performance: Vite 8 Migration

## npm install: 425 packages

## Local Development - 1085 ms

```
>npm run dev

> react-expo@0.0.0 dev
> vite


  VITE v8.0.1  ready in 1085 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## Build - 804ms

```
>npm run build

> react-expo@0.0.0 build
> tsc && vite build

vite v8.0.1 building client environment for production...
✓ 2475 modules transformed.
computing gzip size...
dist/index.html                                                     2.12 kB │ gzip:  0.62 kB
dist/assets/index-Cw0ejCVj.css                                     61.68 kB │ gzip: 10.58 kB
dist/assets/root-BWrmMTUK.js                                        0.03 kB │ gzip:  0.05 kB
dist/assets/batch-D6Ird5Ov.js                                       0.11 kB │ gzip:  0.12 kB
dist/assets/serializeValue-DrzMczll.js                              0.13 kB │ gzip:  0.12 kB
dist/assets/EventClient-CFm-VEwX.js                                 0.14 kB │ gzip:  0.14 kB
dist/assets/PageTitle-Cwq6CCm9.js                                   0.15 kB │ gzip:  0.15 kB
dist/assets/tmdb-BKhGpLZU.js                                        0.15 kB │ gzip:  0.15 kB
dist/assets/chevron-right-Dre4C3Lv.js                               0.20 kB │ gzip:  0.17 kB
dist/assets/useSearch-DxgZdv36.js                                   0.21 kB │ gzip:  0.16 kB
dist/assets/useParams-CwO2BggG.js                                   0.25 kB │ gzip:  0.19 kB
dist/assets/forms-Dch3dzPK.js                                       0.31 kB │ gzip:  0.23 kB
dist/assets/forms-3xz-b7a9.js                                       0.33 kB │ gzip:  0.25 kB
dist/assets/useValueChanged-C9rknRdu.js                             0.35 kB │ gzip:  0.27 kB
dist/assets/clsx-DnqN-uhr.js                                        0.36 kB │ gzip:  0.23 kB
dist/assets/useNavigate-DiyUoZb8.js                                 0.38 kB │ gzip:  0.27 kB
dist/assets/posts-CVQ3zzjw.js                                       0.39 kB │ gzip:  0.26 kB
dist/assets/_lang-D0cRMNTa.js                                       0.46 kB │ gzip:  0.32 kB
dist/assets/redirect-mn106cdD.js                                    0.47 kB │ gzip:  0.29 kB
dist/assets/chunk-DECur_0Z.js                                       0.68 kB │ gzip:  0.41 kB
dist/assets/GenreControl-DnRGl-D6.js                                0.84 kB │ gzip:  0.40 kB
dist/assets/useMatch-dVD6oCDw.js                                    0.91 kB │ gzip:  0.50 kB
dist/assets/useRouter-CtyMp6qF.js                                   0.95 kB │ gzip:  0.54 kB
dist/assets/counter-88R-03fp.js                                     1.06 kB │ gzip:  0.49 kB
dist/assets/_lang-66zE0o9w.js                                       1.08 kB │ gzip:  0.47 kB
dist/assets/test-D4A0OmSL.js                                        1.17 kB │ gzip:  0.55 kB
dist/assets/table-simple-C0_QGU0j.js                                1.18 kB │ gzip:  0.56 kB
dist/assets/table-C0h6Itb-.js                                       1.22 kB │ gzip:  0.50 kB
dist/assets/card-suj-UmjZ.js                                        1.42 kB │ gzip:  0.58 kB
dist/assets/rating-CCQjrvES.js                                      1.66 kB │ gzip:  0.87 kB
dist/assets/goober.modern-BorvG7DF.js                               1.88 kB │ gzip:  1.08 kB
dist/assets/pagination-ncAxVJ7C.js                                  1.92 kB │ gzip:  0.77 kB
dist/assets/useStore-DnJxcPUj.js                                    1.92 kB │ gzip:  0.84 kB
dist/assets/tv-shows-C7ySgOPG.js                                    2.12 kB │ gzip:  1.05 kB
dist/assets/movies-DEs5Rajp.js                                      2.18 kB │ gzip:  1.08 kB
dist/assets/_postId-b2eZWV3r.js                                     2.23 kB │ gzip:  0.97 kB
dist/assets/search-BONf_J8a.js                                      2.32 kB │ gzip:  1.15 kB
dist/assets/input-DvPLG9km.js                                       2.33 kB │ gzip:  1.20 kB
dist/assets/posts-CEZHKH0N.js                                       2.40 kB │ gzip:  1.11 kB
dist/assets/button-BK9z6JM5.js                                      2.94 kB │ gzip:  1.05 kB
dist/assets/useField-CqDgQrFu.js                                    2.97 kB │ gzip:  1.34 kB
dist/assets/config-KMeny4zd.js                                      3.04 kB │ gzip:  1.21 kB
dist/assets/store-k3ZwuxUm.js                                       3.28 kB │ gzip:  1.40 kB
dist/assets/tiny-invariant-DYbevgx9.js                              3.33 kB │ gzip:  1.50 kB
dist/assets/tmdb-CvFog4i7.js                                        3.46 kB │ gzip:  1.70 kB
dist/assets/react-dom-CbejMdZT.js                                   3.57 kB │ gzip:  1.36 kB
dist/assets/useTranslation-Bg5_SlSR.js                              3.61 kB │ gzip:  1.75 kB
dist/assets/sonner-DPORkulk.js                                      4.03 kB │ gzip:  1.33 kB
dist/assets/plugin-BbmGQrt-.js                                      4.06 kB │ gzip:  1.36 kB
dist/assets/CompositeItem-D30PlAFx.js                               4.58 kB │ gzip:  2.05 kB
dist/assets/link-D6daL6nC.js                                        4.72 kB │ gzip:  2.31 kB
dist/assets/lazyRouteComponent-C3qJoz-t.js                          4.94 kB │ gzip:  1.58 kB
dist/assets/bmi-B5AbwohU.js                                         5.06 kB │ gzip:  1.51 kB
dist/assets/store-DJGTpIYk.js                                       5.50 kB │ gzip:  2.01 kB
dist/assets/checkbox-DzOrV0AD.js                                    5.60 kB │ gzip:  2.60 kB
dist/assets/useBaseUiId-D0qxZ2Tu.js                                 6.90 kB │ gzip:  3.00 kB
dist/assets/radio-group-BlIyIICt.js                                 7.72 kB │ gzip:  3.18 kB
dist/assets/jsx-runtime-CP2iHdEU.js                                 7.88 kB │ gzip:  2.98 kB
dist/assets/Loading-BSZZPUa2.js                                     9.32 kB │ gzip:  3.54 kB
dist/assets/browser-ponyfill-BJzCONsv.js                            9.72 kB │ gzip:  3.23 kB
dist/assets/diff-BDnPv_Aj.js                                       10.50 kB │ gzip:  3.89 kB
dist/assets/web-hNgU1AOg.js                                        11.06 kB │ gzip:  4.53 kB
dist/assets/preload-helper-Cm7HaCsf.js                             14.68 kB │ gzip:  5.21 kB
dist/assets/solid-qxHxZ_jz.js                                      15.31 kB │ gzip:  5.93 kB
dist/assets/FloatingTanStackRouterDevtools-B7vy70jP-LByakPIj.js    19.26 kB │ gzip:  5.03 kB
dist/assets/ToolbarRootContext-cjQVsChC.js                         22.21 kB │ gzip:  8.17 kB
dist/assets/carousel-DJfYYNeo.js                                   23.19 kB │ gzip:  8.94 kB
dist/assets/select-Bf8Va4Ea.js                                     30.09 kB │ gzip: 10.61 kB
dist/assets/esm-CGQqJHbq.js                                        31.47 kB │ gzip:  8.55 kB
dist/assets/PageLayout-B06X29Oq.js                                 32.86 kB │ gzip: 10.43 kB
dist/assets/createLucideIcon-LXV1uvao.js                           36.52 kB │ gzip: 12.62 kB
dist/assets/i18n-BAg4hNie.js                                       53.67 kB │ gzip: 16.94 kB
dist/assets/components-DUKnFWBw.js                                 55.25 kB │ gzip: 14.87 kB
dist/assets/BaseTanStackRouterDevtoolsPanel-Bmws3ikM-DnYZE-is.js   55.83 kB │ gzip: 17.98 kB
dist/assets/chevron-down-fD2jc7Um.js                               65.73 kB │ gzip: 23.50 kB
dist/assets/table-CytOm1Kq.js                                      91.36 kB │ gzip: 26.48 kB
dist/assets/tanstack-form-10JzF08b.js                              99.85 kB │ gzip: 26.65 kB
dist/assets/LF5QLUHI-CY5nSD-H.js                                  105.19 kB │ gzip: 38.70 kB
dist/assets/index-LDk4-LJM.js                                     305.86 kB │ gzip: 94.11 kB

✓ built in 804ms
```
