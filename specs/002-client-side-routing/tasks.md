---

description: "Task list for implementing client-side routing"

---

# Tasks: Client-Side Routing

**Input**: Design documents from `/specs/002-client-side-routing/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included — the project constitution mandates test coverage (Vitest + React Testing Library, tests placed next to code).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1 = landing at root, US2 = not-found page, US3 = extensibility)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/` (frontend only — backend is out of scope per AGENTS.md)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add the only new dependency required by the feature

- [X] T001 Install react-router-dom@7 in `frontend/package.json` (run `npm install react-router-dom@7` in `frontend/`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Route the existing App content through the router. Blocks both user stories — US1 renders the root route, US2 adds the catch-all route, both live in the same `AppRoutes` component.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T002 Create routing infrastructure in `frontend/src/App.tsx`: extract the existing landing markup (atmosphere div + main stage) into an inline `Landing` component, create an inner `AppRoutes` component containing `<Routes>` with root `<Route path="/">` rendering `Landing`, and export `App` that wraps `<BrowserRouter>` around `<AppRoutes />`. Keep `import './App.css'`

**Checkpoint**: Router wired — root path "/" renders the landing page. This is the MVP.

---

## Phase 3: User Story 1 - Landing Page at Root Path (Priority: P1) 🎯 MVP

**Goal**: Root path "/" renders the existing landing page (EveTitle + atmosphere background) identically to the current implementation.

**Independent Test**: Navigate to "/" in the browser and confirm the landing page looks and behaves exactly as before, including refresh (quickstart.md V1).

### Tests for User Story 1

- [X] T003 [US1] Create landing route test in `frontend/src/App.test.tsx`: render `AppRoutes` inside `<MemoryRouter initialEntries={["/"]}>` and assert the "PyEveProject" heading renders at the root path

### Implementation for User Story 1

- [X] T004 [P] [US1] Verify visual parity of the landing page at "/" against the current implementation (run `npm run dev`, open `http://localhost:5173/`, compare per `quickstart.md` V1); confirm global styles, atmosphere background, and title animations are unchanged

**Checkpoint**: User Story 1 fully functional — root path works and is independently testable.

---

## Phase 4: User Story 2 - Catch-All "Not Found" Page (Priority: P2)

**Goal**: Any URL that does not match a defined route displays a simple "not found" message instead of a blank screen.

**Independent Test**: Navigate to any undefined path (e.g., "/nonexistent-page"), confirm the "Page Not Found" message renders and persists on refresh; browser back returns to the previous page (quickstart.md V2).

### Tests for User Story 2

- [X] T005 [P] [US2] Create NotFound component tests in `frontend/src/pages/NotFound.test.tsx` (asserts h1 "Page Not Found" and message are rendered; single h1)

### Implementation for User Story 2

- [X] T006 [P] [US2] Create NotFound page component in `frontend/src/pages/NotFound.tsx` using semantic HTML (`<main>` + `<h1>` "Page Not Found" + short message) styled with existing CSS custom properties (`--text-primary`, `--font-body`, `--bg-deep`); no navigation links
- [X] T007 [US2] Add catch-all route `<Route path="*" element={<NotFound />} />` as the LAST route inside `AppRoutes` in `frontend/src/App.tsx` (depends on T006)
- [X] T008 [US2] Add catch-all navigation test in `frontend/src/App.test.tsx`: render `AppRoutes` inside `<MemoryRouter initialEntries={["/nonexistent-page"]}>` and assert the "Page Not Found" heading renders (depends on T007)

**Checkpoint**: User Stories 1 AND 2 work independently.

---

## Phase 5: User Story 3 - Future Route Extensibility (Priority: P3)

**Goal**: The `AppRoutes` structure supports adding new pages by appending a single `<Route>` entry, without touching the router configuration.

**Independent Test**: Add a temporary `<Route path="/about">` in `AppRoutes` during development — it renders at "/about" while root and catch-all keep working; remove the temporary route after verification.

### Implementation for User Story 3

- [X] T009 [US3] Add extensibility regression test in `frontend/src/App.test.tsx`: render `AppRoutes` with a test-only route array that includes an added path plus root and catch-all, and assert all three path targets render correctly without interfering with each other
- [X] T010 [US3] Add an "Adding New Routes" section to `specs/002-client-side-routing/research.md` documenting the `AppRoutes` extension pattern (append a `<Route>` entry with a path + element) so future features follow the same approach

**Checkpoint**: All user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify quality gates and end-to-end behavior across all stories

- [X] T011 Run `npm run typecheck` in `frontend/` (tsc --noEmit) and fix any errors
- [X] T012 [P] Run `npm run test:run` in `frontend/` and confirm all tests pass (App, EveTitle, NotFound)
- [X] T013 [P] Run `npm run build` in `frontend/` and confirm successful build output to `../api/static/`
- [X] T014 Execute all validation scenarios in `specs/002-client-side-routing/quickstart.md` (V1–V5) and confirm expected outcomes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational completion
  - User stories proceed in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (T002). No dependency on other stories
- **User Story 2 (P2)**: Can start after Foundational (T002); adds the catch-all route into `AppRoutes`. Independently testable
- **User Story 3 (P3)**: Can start after Foundational (T002) and US1 test (T003); test-only verification. Independently testable

### Within Each User Story

- Tests for US2 (T005) can run before implementation (write-first)
- Implementation before integration (NotFound component → catch-all route → navigation test)
- Story complete before moving to next priority

### Parallel Opportunities

- T005 and T006 can run in parallel (different files)
- T012 and T013 can run in parallel
- Once Foundational (T002) completes, US1, US2, and US3 test work can start in parallel

### Dependency Graph

```text
T001 (Setup)
 └── T002 (Foundational: BrowserRouter + AppRoutes + root route)
     ├── T003 [US1] landing route test
     │    └── T004 [US1] visual parity check
     ├── T005 [US2] NotFound tests  ──┐
     ├── T006 [US2] NotFound.tsx ─────┤
     ├── T007 [US2] catch-all route ──┤→ T008 [US2] catch-all nav test
     └── T009 [US3] extensibility test
          └── T010 [US3] doc note
Polish: T011 → T012, T013 → T014
```

---

## Parallel Example: User Story 2

```bash
# Launch all independent US2 tasks together:
Task: "Create NotFound component tests in frontend/src/pages/NotFound.test.tsx"
Task: "Create NotFound page component in frontend/src/pages/NotFound.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001)
2. Complete Phase 2: Foundational (T002) — BLOCKS all stories, deliver routing skeleton
3. Complete Phase 3: User Story 1 (T003, T004)
4. **STOP and VALIDATE**: Test User Story 1 independently (navigate to "/", refresh)
5. Deploy/demo if ready — landing page unchanged, routing infrastructure live

### Incremental Delivery

1. Complete Setup + Foundational → router wired, landing at root ✓ (MVP)
2. Add User Story 2 → NotFound + catch-all → Test independently → Deploy/Demo
3. Add User Story 3 → extensibility verification + doc → Test independently
4. Run Polish quality gates (typecheck, tests, build, quickstart)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Verify tests fail before implementing where write-first applies
- Commit after each task or logical group
- Backend is out of scope — do not modify anything under `api/` (per AGENTS.md)