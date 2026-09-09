# Quickstart: Client-Side Routing

**Date**: 2026-09-09
**Feature**: 002-client-side-routing

## Prerequisites

- Node.js 20+
- `npm install` completed in `frontend/`

## Setup

```bash
cd frontend
npm install react-router-dom@7
```

## Validation Scenarios

### V1: Landing page at root path

1. Run `npm run dev` in `frontend/`
2. Open browser to `http://localhost:5173/`
3. **Expected**: Landing page with EveTitle and atmosphere background renders exactly as before
4. Refresh the page — **Expected**: Same landing page reloads

### V2: Catch-all "not found" page

1. With dev server running, navigate to `http://localhost:5173/nonexistent-page`
2. **Expected**: "Page Not Found" heading and message displayed
3. Refresh the page — **Expected**: Same "not found" page persists (deep-link works)
4. Use browser back button — **Expected**: Returns to previous page (landing or other)

### V3: Existing tests pass

```bash
cd frontend
npm run test:run
```

**Expected**: All existing tests (App.test.tsx, EveTitle.test.tsx) pass. New NotFound test passes.

### V4: Type check passes

```bash
cd frontend
npm run typecheck
```

**Expected**: No TypeScript errors.

### V5: Build succeeds

```bash
cd frontend
npm run build
```

**Expected**: Build completes successfully, output in `../api/static/`.
