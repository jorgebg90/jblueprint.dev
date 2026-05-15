# Multilingual Rollback Guide

Use this guide to safely roll back the language-first source migration (`site/en`, `site/es`) if critical regressions appear.

## 1) Config and Template Rollback

1. Restore `_config.yml` from the latest known-good checkpoint (`checkpoint-a` or `checkpoint-b`).
2. Restore navigation/layout includes:
   - `_data/navigation.yml`
   - `_includes/masthead.html`
   - `_includes/language-switcher.html`
   - `_includes/hreflang-links.html`
3. Keep baseline Jekyll config (`theme`, `plugins`) valid.

## 2) Content Path Rollback

1. Restore legacy root paths if needed:
   - `index.markdown`, `about.markdown`, `posts/index.markdown`
   - `es/index.markdown`, `es/about.markdown`, `es/posts/index.markdown`
   - `_posts/YYYY/MM/DD/*`
2. Remove or archive migrated language-first roots:
   - `site/en/`
   - `site/es/`

## 3) Documentation Rollback

Update or remove multilingual docs:

- `docs/multilingual-content-workflow.md`
- `docs/multilingual-redirects.md`
- `specs/005-reorganize-site-languages/artifacts/`

## 4) Validation Gate

Run final build verification after rollback:

- `bundle exec jekyll build`
- `python3 scripts/validate_local_routes.py --site-dir _site`

Expected result: site builds successfully with stable default-language routes.

