---
description: "Task list for reorganizing bilingual site structure to site/en and site/es"
---

# Tasks: Reorganize Site Language Structure

**Input**: Design documents from `/specs/005-reorganize-site-languages/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/language-structure-routing-contract.md, quickstart.md

**Tests**: No TDD-first automated test suite was explicitly requested in spec.md. Validation tasks are included as build/navigation gates.

**Organization**: Tasks are grouped by user story to keep each increment independently verifiable.

## Format: `[ID] [P?] [Story?] Description with file path`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare migration artifacts, checkpoints, and working files before touching live content.

- [X] T001 Create migration artifact directories and index file in `specs/005-reorganize-site-languages/artifacts/README.md`
- [X] T002 Build initial EN/ES content inventory (source path, target path, permalink, language, state) in `specs/005-reorganize-site-languages/artifacts/content-inventory.csv`
- [X] T003 Build initial high-priority route continuity table in `specs/005-reorganize-site-languages/artifacts/route-mapping.csv`
- [X] T004 [P] Define rollback checkpoint A metadata and restore commands in `specs/005-reorganize-site-languages/artifacts/rollback/checkpoint-a.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared structure/config/validators required before story implementation.

**⚠️ CRITICAL**: No user story work should start until this phase is complete.

- [X] T005 Create language-first directory scaffold (`site/en`, `site/es`, `site/en/posts`, `site/es/posts`, `site/en/_posts`, `site/es/_posts`) with keep files at `site/en/_posts/.gitkeep`
- [X] T006 Update Jekyll build rules for language-first source structure and deterministic rendering in `_config.yml`
- [X] T007 [P] Add local canonical-route validator for generated `_site` output in `scripts/validate_local_routes.py`
- [X] T008 [P] Update production navigation expectations to match in-scope canonical routes and representative posts in `scripts/validate_production_navigation.py`
- [X] T009 Run clean baseline build and store output log in `specs/005-reorganize-site-languages/artifacts/validation/pre-move-build.log`
- [X] T010 Run baseline local route validation and store output log in `specs/005-reorganize-site-languages/artifacts/validation/pre-move-routes.log`

**Checkpoint**: Foundation ready — migration and story work can begin.

---

## Phase 3: User Story 1 - Separate language content structure (Priority: P1) 🎯 MVP

**Goal**: Store all in-scope English and Spanish content in dedicated `site/en` and `site/es` paths.

**Independent Test**: Migrate representative EN/ES pages and posts, run build, and confirm content renders on expected URLs.

### Implementation for User Story 1

- [X] T011 [P] [US1] Move English root pages to language scope (`index.markdown` -> `site/en/index.markdown`, `about.markdown` -> `site/en/about.markdown`, `posts/index.markdown` -> `site/en/posts/index.markdown`)
- [X] T012 [P] [US1] Move Spanish root pages to language scope (`es/index.markdown` -> `site/es/index.markdown`, `es/about.markdown` -> `site/es/about.markdown`, `es/posts/index.markdown` -> `site/es/posts/index.markdown`)
- [X] T013 [US1] Move English post sources from `_posts/2026/05/08/` into `site/en/_posts/2026/05/08/` and preserve front matter/permalinks in `site/en/_posts/2026/05/08/2026-05-08-minimal-mistakes-integration.md`
- [X] T014 [US1] Move Spanish post sources from `_posts/2026/05/08/` into `site/es/_posts/2026/05/08/` and preserve front matter/permalinks in `site/es/_posts/2026/05/08/2026-05-08-como-crear-un-blog-con-spec-driven-design-es.markdown`
- [X] T015 [US1] Normalize `lang`, `translation_key`, and permalink continuity metadata in moved bilingual pages/posts under `site/en/` and `site/es/`
- [X] T016 [US1] Update maintainer workflow documentation for new authoring locations in `docs/multilingual-content-workflow.md`
- [X] T017 [US1] Run post-move build and store output log in `specs/005-reorganize-site-languages/artifacts/validation/us1-post-move-build.log`
- [X] T018 [US1] Update migration state for all moved items in `specs/005-reorganize-site-languages/artifacts/content-inventory.csv`

**Checkpoint**: US1 is functional and independently testable.

---

## Phase 4: User Story 2 - Preserve user-facing navigation and links (Priority: P2)

**Goal**: Keep canonical routes and bilingual navigation working after source relocation.

**Independent Test**: Verify home/posts/about and representative post links in both languages with zero critical navigation breaks.

### Implementation for User Story 2

- [X] T019 [P] [US2] Align bilingual masthead targets with canonical EN/ES routes in `_data/navigation.yml`
- [X] T020 [P] [US2] Update locale-aware menu resolution for canonical links and ES prefix handling in `_includes/masthead.html`
- [X] T021 [P] [US2] Update counterpart/fallback switch behavior to rely on metadata (not source paths) in `_includes/language-switcher.html`
- [X] T022 [P] [US2] Update hreflang generation to keep EN/ES alternates stable after migration in `_includes/hreflang-links.html`
- [X] T023 [US2] Complete and verify high/critical continuity mappings (direct-serve/redirect/deprecated) in `specs/005-reorganize-site-languages/artifacts/route-mapping.csv`
- [X] T024 [US2] Document redirect/deprecation decisions linked to route map in `docs/multilingual-redirects.md`
- [X] T025 [US2] Run post-navigation build and local route validation, then store logs in `specs/005-reorganize-site-languages/artifacts/validation/us2-routes.log`
- [X] T026 [US2] Run production navigation validator and store result log in `specs/005-reorganize-site-languages/artifacts/validation/us2-production-navigation.log`

**Checkpoint**: US2 is functional and independently testable.

---

## Phase 5: User Story 3 - Safe build and deployment transition (Priority: P3)

**Goal**: Ensure release readiness with reproducible validation gates and rollback execution.

**Independent Test**: Execute clean build, output comparison, release checks, and rollback drill with documented pass/fail evidence.

### Implementation for User Story 3

- [X] T027 [P] [US3] Create pre-release gate checklist (build, routes, navigation, missing content) in `specs/005-reorganize-site-languages/artifacts/release-readiness.md`
- [X] T028 [P] [US3] Define rollback checkpoint B metadata and restore commands in `specs/005-reorganize-site-languages/artifacts/rollback/checkpoint-b.md`
- [X] T029 [US3] Run clean pre-release build (`rm -rf _site .jekyll-cache && bundle exec jekyll build`) and store log in `specs/005-reorganize-site-languages/artifacts/validation/pre-release-build.log`
- [X] T030 [US3] Compare pre-move vs post-move canonical outputs and capture diffs/decisions in `specs/005-reorganize-site-languages/artifacts/validation/route-diff.md`
- [X] T031 [US3] Execute rollback drill from checkpoint B and capture outcome in `specs/005-reorganize-site-languages/artifacts/rollback/rollback-drill.md`
- [X] T032 [US3] Finalize operator rollback runbook with trigger conditions and step-by-step commands in `docs/multilingual-rollback.md`
- [X] T033 [US3] Mark verified continuity status and release decision for critical/high routes in `specs/005-reorganize-site-languages/artifacts/route-mapping.csv`

**Checkpoint**: US3 is functional and independently testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup, documentation alignment, and consolidated evidence.

- [X] T034 [P] Remove obsolete pre-migration content locations and record removals in `specs/005-reorganize-site-languages/artifacts/cleanup-manifest.md`
- [X] T035 [P] Update repository-level structure and validation instructions for `site/en` + `site/es` in `README.md`
- [X] T036 [P] Update operational validation usage notes for route/navigation checks in `docs/production-navigation-validation.md`
- [X] T037 Run final full validation suite and summarize build/navigation/rollback status in `specs/005-reorganize-site-languages/tasks-validation-summary.md`

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Phase 1 (Setup)** -> required first.
2. **Phase 2 (Foundational)** -> blocks all user stories.
3. **Phase 3 (US1)** -> depends on Phase 2.
4. **Phase 4 (US2)** -> depends on US1 content move completion + Phase 2.
5. **Phase 5 (US3)** -> depends on US1 + US2 validation artifacts.
6. **Phase 6 (Polish)** -> depends on all user stories complete.

### User Story Dependencies

- **US1 (P1)**: Starts after foundational phase; no dependency on other stories.
- **US2 (P2)**: Requires US1 migrated content and foundational validators.
- **US3 (P3)**: Requires US1 structure + US2 continuity evidence.

### Parallel Opportunities

- **Setup**: T004 can run in parallel with T001-T003.
- **Foundational**: T007 and T008 can run in parallel after T006 starts.
- **US1**: T011 and T012 can run in parallel; T013/T014 can proceed in parallel once page moves finish.
- **US2**: T019-T022 can run in parallel (different files).
- **US3**: T027 and T028 can run in parallel.
- **Polish**: T034-T036 can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Run page moves in parallel:
Task: "T011 Move English root pages to site/en paths"
Task: "T012 Move Spanish root pages to site/es paths"

# Then run post moves in parallel:
Task: "T013 Move English posts to site/en/_posts"
Task: "T014 Move Spanish posts to site/es/_posts"
```

## Parallel Example: User Story 2

```bash
Task: "T019 Update _data/navigation.yml"
Task: "T020 Update _includes/masthead.html"
Task: "T021 Update _includes/language-switcher.html"
Task: "T022 Update _includes/hreflang-links.html"
```

## Parallel Example: User Story 3

```bash
Task: "T027 Create release-readiness checklist"
Task: "T028 Define rollback checkpoint B"
```

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate US1 via T017 + T018 before continuing.

### Incremental Delivery

1. Deliver US1 (content reorganization).
2. Add US2 (route/navigation continuity).
3. Add US3 (release safety + rollback).
4. Run final polish and consolidated validation.

### Suggested MVP Scope

- **MVP**: Phase 1 + Phase 2 + Phase 3 (US1 only).
- **Release Candidate**: Add Phase 4 (US2) to preserve route continuity guarantees.

---

## Notes

- Keep all implementation comments/config keys/documentation updates in English.
- Keep canonical public routes stable: `/`, `/about/`, `/posts/`, `/es/`, `/es/about/`, `/es/posts/`.
- Do not mark a checkpoint complete without attached log/evidence files in `specs/005-reorganize-site-languages/artifacts/`.

