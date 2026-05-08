# Quickstart: Multilingual Support (en/es)

## Prerequisites

- Ruby and Bundler available in local environment.
- Project dependencies installed.

## 1) Install dependencies

```bash
cd /Users/jorgebg/development/repo/blog/jblueprint.dev
bundle install
```

## 2) Build validation (mandatory gate)

```bash
cd /Users/jorgebg/development/repo/blog/jblueprint.dev
bundle exec jekyll build
```

Expected result: successful build with generated multilingual routes and no front matter errors.

## 3) Run local server for behavior checks

```bash
cd /Users/jorgebg/development/repo/blog/jblueprint.dev
bundle exec jekyll serve
```

## 4) Validate key user flows (US1 + US2)

- Open default locale home (no prefix):
  - `http://127.0.0.1:4000/`
- Open Spanish home (prefixed):
  - `http://127.0.0.1:4000/es/`
- Validate equivalent-page switching:
  - Open `http://127.0.0.1:4000/about/`.
  - Use language selector to move to Spanish and confirm `http://127.0.0.1:4000/es/about/`.
- Validate context-preserving post switching:
  - Open `http://127.0.0.1:4000/jekyll/update/2026/05/08/welcome-to-jekyll.html`.
  - Switch to Spanish and confirm `http://127.0.0.1:4000/es/jekyll/update/2026/05/08/welcome-to-jekyll.html`.
- Validate missing translation feedback path:
  - Open any page without Spanish counterpart (or use a temporary test page).
  - Switch to Spanish and confirm user remains on a valid page with visible "Translation not available" feedback.
- Validate unsupported locale behavior:
  - Request `/fr/about/` and confirm hosting rule redirects to `/about/` with `301`.

## 5) Validate SEO discoverability contract (T031)

For bilingual pages, inspect generated HTML `<head>` and confirm:

- Reciprocal `hreflang="en"` and `hreflang="es"` links.
- One `hreflang="x-default"` link to default-locale URL.

Quick local check against generated output:

```bash
cd /Users/jorgebg/development/repo/blog/jblueprint.dev
grep -n "hreflang" _site/about/index.html
grep -n "hreflang" _site/es/about/index.html
```

For single-language pages, confirm no alternate links are emitted for missing translations.

## 6) Validate session-only language preference

- Select language in browser and navigate to another page in the same tab/session; preference remains effective.
- Close the tab/session and open a new session; behavior resets to default locale.

## 7) Maintainer validation flow (US3)

When adding or editing multilingual content:

1. Ensure front matter includes `lang` and `translation_key`.
2. Keep English default routes unprefixed and Spanish under `/es/` via Polyglot.
3. Run `bundle exec jekyll build`.
4. Verify both language routes and `hreflang` output for each bilingual document.
5. Update rollback/workflow docs if plugin/config strategy changes.

## Troubleshooting

- If `_config.yml` changes are not reflected, restart `jekyll serve`.
- If plugin load fails, verify Gemfile entry and run `bundle install` again.
- If redirects cannot be fully verified in static server mode, validate generated output paths in `_site/` and hosting-level redirect rules used in deployment.
