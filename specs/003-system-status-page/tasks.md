---

description: "Task list for implementing the system status page"

---

# Tasks: System Status Page

**Input**: Design documents from `/specs/003-system-status-page/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included — the project convention mandates test coverage (Vitest + React Testing Library, tests placed next to code).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1 = view system status)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/` (frontend only — backend is out of scope per AGENTS.md)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No new dependencies required. Native `fetch` API and existing CSS custom properties are used. Existing `react-router-dom` router is already in place.

*No tasks in this phase — skip to Foundational.*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define TypeScript types for the health response. These types are imported by the StatusPage component and must exist first.

- [X] T001 Create TypeScript type definitions in `frontend/src/types/health.ts`: define `HealthStatus` (`'OK' | 'KO'`), `DependencyStatus` (status + optional detail), `EsiStatus` (extends DependencyStatus with optional players), and `SystemHealthResponse` (api, esi, database fields) per `data-model.md`

**Checkpoint**: Types defined — component can import and use typed state.

---

## Phase 3: User Story 1 - View System Status (Priority: P1) 🎯 MVP

**Goal**: Navigate to `/status` and see a page that fetches health data, displays three service cards with status indicators, and handles loading/error states.

**Independent Test**: Navigate to `/status` in the browser while the backend is running. Confirm three service cards (API, ESI, Database) display with correct status indicators. Confirm loading state appears during fetch. Confirm error state appears when backend is unreachable (quickstart.md scenarios 1–5).

### Tests for User Story 1

- [X] T002 [US1] Create StatusPage test file in `frontend/src/pages/StatusPage.test.tsx`: write tests for (a) renders loading state initially, (b) renders service cards on successful fetch, (c) renders error state on fetch failure, (d) displays player count for ESI when present, (e) hides detail text when null, (f) hides player count when null. Use `msw` or mock `global.fetch` with `vi.fn()`. Follow existing test patterns from `NotFound.test.tsx`

### Implementation for User Story 1

- [X] T003 [P] [US1] Create StatusPage component in `frontend/src/pages/StatusPage.tsx`: implement `useEffect` fetch to `GET /api/health` with loading/error/data states. Render page title ("System Status"), a grid of service cards, and conditional error message. Import types from `types/health.ts`. Use BEM class names (`status-page`, `status-card`, etc.). Map service keys to display names (api→"API", esi→"ESI", database→"Database")
- [X] T004 [P] [US1] Create StatusPage styles in `frontend/src/pages/StatusPage.css`: implement EVE-themed styling using CSS custom properties from `global.css` (`--bg-deep`, `--bg-panel`, `--gold`, `--starlight`, `--text-primary`, `--text-secondary`, `--hairline`, `--font-display`, `--font-body`, `--radius-panel`). Include: page layout (dark background with radial gradient), card grid (`repeat(auto-fit, minmax(280px, 1fr))`), card styles (panel background, gold border), status dot (green `#2ea043` for OK, red `#da3633` for KO), loading skeleton pulse animation, error state styling, responsive breakpoints (< 600px single column, 600-900px two columns, > 900px three columns). Follow BEM naming from `NotFound.css` conventions
- [X] T005 [US1] Register `/status` route in `frontend/src/App.tsx`: import `StatusPage` and add `<Route path="/status" element={<StatusPage />} />` inside `AppRoutes` (before the catch-all `*` route)

**Checkpoint**: User Story 1 fully functional — `/status` route works, fetches data, displays cards, handles all three states.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Verify quality gates and end-to-end behavior

- [X] T006 Run typecheck in `frontend/` container (`docker compose exec frontend npm run typecheck`) and fix any errors
- [X] T007 [P] Run test suite in `frontend/` container (`docker compose exec frontend npm run test:run`) and confirm all tests pass (App, EveTitle, NotFound, StatusPage)
- [X] T008 [P] Run build in `frontend/` container (`docker compose exec frontend npm run build`) and confirm successful output
- [X] T009 Execute all validation scenarios in `specs/003-system-status-page/quickstart.md` (scenarios 1–5) and confirm expected outcomes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Skipped — no new dependencies needed
- **Foundational (Phase 2)**: No dependencies — can start immediately
- **User Story 1 (Phase 3)**: Depends on Foundational completion (T001 types must exist)
- **Polish (Phase 4)**: Depends on all Phase 3 tasks being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (T001). No other stories to depend on.

### Within User Story 1

- Tests (T002) can be written first (write-first approach)
- Component (T003) and CSS (T004) can be developed in parallel
- Route registration (T005) depends on component existing (T003)

### Parallel Opportunities

- T003 and T004 can run in parallel (different files, component + styles)
- T007 and T008 can run in parallel (test suite + build)
- T002 (tests) and T003/T004 (implementation) can run in parallel if write-first approach is used

### Dependency Graph

```text
T001 (Types)
 └── T003 [US1] StatusPage.tsx ──┐
     T004 [US1] StatusPage.css ──┤
     T002 [US1] StatusPage tests ┘
      └── T005 [US1] Route registration
Polish: T006 → T007, T008 → T009
```

---

## Parallel Example: User Story 1

```bash
# Launch independent US1 tasks together:
Task: "Create StatusPage component in frontend/src/pages/StatusPage.tsx"
Task: "Create StatusPage styles in frontend/src/pages/StatusPage.css"
Task: "Create StatusPage test file in frontend/src/pages/StatusPage.test.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (T001) — types defined
2. Complete Phase 3: User Story 1 (T002–T005) — component, styles, tests, route
3. **STOP and VALIDATE**: Run typecheck, tests, build; navigate to `/status` in browser
4. Deploy/demo if ready — status page live at `/status`

### Incremental Delivery

1. Complete Foundational → types ready ✓
2. Add User Story 1 → StatusPage + styles + route → Test independently → Deploy/Demo
3. Run Polish quality gates (typecheck, tests, build, quickstart)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- User Story 1 is the only story — this is the entire MVP
- Verify tests fail before implementing where write-first applies
- Commit after each task or logical group
- Backend is out of scope — do not modify anything under `api/` (per AGENTS.md)
- Run all frontend commands inside the `frontend` Docker container (per AGENTS.md)
