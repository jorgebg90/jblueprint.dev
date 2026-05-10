# Feature Specification: Bilingual Home Banner/Intro and Localized Posts Navigation

**Feature Branch**: `004-bilingual-home-posts`  
**Created**: 2026-05-09  
**Updated**: 2026-05-09 — Architectural pivot: removed jekyll-polyglot; replaced with custom multilingual solution  
**Status**: Ready for Implementation  
**Input**: User description: "Actualiza la especificación specs/004-bilingual-home-posts/spec.md... Home EN/ES con banner + intro, sección de posts separada, filtrado por idioma sin duplicados, navegación/language-switch robustos con fallback"

## Technical Context *(informational — non-binding)*

This feature is implemented on a Jekyll blog that does **not** use jekyll-polyglot or any third-party multilingual plugin. The multilingual capability is provided by a custom solution built on Jekyll's native features:

- **Locale detection**: determined by the page URL prefix — pages under `/es/` are Spanish; everything else is English.
- **Language identity**: every page and post carries a `lang` front matter field (`en` or `es`) for explicit locale identification.
- **Active-locale variable**: templates use a custom `site_lang` Liquid variable derived from `page.lang`, replacing the polyglot-specific `site.active_lang` global.
- **Localized routes**: each locale page is explicitly authored with a `permalink` set in front matter; there is no automatic locale-variant generation.
- **Spanish pages**: live under the `es/` folder structure, consistent with the existing site layout.

This context informs reviewers and planners that multilingual behavior is fully explicit, predictable, and free of plugin side-effects.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Bilingual home as a clean landing page (Priority: P1)

As a visitor, I want the home page in English and Spanish to show only a localized banner and intro so I can quickly understand the site purpose without a long inline post list.

**Why this priority**: This is the first-contact experience for all visitors and defines the core information architecture change.

**Independent Test**: Open `/` and `/es/` and confirm both pages display localized banner + intro content while showing no inline post listing section.

**Acceptance Scenarios**:

1. **Given** a visitor opens the English home route, **When** the page loads, **Then** the visitor sees English banner and intro content and no inline posts list.
2. **Given** a visitor opens the Spanish home route, **When** the page loads, **Then** the visitor sees Spanish banner and intro content and no inline posts list.
3. **Given** the visitor is on either home variant, **When** they look for post discovery entry points, **Then** the page provides a clear navigation path to the dedicated posts section.

---

### User Story 2 - Discover posts in dedicated localized sections (Priority: P1)

As a visitor, I want a dedicated posts section for each language (`/posts/` and `/es/posts/`) so I can browse articles in a predictable place separate from the home landing content.

**Why this priority**: Separating post discovery from home is a direct business requirement and the main navigation outcome after Story 1.

**Independent Test**: Navigate from home and masthead in both language contexts and verify posts are reachable at `/posts/` (EN) and `/es/posts/` (ES).

**Acceptance Scenarios**:

1. **Given** a visitor is in English context, **When** they open the posts section, **Then** they land on `/posts/` with English labels and post-list context.
2. **Given** a visitor is in Spanish context, **When** they open the posts section, **Then** they land on `/es/posts/` with Spanish labels and post-list context.
3. **Given** a visitor navigates between Home and Posts in one language, **When** they use top-level navigation repeatedly, **Then** links remain consistent and never cross to the wrong locale unexpectedly.

---

### User Story 3 - See only active-language posts without duplicates (Priority: P2)

As a visitor, I want each posts page to show only the active-language posts and avoid duplicate EN/ES versions of the same logical article so browsing stays clear.

**Why this priority**: This preserves content quality and trust; mixed-language or duplicate lists create confusion and reduce readability.

**Independent Test**: Validate each posts page against a bilingual content set and confirm language filtering and de-duplication rules are respected.

**Acceptance Scenarios**:

1. **Given** a visitor opens `/posts/`, **When** the list is rendered, **Then** every visible post belongs to English and no Spanish-only post appears.
2. **Given** a visitor opens `/es/posts/`, **When** the list is rendered, **Then** every visible post belongs to Spanish and no English-only post appears.
3. **Given** one logical article has EN and ES variants, **When** a visitor views one locale page, **Then** only one localized entry for that article appears in that locale list.
4. **Given** a post lacks complete language metadata, **When** list eligibility is evaluated, **Then** the post is excluded from localized lists and does not break page rendering.

---

### User Story 4 - Switch language safely with robust fallback behavior (Priority: P2)

As a visitor, I want language switching to take me to the equivalent page when available and to a safe fallback when not, so I never hit dead-end or broken routes.

**Why this priority**: Reliable switching and fallback behavior is essential for published-site usability and protects against missing translations.

**Independent Test**: Test language switching on translated and untranslated pages/posts in a published-like environment and verify counterpart routing or defined fallback outcomes.

**Acceptance Scenarios**:

1. **Given** a visitor is on a page with EN and ES variants, **When** they switch language, **Then** they land on the equivalent page in the selected language.
2. **Given** a visitor is on a page or post with no equivalent in the target language, **When** they switch language, **Then** they are redirected to the default-language equivalent-safe route and shown translation-unavailable feedback.
3. **Given** a visitor requests a locale-prefixed route that has no valid equivalent, **When** the site resolves the request in published mode, **Then** it falls back to a valid default-language route without showing a 404 for this case.

---

### Edge Cases

- Missing page translation: if home/posts equivalent is missing for target language, language switch resolves to the default-language route and shows translation-unavailable feedback.
- Missing post translation: if a post exists only in one language, switching from that post goes to a defined fallback route (default-language post when it exists; otherwise default-language posts index).
- Route without equivalent: if a locale-prefixed URL has no valid counterpart, the system resolves to a valid default-language route instead of dead-ending.
- Posts missing `lang` metadata: entries without valid language metadata are excluded from localized listings and logged for editorial correction workflow.
- Posts missing `translation_key`: entries without translation grouping metadata remain eligible only for their own locale listing and must not generate duplicate logical entries.
- Duplicate metadata collision: if two posts in the same locale share the same translation grouping identifier, only one is shown and the issue is flagged for content correction.
- Empty localized posts page: if no posts qualify for the active locale, the page shows a localized empty-state message and keeps navigation usable.

## Requirements *(mandatory)*

### Constitution Alignment *(mandatory)*

- **CA-001**: Any implementation notes, config keys, and code comments in scope MUST be in English.
- **CA-002**: Any behavior affecting Jekyll structure, front matter, rendering, or config MUST reference official Jekyll conventions.
- **CA-003**: The multilingual architecture MUST NOT use jekyll-polyglot or any third-party multilingual plugin. The custom solution (URL-prefix locale detection, `lang` front matter, `site_lang` Liquid variable, explicit `permalink`-based routes) is the sole mechanism for locale behavior. This constraint replaces the previously considered polyglot dependency, reducing external plugin surface and making locale resolution fully transparent and predictable. Rollback impact: reverting to any plugin-driven solution would require re-introducing plugin config and replacing all `page.lang`/`site_lang` references site-wide.

### Architectural Constraints

- **AC-001**: jekyll-polyglot MUST be removed from the project entirely — it MUST NOT appear in `Gemfile`, `_config.yml` plugins list, or any template logic.
- **AC-002**: The active-locale context in templates MUST be derived from the `page.lang` front matter field via the custom `site_lang` variable; references to `site.active_lang` (polyglot's global) MUST NOT be used.
- **AC-003**: Locale identification in routing MUST rely solely on URL prefix (`/es/` = Spanish, no prefix = English) and the `lang` front matter field; no plugin-managed locale injection is permitted.
- **AC-004**: Each locale page MUST be explicitly authored; automatic locale-variant generation (as performed by polyglot) is out of scope and MUST NOT be relied upon.

### Functional Requirements

- **FR-001**: The site MUST provide two localized home variants at the canonical English and Spanish home routes.
- **FR-002**: Each home variant MUST display localized banner and intro content as the primary content block.
- **FR-003**: Home variants MUST NOT include inline post listings; post discovery MUST be delegated to dedicated posts routes.
- **FR-004**: The site MUST provide dedicated localized posts sections at `/posts/` and `/es/posts/`.
- **FR-005**: Top-level navigation in each locale MUST expose direct access to localized Home and Posts destinations.
- **FR-006**: Each posts section MUST list only posts matching the active language context.
- **FR-007**: Each posts section MUST prevent duplicate logical entries for the same translation group within a single locale view.
- **FR-008**: Posts missing valid language metadata MUST be excluded from localized lists and MUST NOT cause rendering failure.
- **FR-009**: When language switching from a page/post with a valid counterpart, the switch MUST resolve to that counterpart route in one action.
- **FR-010**: When language switching from a page/post without a valid counterpart, the switch MUST resolve to a valid default-language fallback route and preserve user continuity.
- **FR-011**: Fallback outcomes MUST include a user-visible translation-unavailable feedback message in the active UI language.
- **FR-012**: Published-site routing for unsupported locale-prefixed requests in feature scope MUST resolve to a valid default-language route rather than a broken page.
- **FR-013**: If a localized posts page has zero eligible posts, the page MUST display a localized empty-state message and keep Home/Posts navigation available.
- **FR-014**: The feature scope is limited to home routes, posts index routes, localized post listings, and language-switch/fallback behavior for those surfaces; no other sections are modified by this feature.

### Key Entities *(include if feature involves data)*

- **LocalizedHomeVariant**: One language-specific home page representation with localized banner, intro, route, and language identity.
- **LocalizedPostsSection**: One language-specific posts index view with route, localized labels, and filtered post collection.
- **LocalizedPostEntry**: A published post candidate with language metadata and optional translation grouping identity.
- **TranslationGroup**: Logical relationship that ties EN/ES variants of the same content to support deduplication and language switching.
- **FallbackResolution**: Rule outcome defining where a user is sent when a target-language equivalent route or content variant is unavailable.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In release validation, 100% of tested home route openings (`/`, `/es/`) show localized banner + intro and zero inline post-list blocks.
- **SC-002**: In release validation, 100% of tested posts navigation flows from EN and ES contexts reach the correct dedicated posts route in 2 interactions or fewer.
- **SC-003**: In a bilingual content validation set of at least 30 posts per language context, 100% of visible entries on each localized posts page match the active language and 0 mixed-language entries are observed.
- **SC-004**: In a validation set containing at least 20 bilingual translation groups, 0 duplicate logical entries appear within a single localized posts page.
- **SC-005**: In a fallback test matrix of at least 12 missing-equivalent scenarios (pages and posts), 100% of cases resolve to a valid default-language route with translation-unavailable feedback.
- **SC-006**: In pre-release published-like route validation, 100% of unsupported or unresolved locale-prefixed requests in feature scope resolve to valid fallback routes without dead-end rendering.

## Assumptions

- English is the default language and Spanish is the localized language in current project scope.
- jekyll-polyglot has been or will be removed from `Gemfile` and `_config.yml` as a prerequisite to implementing this feature; no polyglot APIs (`site.active_lang`, auto-generated locale variants) are available.
- Locale context is determined at render time from `page.lang` front matter; every page and post in scope carries a valid `lang` value (`en` or `es`).
- The custom `site_lang` Liquid variable is consistently computed from `page.lang` in all templates within this feature's scope.
- Language metadata and translation-group metadata are editorially maintained for new and existing posts.
- Translation-unavailable feedback already has an approved UX pattern that can be reused for this feature.
- The feature focuses on visitor-facing behavior and excludes content authoring workflow redesign.
- Existing bilingual navigation patterns remain the baseline and are extended, not replaced, by this feature — with the exception that polyglot-driven locale variables are superseded by the custom approach.
