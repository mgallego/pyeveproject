# Quickstart: System Status Page

**Feature**: 003-system-status-page

## Prerequisites

- Backend running at `http://localhost:8000` (or configured port)
- Frontend dev server running (`npm run dev` inside `frontend/` container)
- Health endpoint accessible at `GET /api/health`

## Validation Scenarios

### 1. Healthy System

**Setup**: Backend running, all services healthy.

**Steps**:
1. Open browser to `http://localhost:5173/status`
2. Observe the page loads with a brief spinner
3. Three service cards appear: API, ESI, Database
4. Each card shows a green dot and "Operational" text
5. ESI card shows player count (e.g., "23,456 players")

**Expected**: All three cards visible, green indicators, player count on ESI.

### 2. Degraded Service

**Setup**: Backend running, ESI endpoint returning error (e.g., ESI API down).

**Steps**:
1. Open browser to `http://localhost:5173/status`
2. Observe API and Database cards show green "Operational"
3. ESI card shows red dot and "Degraded" or "KO"
4. ESI detail text shows the error message from the backend

**Expected**: Mixed states displayed correctly, detail text visible on degraded service.

### 3. Error State

**Setup**: Backend stopped or `/api/health` unreachable.

**Steps**:
1. Open browser to `http://localhost:5173/status`
2. Observe the error state appears after fetch fails
3. Error message reads "Unable to retrieve system status"
4. Subtext suggests refreshing the page

**Expected**: Clear error state, no crash, no blank page.

### 4. Responsive Layout

**Steps**:
1. Open `/status` at 1920px width — cards should be in a row
2. Resize to 768px — cards should reflow to 2-column + 1
3. Resize to 375px — cards should stack vertically
4. Verify no horizontal scroll at any width

**Expected**: Cards reflow gracefully, no overflow, readable at all sizes.

### 5. Loading State

**Steps**:
1. Throttle network to "Slow 3G" in browser dev tools
2. Navigate to `/status`
3. Observe skeleton/pulse placeholders appear before data loads

**Expected**: Loading indicator visible for any request > 200ms.

## Route Verification

```
GET /status → StatusPage component renders
GET /api/health → JSON response with api, esi, database fields
```
