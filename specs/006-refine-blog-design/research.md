# Phase 0 Research: Blog Design Refinement

## Decision 1: Keep implementation strictly in style/layout layer

- **Decision**: Apply changes only through SCSS and existing page/layout markup hooks (`assets/css/main.scss`, existing page front matter/classes, and in-scope layout structure), without modifying route definitions or JavaScript behavior.
- **Rationale**: Directly satisfies FR-002, FR-003, FR-012, and FR-013 while minimizing regression risk in bilingual navigation and translation fallback behavior.
- **Alternatives considered**:
  - JS-assisted visual state handling for 404/home: rejected because scripting changes are out of scope.
  - URL/permalink cleanup during redesign: rejected because route stability is mandatory.

## Decision 2: Use tokenized visual rhythm and section containers for hierarchy

- **Decision**: Define a consistent spacing/typography rhythm for Home hero, section boundaries, About profile emphasis, timeline summary blocks, and 404 CTA hierarchy using reusable SCSS groupings.
- **Rationale**: Improves scannability and parity across Home EN/ES and About EN/ES while preserving content architecture.
- **Alternatives considered**:
  - One-off per-page style overrides: rejected because they reduce maintainability and cross-language parity.
  - Large layout rewrites with new template structures: rejected because scope is visual refinement, not structural migration.

## Decision 3: Enforce WCAG AA contrast through palette-safe pairings

- **Decision**: Validate body text, headings, metadata text, and primary CTA states against WCAG AA contrast minimums in both light and dark skins; adjust only foreground/background/border combinations needed for compliance.
- **Rationale**: Meets FR-010 and SC-001 while keeping current theme system intact.
- **Alternatives considered**:
  - Rely on current Minimal Mistakes defaults without checks: rejected because feature requires explicit accessibility improvement.
  - Introduce external accessibility plugin/tool dependency: rejected due to no-new-dependency constraint.

## Decision 4: Keep microinteractions subtle and performance-safe

- **Decision**: Limit interactions to short CSS transitions (color, shadow, border, transform with minimal distance) on hero CTA, section cards, and 404 recovery action.
- **Rationale**: Satisfies FR-011 while preserving reading comfort and avoiding layout shifts or script overhead.
- **Alternatives considered**:
  - Motion-heavy animations: rejected as distracting and potentially harmful for accessibility.
  - No interaction cues: rejected because requirement asks for medium-intensity feedback.

## Decision 5: Preserve SEO/performance baseline with non-invasive styling

- **Decision**: Avoid adding render-blocking assets, keep existing semantic headings/routes, and verify no regressions via local build and baseline checks after visual updates.
- **Rationale**: Aligns with FR-014 and Constitution Principle IV for site-affecting changes.
- **Alternatives considered**:
  - Add external font/script resources to increase polish: rejected due to performance risk and dependency scope.
  - Rewrite page content semantics for visual goals: rejected because copy architecture and route semantics are out of scope.

## Decision 6: 404 page alignment should be visual, not behavioral

- **Decision**: Make 404 messaging and CTA visually consistent with Home by shared typography/spacing/button language while preserving existing redirect fallback JavaScript unchanged.
- **Rationale**: Meets FR-006 and FR-007 while respecting out-of-scope logic constraints.
- **Alternatives considered**:
  - Rework fallback redirect logic: rejected because scripting changes are excluded.
  - Build isolated 404 visual system: rejected because visual consistency with Home is required.

