# Contract: About/Acerca Front Matter and Content Interface

**Feature**: `003-bilingual-about-page` | **Plan**: [../plan.md](../plan.md)

Defines the required interface for `about.markdown` and `es/about.markdown`.

---

## Required Front Matter

| Field | Type | English Variant | Spanish Variant | Notes |
|-------|------|-----------------|-----------------|-------|
| `layout` | string | `page` | `page` | Must use page layout |
| `title` | string | `About` | `Acerca de` | Localized heading |
| `lang` | string | `en` | `es` | Must match body language |
| `translation_key` | string | `about` | `about` | Shared logical page pair key |
| `permalink` | string | `/about/` | `/about/` | Polyglot builds `/es/about/` for Spanish |

## Optional Front Matter

| Field | Type | Notes |
|-------|------|-------|
| `classes` | string | Optional MM page style classes |
| `toc` | boolean | Optional if page sections warrant TOC |

---

## Content Contract

1. Page body must include:
   - profile image element
   - concise professional summary in active language
2. Profile image must expose meaningful `alt` text.
3. Profile image must render as circular in final UI.
4. English and Spanish summaries must preserve equivalent meaning.

---

## Routing and Fallback Contract

1. Language switch from About/Acerca must target counterpart variant directly when both exist.
2. If one variant is missing, requests to missing variant must redirect to available variant.
3. Missing variant behavior must avoid empty page, dead-end route, or blank content response.

