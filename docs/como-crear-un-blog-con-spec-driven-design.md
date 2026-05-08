---
title: "Como crear un blog con Spec Driven Design"
status: "working-draft"
feature: "001-add-multilingual-support"
created_at: "2026-05-08"
last_updated: "2026-05-08"
---

# Como crear un blog con Spec Driven Design

> Living document to transform into an early blog post.

## Objective
Document the real implementation journey of this blog using a Spec Driven Design workflow, from constitution setup to multilingual rollout.

## Project Context
- Project: `jblueprint.dev`
- Stack: `Jekyll`
- Multilingual target: `Spanish (es)` and `English (en)`
- i18n plugin candidate: `jekyll-polyglot`

## Ground Rules
- Implementation artifacts (code and code comments) are written in English.
- Technical decisions follow official Jekyll documentation and conventions.
- Site-affecting changes require local build validation.

## Timeline

### Step 0 - Foundation (completed)
- Speckit structure detected in the repository (`.specify/`, prompts, templates).
- Project constitution aligned to:
  - English-only implementation artifacts.
  - Jekyll-first compliance.
  - Build validation for site-affecting changes.

### Step 1 - First feature spec (completed)
- Feature initialized: `001-add-multilingual-support`.
- Specification created: `specs/001-add-multilingual-support/spec.md`.
- Scope defined:
  - Two languages in this release (`en`, `es`).
  - Language switch with context preservation.
  - Editorial workflow for bilingual content.
- Clarification phase started to remove ambiguity before planning.
- Clarification progress:
  - URL strategy decided: default language without prefix, Spanish with `/es/` prefix.
  - Unsupported locale prefixes decision: redirect to default-locale equivalent URL with HTTP `301`.
  - Missing translation on locale-prefixed URL: redirect with HTTP `302` to default-locale equivalent and show feedback.
  - Language preference persistence: session-scoped only (resets in a new browser session).
  - SEO contract decided: bilingual pages require reciprocal `hreflang` (`en`, `es`) plus `x-default`; single-language pages publish only available languages.
- Clarification session closed after 5/5 high-impact decisions.

### Step 2 - Implementation planning (completed)
- Planning workflow executed with `speckit.plan`.
- Design artifacts generated for implementation:
  - `specs/001-add-multilingual-support/plan.md`
  - `specs/001-add-multilingual-support/research.md`
  - `specs/001-add-multilingual-support/data-model.md`
  - `specs/001-add-multilingual-support/contracts/multilingual-routing-contract.md`
  - `specs/001-add-multilingual-support/quickstart.md`
- Agent context updated to point to current plan in `.github/copilot-instructions.md`.
- Constitution alignment revalidated during planning.

### Step 3 - Task generation (completed)
- Task workflow executed with `speckit.tasks`.
- Dependency-ordered implementation backlog generated in:
  - `specs/001-add-multilingual-support/tasks.md`
- Task plan summary:
  - Total tasks: 33
  - Parallelizable tasks: 14
  - Execution order: Setup -> Foundational -> US1 -> US2/US3 -> Polish
  - MVP slice: Phase 1 + Phase 2 + User Story 1

### Step 4 - Implementation (completed)
- Implementation workflow executed with `speckit.implement`.
- Task completion:
  - Completed tasks: `T001` to `T033` (33/33)
  - Pending tasks: 0
- Core implementation outputs:
  - Polyglot integration in `Gemfile`, `Gemfile.lock`, `_config.yml`
  - Localization data in `_data/locales.yml` and `_data/messages.yml`
  - Shared multilingual UI includes in `_includes/`
  - Session-based preference script in `assets/js/language-session.js`
  - Bilingual content for `index`, `about`, and welcome post
  - Operational docs: redirects, workflow, rollback

### Step 5 - Validation and rollout checks (completed)
- Build validation executed with `bundle exec jekyll build` (successful).
- Route checks confirmed bilingual output in generated site.
- SEO checks validated `hreflang` and `x-default` behavior per spec.
- Non-blocking note captured: Sass/Minima deprecation warnings observed.

## Decisions Log

| Date       | Decision | Status | Notes |
|------------|----------|--------|-------|
| 2026-05-08 | Use Speckit for feature lifecycle | Accepted | Specification-first flow |
| 2026-05-08 | First feature is multilingual support | Accepted | `001-add-multilingual-support` |
| 2026-05-08 | Use Polyglot plugin approach | Accepted | Confirmed in planning artifacts |
| 2026-05-08 | Canonical URL strategy | Accepted | Default language no prefix; `/es/` for Spanish |
| 2026-05-08 | Unsupported locale handling | Accepted | 301 redirect to default-locale equivalent URL |
| 2026-05-08 | Missing translation handling | Accepted | 302 redirect to default-locale equivalent + feedback |
| 2026-05-08 | Language preference persistence | Accepted | Session-scoped only; reset in a new browser session |
| 2026-05-08 | SEO language discoverability contract | Accepted | `hreflang` reciprocal + `x-default` on bilingual pages |
| 2026-05-08 | Google Analytics scope | Deferred | Free GA setup planned for a future feature |

## Artifacts
- Constitution memory: `.specify/memory/constitution.md`
- Active feature pointer: `.specify/feature.json`
- Feature spec: `specs/001-add-multilingual-support/spec.md`
- Plan: `specs/001-add-multilingual-support/plan.md`
- Research: `specs/001-add-multilingual-support/research.md`
- Data model: `specs/001-add-multilingual-support/data-model.md`
- Contract: `specs/001-add-multilingual-support/contracts/multilingual-routing-contract.md`
- Quickstart: `specs/001-add-multilingual-support/quickstart.md`
- Tasks: `specs/001-add-multilingual-support/tasks.md`
- Implementation docs: `docs/multilingual-redirects.md`, `docs/multilingual-content-workflow.md`, `docs/multilingual-rollback.md`

## Next Updates
This file will be updated after every major Speckit stage:
1. Optional commit/release notes for this feature branch
2. Future feature kickoff: Google Analytics integration







