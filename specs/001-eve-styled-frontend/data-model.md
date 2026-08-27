# Data Model: EVE-Styled Frontend

**Date**: 2026-08-27
**Feature**: [spec.md](./spec.md)

## Overview

This feature is a purely presentational static landing page. It renders the
title "PyEveProject" with an EVE Online-inspired theme. There is **no persistent
data, no domain entities, and no server-side state** involved.

## Entities

None. The page fetches no data and stores nothing.

## Derived from the spec

- **FR-001** (display "PyEveProject"): static text, no backing data.
- **FR-004** (semantic/accessible title): markup-level concern, not data.
- Assumptions in `spec.md` explicitly scope out login, data features, and
  navigation for this iteration.

## Future consideration (out of scope for v1)

When subsequent features introduce EVE characters/finances, a data model will be
defined here. That model will live at the backend level and is outside the
frontend-only AI scope (see `AGENTS.md` and the Constitution).
