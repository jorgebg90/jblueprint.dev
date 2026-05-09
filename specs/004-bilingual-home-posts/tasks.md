# Tasks: Bilingual Home Banner/Intro and Localized Posts Navigation

**Input**: Design documents from `/specs/004-bilingual-home-posts/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/navigation-and-routing-contract.md`, `quickstart.md`

**Tests**: No automated test suite was explicitly requested in the specification; validation tasks use route-level/manual checks and build verification from `quickstart.md`.

**Organization**: Tasks are grouped by user story for independent implementation and validation.

## Traceability (Spec → Stories)

- **US1 (P1)**: FR-001, FR-002, FR-003 → SC-001
- **US2 (P1)**: FR-004, FR-005 → SC-002
- **US3 (P2)**: FR-006, FR-007, FR-008, FR-013 → SC-003, SC-004
- **US4 (P2)**: FR-009, FR-010, FR-011, FR-012 → SC-005, SC-006
- **Cross-cutting constraints**: FR-014, CA-001, CA-002, CA-003
- **Contract anchors**: Route (§1), Navigation (§2), Localized Listing (§3), Empty State (§4), Language Switch (§5), Published Fallback (§6), Out-of-Scope (§7)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare localization data and page scaffolding shared by all stories.

- [ ] T001 Normalize localized message keys for translation feedback and posts empty-state in `_data/messages.yml`
- [ ] T002 Create localized posts index page scaffolds in `posts/index.markdown` and `es/posts/index.markdown`
- [ ] T003 [P] Add/update localized Home/Posts labels and canonical URLs in `_data/navigation.yml`
- [ ] T004 [P] Add feature validation evidence placeholders for FR/SC checks in `specs/004-bilingual-home-posts/quickstart.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement shared rendering/routing primitives required before user-story work.

**⚠️ CRITICAL**: No user story starts before this phase is complete.

- [ ] T005 Create shared localized posts index layout skeleton with title/list/empty-state slots in `_layouts/posts-index.html`
- [ ] T006 Refactor home layout to render banner+intro only and remove inline posts loop in `_layouts/home.html`
- [ ] T007 [P] Harden masthead locale URL resolution for `/`, `/es/`, `/posts/`, and `/es/posts/` in `_includes/masthead.html`
- [ ] T008 Implement translation-key based counterpart resolution across pages/posts in `_includes/language-switcher.html`
- [ ] T009 [P] Update switcher client logic to prioritize server targets and sanitize fallback query params in `assets/js/language-session.js`
- [ ] T010 [P] Align translation feedback include with new localized fallback message keys in `_includes/translation-feedback.html`

**Checkpoint**: Shared foundation complete; user stories can proceed.

---

## Phase 3: User Story 1 - Bilingual home as a clean landing page (Priority: P1) 🎯 MVP

**Goal**: Home pages (`/`, `/es/`) show localized banner+intro only and no inline post listing.

**Independent Test**: Open `/` and `/es/`; each route shows localized banner+intro and zero inline posts list blocks.

### Implementation for User Story 1

- [ ] T011 [US1] Add EN home localized banner/intro front matter and CTA metadata in `index.markdown`
- [ ] T012 [US1] Add ES home localized banner/intro front matter and CTA metadata in `es/index.markdown`
- [ ] T013 [P] [US1] Add home banner/intro/CTA presentation styles in `assets/css/main.scss`
- [ ] T014 [US1] Enforce home translation parity (`translation_key`, `lang`, canonical route behavior, no inline listing flag) in `index.markdown` and `es/index.markdown`
- [ ] T015 [US1] Record FR-001/FR-002/FR-003 and SC-001 validation evidence in `specs/004-bilingual-home-posts/quickstart.md`

**Checkpoint**: US1 fully functional and independently verifiable.

---

## Phase 4: User Story 2 - Discover posts in dedicated localized sections (Priority: P1)

**Goal**: Provide stable localized posts discovery at `/posts/` and `/es/posts/` with locale-consistent top navigation.

**Independent Test**: From EN and ES contexts, Home/Posts navigation reaches locale-correct routes in <=2 interactions.

### Implementation for User Story 2

- [ ] T016 [US2] Implement EN posts index metadata (`layout`, `lang`, `translation_key`, `permalink`, localized title) in `posts/index.markdown`
- [ ] T017 [US2] Implement ES posts index metadata (`layout`, `lang`, `translation_key`, `permalink`, localized title) in `es/posts/index.markdown`
- [ ] T018 [US2] Finalize locale-stable top-level Home/Posts navigation mapping in `_data/navigation.yml`
- [ ] T019 [US2] Add localized home-to-posts discovery links for EN/ES home pages in `index.markdown` and `es/index.markdown`
- [ ] T020 [US2] Record FR-004/FR-005 and SC-002 navigation validation evidence in `specs/004-bilingual-home-posts/quickstart.md`

**Checkpoint**: US2 fully functional and independently verifiable.

---

## Phase 5: User Story 3 - See only active-language posts without duplicates (Priority: P2)

**Goal**: Localized posts indexes are language-strict, deduplicated by logical translation grouping, and resilient to metadata gaps.

**Independent Test**: `/posts/` shows only EN posts; `/es/posts/` shows only ES posts; no duplicate logical entry per locale; empty-state and metadata edge cases are handled.

### Implementation for User Story 3

- [ ] T021 [US3] Implement locale-strict listing eligibility (`post.lang == site.active_lang`) in `_layouts/posts-index.html`
- [ ] T022 [US3] Implement per-locale deduplication by `translation_key` with deterministic collision winner in `_layouts/posts-index.html`
- [ ] T023 [P] [US3] Exclude missing/invalid language metadata entries without render failure in `_layouts/posts-index.html`
- [ ] T024 [P] [US3] Implement localized empty-state rendering and keep navigation usable in `_layouts/posts-index.html` and `_data/messages.yml`
- [ ] T025 [US3] Record FR-006/FR-007/FR-008/FR-013 and SC-003/SC-004 validation evidence in `specs/004-bilingual-home-posts/quickstart.md`

**Checkpoint**: US3 fully functional and independently verifiable.

---

## Phase 6: User Story 4 - Switch language safely with robust fallback behavior (Priority: P2)

**Goal**: Language switch resolves to equivalents when available; otherwise resolves to valid fallback routes with localized translation-unavailable feedback.

**Independent Test**: Counterpart pages/posts switch directly; missing-equivalent cases resolve safely to default-language routes with feedback; locale-prefixed unsupported routes avoid dead ends.

### Implementation for User Story 4

- [ ] T026 [US4] Implement equivalent-first page/post switch resolution by `translation_key` in `_includes/language-switcher.html`
- [ ] T027 [US4] Implement no-counterpart fallback route resolution and fallback query signaling in `_includes/language-switcher.html`
- [ ] T028 [P] [US4] Update client-side switch behavior to preserve explicit fallback targets and cleanup query params in `assets/js/language-session.js`
- [ ] T029 [P] [US4] Localize translation-unavailable feedback rendering in `_includes/translation-feedback.html` and `_data/messages.yml`
- [ ] T030 [US4] Record FR-009/FR-010/FR-011/FR-012 and SC-005/SC-006 fallback matrix evidence in `specs/004-bilingual-home-posts/quickstart.md` and `docs/multilingual-redirects.md`

**Checkpoint**: US4 fully functional and independently verifiable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final hardening, governance alignment, and release readiness.

- [ ] T031 [P] Update bilingual metadata hygiene guidance (`lang`, `translation_key`, collision handling) in `docs/multilingual-content-workflow.md`
- [ ] T032 Validate out-of-scope protection (FR-014) against touched routes/components in `specs/004-bilingual-home-posts/quickstart.md`
- [ ] T033 Run full quickstart validation checklist and record consolidated status in `specs/004-bilingual-home-posts/quickstart.md`
- [ ] T034 Run `bundle exec jekyll build` and append build result evidence in `specs/004-bilingual-home-posts/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2.
- **Phase 5 (US3)**: Depends on US2 + Phase 2.
- **Phase 6 (US4)**: Depends on US1 + US2 + Phase 2.
- **Phase 7 (Polish)**: Depends on all selected stories.

### User Story Dependency Graph

- **US1 (P1)**: Independent after foundational.
- **US2 (P1)**: Independent after foundational.
- **US3 (P2)**: Requires US2 routes/pages.
- **US4 (P2)**: Requires US1/US2 route parity and switch surfaces.

Graph: `US1` and `US2` in parallel → `US3` and `US4`.

### Within-Story Ordering

- Content/page metadata tasks before behavior validation tasks.
- Shared file conflict rule: for same file, execute tasks sequentially.
- Validation evidence task is the story completion gate.

### Parallel Opportunities

- **Setup**: T003 and T004.
- **Foundational**: T007, T009, T010 (after T005/T006 baseline).
- **US1**: T013 in parallel with T011/T012.
- **US3**: T023 and T024 in parallel after T021.
- **US4**: T028 and T029 in parallel with T026/T027 sequence constraints.
- **Polish**: T031 can run in parallel with T032/T033 before T034.

---

## Parallel Example: User Story 1

```bash
Task: "T011 [US1] Add EN home localized metadata in index.markdown"
Task: "T012 [US1] Add ES home localized metadata in es/index.markdown"
Task: "T013 [P] [US1] Add banner/intro styles in assets/css/main.scss"
```

## Parallel Example: User Story 2

```bash
Task: "T016 [US2] Implement EN posts index page in posts/index.markdown"
Task: "T017 [US2] Implement ES posts index page in es/posts/index.markdown"
Task: "T018 [US2] Finalize Home/Posts navigation mapping in _data/navigation.yml"
```

## Parallel Example: User Story 3

```bash
Task: "T022 [US3] Implement dedupe by translation_key in _layouts/posts-index.html"
Task: "T023 [P] [US3] Exclude invalid lang metadata in _layouts/posts-index.html"
Task: "T024 [P] [US3] Add localized empty-state in _layouts/posts-index.html and _data/messages.yml"
```

## Parallel Example: User Story 4

```bash
Task: "T026 [US4] Implement equivalent-first switch resolution in _includes/language-switcher.html"
Task: "T028 [P] [US4] Update switch JS target handling in assets/js/language-session.js"
Task: "T029 [P] [US4] Localize fallback feedback include/messages"
```

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1).
3. Validate SC-001 and stop for review/demo.

### Incremental Delivery

1. Deliver US2 and validate SC-002.
2. Deliver US3 and validate SC-003/SC-004.
3. Deliver US4 and validate SC-005/SC-006.
4. Complete Polish and build gate.

### Parallel Team Strategy

1. Team completes Setup + Foundational.
2. Then split:
   - Dev A: US1
   - Dev B: US2
3. Next split:
   - Dev A: US3
   - Dev B: US4
4. Merge, run Phase 7 validation/build.

---

## Notes

- All tasks keep strict checklist format: `- [ ] T### [P?] [US?] Description with file path`.
- Story tasks include mandatory `[US#]` labels for traceability.
- English-only implementation/config/comment output is required (CA-001).
- Jekyll-convention compliance and local build validation are mandatory (CA-002/CA-003).
- Avoid scope drift beyond home routes, posts indexes, localized listing logic, and language-switch/fallback surfaces (FR-014).
