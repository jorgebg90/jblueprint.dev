# Feature Specification: Reorganize Site Language Structure

**Feature Branch**: `[005-reorganize-site-languages]`  
**Created**: 2026-05-10  
**Status**: Draft  
**Input**: User description: "Reorganizar el repositorio para separar contenido por idioma. Mover lo referente a inglés y español dentro de una estructura `site/en` y `site/es`. El usuario quiere mayor organización de la web con esta estructura."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Separate language content structure (Priority: P1)

As a site maintainer, I can store English and Spanish content in dedicated language paths so that the repository is easier to navigate and maintain.

**Why this priority**: This is the core scope of the feature and the direct user objective.

**Independent Test**: Move a representative set of pages/posts to `site/en` and `site/es`, run a full site build, and confirm both language sections render with the expected URLs and content.

**Acceptance Scenarios**:

1. **Given** existing bilingual content in mixed locations, **When** content is reorganized under `site/en` and `site/es`, **Then** all migrated files are grouped by language and remain discoverable in source control.
2. **Given** the reorganized structure, **When** maintainers add a new page in either language, **Then** there is one clear target location aligned with the language.

---

### User Story 2 - Preserve user-facing navigation and links (Priority: P2)

As a site visitor, I can still reach English and Spanish pages after the reorganization without encountering broken navigation or missing content.

**Why this priority**: Structural improvements must not degrade user experience.

**Independent Test**: Validate key entry points (home, language-specific listings, representative posts/pages) and verify no broken links or 404 regressions in migrated language sections.

**Acceptance Scenarios**:

1. **Given** existing public links to key pages, **When** the migration is applied, **Then** visitors can still access equivalent content with working internal navigation.
2. **Given** language switch links or menus, **When** a visitor changes language, **Then** the destination resolves correctly in the new language structure.

---

### User Story 3 - Safe build and deployment transition (Priority: P3)

As a site operator, I can build and publish the site after migration with predictable output and without unintended content omissions.

**Why this priority**: A successful release requires build stability after path changes.

**Independent Test**: Run a full production-equivalent build, compare generated outputs for core pages, and confirm no expected language content is missing.

**Acceptance Scenarios**:

1. **Given** the reorganized directory structure, **When** the site is built, **Then** language-specific content is included in generated output for both English and Spanish.
2. **Given** migration-related redirects or path mappings, **When** legacy paths are requested, **Then** users are routed to valid destinations where required by scope.

---

### Edge Cases

- Content items without an explicit language marker must be assigned a default language rule or excluded from migration with documented rationale.
- Files with identical slugs across languages must remain uniquely addressable to avoid route collisions.
- Existing absolute links, media references, and canonical URLs must remain valid after content relocation.
- Pagination, category/tag archives, and feed-like pages must continue to include the correct language-specific entries.
- Build output must not silently skip files because of changed include/exclude patterns tied to folder locations.

## Requirements *(mandatory)*

### Constitution Alignment *(mandatory)*

- **CA-001**: Any implementation notes, config keys, and code comments in scope MUST be in English.
- **CA-002**: Any behavior affecting Jekyll structure, front matter, rendering, or config MUST reference official Jekyll conventions.
- **CA-003**: If non-standard Jekyll structure/plugin behavior is required, the spec MUST include explicit justification and rollback impact.

### Functional Requirements

- **FR-001**: The repository MUST adopt a language-separated content structure using `site/en` for English and `site/es` for Spanish content in scope.
- **FR-002**: The migration MUST define and apply deterministic rules for relocating existing bilingual content into the target language directories.
- **FR-003**: The site MUST preserve access to key user journeys (home, post listings, post detail, about/profile pages, and language switching entry points) after migration.
- **FR-004**: The migration MUST include a route continuity strategy for previously published URLs, covering at minimum high-traffic or externally referenced pages.
- **FR-005**: The migration MUST prevent route collisions between language variants that share the same slug or title.
- **FR-006**: The build process MUST continue producing both language sections without missing expected content items.
- **FR-007**: Navigation elements that expose language-specific destinations MUST resolve to valid pages under the new structure.
- **FR-008**: The migration MUST define validation checks for broken links, missing assets, and orphaned pages introduced by path changes.
- **FR-009**: The migration MUST include a rollback procedure that can restore the prior structure if critical regressions are detected.
- **FR-010**: The feature scope MUST explicitly document out-of-scope content areas (if any) to avoid partial, ambiguous migration behavior.

### Key Entities *(include if feature involves data)*

- **Language Section**: A top-level logical content partition (`en` or `es`) that groups pages, posts, and navigation targets for one language.
- **Content Item**: A page or post with attributes such as language, slug, source path, destination path, and publication status.
- **Route Mapping**: A migration artifact that links old public paths to new public paths and indicates whether redirection is required.
- **Navigation Target**: Any internal link destination used by menus, language switchers, indexes, and contextual links.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of in-scope English and Spanish content items are relocated to the designated language directories with no unclassified items.
- **SC-002**: 0 critical broken links are found in core user journeys across both languages after migration validation.
- **SC-003**: 100% of previously defined high-priority public URLs remain reachable either directly or via intended redirection.
- **SC-004**: Full site build and publication checks complete successfully with both language sections present and no missing key pages.
- **SC-005**: At least 90% of sampled maintainers report that locating and updating language-specific content is easier after reorganization.

## Assumptions

- Existing bilingual content can be reliably identified from current structure and metadata.
- Only English and Spanish are in scope for this feature iteration.
- Existing visual design and theme behavior are unchanged unless required for route continuity.
- Legacy URLs that are low traffic and not externally referenced may be excluded from redirects if documented and approved.

## Risks & Constraints

- Jekyll collections, defaults, and include/exclude settings may depend on current folder paths and can unintentionally omit content after relocation.
- Front matter values tied to permalinks, language keys, or layout assumptions may require coordinated updates to avoid rendering regressions.
- Relative path usage in templates and content can introduce hidden link or asset breakage after file moves.
- Cached build artifacts may mask migration issues unless clean builds are used for validation.

## Migration & Build Considerations

- Define pre-migration inventory of all in-scope pages/posts, current URLs, and target language destinations.
- Apply migration in controlled phases (content move, config alignment, link updates, route continuity checks).
- Validate local and production-equivalent builds before release using clean build conditions.
- Compare generated outputs before and after migration for representative English/Spanish pages.
- Prepare rollback checkpoints so the prior content structure can be restored quickly if release blockers appear.
