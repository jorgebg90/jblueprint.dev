# Research: Add Multilingual Support (Spanish and English)

## Decision 1: Use `jekyll-polyglot` as the multilingual engine

- Decision: Integrate `jekyll-polyglot` as the primary localization plugin for route generation and locale context.
- Rationale: The feature explicitly requires Polyglot and it aligns with Jekyll plugin conventions, avoiding a custom build/runtime localization layer.
- Alternatives considered:
  - Maintain two independent Jekyll sites: rejected due to duplicated content/build logic.
  - Custom locale routing without plugin: rejected due to higher maintenance and weaker convention alignment.

## Decision 2: URL strategy = default locale unprefixed, Spanish prefixed (`/es/`)

- Decision: Keep English (`en`) pages at canonical unprefixed routes and publish Spanish (`es`) pages under `/es/`.
- Rationale: Matches spec clarification and minimizes disruption to existing links while preserving explicit locale routing.
- Alternatives considered:
  - Prefix all locales (`/en/` and `/es/`): rejected because it would require broad URL migration.
  - No locale prefixes at all: rejected because it cannot represent bilingual variants cleanly in static routing.

## Decision 3: Fallback behavior for unsupported/missing translation routes

- Decision: Use redirect contracts defined in the feature spec:
  - Unsupported locale prefix -> HTTP 301 to default-locale equivalent.
  - Supported locale path with missing translation -> HTTP 302 to default-locale equivalent with visible feedback.
- Rationale: Preserves valid navigation and provides explicit user communication for missing translations.
- Alternatives considered:
  - Return HTTP 404 for both cases: rejected because it breaks continuity and does not guide users.
  - Always redirect to homepage: rejected because it loses reading context.

## Decision 4: Translation pairing metadata via conventional front matter keys

- Decision: Use explicit per-document metadata for locale and pairing, centered on:
  - `lang`: locale code (`en` or `es`)
  - `translation_key`: stable key shared by variants of the same logical document
- Rationale: Keeps pairing deterministic for switcher/hreflang generation and is maintainable for editors.
- Alternatives considered:
  - Infer pairings only from path/slug: rejected because refactors can break pairing.
  - Maintain a central mapping file only: rejected due to duplication and sync risk.

## Decision 5: Session-only language preference with browser session storage

- Decision: Store user language choice in browser session-scoped storage and apply it only during active session navigation.
- Rationale: Satisfies FR-012 without introducing server-side state or long-lived tracking.
- Alternatives considered:
  - Persistent cookie/localStorage: rejected because requirement mandates session-only persistence.
  - No persistence: rejected because it degrades UX after navigation.

## Decision 6: SEO metadata contract with reciprocal `hreflang` and `x-default`

- Decision: Render reciprocal `hreflang` links for bilingual pages (`en`, `es`) plus `x-default`; omit alternates for missing translations.
- Rationale: Meets discoverability requirements while preventing invalid alternate links.
- Alternatives considered:
  - Emit all locale alternates regardless of availability: rejected as misleading and non-compliant with FR-013.
  - Emit only canonical tags without `hreflang`: rejected because it misses bilingual discoverability requirements.

## Decision 7: Validation workflow remains Jekyll-first

- Decision: Use standard local verification with `bundle exec jekyll build` (mandatory) and route behavior checks using local serve.
- Rationale: Aligns with constitution gate IV and existing contributor workflow.
- Alternatives considered:
  - Add custom external test harness now: rejected to keep first increment small and traceable.

