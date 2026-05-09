# Data Model: Bilingual About Page and Localized Navigation

**Phase**: 1 | **Plan**: [plan.md](./plan.md) | **Spec**: [spec.md](./spec.md)

This model defines content and UI-localization entities required by the feature.

---

## Entity: AboutProfile

Localized author profile content rendered on About/Acerca de pages.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `lang` | string | Yes | `en` or `es` |
| `title` | string | Yes | `About` for `en`, `Acerca de` for `es` |
| `translation_key` | string | Yes | Must be `about` in both variants |
| `permalink` | string | Yes | `/about/` (Polyglot handles `/es/about/` for Spanish variant) |
| `profile_image_path` | string | Yes | Must resolve to a valid image asset path |
| `professional_summary` | markdown/text | Yes | Language-matching summary with equivalent meaning across locales |
| `profile_sections` | list | No | Optional structured subsections (experience, focus, contact) |

**Validation rules**:
- English and Spanish About files must share the same `translation_key`.
- `lang` must match content language.
- Profile image must include meaningful alt text and render in circular format.
- Professional summaries must be semantically equivalent, even with non-literal wording.

**State transitions**:
- `Draft (en+es)` → `Published bilingual`.
- `Published bilingual` → `Published with one variant missing` (must trigger redirect fallback to existing variant).

---

## Entity: NavigationLiteral

Localized label for visible navigation/menu items.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `key` | string | Yes | Stable identifier (e.g., `home`, `about`) |
| `url` | string | Yes | Default-locale root-relative path |
| `labels.en` | string | Yes | Non-empty English label |
| `labels.es` | string | Yes | Non-empty Spanish label |
| `fallback_lang` | string | Yes | `en` |
| `scope` | enum | Yes | `global_navigation` or `non_global_control` |

**Validation rules**:
- Every visible navigation item must have `labels.en` and `labels.es`.
- Global navigation labels are sourced from `_data/navigation.yml`; non-global control labels (`menu_label`, `search_label`) are sourced from `_data/ui-text.yml`.
- If active-language label lookup fails, UI must fallback to `labels.en`.
- URL generation must remain locale-aware and consistent with current masthead behavior.

---

## Entity: TranslationPair

Logical pairing between English and Spanish variants of the same page.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `translation_key` | string | Yes | Shared by all variants of one logical page |
| `en_url` | string | Yes | Existing English route |
| `es_url` | string | Conditional | Existing Spanish route when available |
| `fallback_behavior` | enum | Yes | `redirect_to_available_variant` |

**Validation rules**:
- Translation pair must be discoverable from page front matter + locale conventions.
- If one URL is missing, requests for missing variant must redirect to available counterpart.

---

## Relationships

- `AboutProfile` participates in one `TranslationPair` via `translation_key=about`.
- `NavigationLiteral` resolves links that may target `AboutProfile` URLs.
- `TranslationPair` governs language-switch and fallback outcomes for About navigation.

