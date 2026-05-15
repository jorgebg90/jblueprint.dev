# Data Model: Blog Design Refinement

## Entity: PageVariant

A concrete view target defined by page + language + theme mode + viewport class.

### Fields

- `page_key` (enum: `home` | `about` | `404`, required)
- `language` (enum: `en` | `es` | `shared`, required)
- `theme_mode` (enum: `light` | `dark`, required)
- `viewport` (enum: `mobile` | `desktop` | `zoom-200`, required)
- `route` (string, required)
- `status` (enum: `draft` | `styled` | `validated`, required)

### Validation Rules

- In-scope routes must remain unchanged from baseline.
- `home` and `about` require both `en` and `es` variants.
- Every variant must pass contrast checks before `validated`.

## Entity: VisualSection

A bounded section with hierarchy and spacing rules.

### Fields

- `section_id` (string, required): e.g., `home-hero`, `about-profile`, `about-timeline`, `404-cta`
- `page_key` (enum: `home` | `about` | `404`, required)
- `priority` (enum: `primary` | `secondary`, required)
- `container_pattern` (string, required)
- `spacing_scale` (string, required)
- `typography_scale` (string, required)

### Validation Rules

- Each page must expose exactly one primary focal section.
- Section boundaries must remain visually distinct at mobile and desktop sizes.
- Section styles must preserve content readability with longer EN/ES text blocks.

## Entity: AccessibilityConstraint

Measurable readability constraints for in-scope visual elements.

### Fields

- `constraint_id` (string, required)
- `target_type` (enum: `body-text` | `heading` | `link` | `button` | `meta-text`, required)
- `minimum_ratio` (number, required)
- `applies_to` (array of `PageVariant`, required)
- `result` (enum: `pass` | `fail` | `pending`, required)

### Validation Rules

- Body text and interactive controls must satisfy WCAG AA minimum contrast.
- A single `fail` blocks completion for the corresponding variant.
- Contrast parity must hold across light/dark themes where both are available.

## Entity: InteractionStyle

Defines acceptable microinteraction behavior in the presentation layer.

### Fields

- `interaction_id` (string, required)
- `target_selector` (string, required)
- `properties` (array: `color` | `background` | `border` | `shadow` | `transform`, required)
- `duration_ms` (integer, required)
- `timing_function` (string, required)
- `motion_level` (enum: `subtle`, required)

### Validation Rules

- Interactions must not depend on JavaScript.
- Motion must not cause layout shift in content flow.
- Hover/focus feedback must remain readable in both theme modes.

## Entity: QualityGateRun

Validation record for build/accessibility/performance checks.

### Fields

- `run_id` (string, required)
- `build_passed` (boolean, required)
- `contrast_passed` (boolean, required)
- `responsive_passed` (boolean, required)
- `seo_perf_regression` (boolean, required)
- `executed_at` (datetime, required)

### Validation Rules

- `build_passed` must be true for completion.
- `contrast_passed` and `responsive_passed` must be true for all in-scope page variants.
- `seo_perf_regression` must remain false.

