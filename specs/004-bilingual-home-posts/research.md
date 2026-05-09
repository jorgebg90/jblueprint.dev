# Phase 0 Research: Bilingual Home and Separated Posts Navigation

## Decision 1: Home routes remain localized landing pages with banner + intro only

- **Decision**: Keep localized home pages at `/` and `/es/` using conventional Jekyll pages/front matter, and remove inline posts-list responsibility from home surfaces.
- **Rationale**: This directly satisfies `FR-001`..`FR-003` and preserves clean landing-page intent without introducing non-standard structure.
- **Alternatives considered**:
  - Keep inline posts list on home plus a posts page: rejected due to mixed responsibilities and weaker IA clarity.
  - Introduce a custom plugin/layout fork: rejected because default layouts and page-level changes are sufficient.

## Decision 2: Dedicated localized posts routes are canonical discovery surfaces

- **Decision**: Use `/posts/` (EN) and `/es/posts/` (ES) as dedicated posts sections with localized labels and stable translation pairing.
- **Rationale**: Meets `FR-004` and `FR-005`, and creates predictable route parity for language switching.
- **Alternatives considered**:
  - Single posts route with query/path toggles: rejected for weaker locale-route clarity.
  - Archive-only discovery: rejected due to low discoverability from primary navigation.

## Decision 3: Listing eligibility is metadata-driven and locale-strict

- **Decision**: Localized posts pages include only entries where `post.lang == site.active_lang`; entries with missing/invalid `lang` are excluded and flagged for editorial correction.
- **Rationale**: Ensures `FR-006` and `FR-008`, and avoids mixed-language rendering from shared `site.posts` collections.
- **Alternatives considered**:
  - Infer locale from URL/path only: rejected because metadata remains authoritative for post language.
  - Render unknown-language posts as fallback: rejected because it violates locale integrity requirements.

## Decision 4: Deduplication is translation-key aware with safe fallback for incomplete metadata

- **Decision**: Prevent duplicate logical entries within a locale using `translation_key`; posts without `translation_key` remain eligible as single-locale entries; same-locale `translation_key` collisions render one deterministic winner and flag the issue.
- **Rationale**: Covers `FR-007` and edge-case rules for missing/colliding translation metadata without breaking rendering.
- **Alternatives considered**:
  - Require `translation_key` for all posts: rejected because legacy/partial content must still be listable.
  - Show all collisions and rely on editors later: rejected because it creates visible duplicates.

## Decision 5: Language switching uses equivalent-route first, default-locale fallback second

- **Decision**: Language switch resolves to counterpart page/post when available; otherwise fallback is a valid default-language route (`/`, `/posts/`, or default-language post/index as defined by context) with translation-unavailable feedback in active UI language.
- **Rationale**: Implements `FR-009`..`FR-011` and protects continuity when translations are missing.
- **Alternatives considered**:
  - Hard 404 on missing counterpart: rejected as broken UX.
  - Silent fallback without feedback: rejected because user loses context and cannot distinguish missing translation from normal navigation.

## Decision 6: Published routing must normalize unsupported locale-prefixed paths

- **Decision**: In feature scope, unresolved/unsupported locale-prefixed routes normalize to valid default-language routes rather than dead-end pages.
- **Rationale**: Satisfies `FR-012` and aligns with static-host fallback resilience expectations.
- **Alternatives considered**:
  - Local-only verification of routing: rejected because published behavior can differ.
  - Runtime redirect service: rejected to keep static deployment model and plugin surface minimal.

## Decision 7: Empty localized posts states must remain navigable

- **Decision**: When no eligible posts exist for active locale, show localized empty-state messaging and preserve Home/Posts navigation actions.
- **Rationale**: Satisfies `FR-013` and avoids dead-end experiences in low-content or transitional states.
- **Alternatives considered**:
  - Hide posts page when empty: rejected because it causes inconsistent IA and broken navigation expectations.
  - Show posts from other locale as fallback content: rejected because it violates locale filtering requirements.
