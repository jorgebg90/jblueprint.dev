# Tasks: Bilingual About Page and Localized Navigation

**Input**: Design documents from `/specs/003-bilingual-about-page/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Automated tests were not explicitly requested in spec.md. This plan includes mandatory manual validation tasks (including measurable SC-003, SC-004, and SC-005 protocols).

**Organization**: Tasks are grouped by user story so each story is independently implementable and testable.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish baseline assets and validation artifacts used across stories.

- [X] T001 Run baseline build and capture result in specs/003-bilingual-about-page/quickstart.md
- [X] T002 Create profile image asset directory and add canonical image in assets/images/about-profile.jpg
- [X] T003 [P] Add About profile component style scaffold in assets/css/main.scss
- [X] T004 [P] Add SC-004 reviewer protocol template (10 reviewers, 10-second view, 2 prompts) in specs/003-bilingual-about-page/quickstart.md
- [X] T005 [P] Add SC-005 interaction-count validation matrix template in specs/003-bilingual-about-page/quickstart.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement shared localization contracts and scope boundaries required before user stories.

- [X] T006 Define global-navigation localization schema (`labels.en`/`labels.es`) and migrate existing `title` keys to schema form (without final copy pass) in _data/navigation.yml
- [X] T007 Create non-global UI-text localization schema (`menu_label`, `search_label`) with structure/plumbing defaults in _data/ui-text.yml
- [X] T008 Update masthead global-navigation rendering plumbing to resolve `labels.<active_lang>` with `labels.en` fallback in _includes/masthead.html
- [X] T009 Update masthead non-global control rendering plumbing to resolve localized `menu_label`/`search_label` with `en` fallback in _includes/masthead.html
- [X] T010 Clarify schema boundaries (global vs non-global), fallback contract, and ownership rules in specs/003-bilingual-about-page/contracts/navigation-localization-interface.md
- [X] T011 [P] Align NavigationLiteral entity/validation notes with schema-plumbing foundations in specs/003-bilingual-about-page/data-model.md

**Checkpoint**: Shared localization and scope boundaries are complete; user-story work can proceed.

---

## Phase 3: User Story 1 - View About page in preferred language (Priority: P1) 🎯 MVP

**Goal**: Deliver English/Spanish About pages with translation pairing and missing-variant redirect safety.

**Independent Test**: Open `/about/` and `/es/about/`, verify locale-correct content, switch between both variants, then request a missing variant and confirm redirect to available counterpart in ≤2 interactions.

### Implementation for User Story 1

- [X] T012 [US1] Replace English About content with profile-first structure and compliant front matter in about.markdown
- [X] T013 [US1] Replace Spanish Acerca content with profile-first structure and compliant front matter in es/about.markdown
- [X] T014 [US1] Implement language-switch target resolution for existing About translation pairs in _includes/language-switcher.html
- [X] T015 [US1] Implement FR-011 direct-URL missing-variant redirect mechanism (request `/about/` or `/es/about/` missing side redirects to available counterpart) in 404.html
- [X] T016 [US1] Add SC-001/SC-005 validation evidence for About↔Acerca switching and direct-URL missing-variant redirect outcomes in specs/003-bilingual-about-page/quickstart.md

**Checkpoint**: US1 is independently functional and validates bilingual About access/switch behavior.

---

## Phase 4: User Story 2 - Understand navigation labels in active language (Priority: P1)

**Goal**: Localize all in-scope global navigation and non-global UI menu literals with non-empty fallback behavior.

**Independent Test**: In EN and ES contexts, verify global navigation labels and non-global menu literals are localized; remove one active-language translation and confirm `en` fallback renders non-empty text.

### Implementation for User Story 2

- [X] T017 [P] [US2] Populate final EN/ES content copy for all global masthead labels under `labels.en` and `labels.es` in _data/navigation.yml
- [X] T018 [P] [US2] Populate final EN/ES content copy for non-global masthead menu literals in _data/ui-text.yml
- [X] T019 [US2] Add FR-006/FR-008 global-navigation fallback validation evidence (forced missing active-language key → non-empty `en` fallback) in specs/003-bilingual-about-page/quickstart.md
- [X] T020 [US2] Add FR-007/FR-008 non-global menu fallback validation evidence (forced missing active-language key → non-empty `en` fallback) in specs/003-bilingual-about-page/quickstart.md
- [X] T021 [US2] Consolidate scoped global-vs-non-global validation checklist and final pass/fail results in specs/003-bilingual-about-page/quickstart.md

**Checkpoint**: US2 is independently functional with explicit scope separation and fallback-proof labels.

---

## Phase 5: User Story 3 - Evaluate author profile at a glance (Priority: P2)

**Goal**: Present circular profile identity block that remains readable with image failures and EN/ES summary-length imbalance.

**Independent Test**: On `/about/` and `/es/about/`, verify circular image rendering, localized fallback text on forced image failure, and no clipping/overlap/horizontal scroll for short-vs-long summary variants in mobile and desktop viewports.

### Implementation for User Story 3

- [X] T022 [P] [US3] Add English profile image container, fallback text node, and professional summary markup in about.markdown
- [X] T023 [P] [US3] Add Spanish profile image container, fallback text node, and professional summary markup in es/about.markdown
- [X] T024 [US3] Implement circular image, fallback-slot visibility, and long-text readability styles in assets/css/main.scss
- [X] T025 [US3] Implement image-load error handling to reveal localized fallback text in assets/js/language-session.js
- [X] T026 [US3] Add measurable SC-004 reviewer protocol execution log and pass/fail calculation in specs/003-bilingual-about-page/quickstart.md
- [X] T027 [US3] Add explicit SC-003 fixed protocol and execution evidence (24 documented sessions total: 12 EN + 12 ES; per language: 6 mobile + 6 desktop), including session-record format (`session_id`, `lang`, `viewport`, `image_visible`, `summary_visible`, `issues`, `result`) and approval threshold (pass only if all 24 required sessions are completed and marked `result=PASS`), plus FR-005 EN/ES semantic-equivalence matrix and FR-013 viewport readability evidence in specs/003-bilingual-about-page/quickstart.md

**Checkpoint**: US3 is independently functional with resilient profile presentation and readability guarantees.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency, evidence capture, and build verification across all stories.

- [X] T028 [P] Re-run full FR-001..FR-013 acceptance checklist and record evidence in specs/003-bilingual-about-page/quickstart.md
- [X] T029 [P] Re-run SC-001..SC-005 measurable outcomes and record final pass/fail summary in specs/003-bilingual-about-page/quickstart.md
- [X] T030 Run final build validation with `bundle exec jekyll build --trace` and record output in specs/003-bilingual-about-page/quickstart.md
- [X] T031 Verify all modified config keys/comments/notes remain English-only in _data/navigation.yml

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2; can run in parallel with US1.
- **Phase 5 (US3)**: Depends on US1 content baseline and Phase 2 localization baseline.
- **Phase 6 (Polish)**: Depends on completion of all targeted user stories.

### User Story Dependency Graph

- **US1 (P1)** → enables **US3 (P2)** profile implementation on finalized About content
- **US2 (P1)** → independent after Foundational phase
- Recommended order: **US1 + US2 (parallel)** → **US3** → **Polish**

### Within-Story Execution Rules

- Manual validation tasks for each story must be completed only after implementation tasks for that story.
- Shared files within the same story (for example `_includes/masthead.html`) must be updated sequentially to avoid merge conflicts.

---

## Parallel Execution Examples

### User Story 1

```bash
Task: "T012 [US1] Replace English About content in about.markdown"
Task: "T013 [US1] Replace Spanish Acerca content in es/about.markdown"
```

### User Story 2

```bash
Task: "T017 [US2] Localize global navigation literals in _data/navigation.yml"
Task: "T018 [US2] Localize non-global menu literals in _data/ui-text.yml"
```

### User Story 3

```bash
Task: "T022 [US3] Add English profile block in about.markdown"
Task: "T023 [US3] Add Spanish profile block in es/about.markdown"
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1).
3. Validate US1 independently, including SC-005 interaction cap.
4. Demo/deploy MVP.

### Incremental Delivery

1. Foundation ready (Phases 1-2).
2. Deliver US1 + US2 in parallel where possible.
3. Deliver US3 with image-fallback and readability hardening.
4. Complete Polish phase and final build validation.

### Coverage Mapping

- **US1**: FR-001, FR-002, FR-009, FR-011; SC-001, SC-005
- **US2**: FR-006, FR-007, FR-008; SC-002
- **US3**: FR-003, FR-004, FR-005, FR-010, FR-012, FR-013; SC-003, SC-004
