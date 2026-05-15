---
name: Frontend Coding Standards
description: Guidelines for React/TypeScript development
applyTo: 'webapp/src/**'
---

# Frontend Coding Guidelines

## Tech Stack

- React 18+ with Functional Components.
- TypeScript with strict typing.
- TanStack Query for server state.
- Zustand for client state.
- Tailwind CSS with mobile-first styling.
- Shadcn/UI for base UI components.
- Vitest for unit tests.
- Playwright for critical user flows.

## General Rules

- Follow existing project structure and coding style.
- Make small, focused changes.
- Do not refactor unrelated files.
- Reuse existing components, hooks, services, types, constants, and utilities.
- Do not add new libraries unless necessary.
- Keep code readable over clever.
- Prefer simple solutions over over-engineering.
- Preserve existing behavior unless explicitly asked to change it.

## File Organization

- Keep feature-specific code inside `features/<feature-name>`.
- Keep shared UI in `components/shared` or `components/ui`.
- Keep reusable hooks in `hooks`.
- Keep shared utilities in `utils` or `lib`.
- Keep shared types in `types`.
- Keep constants close to the feature unless reused globally.
- Avoid folders like `common2`, `new`, `temp`, `misc`, or `backup`.

```txt
webapp/src/
├─ components/
│  ├─ ui/
│  └─ shared/
├─ features/
│  └─ user/
│     ├─ components/
│     ├─ hooks/
│     ├─ services/
│     ├─ types/
│     └─ utils/
├─ hooks/
├─ lib/
├─ stores/
├─ types/
└─ utils/
```
