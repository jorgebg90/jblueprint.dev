# Feature Specification: Bilingual About/Acerca de Page and Localized Navigation

**Feature Branch**: `003-bilingual-about-page`  
**Created**: 2026-05-09  
**Status**: Ready for Implementation  
**Input**: User description: "Crea una nueva especificación de feature en este workspace... incluir About/Acerca de bilingüe, traducir menús visibles, mostrar imagen circular y resumen profesional, inspirado en Minimal Mistakes about"

## Clarifications

### Session 2026-05-09

- Q: `fallback_about_idioma` when About/Acerca de translation is missing? → A: Automatically redirect to the other available language variant.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View About page in preferred language (Priority: P1)

As a visitor, I want to open an About/Acerca de page in English or Spanish so I can understand who the author is in my selected language.

**Why this priority**: The bilingual About page is the core requested capability and the main user-facing value of this feature.

**Independent Test**: Can be fully tested by opening the About/Acerca de page in both language contexts and verifying that each language variant exists, is reachable, and shows equivalent information.

**Acceptance Scenarios**:

1. **Given** a visitor is browsing the default language site, **When** they open the About/Acerca de page, **Then** they see the English About content and route.
2. **Given** a visitor is browsing the Spanish site context, **When** they open the Acerca de page, **Then** they see the Spanish About content and route.
3. **Given** both language variants exist, **When** a visitor switches language from About/Acerca de, **Then** they land on the equivalent page in the other language.

---

### User Story 2 - Understand navigation labels in active language (Priority: P1)

As a visitor, I want all visible navigation and UI menu labels to appear in my active language so I can browse the site without translation friction.

**Why this priority**: Navigation comprehension directly affects usability and page discoverability across the entire site.

**Independent Test**: Can be fully tested by reviewing all visible menu/navigation labels in English and Spanish contexts and confirming language-appropriate text is shown.

**Acceptance Scenarios**:

1. **Given** the site is viewed in English, **When** a visitor sees global navigation and visible menu labels, **Then** labels are presented in English.
2. **Given** the site is viewed in Spanish, **When** a visitor sees global navigation and visible menu labels, **Then** labels are presented in Spanish.
3. **Given** a visitor changes language, **When** navigation is rendered again, **Then** labels update consistently to the selected language.
4. **Given** one navigation or UI menu literal has no translation for the active language, **When** the page is rendered, **Then** that literal shows the predefined default-language text and never appears empty.

---

### User Story 3 - Evaluate author profile at a glance (Priority: P2)

As a visitor, I want to see a circular personal image and a concise professional summary on About/Acerca de so I can quickly understand the author’s identity and expertise.

**Why this priority**: The profile presentation improves trust and credibility, but depends on the About page existing first.

**Independent Test**: Can be fully tested by opening About/Acerca de and verifying the profile image is shown in circular form and that a professional summary is visible in each language.

**Acceptance Scenarios**:

1. **Given** a visitor opens About/Acerca de, **When** profile content is loaded, **Then** a personal image is displayed with circular presentation.
2. **Given** a visitor opens About/Acerca de in English or Spanish, **When** summary content is displayed, **Then** the professional summary is shown in the same active language.
3. **Given** the profile image cannot be loaded, **When** the page is rendered, **Then** the profile area remains visible with a localized fallback text and no broken/empty visual slot.
4. **Given** English and Spanish summaries have different lengths, **When** a visitor views either version, **Then** text remains fully readable without clipping, overlap, or horizontal scrolling in the validated viewports.

---

### Edge Cases

- If one About/Acerca de language variant is missing, the system redirects to the available translation-equivalent variant instead of returning an empty page or broken route.
- If a navigation/menu literal lacks translation in the active language, the system shows the predefined default-language literal for that key and never renders an empty label.
- If the personal image cannot be loaded, the page keeps the profile block visible and replaces the image area with a localized fallback text.
- If English and Spanish summaries differ in length, both language variants preserve readability with no text clipping, overlap, or horizontal scrolling in validated mobile and desktop views.

## Requirements *(mandatory)*

### Constitution Alignment *(mandatory)*

- **CA-001**: Any implementation notes, config keys, and code comments in scope MUST be in English.
- **CA-002**: Any behavior affecting Jekyll structure, front matter, rendering, or config MUST reference official Jekyll conventions.
- **CA-003**: If non-standard Jekyll structure/plugin behavior is required, the spec MUST include explicit justification and rollback impact.
- **CA-004**: Bilingual About/Acerca de content MUST align with the repository multilingual workflow (`en` default and `es` localized variant).

### Functional Requirements

- **FR-001**: The site MUST provide an About/Acerca de page in English and an equivalent Acerca de page in Spanish for the same logical content.
- **FR-002**: Both About/Acerca de language variants MUST remain linked as translation equivalents so users can switch between them directly.
- **FR-003**: The About/Acerca de page MUST include a personal profile image in a circular visual format.
- **FR-004**: The About/Acerca de page MUST display a professional summary in the active language.
- **FR-005**: The professional summary in both languages MUST communicate equivalent meaning, even if wording is not literal.
- **FR-006**: All user-visible **global navigation labels** (persistent, site-level navigation shown across pages) MUST be localized for English and Spanish.
- **FR-007**: All user-visible **non-global UI menu literals** in current layouts (menu labels shown within page-specific or section-specific UI surfaces, excluding global navigation covered by FR-006) MUST be localized for English and Spanish.
- **FR-008**: If a translation for a navigation/UI literal is unavailable, the system MUST fall back to a predefined default language value and avoid empty labels.
- **FR-009**: The feature MUST preserve the repository bilingual routing convention verifiable in `README.md` ("Bilingual Content Workflow"), `docs/multilingual-content-workflow.md` ("File Placement Rules"), and the current translation pair `about.markdown` + `es/about.markdown`: English canonical access MUST remain unprefixed (`/[slug]/`, e.g., `/about/`) and Spanish access MUST remain locale-prefixed (`/es/[slug]/`, e.g., `/es/about/`). Validation MUST be measurable: 100% pass rate in a documented 4-case route check (direct EN open, direct ES open, EN→ES switch, ES→EN switch) with no broken-route outcome.
- **FR-010**: The About/Acerca de information hierarchy MUST be profile-first and verifiable: the first primary content block in both language variants MUST include the circular personal image and professional summary before any secondary sections.
- **FR-011**: If one About/Acerca de language page is unavailable, requests to that missing variant MUST automatically redirect to the existing equivalent variant.
- **FR-012**: If the profile image cannot be loaded, the system MUST display a localized fallback text in the profile image area while preserving profile-section readability.
- **FR-013**: The About/Acerca de summary presentation MUST remain readable for both language variants, including when one language text is longer, with no clipping, overlap, or required horizontal scrolling in validated mobile and desktop views.

### Key Entities *(include if feature involves data)*

- **About Profile**: Localized author profile content displayed on About/Acerca de, including identity image and professional summary text.
- **Navigation Literal**: User-visible label used in navigation or menus, with language-specific variants for English and Spanish.
- **Translation Pair**: Relationship binding equivalent English and Spanish page variants to support direct language switching.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In pre-release validation, the bilingual route matrix for About/Acerca de (at minimum: direct route open in `en`, direct route open in `es`, language switch `en→es`, language switch `es→en`, and fallback redirect when one variant is unavailable) MUST pass 100% of defined cases without broken route outcomes.
- **SC-002**: 100% of user-visible global navigation labels and in-scope UI menu literals display translated text in the active language.
- **SC-003**: In pre-release manual validation, profile image and professional summary visibility on About/Acerca de MUST pass in at least 24 documented test sessions using a fixed protocol (minimum 12 sessions in English and 12 in Spanish; each language set must include at least 6 mobile-view and 6 desktop-view sessions).
- **SC-004**: In a documented review protocol with at least 10 reviewers, each reviewer gets a 10-second first view of About/Acerca de and answers two prompts (author identity and professional context); success is met when at least 90% answer both prompts correctly.
- **SC-005**: In 100% of test cases, switching from About/Acerca de to its language-equivalent page requires no more than 2 user interactions, where one interaction is one intentional user input action (click, tap, or key activation); automatic redirects do not count as interactions.

## Assumptions

- The feature scope is limited to English (`en`) and Spanish (`es`) because these are the only active locales defined in current project workflow.
- Existing bilingual conventions (including translation pairing behavior and locale-specific routing) remain the baseline and are not redesigned by this feature.
- “Visible menus/navigation UI” refers to labels rendered to visitors in current navigation and layout surfaces, not hidden/admin-only text.
- For scope control, “global navigation” means persistent site-level navigation shown across pages, while “other UI menu literals” means page/section-specific menu labels outside that global navigation.
- The About/Acerca de inspiration from Minimal Mistakes is about information clarity and profile emphasis, not pixel-perfect visual replication.
- This specification follows repository governance and uses `specs/002-add-minimal-mistakes-theme/plan.md` as technical context for maintaining compatibility with the current theme and bilingual structure.
