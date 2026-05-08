# Contract: Multilingual Routing and Localization Behavior

## Scope

This contract defines external behavior for multilingual navigation and discoverability for the Jekyll site in feature `001-add-multilingual-support`.

## Locale Contract

- Supported locales: `en` (default), `es`.
- URL strategy:
  - Default locale (`en`) uses unprefixed routes (example: `/about/`).
  - Spanish locale (`es`) uses `/es/` prefixed routes (example: `/es/about/`).

## Routing and Redirect Contract

- Equivalent translation exists:
  - Language switch MUST open equivalent page in target locale.
- Unsupported locale prefix requested:
  - Response contract: HTTP 301 redirect to default-locale equivalent path.
- Supported locale prefix requested but translation missing:
  - Response contract: HTTP 302 redirect to default-locale equivalent path.
  - UX contract: page MUST display visible `translation not available` feedback.

## Document Metadata Contract (Front Matter)

Each localized page/post variant MUST define:

- `lang`: `en` or `es`
- `translation_key`: stable identifier shared by all locale variants of same logical document

Recommended additional metadata:

- `title`: localized title
- `permalink`: explicit permalink where route control is needed

Validation requirements:

- `lang` MUST be valid supported locale.
- `translation_key` MUST be present and non-empty for pages intended to support switching/alternate metadata.
- Locale variants sharing a `translation_key` MUST map to equivalent logical content.

## Language Switcher Contract

- Language selector MUST be visible on home, posts, and key static pages.
- If target translation exists, selector links to equivalent localized URL.
- If target translation does not exist, selector keeps user on a valid page and shows translation-unavailable feedback.

## Session Preference Contract

- Selected language preference persistence MUST be session-scoped only.
- Preference storage MUST reset when browser session ends.

## SEO/Discoverability Contract

- Bilingual pages MUST emit:
  - `hreflang="en"` alternate
  - `hreflang="es"` alternate
  - `hreflang="x-default"` alternate pointing to default locale URL
- Single-language pages MUST NOT emit alternates for missing translations.

## Rollback Contract

If multilingual plugin/config must be rolled back:

- Remove plugin entry and multilingual config keys from `_config.yml`.
- Remove locale-specific templates/front matter keys introduced for pairing.
- Preserve default locale routes to avoid breaking existing canonical paths.

