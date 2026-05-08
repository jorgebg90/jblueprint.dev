<!--
Sync Impact Report
- Version change: 0.0.0 -> 1.0.0
- Modified principles:
  - Template Principle 1 -> I. English-Only Code and Comments
  - Template Principle 2 -> II. Jekyll-First Standards Compliance
  - Template Principle 3 -> III. Minimal, Conventional Structure
  - Template Principle 4 -> IV. Build Validation for Site-Affecting Changes
  - Template Principle 5 -> V. Traceable, Small-Scope Changes
- Added sections:
  - Project Constraints
  - Workflow & Quality Gates
- Removed sections:
  - None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
  - ✅ README.md
- Follow-up TODOs:
  - None
-->

# jblueprint.dev Constitution

## Core Principles

### I. English-Only Code and Comments
All source code, configuration keys, commit-facing code snippets, and code comments
MUST be written in English. User-facing blog content MAY be multilingual, but
implementation artifacts in the repository MUST remain English for maintainability.

Rationale: A single language for implementation reduces ambiguity and review risk.

### II. Jekyll-First Standards Compliance
Any change to structure, configuration, front matter, collections, layouts, or
plugins MUST align with official Jekyll documentation and default conventions unless
a documented exception is approved in the plan/spec.

Rationale: Convention-first decisions reduce breakage and ease upgrades.

### III. Minimal, Conventional Structure
The project MUST prefer standard Jekyll layout and file naming conventions (e.g.,
`_posts/YYYY-MM-DD-title.md`, valid YAML front matter, `_config.yml` settings).
Custom build logic, non-standard directories, or plugin additions MUST include clear
justification and rollback guidance.

Rationale: Simple, conventional structure keeps the blog easy to operate.

### IV. Build Validation for Site-Affecting Changes
For any change that can alter generated site output (content rendering, templates,
styles, config, plugins), contributors MUST run a local Jekyll build and confirm it
succeeds before completion.

Rationale: Build validation catches regressions before publishing.

### V. Traceable, Small-Scope Changes
Each change set MUST have a focused scope, a clear intent, and updated supporting
documentation when behavior or workflow changes. Large mixed changes MUST be split.

Rationale: Smaller, traceable changes improve review quality and rollback safety.

## Project Constraints

- The canonical static site generator is Jekyll.
- Dependency, theme, or plugin changes MUST stay compatible with the configured
  Jekyll/GitHub Pages workflow.
- Generated artifacts SHOULD NOT be manually edited when they can be regenerated.

## Workflow & Quality Gates

- Plans MUST include an explicit constitution check against all five principles.
- Specs MUST include requirements and acceptance criteria for Jekyll-convention
  compliance when site behavior is affected.
- Tasks MUST include validation steps for local build success when applicable.
- Pull request review MUST reject changes that violate English-only implementation
  language or Jekyll-first compliance.

## Governance

This constitution overrides conflicting local practices for this repository.

Amendment Procedure:
- Propose the amendment with rationale and impacted templates/docs.
- Obtain maintainer approval.
- Update dependent templates/docs in the same change when feasible.

Versioning Policy:
- MAJOR: Backward-incompatible governance changes or principle removals/redefinitions.
- MINOR: New principle/section or materially expanded mandatory guidance.
- PATCH: Clarifications, wording fixes, and non-semantic refinements.

Compliance Review:
- Every plan/spec/tasks update MUST include a constitution alignment check.
- Periodic review cadence is per meaningful process change, or at least quarterly.

**Version**: 1.0.0 | **Ratified**: 2026-05-08 | **Last Amended**: 2026-05-08
