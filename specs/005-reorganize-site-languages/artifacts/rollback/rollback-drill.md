# Rollback Drill — Checkpoint B

## Drill scope

- Checkpoint: `checkpoint-b-post-move-pre-release`
- Goal: verify that rollback commands are executable and that rebuild + route validation gates are reproducible.

## Drill steps executed

1. Verified checkpoint B restore command set is complete for config, includes, docs, and language roots.
2. Executed clean build:
   - `rm -rf _site .jekyll-cache`
   - `bundle exec jekyll build`
3. Executed continuity validation:
   - `python3 scripts/validate_local_routes.py --site-dir _site`

## Outcome

- Build: **PASS**
- Local route validation: **PASS**
- Rollback command set readiness: **PASS** (no missing paths detected)

## Follow-up

- Re-run production validator after deployment to close normal-priority route checks.

