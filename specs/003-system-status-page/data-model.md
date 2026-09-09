# Data Model: System Status Page

**Feature**: 003-system-status-page

## Entities

### SystemHealthResponse

The top-level response from `GET /api/health`.

| Field    | Type              | Required | Description                        |
|----------|-------------------|----------|------------------------------------|
| `api`    | DependencyStatus  | Yes      | Health status of the API service   |
| `esi`    | EsiStatus         | Yes      | Health status of the ESI service   |
| `database` | DependencyStatus | Yes      | Health status of the Database service |

### DependencyStatus

Health status for a single backend service.

| Field    | Type              | Required | Default | Description                          |
|----------|-------------------|----------|---------|--------------------------------------|
| `status` | `'OK' \| 'KO'`   | Yes      | —       | Current health status                |
| `detail` | `string \| null`  | No       | `null`  | Optional human-readable detail text  |

### EsiStatus (extends DependencyStatus)

Health status for the ESI service, with additional player count.

| Field     | Type              | Required | Default | Description                          |
|-----------|-------------------|----------|---------|--------------------------------------|
| `status`  | `'OK' \| 'KO'`   | Yes      | —       | Current health status                |
| `detail`  | `string \| null`  | No       | `null`  | Optional human-readable detail text  |
| `players` | `number \| null`  | No       | `null`  | Current player count from ESI API    |

## TypeScript Types

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

## State Transitions

No state transitions — this is a read-only display. The component has three possible UI states:

| State     | Trigger                                     | Display                                      |
|-----------|---------------------------------------------|----------------------------------------------|
| Loading   | Component mounts, fetch in progress         | Spinner/skeleton placeholder                 |
| Success   | Fetch completes with valid JSON + 2xx       | Service cards with status indicators         |
| Error     | Network failure, non-2xx, or invalid JSON   | Error message with retry guidance            |

## Validation Rules

- If `detail` is `null` or absent, the detail text area is hidden (not shown as "null" or empty).
- If `players` is `null`, `undefined`, or not a number, the player count section is hidden.
- If `status` is a value other than `"OK"` or `"KO"`, it is displayed as-is (graceful degradation for forward compatibility).
