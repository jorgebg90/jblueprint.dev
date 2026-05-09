# Quickstart: Minimal Mistakes Theme Integration

**Feature**: `002-add-minimal-mistakes-theme` | **Plan**: [plan.md](./plan.md)

Step-by-step guide for implementing the Minimal Mistakes theme integration.
Follow in order; validate after each step before proceeding to the next.

---

## Prerequisites

- Ruby 3.x + Bundler installed
- Working on branch `002-add-minimal-mistakes-theme`
- Baseline build is green: `bundle exec jekyll build` passes before starting

---

## Step 1: Gemfile — Replace `minima` with `minimal-mistakes-jekyll`

In `Gemfile`, replace:
```ruby
gem "minima", "~> 2.5"
```
with:
```ruby
gem "minimal-mistakes-jekyll"
```

Run:
```bash
bundle install
```

**Validation**:
```bash
bundle exec jekyll build
```
Build may show warnings about missing layouts at this stage — expected. It must not error out
on dependency resolution.

---

## Step 2: `_config.yml` — Switch Theme and Configure MM

**2a. Switch theme key**:
```yaml
# Replace:
theme: minima
# With:
theme: minimal-mistakes-jekyll
minimal_mistakes_skin: default    # Options: air, aqua, contrast, dark, dirt, mint, neon, plum, sunrise
```

**2b. Add MM-specific site settings** (adapt values to the actual site):
```yaml
locale: en-US                     # Static BCP47 — used by MM's internal UI strings only
                                  # Do NOT use for runtime locale detection; Polyglot controls that
title: jblueprint.dev
name: "Site Author Name"
description: "Your site description"
breadcrumbs: false                # Required: MM breadcrumbs are not Polyglot locale-aware
```

**2c. Update `exclude_from_localization`** — remove minima paths, add MM paths:
```yaml
exclude_from_localization:
  - .git/
  - .github/
  - .idea/
  - .specify/
  - .vscode/
  - docs/
  - specs/
  # MM-generated assets (replace the old minima asset entries):
  - assets/css/main.css
  - assets/js/main.min.js
  - Gemfile
  - Gemfile.lock
  - LICENSE
  - README.md
  - vendor/
  - node_modules/
```
Remove: `assets/main.css`, `assets/main.css.map`, `assets/minima-social-icons.svg`
(minima-specific paths that will no longer exist).

**Validation**:
```bash
bundle exec jekyll build
```
Pages should now render with the MM theme. Inspect `_site/index.html` for MM's stylesheet
reference (`/assets/css/main.css`).

---

## Step 3: `_includes/head/custom.html` — Inject hreflang into MM `<head>`

Create the file `_includes/head/custom.html`:
```html
{%- include hreflang-links.html -%}
```

This uses MM's documented extension point to insert hreflang `<link>` tags without
overriding MM's full `head.html`.

**Validation**:
```bash
bundle exec jekyll build
```
Inspect a bilingual page's generated HTML `<head>` (e.g., `_site/about/index.html`) for:
```html
<link rel="alternate" hreflang="en" href="...">
<link rel="alternate" hreflang="es" href="...">
<link rel="alternate" hreflang="x-default" href="...">
```

---

## Step 4: `_layouts/default.html` — Inject Language Switcher

Override MM's root layout to add the language switcher and translation feedback.
Create `_layouts/default.html` based on MM's default layout structure, adding the language
switcher block after the masthead:

```html
<!doctype html>
<html lang="{{ page.lang | default: site.active_lang | default: site.lang | default: 'en' }}"
      class="no-js">
  <head>
    {% include head.html %}
    {% include head/custom.html %}
  </head>
  <body class="{{ page.classes | default: '' }}">
    {% include_cached skip-links.html %}
    {% include_cached masthead.html %}

    <!-- Multilingual navigation control -->
    <div class="language-switcher-wrapper">
      {% include language-switcher.html %}
      {% include translation-feedback.html %}
    </div>

    <div id="main" role="main">
      {{ content }}
    </div>

    {% include footer.html %}

    <script src="{{ '/assets/js/language-session.js' | relative_url }}" defer></script>
  </body>
</html>
```

> **Note**: Verify the installed MM gem's `default.html` structure before finalizing:
> ```bash
> bundle show minimal-mistakes-jekyll
> # Then inspect the returned path/_layouts/default.html for any additional structural includes
> ```

**Validation**:
```bash
bundle exec jekyll build
```
- Language switcher is visible on the home page, posts, and about page.
- MM masthead (logo + navigation) renders correctly.
- No duplicate `<head>` or `<body>` tags in generated HTML.

---

## Step 5: `_layouts/home.html` — Bilingual Post Listing

MM ships its own `home` layout. The project's `_layouts/home.html` must continue filtering
posts by `site.active_lang` to show only the current locale's posts.

Evaluate whether MM's built-in `home` layout meets this requirement:
- If **yes**: delete `_layouts/home.html` and let MM handle it (verify listing is locale-filtered).
- If **no**: keep the existing `_layouts/home.html` with the `where: "lang", site.active_lang`
  filter, but update it to inherit from MM's layout chain.

Minimal starting point for a kept `home.html`:
```html
---
layout: default
---
<div class="home">
  {%- assign lang_posts = site.posts | where: "lang", site.active_lang -%}
  {%- if lang_posts.size > 0 -%}
    <h2>Posts</h2>
    <ul>
      {%- for post in lang_posts -%}
        <li>
          <span>{{ post.date | date: "%b %-d, %Y" }}</span>
          <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
        </li>
      {%- endfor -%}
    </ul>
  {%- endif -%}
</div>
```

**Validation**:
```bash
bundle exec jekyll build
```
- `_site/index.html` lists only English posts.
- `_site/es/index.html` lists only Spanish posts.

---

## Step 6: `_data/navigation.yml` — Site Navigation

Create `_data/navigation.yml`:
```yaml
main:
  - title: "Home"
    url: /
  - title: "About"
    url: /about/
```

**Validation**:
```bash
bundle exec jekyll build
```
MM masthead should display "Home" and "About" navigation links.

---

## Step 7: New Blog Post — MM Integration Documentation

Create the English documentation post required by FR-011 and SC-007.

**File path**: `_posts/2026/05/08/2026-05-08-minimal-mistakes-integration.md`

**Minimum required front matter**:
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

**Content must cover**:
- gem installation (`minimal-mistakes-jekyll`)
- `_config.yml` changes (theme key, skin, exclusion list)
- Layout override strategy (`_layouts/default.html`, `_includes/head/custom.html`)
- Language switcher preservation
- Rollback path

**Validation**:
```bash
bundle exec jekyll build
```
The new post must appear in the English post listing at `/` with the correct date.

---

## Step 8: Full Build Validation

Run a clean build and verify all acceptance criteria:
```bash
bundle exec jekyll build --trace
```

**Checklist**:
- [ ] Build completes without errors or unexpected warnings.
- [ ] MM theme styling (masthead, fonts, layout) is visible on all page types.
- [ ] English routes (`/`, `/about/`, post URLs) render correctly.
- [ ] Spanish routes (`/es/`, `/es/about/`) render correctly with the same theme.
- [ ] Language switcher is visible and functional on home, post, and about page types.
- [ ] Switching from an English page with a translation lands on the correct Spanish equivalent.
- [ ] Switching from a page without a translation shows the unavailable-translation fallback.
- [ ] `<head>` includes correct hreflang tags on pages with `translation_key`.
- [ ] No `/es/assets/css/main.css` is generated (MM assets excluded from Polyglot).
- [ ] MM masthead displays "Home" and "About" navigation links.
- [ ] New English documentation post is listed at `/` under the correct date.
- [ ] 0 regression failures against FR-002, FR-003, FR-004, FR-005.

---

## Rollback Path

To restore the prior `minima` theme without losing any multilingual content or routing:

1. **Gemfile**: Replace `gem "minimal-mistakes-jekyll"` with `gem "minima", "~> 2.5"`.
2. **`_config.yml`**: Restore `theme: minima`; remove `minimal_mistakes_skin`, `breadcrumbs`,
   and any MM-specific keys. Restore minima asset entries to `exclude_from_localization`.
3. **Layouts**: Remove or restore the project's `_layouts/default.html` and `_layouts/home.html`.
4. **Includes**: Remove `_includes/head/custom.html`.
5. **Data**: Remove or archive `_data/navigation.yml`.
6. Run `bundle install` and `bundle exec jekyll build` to verify.

This rollback preserves all bilingual content files, routing configuration, and multilingual
includes — only the visual theme and theme-specific config keys are reverted.

