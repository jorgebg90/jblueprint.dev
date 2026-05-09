---
description: "Task list for 002-add-minimal-mistakes-theme"
---

# Tasks: Add Minimal Mistakes Theme

**Input**: Design documents from `specs/002-add-minimal-mistakes-theme/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/front-matter-schema.md ✅, contracts/layout-interface.md ✅, quickstart.md ✅

**Tests**: No test tasks generated — feature spec does not explicitly request TDD or automated test coverage.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[US#]**: Which user story this task belongs to
- Exact file paths are included in every task description

---

## Phase 1: Setup

**Purpose**: Confirm a green baseline and swap the gem dependency so MM is available for all subsequent phases.

- [X] T001 Confirm active branch is `002-add-minimal-mistakes-theme` and run `bundle exec jekyll build` to record a green baseline before any changes
- [X] T002 Replace `gem "minima", "~> 2.5"` with `gem "minimal-mistakes-jekyll"` in `Gemfile`, then run `bundle install` to lock the new gem

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Wire `_config.yml` to activate MM as the theme and protect Polyglot's asset routing. No user story can be validated until this phase is complete.

**⚠️ CRITICAL**: All user story work depends on this phase completing cleanly.

- [X] T003 Update `_config.yml`: set `theme: minimal-mistakes-jekyll`, remove `theme: minima`; add `minimal_mistakes_skin: default`, `locale: en-US`, `breadcrumbs: false`, and author/site fields (`title`, `name`, `description`, `url`, `baseurl`); update `exclude_from_localization` — remove `assets/main.css`, `assets/main.css.map`, `assets/minima-social-icons.svg` and add `assets/css/main.css`, `assets/js/main.min.js` (per research.md R-002 and data-model.md ThemeConfigurationProfile)
- [X] T004 Run `bundle exec jekyll build` to verify MM gem loads and dependency resolution succeeds; layout-not-found warnings at this stage are expected — dependency errors are not

**Checkpoint**: MM gem is active and `_config.yml` is correctly configured. User story implementation can now begin.

---

## Phase 3: User Story 1 — Read Localized Content with New Theme (Priority: P1) 🎯 MVP

**Goal**: A bilingual visitor can open English and Spanish pages with the new MM theme and receive correct locale-filtered content and hreflang metadata, without losing multilingual routing behavior (FR-001, FR-002, FR-003, FR-006).

**Independent Test**: Run `bundle exec jekyll build`; open `_site/index.html` (EN posts only) and `_site/es/index.html` (ES posts only); inspect a bilingual page `<head>` for `rel="alternate"` hreflang tags; verify MM stylesheet reference `/assets/css/main.css` is present and no `/es/assets/css/main.css` is generated.

### Implementation for User Story 1

- [X] T005 [P] [US1] Create `_includes/head/custom.html` containing `{%- include hreflang-links.html -%}` — this is MM's documented stable extension point for project-level `<head>` additions; see contracts/layout-interface.md § `_includes/head/custom.html`
- [X] T006 [P] [US1] Create `_data/navigation.yml` with a `main` list containing at minimum `Home` (`url: /`) and `About` (`url: /about/`) entries; all `title` values must be in English (CA-001); do not embed language-switcher links here (research.md R-007, data-model.md SiteNavigation)
- [X] T007 [US1] Create `_layouts/home.html` with `layout: default` in front matter and a bilingual post listing that filters `site.posts` by `site.active_lang` using `where: "lang", site.active_lang`; posts must be ordered chronologically descending; see contracts/layout-interface.md § `_layouts/home.html` and quickstart.md Step 5 for reference template
- [X] T008 [US1] Run `bundle exec jekyll build`; verify `_site/index.html` lists only English posts, `_site/es/index.html` lists only Spanish posts, a bilingual page `<head>` contains `<link rel="alternate" hreflang="en">` / `<link rel="alternate" hreflang="es">` tags, MM stylesheet reference is `/assets/css/main.css`, and no `/es/assets/css/main.css` exists in `_site/`

**Checkpoint**: User Story 1 is independently testable. Bilingual pages render with MM theme, locale-filtered post lists, and hreflang metadata.

---

## Phase 4: User Story 2 — Switch Language from Themed Pages (Priority: P2)

**Goal**: A visitor can switch between English and Spanish from any themed page and land on the equivalent localized destination when available, or the unavailable-translation fallback when not (FR-004, FR-005).

**Independent Test**: Run `bundle exec jekyll build`; inspect generated HTML on `_site/index.html` for the `.language-switcher` nav block with correct `data-current-lang`, `data-target-en`, `data-target-es` attributes; on a page without a translation, verify `data-target-es` falls back to `?translation=unavailable&requested=es`; confirm `language-session.js` is loaded with `defer`.

### Implementation for User Story 2

- [X] T009 [US2] Create `_layouts/default.html` overriding MM's root layout: replicate MM's documented HTML structure (`{% include head.html %}`, `{% include head/custom.html %}`, `{% include_cached skip-links.html %}`, `{% include_cached masthead.html %}`), then inject `{% include language-switcher.html %}` and `{% include translation-feedback.html %}` inside a `<div class="language-switcher-wrapper">` immediately after the masthead, followed by `<div id="main" role="main">{{ content }}</div>`, `{% include footer.html %}`, and `<script src="{{ '/assets/js/language-session.js' | relative_url }}" defer></script>`; set `html[lang]` from `page.lang | default: site.active_lang | default: site.lang | default: 'en'`; verify MM gem's own `default.html` structure before finalizing via `bundle show minimal-mistakes-jekyll`; see contracts/layout-interface.md § `_layouts/default.html` and quickstart.md Step 4
- [X] T010 [US2] Run `bundle exec jekyll build`; verify: language switcher nav block (`.language-switcher`) is present in `_site/index.html`, `_site/about/index.html`, and a sample post; MM masthead displays "Home" and "About" navigation links; no duplicate `<head>` or `<body>` tags in generated HTML; `data-target-es` on a page without a translation resolves to the `?translation=unavailable&requested=es` fallback URL (per data-model.md LanguageNavigationControl)

**Checkpoint**: User Stories 1 and 2 are both independently functional. Language switcher is present and correctly wired on all primary page types.

---

## Phase 5: User Story 3 — Maintain Content Workflow Under New Theme (Priority: P3)

**Goal**: A site maintainer can publish bilingual content using standard Jekyll conventions after theme adoption, including the nested `_posts/<year>/<month>/<day>/` directory structure and required documentation post (FR-007, FR-011, FR-012, SC-007, SC-008).

**Independent Test**: Run `bundle exec jekyll build`; verify new post at `_posts/2026/05/08/2026-05-08-minimal-mistakes-integration.md` appears in the English post listing at `_site/index.html` with date `2026-05-08`; confirm post URL resolves and renders with MM `post` layout; confirm no English-only implementation artifacts were introduced.

### Implementation for User Story 3

- [X] T011 [US3] Create directory `_posts/2026/05/08/` establishing the `<year>/<month>/<day>/` nesting convention for new posts in this feature's scope (research.md R-006, FR-012, SC-008); existing posts at non-year-prefixed paths are not moved (out of scope per R-006)
- [X] T012 [US3] Create `_posts/2026/05/08/2026-05-08-minimal-mistakes-integration.md` English documentation post; required front matter: `layout: post`, `title: "Installing Minimal Mistakes on a Bilingual Jekyll Blog"`, `date: 2026-05-08`, `lang: en`, `translation_key: minimal-mistakes-integration`, `categories: [jekyll, theme, minimal-mistakes]`; post body must cover: gem installation, `_config.yml` changes (theme key, skin, exclusion list), layout override strategy (`_layouts/default.html`, `_includes/head/custom.html`), language-switcher preservation, and rollback path; all prose must be in English (CA-001, FR-009, SC-007); see contracts/front-matter-schema.md § Blog Posts for field validation rules
- [X] T013 [US3] Run `bundle exec jekyll build`; verify documentation post appears in `_site/index.html` English listing under date `2026-05-08`, post renders with MM `post` layout at its resolved URL, and `_posts/2026/05/08/` directory structure is Jekyll-compatible (SC-008)

**Checkpoint**: All three user stories are independently functional. Content workflow is validated under the new theme.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Full build validation, English-only compliance sweep, and Polyglot asset exclusion confirmation across all implementation artifacts.

- [X] T014 Run full clean build `bundle exec jekyll build --trace` and complete every item in the quickstart.md Step 8 checklist: all page types render, EN/ES routes correct, language switcher functional on home/post/about pages, hreflang tags present on bilingual pages, MM masthead shows nav links, documentation post listed at correct date, 0 regressions against FR-002 through FR-005
- [X] T015 [P] Review all new and modified files (`Gemfile`, `_config.yml`, `_includes/head/custom.html`, `_layouts/default.html`, `_layouts/home.html`, `_data/navigation.yml`, `_posts/2026/05/08/2026-05-08-minimal-mistakes-integration.md`) for English-only compliance: all config keys, code comments, layout variable names, and navigation labels must be in English (CA-001, FR-009, SC-006)
- [X] T016 [P] Inspect `_site/` output to confirm no `/es/assets/css/main.css` and no `/es/assets/js/main.min.js` are generated — confirming MM static assets are correctly excluded from Polyglot localization (research.md R-002, data-model.md ThemeConfigurationProfile `exclude_from_localization`)
- [X] T017 Verify all eight success criteria (SC-001 through SC-008) are met; confirm rollback path documented in quickstart.md § Rollback Path is executable (FR-010): `gem "minima"` restore, `theme: minima` _config.yml restore, removal of `_layouts/default.html`, `_layouts/home.html`, `_includes/head/custom.html`, and `_data/navigation.yml` would fully revert the theme without touching bilingual content or routing

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — **BLOCKS all user stories**
- **User Story phases (3, 4, 5)**: All depend on Phase 2 completion
  - US1 (Phase 3) and US2 (Phase 4) have a soft dependency: `default.html` (US2/T009) references `head/custom.html` (US1/T005), so US1 should precede US2
  - US3 (Phase 5) is independent of US1 and US2 once Phase 2 is done
- **Polish (Phase 6)**: Depends on all user story phases being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Phase 2 — no dependency on US2 or US3
- **User Story 2 (P2)**: Starts after Phase 2 — `_layouts/default.html` includes `head/custom.html` created in US1, so US1 should be complete first for correct validation
- **User Story 3 (P3)**: Starts after Phase 2 — fully independent of US1 and US2

### Within Each User Story

- Parallel [P] tasks within a story can start together (different files, no dependencies)
- Build validation tasks (T008, T010, T013) must follow their story's implementation tasks
- Sequential tasks listed without [P] depend on earlier tasks in the same story

### Parallel Opportunities

- **T005 and T006** (US1): Different new files — can be created simultaneously
- **T015 and T016** (Polish): Independent read-only checks — can be done simultaneously
- **US3 (Phase 5)** as a whole can start after Phase 2 independently of US1/US2 if needed

---

## Parallel Example: User Story 1

```bash
# These two tasks have no dependencies on each other — launch together:
Task T005: Create _includes/head/custom.html
Task T006: Create _data/navigation.yml

# Then, sequentially:
Task T007: Create _layouts/home.html   # Depends on _config.yml (T003) being set
Task T008: bundle exec jekyll build    # Validates T005, T006, T007 together
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T002)
2. Complete Phase 2: Foundational (T003–T004) — **CRITICAL: blocks everything**
3. Complete Phase 3: User Story 1 (T005–T008)
4. **STOP and VALIDATE**: bilingual pages render with MM theme, locale-filtered listings, hreflang tags
5. Demo / share for review before proceeding

### Incremental Delivery

1. Phase 1 + Phase 2 → MM gem active, config ready
2. Phase 3 (US1) → Bilingual reading experience validated → MVP demo
3. Phase 4 (US2) → Language switcher on themed pages validated
4. Phase 5 (US3) → Content workflow + documentation post validated
5. Phase 6 (Polish) → Full acceptance criteria sweep → merge-ready

### Single-Developer Strategy

Work sequentially in priority order:
1. T001 → T002 → T003 → T004 (baseline ready)
2. T005 + T006 (parallel) → T007 → T008 (US1 complete)
3. T009 → T010 (US2 complete)
4. T011 → T012 → T013 (US3 complete)
5. T014 → T015 + T016 (parallel) → T017 (done)

---

## Notes

- **[P]** tasks operate on different files with no dependencies between them
- **[US#]** label maps each task to its user story for traceability
- Each user story is independently completable and testable via `bundle exec jekyll build`
- `bundle exec jekyll build` is mandatory after each major integration milestone (constitution IV / CA-004)
- All config keys, code comments, layout variable names, and `_data/` labels must be in English (CA-001)
- Do not add `jekyll-remote-theme` or any non-Jekyll runtime service (FR-008, research.md R-001)
- `breadcrumbs: false` in `_config.yml` is required — MM breadcrumbs are not Polyglot locale-aware (research.md R-005)
- MM's `locale` config key is decorative only — do not use it for runtime locale detection; Polyglot's `site.active_lang` governs that (research.md R-004)
- Commit after each task or logical group; each integration step is independently committable (constitution V)
- Rollback procedure is documented in quickstart.md § Rollback Path and must remain executable (FR-010)
