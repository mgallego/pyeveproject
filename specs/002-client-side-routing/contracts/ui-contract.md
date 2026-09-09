# UI Contract: Client-Side Routing

**Date**: 2026-09-09
**Feature**: 002-client-side-routing

## Route Contract

| Route | Path | Behavior |
|-------|------|----------|
| Landing | `/` | Renders existing landing page (EveTitle + atmosphere background) — visually identical to current |
| Catch-All | `*` | Renders NotFound page with heading and message |

## NotFound Page Contract

- **Heading**: "Page Not Found" (semantic `<h1>`)
- **Message**: A brief sentence explaining the page doesn't exist
- **Styling**: Uses existing CSS custom properties (`--text-primary`, `--font-body`, `--bg-deep`)
- **Accessibility**: Semantic HTML, single `<h1>`, readable by screen readers
- **No navigation links** — scope is limited to displaying the message

## Navigation Behavior

- Browser back/forward buttons work via History API (BrowserRouter)
- Deep-linking to any URL works (direct URL entry in browser)
- Page refresh on any route preserves the correct view
