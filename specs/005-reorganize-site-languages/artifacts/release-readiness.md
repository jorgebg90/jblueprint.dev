# Release Readiness Gates — Feature 005

## Mandatory gates

- [x] Clean build succeeds (`bundle exec jekyll build`).
- [x] Local canonical route validation succeeds (`python3 scripts/validate_local_routes.py --site-dir _site`).
- [x] Core language navigation (home, about, posts, representative post) works in local output.
- [x] Route continuity table updated for all critical/high routes.
- [x] Rollback checkpoint B documented with explicit restore commands.
- [x] Rollback drill documented and executable.
- [ ] Production navigation validation fully green.

## Gate notes

- Local migration gates are passing.
- Production still serves pre-release content for two new canonical Minimal Mistakes routes; this is expected before deployment.
- Release should proceed only after deploy + re-run of production validator confirms HTTP 200 on all canonical routes.

