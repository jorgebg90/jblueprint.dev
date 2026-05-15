---
layout: post
title: "Installing Minimal Mistakes on a Bilingual Jekyll Blog"
date: 2026-05-08
lang: en
translation_key: minimal-mistakes-integration
translated_url: /es/jekyll/theme/2026/05/08/instalacion-minimal-mistakes.html
permalink: /jekyll/theme/2026/05/08/installing-minimal-mistakes-on-a-bilingual-jekyll-blog.html
categories: [jekyll, theme, minimal-mistakes]
---

This post documents how to migrate a bilingual Jekyll blog from the default `minima` theme
to `minimal-mistakes-jekyll` while preserving full multilingual routing via `jekyll-polyglot`.

## Gem Installation

Replace `minima` with `minimal-mistakes-jekyll` in your `Gemfile`:

```ruby
# Remove:
# gem "minima", "~> 2.5"

# Add:
gem "minimal-mistakes-jekyll"
```

Then run:

```bash
bundle install
```

## `_config.yml` Changes

### Switch the theme key

```yaml
# Remove:
# theme: minima

# Add:
theme: minimal-mistakes-jekyll
minimal_mistakes_skin: default   # Options: air, aqua, contrast, dark, dirt, mint, neon, plum, sunrise
```

### Add MM site settings

```yaml
locale: en-US          # Static BCP47 for MM's internal UI strings — DO NOT use for runtime locale detection
breadcrumbs: false     # Required: MM breadcrumbs are not Polyglot locale-aware
title: your-site-title
name: "Your Name"
description: "Your site description"
url: "https://your-domain.dev"
baseurl: ""
```

### Update `exclude_from_localization`

Remove the old `minima` asset paths and add MM's generated asset paths:

```yaml
exclude_from_localization:
  # ... other paths ...
  # Replace:
  # - assets/main.css
  # - assets/main.css.map
  # - assets/minima-social-icons.svg
  # With:
  - assets/css/main.scss
  - assets/css/main.css
  - assets/js/main.min.js
```

Also add `specs/` to Jekyll's `exclude:` list if you have spec markdown files containing
MM-specific Liquid tags (`include_cached`) in code blocks — otherwise Jekyll will error
when processing those files under minima:

```yaml
exclude:
  - specs/
  # ... other paths ...
```

## Layout Override Strategy

Minimal Mistakes provides built-in layouts that extend its `default.html` root layout.
To inject the language switcher and hreflang metadata into every page, two files are added:

### `_includes/head/custom.html` (new)

MM's documented extension point for project-level `<head>` additions. This file is
automatically included by MM's `head.html` include:

```html
{%- include hreflang-links.html -%}
```

### `_layouts/default.html` (override)

Override MM's root layout to inject the language switcher after the masthead. All other
MM layouts (`post`, `page`, `archive`, etc.) inherit from `default`, so the switcher
appears everywhere with just this one file:

```html
---
---
{%- assign active_lang = page.lang | default: site.active_lang | default: site.lang | default: 'en' -%}

<!doctype html>
<html lang="{{ active_lang }}" class="no-js">
  <head>
    {% include head.html %}
    {% include head/custom.html %}
  </head>
  <body class="layout--{{ page.layout | default: layout.layout }}...">
    {% include_cached skip-links.html %}
    {% include_cached masthead.html %}

    <div class="language-switcher-wrapper">
      {% include language-switcher.html %}
      {% include translation-feedback.html %}
    </div>

    <div id="main" role="main">
      {{ content }}
    </div>

    <div id="footer" class="page__footer">
      <footer>
        {% include footer/custom.html %}
        {% include_cached footer.html %}
      </footer>
    </div>

    {% include scripts.html %}
    <script src="{{ '/assets/js/language-session.js' | relative_url }}" defer></script>
  </body>
</html>
```

### `_layouts/home.html` (override for bilingual post listing)

MM ships a `home` layout, but it does not filter posts by locale. Override it to filter
`site.posts` by `site.active_lang` (the Polyglot runtime locale):

```html
---
layout: default
---
<div class="home">
  {%- assign lang_posts = site.posts | where: "lang", site.active_lang -%}
  {%- if lang_posts.size > 0 -%}
    <h2 class="post-list-heading">Posts</h2>
    <ul class="post-list">
      {%- for post in lang_posts -%}
        <li>
          <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
          <h3>
            <a class="post-link" href="{{ post.url | relative_url }}">
              {{ post.title | escape }}
            </a>
          </h3>
        </li>
      {%- endfor -%}
    </ul>
  {%- endif -%}
</div>
```

### Bridge layouts for standard Jekyll front matter

MM uses `layout: single` for posts and pages, not `layout: post` / `layout: page`.
Add thin bridges so existing content continues to work:

**`_layouts/post.html`**:
```html
---
layout: single
---
```

**`_layouts/page.html`**:
```html
---
layout: single
---
```

## Language Switcher Preservation

The existing `_includes/language-switcher.html`, `_includes/translation-feedback.html`,
and `assets/js/language-session.js` require no changes. They are injected via the
`_layouts/default.html` override and continue to work exactly as before the theme migration.

## Navigation

Create `_data/navigation.yml` for MM's masthead:

```yaml
main:
  - title: "Home"
    url: /
  - title: "About"
    url: /about/
```

Do not embed language-switcher links here — MM navigation is a static key/URL list and
does not evaluate Liquid expressions.

## Post Directory Convention

New posts use the `_posts/<year>/<month>/<day>/YYYY-MM-DD-title.md` convention.
Jekyll only uses the filename to determine date and slug; the directory structure is
organizational only. Existing posts at other paths are unaffected.

## Rollback Path

To restore `minima` without losing multilingual content:

1. `Gemfile`: Restore `gem "minima", "~> 2.5"`.
2. `_config.yml`: Restore `theme: minima`; remove MM-specific keys; restore minima asset exclusions.
3. Remove `_layouts/default.html`, `_layouts/home.html`, `_layouts/post.html`, `_layouts/page.html`.
4. Remove `_includes/head/custom.html` and `_data/navigation.yml`.
5. Run `bundle install && bundle exec jekyll build` to verify.

All bilingual content files, routing configuration, and multilingual includes are preserved
through a rollback — only the visual theme and theme-specific config keys are reverted.

