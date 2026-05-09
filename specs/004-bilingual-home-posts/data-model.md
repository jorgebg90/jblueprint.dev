# Data Model: Bilingual Home and Separated Posts Navigation

## Entity: LocalizedHomeVariant

One language-specific home representation.

### Fields

- `translation_key` (string, required): Shared logical key for EN/ES home variants (expected: `home`).
- `lang` (enum: `en` | `es`, required): Locale identity.
- `permalink` (string, required): Canonical route (`/` or `/es/`).
- `layout` (string, required): Jekyll layout used for home rendering.
- `banner_text` (string, required): Localized hero/banner message.
- `intro_text` (string, required): Localized introductory summary.
- `show_inline_posts` (boolean, required, fixed `false`): Guard to prevent home posts list in this feature.

### Validation Rules

- EN and ES home variants must share the same `translation_key`.
- `lang` must be valid and mapped to configured locales.
- Home variants must not include inline posts-list rendering (`show_inline_posts=false`).

## Entity: LocalizedPostsSection

One language-specific posts index surface.

### Fields

- `translation_key` (string, required): Shared key for EN/ES posts index (expected: `posts-index`).
- `lang` (enum: `en` | `es`, required): Locale identity.
- `permalink` (string, required): Canonical route (`/posts/` or `/es/posts/`).
- `title` (string, required): Localized posts page title.
- `nav_label` (string, required): Localized masthead label.
- `empty_state_message` (string, required): Localized message shown when no eligible posts exist.

### Validation Rules

- EN and ES posts sections must exist and be reachable from top-level navigation.
- `empty_state_message` must be present per locale.

## Entity: LocalizedPostEntry

One published post candidate in `_posts/`.

### Fields

- `id` (string, generated): Internal unique identifier.
- `lang` (enum: `en` | `es`, required for localized listing eligibility).
- `translation_key` (string, optional): Logical grouping key with translated variant(s).
- `title` (string, required).
- `date` (date, required).
- `url` (string, generated).
- `excerpt` (string, optional).

### Validation Rules

- Localized listings include only entries where `post.lang == site.active_lang`.
- Entries missing/invalid `lang` are excluded from localized listings and flagged for editorial correction.
- Entries missing `translation_key` remain eligible only as standalone locale entries.

## Entity: TranslationGroup

Logical relationship tying translated post variants.

### Fields

- `translation_key` (string, required): Group identifier.
- `variants` (array of `LocalizedPostEntry`, min 1): Locale variants for that logical article.

### Validation Rules

- In a single locale listing, at most one visible entry per `translation_key`.
- If two same-locale entries share one `translation_key` (collision), only one deterministic winner is rendered and the collision is flagged.

## Entity: FallbackResolution

Outcome of language switch or locale-prefixed route resolution when equivalent content is missing.

### Fields

- `source_route` (string, required): Route where switch/request started.
- `target_lang` (enum: `en` | `es`, required): Requested language.
- `equivalent_route_found` (boolean, required): Whether direct counterpart exists.
- `resolved_route` (string, required): Final safe route.
- `feedback_message` (string, required when fallback occurs): Localized translation-unavailable text.
- `reason` (enum: `missing-page-translation` | `missing-post-translation` | `unsupported-locale-prefix` | `no-equivalent-route`, required).

### Validation Rules

- If equivalent exists, switch resolves directly in one action.
- If equivalent does not exist, resolve to a valid default-language route and show localized translation-unavailable feedback.
- Unsupported/unresolved locale-prefixed routes in feature scope must not end in 404 for this feature behavior.
