# Multilingual Content Workflow

This guide describes how to maintain bilingual content in English (`en`) and Spanish (`es`) using Jekyll with language-first source folders.

## Required Front Matter Keys

Every multilingual page or post must define:

- `lang`: locale code (`en` or `es`)
- `translation_key`: stable key shared by all locale variants

Recommended keys:

- `title`: localized title
- `permalink`: explicit route when equivalent URL parity is required

## File Placement Rules

- English static pages must live under `site/en/`.
- Spanish static pages must live under `site/es/`.
- English posts must live under `site/en/_posts/YYYY/MM/DD/`.
- Spanish posts must live under `site/es/_posts/YYYY/MM/DD/`.
- Keep EN and ES variants paired by `translation_key`.

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

