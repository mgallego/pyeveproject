# Contracts: EVE-Styled Frontend

**Date**: 2026-08-27
**Feature**: [spec.md](./spec.md)

This project is a web application (frontend + backend). For this feature the
relevant contracts are the **UI/accessibility contract** and the **build output
contract** between the frontend and the backend.

## 1. UI / Accessibility Contract

The frontend renders a single landing page whose behavior and markup are treated
as a contract with users and assistive technology.

- **Primary heading**: The application MUST render the text `PyEveProject` as a
  top-level (single `h1`) heading.
- **Semantic structure**: The title MUST use semantic HTML (`<h1>`) so assistive
  technology announces it as a heading.
- **Accessibility**: All static decorative elements MUST be non-interactive and
  non-announced (e.g., `aria-hidden`), and any meaningful element MUST carry an
  appropriate accessible name/label. No interactive control exists in v1.
- **Responsive**: Content MUST remain legible and unclipped between 320px and
  1920px wide with no horizontal overflow.

**Acceptance**: Verified via component tests and manual responsive/AT checks in
`quickstart.md`.

## 2. Build Output Contract (frontend → backend)

- **Source location**: All frontend source lives under `frontend/`.
- **Build destination**: The production build output MUST be written to
  `api/static/` (the folder named `static` inside the `api` directory).
- **Contents**: The emitted bundle contains the compiled HTML, CSS, and
  JavaScript for the page.
- **Purity**: The `frontend/` source tree must remain the single source of
  truth; `api/static` is a generated artifact (not hand-edited, and covered by
  `.gitignore`/`emptyOutDir` handling).
- **Serving (backend-owned)**: The backend serves these static assets; wiring is
  a backend/infrastructure concern handled by the project owner (per AGENTS.md).

**Important scope note**: The backend service, `docker-compose.yml`, and CI are
authored/owned by the project owner. AI-authored work is limited to the frontend
source under `frontend/`. The build-output destination and compose workflow are
documented here as constraints for the owner to wire up.

## 3. Runtime / Docker Compose Contract

- The application MUST be runnable via **Docker Compose**.
- The `frontend` service runs the Vite dev server; a production build is produced
  with `vite build` (emitting to `api/static`).
- The `backend` service remains the FastAPI app that serves the built assets.

**Acceptance**: `docker compose up` starts the app; the built page is reachable.
