# Phase 0 Research: Reorganize Site Language Structure

## Decision 1: Use phased migration with explicit checkpoints

- **Decision**: Execute migration in four phases: (1) inventory and mapping, (2) content relocation and config alignment, (3) route/link validation, (4) release with rollback checkpoint.
- **Rationale**: Supports FR-002, FR-008, and FR-009 while reducing regression risk in a path-sensitive static site.
- **Alternatives considered**:
  - Big-bang directory move in one commit: rejected due to high risk of hidden link/config breakage.
  - Partial migration by content type only: rejected because it creates ambiguous source-of-truth locations.

## Decision 2: Keep public URL contract stable while changing source tree

- **Decision**: Preserve canonical public routes (`/`, `/about/`, `/posts/`, `/es/`, `/es/about/`, `/es/posts/`) through explicit permalink continuity and route mapping artifacts.
- **Rationale**: Meets FR-003 and FR-004 and avoids external link breakage during structural refactor.
- **Alternatives considered**:
  - Change public routes to include `/site/`: rejected because it breaks continuity and introduces avoidable SEO/navigation churn.
  - Redirect all legacy URLs to new deep paths: rejected because canonical routes can remain stable without extra redirect burden.

## Decision 3: Organize content by language under `site/en` and `site/es`

- **Decision**: Move in-scope bilingual pages/posts to language-scoped directories (`site/en`, `site/es`) and align Jekyll config so both sections are built deterministically.
- **Rationale**: Directly satisfies FR-001 and improves maintainability by making language ownership explicit.
- **Alternatives considered**:
  - Keep mixed root + `/es` model: rejected because it keeps bilingual content fragmented.
  - Introduce a third-party i18n plugin for folder abstraction: rejected to stay Jekyll-first and minimize plugin complexity.

## Decision 4: Make language resolution metadata-first and collision-safe

- **Decision**: Continue using `lang` and `translation_key` as authoritative metadata; define collision rules for identical slugs/titles across locales.
- **Rationale**: Satisfies FR-005 and edge-case requirements for unique addressability.
- **Alternatives considered**:
  - Infer language from path only: rejected because metadata is required for cross-page translation pairing.
  - Allow duplicate slug resolution by last-write-wins: rejected as non-deterministic and risky for route consistency.

## Decision 5: Validate with clean build + navigation checks before release

- **Decision**: Require clean local build (`bundle exec jekyll build`), representative route checks in generated output, and production navigation verification using `scripts/validate_production_navigation.py`.
- **Rationale**: Fulfills FR-006, FR-007, FR-008, and Constitution Principle IV.
- **Alternatives considered**:
  - Build-only validation without route checks: rejected because build success does not guarantee navigation correctness.
  - Manual spot checks only: rejected due to low repeatability.

## Decision 6: Define rollback as a first-class migration deliverable

- **Decision**: Keep rollback checkpoints per migration phase (git tags or equivalent), preserve pre-migration route map, and define critical-regression triggers for immediate revert.
- **Rationale**: Required by FR-009 and reduces incident recovery time.
- **Alternatives considered**:
  - Ad-hoc rollback via manual file restore: rejected as slow and error-prone.
  - No rollback unless deployment fails completely: rejected because navigation regressions can be partial but severe.

## Decision 7: Explicitly document out-of-scope areas

- **Decision**: Limit feature scope to bilingual site content organization, Jekyll config/path handling, and route continuity for defined key journeys; exclude unrelated theme redesign or new locale additions.
- **Rationale**: Satisfies FR-010 and Constitution Principle V on focused change scope.
- **Alternatives considered**:
  - Expand scope to include visual/navigation redesign: rejected as unrelated risk and timeline expansion.
  - Include future locale support now: rejected because current assumptions constrain scope to EN/ES.

