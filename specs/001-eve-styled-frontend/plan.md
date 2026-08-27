# Implementation Plan: EVE-Styled Frontend

**Branch**: `001-eve-styled-frontend` | **Date**: 2026-08-27 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-eve-styled-frontend/spec.md`

## Summary

Build the project's frontend landing page. It renders the text **"PyEveProject"** with an EVE Online-inspired visual theme (dark space palette, starfield/nebula imagery, angular sci-fi typography, gold/blue accents) using responsive, accessible markup. The frontend is a minimal **React + Vite (TypeScript)** app that favors **vanilla HTML, CSS, and JavaScript** and keeps external libraries to a minimum. The app runs via **Docker Compose**; source lives under `frontend/`, and the production build output is emitted to **`api/static/`** for the backend to serve.

## Technical Context

**Language/Version**: TypeScript (React via Vite scaffold), Node.js 24 (Alpine container), CSS3, HTML5

**Primary Dependencies**: `react`, `react-dom`, `vite`, `@vitejs/plugin-react`, `typescript`. Minimal — no UI/component/state libraries; decorative styling done with hand-written CSS.

**Storage**: N/A (static, presentational page; no persistent data)

**Testing**: Vitest + React Testing Library for frontend components; existing backend pytest suite remains untouched

**Target Platform**: Modern desktop and mobile browsers (responsive, 320px–1920px)

**Project Type**: Web application — frontend (React/Vite) + existing FastAPI backend

**Performance Goals**: First paint of "PyEveProject" within 3s on a standard connection; no blocking of the main thread; no unbounded payloads

**Constraints**: Minimal external libraries (prefer vanilla HTML/CSS/JS); build output must land in `api/static/`; everything must run through Docker Compose; frontend source confined to `frontend/`

**Scale/Scope**: Single presentational landing page (v1); no navigation or data features yet

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Code Quality**: Frontend code must pass linting and formatting and follow React best practices (functional components, hooks, small single-purpose components, clean TypeScript). AI work is limited to frontend. — *PASS: plan scopes all AI-authored code to `frontend/`.*
- **II. Testing Standards**: Every change covered by tests; frontend uses Vitest + RTL placed next to code. CI runs full suite, linter, formatter. — *PASS: quickstart includes Vitest run; new frontend tests are in scope.*
- **III. User Experience**: Usable, accessible, responsive; semantic HTML, ARIA, labels, alt text; mobile/tablet/desktop. — *PASS: spec FR-003/FR-004 require responsive and accessible rendering.*
- **IV. Consistency**: PascalCase components, camelCase variables/functions, English in code/comments/commits/PRs, respect existing structure, reuse patterns/dependencies. — *PASS: plan follows these conventions.*
- **V. Performance**: No main-thread blocking, no avoidable round-trips, no unbounded payload growth. — *PASS: static landing page with hand-rolled CSS; no heavy runtime work.*
- **Security & Dependency Constraints**: No secrets committed; ESI tokens handled securely when they appear later; new dependencies justified, prefer stdlib + modern stack. — *PASS: only React/Vite/Vitest dev deps added, all justified.*
- **Development Workflow & Quality Gates**: Code review mandatory; change complete only when lint, format, type checks, and tests pass. — *PASS: quickstart includes these gates for the frontend.*

No violations found; the Complexity Tracking table is not required.

## Project Structure

### Documentation (this feature)

```text
specs/001-eve-styled-frontend/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
└── contracts/           # Phase 1 output (/speckit.plan command)
```

### Source Code (repository root)

```text
frontend/
├── index.html                    # Vite entry; semantic root markup
├── package.json                  # Minimal deps: react, react-dom; dev: vite, vite-react
├── tsconfig.json
├── vite.config.ts                # build.outDir -> ../api/static
├── src/
│   ├── main.tsx                  # React bootstrap
│   ├── App.tsx                   # Root component (renders the EVE-styled title)
│   ├── App.css                   # Theme styles, mostly vanilla CSS
│   └── components/
│       └── EveTitle.tsx          # EVE-styled "PyEveProject" heading
└── src/components/EveTitle.test.tsx

api/static/                       # Vite build output (generated; served by backend)
```

**Structure Decision**: A single `frontend/` directory (Vite/React) matches the existing repo layout and the user's requirement that all frontend source live under `frontend/`. Build output is configured via `vite.config.ts` `build.outDir` to emit to `api/static/`. The existing `api/` (FastAPI) and `docker-compose.yml` are backend/infrastructure owned by the project owner; per AGENTS.md the AI does not author backend files, so the plan documents the required wiring (static serving, compose entrypoint/build step) as constraints for the owner to apply or confirm during implementation.

## Complexity Tracking

No constitution violations to justify, so the tracking table is omitted.
