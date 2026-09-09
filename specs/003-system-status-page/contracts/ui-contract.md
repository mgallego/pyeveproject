# UI Contract: System Status Page

**Feature**: 003-system-status-page

## Page Layout

```
┌─────────────────────────────────────────────┐
│  [atmosphere background - fixed]            │
│                                             │
│  ┌────────────────────────────────────────┐ │
│  │         SYSTEM STATUS                  │ │
│  │         Last checked: [time]           │ │
│  │                                        │ │
│  │  ┌──────────┐ ┌──────────┐ ┌────────┐ │ │
│  │  │ ● API    │ │ ● ESI    │ │ ● DB   │ │ │
│  │  │   OK     │ │   OK     │ │   KO   │ │ │
│  │  │          │ │ 12,345   │ │ Not    │ │ │
│  │  │          │ │ players  │ │ impl.  │ │ │
│  │  └──────────┘ └──────────┘ └────────┘ │ │
│  └────────────────────────────────────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

## Component Hierarchy

```
StatusPage
├── h1.page-title              "System Status"
├── p.page-subtitle            "Last checked: ..." (optional timestamp)
├── div.status-grid            (CSS Grid container)
│   ├── ServiceCard (api)
│   ├── ServiceCard (esi)
│   └── ServiceCard (database)
└── div.status-error           (error state, conditional)
```

## ServiceCard Shape

Each card renders:
- **Status dot**: 10px circle, green (`#2ea043`) for OK, red (`#da3633`) for KO
- **Service name**: Uppercase, gold gradient text (display font)
- **Status text**: "Operational" for OK, "Degraded" for KO (or the raw status value)
- **Detail text** (optional): Muted secondary text below status
- **Player count** (ESI only, optional): "X,XXX players" in starlight blue

## States

### Loading State
- Page title visible
- Three card placeholders with pulsing skeleton animation (muted panel color)
- No status dots or text visible

### Error State
- Page title visible
- Error card centered with red-tinted border
- Message: "Unable to retrieve system status"
- Subtext: "The health endpoint may be unreachable. Try refreshing the page."

### Success State
- Page title visible
- Three service cards populated with live data
- Status dots colored appropriately
- Detail text shown only when present
- Player count shown only for ESI when present

## Responsive Behavior

| Viewport     | Card Layout                         |
|--------------|--------------------------------------|
| < 600px      | Single column, full width            |
| 600-900px    | Two columns, last card spans full    |
| > 900px      | Three columns, equal width           |

## Accessibility

- Page heading is `<h1>` for document structure
- Status dots have `aria-label` (e.g., "Status: OK")
- Error state uses `role="alert"` for screen reader announcement
- Loading state uses `aria-busy="true"` on the grid container
