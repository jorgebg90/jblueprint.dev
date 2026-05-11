# Quickstart: Reorganize Site Language Structure

## Prerequisites

- Ruby/Bundler environment is available.
- Dependencies are installed (`bundle install`).
- Working branch contains feature `005-reorganize-site-languages` planning artifacts.

## Migration Strategy (Phased)

### Phase 1 — Inventory and Mapping

1. Build inventory of in-scope EN/ES pages and posts.
2. Record current source paths and public routes.
3. Define deterministic target paths under `site/en` and `site/es`.
4. Create route mapping table for high-priority URLs and legacy references.

### Phase 2 — Structure and Configuration Alignment

1. Create language roots under `site/en` and `site/es`.
2. Move in-scope bilingual content into language roots.
3. Update `_config.yml` and related Jekyll settings so moved content is still rendered.
4. Keep canonical public permalinks stable to preserve continuity.
5. Update navigation/config references to point to valid language destinations.

### Phase 3 — Continuity and Validation

1. Run clean local build:

   ```bash
   bundle exec jekyll build
   ```

2. Verify canonical routes in generated output:
   - `/`, `/about/`, `/posts/`
   - `/es/`, `/es/about/`, `/es/posts/`
3. Validate route continuity map (legacy/high-priority URLs).
4. Validate language switch and internal navigation flows for EN/ES.
5. Verify no critical broken links, missing assets, or orphaned pages in migrated scope.

### Phase 4 — Release Readiness and Rollback Preparedness

1. Execute production navigation check:

   ```bash
   python3 scripts/validate_production_navigation.py --base-url "https://jblueprint.dev"
   ```

2. Confirm all mandatory contracts are satisfied.
3. Preserve rollback checkpoint identifiers in release notes.

## Rollback Procedure

Trigger rollback if any critical regression appears (build failure, core route breakage, invalid language switching).

1. Restore last known-good checkpoint (pre-migration or post-move pre-release snapshot).
2. Restore `_config.yml` and moved content paths to checkpoint state.
3. Re-run build:

   ```bash
   bundle exec jekyll build
   ```

4. Re-run critical navigation validation command.
5. Confirm canonical routes are reachable before closing incident.

## Completion Criteria

- Source organization is bilingual and language-scoped under `site/en` and `site/es`.
- Canonical EN/ES routes remain reachable.
- Build and navigation validations pass.
- Rollback checkpoints and execution steps are documented and testable.

