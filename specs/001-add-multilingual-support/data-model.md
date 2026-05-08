# Data Model: Add Multilingual Support (Spanish and English)

## Entity: Locale

- Purpose: Represents a supported site language.
- Fields:
  - `code` (string, required): `en` or `es`.
  - `label` (string, required): Human-readable language name (for UI).
  - `is_default` (boolean, required): `true` only for `en`.
  - `url_prefix` (string, required): `""` for `en`, `"/es"` for `es`.
- Validation rules:
  - `code` MUST be one of the release-supported locales.
  - Exactly one locale MUST have `is_default = true`.

## Entity: LocalizedDocument

- Purpose: Represents one concrete page/post variant in a specific locale.
- Fields:
  - `document_id` (string, required): Stable translation key shared across variants.
  - `lang` (string, required): Locale code (`en` or `es`).
  - `source_path` (string, required): Jekyll source file path.
  - `output_url` (string, required): Generated route URL.
  - `title` (string, required): Localized title.
  - `is_published` (boolean, required): Publish state for this locale variant.
- Validation rules:
  - `document_id + lang` MUST be unique.
  - `output_url` MUST follow locale route strategy (`/` for default, `/es/` prefix for Spanish).
  - Front matter MUST include valid YAML and required multilingual keys.

## Entity: TranslationGroup

- Purpose: Logical grouping of localized variants for one document.
- Fields:
  - `document_id` (string, required): Group key.
  - `available_locales` (set<string>, required): Subset of `{en, es}` with published variants.
  - `canonical_locale` (string, required): Default locale for fallback (`en`).
- Validation rules:
  - `available_locales` MUST contain at least one locale.
  - `canonical_locale` MUST be present in `available_locales`.

## Entity: LanguagePreferenceSession

- Purpose: Captures visitor language choice for active browser session.
- Fields:
  - `selected_locale` (string, optional): `en` or `es`.
  - `updated_at` (datetime, optional): Timestamp of latest change in session.
- Validation rules:
  - Preference MUST be session-scoped only (cleared when browser session ends).
  - If unset/invalid, behavior falls back to default locale (`en`).

## Entity: RouteResolution

- Purpose: Defines how a requested path is resolved to final response behavior.
- Fields:
  - `requested_path` (string, required)
  - `detected_locale_prefix` (string, optional)
  - `resolution_type` (enum, required): `serve`, `redirect_301_unsupported_locale`, `redirect_302_missing_translation`
  - `resolved_path` (string, required)
  - `feedback_message` (string, optional): e.g., "translation not available"
- Validation rules:
  - Unsupported locale prefix MUST resolve to `redirect_301_unsupported_locale`.
  - Missing translation under supported locale path MUST resolve to `redirect_302_missing_translation` with feedback.

## Relationships

- `TranslationGroup (1) -> (many) LocalizedDocument` by `document_id`.
- `Locale (1) -> (many) LocalizedDocument` by `lang`.
- `LanguagePreferenceSession (0..1)` influences `RouteResolution` and language switch target selection.

## State Transitions

- Translation availability lifecycle:
  - `Single-language` -> `Bilingual` when second locale document is published.
  - `Bilingual` -> `Single-language` if one locale variant is unpublished/removed.
- Request resolution lifecycle:
  - Incoming request -> detect locale context -> validate translation availability -> serve or redirect -> optional feedback render.

