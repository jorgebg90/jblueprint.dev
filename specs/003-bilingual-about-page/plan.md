# Implementation Plan: Bilingual About Page and Localized Navigation

**Branch**: `003-bilingual-about-page` | **Date**: 2026-05-09 | **Spec**: [`specs/003-bilingual-about-page/spec.md`](./spec.md)
**Input**: Feature specification from `/specs/003-bilingual-about-page/spec.md`

## Summary

Implement a bilingual About/Acerca experience for the existing Jekyll + Minimal Mistakes + Polyglot site by: (1) establishing foundational bilingual schema/plumbing for navigation literals and About translation pairing, (2) replacing placeholder About content with profile-first bilingual content, (3) adding circular profile-image presentation with graceful fallback behavior, and (4) localizing visible navigation labels using data-driven EN/ES literals with English fallback when a translation is missing. The implementation preserves current routing conventions and translation pairing semantics (`translation_key`) and explicitly enforces FR-011 fallback redirects for direct URL access to a missing About/Acerca variant (in addition to About language-switch flows).

## Technical Context

**Language/Version**: Ruby 3.x runtime with Jekyll `~> 4.4.1`; Liquid templates; Markdown content with YAML front matter  
**Primary Dependencies**: `jekyll`, `minimal-mistakes-jekyll`, `jekyll-polyglot`, `jekyll-feed`  
**Storage**: File-based static content and data (`.markdown`, `_data/*.yml`, `_includes/*.html`, `assets/*`)  
**Testing**: Manual acceptance checks + local build validation via `bundle exec jekyll build` (`--trace` on final verification)  
**Target Platform**: Static site generation for GitHub Pages-compatible Jekyll workflow  
**Project Type**: Jekyll multilingual blog (content + theme customization)  
**Performance Goals**: No measurable regression in page render behavior; language switch and nav labels resolve on first render; preserve existing static build time profile  
**Constraints**: Must keep Jekyll/Polyglot conventions, no new plugin additions, no non-standard directory structure, implementation artifacts in English only, fallback behavior must avoid empty labels and broken About routes  
**Scale/Scope**: Single feature affecting About pages (`about.markdown`, `es/about.markdown`), navigation data (`_data/navigation.yml`), masthead include (`_includes/masthead.html`), and profile presentation assets/scripts (`assets/css/main.scss`, `assets/images/about-profile.jpg`, `assets/js/language-session.js`)

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
specs/003-bilingual-about-page/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── about-page-front-matter.md
│   └── navigation-localization-interface.md
└── tasks.md
```

### Source Code (repository root)

```text
.
├── _config.yml
├── _data/
│   ├── navigation.yml
│   └── ui-text.yml
├── _includes/
│   ├── masthead.html
│   └── language-switcher.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── es/
│   └── about.markdown
└── about.markdown
```

**Structure Decision**: Keep the existing single Jekyll project structure and implement changes only in current content/data/include/assets paths. No new app modules or non-conventional folders are introduced.

## Phase 0: Research Decisions (Completed)

Research outcomes are documented in [`research.md`](./research.md):

1. Preserve translation pairing with `translation_key: about` and enforce redirect fallback to available variant when one locale page is missing.
2. Localize visible navigation labels using data-driven bilingual keys resolved in `_includes/masthead.html`.
3. Render profile image as circular via class-based CSS (`border-radius: 50%`) rather than content-inline styling.
4. Apply English (`en`) fallback for any missing navigation literal translation.
5. Keep EN/ES professional summaries semantically equivalent (not necessarily literal).

All previously identified clarifications are resolved.

## Phase 1: Design & Contracts (Completed)

- Data entities and validation rules documented in [`data-model.md`](./data-model.md):
  - `AboutProfile`
  - `NavigationLiteral`
  - `TranslationPair`
- Interface contracts documented in [`contracts/`](./contracts/):
  - `about-page-front-matter.md`
  - `navigation-localization-interface.md`
- Execution and validation flow documented in [`quickstart.md`](./quickstart.md).
- Agent context reference in `.github/copilot-instructions.md` points to `specs/003-bilingual-about-page/plan.md`.

## Implementation Strategy (Phase 2 Planning Input)

1. **Foundational scope (schema/plumbing)**
   - Refactor `_data/navigation.yml` from `title` to `labels.en`/`labels.es` shape.
   - Update `_includes/masthead.html` to resolve literals by active language and enforce `en` fallback for missing translations (FR-008).
   - Keep About front matter parity (`layout`, `lang`, `translation_key`, `permalink`) to preserve translation pairing and route conventions.
   - Implement and verify FR-011 redirect fallback for missing About variants in both entry paths:
     - language switch from existing About/Acerca counterpart;
     - direct URL access to the missing locale route (e.g., request to missing `/es/about/` or `/about/` redirects to the available equivalent variant).

2. **US2 scope (content/validation)**
   - Replace default placeholder content in EN/ES About files with profile-first bilingual summaries.
   - Add/confirm profile image under `assets/images/` and apply reusable circular styling for responsive readability.
   - Ensure profile area remains readable with localized image-fallback text when image loading fails (FR-012), using the client-side handling path in `assets/js/language-session.js`.
   - Validate bilingual summary readability across mobile and desktop viewports, including asymmetric text lengths (FR-013).

3. **Final build and acceptance verification**
   - Run `bundle exec jekyll build --trace`.
   - Execute checklist from `quickstart.md` against FR-001..FR-013 and SC-001..SC-005.

## Post-Design Constitution Re-check

- [x] English-only implementation remains satisfied (bilingual text only in user-facing content).
- [x] Jekyll-first conventions maintained (front matter, data files, includes, Polyglot routing).
- [x] No non-standard structural complexity introduced.
- [x] Build validation explicitly required before completion.
- [x] Scope remains focused and traceable to this feature.

**Gate Result (post-Phase 1)**: PASS

## Complexity Tracking

No constitution violations or complexity exemptions are required for this feature.
