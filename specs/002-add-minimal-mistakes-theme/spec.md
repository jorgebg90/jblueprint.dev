# Feature Specification: Add Minimal Mistakes Theme

**Feature Branch**: `[002-add-minimal-mistakes-theme]`  
**Created**: 2026-05-08  
**Status**: Draft  
**Input**: User description: "Create a new Speckit feature specification in /Users/jorgebg/development/repo/blog/jblueprint.dev for adding the Jekyll theme Minimal Mistakes (https://github.com/mmistakes/minimal-mistakes). Requirements: 1) This should be a NEW spec (next feature number after existing 001). 2) Must explicitly ensure compatibility with the already implemented multilingual support (en/es) and Polyglot routing behavior. 3) Follow project constitution constraints (English-only implementation artifacts, Jekyll-first compliance). 4) Generate/update artifacts according to Speckit conventions, including spec.md and quality checklist. 5) Keep scope clear with user stories, functional requirements, success criteria, assumptions, and non-goals." 

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read Localized Content with New Theme (Priority: P1)

As a bilingual visitor, I can read English and Spanish pages with the new theme without losing the current multilingual routing behavior.

**Why this priority**: The primary value is visual/theme improvement without breaking access to localized content.

**Independent Test**: Can be fully tested by opening the same page/post in English and Spanish and confirming each URL still resolves correctly and renders in the selected language.

**Acceptance Scenarios**:

1. **Given** a published page available in both languages, **When** a visitor opens the default-language URL and the `/es/` URL, **Then** each page renders with the new theme and the expected language content.
2. **Given** a visitor navigates through posts and static pages, **When** the visitor stays in one locale, **Then** links keep the expected locale path behavior (default locale without prefix, Spanish with `/es/` prefix).

---

### User Story 2 - Switch Language from Themed Pages (Priority: P2)

As a visitor, I can switch between English and Spanish from themed pages and land on the equivalent localized destination when available.

**Why this priority**: Language continuity is core to usability for bilingual readers and must remain intact after theme adoption.

**Independent Test**: Can be tested by using the language switcher on multiple page types and validating equivalent-page behavior and fallback behavior.

**Acceptance Scenarios**:

1. **Given** a visitor is on a themed page with both translations, **When** the visitor switches language, **Then** the equivalent localized page opens with the same content context.
2. **Given** a visitor is on a page missing translation in the target language, **When** the visitor switches language or requests that locale URL, **Then** the existing fallback behavior remains unchanged and the visitor stays on a valid page.

---

### User Story 3 - Maintain Content Workflow Under New Theme (Priority: P3)

As a site maintainer, I can continue publishing and validating bilingual content using Jekyll conventions after introducing the new theme.

**Why this priority**: Sustainable operations require that editorial and release workflows remain predictable.

**Independent Test**: Can be tested by adding or editing sample bilingual content, running normal site validation, and confirming no workflow regressions.

**Acceptance Scenarios**:

1. **Given** a maintainer updates bilingual content, **When** the site is built for verification, **Then** output remains valid and multilingual routes continue to work.
2. **Given** a maintainer follows the documented publishing steps, **When** changes are reviewed, **Then** no non-English implementation artifacts are introduced and Jekyll-first structure is preserved.
    3. **Given** a maintainer adds a new post while using the themed workflow, **When** the post is created in `_posts/<year>/<month>/<day>/` using standard Jekyll naming, **Then** temporal listing remains correct and localized publishing flow remains unchanged.

---

### Edge Cases

- Theme-provided navigation or breadcrumbs generate links that accidentally drop locale context.
- Theme configuration defaults conflict with existing Polyglot locale settings.
- A page is available only in one language and must continue to avoid false alternate links.
- Language switch UI placement changes with the new theme and must remain visible and usable on key pages.
- Themed templates introduce metadata differences that could break existing multilingual discoverability behavior.

## Requirements *(mandatory)*

### Constitution Alignment *(mandatory)*

- **CA-001**: Any implementation notes, config keys, and code comments in scope MUST be in English.
- **CA-002**: Any behavior affecting Jekyll structure, front matter, rendering, or config MUST reference official Jekyll conventions.
- **CA-003**: If non-standard Jekyll structure/plugin behavior is required, the spec MUST include explicit justification and rollback impact.
- **CA-004**: Site-affecting changes MUST include local build validation before completion.

### Functional Requirements

- **FR-001**: The site MUST adopt Minimal Mistakes as the active visual theme for in-scope pages and posts.
- **FR-001a**: The base font size MUST be reduced from MM defaults to produce a more compact reading experience: 14px (mobile), 16px (medium), 17px (large), applied via CSS html overrides after MM imports.
- **FR-002**: Existing multilingual support MUST remain functional for exactly two locales in scope (`en` and `es`).
- **FR-003**: Existing Polyglot routing behavior MUST remain unchanged: default locale routes without prefix and Spanish routes with `/es/` prefix.
- **FR-004**: The language switch interaction MUST remain available on primary page types and continue routing to equivalent localized pages when translations exist. The EN/ES toggle MUST be integrated directly into the MM masthead navigation bar, styled consistently with MM's built-in toggle buttons (same visual weight as the search toggle).
- **FR-013**: The site MUST enable MM's built-in Lunr search, rendering a magnifying-glass icon toggle in the masthead navigation bar alongside the EN/ES language switcher.
- **FR-005**: Existing fallback behavior for missing translations and unsupported locale paths MUST remain functionally equivalent to the current site behavior.
- **FR-006**: Theme migration MUST preserve current localized content discoverability behavior (including language relationship metadata behavior already in use).
- **FR-007**: Theme-related content and configuration changes MUST preserve compatibility with current bilingual editorial workflow.
- **FR-008**: The feature MUST not require replacing Jekyll as the build system or introducing non-Jekyll runtime services.
- **FR-009**: Theme integration documentation and implementation artifacts introduced by this feature MUST be written in English.
- **FR-010**: The feature MUST define a rollback path that restores the prior theme behavior without removing multilingual content or routing capabilities.
- **FR-011**: The feature MUST include a new blog post documenting Minimal Mistakes installation and project-specific integration steps.
- **FR-012**: The feature MUST organize blog posts for temporal listing under nested `_posts/<month>/<day>/` directories while preserving Jekyll compatibility and bilingual routing behavior.

### Key Entities *(include if feature involves data)*

- **Theme Configuration Profile**: Represents site-level theme settings that control layout, navigation, and presentation.
- **Localized Route Variant**: Represents language-specific route outputs for a single logical page (`default` and `/es/` variant behavior).
- **Language Navigation Control**: Represents user-facing controls used to move between localized variants.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of in-scope pages and posts render with the new theme styling in release verification.
- **SC-002**: 100% of sampled bilingual pages in release scope remain reachable in both language routes with expected locale path behavior.
- **SC-003**: At least 95% of language-switch attempts on translated pages land on the equivalent page in one interaction. The EN/ES toggle MUST be visible in the masthead on all primary page types without layout breaks.
- **SC-009**: The MM built-in search magnifying-glass icon MUST appear in the masthead and the search overlay MUST activate on click.
- **SC-004**: 100% of release verification builds complete successfully after theme adoption.
- **SC-005**: 0 critical regressions are reported for existing multilingual fallback behavior during acceptance validation.
- **SC-006**: 100% of newly added implementation artifacts for this feature pass English-only review checks.
- **SC-007**: Exactly 1 new blog post is published in scope that documents Minimal Mistakes installation and integration steps for this project.
- **SC-008**: 100% of newly created posts in scope follow `_posts/<year>/<month>/<day>/` organization and appear in expected chronological listings.

## Assumptions

- The current multilingual implementation (English default, Spanish `/es/` routing) is the baseline contract that must be preserved.
- Existing Polyglot plugin behavior remains part of the site architecture for this feature.
- Content scope is limited to theme migration compatibility for current pages/posts, not full content redesign.
- Existing localized content files remain source-of-truth and are not restructured beyond what is needed for theme compatibility and required temporal `_posts` organization.
- The project will continue using standard Jekyll build and publishing workflow.

## Non-Goals

- Adding support for additional languages beyond English and Spanish.
- Redefining multilingual URL strategy or replacing Polyglot routing behavior.
- Rewriting historical content solely for style consistency.
- Introducing custom runtime infrastructure outside normal Jekyll static site generation.
- Delivering unrelated SEO, analytics, or content strategy initiatives as part of this feature.

