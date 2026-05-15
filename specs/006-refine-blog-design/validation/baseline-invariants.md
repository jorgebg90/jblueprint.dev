# Scope Guardrails & Invariants Checklist

**Purpose**: Document non-negotiable constraints for blog design refinement.  
**Created**: 2026-05-11  
**Status**: ACTIVE

## Invariant 1: No JavaScript Changes

- [ ] No changes to 404 fallback redirect logic
- [ ] No changes to language switcher behavior
- [ ] No changes to translation feedback banner behavior
- [ ] No new JavaScript files added
- [ ] Existing script blocks remain unchanged except for visual styling context

**Evidence**: Git diff shows no .js file changes, no script block modifications beyond HTML structure.

---

## Invariant 2: Route & Permalink Preservation

- [ ] Home EN route remains `/`
- [ ] Home ES route remains `/es/`
- [ ] About EN route remains `/about/`
- [ ] About ES route remains `/es/about/`
- [ ] 404 fallback permalink remains `/404.html`
- [ ] No front matter permalink changes
- [ ] No Jekyll config route/base URL changes

**Evidence**: Git diff of `site/*/index.markdown`, `site/*/about.markdown`, `404.html` shows no permalink changes.

---

## Invariant 3: No Plugin or Dependency Additions

- [ ] No new gems added to Gemfile
- [ ] No new npm packages installed
- [ ] No new Jekyll plugins configured in _config.yml
- [ ] Theme remains minimal-mistakes-jekyll with no override plugins
- [ ] Build tooling (Bundle, Jekyll) versions unchanged

**Evidence**: Gemfile unchanged, _config.yml plugins section unchanged, no package.json additions.

---

## Invariant 4: Bilingual Content Architecture Preserved

- [ ] Front matter `lang: en/es` attributes unchanged
- [ ] Front matter `translation_key` attributes unchanged
- [ ] Content directory structure (site/en/, site/es/) unchanged
- [ ] Sidebar content structure and metadata unchanged
- [ ] Post listing logic and language filtering unchanged

**Evidence**: `site/en/`, `site/es/` directory listings show no structural changes. Front matter compare shows only visual class additions, no language/content changes.

---

## Invariant 5: SEO Metadata & Performance Baseline Non-Regression

- [ ] Meta title/description attributes unchanged
- [ ] Open Graph tags unchanged
- [ ] Canonical links unchanged
- [ ] No new render-blocking CSS/JS imports
- [ ] No external font or script CDN additions
- [ ] Page weight must not increase by >5% for in-scope pages

**Evidence**: Build logs show no new asset imports. Lighthouse baseline comparison shows no Core Web Vitals regression.

---

## Execution Checklist

Complete the following before Phase 2:

- [ ] Review and sign off on all 5 invariants above
- [ ] Confirm baseline snapshot captured for SEO/performance
- [ ] Confirm PageVariant matrix complete in variant-matrix.md
- [ ] Confirm contrast report template ready in contrast-report.md

**Checkpoint**: If all items above are checked, Phase 1 is complete and Phase 2 can begin.

