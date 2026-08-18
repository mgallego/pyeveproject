# AGENTS.md

## Project scope for AI agents

This is a **Python backend** project. The backend (Python code, the REST API, infrastructure, CI/CD, deployment, and monitoring) is **written by hand by the project owner**. AI agents must **never** modify, create, or touch any backend file, configuration, or tooling.

AI agents are allowed to work **only** on the **frontend**: JavaScript (JS), styles (CSS), and HTML. Anything outside that scope must be left alone.

## Frontend stack

- **React** as the framework, scaffolded with **Vite**.
- **TypeScript** for the frontend code.
- Component-based structure under `frontend/`.

## Working with user specs

- When the user gives a spec to implement, ask questions to clarify requirements and make recommendations before starting.
- Actively recommend frontend approaches, patterns, and tools you think are a better fit for the task.
- Explain your recommendations clearly so the user can decide.

## Good practices

- Use React best practices: functional components and hooks, small and focused components.
- Keep components small and single-purpose.
- Use semantic HTML and proper accessibility attributes (ARIA, alt text, labels).
- Follow a consistent naming convention: `PascalCase` for components, `camelCase` for variables and functions.
- Do not add comments unless they explain non-obvious logic.
- Never commit secrets or API keys.
- Do not add new dependencies without asking first.

## Testing

- Write tests where possible using **Vitest** and **React Testing Library**.
- Place tests next to the code they test (e.g. `Button.test.jsx`).
- Before finishing a task, run the test suite and the linter if present.

## Skills

- Use all the relevant skills available for the task (e.g. frontend, React, testing) before and while implementing.
- Load the appropriate skills and follow their instructions.

## Conventions

- Everything (code, comments, commit messages, PRs) written in English.
- Respect the existing file and folder structure.
