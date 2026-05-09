# Implementation Plan: Bilingual Home Banner/Intro and Localized Posts Navigation

**Branch**: `004-bilingual-home-posts` | **Date**: 2026-05-09 | **Spec**: [`specs/004-bilingual-home-posts/spec.md`](./spec.md)
**Input**: Feature specification from `/specs/004-bilingual-home-posts/spec.md`

## Summary

Implement a bilingual information-architecture update for the existing Jekyll blog so home routes (`/`, `/es/`) are clean landing pages with localized banner + intro only, while posts discovery moves to dedicated localized routes (`/posts/`, `/es/posts/`). The implementation keeps Minimal Mistakes + Polyglot conventions, hardens locale-safe navigation and language switching with fallback feedback, and enforces locale-strict post listing with translation-key deduplication and metadata resilience.

## Technical Context

**Language/Version**: Ruby 3.x runtime, Jekyll `~> 4.4.1`, Liquid templates, Markdown with YAML front matter  
**Primary Dependencies**: `jekyll`, `minimal-mistakes-jekyll` (4.28.0), `jekyll-polyglot` (1.12.0), `jekyll-include-cache`, `jekyll-feed`, `jekyll-remote-theme`  
**Storage**: File-based static site content (`.markdown`, `_posts/`, `_data/*.yml`, `_includes/*.html`, `_layouts/*.html`, `assets/*`)  
**Testing**: Local build validation (`bundle exec jekyll build`) + route/UI acceptance checks documented in `quickstart.md`  
**Target Platform**: Static Jekyll site deployment (GitHub Pages-compatible workflow and CDN-hosted output)  
**Project Type**: Single-repository multilingual Jekyll blog (content + theme override customizations)  
**Performance Goals**: Keep static build stable; locale route resolution and navigation switching remain deterministic on first render; no mixed-language or duplicate entries in localized posts lists  
**Constraints**: English-only implementation artifacts; Jekyll-first conventions only; no unnecessary plugin additions; preserve Polyglot default-lang strategy (`en` default, `/es/` prefixed); avoid dead-end locale routing in feature scope  
**Scale/Scope**: Feature touches home pages, new localized posts index pages/layout, navigation data/include logic, language switch/fallback handling, and localized feedback/message data

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] English-only implementation: all planned code/config keys/comments are in English.
- [x] Jekyll-first compliance: approach follows official Jekyll conventions/docs.
- [x] Conventional structure: no non-standard layout/plugin choice without explicit justification.
- [x] Build validation: plan includes a local `bundle exec jekyll build` step for site-affecting changes.
- [x] Change scope: work is split into focused, traceable increments.

**Gate Result (pre-Phase 0)**: PASS

## Project Structure

### Documentation (this feature)

```text
specs/004-bilingual-home-posts/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── navigation-and-routing-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
.
├── _config.yml
├── _data/
│   ├── locales.yml
│   ├── messages.yml
│   ├── navigation.yml
│   └── ui-text.yml
├── _includes/
│   ├── language-switcher.html
│   ├── masthead.html
│   └── translation-feedback.html
├── _layouts/
│   ├── default.html
│   ├── home.html
│   └── posts-index.html              # to be added by this feature
├── _posts/
│   └── YYYY/MM/DD/*.md|*.markdown
├── assets/
│   ├── css/main.scss
│   └── js/language-session.js
├── es/
│   ├── index.markdown
│   └── posts/index.markdown          # to be added by this feature
├── index.markdown
└── posts/index.markdown              # to be added by this feature
```

**Structure Decision**: Keep the current single Jekyll project layout and implement all changes inside existing Jekyll conventions (`_layouts`, `_includes`, `_data`, content pages under root and `es/`). Add only route-conventional content files (`posts/index.markdown`, `es/posts/index.markdown`) and one layout (`_layouts/posts-index.html`) required for localized posts behavior.

## Phase 0: Research Decisions (Completed)

Research outcomes are documented in [`research.md`](./research.md). Key implementation decisions:

1. Keep `/` and `/es/` as localized home routes with banner/intro only and no inline posts loop.
2. Use canonical localized posts routes at `/posts/` and `/es/posts/` as dedicated discovery surfaces.
3. Make listing eligibility strict by locale (`post.lang == site.active_lang`) and exclude invalid/missing `lang` safely.
4. Deduplicate per locale by `translation_key`, while allowing standalone entries when `translation_key` is missing.
5. Resolve language switching equivalent-first, then fallback to valid default-language routes with localized translation-unavailable feedback.
6. Normalize unsupported locale-prefixed requests in feature scope to valid default-language routes.
7. Keep localized empty-state messaging and navigation available when a locale has zero eligible posts.

All feature-level clarifications are resolved.

## Phase 1: Design & Contracts (Completed)

- Data entities and validation rules documented in [`data-model.md`](./data-model.md):
  - `LocalizedHomeVariant`
  - `LocalizedPostsSection`
  - `LocalizedPostEntry`
  - `TranslationGroup`
  - `FallbackResolution`
- Interface contract documented in [`contracts/navigation-and-routing-contract.md`](./contracts/navigation-and-routing-contract.md).
- Implementation and verification flow documented in [`quickstart.md`](./quickstart.md).
- Agent context reference between `<!-- SPECKIT START -->` and `<!-- SPECKIT END -->` in `.github/copilot-instructions.md` points to `specs/004-bilingual-home-posts/plan.md`.

## Implementation Strategy (Phase 2 Planning Input)

1. **Home EN/ES separation (FR-001 to FR-003)**
   - Update `index.markdown` and `es/index.markdown` front matter/content blocks for localized banner + intro.
   - Remove inline post listing responsibility from `_layouts/home.html`.
   - Add clear localized CTA/navigation path from home to posts index.

2. **Dedicated localized posts sections (FR-004 to FR-005)**
   - Add `posts/index.markdown` (EN) and `es/posts/index.markdown` (ES) with shared `translation_key: posts-index` and locale-correct permalinks.
   - Introduce `_layouts/posts-index.html` to centralize localized listing behavior.
   - Update `_data/navigation.yml` and `_includes/masthead.html` so Home/Posts links remain locale-stable.

3. **Locale-strict listing and deduplication (FR-006 to FR-008, FR-013)**
   - Filter `site.posts` by active locale using `post.lang`.
   - Exclude posts with missing/invalid `lang` from localized lists without render failure.
   - Enforce one visible entry per locale per `translation_key`; apply deterministic winner on collisions.
   - Render localized empty-state messages from `_data/messages.yml` when no eligible posts exist.

4. **Language switching and safe fallback behavior (FR-009 to FR-012)**
   - Improve `_includes/language-switcher.html` counterpart resolution using translation metadata for pages/posts.
   - Preserve explicit fallback targets and query signaling for no-equivalent scenarios.
   - Align `assets/js/language-session.js` to prefer server-provided targets and sanitize fallback query parameters.
   - Ensure `_includes/translation-feedback.html` displays localized translation-unavailable feedback consistently.

5. **Validation and release readiness**
   - Execute `bundle exec jekyll build` as mandatory site-affecting build gate.
   - Run full route/navigation/fallback checklist from `quickstart.md` against FR/SC matrix.
   - Confirm no out-of-scope sections were changed (FR-014).

## Post-Design Constitution Re-check

- [x] English-only implementation remains satisfied (multilingual text limited to visitor-facing content).
- [x] Jekyll-first compliance remains intact (front matter, content routes, `_data`, `_includes`, `_layouts`, Polyglot-driven locale behavior).
- [x] Structural conventions preserved; only conventional Jekyll files are added.
- [x] Build validation remains explicit and mandatory before completion.
- [x] Scope stays traceable to this feature’s home/posts/switch/fallback surfaces.

**Gate Result (post-Phase 1)**: PASS

## Complexity Tracking

No constitution violations or complexity exemptions are required for this feature.
