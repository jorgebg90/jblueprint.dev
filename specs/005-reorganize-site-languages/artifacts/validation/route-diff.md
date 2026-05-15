# Route Diff — Pre-move vs Post-move Canonical Outputs

## Comparison summary

The source tree moved from root + `es/` + `_posts/` to `site/en` + `site/es` + language-scoped `_posts` roots.
Canonical public routes remained stable for critical and high-priority paths.

## Canonical route continuity

| Route | Pre-move target | Post-move target | Status | Notes |
|---|---|---|---|---|
| `/` | `/index.html` | `/index.html` | Unchanged | Direct serve |
| `/about/` | `/about/index.html` | `/about/index.html` | Unchanged | Direct serve |
| `/posts/` | `/posts/index.html` | `/posts/index.html` | Unchanged | Direct serve |
| `/es/` | `/es/index.html` | `/es/index.html` | Unchanged | Direct serve |
| `/es/about/` | `/es/about/index.html` | `/es/about/index.html` | Unchanged | Direct serve |
| `/es/posts/` | `/es/posts/index.html` | `/es/posts/index.html` | Unchanged | Direct serve |
| `/jekyll/speckit/2026/05/08/how-to-build-a-blog-with-spec-driven-design.html` | Same | Same | Unchanged | High priority |
| `/es/jekyll/speckit/2026/05/08/como-crear-un-blog-con-spec-driven-design.html` | Same | Same | Unchanged | High priority |
| `/jekyll/theme/2026/05/08/instalacion-minimal-mistakes.html` | Direct serve (legacy) | `/es/jekyll/theme/2026/05/08/instalacion-minimal-mistakes.html` | Changed | Redirect/deprecation decision recorded |

## Evidence

- `artifacts/validation/pre-move-build.log`
- `artifacts/validation/pre-move-routes.log`
- `artifacts/validation/us2-routes.log`
- `artifacts/validation/us2-production-navigation.log`

