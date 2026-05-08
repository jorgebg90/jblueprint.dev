---
layout: post
title: "How to Build a Blog Using Spec Driven Design"
date: 2026-05-08 12:00:00 +0200
categories: jekyll speckit design
lang: en
translation_key: how-to-spec-driven-design
permalink: /jekyll/speckit/2026/05/08/how-to-build-a-blog-with-spec-driven-design.html
---

Building a blog from scratch is one thing. Building it *well* with a clear, traceable methodology is another.

In this post, I'll walk you through the real implementation journey of **jblueprint.dev** using a **Spec Driven Design workflow** with [Speckit](https://github.com/speckit/speckit)—a framework that helps you move from feature ideas to working, validated code in a structured way.

## Why Spec Driven Design?

Before touching a single line of code, we took time to:
1. **Define what we wanted to build** (specification).
2. **Clarify ambiguities** with product decisions (clarification).
3. **Plan the technical approach** (implementation planning).
4. **Break work into ordered tasks** (task generation).
5. **Execute with validation** (implementation).

This approach reduces rework, ensures clarity, and creates a **living document trail** of decisions. Perfect for a blog where you want to explain your reasoning later.

## Project Context

- **Project**: `jblueprint.dev`
- **Stack**: Jekyll
- **Goal**: Add multilingual support (Spanish and English)
- **i18n Plugin**: [jekyll-polyglot](https://polyglot.untra.io/)

### Ground Rules

1. **English-only implementation**: All code and code comments are in English for maintainability.
2. **Jekyll-first compliance**: Follow official Jekyll conventions and documentation.
3. **Build validation**: Every site-affecting change requires a local `bundle exec jekyll build` check.

## The Workflow in 5 Steps

### Step 0: Foundation

We detected that the repository already had a Speckit structure (`.specify/` directory) and created a **project constitution** that formalized our principles:
- English-only implementation artifacts
- Jekyll-first compliance for any technical decisions
- Build validation for changes affecting site output

This constitution would guide every decision forward.

### Step 1: Specification & Clarification

Using `speckit.specify`, we created the first feature spec: **"Add Multilingual Support (Spanish and English)"**.

The spec defined:
- **User stories**: Reading in preferred language, switching language without losing context, maintaining bilingual content reliably.
- **Functional requirements**: URL strategy, language switching, fallback behavior, SEO.
- **Success criteria**: 100% of primary pages reachable in both languages, 95% successful language switches, zero broken links.

Then, using `speckit.clarify`, we resolved the **5 most critical product decisions**:

1. **URL strategy**: Default language no prefix (`/...`); Spanish with prefix (`/es/...`).
2. **Unsupported locale prefixes**: Redirect with HTTP `301` to default-locale equivalent.
3. **Missing translations**: Redirect with HTTP `302` + show feedback message.
4. **Language preference persistence**: Session-scoped only (resets in new browser session).
5. **SEO discoverability**: Require reciprocal `hreflang` tags and `x-default` on bilingual pages.

**Outcome**: A fully clarified specification, ready for technical planning.

### Step 2: Implementation Planning

Using `speckit.plan`, we generated design artifacts:
- `plan.md` — Overall strategy and phasing
- `research.md` — Technology deep-dives and Polyglot plugin details
- `data-model.md` — Localization data structures
- `contracts/multilingual-routing-contract.md` — Detailed URL and redirect rules
- `quickstart.md` — Validation checklist for developers

All artifacts enforced English-only comments and Jekyll-first thinking.

**Outcome**: A complete technical blueprint, testable and implementable.

### Step 3: Task Generation

Using `speckit.tasks`, we converted the plan into an **ordered backlog of 33 actionable tasks**:

- **Phase 1 (Setup)**: Install `jekyll-polyglot`, configure `Gemfile`, create locale registry.
- **Phase 2 (Foundational)**: Configure `_config.yml`, create multilingual layouts and includes, wire language switching and SEO.
- **Phase 3 (User Story 1)**: Create bilingual content (`index`, `about`, posts) and validate routes.
- **Phase 4 (User Story 2)**: Implement language switcher with fallback and feedback.
- **Phase 5 (User Story 3)**: Document editorial workflow for bilingual publishing.
- **Phase 6 (Polish)**: Final validation, rollback procedures, SEO checks.

Each task had:
- Clear file paths (Jekyll-first)
- Dependencies marked
- Parallelization hints
- Independent test criteria

**Outcome**: A dependency-ordered, parallelizable implementation plan.

### Step 4: Implementation

Using `speckit.implement`, we executed all 33 tasks:

**Key changes**:
- Added `jekyll-polyglot` to `Gemfile` and ran `bundle install`
- Configured multilingual locale routing in `_config.yml`
- Created shared includes for language switcher, SEO tags, and translation feedback
- Wrote session-based preference script in `assets/js/language-session.js`
- Created bilingual content: `index.markdown`, `about.markdown`, and a welcome post in both English and Spanish
- Documented redirect rules, content workflow, and rollback procedures

**Validation**:
- `bundle exec jekyll build` executed successfully
- Generated site includes bilingual routes: `/index.html`, `/es/index.html`, etc.
- `hreflang` tags validated on bilingual pages
- No broken internal links

**Outcome**: A fully functional, validated multilingual Jekyll blog.

### Step 5: Rollout

We committed all changes with a clean feature branch commit, ready to merge.

## Key Decisions Made

| Date | Decision | Status | Rationale |
|------|----------|--------|-----------|
| 2026-05-08 | Use Speckit framework | Accepted | Specification-first reduces rework |
| 2026-05-08 | Polyglot plugin | Accepted | Native Jekyll plugin, well-maintained |
| 2026-05-08 | Default lang no prefix | Accepted | Cleaner URLs for primary language |
| 2026-05-08 | 301 for unsupported locales | Accepted | Preserves SEO, avoids 404s |
| 2026-05-08 | 302 for missing translations | Accepted | Temporary redirect allows future translation |
| 2026-05-08 | Session-scoped preferences | Accepted | Respects user privacy, simpler than cookies |
| 2026-05-08 | hreflang + x-default | Accepted | Proper SEO and discoverability for bilingual content |
| 2026-05-08 | Google Analytics | Deferred | Planned for a future feature |

## What We Didn't Do (Non-Goals)

- Add more than two languages in this release
- Redesign the theme unrelated to language support
- Rewrite all historical content immediately
- Use non-Jekyll build systems or runtime services

Keeping scope tight allowed us to deliver quickly and validate thoroughly.

## Key Artifacts

All of our work is documented and traceable:
- **Specification**: `specs/001-add-multilingual-support/spec.md`
- **Plan**: `specs/001-add-multilingual-support/plan.md`
- **Tasks**: `specs/001-add-multilingual-support/tasks.md`
- **Contracts**: `specs/001-add-multilingual-support/contracts/multilingual-routing-contract.md`
- **Operational Guides**: `docs/multilingual-*.md` (workflow, redirects, rollback)

## Lessons Learned

1. **Clarification upfront saves implementation time**: By asking five high-impact questions *before* coding, we avoided rework and conflicting decisions.

2. **Dependency ordering matters**: Breaking work into ordered phases (Setup → Foundational → User Stories) made parallelization safe and reduced blockers.

3. **Specification documents are living artifacts**: They serve dual purpose: design guide *and* future blog post content.

4. **Jekyll conventions are your friend**: Staying true to Jekyll's structure made the implementation straightforward and maintainable.

5. **Build validation is non-negotiable**: Running `bundle exec jekyll build` after every major change caught issues early.

## Next Steps

- **Monitor in production**: Watch for any routing or SEO issues.
- **Gather user feedback**: See if the language switcher UX works well.
- **Plan future improvements**: Google Analytics integration, additional languages, translation management tools.

## Try It Yourself

If you're building a Jekyll blog and considering multilingual support, follow this same workflow:

1. Write a clear spec (what problems are you solving?).
2. Clarify key decisions with stakeholders.
3. Plan the technical approach (layouts, data, configs).
4. Break into ordered tasks with test criteria.
5. Implement and validate methodically.

The result? A well-reasoned, traceable, and maintainable feature—plus a narrative you can share with your audience.

---

**This post is part of a series on building and maintaining jblueprint.dev using modern specification and design practices.**

