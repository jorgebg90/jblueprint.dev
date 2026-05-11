# Cleanup Manifest — Legacy Path Removal

## Removed paths

- `index.markdown` (moved to `site/en/index.markdown`)
- `about.markdown` (moved to `site/en/about.markdown`)
- `posts/index.markdown` (moved to `site/en/posts/index.markdown`)
- `es/index.markdown` (moved to `site/es/index.markdown`)
- `es/about.markdown` (moved to `site/es/about.markdown`)
- `es/posts/index.markdown` (moved to `site/es/posts/index.markdown`)
- `_posts/` legacy root (moved to `site/en/_posts` and `site/es/_posts`)
- `posts/` legacy directory (removed)
- `es/` legacy directory (removed)

## Verification

- `bundle exec jekyll build` succeeds after cleanup.
- `python3 scripts/validate_local_routes.py --site-dir _site` passes for canonical routes.

