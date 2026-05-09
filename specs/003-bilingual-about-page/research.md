# Research: Bilingual About Page and Localized Navigation

**Phase**: 0 | **Plan**: [plan.md](./plan.md) | **Spec**: [spec.md](./spec.md)

All planning unknowns and implementation choices for this feature are resolved below.

---

## R-001: Missing About Variant Behavior

**Decision**: Keep `translation_key: about` for both language pages and enforce redirect fallback to the existing counterpart variant when one locale page is missing.

**Rationale**:
- The spec explicitly requires automatic redirect to the available language variant (FR-011).
- Existing bilingual navigation already derives counterpart URLs from locale prefix conventions.
- Redirect fallback avoids broken routes and empty render outcomes (SC-001).

**Alternatives considered**:
- Show a “translation unavailable” banner and stay on the missing route: Rejected for About specifically because the clarified requirement demands automatic redirect.
- Return 404 for missing About locale variant: Rejected due to poor UX and explicit spec conflict.

---

## R-002: Localized Navigation Literal Strategy

**Decision**: Move visible navigation/menu labels to bilingual data keys (English and Spanish values) and resolve displayed label using active language at render time in `_includes/masthead.html`.

**Rationale**:
- `_data/navigation.yml` currently stores static English-only labels.
- Jekyll data files can hold localized literals cleanly while Liquid in includes selects the active language.
- This pattern localizes labels without changing route generation logic already working with Polyglot.

**Alternatives considered**:
- Duplicate full navigation structures per locale and switch dataset: Rejected as unnecessary duplication and higher maintenance.
- Hardcode language conditionals directly in layout markup for each link: Rejected as less scalable and less traceable than data-driven labels.

---

## R-003: Circular Profile Image Implementation

**Decision**: Use a standard HTML image element in About content with a dedicated class and apply `border-radius: 50%` and constrained dimensions through scoped styles.

**Rationale**:
- Circular presentation is a deterministic CSS behavior and simple to validate.
- A class-based approach keeps styling explicit and reusable across both locale variants.
- It aligns with the feature goal of profile-first clarity inspired by Minimal Mistakes style.

**Alternatives considered**:
- Use an image editor to pre-crop a circular PNG only: Rejected because visual shape should remain a presentational concern in CSS.
- Inject inline styles in markdown for each locale page: Rejected in favor of maintainable reusable class styling.

---

## R-004: Missing Navigation Literal Fallback

**Decision**: If a label translation is missing for the active locale, fallback to default language (`en`) value and never render an empty label.

**Rationale**:
- FR-008 requires predefined default-language fallback behavior.
- Prevents blank UI controls and preserves navigability.
- Supports incremental localization safely when future labels are added.

**Alternatives considered**:
- Render blank or placeholder token when missing translation: Rejected due to usability risk.
- Hard fail build on missing translation key: Rejected for this feature because runtime fallback is the explicit requirement.

---

## R-005: Professional Summary Equivalence Rules

**Decision**: Keep separate English and Spanish summary text with equivalent meaning (not literal translation) and parallel content structure.

**Rationale**:
- FR-005 requires semantic equivalence, not literal phrasing.
- Parallel structure improves side-by-side review and future maintenance.
- Supports clarity and first-glance comprehension goals (SC-004).

**Alternatives considered**:
- Literal translation only: Rejected because tone/clarity can degrade across languages.
- Single-language summary displayed in both locales: Rejected due to bilingual requirement and UX friction.

---

## Post-Design Constitution Re-check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. English-only implementation | ✅ Pass | Config keys/comments/template logic remain in English; bilingual prose limited to user-facing page content |
| II. Jekyll-first standards compliance | ✅ Pass | Uses standard Jekyll data, include, and markdown patterns |
| III. Minimal conventional structure | ✅ Pass | No plugin additions or non-standard directories required |
| IV. Build validation | ✅ Pass | Quickstart includes mandatory `bundle exec jekyll build` validation |
| V. Traceable small-scope changes | ✅ Pass | Changes are split across content, data, include logic, and validation |

