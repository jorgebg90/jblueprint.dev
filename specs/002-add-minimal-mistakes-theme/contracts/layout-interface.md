# Contract: Layout Interface

**Feature**: `002-add-minimal-mistakes-theme` | **Plan**: [plan.md](../plan.md)

This document defines the layout and include interfaces introduced or modified by this feature:
what each component expects as inputs (variables, front matter, site data) and what it
produces as outputs (HTML structure, Liquid variables, side-effects).

---

## Layout Hierarchy

```
_layouts/default.html          ← project override of MM root layout
├── _layouts/home.html         ← extends default; bilingual post listing
├── _layouts/post              ← MM built-in; extends default
├── _layouts/page              ← MM built-in; extends default
└── _layouts/archive           ← MM built-in; extends default
```

All MM layouts that declare `layout: default` in their front matter will resolve to the
project's `_layouts/default.html` override (Jekyll's theme override mechanism).

---

## `_layouts/default.html` (Project Override)

**Purpose**: MM root layout with multilingual language switcher and hreflang injection.

### Inputs

| Variable | Source | Required | Notes |
|----------|--------|----------|-------|
| `page.lang` | front matter | No | Locale of the current page; falls back to `site.active_lang` |
| `page.classes` | front matter | No | MM body class modifier (e.g., `wide`) |
| `site.active_lang` | Polyglot | Yes | Runtime active locale set by jekyll-polyglot |
| `site.lang` | `_config.yml` | Yes | Default language fallback |
| `content` | Jekyll | Yes | Rendered page content from child layout or Markdown |

### Outputs (HTML structure)

```html
<!doctype html>
<html lang="...">
  <head>
    <!-- MM head.html includes: meta, charset, viewport, title, stylesheet, feed -->
    <!-- head/custom.html: hreflang <link> tags -->
  </head>
  <body class="...">
    <!-- MM skip-links.html -->
    <!-- MM masthead.html: site logo + main navigation -->

    <div class="language-switcher-wrapper">
      <!-- language-switcher.html: locale toggle control -->
      <!-- translation-feedback.html: unavailable-translation banner -->
    </div>

    <div id="main" role="main">
      <!-- {{ content }}: child layout or Markdown content -->
    </div>

    <!-- MM footer.html -->
    <!-- assets/js/language-session.js: locale preference persistence -->
  </body>
</html>
```

### Invariants
- `{% include head/custom.html %}` must appear after `{% include head.html %}`.
- `{% include language-switcher.html %}` must appear after `{% include_cached masthead.html %}`.
- `assets/js/language-session.js` must be loaded with `defer` to avoid blocking render.

---

## `_layouts/home.html` (Project Override)

**Purpose**: Home page layout with bilingual post listing filtered by active locale.

### Inputs

| Variable | Source | Required | Notes |
|----------|--------|----------|-------|
| `site.active_lang` | Polyglot | Yes | Filters `site.posts` to the current locale |
| `site.posts` | Jekyll | Yes | All posts across all locales |
| `page.title` | front matter | No | Optional home page heading |
| `page.list_title` | front matter | No | Override for the posts list heading |

### Layout Chain

```yaml
# home.html front matter:
layout: default
```

Inherits the full multilingual wrapper from `default.html`.

### Filtering Logic

```liquid
{%- assign lang_posts = site.posts | where: "lang", site.active_lang -%}
```

### Invariants
- Must always filter `site.posts` by `site.active_lang` — never render posts from all locales.
- Resulting list must be ordered chronologically descending (Jekyll default for `site.posts`).

---

## `_includes/head/custom.html` (New)

**Purpose**: MM-native extension point for project-level `<head>` additions.

### Location in MM layout chain

MM's `head.html` includes `{% include head/custom.html %}` near the end of `<head>`.
This file is the documented, stable injection point for project customizations.

### Content

```html
{%- include hreflang-links.html -%}
```

### Inputs (passed through to `hreflang-links.html`)

| Variable | Source | Required | Notes |
|----------|--------|----------|-------|
| `page.translation_key` | front matter | Conditional | Required to emit hreflang tags; absent = no tags emitted |
| `page.lang` | front matter | Conditional | Determines which URL is `en` vs. `es` |
| `page.url` | Jekyll | Yes | Current page output URL |
| `page.translated_url` | front matter | Conditional | Required when `en`/`es` slugs differ |
| `site.active_lang` | Polyglot | Yes | Fallback when `page.lang` is absent |

### Outputs

When `page.translation_key` is set:
```html
<link rel="alternate" hreflang="en" href="/...">
<link rel="alternate" hreflang="es" href="/es/...">
<link rel="alternate" hreflang="x-default" href="/...">
```
When `page.translation_key` is absent: no output (include is a no-op).

---

## `_includes/language-switcher.html` (Existing — Unchanged)

### Inputs

| Variable | Source | Required | Notes |
|----------|--------|----------|-------|
| `page.lang` | front matter | No | Defaults to `site.active_lang` |
| `page.translation_key` | front matter | Conditional | Determines whether equivalent-page links are available |
| `page.url` | Jekyll | Yes | Used to derive locale variant URLs |
| `page.translated_url` | front matter | Conditional | Required when slugs differ |
| `site.active_lang` | Polyglot | Yes | Fallback locale |
| `site.languages` | `_config.yml` | Yes | `["en", "es"]` |
| `site.data.locales.locales` | `_data/locales.yml` | Yes | Locale metadata (label, url_prefix) |
| `site.data.messages.language_selector_label` | `_data/messages.yml` | Yes | Aria label per locale |

### Outputs

```html
<nav class="language-switcher"
     data-language-switcher
     data-current-lang="en|es"
     data-target-en="/..."
     data-target-es="/es/..."
     data-has-equivalent-en="true|false"
     data-has-equivalent-es="true|false">
  <a href="..." lang="en" hreflang="en" data-language-option="en" class="language-switcher__link is-active">English</a>
  <a href="..." lang="es" hreflang="es" data-language-option="es" class="language-switcher__link">Espanol</a>
</nav>
```

### Invariants
- `.is-active` and `aria-current="true"` must be on the link matching the current locale.
- When no translation exists, `data-target-es` falls back to `?translation=unavailable&requested=es`.

---

## `_data/navigation.yml` (New)

**Purpose**: MM masthead navigation data. Consumed by MM's `_includes/masthead.html`.

### Schema

```yaml
main:
  - title: string    # Display label (English)
    url: string      # Root-relative URL (default locale, no /es/ prefix)
```

### Invariants
- All `title` values must be in English (constitution principle I).
- All `url` values must use default-locale paths.
- The language switcher must not be embedded in this file — MM nav values are static
  strings; Liquid is not evaluated in `_data/` files.

---

## Extension Points NOT Used (Documented for Completeness)

| MM Extension Point | Available At | Decision |
|-------------------|--------------|----------|
| `_includes/masthead.html` | Override MM masthead | Not used — language switcher injected at layout level instead |
| `_includes/footer/custom.html` | Inject into MM footer | Not needed |
| `_includes/breadcrumbs.html` | Override MM breadcrumbs | Not needed — breadcrumbs disabled globally |
| `_includes/sidebar.html` | Override MM sidebar | Not needed — sidebar is per-page opt-in |
| `_includes/author-profile.html` | Override author card | Not needed in this feature |

