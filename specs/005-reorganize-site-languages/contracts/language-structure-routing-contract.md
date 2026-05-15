# Contract: Language Structure Migration and Route Continuity

## Scope

Defines required behavior for moving bilingual source content to `site/en` and `site/es` while preserving user-facing routes, navigation correctness, and rollback readiness.

## 1. Source Structure Contract

### Required source directories

- `site/en` contains in-scope English content.
- `site/es` contains in-scope Spanish content.

### Required rules

- Every migrated content item must live under exactly one language root.
- New bilingual content must be created only in the corresponding `site/{lang}` subtree.
- Out-of-scope folders must be explicitly documented and left unchanged.

## 2. Jekyll Configuration Contract

Implementation must align with standard Jekyll behavior:

- `_config.yml` must include deterministic rules so content under `site/en` and `site/es` is rendered.
- Front matter (`lang`, `permalink`, `translation_key`) remains authoritative for language pairing and route stability.
- Any non-default structural behavior must be documented with rationale and rollback impact.

## 3. Public Route Continuity Contract

### Canonical core routes (must remain reachable)

- EN: `/`, `/about/`, `/posts/`
- ES: `/es/`, `/es/about/`, `/es/posts/`

### Route continuity rules

- Existing high-priority public URLs must remain reachable either as direct routes or documented redirects.
- No route collisions are allowed between EN and ES variants.
- Legacy URLs marked as deprecated require explicit approval and documentation.

## 4. Navigation and Language Switch Contract

- Masthead and other core navigation surfaces must resolve to valid EN/ES destinations after migration.
- Language switch behavior must resolve to valid counterpart or documented fallback.
- No core journey (`home -> posts -> post detail -> language switch`) may end in broken navigation.

## 5. Validation Gate Contract

Before completion, all checks below are mandatory:

1. Clean build passes:

   ```bash
   bundle exec jekyll build
   ```

2. Core route verification in generated output for EN and ES surfaces.
3. Broken link / missing asset / orphan page checks for migrated content.
4. Production navigation validation:

   ```bash
   python3 scripts/validate_production_navigation.py --base-url "https://jblueprint.dev"
   ```

Release is blocked if critical route or navigation checks fail.

## 6. Rollback Contract

### Required checkpoints

- Checkpoint A: pre-migration baseline.
- Checkpoint B: post-move pre-release validation snapshot.

### Mandatory rollback triggers

- Build fails after migration and cannot be fixed within release window.
- Critical core routes are unreachable.
- Language switching produces invalid destinations in core journeys.

### Minimum rollback actions

1. Restore pre-migration content and config from the latest safe checkpoint.
2. Rebuild locally (`bundle exec jekyll build`).
3. Re-run critical navigation validation.
4. Confirm canonical route availability before closing rollback.

