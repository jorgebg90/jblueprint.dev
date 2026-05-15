# WCAG AA Contrast Report: Blog Design Refinement

**Purpose**: Document WCAG AA contrast validation for all in-scope page variants.  
**Created**: 2026-05-11  
**Minimum Standard**: WCAG AA (4.5:1 for normal text, 3:1 for large text)

---

## Contrast Validation Results

### Home Page - English

#### Home EN - Light Mode

| Element | Text/BG Color Pair | Ratio | WCAG AA | WCAG AAA | Status | Notes |
|---------|-------------------|-------|---------|---------|--------|-------|
| Body Text | (to be measured) | TBD | pending | — | pending | Capturing in Phase 2 |
| H1 Hero Title | (to be measured) | TBD | pending | — | pending | After T012 implementation |
| Hero Intro | (to be measured) | TBD | pending | — | pending | After T012 implementation |
| Hero CTA Button | (to be measured) | TBD | pending | — | pending | After T013 implementation |
| Link Text (default) | (to be measured) | TBD | pending | — | pending | After Phase 2 foundation |
| Heading 2 | (to be measured) | TBD | pending | — | pending | Minimal Mistakes defaults |
| Meta Text | (to be measured) | TBD | pending | — | pending | Small text check |

**Home EN Light Mode Summary**: ⏳ Validation pending (To be completed in Phase 2/3)

---

#### Home EN - Dark Mode

| Element | Text/BG Color Pair | Ratio | WCAG AA | WCAG AAA | Status | Notes |
|---------|-------------------|-------|---------|---------|--------|-------|
| Body Text | (to be measured) | TBD | pending | — | pending | Capturing in Phase 2 |
| H1 Hero Title | (to be measured) | TBD | pending | — | pending | After T012 implementation |
| Hero Intro | (to be measured) | TBD | pending | — | pending | After T012 implementation |
| Hero CTA Button | (to be measured) | TBD | pending | — | pending | After T013 implementation |
| Link Text (default) | (to be measured) | TBD | pending | — | pending | After Phase 2 foundation |
| Heading 2 | (to be measured) | TBD | pending | — | pending | Minimal Mistakes defaults |
| Meta Text | (to be measured) | TBD | pending | — | pending | Small text check |

**Home EN Dark Mode Summary**: ⏳ Validation pending (To be completed in Phase 2/3)

---

### Home Page - Spanish

#### Home ES - Light Mode

| Element | Text/BG Color Pair | Ratio | WCAG AA | WCAG AAA | Status | Notes |
|---------|-------------------|-------|---------|---------|--------|-------|
| Body Text | (to be measured) | TBD | pending | — | pending | Language parity check |
| H1 Hero Title | (to be measured) | TBD | pending | — | pending | Longer Spanish text |
| Hero Intro | (to be measured) | TBD | pending | — | pending | Longer Spanish text |
| Hero CTA Button | (to be measured) | TBD | pending | — | pending | "Ver publicaciones" label |
| Link Text (default) | (to be measured) | TBD | pending | — | pending | After Phase 2 foundation |
| Heading 2 | (to be measured) | TBD | pending | — | pending | Minimal Mistakes defaults |
| Meta Text | (to be measured) | TBD | pending | — | pending | Small text check |

**Home ES Light Mode Summary**: ⏳ Validation pending (Parity with EN expected)

---

#### Home ES - Dark Mode

| Element | Text/BG Color Pair | Ratio | WCAG AA | WCAG AAA | Status | Notes |
|---------|-------------------|-------|---------|---------|--------|-------|
| Body Text | (to be measured) | TBD | pending | — | pending | Language parity check |
| H1 Hero Title | (to be measured) | TBD | pending | — | pending | Longer Spanish text |
| Hero Intro | (to be measured) | TBD | pending | — | pending | Longer Spanish text |
| Hero CTA Button | (to be measured) | TBD | pending | — | pending | "Ver publicaciones" label |
| Link Text (default) | (to be measured) | TBD | pending | — | pending | After Phase 2 foundation |
| Heading 2 | (to be measured) | TBD | pending | — | pending | Minimal Mistakes defaults |
| Meta Text | (to be measured) | TBD | pending | — | pending | Small text check |

**Home ES Dark Mode Summary**: ⏳ Validation pending (Parity with EN expected)

---

### About Page - English & Spanish

| Variant | Elements to Check | Status | Notes |
|---------|-------------------|--------|-------|
| About EN Light | Profile Title, Profile Text, Timeline Items, Links | pending | After T017 implementation |
| About EN Dark | Profile Title, Profile Text, Timeline Items, Links | pending | After T017 implementation |
| About ES Light | Profile Title (Spanish), Profile Text, Links | pending | Parity check |
| About ES Dark | Profile Title (Spanish), Profile Text, Links | pending | Parity check |

---

### 404 Error Page

| Variant | Elements to Check | Status | Notes |
|---------|-------------------|--------|-------|
| 404 Light | Error Code (404), Error Message, CTA Link | pending | After T021 implementation |
| 404 Dark | Error Code (404), Error Message, CTA Link | pending | After T021 implementation |

---

## Contrast Validation Methodology

### Tools & Methods

**Option A: Manual Inspection** (Recommended for small set)
- Use Chrome DevTools color picker + WCAG contrast calculator
- Inspect computed color and background of each element
- Calculate ratio: (L1 + 0.05) / (L2 + 0.05) where L = relative luminance
- Record pass/fail against WCAG AA 4.5:1 (normal) / 3:1 (large, ≥18pt or ≥14pt bold)

**Option B: Automated Tool** (Optional, for supplementary validation)
- axe DevTools browser extension
- WAVE (WebAIM Web Accessibility Evaluation Tool)
- Lighthouse in Chrome DevTools (Accessibility audit)
- Note: Automated tools may miss context-specific issues

### Elements to Validate

**Mandatory checks**:
1. Body text (main content) — must have 4.5:1 contrast
2. Headings (H1–H3) — must have 4.5:1 contrast
3. Primary CTA buttons — must have 4.5:1 contrast text-to-background
4. Links (underline + color) — must have 3:1 contrast from surrounding text
5. Meta text (dates, bylines) — if ≥14pt, must have 3:1; if <14pt, must have 4.5:1

**Optional checks** (Best Practices):
- Icon + text combinations
- Focus/hover state contrast (must remain readable)
- Border indicators (must distinguish interactive elements)

---

## Non-Regression Criteria

- No element that currently passes WCAG AA should regress to fail
- Any new visual element (e.g., borders, dividers) must meet or exceed AA standard
- Light and dark modes must provide equivalent contrast quality (parity)

---

## Completion Checklist

### Phase 2 (Foundation)
- [ ] Contrast report template created ✓
- [ ] Methodology documented ✓
- [ ] Baseline contrast values captured (after foundation styles applied)

### Phase 3 (Home Implementation)
- [ ] Home EN Light contrast checks: ___/7 pass
- [ ] Home EN Dark contrast checks: ___/7 pass
- [ ] Home ES Light contrast checks: ___/7 pass (parity)
- [ ] Home ES Dark contrast checks: ___/7 pass (parity)
- [ ] All Home variants: 28/28 pass (or justified fails)

### Phase 4 (About Implementation)
- [ ] About EN Light contrast checks: ___/5 pass
- [ ] About EN Dark contrast checks: ___/5 pass
- [ ] About ES Light contrast checks: ___/5 pass (parity)
- [ ] About ES Dark contrast checks: ___/5 pass (parity)
- [ ] All About variants: 20/20 pass (or justified fails)

### Phase 5 (404 Implementation)
- [ ] 404 Light contrast checks: ___/3 pass
- [ ] 404 Dark contrast checks: ___/3 pass
- [ ] All 404 variants: 6/6 pass (or justified fails)

### Phase 6 (Final Validation - T025)
- [ ] All in-scope variants: ___/54 pass
- [ ] No regressions from baseline (if baseline available)
- [ ] Parity confirmed: EN ≈ ES, Light ≈ Dark
- [ ] Sign-off in final-summary.md ✓

