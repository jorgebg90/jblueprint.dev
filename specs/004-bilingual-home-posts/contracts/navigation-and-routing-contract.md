# Contract: Bilingual Navigation and Routing

## Scope

Defines user-facing route, navigation, listing, language-switch, and fallback behavior for bilingual home and dedicated posts sections.

## 1. Route Contract

### Home

- EN home: `/`
- ES home: `/es/`
- Shared logical identity: `translation_key: home`
- Contract rule: home pages show localized banner + intro and no inline posts list.

### Posts Index

- EN posts index: `/posts/`
- ES posts index: `/es/posts/`
- Shared logical identity: `translation_key: posts-index`

## 2. Navigation Contract (Top-Level/Masthead)

Required localized labels:

- Home
  - EN: `Home`
  - ES: `Inicio`
- Posts
  - EN: `Posts`
  - ES: `Publicaciones`

Expected behavior:

- EN UI context resolves Home/Posts links to EN routes.
- ES UI context resolves Home/Posts links to ES-prefixed routes.
- Repeated Home/Posts navigation in one locale must not unexpectedly cross to the other locale.

## 3. Localized Posts Listing Contract

Eligibility and rendering rules:

- EN posts list includes only entries with `post.lang == 'en'`.
- ES posts list includes only entries with `post.lang == 'es'`.
- Entries with missing/invalid `lang` are excluded and must not break page rendering.
- Deduplication is enforced per locale by `translation_key`.
- Entries missing `translation_key` are eligible only as standalone locale entries (no synthetic pairing).
- If same-locale `translation_key` collision occurs, render one deterministic winner and flag for editorial correction.

Expected result:

- No mixed-language visible entries.
- No duplicate logical entries within a single locale list.

## 4. Empty-State Contract

When a localized posts page has zero eligible entries:

- Show localized empty-state message in active locale.
- Keep Home/Posts navigation visible and usable.

## 5. Language Switch Contract

When counterpart exists:

- EN -> ES switch resolves to equivalent ES route in one action.
- ES -> EN switch resolves to equivalent EN route in one action.

When counterpart does not exist:

- Resolve to valid default-language fallback route according to context:
  - page fallback to default-language page equivalent-safe route,
  - post fallback to default-language translated post when available,
  - otherwise default-language posts index.
- Show translation-unavailable feedback message localized to active UI language.

## 6. Published Fallback Contract

In published hosting/CDN behavior for feature scope:

- Unsupported/unresolved locale-prefixed routes resolve to valid default-language routes.
- Missing translation scenarios resolve safely without dead-end rendering.
- This behavior must avoid 404 outcomes for the covered fallback cases.

## 7. Out-of-Scope Protection

This contract does not alter unrelated site sections; feature behavior is limited to home routes, posts index routes, localized listing logic, and language-switch/fallback flows for those surfaces.
