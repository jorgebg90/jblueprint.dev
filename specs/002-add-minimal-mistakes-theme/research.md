# Research: Add Minimal Mistakes Theme

**Phase**: 0 | **Plan**: [plan.md](./plan.md) | **Spec**: [spec.md](./spec.md)

All NEEDS CLARIFICATION items from Technical Context are resolved below. Each decision entry
follows the format: Decision → Rationale → Alternatives Considered.

---

## R-001: Installation Method — Gem vs. `remote_theme`

**Decision**: Use the `minimal-mistakes-jekyll` Ruby gem installed via Bundler.

**Rationale**:
- Gem installation gives deterministic version pinning through `Gemfile.lock`, consistent with
  existing project practice (`jekyll ~> 4.4.1`, `jekyll-polyglot ~> 1.8`).
- The project uses Jekyll 4.4.1 directly (not the `github-pages` meta-gem), so there is no
  GitHub Pages gem-version constraint that would force `remote_theme`.
- `remote_theme` (via `jekyll-remote-theme` plugin) fetches from GitHub on every build,
  introducing a network dependency and non-reproducible builds.
- The gem is published as `minimal-mistakes-jekyll` on RubyGems.org and is the first-party
  distribution channel documented by Minimal Mistakes.

**Alternatives considered**:
- `remote_theme: mmistakes/minimal-mistakes`: Rejected — network-dependent, non-reproducible,
  and adds a new plugin dependency (`jekyll-remote-theme`) not otherwise needed.
- Copying MM source files directly into the repository: Rejected — non-maintainable, deviates
  from standard Jekyll theme gem distribution, and conflicts with constitution principle III.

**References**: [MM Quick-Start Guide](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)

---

## R-002: Polyglot Compatibility — Asset Exclusion

**Decision**: Add all Minimal Mistakes–generated static assets to `exclude_from_localization`
in `_config.yml`.

**Rationale**:
`jekyll-polyglot` processes every site file and generates localized copies. MM generates CSS
and JS bundles at predictable paths (`/assets/css/main.css`, `/assets/js/main.min.js`). If
these are processed by Polyglot, duplicate copies are created at `/es/assets/css/main.css`
etc., causing broken asset references in the generated site and unnecessary build output.

**Paths to add to `exclude_from_localization`**:
```yaml
exclude_from_localization:
  # Remove minima-specific entries no longer applicable:
  # - assets/main.css
  # - assets/main.css.map
  # - assets/minima-social-icons.svg
  # Add MM-generated asset paths:
  - assets/css/main.css
  - assets/js/main.min.js
```

**Minima entries to remove**: The existing exclusion list includes `assets/main.css`,
`assets/main.css.map`, and `assets/minima-social-icons.svg`. These paths are minima-specific
and will not exist after the theme swap; they should be removed to keep the list accurate.

**Alternatives considered**:
- Relying on `parallel_localization: true` alone to avoid asset duplication: Rejected —
  the issue is that Polyglot generates locale-prefixed copies of asset URLs, not a
  parallelism concern.
- Manually overriding asset URLs in layout templates: Rejected — more fragile than the
  exclusion-list approach and requires touching multiple template files.

---

## R-003: Language Switcher Integration — Injection Strategy

**Decision**: Use two targeted injection points:

1. **`_includes/head/custom.html`** (MM-native extension point, new file) →
   calls `{% include hreflang-links.html %}` to insert hreflang `<link>` tags into `<head>`.
2. **`_layouts/default.html`** (project override of MM's root layout) →
   injects `{% include language-switcher.html %}` and `{% include translation-feedback.html %}`
   into the page body, immediately after MM's masthead include.

**Rationale**:
- MM's `_includes/head/custom.html` is the documented, stable extension point specifically
  designed for project-level `<head>` injections. Using it for hreflang tags keeps the
  footprint minimal — only one new file, no modification of MM's own `head.html`.
- The language switcher is a persistent body UI element that must appear on every page type.
  MM does not have a native multi-locale switcher. The only reliable way to inject a body
  element across all MM layouts (single, page, archive, home) is to override the root
  `_layouts/default.html`, which all other MM layouts inherit from via `layout: default`.
- This approach limits override footprint to one root layout file rather than requiring
  individual overrides of `single`, `page`, `archive`, `home`, etc.

**`_layouts/default.html` override structure**:
The project's `default.html` replicates MM's documented structure — `{% include head.html %}`,
`{% include_cached masthead.html %}`, main content area, `{% include footer.html %}` — and
inserts the language switcher and translation feedback between the masthead and the main
content. The `language-session.js` script tag is preserved.

**Alternatives considered**:
- Override `_includes/masthead.html` only: Rejected — masthead carries site branding and
  navigation semantics; injecting a language control there creates semantic mismatch and
  higher visual regression risk.
- Override each individual MM layout (`single`, `page`, `archive`, `home`):
  Rejected — more files to maintain; any new MM layout type would require yet another override.
- Use MM's sidebar for language switching: Rejected — sidebar is opt-in per page via front
  matter; language switcher must appear globally without per-page configuration.

---

## R-004: MM `locale` Config Key vs. Polyglot `site.active_lang`

**Decision**: Set MM's `locale` to a static BCP47 string (e.g., `en-US`) in `_config.yml`.
Do not attempt dynamic locale injection. Continue using Polyglot's `site.active_lang` for all
runtime locale detection in template logic.

**Rationale**:
- MM's `locale` key drives its own internal UI strings (date formats, accessibility labels in
  MM's own includes). It is read once at config load time — it is not a per-request variable
  and cannot be made dynamic through normal Jekyll/Polyglot mechanisms.
- Polyglot sets `site.active_lang` correctly per build-pass (`en` vs. `es`). All existing
  templates already use `page.lang | default: site.active_lang` — this is correct and
  requires no change.
- Attempting to synchronize MM's `locale` with Polyglot's active language would require
  either multiple `_config.yml` files per locale (not a supported Polyglot pattern) or
  complex Liquid overrides of MM's internal includes — both out of scope and against
  constitution principle III.
- MM's internally localized UI strings (e.g., "Posted in", date formats) will remain in
  English regardless of page locale. This is an accepted known limitation, not a regression
  against current behavior (minima did not provide locale-aware UI strings either).

**Alternatives considered**:
- Override MM include files to swap locale strings based on `site.active_lang`:
  Possible for targeted strings, but adds ongoing maintenance burden. Deferred to a future
  feature if locale-specific MM UI strings become a priority.
- Provide per-language `_config.yml` overlays: Not supported by Polyglot's build model.

---

## R-005: Breadcrumbs — Behavior Under Polyglot Routing

**Decision**: Disable MM breadcrumbs globally (`breadcrumbs: false` in `_config.yml`).

**Rationale**:
- MM's breadcrumb implementation uses `page.url` directly. Under Polyglot's path-prefix
  routing, Spanish pages have `/es/`-prefixed URLs, but MM's breadcrumb logic has no
  awareness of locale prefix stripping — breadcrumb links for `/es/jekyll/...` would navigate
  to `/jekyll/...` (default locale), silently dropping the visitor's locale context.
- No functional requirement in the spec calls for breadcrumbs. Disabling them eliminates a
  potential regression at zero functional cost.
- Constitution principle V (small-scope changes) supports not introducing untested behaviors.

**Alternatives considered**:
- Custom locale-aware breadcrumb include using `replace_first: '/es/', '/'` logic: Feasible
  but adds complexity with no spec justification. Can be a standalone future feature.
- Per-page breadcrumb opt-in (`breadcrumbs: true` in individual front matter): Requires
  adding front matter to every English-only page. Maintenance overhead without a clear
  requirement.

---

## R-006: `_posts` Directory Organization

**Decision**: Adopt `_posts/<year>/<month>/<day>/YYYY-MM-DD-title.md` for all new posts
created by this feature. Existing posts at root `_posts/` level and in the current month/day
structure are not retroactively migrated.

**Rationale**:
- Jekyll officially supports arbitrary subdirectory nesting under `_posts/`. Only the filename
  (`YYYY-MM-DD-title.md`) determines the post's date and slug; directory structure is purely
  organizational.
- FR-012 and SC-008 require this hierarchy for new posts in scope.
- Retroactively migrating existing posts would change their published URLs (from
  `/jekyll/update/2026/05/08/welcome-to-jekyll.html` to the same, but the file path change
  could cause Polyglot to regenerate with different internal IDs). URL changes break inbound
  links and fall outside the spec's stated scope.
- The existing `_posts/05/08/` posts use a month/day pattern (no year directory). New posts
  introduced by this feature will use the full `<year>/<month>/<day>/` hierarchy as specified.

**Alignment note**: The existing `_posts/05/08/` pattern is not `<year>/<month>/<day>` —
it omits the year directory. This discrepancy predates this feature. New posts will set the
correct precedent; retroactive normalization is out of scope.

**Alternatives considered**:
- Migrate all existing posts to `<year>/<month>/<day>/`: Rejected — URL change risk, outside
  spec scope, and no functional benefit for the theme integration.
- Flat `_posts/` (no subdirectories): Rejected — explicitly excluded by FR-012 and SC-008.

---

## R-007: MM Navigation — `_data/navigation.yml`

**Decision**: Create `_data/navigation.yml` with a `main` list for primary page links (e.g.,
Home, About). The language switcher remains in its own dedicated `language-switcher.html`
include and is injected separately via the layout override.

**Rationale**:
- MM's masthead reads from `site.data.navigation.main`. Without this file, MM renders no
  navigation links in the header, leaving the site without a usable top-bar menu.
- MM's navigation is a static `title`/`url` list — it does not support Liquid expressions
  or dynamic locale-aware URL generation. Mixing language switching into MM's nav structure
  would require either hardcoding both locale URLs (maintenance burden) or custom Liquid in
  a template that isn't designed for it.
- Keeping the language switcher separate preserves the existing, tested routing logic and
  avoids complicating MM's navigation data format.

**Alternatives considered**:
- Embed language links inside `navigation.yml` alongside primary nav items: Rejected —
  MM nav URLs are static; locale-aware link generation is not possible within this structure.
- Use MM's sidebar navigation for language switching: Rejected — sidebar is per-page opt-in
  via front matter; language control must appear globally.

---

## Post-Design Constitution Re-check

After Phase 1 design, all five constitution principles remain satisfied:

| Principle | Status | Notes |
|-----------|--------|-------|
| I. English-only implementation | ✅ Pass | All layout/include/config/data changes are in English |
| II. Jekyll-first compliance | ✅ Pass | Gem-based theme; standard `_layouts/`/`_includes/` overrides |
| III. Minimal, conventional structure | ✅ Pass | No non-standard directories; `_includes/head/` is MM-documented |
| IV. Build validation | ✅ Pass | Explicit `bundle exec jekyll build` steps in `quickstart.md` |
| V. Traceable, small-scope changes | ✅ Pass | Each integration step is independently committable |

