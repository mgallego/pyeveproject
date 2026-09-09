# Feature Specification: System Status Page

**Feature Branch**: `003-system-status-page`

**Created**: 2026-09-09

**Status**: Draft

**Input**: User description: "Build a system status page at the /status route. The page fetches GET /api/health and displays each service (api, esi, database) with its status (OK/KO) and optional detail. The ESI service also shows a player count when available. The response shape from the API is: { api: { status, detail }, esi: { status, detail, players }, database: { status, detail } }. The design should look like common system status pages (similar to GitHub or AWS status pages) but styled with the existing EVE Online space theme (dark backgrounds, gold and starlight blue accents). No auto-refresh — just load once on page visit. Show a loading state while fetching and an error state if the request fails."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View system status (Priority: P1)

A user navigates to the /status route to check the health of the system's backend services. The page loads, fetches the latest health data, and presents a clear overview of each service's status. The user sees at a glance which services are operational and which are experiencing issues.

**Why this priority**: This is the core capability — displaying system health information to the user. Without this, the feature has no value.

**Independent Test**: Navigate to /status in a browser while the backend is running. Confirm the page displays the status of all three services (API, ESI, Database) with their current states.

**Acceptance Scenarios**:

1. **Given** the backend is running and all services are healthy, **When** I navigate to /status, **Then** I see three services listed (API, ESI, Database), each showing an "OK" status indicator.
2. **Given** the backend is running and one service is degraded, **When** I navigate to /status, **Then** I see that service marked as "KO" with its detail message displayed.
3. **Given** the backend is running and the ESI service is healthy with player data available, **When** I view the ESI service card, **Then** I see the current player count displayed.
4. **Given** the page is loading health data, **When** I view the page before the data arrives, **Then** I see a loading indicator (spinner or skeleton state).
5. **Given** the health endpoint is unreachable or returns an error, **When** I view the page, **Then** I see an error state message indicating the status could not be retrieved.
6. **Given** the page is displayed, **When** I resize the browser to mobile, tablet, and desktop widths, **Then** the status cards remain legible and properly laid out.

### Edge Cases

- The health endpoint returns a partial response (e.g., missing one service). The page displays only the services present in the response.
- The health endpoint returns a non-JSON response. The page shows the error state.
- The health endpoint returns a response with an unexpected status value (neither "OK" nor "KO"). The page displays the value as-is without crashing.
- The player count field is absent or null for the ESI service. The player count section is not shown.
- The page is opened offline (no network). The error state is displayed immediately.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST provide a route at `/status` that displays the system status page.
- **FR-002**: On page load, the application MUST send a single GET request to the health endpoint to retrieve service status data.
- **FR-003**: The page MUST display a card or row for each of the three services: API, ESI, and Database.
- **FR-004**: Each service card MUST show the service name, its status indicator ("OK" or "KO"), and any detail text provided.
- **FR-005**: The ESI service card MUST display the player count when the value is present and valid in the response.
- **FR-006**: The page MUST show a loading state (spinner, skeleton, or similar indicator) while the health data is being fetched.
- **FR-007**: The page MUST show an error state if the health request fails (network error, non-2xx response, or invalid JSON).
- **FR-008**: The page MUST NOT auto-refresh or poll. Data is loaded once on page visit.
- **FR-009**: The visual design MUST follow the existing EVE Online space theme: dark backgrounds, gold and starlight blue accents.
- **FR-010**: The design MUST resemble standard system status pages (e.g., GitHub status, AWS health dashboard) in layout and clarity.
- **FR-011**: The page MUST be responsive and usable on mobile, tablet, and desktop viewports.
- **FR-012**: Status indicators MUST use visual cues (color, icon, or both) to distinguish OK from KO states at a glance.

### Key Entities

- **Service Status**: Represents the health of a single backend service. Fields: service name, status (OK/KO), optional detail text.
- **Health Response**: The aggregate response containing status for all services. May also include metadata like player count for ESI.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can determine the health of all three services within 5 seconds of navigating to /status on a standard connection.
- **SC-002**: The page renders without horizontal scrolling or content overlap on viewports from 320px to 1920px wide.
- **SC-003**: The loading state is visible for any request taking longer than 200ms, preventing a blank or unstyled flash.
- **SC-004**: An error state is clearly distinguishable from a healthy state, with no ambiguity about whether services are up.

## Assumptions

- The health endpoint (`GET /api/health`) is already implemented and returns the specified JSON shape.
- The existing EVE Online theme (dark backgrounds, gold/blue accents) is already established in the frontend and can be reused for this page.
- No authentication is required to view the status page.
- The feature is read-only; no actions or controls are needed on the page.
- "Player count" for ESI is a nice-to-have display field; its absence does not constitute an error.
