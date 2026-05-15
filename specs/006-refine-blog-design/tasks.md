# Tasks: Blog Design Refinement

**Input**: Design documents from `/specs/006-refine-blog-design/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`, `contracts/visual-design-contract.md`

**Tests**: No automated/TDD test suite was explicitly requested. This backlog includes required manual validation and quality-gate tasks from `quickstart.md` and `contracts/visual-design-contract.md`.

**Organization**: Tasks are grouped by user story to allow independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish guardrails, baseline references, and validation artifacts before visual changes.

- [x] T001 Create scope guardrails and invariants checklist in `specs/006-refine-blog-design/validation/baseline-invariants.md` (no JS changes, no route/permalink changes, no new dependencies)
- [x] T002 Capture current SEO/performance baseline for Home EN/ES, About EN/ES, and 404 in `specs/006-refine-blog-design/validation/seo-performance-baseline.md`
- [x] T003 [P] Build PageVariant coverage matrix from `data-model.md` in `specs/006-refine-blog-design/validation/variant-matrix.md`
- [x] T004 [P] Create accessibility/contrast evidence template in `specs/006-refine-blog-design/validation/contrast-report.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define shared visual system foundations required by all user stories.

**⚠️ CRITICAL**: Complete this phase before starting user-story implementation.

- [x] T005 Add reusable design tokens for spacing, typography rhythm, contrast-safe color pairs, and motion timing in `assets/css/main.scss`
- [x] T006 [P] Add shared utility patterns for section containers/surfaces/dividers in `assets/css/main.scss`
- [x] T007 [P] Add global focus-visible and subtle hover transition primitives (CSS-only, WCAG-aware) in `assets/css/main.scss`
- [x] T008 Define shared documentation checklist for build/responsive/zoom/contrast/performance gates in `specs/006-refine-blog-design/validation/quality-gate.md`

**Checkpoint**: Foundation ready for independent story delivery.

---

## Phase 3: User Story 1 - Read content more easily on Home (Priority: P1) 🎯 MVP

**Goal**: Strengthen Home EN/ES visual hierarchy with a dominant hero and clear section separation, preserving route and behavior parity.

**Independent Test**: Review Home EN/ES on mobile + desktop + 200% zoom in light/dark contexts; verify hero dominance, section separation, readability, and unchanged routing.

### Implementation for User Story 1

- [x] T009 [P] [US1] Add Home-specific structural class hooks for hero and major sections in `site/en/index.markdown`
- [x] T010 [P] [US1] Mirror Home structural class hooks for language parity in `site/es/index.markdown`
- [x] T011 [US1] Refine Home layout wrappers to support hierarchy and section boundaries in `_layouts/home.html`
- [x] T012 [US1] Implement Home hero emphasis and section separation styles in `assets/css/main.scss`
- [x] T013 [US1] Implement Home CTA microinteractions (hover/focus) with AA-safe contrast in `assets/css/main.scss`
- [x] T014 [US1] Record Home EN/ES validation evidence (responsive, zoom, light/dark parity) in `specs/006-refine-blog-design/validation/us1-home-validation.md`

**Checkpoint**: User Story 1 is independently functional and reviewable.

---

## Phase 4: User Story 2 - Understand profile and experience faster on About (Priority: P2)

**Goal**: Increase About EN/ES profile prominence and make timeline/experience summaries scannable.

**Independent Test**: Review About EN/ES on mobile + desktop + 200% zoom; verify profile is primary focal area and timeline summary is quickly scannable.

### Implementation for User Story 2

- [x] T015 [P] [US2] Add profile/timeline visual wrapper classes for About EN in `site/en/about.markdown`
- [x] T016 [P] [US2] Mirror profile/timeline visual wrapper classes for About ES in `site/es/about.markdown`
- [x] T017 [US2] Implement About profile prominence and timeline grouping styles in `assets/css/main.scss`
- [x] T018 [US2] Implement About responsive + 200% zoom readability adjustments in `assets/css/main.scss`
- [x] T019 [US2] Record About EN/ES validation evidence (scannability, responsive, zoom) in `specs/006-refine-blog-design/validation/us2-about-validation.md`

**Checkpoint**: User Story 2 is independently functional and reviewable.

---

## Phase 5: User Story 3 - Recover from errors via a useful 404 page (Priority: P3)

**Goal**: Make 404 clearer and visually aligned with Home while preserving existing fallback behavior.

**Independent Test**: Open a non-existent URL; verify plain-language error context, one-click return-to-Home CTA, visual consistency with Home, and unchanged JavaScript logic.

### Implementation for User Story 3

- [x] T020 [US3] Refactor 404 page markup to class-based visual structure without altering existing behavior in `404.html`
- [x] T021 [US3] Implement 404 typography/spacing/CTA styles aligned to Home visual system in `assets/css/main.scss`
- [x] T022 [US3] Add subtle 404 CTA hover/focus microinteractions with WCAG AA-safe states in `assets/css/main.scss`
- [x] T023 [US3] Record 404 recovery validation evidence (clarity + one-click return) in `specs/006-refine-blog-design/validation/us3-404-validation.md`

**Checkpoint**: User Story 3 is independently functional and reviewable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Run final quality gates across all stories and confirm non-regression constraints.

- [x] T024 [P] Run `bundle exec jekyll build` and log results in `specs/006-refine-blog-design/validation/quality-gate.md`
- [x] T025 [P] Execute WCAG AA contrast checks for all in-scope variants and log pass/fail in `specs/006-refine-blog-design/validation/contrast-report.md`
- [x] T026 [P] Execute full responsive (mobile/desktop) and 200% zoom checks and log outcomes in `specs/006-refine-blog-design/validation/quality-gate.md`
- [x] T027 [P] Compare post-change SEO/performance against baseline and log non-regression in `specs/006-refine-blog-design/validation/seo-performance-baseline.md`
- [x] T028 Perform final constraints audit (no JS logic edits, no route/permalink changes) and record sign-off in `specs/006-refine-blog-design/validation/final-summary.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2; can run in parallel with US1 once foundation is done.
- **Phase 5 (US3)**: Depends on Phase 2; can run in parallel with US1/US2 once foundation is done.
- **Phase 6 (Polish)**: Depends on completion of all selected user stories.

### User Story Dependencies

- **US1 (P1)**: Independent after foundational phase.
- **US2 (P2)**: Independent after foundational phase.
- **US3 (P3)**: Independent after foundational phase.

### Within Each User Story

- Structural hooks/content wrappers before final SCSS tuning.
- Core visual styling before validation evidence tasks.
- Story validation completed before phase checkpoint.

---

## Parallel Execution Examples

### User Story 1

```bash
Task T009 in site/en/index.markdown
Task T010 in site/es/index.markdown
```

### User Story 2

```bash
Task T015 in site/en/about.markdown
Task T016 in site/es/about.markdown
```

### Cross-story after Foundational

```bash
Developer A: T011-T014 (US1)
Developer B: T017-T019 (US2)
Developer C: T020-T023 (US3)
```

---

## Implementation Strategy

### MVP First (US1 only)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1).
3. Validate US1 independently via `specs/006-refine-blog-design/validation/us1-home-validation.md`.

### Incremental Delivery

1. Foundation complete (Phases 1-2).
2. Deliver US1 (MVP), validate, and review.
3. Deliver US2, validate, and review.
4. Deliver US3, validate, and review.
5. Run full Polish phase gates.

### Parallel Team Strategy

1. Team aligns on shared SCSS foundations (Phase 2).
2. Split by story using independent files and validation artifacts.
3. Merge into final quality gate verification.

---

## Notes

- All tasks preserve Jekyll routes/permalinks and avoid JavaScript modifications.
- All implementation notes and code comments must remain in English.
- Accessibility target is WCAG AA minimum for in-scope text and primary interactive controls.
- SEO/performance must remain at baseline parity or better for in-scope pages.




