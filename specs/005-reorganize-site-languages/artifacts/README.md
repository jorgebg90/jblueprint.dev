# Feature 005 Migration Artifacts

This folder stores implementation evidence for `005-reorganize-site-languages`.

## Structure

- `content-inventory.csv`: In-scope EN/ES content inventory and migration state.
- `route-mapping.csv`: High-priority public route continuity contract and verification state.
- `validation/`: Build and navigation logs captured at each migration gate.
- `rollback/`: Rollback checkpoints and rollback drill evidence.
- `release-readiness.md`: Final pre-release gate checklist.
- `cleanup-manifest.md`: Record of removed legacy paths.

## Evidence Rules

- Keep logs and tables deterministic and append-only when possible.
- Do not mark migration gates as passed without attached logs.
- Keep route continuity decisions aligned with `docs/multilingual-redirects.md`.

