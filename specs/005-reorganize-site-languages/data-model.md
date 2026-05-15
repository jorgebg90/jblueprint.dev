# Data Model: Reorganize Site Language Structure

## Entity: LanguageSection

Top-level language partition under `site/`.

### Fields

- `code` (enum: `en` | `es`, required): Language identifier.
- `source_root` (string, required): Content root path (`site/en` or `site/es`).
- `canonical_prefix` (string, required): Public route prefix (`/` for EN, `/es/` for ES).
- `status` (enum: `planned` | `migrated` | `validated`, required): Migration lifecycle status.

### Validation Rules

- Both `en` and `es` sections must exist.
- `source_root` must be unique per language.
- `canonical_prefix` mappings must be deterministic and non-overlapping.

## Entity: ContentItem

A page or post included in feature migration scope.

### Fields

- `id` (string, required): Stable identifier (e.g., translation key or path key).
- `content_type` (enum: `page` | `post`, required).
- `lang` (enum: `en` | `es`, required).
- `source_path` (string, required): Current repository path.
- `target_path` (string, required): Target path under `site/{lang}`.
- `current_permalink` (string, required): Existing public route.
- `target_permalink` (string, required): Expected public route post-migration.
- `translation_key` (string, optional): Pairing key for bilingual variants.
- `migration_state` (enum: `pending` | `moved` | `validated` | `rolled-back`, required).

### Validation Rules

- Every in-scope item must have exactly one target path.
- `current_permalink` and `target_permalink` must be identical for continuity-sensitive routes unless documented in route mapping.
- `lang` must match destination section (`site/en` or `site/es`).

## Entity: RouteMapping

Contract artifact that tracks legacy-to-current route continuity.

### Fields

- `old_route` (string, required): Previously published route.
- `new_route` (string, required): Route after migration.
- `strategy` (enum: `direct-serve` | `redirect` | `deprecated`, required).
- `priority` (enum: `critical` | `high` | `normal`, required).
- `verified` (boolean, required): Validation status.

### Validation Rules

- All `critical` and `high` routes must be `verified=true` before release.
- `strategy=deprecated` requires explicit approval and documentation.
- No two mappings may produce conflicting resolutions for the same `old_route`.

## Entity: NavigationTarget

User-visible destination from masthead, language switcher, and index links.

### Fields

- `name` (string, required): Logical target (`home`, `posts`, `about`, `post-detail`).
- `lang` (enum: `en` | `es`, required).
- `url` (string, required).
- `source` (enum: `navigation-data` | `layout` | `content-link` | `switcher`, required).
- `is_reachable` (boolean, required).

### Validation Rules

- Every target must resolve to HTTP 200 in build output or production checks.
- Language switch targets must resolve to valid counterpart or documented fallback.

## Entity: ValidationRun

Execution record for migration quality gates.

### Fields

- `id` (string, required): Run identifier.
- `phase` (enum: `pre-move` | `post-move` | `pre-release`, required).
- `build_passed` (boolean, required).
- `broken_links_count` (integer >= 0, required).
- `missing_assets_count` (integer >= 0, required).
- `orphaned_pages_count` (integer >= 0, required).
- `navigation_contract_passed` (boolean, required).
- `executed_at` (datetime, required).

### Validation Rules

- `build_passed` must be true in `post-move` and `pre-release` phases.
- Critical release gate requires `broken_links_count=0` for core journeys.

## Entity: RollbackCheckpoint

Known-good restoration point for migration safety.

### Fields

- `checkpoint_id` (string, required): Tag/commit/checkpoint identifier.
- `phase_boundary` (enum: `before-move` | `after-move-before-release` | `after-release`, required).
- `restore_steps` (array of string, required).
- `trigger_conditions` (array of string, required): Conditions that mandate rollback.
- `verified_restore` (boolean, required).

### Validation Rules

- At least one checkpoint must exist before content relocation.
- Rollback steps must include config + content path restoration and rebuild verification.

