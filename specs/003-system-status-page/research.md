# Research: System Status Page

**Feature**: 003-system-status-page

## R1: Health Endpoint Response Shape

**Decision**: Use the Pydantic models defined in `api/src/pyeveproject/status.py` as the source of truth.

**Rationale**: The backend defines `SystemStatus` with three fields: `api` (`DependencyStatus`), `esi` (`EsiStatus`), `database` (`DependencyStatus`). `DependencyStatus` has `status` (enum: "OK"/"KO") and optional `detail` (string). `EsiStatus` extends it with optional `players` (int).

**Alternatives considered**: Hardcoding the shape in frontend types — rejected because the backend models are authoritative and already exist.

**TypeScript type definition**:

```typescript
type HealthStatus = 'OK' | 'KO'

interface DependencyStatus {
  status: HealthStatus
  detail?: string | null
}

interface EsiStatus extends DependencyStatus {
  players?: number | null
}

interface SystemHealthResponse {
  api: DependencyStatus
  esi: EsiStatus
  database: DependencyStatus
}
```

## R2: API Base URL for Health Endpoint

**Decision**: Use relative URL `/api/health` (fetch against same origin).

**Rationale**: Vite dev server proxies `/api` to the backend (standard Vite proxy config). In production, the backend serves the SPA static files, so same-origin works. No need for environment-variable-based base URLs.

**Alternatives considered**: Absolute `http://localhost:8000/api/health` — rejected because it breaks in production and requires env config.

## R3: Fetch Error Handling Pattern

**Decision**: Check `response.ok` after fetch, catch network errors, and catch JSON parse errors separately.

**Rationale**: Three failure modes exist: network failure (fetch rejects), non-2xx HTTP (response.ok is false), and invalid JSON (response.json() rejects). Each should produce the same error state.

**Pattern**:

```typescript
try {
  const res = await fetch('/api/health')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data: SystemHealthResponse = await res.json()
  // set data
} catch (err) {
  // set error state
}
```

## R4: Loading State Strategy

**Decision**: Use a `loading` boolean state initialized to `true`, set to `false` after fetch completes (success or failure).

**Rationale**: Simple and sufficient for a single fetch with no polling. No need for Suspense or loading libraries.

## R5: Responsive Layout for Service Cards

**Decision**: CSS Grid with `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` for the card container.

**Rationale**: Auto-fit grid naturally wraps cards on smaller screens without media queries. On mobile (< 600px), cards stack vertically. On desktop, they sit in a row. Matches the GitHub/AWS status page pattern.

## R6: Status Indicator Styling

**Decision**: Small colored dot (circle) next to the service name — green (`#2ea043`) for OK, red (`#da3633`) for KO. Derived from existing EVE palette context but using standard traffic-light colors for immediate recognition.

**Rationale**: Traffic-light colors are universal for health status. The EVE theme is maintained through the card backgrounds, borders, and typography rather than overriding status colors. Adding EVE-tinted status colors (e.g., gold for OK) would reduce accessibility and recognition speed.

**Alternatives considered**: Gold for OK, red for KO — rejected because gold doesn't universally signal "healthy" and could confuse users expecting green/red.
