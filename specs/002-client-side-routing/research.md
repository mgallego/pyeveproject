# Research: Client-Side Routing

**Date**: 2026-09-09
**Feature**: 002-client-side-routing

## R1: react-router-dom v7 — package and imports

**Decision**: Install `react-router-dom@7` as specified by the user. Import `BrowserRouter`, `Routes`, and `Route` from `react-router-dom`.

**Rationale**: In react-router v7, `react-router-dom` is a re-export package that exposes everything from `react-router`. The user explicitly requested `react-router-dom`, so we install that package. All three symbols (`BrowserRouter`, `Routes`, `Route`) are available from `react-router-dom` in v7.

**Alternatives considered**:
- Install `react-router` directly (recommended by upstream for new projects) — rejected because user explicitly said "react-router-dom"
- Use `createBrowserRouter` (data mode) — rejected because user specified `BrowserRouter` (declarative mode)

## R2: BrowserRouter placement

**Decision**: Wrap `<BrowserRouter>` around `<Routes>` inside `App.tsx`. The existing landing page content moves into a route element.

**Rationale**: Placing `BrowserRouter` in `App.tsx` keeps the routing concern at the application boundary. The atmosphere background and global styles are imported at the top level in `main.tsx` and will continue to apply regardless of routing — they are CSS imports, not React components. The atmosphere `div` and `main` stage currently live in `App.tsx` and should move into a landing page route element (or remain inline as the root route's element) so that the catch-all route can render a different UI.

**Alternatives considered**:
- Wrap `BrowserRouter` in `main.tsx` — possible but pushes routing concern into the entry point unnecessarily
- Keep `BrowserRouter` in `App.tsx` with inline route elements — simplest approach, chosen

## R3: Catch-all route syntax

**Decision**: Use `<Route path="*">` as the last route in `<Routes>`.

**Rationale**: The `*` splat pattern matches any URL not matched by earlier routes. This is the standard react-router pattern for 404 pages.

**Alternatives considered**: None — this is the canonical approach.

## R4: NotFound component design

**Decision**: Create a simple `NotFound` component that renders a heading ("Page Not Found") and a brief message, styled with the existing design system variables.

**Rationale**: The spec says "simple not found message." Using existing CSS variables (`--text-primary`, `--font-body`) ensures visual consistency with the dark-space theme. The component should be semantic (`<main>`, `<h1>`) and accessible.

**Alternatives considered**:
- Redirect to "/" — rejected because the spec explicitly says to display a message
- Show a complex error page — rejected as overkill for this feature scope

## R5: Vite SPA fallback for deep-link support

**Decision**: For the Vite dev server, React Router v7's `BrowserRouter` works out of the box because Vite handles SPA fallback by default. For production (if served by the Python backend), the backend must be configured to return `index.html` for unrecognized paths. This is a known SPA deployment requirement, not a frontend concern.

**Rationale**: The Vite dev server already serves `index.html` for all routes (SPA mode). The Python backend's static file serving will need a fallback route, but that is outside the frontend scope (per AGENTS.md, backend is hand-written by the owner).

**Alternatives considered**:
- Use `HashRouter` instead — rejected because user specified `BrowserRouter`
- Add `vite-plugin-history-api-fallback` — unnecessary for dev; production fallback is a backend concern

## R6: Test strategy for routing

**Decision**: Write tests for the `NotFound` component (renders heading, renders message). Write a test for `App` that verifies the root route renders the landing page and an unknown route renders the not-found page. Use `MemoryRouter` in tests instead of `BrowserRouter` to avoid browser history dependency.

**Rationale**: `MemoryRouter` is the recommended test wrapper for react-router — it provides routing context without a real browser. This follows the constitution's testing standards.

**Alternatives considered**: None — `MemoryRouter` is the standard testing approach.

## Adding New Routes

Future features add a page by appending a single `<Route>` entry inside `AppRoutes` in `frontend/src/App.tsx`:

```tsx
<Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/new-page" element={<NewPage />} />  // append here
  <Route path="*" element={<NotFound />} />          // catch-all MUST stay last
</Routes>
```

Rules:
- Append before the catch-all route; the catch-all (`*`) must always be the last `<Route>` in the list so it only matches unmatched URLs.
- The router configuration in `App` (BrowserRouter) never changes.
- Route tests use `AppRoutes` wrapped in `MemoryRouter` (see `frontend/src/App.test.tsx`).
