# jblueprint.dev
Jorge Personal Blog for Software Architecture topics

## Contribution Rules

Project governance is defined in `.specify/memory/constitution.md`.

- Keep code, configuration keys, and code comments in English.
- Follow official Jekyll conventions and documentation for structural/config changes.
- Run `bundle exec jekyll build` for site-affecting changes before finalizing.

## Bilingual Content Workflow (en/es)

This site uses `jekyll-polyglot` with `en` as default and `es` under `/es/`.

For every bilingual page or post variant, include at least:

- `lang`: `en` or `es`
- `translation_key`: shared key across locale variants of the same logical document

Authoring checklist:

1. Add/update English variant (`lang: en`) with canonical unprefixed route.
2. Add/update Spanish variant (`lang: es`) using the same `translation_key`.
3. Keep permalinks aligned for equivalent pages when route parity is required.
4. Run `bundle exec jekyll build` and verify outputs under `_site/` and `_site/es/`.
5. Verify alternate metadata (`hreflang`, `x-default`) for bilingual pages.

Related docs:

- `docs/multilingual-content-workflow.md`
- `docs/multilingual-redirects.md`
- `docs/multilingual-rollback.md`

## Production navigation validation

After deploying with your existing pipeline, run a live navigation check against production:

```zsh
python3 scripts/validate_production_navigation.py --base-url "https://jblueprint.dev"
python3 scripts/validate_production_navigation.py --base-url "https://www.jblueprint.dev"
```

