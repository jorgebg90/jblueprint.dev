# Contract: Localized Navigation Rendering Interface

**Feature**: `003-bilingual-about-page` | **Plan**: [../plan.md](../plan.md)

Defines the data and rendering contract for visible navigation labels in English and Spanish.

---

## Data Contract (`_data/navigation.yml`)

Each visible navigation item must provide:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `url` | string | Yes | Default-locale route |
| `labels.en` | string | Yes | English display label |
| `labels.es` | string | Yes | Spanish display label |

Example shape:

```yaml
main:
  - url: /
    labels:
      en: Home
      es: Inicio
  - url: /about/
    labels:
      en: About
      es: Acerca de
```

---

## Data Contract (`_data/ui-text.yml`)

Non-global masthead controls must use this schema:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `en.menu_label` | string | Yes | English text for greedy-nav toggle |
| `es.menu_label` | string | Yes | Spanish text for greedy-nav toggle |
| `en.search_label` | string | Yes | English text for search toggle |
| `es.search_label` | string | Yes | Spanish text for search toggle |

---

## Scope and Ownership Boundaries

1. **Global navigation literals** (`Home`, `About`, etc.) belong only to `_data/navigation.yml` under `labels.<lang>`.
2. **Non-global masthead controls** (`menu_label`, `search_label`) belong only to `_data/ui-text.yml`.
3. `_includes/masthead.html` is the single rendering owner for resolving active language and fallback behavior.
4. Fallback language is `en` for both global and non-global text keys.

---

## Rendering Contract (`_includes/masthead.html`)

Inputs:
- `active_lang` from `page.lang | default: site.active_lang`
- `site.data.navigation.main`

Behavior:
1. Render locale-correct URL using existing prefix logic.
2. Resolve global labels via `link.labels.<active_lang>`.
3. Resolve non-global literals via `site.data['ui-text'][active_lang]`.
4. If active-language key is missing, fallback to `en` value.
5. Never render empty navigation text.

Output:
- Every visible menu item contains a non-empty localized text node.
- Label language changes consistently after language switch.

---

## Validation Contract

1. English pages show English labels for all visible navigation/menu literals in scope.
2. Spanish pages show Spanish labels for all visible navigation/menu literals in scope.
3. Label fallback to English is applied for missing translations.
4. URL targets remain unchanged relative to current bilingual route conventions.

