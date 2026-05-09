# Contract: Front Matter Schema

**Feature**: `002-add-minimal-mistakes-theme` | **Plan**: [plan.md](../plan.md)

This document defines the front matter interface that content files must satisfy for correct
rendering and routing under the Minimal Mistakes theme with jekyll-polyglot. It is the
authoritative schema for both site maintainers authoring content and templates consuming it.

---

## Blog Posts (`_posts/<year>/<month>/<day>/YYYY-MM-DD-title.md`)

### Required Fields

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| `layout` | string | `post` | Must be `post`; do not use `default` or `page` |
| `title` | string | `"Installing Minimal Mistakes"` | English when `lang: en` |
| `date` | date | `2026-05-08` | ISO 8601; must match filename date |
| `lang` | string | `en` | `en` or `es`; must match content language and URL prefix |

### Conditional Fields

| Field | Type | When Required | Notes |
|-------|------|---------------|-------|
| `translation_key` | string | When a counterpart translation exists | Shared value across all language variants of the same post |
| `translated_url` | string | When `en` and `es` slugs differ | Explicit URL of the counterpart variant; omit when slugs are identical |
| `permalink` | string | When locale prefix must appear in custom URL | e.g., `/es/jekyll/theme/2026/05/08/post.html` |

### Optional Fields

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| `categories` | list | `[]` | Lowercase ASCII strings |
| `tags` | list | `[]` | Lowercase ASCII strings; MM uses these for the related-posts widget |
| `excerpt` | string | first paragraph | Manual excerpt for post listing display |
| `author` | string | site author | Override site-level author profile for this post |
| `toc` | boolean | `false` | `true` enables MM table of contents sidebar |
| `toc_label` | string | `"On this page"` | Custom TOC heading; requires `toc: true` |
| `classes` | string | — | MM body class modifier, e.g., `wide` for full-width layout |
| `header.image` | string | — | Path to post header image |
| `header.overlay_image` | string | — | Path to header overlay image |
| `header.overlay_color` | string | — | CSS color for overlay, e.g., `"#000"` |

### Validation Rules

1. `layout: post` must be set — MM's post layout provides the reading experience;
   omitting it falls back to the base default layout without post-specific elements.
2. `lang` must match the post's content language.
3. `lang` must not conflict with an explicit `permalink` locale prefix
   (e.g., `lang: en` + `permalink: /es/...` is invalid).
4. `translation_key` must be identical across all language variants of the same
   logical post; mismatched keys break the hreflang and switcher routing.
5. `translated_url` must only be set when slugs genuinely differ across languages;
   do not set it when slugs are the same (the switcher derives the URL automatically).
6. Post file must be named `YYYY-MM-DD-title.md` and placed under `_posts/<year>/<month>/<day>/`
   for posts in this feature's scope.

### Minimal Valid Example — English Post

```yaml
---
layout: post
title: "Installing Minimal Mistakes on a Bilingual Jekyll Blog"
date: 2026-05-08
lang: en
translation_key: minimal-mistakes-integration
categories: [jekyll, theme, minimal-mistakes]
---
```

### Minimal Valid Example — Spanish Post with Different Slug

```yaml
---
layout: post
title: "Instalación de Minimal Mistakes en un blog Jekyll multilenguaje"
date: 2026-05-08
lang: es
translation_key: minimal-mistakes-integration
permalink: /es/jekyll/theme/2026/05/08/instalacion-minimal-mistakes.html
translated_url: /jekyll/theme/minimal-mistakes-integration/
categories: [jekyll, theme, minimal-mistakes]
---
```

---

## Static Pages (`about.markdown`, `es/about.markdown`, etc.)

### Required Fields

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| `layout` | string | `page` | Use MM's `page` layout for static pages |
| `title` | string | `"About"` | Page heading and `<title>` |
| `lang` | string | `en` | `en` or `es` |
| `permalink` | string | `/about/` | Explicit to ensure predictable Polyglot URL |

### Conditional Fields

| Field | When Required | Notes |
|-------|---------------|-------|
| `translation_key` | When translated counterpart exists | Same rules as posts |
| `translated_url` | When slugs differ | Same rules as posts |

### Optional Fields

Same as Post optional fields, plus:

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| `toc` | boolean | `false` | Useful for long pages with multiple sections |

### Minimal Valid Example — About Page

```yaml
---
layout: page
title: "About"
permalink: /about/
lang: en
translation_key: about
---
```

---

## Home Pages (`index.markdown`, `es/index.markdown`)

The home page uses the custom `_layouts/home.html` (bilingual post listing).

### Required Fields

| Field | Type | Example |
|-------|------|---------|
| `layout` | string | `home` |
| `lang` | string | `en` |

### Minimal Valid Example

```yaml
---
layout: home
lang: en
---
```

---

## Invariants Across All Content Types

- `lang: en` pages must never have a `/es/` URL prefix.
- `lang: es` pages must either carry an explicit `/es/` permalink or appear under `es/` directory.
- `translation_key` values must be globally unique per logical page (not per language variant).
- All field values and front matter keys must be in English
  (constitution principle I; blog prose content in `es` is exempt).

