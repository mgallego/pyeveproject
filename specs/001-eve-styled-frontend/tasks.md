---

description: "Task list for implementing the EVE-styled frontend"
---

# Tasks: EVE-Styled Frontend

**Input**: Design documents from `/specs/001-eve-styled-frontend/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Test tasks are included because the Constitution (and AGENTS.md) requires every change to be covered by Vitest + React Testing Library tests placed next to the code.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/` (all AI-authored frontend code). Build output goes to `api/static/` (backend-owned wiring, per plan).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create the minimal React + Vite + TypeScript frontend scaffold: `frontend/package.json`, `frontend/tsconfig.json`, `frontend/tsconfig.node.json`, `frontend/vite.config.ts`, `frontend/index.html`, `frontend/.gitignore`
- [X] T002 Add minimal dependencies to `frontend/package.json`: `react` and `react-dom` (dependencies); `vite`, `@vitejs/plugin-react`, `typescript`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` (devDependencies)
- [X] T003 Configure `frontend/vite.config.ts`: React plugin, `test` block for Vitest (environment `jsdom`, setup file), and `build.outDir: '../api/static'` with `build.emptyOutDir: true` so `npm run build` emits to `api/static/`
- [X] T004 Configure `frontend/tsconfig.json` with strict TypeScript settings and path settings for Vite/React
- [X] T005 Create Vitest setup file `frontend/src/test/setup.ts` importing `@testing-library/jest-dom`, and reference it from the `test.setupFiles` config in `vite.config.ts`
- [X] T006 Add npm scripts to `frontend/package.json`: `dev`, `build` (`tsc --noEmit && vite build`), `preview`, `test` (`vitest`), `test:run` (`vitest run`), `typecheck` (`tsc --noEmit`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before the user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Create `frontend/index.html`: semantic root markup with proper `lang`, `<meta>` and the React mount point; wire the global theme CSS
- [X] T008 Create `frontend/src/main.tsx` that mounts the React app into the `#root` element and imports the global stylesheet
- [X] T009 Create the global theme stylesheet `frontend/src/styles/global.css` defining CSS custom properties for the EVE palette (near-black navy background, gold `#d9a441` accent, starlight-blue `#7fb4d4` accent) used across the app

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - View the styled landing display (Priority: P1) 🎯 MVP

**Goal**: Render "PyEveProject" with an EVE Online-inspired deep-space starbase theme (dark navy + gold/sapphire, starfield, angular panels), fully responsive and accessible.

**Independent Test**: Open the Vite dev server (or the built page) and confirm "PyEveProject" displays prominently with the EVE theme; the `EveTitle` component test passes asserting the title is a heading with an accessible name.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T010 [P] [US1] Write `frontend/src/components/EveTitle.test.tsx`: asserts `EveTitle` renders the text `PyEveProject`, uses a single `h1` heading, and exposes it with an accessible name

### Implementation for User Story 1

- [X] T011 [US1] Create `frontend/src/App.tsx` rendering the `EveTitle` component within a semantic `<main>` element
- [X] T012 [US1] Create `frontend/src/App.test.tsx` asserting `App` renders the `PyEveProject` heading (depends on T011)
- [X] T013 [P] [US1] Create `frontend/src/components/EveTitle.tsx`: a functional component rendering `<h1>PyEveProject</h1>` with the EVE display styling and class hooks for the theme
- [X] T014 [P] [US1] Create `frontend/src/components/EveTitle.css` (or extend `App.css`) for the EVE-styled title: condensed sci-fi uppercase display type, gold gradient/hairline treatment, glow, responsive font sizing
- [X] T015 [US1] Create the EVE theme atmosphere in `frontend/src/styles/` (e.g., `atmosphere.css`): layered starfield/nebula background using pure CSS or an inline SVG, radial gradients, subtle vignette/noise, decorative angular panel borders (all `aria-hidden` / non-focusable decorative elements)
- [X] T016 [US1] Add the CSS-only page-load reveal to `frontend/src/styles/`: staggered fade/slide-in for the title and background layers, twinkling star animation, respecting `prefers-reduced-motion`
- [X] T017 [US1] Ensure responsive behavior in the CSS: no horizontal overflow and legible, unclipped title across 320px–1920px

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple areas and validation

- [X] T018 Run `npm test` in `frontend/` and confirm all Vitest + React Testing Library tests pass (T010, T012)
- [X] T019 Run `npm run typecheck` (`tsc --noEmit`) in `frontend/` and fix any TypeScript errors
- [X] T020 Run `npm run build` in `frontend/` and confirm the compiled output lands in `api/static/` (contract §2) with no stale duplicate files
- [X] T021 Manually validate the built page per `quickstart.md` scenarios: responsive 320px–1920px, accessibility spot-check (title announced as heading, decorative elements not announced), theme visually identifies as EVE
- [X] T022 Confirm the page REMAINS visible if any decorative resource fails (fallback background keeps title legible), per spec Edge Cases
- [X] T023 Confirm frontend code follows project conventions: PascalCase components, camelCase IDs, English naming, no secrets, no intro of new dependencies beyond those in T002

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS the user story
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **Polish (Phase 4)**: Depends on the user story being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — the only user story; no cross-story dependencies

### Within User Story 1

- Tests (T010) MUST be written and FAIL before implementation
- App + component + tests before styling/atmosphere; styling is layered on top
- Core implementation before polish/validation

### Parallel Opportunities

- **T010** and **T013** can start in parallel once foundation lands (different files: test vs component)
- **T013** and **T014** are parallelizable across files only after T013's component skeleton exists; keep them ordered to avoid churn
- **T015** and **T016** are tightly coupled style layers — treat sequentially
- Polish tasks (T018–T023) run after the story implementation completes

---

## Parallel Example: User Story 1

```bash
# Launch the test and the component skeleton together:
Task: "Write tests for EveTitle in frontend/src/components/EveTitle.test.tsx"
Task: "Create EveTitle component in frontend/src/components/EveTitle.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks the story)
3. Complete Phase 3: User Story 1 (write test first → implement → style → animate → responsive)
4. **STOP and VALIDATE**: run tests, typecheck, build; verify output lands in `api/static/`
5. Demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready (scaffold + theme vars)
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Because US1 is the only story, this completes the iteration

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to the user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- **Scope (per AGENTS.md)**: AI implements only frontend source under `frontend/`. Wiring `api/static/` serving and `docker-compose.yml` is backend-owned; those contracts are validated in T020–T021 after the owner wires them (see plan.md and contracts/contracts.md)
