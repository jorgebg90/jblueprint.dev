# Multilingual Redirect Contract

This project implements multilingual routing with `en` (default) and `es` using Jekyll + Polyglot.

## Redirect Rules

### 1) Unsupported Locale Prefix -> 301

Requests with unsupported prefixes MUST redirect permanently (`301`) to the default-language equivalent path.

Examples:

- `/fr/about/` -> `/about/` (`301`)
- `/de/jekyll/update/2026/05/08/welcome-to-jekyll.html` -> `/jekyll/update/2026/05/08/welcome-to-jekyll.html` (`301`)

### 2) Missing Translation in Supported Locale -> 302

Requests for a supported locale path (`/es/...`) that has no translated document MUST redirect temporarily (`302`) to the default-language equivalent URL and surface a translation-unavailable message.

Examples:

- `/es/some-page-without-translation/` -> `/some-page-without-translation/?translation=unavailable&requested=es` (`302`)
- `/es/category/legacy-post/` -> `/category/legacy-post/?translation=unavailable&requested=es` (`302`)

## Hosting-Level Implementation Notes

Jekyll generates static files and cannot issue HTTP status redirects by itself for arbitrary unknown paths. Configure these rules in the hosting platform (Nginx, Netlify, Cloudflare, Vercel, etc.) using the contracts above.

The query string (`translation=unavailable&requested=es`) is consumed client-side by `assets/js/language-session.js` and rendered by `_includes/translation-feedback.html`.

