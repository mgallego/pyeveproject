# Data Model: Client-Side Routing

**Date**: 2026-09-09
**Feature**: 002-client-side-routing

## Entities

This feature does not introduce new persistent data entities. The routing configuration is purely in-memory UI state.

### Route (configuration, not persisted)

| Attribute    | Description                                      |
|-------------|--------------------------------------------------|
| path        | URL pattern to match (e.g., "/", "*")            |
| element     | React component to render when matched            |

### Catch-All Route (configuration, not persisted)

| Attribute | Description                                        |
|----------|----------------------------------------------------|
| path     | Always `*` — matches any unmatched URL              |
| element  | NotFound component                                  |

## State Transitions

None. Routing state is managed by react-router internally via browser history. No application-level state management is introduced.

## Relationships

- Routes are defined in a flat list inside `<Routes>` in `App.tsx`
- The catch-all route (`*`) must be last in the list to ensure it only matches when no other route does
