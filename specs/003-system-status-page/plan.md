# Implementation Plan: System Status Page

**Branch**: `003-system-status-page` | **Date**: 2026-09-09 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-system-status-page/spec.md`

## Summary

Add a system status page at the `/status` route that fetches `GET /api/health` and displays each backend service (API, ESI, Database) with its health status. The page uses native `fetch`, shows loading/error states, and follows the existing EVE Online space theme with gold and starlight blue accents.

## Technical Context

**Language/Version**: TypeScript 5.8, React 19

**Primary Dependencies**: react-router-dom ^7 (existing), native `fetch` API (no new HTTP client)

**Storage**: N/A

**Testing**: Vitest 5 + React Testing Library 16 + jest-dom matchers (existing)

**Target Platform**: Modern browsers (SPA served by Vite dev server / Python backend)

**Project Type**: Web application (frontend only, within monorepo)

**Performance Goals**: Single fetch on page load; no polling. Status visible within 5 seconds on standard connection.

**Constraints**: No new dependencies. Must use existing CSS custom properties from `global.css`. Must follow BEM naming and co-located CSS conventions.

**Scale/Scope**: 1 new page component, 1 CSS file, 1 route registration, ~150 lines of new code total.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Code Quality | PASS | TypeScript, functional components, hooks, clean imports |
| II. Testing Standards | PASS | Co-located test file, RTL patterns |
| III. User Experience | PASS | Loading/error states, responsive, accessible |
| IV. Consistency | PASS | PascalCase, BEM CSS, co-located files, follows NotFound pattern |
| V. Performance | PASS | Single fetch, no polling, no new dependencies |
| Security | PASS | No secrets, read-only public endpoint |
| Dependencies | PASS | Zero new dependencies; native fetch |

**Post-design re-check (after Phase 1):** ALL PASS. Design adds 2 new files (`StatusPage.tsx`, `StatusPage.css`), modifies 1 file (`App.tsx` route registration), and uses only existing project conventions.

## Project Structure

### Documentation (this feature)

```text
specs/003-system-status-page/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── App.tsx              # MODIFY: add /status route
│   ├── pages/
│   │   ├── StatusPage.tsx   # NEW: status page component
│   │   ├── StatusPage.css   # NEW: status page styles
│   │   └── StatusPage.test.tsx  # NEW: tests for StatusPage
│   ├── styles/
│   │   └── global.css       # UNCHANGED (CSS vars reused as-is)
│   └── ...
```

**Structure Decision**: New `StatusPage` component follows the same pattern as `NotFound` — co-located `.tsx` + `.css` files under `pages/`. Route added to existing `AppRoutes` in `App.tsx`. No new directories or dependencies.
