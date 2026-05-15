# Contract: Blog Visual Design Refinement

## Scope

Defines mandatory visual behavior for Home EN/ES, About EN/ES, and 404 under a CSS/SCSS/layout-only implementation.

## 1. Route and Behavior Preservation Contract

- Public routes/permalinks for in-scope pages must remain unchanged.
- Existing JavaScript behavior (including 404 fallback logic) must remain unchanged.
- No plugin or functional dependency additions are permitted.

## 2. Home Visual Hierarchy Contract

- Home hero must remain the primary focal section on EN and ES variants.
- Hero-to-content transition must have clear visual separation (spacing/background/border rhythm).
- CTA must remain obvious, readable, and consistent across light/dark presentations.

## 3. About Visual Clarity Contract

- Profile block must be visually prominent at page entry on EN and ES variants.
- Experience/timeline summary must be scannable without long-form parsing.
- Mobile and zoomed states must preserve ordering and readability.

## 4. 404 Recovery Experience Contract

- 404 page must present plain-language error context.
- A primary, visually prominent action must return users to Home in one click.
- Typography, spacing rhythm, and tone must align with Home visual system.

## 5. Accessibility and Interaction Contract

- In-scope body text and primary interactive controls must meet WCAG AA contrast minimums.
- Hover/focus feedback must be subtle, non-distracting, and visible in both theme modes.
- Interaction styling must be CSS-based and must not rely on script changes.

## 6. Validation Gate Contract

Before completion, all checks below are mandatory:

1. Build validation:

   ```bash
   bundle exec jekyll build
   ```

2. Responsive review: mobile + desktop for all in-scope variants.
3. Zoom review at 200% for Home/About readability.
4. Contrast verification for text and primary controls (AA).
5. SEO/performance baseline comparison confirms no regressions.

