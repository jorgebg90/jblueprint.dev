# Rollback Checkpoint A — Pre-Move Baseline

- **Checkpoint ID**: `checkpoint-a-pre-move`
- **Phase boundary**: `before-move`
- **Created at**: 2026-05-10
- **Intent**: Restore pre-migration source layout before moving content into `site/en` and `site/es`.

## Restore Commands

```bash
git restore _config.yml _data/navigation.yml _includes/masthead.html _includes/language-switcher.html _includes/hreflang-links.html
rm -rf site/
mkdir -p es/posts posts _posts/2026/05/08
# Recreate moved files from git index
git checkout -- index.markdown about.markdown posts/index.markdown es/index.markdown es/about.markdown es/posts/index.markdown
git checkout -- _posts/2026/05/08/
bundle exec jekyll build
python3 scripts/validate_local_routes.py --site-dir _site
```

## Rollback Triggers

- Jekyll build fails after content move and cannot be remediated within release window.
- Any critical route (`/`, `/about/`, `/posts/`, `/es/`, `/es/about/`, `/es/posts/`) fails local continuity validation.
- Language switcher generates invalid counterpart targets for critical journey pages.

