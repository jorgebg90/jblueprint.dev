# PageVariant Coverage Matrix

**Purpose**: Map all page/language/theme/viewport combinations for visual refinement validation.  
**Created**: 2026-05-11  
**Derived from**: `data-model.md` Entity: PageVariant

---

## Complete PageVariant Coverage

### Home Page Variants

| page_key | language | theme_mode | viewport | route | status | contrast_check | responsive_check | zoom_200_check |
|----------|----------|-----------|----------|-------|--------|-----------------|-----------------|-----------------|
| home | en | light | mobile | / | draft | pending | pending | pending |
| home | en | light | desktop | / | draft | pending | pending | pending |
| home | en | dark | mobile | / | draft | pending | pending | pending |
| home | en | dark | desktop | / | draft | pending | pending | pending |
| home | es | light | mobile | /es/ | draft | pending | pending | pending |
| home | es | light | desktop | /es/ | draft | pending | pending | pending |
| home | es | dark | mobile | /es/ | draft | pending | pending | pending |
| home | es | dark | desktop | /es/ | draft | pending | pending | pending |

**Home Subtotal**: 8 variants | Status: 0/8 styled, 0/8 validated

---

### About Page Variants

| page_key | language | theme_mode | viewport | route | status | contrast_check | responsive_check | zoom_200_check |
|----------|----------|-----------|----------|-------|--------|-----------------|-----------------|-----------------|
| about | en | light | mobile | /about/ | draft | pending | pending | pending |
| about | en | light | desktop | /about/ | draft | pending | pending | pending |
| about | en | dark | mobile | /about/ | draft | pending | pending | pending |
| about | en | dark | desktop | /about/ | draft | pending | pending | pending |
| about | es | light | mobile | /es/about/ | draft | pending | pending | pending |
| about | es | light | desktop | /es/about/ | draft | pending | pending | pending |
| about | es | dark | mobile | /es/about/ | draft | pending | pending | pending |
| about | es | dark | desktop | /es/about/ | draft | pending | pending | pending |

**About Subtotal**: 8 variants | Status: 0/8 styled, 0/8 validated

---

### 404 Error Page Variants

| page_key | language | theme_mode | viewport | route | status | contrast_check | responsive_check | zoom_200_check |
|----------|----------|-----------|----------|-------|--------|-----------------|-----------------|-----------------|
| 404 | shared | light | mobile | /404.html | draft | pending | pending | pending |
| 404 | shared | light | desktop | /404.html | draft | pending | pending | pending |
| 404 | shared | dark | mobile | /404.html | draft | pending | pending | pending |
| 404 | shared | dark | desktop | /404.html | draft | pending | pending | pending |

**404 Subtotal**: 4 variants | Status: 0/4 styled, 0/4 validated

---

## Summary

| Category | Total | Draft | Styled | Validated |
|----------|-------|-------|--------|-----------|
| **Home** | 8 | 8 | 0 | 0 |
| **About** | 8 | 8 | 0 | 0 |
| **404** | 4 | 4 | 0 | 0 |
| **TOTAL** | 20 | 20 | 0 | 0 |

---

## Validation Checkpoints

### Phase 2 Checkpoint (Foundation Ready)
- [ ] All 20 variants identified and listed above

### Phase 3 Checkpoint (US1: Home Complete)
- [ ] Home EN light, desktop: styled & validated
- [ ] Home EN dark, desktop: styled & validated
- [ ] Home EN mobile (light+dark): responsive checks pass
- [ ] Home ES light, desktop: styled & validated (parity)
- [ ] Home ES dark, desktop: styled & validated (parity)
- [ ] Home ES mobile (light+dark): responsive checks pass

### Phase 4 Checkpoint (US2: About Complete)
- [ ] About EN light, desktop: styled & validated
- [ ] About EN dark, desktop: styled & validated
- [ ] About EN mobile (light+dark): responsive checks pass
- [ ] About ES light, desktop: styled & validated (parity)
- [ ] About ES dark, desktop: styled & validated (parity)
- [ ] About ES mobile (light+dark): responsive checks pass

### Phase 5 Checkpoint (US3: 404 Complete)
- [ ] 404 light, desktop: styled & validated
- [ ] 404 dark, desktop: styled & validated
- [ ] 404 mobile (light+dark): responsive checks pass
- [ ] 404 alignment with Home visual system confirmed

### Phase 6 Checkpoint (Polish Complete)
- [ ] All 20 variants status: validated
- [ ] Contrast checks: 20/20 pass
- [ ] Responsive checks: 20/20 pass
- [ ] Zoom 200% checks: 20/20 pass
- [ ] SEO/performance non-regression: confirmed

---

## Status Update Instructions

After each story implementation:

1. Update the `status` column from "draft" → "styled" (after SCSS implementation)
2. Update the `status` column from "styled" → "validated" (after all checks pass)
3. Mark contrast/responsive/zoom checks as "pass" or "fail"
4. Update Summary table totals

Example completion for Home EN, light, desktop after T012 implementation:

```
| home | en | light | desktop | / | styled | pending | pending | pending |
```

After validation passes in T014:

```
| home | en | light | desktop | / | validated | pass | pass | pass |
```

