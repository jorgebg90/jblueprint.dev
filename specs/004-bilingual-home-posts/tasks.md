---
description: "Task list for Bilingual Home Banner/Intro and Localized Posts Navigation"
---

# Tasks: Bilingual Home Banner/Intro and Localized Posts Navigation

**Input**: Design documents from `/specs/004-bilingual-home-posts/`
**Prerequisites**: spec.md ✓, research.md ✓, data-model.md ✓, contracts/navigation-and-routing-contract.md ✓, quickstart.md ✓

**Tests**: Not included — no TDD approach requested in spec.

**Organization**: Tasks are grouped by phase. Phase 0 and Phase 1 are blocking prerequisites. User stories US1–US4 follow in priority order.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story this task belongs to (US1–US4 map to spec.md user stories)
- **No story label**: Setup / foundational / polish task

---

## Phase 0: Remove jekyll-polyglot

**Purpose**: Eliminate jekyll-polyglot from the project entirely (AC-001). This phase MUST be completed before Phase 1 — any residual polyglot references will mask `site.active_lang` bugs introduced by the custom solution.

**⚠️ CRITICAL**: No Phase 1 or user story work can begin until jekyll-polyglot is fully removed and the build is clean.

- [ ] T001 [P] Remove `gem "jekyll-polyglot"` from `Gemfile` (jekyll_plugins group)
- [ ] T002 [P] Remove `jekyll-polyglot` from the `plugins:` list in `_config.yml` and delete any polyglot-specific config keys (e.g. `languages:`, `parallel_localization:`, `default_lang:` if polyglot-owned)
- [ ] T003 Run `bundle install` from the repository root to regenerate `Gemfile.lock` without jekyll-polyglot; confirm gem is absent in lock file

**Checkpoint**: `bundle exec jekyll build` must succeed with no polyglot load errors before proceeding.

---

## Phase 1: Establish site_lang Variable (Foundational)

**Purpose**: Replace every `site.active_lang` reference across all layouts and includes with a custom `site_lang` Liquid variable derived solely from `page.lang` (AC-002, AC-003). Also fixes the `es/index.markdown` permalink collision. This phase MUST be complete before any user story work touches templates.

**⚠️ CRITICAL**: All user story phases depend on this phase. The `site_lang` variable becomes the single locale-identity mechanism throughout the site.

**Pattern applied in every file**:
Replace `page.lang | default: site.active_lang | default: …` with `page.lang | default: site.default_lang | default: 'en'`; rename the local variable to `site_lang` for consistency.

- [ ] T004 [P] Fix `es/index.markdown` — change `permalink:` value to `/es/` (was `/`); this resolves the permalink collision with the English home route
- [ ] T005 [P] Update `_layouts/default.html` — replace `site.active_lang` fallback in the `active_lang` assignment; rename variable to `site_lang`; update all intra-file references from `active_lang` to `site_lang`
- [ ] T006 [P] Update `_layouts/home.html` — replace `site.active_lang` fallback in the `active_lang` assignment; rename variable to `site_lang`; update all intra-file references
- [ ] T007 [P] Update `_layouts/posts-index.html` — replace `site.active_lang` fallback in the `active_lang` assignment; rename variable to `site_lang`; update all intra-file references
- [ ] T008 [P] Update `_includes/masthead.html` — replace `site.active_lang` fallback in the `active_lang` assignment; rename variable to `site_lang`; update all intra-file references (including `active_lang == 'es'` guards and link-label/link-url lookups)
- [ ] T009 [P] Update `_includes/language-switcher.html` — replace `site.active_lang` fallback in the `current_lang` assignment; rename variable to `site_lang`; update all intra-file references
- [ ] T010 [P] Update `_includes/hreflang-links.html` — replace `site.active_lang` fallback in the `current_lang` assignment; rename variable to `site_lang`; update all intra-file references
- [ ] T011 [P] Update `_includes/translation-feedback.html` — replace `site.active_lang` fallback in the `active_lang` assignment; rename variable to `site_lang`; update all intra-file references
- [ ] T012 [P] Update `_includes/post_pagination.html` — replace `site.active_lang` fallback in the `current_lang` assignment; rename variable to `site_lang`; update all intra-file references
- [ ] T013 Run `bundle exec jekyll build` — confirm build passes with zero errors; verify no `site.active_lang` references remain in any processed template output

**Checkpoint**: Foundation ready — all locale context now derived from `page.lang` only. User story work can begin.

---

## Phase 2: User Story 1 — Bilingual Home as Clean Landing Page (Priority: P1) 🎯 MVP

**Goal**: Home pages at `/` (EN) and `/es/` (ES) show localized banner + intro content only — no inline post listings. Post discovery is delegated to dedicated posts routes.

**Independent Test**: Open `/` and `/es/` in a locally served build and confirm: (1) localized banner and intro content is visible, (2) no inline posts list is rendered on either variant, (3) a clear navigation path to the posts section is present.

### Implementation for User Story 1

- [ ] T014 [P] [US1] Update `index.markdown` — set front matter: `layout: home`, `lang: en`, `translation_key: home`, `permalink: /`, `show_inline_posts: false`; add English banner text and intro body content
- [ ] T015 [P] [US1] Update `es/index.markdown` — set front matter: `layout: home`, `lang: es`, `translation_key: home`, `permalink: /es/`, `show_inline_posts: false`; add Spanish banner text and intro body content
- [ ] T016 [US1] Update `_layouts/home.html` — add `page.show_inline_posts` guard: skip the inline posts-list rendering section when the guard is `false`; ensure banner and intro content renders using `site_lang` for locale-aware copy selection
- [ ] T017 [US1] Run `bundle exec jekyll build`; open `/` and `/es/` and verify: localized banner + intro visible on both, no posts list rendered, navigation path to posts section present

**Checkpoint**: User Story 1 is independently functional and testable. `/` and `/es/` are clean landing pages.

---

## Phase 3: User Story 2 — Dedicated Localized Posts Sections (Priority: P1)

**Goal**: Dedicated posts pages exist at `/posts/` (EN) and `/es/posts/` (ES) with localized labels and are reachable from top-level navigation in each locale context.

**Independent Test**: Navigate from EN and ES home pages using masthead navigation — confirm Posts link resolves to `/posts/` from EN context and `/es/posts/` from ES context; confirm correct locale labels appear.

### Implementation for User Story 2

- [ ] T018 [P] [US2] Verify/update `posts/index.markdown` — confirm front matter: `layout: posts-index`, `lang: en`, `translation_key: posts-index`, `permalink: /posts/`; add `title`, `nav_label: Posts`, and `empty_state_message` fields
- [ ] T019 [P] [US2] Verify/update `es/posts/index.markdown` — confirm front matter: `layout: posts-index`, `lang: es`, `translation_key: posts-index`, `permalink: /es/posts/`; add Spanish `title`, `nav_label: Publicaciones`, and `empty_state_message` fields
- [ ] T020 [US2] Update `_data/navigation.yml` — add/update locale-keyed navigation entries: EN (Home → `/`, Posts → `/posts/`), ES (Inicio → `/es/`, Publicaciones → `/es/posts/`)
- [ ] T021 [US2] Verify `_includes/masthead.html` — confirm locale-aware link resolution uses `site_lang` (from `page.lang`) exclusively; EN context produces EN routes, ES context produces ES routes, no cross-locale drift
- [ ] T022 [US2] Run `bundle exec jekyll build`; follow navigation from EN and ES home to Posts; verify `/posts/` (EN labels) and `/es/posts/` (ES labels) are reachable; verify repeated Home/Posts navigation in one locale stays in that locale

**Checkpoint**: User Stories 1 and 2 are both independently functional. Home and Posts are separate surfaces with locale-correct navigation.

---

## Phase 4: User Story 3 — Localized Post Filtering Without Duplicates (Priority: P2)

**Goal**: Each posts page lists only active-language posts; entries with missing `lang` metadata are excluded without breaking rendering; duplicate logical entries for the same `translation_key` in one locale are suppressed.

**Independent Test**: With a bilingual content set covering: EN-only posts, ES-only posts, bilingual translation pairs, and posts with missing `lang` — validate each posts page against the contract: lang-strict output, zero duplicates per locale, no render failures.

### Implementation for User Story 3

- [ ] T023 [US3] Update `_layouts/posts-index.html` — implement lang-strict filtering loop: for each post in `site.posts`, include only entries where `post.lang == site_lang`; skip entries where `post.lang` is missing or not a recognized locale value without breaking page render
- [ ] T024 [US3] Update `_layouts/posts-index.html` — add `translation_key` deduplication block within the filtered loop: maintain a `seen_keys` tracking array; for each post that has a `translation_key`, skip if key already seen in this locale; posts without `translation_key` are always included as standalone entries
- [ ] T025 [US3] Update `_layouts/posts-index.html` — add empty-state block: after the loop, if rendered post count is zero, output `page.empty_state_message` using `site_lang`; confirm Home and Posts navigation links remain in the page layout when empty state is shown
- [ ] T026 [US3] Add/verify representative `_posts/` entries covering all edge cases: bilingual pair with shared `translation_key`, EN-only post, ES-only post, post with missing `lang`, and same-locale `translation_key` collision
- [ ] T027 [US3] Run `bundle exec jekyll build`; validate `/posts/` — only `lang: en` entries visible, no ES posts, no duplicate logical entries; validate `/es/posts/` — only `lang: es` entries visible, no EN posts, no duplicates; confirm missing-`lang` posts absent and no render failure; confirm empty-state message renders when applicable

**Checkpoint**: User Story 3 is independently verifiable. Post lists are lang-strict, deduplicated, and resilient to metadata gaps.

---

## Phase 5: User Story 4 — Language Switching with Robust Fallback (Priority: P2)

**Goal**: Language switching resolves to the counterpart page/post when a `translation_key` match exists in the target locale; otherwise falls back to a valid default-language route and shows translation-unavailable feedback in the active UI language.

**Independent Test**: In a build with translated and untranslated pages/posts: switch from a translated page (expect counterpart route), switch from an untranslated page (expect fallback route + visible feedback message); confirm no dead-end outcomes.

### Implementation for User Story 4

- [ ] T028 [US4] Update `_includes/language-switcher.html` — implement counterpart-first switch resolution: derive `site_lang` from `page.lang | default: 'en'`; look up `page.translation_key` in `site.pages` and `site.posts` to find a match with target locale; if found, set switch target to that page/post URL
- [ ] T029 [US4] Update `_includes/language-switcher.html` — implement fallback path: when no `translation_key` counterpart exists in target locale, resolve switch target to safe default-language route by context (source is post → `/posts/`; source is page → `/`); mark that fallback occurred so feedback component activates
- [ ] T030 [US4] Update `_includes/translation-feedback.html` — confirm feedback message renders in active UI language (`site_lang`); verify EN and ES feedback strings exist in `_data/messages.yml`; add missing strings if needed; remove any remaining `site.active_lang` reference
- [ ] T031 [US4] Verify `_includes/hreflang-links.html` — confirm `site_lang` (not `site.active_lang`) is used for `hreflang` attribute value and alternate-route lookup; correct if any residual reference remains
- [ ] T032 [US4] Run `bundle exec jekyll build`; test language switch from: (a) page with EN+ES variants — expect direct counterpart route, (b) page with no counterpart — expect fallback route + visible translation-unavailable feedback in active language, (c) post with no counterpart — expect `/posts/` or `/` fallback; confirm zero dead-end 404 outcomes in scope

**Checkpoint**: All four user stories are independently functional. Bilingual home, dedicated posts, filtered listings, and safe language switching are all operational.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final audit, documentation, and production validation across all stories.

- [ ] T033 [P] Audit all files in `_layouts/`, `_includes/`, and `_data/` for any residual `site.active_lang` occurrence; replace each with the appropriate `page.lang`-derived `site_lang` variable (AC-002 final sweep)
- [ ] T034 [P] Verify all code, comments, front matter keys, and config keys touched by this feature are English-only (CA-001 compliance check)
- [ ] T035 Update `docs/multilingual-redirects.md` — document the published fallback routing behavior for unsupported locale-prefixed requests in feature scope (FR-012 traceability)
- [ ] T036 Run production navigation validation: `python3 scripts/validate_production_navigation.py --base-url "https://jblueprint.dev"` — confirm output ends with `Result: PASSED`; any failed route must be fixed and redeployed before this task is marked done
- [ ] T037 Final build gate: run `bundle exec jekyll build` and confirm zero errors; record pass result in commit message

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 0 (Remove polyglot)
  └─► Phase 1 (Establish site_lang — BLOCKS all user stories)
        ├─► Phase 2 (US1 — P1) 🎯 MVP
        ├─► Phase 3 (US2 — P1)  ← can run in parallel with US1 after Phase 1
        ├─► Phase 4 (US3 — P2)  ← can start after Phase 1; benefits from US1+US2 done
        └─► Phase 5 (US4 — P2)  ← can start after Phase 1; integration with US2 nav expected
              └─► Phase 6 (Polish) — after all desired stories are complete
```

### User Story Dependencies

- **US1 (P1)**: Requires Phase 0 + Phase 1 complete. No dependency on US2/US3/US4.
- **US2 (P1)**: Requires Phase 0 + Phase 1 complete. No dependency on US1/US3/US4 (can run in parallel with US1).
- **US3 (P2)**: Requires Phase 0 + Phase 1 complete. Integrates with US2 posts pages (T018–T019 should be done before T026 validation is meaningful, but T023–T025 implementation is independent).
- **US4 (P2)**: Requires Phase 0 + Phase 1 complete. Integration with US2 navigation expected (T020–T021 should be done for full switch flow to be testable end-to-end).

### Within Each Phase

- All [P]-marked tasks in Phase 0 can run in parallel (different files: Gemfile vs `_config.yml`)
- All [P]-marked tasks in Phase 1 (T004–T012) can run in parallel — each targets a different file
- Build gate tasks (T003, T013, T017, T022, T027, T032, T037) must follow their respective parallel blocks
- T004 (permalink fix) is independent of layout/include updates and can run in parallel with T005–T012

### Parallel Opportunities

```bash
# Phase 0 — run together:
T001  # Gemfile
T002  # _config.yml

# Phase 1 — run together after T003:
T004  # es/index.markdown permalink fix
T005  # _layouts/default.html
T006  # _layouts/home.html
T007  # _layouts/posts-index.html
T008  # _includes/masthead.html
T009  # _includes/language-switcher.html
T010  # _includes/hreflang-links.html
T011  # _includes/translation-feedback.html
T012  # _includes/post_pagination.html

# Phase 2 — run together:
T014  # index.markdown
T015  # es/index.markdown

# Phase 3 — run together:
T018  # posts/index.markdown
T019  # es/posts/index.markdown

# Phase 6 — run together:
T033  # site.active_lang final audit
T034  # English-only compliance check
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2, Priority P1)

1. Complete Phase 0 (remove polyglot) — mandatory prerequisite
2. Complete Phase 1 (establish `site_lang`) — mandatory prerequisite
3. Complete Phase 2 (US1 — bilingual home pages)
4. Complete Phase 3 (US2 — dedicated posts sections)
5. **STOP and VALIDATE**: Build + navigate to `/`, `/es/`, `/posts/`, `/es/posts/` — confirm US1 and US2 independently testable
6. Deploy/demo if ready; US3 and US4 are additive

### Incremental Delivery

1. Phase 0 + Phase 1 → polyglot-free site with `site_lang` baseline
2. Phase 2 (US1) → clean localized home pages with no inline posts *(demo ready)*
3. Phase 3 (US2) → dedicated posts sections accessible from navigation *(demo ready)*
4. Phase 4 (US3) → lang-strict filtered post lists with deduplication *(demo ready)*
5. Phase 5 (US4) → safe language switching with translation fallback *(full feature)*
6. Phase 6 → polish, audit, production validation

### Suggested MVP Scope

Ship after Phase 3 (US1 + US2 complete). This satisfies FR-001 through FR-005 and the P1 success criteria (SC-001, SC-002).

---

## Notes

- **[P]** = different files, no dependency on incomplete tasks — safe to parallelize
- **[US#]** label maps task to its user story for traceability and independent delivery
- `site_lang` is always derived from `page.lang | default: site.default_lang | default: 'en'` — never from `site.active_lang`
- Every site-affecting change requires a `bundle exec jekyll build` validation before the phase checkpoint is marked done
- All code, front matter keys, config keys, and comments must remain English-only (CA-001)
- AC-004: locale pages are explicitly authored; no automatic variant generation is used or assumed
- Commit after each logical task group or phase checkpoint
- Stop at any checkpoint to validate the story independently before proceeding
