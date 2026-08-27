<!--
  Sync Impact Report
  Version change: unversioned template → 1.0.0
  Modified principles: n/a (template placeholders materialized for the first time)
  Added sections: I. Code Quality, II. Testing Standards, III. User Experience,
    IV. Consistency, V. Performance Requirements, Security & Dependency
    Constraints, Development Workflow & Quality Gates, Governance
  Removed sections: none
  Follow-up TODOs: none
-->

# PyEveProject Constitution

## Core Principles

### I. Code Quality

All code MUST pass linting and formatting checks before it is considered done.
Backend code is written by hand by the project owner and MUST pass `ruff` and
type checks; AI agents MUST NOT create or modify backend code. Frontend code MUST
follow React best practices: functional components and hooks, small
single-purpose components, and clean, readable TypeScript.

Rationale: This project is a portfolio piece. Code quality is the primary
product and must be protected at all costs.

### II. Testing Standards

Every change MUST be covered by tests. Backend tests use `pytest`; frontend
tests use Vitest and React Testing Library and MUST be placed next to the code
they test. The CI pipeline MUST run the full test suite, linter, and formatter;
a change is complete only when every gate passes. Tests MUST assert observable
behavior, not implementation details.

Rationale: Tests encode each feature's contract and prevent regressions as the
project grows incrementally in the owner's spare time.

### III. User Experience

User-facing features MUST be usable, accessible, and responsive. Markup MUST use
semantic HTML with proper accessibility attributes (ARIA, alt text, labels), and
interfaces MUST work on mobile, tablet, and desktop. Clarity and usability MUST
take priority over decoration.

Rationale: The frontend is the visible result of the project and its quality is an
explicit goal of the owner.

### IV. Consistency

All code MUST follow a single naming convention: PascalCase for components,
camelCase for variables and functions. The existing file and folder structure
MUST be respected. Code, comments, commit messages, and PRs MUST be written in
English. Features MUST reuse existing patterns and dependencies instead of
introducing parallel conventions.

Rationale: Consistency keeps the codebase predictable and reviewable across the
hand-written backend and the AI-assisted frontend.

### V. Performance Requirements

Features MUST meet defined performance expectations: no blocking of the main
thread, no avoidable network round-trips, and no unbounded growth of payloads,
queries, or rendered content. Expensive work MUST be deferred, batched, or
cached. A feature that cannot meet the performance budget MUST be flagged before
merge rather than shipped with silent degradation.

Rationale: EVE Online data (characters, finances, market) grows large; the app
must remain responsive as the user's data accumulates.

## Security & Dependency Constraints

Secrets (API keys, tokens, credentials) MUST never be committed to the repository
or logged. ESI tokens and third-party credentials MUST be stored and transmitted
securely. New dependencies MUST be justified before being added; prefer the
standard library and the existing modern stack (FastAPI, React) over new
packages.

## Development Workflow & Quality Gates

Code review is mandatory before merging. Reviewers MUST verify compliance with
this constitution, the CI checks, and the testing standards. A change is complete
only when it passes linting, formatting, type checks, and the test suite.

## Governance

This constitution supersedes all other ad-hoc practices. Amendments MUST be
documented, rationalized, and recorded with a version bump. Versioning follows
Semver: MAJOR for principle redefinitions or removals, MINOR for new principles
or materially expanded guidance, PATCH for clarifications. Compliance is reviewed
during code review. AI agents MUST follow AGENTS.md as the runtime development
guidance file.

**Version**: 1.0.0 | **Ratified**: 2026-08-27 | **Last Amended**: 2026-08-27