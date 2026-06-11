# Spec: BMI Calculator

**Status:** Implemented
**Component:** `src/pages/BmiPage/index.tsx`
**Route:** `/tools/bmi` (`src/routes/tools/bmi.tsx`)

## Overview

A Body Mass Index calculator. The user enters height and weight in either metric or
imperial units, and the page computes BMI and highlights the matching category. All logic is
client-side and synchronous; nothing is persisted.

## Route

Registered at `/tools/bmi` via `createFileRoute('/tools/bmi')` in
`src/routes/tools/bmi.tsx`. The route is **not** `$lang`-prefixed and has no loader. Linked
from the "Tools" group in `src/components/Navbar/navConfig.ts` (`to: '/tools/bmi'`).

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

`getBMICategory(bmiValue)` maps a value to one of the four category names.

## i18n Keys

N/A — this page uses hard-coded English strings and is not `$lang`-prefixed.

## Logic / Helpers

Self-contained: all calculation (`calculateBMI`, `getBMICategory`) and the `bmiCategories`
list live in `index.tsx`. No sibling modules.

## Output

Renders the computed BMI (one decimal) and the highlighted category. No persistence, no
network, no clipboard.

## Files to Touch

```
src/pages/BmiPage/index.tsx         ← UI, calculation, categories
src/routes/tools/bmi.tsx            ← route registration
src/components/Navbar/navConfig.ts  ← "Tools" nav entry (to: '/tools/bmi')
```

## Out of Scope

- Internationalization / `$lang` routing (strings are hard-coded English).
- Persisting inputs or results.
- Input validation messaging (invalid input silently keeps the prior result).
