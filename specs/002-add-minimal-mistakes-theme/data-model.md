# Data Model: Add Minimal Mistakes Theme

**Phase**: 1 | **Plan**: [plan.md](./plan.md) | **Spec**: [spec.md](./spec.md)

This document defines the logical entities, their fields, relationships, validation rules,
and state transitions involved in the Minimal Mistakes theme integration.

---

## Entity: ThemeConfigurationProfile

Represents site-level theme settings that control layout, navigation, and presentation.
Stored in `_config.yml`. Consumed by all Liquid templates through `site.*` variables.

| Field | Type | Required | Values / Constraints |
|-------|------|----------|----------------------|
| `theme` | string | **Yes** | Must be `minimal-mistakes-jekyll`; `minima` must be removed |
| `minimal_mistakes_skin` | string | **Yes** | One of: `default`, `air`, `aqua`, `contrast`, `dark`, `dirt`, `mint`, `neon`, `plum`, `sunrise` |
| `locale` | string | No | Static BCP47 string (e.g., `en-US`). **Decorative only** — must not be used for runtime locale detection; Polyglot's `site.active_lang` governs that |
| `title` | string | **Yes** | Site title displayed in MM masthead |
| `name` | string | No | Site author name (used by MM author sidebar) |
| `email` | string | No | Contact email |
| `description` | string | No | Site meta description |
| `url` | string | No | Full base URL (e.g., `https://jblueprint.dev`) |
| `baseurl` | string | No | Subpath — empty string `""` for root |
| `breadcrumbs` | boolean | No | **Must be `false`** — MM breadcrumbs are not Polyglot locale-aware (see `research.md` R-005) |
| `lang` | string | **Yes** | Keep `en` — Polyglot default language; do not change |
| `languages` | list | **Yes** | Keep `["en", "es"]` — Polyglot locale list; do not change |
| `default_lang` | string | **Yes** | Keep `"en"` — Polyglot default; do not change |
| `parallel_localization` | boolean | No | Keep `true` |
| `exclude_from_localization` | list | **Yes** | Must include MM asset paths and remove minima-specific paths (see below) |
| `plugins` | list | **Yes** | Keep `[jekyll-feed, jekyll-polyglot]`; do not add `jekyll-remote-theme` |

**`exclude_from_localization` update**:
```yaml
# Remove (minima-specific, no longer present):
# - assets/main.css
# - assets/main.css.map
# - assets/minima-social-icons.svg

# Add (MM-generated assets):
- assets/css/main.css
- assets/js/main.min.js
```

**Validation Rules**:
- `theme: minimal-mistakes-jekyll` must be set; `theme: minima` must be absent.
- `breadcrumbs` must be `false` or absent (MM default is `false`) to prevent locale path regressions.
- `locale` must be a static string — any attempt to read `site.active_lang` into this key
  is invalid (YAML is loaded once; Liquid is not evaluated in `_config.yml`).
- `exclude_from_localization` must include all MM-generated static asset paths.

---

## Entity: LocalizedRouteVariant

Represents a language-specific route output for a single logical page. Produced by
`jekyll-polyglot` at build time based on page front matter.

| Field | Source | Required | Values / Constraints |
|-------|--------|----------|----------------------|
| `lang` | front matter | **Yes** | `en` or `es` |
| `translation_key` | front matter | Conditional | Required when a translated counterpart exists; **shared value** across all language variants of the same logical page |
| `translated_url` | front matter | Conditional | Required only when `en` and `es` page slugs differ; holds the explicit output URL of the counterpart variant |
| `permalink` | front matter | Conditional | Set explicitly when a post needs a custom output path (e.g., `/es/jekyll/.../post.html`) |
| Output URL — `en` | generated | — | No locale prefix: `/about/`, `/post-slug/` |
| Output URL — `es` | generated | — | `/es/` prefix: `/es/about/`, `/es/post-slug/` |

**Validation Rules**:
- Pages/posts with `translation_key` must have a counterpart in the other language with the
  **identical** `translation_key` value.
- A post must not combine `lang: en` with `permalink: /es/...` (lang and URL prefix must match).
- `translated_url` is only set when `en` and `es` slugs genuinely differ; do not set it when
  slugs are identical (the switcher derives the URL through path-prefix manipulation instead).
- Switcher fallback URL pattern (missing translation):
  `{{ page.url }}?translation=unavailable&requested={{ target_lang }}`

**State transitions**:
```
Draft → Published (en only)          [missing translation — fallback active]
Draft → Published (en + es)          [full bilingual — hreflang + switcher render equivalents]
Published (en only) → Published (en + es)  [translation added later]
```

**Relationships**: Referenced by `LanguageNavigationControl` and `hreflang-links.html` include.

---

## Entity: LanguageNavigationControl

Represents the user-facing control for switching between localized variants of the current
page. Implemented in `_includes/language-switcher.html`; consumed data-attributes are read
by `assets/js/language-session.js`.

| Attribute | Type | Values / Constraints |
|-----------|------|----------------------|
| `data-current-lang` | string | `en` or `es` — the locale of the page being rendered |
| `data-target-en` | string | Root-relative URL of the English variant |
| `data-target-es` | string | Root-relative URL of the Spanish variant, or fallback URL `?translation=unavailable&requested=es` |
| `data-has-equivalent-en` | boolean | `true` when `page.translation_key` is defined |
| `data-has-equivalent-es` | boolean | `true` when `page.translation_key` is defined |
| `aria-label` | string | From `site.data.messages.language_selector_label[current_lang]` |

**Rendering location**: Injected into every page via `_layouts/default.html` override,
immediately after `{% include_cached masthead.html %}`.

**Validation Rules**:
- Must be visible on all primary page types: home, post, page, about.
- When `data-has-equivalent-*` is `false`, the switcher must not navigate to a non-existent
  page — the fallback query-string URL is used.
- CSS class `.is-active` and `aria-current="true"` must be applied to the currently active
  locale link.

**Relationships**: Consumes `LocalizedRouteVariant` fields (`page.url`, `page.translation_key`,
`page.translated_url`, `page.lang`). Embedded in `ThemeConfigurationProfile`'s root layout.

---

## Entity: PostFrontMatter

Represents the required and optional front matter fields for bilingual blog posts under
the Minimal Mistakes theme. Governs how posts are rendered, listed, and routed.

| Field | Type | Required | Values / Constraints |
|-------|------|----------|----------------------|
| `layout` | string | **Yes** | `post` — uses MM's post layout; do not use `default` |
| `title` | string | **Yes** | Post title; in English when `lang: en` |
| `date` | date | **Yes** | ISO 8601: `YYYY-MM-DD` or `YYYY-MM-DD HH:MM:SS +OFFSET` |
| `lang` | string | **Yes** | `en` or `es`; must match the post's content language and URL prefix |
| `translation_key` | string | Conditional | Required when a translation exists; shared identifier across variants |
| `translated_url` | string | Conditional | Only when slugs differ across languages |
| `permalink` | string | Conditional | Explicit URL for posts with locale prefix in the path |
| `categories` | list | No | Lowercase ASCII strings |
| `tags` | list | No | Lowercase ASCII strings (MM uses tags for related-posts widget) |
| `excerpt` | string | No | Manual excerpt displayed in post listings |
| `author` | string | No | Override site-level author profile for this post |
| `toc` | boolean | No | `true` to enable MM table of contents sidebar for long posts |
| `toc_label` | string | No | Custom label for the TOC widget (`toc: true` required) |
| `classes` | string | No | MM body class modifier (e.g., `wide` for full-width layout) |
| `header.image` | string | No | Optional post header image path |

**File naming**: `YYYY-MM-DD-title.md` inside `_posts/<year>/<month>/<day>/`  
Example: `_posts/2026/05/08/2026-05-08-minimal-mistakes-integration.md`

**Validation Rules**:
- `layout: post` must be set for all posts (not `layout: default` or plain Markdown).
- `lang` must match the post's content language and must not conflict with any explicit `permalink` locale prefix.
- `title` must be in English when `lang: en` (constitution principle I).
- Post files must follow the `YYYY-MM-DD-title.md` naming convention regardless of subdirectory.
- New posts in this feature scope must reside under `_posts/<year>/<month>/<day>/`.

---

## Entity: SiteNavigation

Represents the MM masthead navigation data — primary page links displayed in the top bar.
Stored in `_data/navigation.yml`.

| Field | Type | Required | Values / Constraints |
|-------|------|----------|----------------------|
| `main` | list | **Yes** | List of `{ title, url }` navigation items |
| `main[].title` | string | **Yes** | Display label — must be in English (constitution principle I) |
| `main[].url` | string | **Yes** | Root-relative URL using the **default locale path** (no `/es/` prefix) |

**File**: `_data/navigation.yml`

**Validation Rules**:
- URLs in `main` must use default-locale paths. The language switcher handles locale
  redirection independently; navigation duplicates are not needed.
- Navigation labels must be in English (constitution principle I applies to all implementation
  data files, including `_data/`).
- The language switcher must **not** be embedded in `navigation.yml` — MM navigation is a
  static key/URL list that does not support Liquid expression evaluation.

---

## Relationships Summary

```
ThemeConfigurationProfile
  └─ controls rendering for ──────────► PostFrontMatter (layout chain: post → default)
  └─ sets Polyglot exclusion for ─────► LocalizedRouteVariant (Polyglot asset processing)

LocalizedRouteVariant
  └─ rendered as link targets by ─────► LanguageNavigationControl
  └─ derived from ────────────────────► PostFrontMatter (translation_key, translated_url, lang)

LanguageNavigationControl
  └─ embedded in ─────────────────────► ThemeConfigurationProfile (via default.html override)
  └─ reads from ──────────────────────► LocalizedRouteVariant (page.url, page.translation_key)

SiteNavigation
  └─ consumed by ─────────────────────► ThemeConfigurationProfile (MM masthead include)
  └─ independent of ──────────────────► LanguageNavigationControl (separate concerns)
```

