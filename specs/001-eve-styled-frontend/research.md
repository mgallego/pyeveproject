# Research: EVE-Styled Frontend

**Date**: 2026-08-27
**Feature**: [spec.md](./spec.md)

This document resolves the technical unknowns for the EVE-styled frontend and records the validated technical choices.

## Research Questions

1. How to set up a minimal React + Vite + TypeScript app with few external libraries?
2. How to output the production build to `api/static/` while keeping source in `frontend/`?
3. How to run the app via Docker Compose with a dev server and a production build?
4. What is the best EVE Online-themed aesthetic direction given the "minimal libraries / vanilla CSS/JS" constraint?

---

## 1. Minimal React + Vite + TypeScript setup

**Decision**: Scaffold a Vite React-TypeScript app manually with only `react`, `react-dom`, `vite`, `@vitejs/plugin-react`, and `typescript` as dependencies. All styling and behavior use hand-written CSS and idiomatic JS/TSX — no UI component library, no CSS framework, no state library, no animation library.

**Rationale**: The page is a single static landing view. React provides the component/hooks structure required by AGENTS.md, and Vite gives fast dev + production builds with near-zero configuration. Adding UI/state/animation libraries would violate the user's "minimal number of libraries" constraint.

**Alternatives considered**:
- Plain HTML/CSS/JS only (no React): rejected because project conventions mandate React + TypeScript (AGENTS.md).
- Next.js / Remix: rejected — overkill for a single landing page and adds runtime/server requirements.
- Component libraries (Chakra, MUI, Tailwind): rejected — contradict the minimal-libraries requirement and the hand-crafted EVE aesthetic.

## 2. Build output to `api/static/`

**Decision**: Configure `frontend/vite.config.ts` with `build.outDir: '../api/static'` (and `emptyOutDir: true`). Source stays in `frontend/`, but `vite build` emits the compiled static bundle into `api/static/` where the backend serves it.

**Rationale**: This directly implements the user's requirement that "the dist or build must be stored in a folder called static inside the api directory," while keeping all source code under `frontend/`.

**Alternatives considered**:
- Emit to `frontend/dist` and copy to `api/static` via a script: adds a step and a second copy of the artifact; rejected in favor of writing directly to the target directory.
- `frontend/dist` only: rejected — does not satisfy the stated requirement.

**Note (scope)**: Serving `api/static` is accomplished by the backend (FastAPI `StaticFiles`) and the Docker Compose wiring — these are backend/infrastructure files owned by the project owner per AGENTS.md. The plan documents them as constraints; AI implementation does not author those files.

## 3. Running via Docker Compose

**Decision**: Extend the existing `docker-compose.yml` so the `frontend` service remains a Node dev server (`npm run dev -- --host 0.0.0.0`), and the production build is produced via `vite build` (e.g., with a build step or `npm run build` invoked when a production image/static output is wanted). The existing `backend` service (FastAPI/uvicorn) serves the built assets from `api/static`.

**Rationale**: The repo already centralizes environment setup in `docker-compose.yml`, so adding/running the app through it keeps the workflow consistent ("Use the docker composer to run the app").

**Alternatives considered**:
- Running Node directly on the host: rejected — user explicitly requested Docker Compose.
- A separate production Dockerfile: not needed for v1; the existing compose + a build step is sufficient.

**Note (scope)**: `docker-compose.yml` is infrastructure owned by the owner; the plan constrains but does not author it.

## 4. EVE Online aesthetic direction

**Decision**: A "deep-space terminal / starbase" aesthetic — near-black navy background with a subtle starfield, gold/sapphire accent palette, angular clipped panel edges, and condensed sci-fi display typography. This evokes New Eden's cold, vast space and the game's iconic gold-and-dark UI while remaining original (not reproducing licensed assets).

**Design pillars**:
- **Color**: Dominant near-black `#05070d` navy with deep-space blue undertones; sharp gold (`#d9a441`) and starlight-blue (`#7fb4d4`) accents; muted slate greys for secondary text.
- **Typography**: A condensed, geometric, uppercase display face for "PyEveProject" (characterful, sci-fi) paired with a clean refined body face. Given minimal libraries, fonts are bundled within `frontend/` or use a safe, distinctive stack — no external CDN at runtime (graceful degradation per spec Edge Cases).
- **Motion**: CSS-only, high-impact page-load reveal (staggered fade/slide, twinkling stars, subtle scanline/glow) — no JS animation library.
- **Texture/Atmosphere**: Layered radial gradients, a generated starfield (CSS or tiny inline SVG), hairline gold borders with angular corners, subtle noise/vignette.

**Alternatives considered**:
- Light, clean "web dashboard" theme: rejected — does not read as EVE.
- Brutalist monochrome: rejected — loses the recognizably EVE gold/sapphire-on-dark identity.
- Copying EVE's official UI assets/logos: rejected for IP/legal and originality reasons per the spec's Assumptions.

---

## Consolidated decisions

- **Framework/build**: React 19 + Vite + TypeScript; minimal deps (react, react-dom, vite, @vitejs/plugin-react, typescript).
- **Testing**: Vitest + React Testing Library (dev-only deps).
- **Styling**: Fully hand-written CSS (CSS variables, no framework); CSS-only animations.
- **Build output**: Vite `build.outDir` → `api/static` (source stays in `frontend/`).
- **Runtime**: Docker Compose dev workflow; backend serves `api/static`.
- **Aesthetic**: "Deep-space starbase" — dark navy + gold/sapphire, condensed sci-fi type, starfield, angular panels, CSS page-load reveal.

All unknowns resolved; no NEEDS CLARIFICATION remain.
