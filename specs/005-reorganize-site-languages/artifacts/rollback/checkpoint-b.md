# Rollback Checkpoint B — Post-Move Pre-Release Snapshot

- **Checkpoint ID**: `checkpoint-b-post-move-pre-release`
- **Phase boundary**: `after-move-before-release`
- **Created at**: 2026-05-10
- **Intent**: Restore stable language-first structure after migration work but before production rollout.

## Restore Commands

```bash
# 1) Restore content/config/includes to checkpoint B commit
git checkout <checkpoint-b-tag-or-commit> -- \
  _config.yml \
  _data/navigation.yml \
  _includes/masthead.html \
  _includes/language-switcher.html \
  _includes/hreflang-links.html \
  site/en \
  site/es \
  docs/multilingual-content-workflow.md \
  docs/multilingual-redirects.md \
  docs/multilingual-rollback.md

# 2) Rebuild and verify
rm -rf _site .jekyll-cache
bundle exec jekyll build
python3 scripts/validate_local_routes.py --site-dir _site

# 3) Optional production validation
python3 scripts/validate_production_navigation.py --base-url "https://jblueprint.dev"
```

## Trigger Conditions

- Post-deployment build or runtime route regressions on critical paths.
- Language switcher counterpart targets become invalid on core journeys.
- Unexpected SEO/alternate link regressions on canonical EN/ES route pairs.

