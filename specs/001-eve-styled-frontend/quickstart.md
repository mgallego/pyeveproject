# Quickstart: EVE-Styled Frontend

**Date**: 2026-08-27
**Feature**: [spec.md](./spec.md)

This is a validation guide to prove the feature works end-to-end. It is **not**
implementation code — implementation details live in `tasks.md` and the
implementation phase.

## Prerequisites

- Docker and Docker Compose installed and running.
- Repository cloned locally.
- (Optional, for local runs without Docker) Node.js 24+ and npm.

## Interfaces under test

- **UI/Accessibility contract**: [contracts/contracts.md](./contracts/contracts.md) §1
- **Build output contract**: [contracts/contracts.md](./contracts/contracts.md) §2
- **Runtime/Compose contract**: [contracts/contracts.md](./contracts/contracts.md) §3

## Setup

Installing frontend dependencies:

```bash
cd frontend
npm install
```

## Validation Scenarios

### Scenario 1 — Unit/component tests pass

Prerequisite: none beyond install.

```bash
cd frontend
npm test
```

Expected: Vitest + React Testing Library run green; the `EveTitle` component test
asserts that `PyEveProject` renders and is a heading with accessible name.

### Scenario 2 — Dev server renders the EVE-styled page (Docker Compose)

```bash
docker compose up --build
```

Expected: the `frontend` container starts the Vite dev server; opening
`http://localhost:5173` shows `PyEveProject` with the EVE Online-inspired theme.
Resize from 320px to 1920px wide: no horizontal overflow, no clipped/overlapping
text, title remains legible.

### Scenario 3 — Production build lands in `api/static/`

```bash
cd frontend
npm run build
```

Expected: Vite writes the compiled output to `api/static/` (directory `static`
inside `api`). The folder contains `index.html` plus compiled CSS/JS assets.
Re-run the build: the previous output is cleared first (empty output dir), no
stale duplicate files remain.

### Scenario 4 — Backend serves the built page

Backend-owned wiring (owner applies per contract §2/§3). With the FastAPI app
serving `api/static`, opening the served page shows the built `PyEveProject`
page over HTTP.

Expected: the compiled page loads in a browser served from the backend, not only
from the Vite dev server.

### Scenario 5 — Accessibility spot-check

Open the built page with a screen reader or the browser's accessibility tree.

Expected: `PyEveProject` is announced as a top-level heading; decorative
starfield/panels are not announced; focus/keyboard is not trapped (no interactive
elements in v1).

## Lint / Quality Gates

```bash
cd frontend
npm run lint
npm run typecheck   # tsc --noEmit
npm run format      # if configured
```

Expected: all pass before the feature is considered done (per Constitution).

## Acceptance mapping

| User story / requirement | Validation |
|--------------------------|-----------|
| US-1 / FR-001 (shows "PyEveProject") | Scenarios 1, 2, 4 |
| FR-002 (EVE theme) | Scenario 2 (visual) |
| FR-003 (responsive) | Scenario 2 (resize) |
| FR-004 (semantic/accessible) | Scenarios 1, 5 |
| FR-005 (visible promptly, no interaction) | Scenarios 2, 4 |
| FR-006 (no main-thread blocking) | Scenario 4 (page interactive) |
| Build output → `api/static/` | Scenario 3 |
| Docker Compose to run the app | Scenario 2, 4 |
