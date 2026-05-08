# Multilingual Rollback Guide

Use this guide to safely roll back multilingual support if plugin or configuration changes must be reverted.

## 1) Plugin and Config Rollback

1. Remove `jekyll-polyglot` from `Gemfile`.
2. Run `bundle install` to refresh `Gemfile.lock`.
3. Revert multilingual keys in `_config.yml`:
   - `languages`
   - `default_lang`
   - `parallel_localization`
   - `exclude_from_localization`
4. Keep baseline Jekyll config (`theme`, `plugins`) valid.

## 2) Layout and Include Rollback

1. Remove multilingual overrides from `_layouts/default.html`.
2. Remove multilingual includes:
   - `_includes/hreflang-links.html`
   - `_includes/language-switcher.html`
   - `_includes/translation-feedback.html`
3. Remove session helper script `assets/js/language-session.js` and script reference.

## 3) Content Rollback

1. Remove or archive Spanish content variants under `es/` and `_posts/`.
2. Remove multilingual metadata (`lang`, `translation_key`) only if reverting to monolingual behavior.
3. Keep canonical English routes unchanged to avoid breaking existing links.

## 4) Documentation Rollback

Update or remove multilingual docs:

- `docs/multilingual-content-workflow.md`
- `docs/multilingual-redirects.md`
- `specs/001-add-multilingual-support/quickstart.md`

## 5) Validation Gate

Run final build verification after rollback:

- `bundle exec jekyll build`

Expected result: site builds successfully with stable default-language routes.

