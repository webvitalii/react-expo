# Spec: BMI Calculator

**Status:** Implemented
**Component:** `src/pages/BmiPage/index.tsx`
**Route:** `/$lang/tools/bmi` (`src/routes/$lang/tools/bmi.tsx`)

## Overview

A Body Mass Index calculator. The user enters height and weight in either metric or
imperial units, and the page computes BMI and highlights the matching category. All logic is
client-side and synchronous; nothing is persisted. The page is `$lang`-prefixed and
localized via the `bmi` i18n namespace.

## Route

Registered at `/$lang/tools/bmi` via `createFileRoute('/$lang/tools/bmi')` in
`src/routes/$lang/tools/bmi.tsx`. The route `loader` preloads the `bmi` i18n namespace
(`i18n.loadNamespaces('bmi')`). Linked from the "Tools" group in
`src/components/Navbar/navConfig.ts` (`to: '/$lang/tools/bmi'`), which is flagged as needing
the `lang` param. A legacy route at `/tools/bmi` (`src/routes/tools/bmi.tsx`) also loads
the namespace for backward compatibility.

## UI

Two-column layout (`grid md:grid-cols-2`): a calculator card and a category card.

### Calculator card

A `Tabs` control switches between two unit systems.

| Field                    | Type                            | Notes                                                 |
| ------------------------ | ------------------------------- | ----------------------------------------------------- |
| Unit system              | `Tabs` (`metric` \| `imperial`) | Defaults to `metric`.                                 |
| Height (metric)          | `Input` number (cm)             | Shown on the Metric tab.                              |
| Weight (metric)          | `Input` number (kg)             | Shown on the Metric tab.                              |
| Height feet (imperial)   | `Select` (3–8)                  | Shown on the Imperial tab. Defaults to `5`.           |
| Height inches (imperial) | `Select` (0–11)                 | Shown on the Imperial tab. Defaults to `6`.           |
| Weight (imperial)        | `Input` number (lbs)            | Shown on the Imperial tab.                            |
| Calculate Your BMI       | `Button`                        | Computes BMI from the active tab's inputs.            |
| Reset                    | `Button` (outline)              | Clears inputs back to defaults and clears the result. |

### Category card

When a result exists, a header banner shows `YOUR BMI IS` and the value to one decimal.
Below it, the four BMI categories are listed with ranges; the row matching the current
result is emphasized.

| Category    | Range         |
| ----------- | ------------- |
| Underweight | Below 18.5    |
| Healthy     | 18.5 – 24.9   |
| Overweight  | 25.0 – 29.9   |
| Obesity     | 30.0 or above |

## Flow

1. User picks a unit system tab (`metric` or `imperial`).
2. User enters height and weight for that system.
3. User clicks **Calculate Your BMI** → `calculateBMI` runs:
   - Metric: `weightKg / (heightCm/100)^2`.
   - Imperial: `(weightLbs / totalInches^2) * 703`, where `totalInches = feet*12 + inches`.
4. If the computed value is `> 0`, `bmi` is set and the result banner + active category row
   appear. Non-positive / invalid input leaves the previous result unchanged.
5. **Reset** clears all inputs to defaults (`feet=5`, `inches=6`, others empty) and sets
   `bmi` to `null`.

## State

| State        | Type                     | Default    | Purpose                                                          |
| ------------ | ------------------------ | ---------- | ---------------------------------------------------------------- |
| `unitSystem` | `'metric' \| 'imperial'` | `'metric'` | Active tab / which inputs are used.                              |
| `heightCm`   | `string`                 | `''`       | Metric height input.                                             |
| `weightKg`   | `string`                 | `''`       | Metric weight input.                                             |
| `feet`       | `string`                 | `'5'`      | Imperial height (feet) select.                                   |
| `inches`     | `string`                 | `'6'`      | Imperial height (inches) select.                                 |
| `weightLbs`  | `string`                 | `''`       | Imperial weight input.                                           |
| `bmi`        | `number \| null`         | `null`     | Last computed BMI; drives the result banner and active category. |

`getBMICategory(bmiValue)` maps a value to one of the four category keys
(`'underweight' | 'healthy' | 'overweight' | 'obesity'`). `CATEGORY_KEYS` is the ordered
constant tuple used to render the category table rows.

## i18n Keys

Namespace: `bmi` (`useTranslation('bmi')`). Files: `public/locales/<lang>/bmi.json`
(`en`, `fr`).

| Key                                                                     | English                                                |
| ----------------------------------------------------------------------- | ------------------------------------------------------ |
| `title`                                                                 | Calculate Your BMI                                     |
| `calculator.title`                                                      | BMI Calculator                                         |
| `calculator.tabs.metric` / `calculator.tabs.imperial`                   | Metric / Imperial                                      |
| `calculator.height` / `calculator.weight`                               | Height / Weight                                        |
| `calculator.centimeters` / `calculator.kilograms` / `calculator.pounds` | Centimeters / Kilograms / Pounds                       |
| `calculator.calculate`                                                  | Calculate Your BMI                                     |
| `calculator.reset`                                                      | Reset                                                  |
| `result.yourBmiIs`                                                      | YOUR BMI IS                                            |
| `result.category` / `result.range`                                      | BMI Category / BMI Range                               |
| `categories.underweight` / `.healthy` / `.overweight` / `.obesity`      | Underweight / Healthy / Overweight / Obesity           |
| `ranges.underweight` / `.healthy` / `.overweight` / `.obesity`          | Below 18.5 / 18.5 – 24.9 / 25.0 – 29.9 / 30.0 or above |

## Logic / Helpers

Self-contained: all calculation (`calculateBMI`, `getBMICategory`) and the `bmiCategories`
list live in `index.tsx`. No sibling modules.

## Output

Renders the computed BMI (one decimal) and the highlighted category. No persistence, no
network, no clipboard.

## Files to Touch

```
src/pages/BmiPage/index.tsx              ← UI, calculation, categories
src/routes/$lang/tools/bmi.tsx           ← route + bmi namespace preload
src/routes/tools/bmi.tsx                 ← legacy route (backward compat)
src/components/Navbar/navConfig.ts       ← "Tools" nav entry (to: '/$lang/tools/bmi')
public/locales/{en,fr}/bmi.json          ← translations
```

## Out of Scope

- Persisting inputs or results.
- Input validation messaging (invalid input silently keeps the prior result).
