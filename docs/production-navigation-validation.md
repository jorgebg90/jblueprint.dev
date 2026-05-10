# Production Navigation Validation

Use this checker to validate bilingual navigation directly against the live site.

## What it checks

- Critical EN and ES routes return HTTP 200.
- Pages are not serving the 404 template by mistake.
- Language switcher markup exists on each route.
- `data-current-lang` matches the expected locale.
- `data-target-en` and `data-target-es` are present and do not point to `/404.html`.
- Switcher targets themselves return HTTP 200.

## Run

```zsh
python3 scripts/validate_production_navigation.py
```

To validate a different domain:

```zsh
python3 scripts/validate_production_navigation.py --base-url "https://www.jblueprint.dev"
```

The command exits with code `1` when any validation fails.

