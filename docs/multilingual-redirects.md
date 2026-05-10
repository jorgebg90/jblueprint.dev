# Multilingual Redirect Contract

This project implements multilingual routing with explicit routes: `en` (default) and `es` (`/es/...`) using standard Jekyll pages/posts.

## Redirect Rules

### 1) Unsupported Locale Prefix -> 301

Requests with unsupported prefixes MUST redirect permanently (`301`) to the default-language equivalent path.

Examples:

- `/fr/about/` -> `/about/` (`301`)
- `/de/jekyll/update/2026/05/08/welcome-to-jekyll.html` -> `/jekyll/update/2026/05/08/welcome-to-jekyll.html` (`301`)

### 2) Missing Translation in Language Switcher -> Safe Fallback Route

When the language switcher cannot resolve a counterpart by `translation_key`, it must navigate to a safe default-language route and surface a translation-unavailable message.

Examples:

- Page with no counterpart -> `/?translation=unavailable&requested=<lang>`
- Post with no counterpart -> `/posts/?translation=unavailable&requested=<lang>`

## Hosting-Level Implementation Notes

Jekyll generates static files and cannot issue HTTP status redirects by itself for arbitrary unknown paths. Configure unsupported-locale prefix redirects in the hosting platform (Nginx, Netlify, Cloudflare, Vercel, etc.) using the contracts above.

The query string (`translation=unavailable&requested=es`) is consumed client-side by `assets/js/language-session.js` and rendered by `_includes/translation-feedback.html`.

