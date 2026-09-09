# Implementation Plan: Client-Side Routing

**Branch**: `002-client-side-routing` | **Date**: 2026-09-09 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-client-side-routing/spec.md`

## Summary

Add client-side routing infrastructure to the React frontend using `react-router-dom` v7 with `BrowserRouter`. Wrap the existing landing page at the root path "/" and add a catch-all route for a "not found" page. No new pages or navigation UI — only routing plumbing.

## Technical Context

**Language/Version**: TypeScript 5.8, React 19

**Primary Dependencies**: react-router-dom ^7 (re-exports react-router; BrowserRouter, Routes, Route)

**Storage**: N/A

**Testing**: Vitest 5 + React Testing Library 16 + jest-dom matchers (existing)

**Target Platform**: Modern browsers (SPA served by Vite dev server / Python backend)

**Project Type**: Web application (frontend only, within monorepo)

**Performance Goals**: No measurable impact — routing is static configuration, no runtime cost

**Constraints**: No new dependencies beyond react-router-dom; must not alter visual appearance of landing page

**Scale/Scope**: 2 routes (root + catch-all), 1 new component, minimal file changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Post-design re-check (after Phase 1):** ALL PASS. Design confirms one new file (`pages/NotFound.tsx`), one new dependency (`react-router-dom@7`), and no visual changes to the landing page.

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Code Quality | PASS | TypeScript, functional components, clean imports |
| II. Testing Standards | PASS | Tests placed next to code; new component gets its own test file |
| III. User Experience | PASS | Landing page unchanged; catch-all uses semantic HTML |
| IV. Consistency | PASS | PascalCase components; follows existing file/folder conventions |
| V. Performance | PASS | No runtime cost; pure configuration |
| Security | PASS | No secrets, no new attack surface |
| Dependencies | PASS | One new dependency (react-router-dom), justified by user requirement |

## Project Structure

### Documentation (this feature)

```text
specs/002-client-side-routing/
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
│   ├── App.tsx              # MODIFY: wrap content in BrowserRouter + Routes
│   ├── main.tsx             # MODIFY: move BrowserRouter outside App (or keep inside App)
│   ├── pages/
│   │   └── NotFound.tsx     # NEW: simple "not found" page component
│   │   └── NotFound.test.tsx # NEW: tests for NotFound
│   ├── components/
│   │   ├── EveTitle.tsx     # UNCHANGED
│   │   └── ...
│   └── styles/
│       ├── global.css       # UNCHANGED
│       └── atmosphere.css   # UNCHANGED
├── package.json             # MODIFY: add react-router-dom dependency
└── vite.config.ts           # MAY MODIFY: add SPA fallback plugin if needed
```

**Structure Decision**: Minimal changes — new `pages/` directory for page-level components, existing files modified in-place. Router wraps at the App level; atmosphere background stays inside the route content so it persists across navigation.

## Complexity Tracking

No constitution violations. No complexity tracking needed.
