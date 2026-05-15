# Implementation Plan: Reorganize Site Language Structure

**Branch**: `develop` | **Date**: 2026-05-10 | **Spec**: `specs/005-reorganize-site-languages/spec.md`
**Input**: Feature specification from `/specs/005-reorganize-site-languages/spec.md`

## Summary

Reorganize bilingual content into `site/en` and `site/es` using a phased migration that preserves public routes, maintains Jekyll convention compatibility, and adds explicit build/navigation validation and rollback checkpoints. The implementation keeps canonical user routes (`/`, `/posts/`, `/about/`, `/es/...`) stable while changing source layout and Jekyll configuration to a language-first authoring structure.

## Technical Context

**Language/Version**: Markdown + Liquid templates on Jekyll `~> 4.4.1`; Ruby/Bundler toolchain; Python 3 for navigation validator script.  
**Primary Dependencies**: `jekyll`, `minimal-mistakes-jekyll`, `jekyll-feed`, `jekyll-include-cache`, `jekyll-remote-theme`.  
**Storage**: N/A (static repository content and generated static output).  
**Testing**: `bundle exec jekyll build`, route verification against generated `_site`, and production navigation script `python3 scripts/validate_production_navigation.py`.  
**Target Platform**: Static hosting with GitHub Pages-compatible Jekyll behavior (production domain `https://jblueprint.dev`).
**Project Type**: Static multilingual blog (single Jekyll site).  
**Performance Goals**: No regression in route reachability for core bilingual journeys; no increase in broken-link count (target: zero critical).  
**Constraints**: English-only implementation artifacts, Jekyll-first conventions, deterministic language mapping, phased migration with rollback points, no uncontrolled plugin sprawl.  
**Scale/Scope**: English + Spanish sections, core pages (`home/about/posts`) and in-scope posts; migration artifacts limited to feature `005-reorganize-site-languages`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] English-only implementation: all planned code/config keys/comments are in English.
- [x] Jekyll-first compliance: migration uses standard front matter, permalink rules, collections/pages conventions, and `_config.yml` declarations.
- [x] Conventional structure: structural changes are limited to language folders and documented config alignment; no unexplained custom runtime behavior.
- [x] Build validation: plan includes local `bundle exec jekyll build` and navigation validation gates before completion.
- [x] Change scope: migration is split into inventory, move/config alignment, route continuity validation, and rollback-ready release steps.

**Gate Status (Pre-Phase 0)**: PASS

**Gate Status (Post-Phase 1 Design Re-check)**: PASS

## Project Structure

### Documentation (this feature)

```text
specs/005-reorganize-site-languages/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── language-structure-routing-contract.md
└── tasks.md             # Created later by /speckit.tasks
```

### Source Code (repository root)

```text
_config.yml
_data/navigation.yml
_includes/
_layouts/
_posts/                       # Legacy source path before migration
site/
├── en/
│   ├── index.markdown
│   ├── about.markdown
│   ├── posts/index.markdown
│   └── _posts/               # Target EN content source in this feature
└── es/
    ├── index.markdown
    ├── about.markdown
    ├── posts/index.markdown
    └── _posts/               # Target ES content source in this feature
scripts/
└── validate_production_navigation.py
```

**Structure Decision**: Use a single Jekyll project with language-first content directories under `site/en` and `site/es`, while preserving public permalink contract via front matter/config mappings and explicit route continuity rules.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
