# Implementation Plan: Blog Design Refinement

**Branch**: `005-reorganize-site-languages` | **Date**: 2026-05-11 | **Spec**: `specs/006-refine-blog-design/spec.md`
**Input**: Feature specification from `/specs/006-refine-blog-design/spec.md`

## Summary

Refine the visual presentation of Home (EN/ES), About (EN/ES), and 404 using CSS/SCSS and layout-layer adjustments only. The plan strengthens hierarchy (hero/profile/CTA), improves section separation, enforces WCAG AA contrast minimums, and introduces subtle microinteractions while preserving existing routes, current JavaScript behavior, Jekyll conventions, and current SEO/performance baseline.

## Technical Context

**Language/Version**: Jekyll 4.4.1 site stack with Liquid templates, HTML, and SCSS (`assets/css/main.scss`).  
**Primary Dependencies**: `minimal-mistakes-jekyll` theme styles/layouts, `jekyll`, `jekyll-feed`, `jekyll-include-cache`, `jekyll-remote-theme` (no new dependencies).  
**Storage**: N/A (static content and generated site output).  
**Testing**: Local build (`bundle exec jekyll build`), responsive manual review (mobile/desktop + 200% zoom), WCAG AA contrast verification for text and primary interactive controls, SEO/performance baseline comparison (no regression target).  
**Target Platform**: Static Jekyll site deployed with GitHub Pages-compatible behavior in modern desktop/mobile browsers.  
**Project Type**: Static multilingual blog (single Jekyll project).  
**Performance Goals**: No measurable regression versus current baseline for in-scope pages (Lighthouse/Core Web Vitals trend and page weight parity).  
**Constraints**: Presentation layer only (CSS/SCSS/layout visual updates); no route/permalink changes, no JS logic changes, no plugin/dependency additions; EN/ES parity in light/dark; minimum WCAG AA contrast.  
**Scale/Scope**: 5 page surfaces (Home EN/ES, About EN/ES, 404) across available light/dark contexts and mobile/desktop breakpoints.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] English-only implementation: all planned code/config keys/comments are in English.
- [x] Jekyll-first compliance: approach remains within standard Jekyll pages/layout/front matter and existing theme override mechanisms.
- [x] Conventional structure: no non-standard directory model or plugin addition; changes stay in existing layout/style files.
- [x] Build validation: plan includes local `bundle exec jekyll build` before completion.
- [x] Change scope: work is split into focused increments (home visual system, about visual system, 404 visual recovery, accessibility/perf validation).

**Gate Status (Pre-Phase 0)**: PASS

**Gate Status (Post-Phase 1 Design Re-check)**: PASS

## Project Structure

### Documentation (this feature)

```text
specs/006-refine-blog-design/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── visual-design-contract.md
└── tasks.md             # Created later by /speckit.tasks
```

### Source Code (repository root)

```text
assets/css/main.scss
_layouts/home.html
site/en/index.markdown
site/es/index.markdown
site/en/about.markdown
site/es/about.markdown
404.html
```

**Structure Decision**: Keep a single Jekyll project and implement all feature changes through existing style/layout/page files only, with no routing or script-layer modifications.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
