# Multilingual Content Workflow

This guide describes how to maintain bilingual content in English (`en`) and Spanish (`es`) using Jekyll + Polyglot.

## Required Front Matter Keys

Every multilingual page or post must define:

- `lang`: locale code (`en` or `es`)
- `translation_key`: stable key shared by all locale variants

Recommended keys:

- `title`: localized title
- `permalink`: explicit route when equivalent URL parity is required

## File Placement Rules

- English static pages remain at project root (`index.markdown`, `about.markdown`, etc.).
- Spanish static pages live under `es/` with matching front matter.
- Posts remain in `_posts/` and are paired by `translation_key`.

## Translation Pairing Rules

1. Pick a stable `translation_key` once and reuse it across language variants.
2. Keep publish state aligned when both variants are meant to be available.
3. For untranslated content, publish only available language variant.
4. Never emit manual `hreflang` links in content; layout include handles this automatically.

## Publishing Checklist

1. Add or update English variant.
2. Add or update Spanish variant.
3. Run local build:
   - `bundle exec jekyll build`
4. Verify generated equivalents in `_site/` and `_site/es/`.
5. Check language selector behavior on home, about, and post pages.
6. Confirm translation-unavailable feedback on pages without counterpart.

