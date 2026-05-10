# Quickstart: Bilingual Home and Separated Posts Navigation

## Prerequisites

- Ruby/Bundler environment available.
- Dependencies installed (`bundle install`).
- Current branch: `004-bilingual-home-posts`.

## Implementation Steps

1. Update localized home pages (`index.markdown`, `es/index.markdown`) so they render localized banner + intro only.
2. Ensure home pages do not render inline posts lists.
3. Define dedicated localized posts routes/pages at `/posts/` and `/es/posts/` with shared translation pairing.
4. Update top-level navigation data to expose localized Home/Posts labels and links for each locale.
5. Implement/verify posts listing logic so each locale list is `lang`-strict and deduplicated by `translation_key`.
6. Implement/verify safe behavior for missing metadata (`lang`, `translation_key`) and same-locale translation-key collisions.
7. Ensure language switch resolves to equivalents when available, otherwise safe default-language fallback with localized translation-unavailable feedback.
8. Ensure empty localized posts pages display localized empty-state messaging and keep navigation usable.

## Validation Steps

1. Run build gate:

   ```bash
   bundle exec jekyll build
   ```

2. Validate canonical routes:
   - EN home: `/`
   - ES home: `/es/`
   - EN posts: `/posts/`
   - ES posts: `/es/posts/`

3. Validate home rendering:
   - Both home variants show localized banner + intro.
   - No inline posts listing is rendered on home.

4. Validate navigation behavior:
   - EN labels: `Home`, `Posts`
   - ES labels: `Inicio`, `Publicaciones`
   - Locale context remains stable under repeated Home/Posts navigation.

5. Validate localized listing rules:
   - EN posts page shows only `lang: en` entries.
   - ES posts page shows only `lang: es` entries.
   - Missing/invalid `lang` entries are excluded without render failure.
   - No duplicate logical entries per locale from translation pairs.
   - Missing `translation_key` entries remain visible only in their own locale list.
   - Same-locale `translation_key` collision renders one entry and records issue for editorial correction.

6. Validate switch/fallback behavior:
   - Equivalent page/post exists: language switch lands on counterpart route.
   - Equivalent missing: resolve to valid default-language fallback route.
   - Fallback shows translation-unavailable feedback in active UI language.

7. Validate empty-state behavior:
   - If locale has zero eligible posts, localized empty-state message is shown.
   - Home/Posts navigation remains available.

8. Validate published-like fallback routes:
   - Unsupported/unresolved locale-prefixed requests in scope resolve to valid default-language routes.
   - Covered fallback cases do not end in dead-end rendering.

9. Validate production navigation directly against the live domain:

   ```bash
   python3 scripts/validate_production_navigation.py --base-url "https://jblueprint.dev"
   ```

   - Command must finish with `Result: PASSED`.
   - Any failed route/target must block completion until fixed and redeployed.

## Completion Criteria

- Build succeeds with no Jekyll errors.
- Home pages are localized landing surfaces (banner + intro only).
- Posts are discoverable only through dedicated localized posts pages.
- Listing, deduplication, metadata edge-case handling, and fallback behavior match the contract.
