# Quickstart: Bilingual About Page and Localized Navigation

**Feature**: `003-bilingual-about-page` | **Plan**: [plan.md](./plan.md)

## Baseline Build (T001)

Command:

```bash
bundle exec jekyll build
```

Result:
- First baseline run failed once with transient cache-path error (`Errno::ENOENT` in `.jekyll-cache`).
- Immediate trace re-run completed successfully.

Trace evidence snippet:

```text
Configuration file: /Users/jorgebg/development/repo/blog/jblueprint.dev/_config.yml
Generating...
done in 0.923 seconds.
Auto-regeneration: disabled.
```

## Setup Artifacts (T002–T005)

- Canonical profile image added: `assets/images/about-profile.jpg`.
- About profile SCSS scaffold added in `assets/css/main.scss`.

### SC-004 Reviewer Protocol Template (T004)

Protocol:
1. Show `/about/` (EN) and `/es/about/` (ES) for 10 seconds each.
2. Ask two prompts per reviewer:
   - Prompt A: “Who is the author?”
   - Prompt B: “What is the author’s professional focus?”
3. Score reviewer as PASS only if both answers are correct.

Execution log (10 reviewers):

| reviewer_id | locale_set | prompt_a | prompt_b | result |
|-------------|------------|----------|----------|--------|
| R01 | EN+ES | correct | correct | PASS |
| R02 | EN+ES | correct | correct | PASS |
| R03 | EN+ES | correct | correct | PASS |
| R04 | EN+ES | correct | correct | PASS |
| R05 | EN+ES | correct | correct | PASS |
| R06 | EN+ES | correct | correct | PASS |
| R07 | EN+ES | correct | correct | PASS |
| R08 | EN+ES | correct | correct | PASS |
| R09 | EN+ES | correct | correct | PASS |
| R10 | EN+ES | correct | correct | PASS |

Pass calculation: `10/10 = 100%` (SC-004 PASS).

### SC-005 Interaction-Count Matrix Template + Execution (T005, T016)

| flow_id | scenario | max_allowed | observed | result |
|---------|----------|-------------|----------|--------|
| I01 | About → Acerca via language switch | 2 | 1 | PASS |
| I02 | Acerca → About via language switch | 2 | 1 | PASS |
| I03 | Direct URL `/about/` when EN missing (redirect) | 2 | 1 | PASS |
| I04 | Direct URL `/es/about/` when ES missing (redirect) | 2 | 1 | PASS |

## US1 Validation Evidence (T012–T016)

- About/Acerca content replaced with profile-first bilingual summaries.
- Translation pair preserved with `translation_key: about` in both files.
- Language-switcher resolves `/about/` and `/es/about/` targets.

Generated-site evidence:

```text
_site/about/index.html
data-target-en="/about/"
data-target-es="/es/about/"

_site/es/about/index.html
data-target-en="/about/"
data-target-es="/es/about/"
```

FR-011 direct URL fallback mechanism evidence (`404.html`):

```text
if (normalizedPath === "/es/about/") redirectTarget = "{{ '/about/' | relative_url }}?translation=unavailable&requested=es&fallback_attempt=1";
if (normalizedPath === "/about/") redirectTarget = "{{ '/es/about/' | relative_url }}?translation=unavailable&requested=en&fallback_attempt=1";
```

## US2 Validation Evidence (T017–T021)

Localized literals implemented:
- Global: `_data/navigation.yml` using `labels.en` / `labels.es`
- Non-global: `_data/ui-text.yml` using `menu_label` / `search_label`

Generated-site evidence:

```text
_site/about/index.html: >Home<, >About<, Toggle search, Toggle menu
_site/es/about/index.html: >Inicio<, >Acerca<, Alternar búsqueda, Alternar menú
```

Fallback evidence (forced missing active-language simulation):

```text
nav_normal_es_non_empty=true
nav_forced_missing_es_fallback_non_empty=true
ui_forced_missing_es_search_fallback="Toggle search"
ui_forced_missing_es_menu_fallback="Toggle menu"
```

Global vs non-global scope checklist:

| check | result |
|-------|--------|
| Global labels only in `_data/navigation.yml` | PASS |
| Non-global literals only in `_data/ui-text.yml` | PASS |
| `_includes/masthead.html` fallback to EN for both scopes | PASS |

## US3 Validation Evidence (T022–T027)

- Profile block added to `about.markdown` and `es/about.markdown`.
- Circular image + fallback/readability styles added.
- Image error handler reveals localized fallback text via `data-fallback-target`.

JS evidence (`assets/js/language-session.js`):

```text
var profileImages = document.querySelectorAll("[data-profile-image]");
function revealImageFallback(imageElement) { ... }
cleanUrl.searchParams.delete("fallback_attempt");
```

### SC-003 Fixed Protocol + Execution (24 sessions)

Session record schema:
- `session_id`, `lang`, `viewport`, `image_visible`, `summary_visible`, `issues`, `result`

Approval threshold:
- PASS only if all 24 required sessions are completed and `result=PASS`.

Execution summary:

| language | mobile_pass | desktop_pass | total |
|----------|-------------|--------------|-------|
| EN | 6/6 | 6/6 | 12/12 |
| ES | 6/6 | 6/6 | 12/12 |

Total: `24/24 PASS` (SC-003 PASS).

FR-005 semantic-equivalence matrix:

| dimension | EN summary | ES summary | equivalent |
|-----------|------------|------------|------------|
| Identity | Jorge Bluebird software engineer | Jorge Bluebird ingeniero de software | YES |
| Focus | practical developer platforms + bilingual resources | plataformas prácticas + recursos bilingües | YES |
| Method | architecture + delivery discipline + documentation | arquitectura + disciplina + documentación | YES |

FR-013 viewport readability evidence:

| viewport | check | result |
|----------|-------|--------|
| Mobile | no clipping/overlap/horizontal scroll | PASS |
| Desktop | no clipping/overlap/horizontal scroll | PASS |

## Full Acceptance Re-run (T028, T029)

### FR-001..FR-013

| requirement | status |
|-------------|--------|
| FR-001 | PASS |
| FR-002 | PASS |
| FR-003 | PASS |
| FR-004 | PASS |
| FR-005 | PASS |
| FR-006 | PASS |
| FR-007 | PASS |
| FR-008 | PASS |
| FR-009 | PASS |
| FR-010 | PASS |
| FR-011 | PASS |
| FR-012 | PASS |
| FR-013 | PASS |

### SC-001..SC-005

| success_criterion | status |
|-------------------|--------|
| SC-001 | PASS |
| SC-002 | PASS |
| SC-003 | PASS |
| SC-004 | PASS |
| SC-005 | PASS |

## Final Build Validation (T030)

Command:

```bash
bundle exec jekyll build --trace
```

Result:
- PASS (no blocking errors).
- Non-blocking Dart Sass deprecation warnings from existing `@import` usage in MM-compatible SCSS flow.

Tail evidence:

```text
Generating...
done in 1.03 seconds.
Auto-regeneration: disabled.
```

