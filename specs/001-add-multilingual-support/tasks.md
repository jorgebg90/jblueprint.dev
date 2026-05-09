# Tasks: Add Multilingual Support (Spanish and English)

**Input**: Design documents from `/specs/001-add-multilingual-support/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/multilingual-routing-contract.md`, `quickstart.md`

**Tests**: No mandatory automated test suite was explicitly requested in the feature spec. This plan uses executable validation tasks with `bundle exec jekyll build` and quickstart behavior checks.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install and scaffold multilingual prerequisites in a Jekyll-first, English-only way.

- [X] T001 Add `jekyll-polyglot` dependency to `Gemfile`
- [X] T002 Run `bundle install` and update locked dependencies in `Gemfile.lock`
- [X] T003 [P] Create locale registry data in `_data/locales.yml`
- [X] T004 [P] Create user-facing localization messages in `_data/messages.yml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared multilingual plumbing that blocks all user stories until complete.

**⚠️ CRITICAL**: No user story work starts before this phase is done.

- [X] T005 Configure Polyglot locales, default locale routing, and exclusions in `_config.yml`
- [X] T006 Create Jekyll layout override entry point for multilingual UI in `_layouts/default.html`
- [X] T007 [P] Implement alternate-language SEO links include in `_includes/hreflang-links.html`
- [X] T008 [P] Implement equivalent-page language selector include in `_includes/language-switcher.html`
- [X] T009 [P] Implement translation-unavailable feedback include in `_includes/translation-feedback.html`
- [X] T010 Implement session-scoped language preference behavior in `assets/js/language-session.js`
- [X] T011 Wire multilingual includes and script loading in `_layouts/default.html`
- [X] T012 Define hosting redirect contract for `301` unsupported locale and `302` missing translation in `docs/multilingual-redirects.md`

**Checkpoint**: Foundation ready. User stories can now proceed.

---

## Phase 3: User Story 1 - Read in Preferred Language (Priority: P1) 🎯 MVP

**Goal**: Visitors can open core pages/posts in English and Spanish with the expected URL strategy.

**Independent Test**: Build and serve locally, then confirm each core route works in default (`/`) and Spanish (`/es/`) variants.

### Implementation for User Story 1

- [X] T013 [US1] Add English locale metadata (`lang`, `translation_key`) to `index.markdown`
- [X] T014 [US1] Add English locale metadata (`lang`, `translation_key`) to `about.markdown`
- [X] T015 [US1] Add English locale metadata (`lang`, `translation_key`) to `_posts/2026-05-08-welcome-to-jekyll.markdown`
- [X] T016 [P] [US1] Create Spanish home page variant in `es/index.markdown`
- [X] T017 [P] [US1] Create Spanish about page variant in `es/about.markdown`
- [X] T018 [P] [US1] Create Spanish post variant in `_posts/2026-05-08-bienvenido-a-jekyll.markdown`
- [X] T019 [US1] Align localized navigation/permalink behavior in `index.markdown` and `es/index.markdown`
- [X] T020 [US1] Validate bilingual route output with `bundle exec jekyll build` using `_site/index.html`, `_site/es/index.html`, and `_site/es/jekyll/update/2026/05/08/welcome-to-jekyll.html`

**Checkpoint**: User Story 1 is fully functional and independently verifiable.

---

## Phase 4: User Story 2 - Switch Language Without Losing Context (Priority: P2)

**Goal**: Visitors switch language from the current page and keep reading equivalent content when available.

**Independent Test**: Open a bilingual page, switch locale, confirm equivalent URL opens; for missing translation, confirm valid fallback page plus visible feedback.

### Implementation for User Story 2

- [X] T021 [US2] Render language selector in shared layout via `_layouts/default.html`
- [X] T022 [US2] Implement equivalent-page target resolution in `_includes/language-switcher.html`
- [X] T023 [P] [US2] Render missing-translation feedback message in `_includes/translation-feedback.html`
- [X] T024 [P] [US2] Handle session-only preference and feedback query state in `assets/js/language-session.js`
- [X] T025 [US2] Add concrete redirect mapping examples for unsupported and missing-translation paths in `docs/multilingual-redirects.md`
- [X] T026 [US2] Validate context-preserving switch behavior with manual quickstart checks in `specs/001-add-multilingual-support/quickstart.md`

**Checkpoint**: User Stories 1 and 2 are independently functional.

---

## Phase 5: User Story 3 - Publish and Maintain Bilingual Content Reliably (Priority: P3)

**Goal**: Maintainers can add/edit bilingual content predictably with standard Jekyll conventions.

**Independent Test**: Add/update bilingual content using documented workflow and complete a successful local build without front matter issues.

### Implementation for User Story 3

- [X] T027 [US3] Document bilingual authoring workflow and required front matter keys in `README.md`
- [X] T028 [P] [US3] Add maintainer guide for translation keys, locale pairing, and file placement in `docs/multilingual-content-workflow.md`
- [X] T029 [P] [US3] Add multilingual publishing quality checklist entries in `specs/001-add-multilingual-support/checklists/requirements.md`
- [X] T030 [US3] Update validation flow for maintainers in `specs/001-add-multilingual-support/quickstart.md`

**Checkpoint**: All user stories are independently completable and maintainable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final alignment, compliance, and rollback safety across stories.

- [X] T031 [P] Verify `hreflang`/`x-default` output rules for bilingual and single-language pages in `specs/001-add-multilingual-support/quickstart.md`
- [X] T032 Run final local build gate (`bundle exec jekyll build`) and capture completion evidence in `specs/001-add-multilingual-support/checklists/requirements.md`
- [X] T033 [P] Document multilingual rollback steps for plugin/config/content changes in `docs/multilingual-rollback.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2; functionally benefits from bilingual content created in US1.
- **Phase 5 (US3)**: Depends on Phase 2; can run after US1 structure is established.
- **Phase 6 (Polish)**: Depends on completion of selected user stories.

### User Story Dependency Graph

- **US1 (P1)** -> Enables production-ready bilingual content baseline.
- **US2 (P2)** -> Depends on foundational multilingual plumbing; validates best when US1 pages exist.
- **US3 (P3)** -> Depends on agreed conventions and artifacts from foundational + US1.

---

## Parallel Execution Examples

### User Story 1

- Run in parallel after T015:
  - T016 in `es/index.markdown`
  - T017 in `es/about.markdown`
  - T018 in `_posts/2026-05-08-bienvenido-a-jekyll.markdown`

### User Story 2

- Run in parallel after T021:
  - T023 in `_includes/translation-feedback.html`
  - T024 in `assets/js/language-session.js`

### User Story 3

- Run in parallel:
  - T028 in `docs/multilingual-content-workflow.md`
  - T029 in `specs/001-add-multilingual-support/checklists/requirements.md`

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1) end-to-end.
3. Validate bilingual route output and readability before expanding scope.

### Incremental Delivery

1. Foundation first (Phases 1-2).
2. Deliver US1 (core multilingual access).
3. Deliver US2 (context-preserving switch and fallback messaging).
4. Deliver US3 (maintainer workflow and quality controls).
5. Finish with Phase 6 compliance and rollback hardening.

### Constitution Alignment Checkpoints

- English-only implementation artifacts: enforced in every task path and output.
- Jekyll-first compliance: `_config.yml`, front matter, layouts/includes, and build workflow are used as primary implementation surfaces.
- Build validation gate: explicit in T020 and T032.
- Small, traceable increments: tasks are story-grouped and dependency-ordered.


