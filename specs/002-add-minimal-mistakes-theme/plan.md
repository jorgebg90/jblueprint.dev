# Implementation Plan: Add Minimal Mistakes Theme

**Branch**: `002-add-minimal-mistakes-theme` | **Date**: 2026-05-08 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/002-add-minimal-mistakes-theme/spec.md`

## Summary

Migrate the Jekyll 4.4.1 blog at `jblueprint.dev` from the default `minima` theme to
`minimal-mistakes-jekyll` (gem-based), while preserving the full bilingual (`en`/`es`) routing
behavior provided by `jekyll-polyglot`. The integration requires:

1. Replacing the `minima` gem with `minimal-mistakes-jekyll` in `Gemfile` and `_config.yml`.
2. Adding `_includes/head/custom.html` — the MM-native extension point — to inject hreflang metadata.
3. Overriding `_layouts/default.html` to inject the existing language switcher and
   translation-feedback components into MM's root layout.
4. Overriding `_layouts/home.html` to retain bilingual post filtering (`site.active_lang`).
5. Adding MM-specific static assets to `exclude_from_localization` to prevent Polyglot from
   generating unnecessary localized copies.
6. Creating `_data/navigation.yml` for MM's masthead navigation.
7. Organizing new posts under `_posts/<year>/<month>/<day>/`.
8. Publishing one new English blog post documenting the integration steps (FR-011, SC-007).

## Technical Context

**Language/Version**: Ruby 3.x, Jekyll 4.4.1, Bundler  
**Primary Dependencies**: `minimal-mistakes-jekyll` (latest stable, replaces `minima ~> 2.5`),
`jekyll-polyglot ~> 1.8`, `jekyll-feed ~> 0.12`  
**Storage**: Static files — Markdown content, YAML data files, Liquid templates  
**Testing**: `bundle exec jekyll build` (local build validation required by constitution IV)  
**Target Platform**: macOS development; GitHub Pages–compatible static site output  
**Project Type**: Jekyll static blog (single-project flat layout)  
**Performance Goals**: Jekyll build time regression < 10% vs. current `minima` baseline  
**Constraints**: No non-Jekyll runtime services; all implementation artifacts in English;
MM's `locale` config key must not override Polyglot's `site.active_lang` runtime behavior  
**Scale/Scope**: Two locales (`en` default, `es` with `/es/` prefix); existing pages and
posts remain in scope; one new English documentation post required

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **English-only implementation**: All planned `_config.yml` keys, layout overrides, include
  files, data files, and code comments are in English. Bilingual user-facing blog content is
  explicitly allowed per constitution ("User-facing blog content MAY be multilingual").
- [x] **Jekyll-first compliance**: Theme adopted via official Jekyll gem mechanism; layout and
  include overrides use Jekyll's documented `_layouts/` and `_includes/` directory conventions;
  no non-standard build steps or external tools introduced.
- [x] **Conventional structure**: Gem-based installation (not `remote_theme`);
  `_posts/` subdirectory nesting is a supported Jekyll convention; `_includes/head/custom.html`
  is the Minimal Mistakes–documented extension point. `_layouts/default.html` override is
  justified in `research.md` R-003.
- [x] **Build validation**: `bundle exec jekyll build` is required after each major integration
  milestone and before feature completion (see `quickstart.md` § Validation Steps).
- [x] **Change scope**: Changes split into focused, individually committable increments:
  gem/Gemfile → `_config.yml` → layout overrides → include extension point →
  navigation data → `_posts` organization → documentation post → full validation.

*No constitution violations detected. Complexity Tracking section omitted.*

## Project Structure

### Documentation (this feature)

```text
specs/002-add-minimal-mistakes-theme/
├── plan.md                       # This file (speckit.plan output)
├── research.md                   # Phase 0 output (speckit.plan)
├── data-model.md                 # Phase 1 output (speckit.plan)
├── quickstart.md                 # Phase 1 output (speckit.plan)
├── contracts/
│   ├── front-matter-schema.md    # Phase 1 output
│   └── layout-interface.md       # Phase 1 output
└── tasks.md                      # Phase 2 output (speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
# Jekyll static blog — single-project flat layout

_config.yml                      # Update: theme key, MM skin, author, navigation, exclusions
Gemfile                          # Update: replace minima gem with minimal-mistakes-jekyll

_layouts/
├── default.html                 # Override: MM root layout + language-switcher + translation-feedback
└── home.html                    # Override: bilingual post listing filtered by site.active_lang

_includes/
├── head/
│   └── custom.html              # New: MM extension point — injects hreflang-links.html into <head>
├── hreflang-links.html          # Existing — no change
├── language-switcher.html       # Existing — no change
└── translation-feedback.html    # Existing — no change

_data/
├── locales.yml                  # Existing — no change
├── messages.yml                 # Existing — no change
└── navigation.yml               # New: MM masthead navigation data

assets/
└── js/
    └── language-session.js      # Existing — no change

_posts/
└── 2026/05/08/                  # New pattern: year/month/day hierarchy for posts in this feature
    └── YYYY-MM-DD-title.md      # Jekyll-standard filename convention
```

**Structure Decision**: Single-project flat layout. No new top-level directories are introduced.
Theme integration is additive: `_includes/head/` subdirectory (MM extension point) and
`_data/navigation.yml` are the only net-new paths. All existing custom includes, data files,
and assets are preserved unchanged.
