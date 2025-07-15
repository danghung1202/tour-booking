# Coding Standards and Project Structure

This section defines the coding standards, style guides, and overall project structure to ensure consistency and maintainability.

## Project Structure

The project will follow the standard Next.js application structure within the monorepo.

```
apps/web/
|-- .vscode/         # VSCode settings
|-- app/             # Next.js App Router: main pages and layouts
|   |-- (auth)/        # Route group for auth pages (login, register)
|   |-- (dashboard)/   # Route group for protected dashboard pages
|   |-- api/           # API routes (e.g., /api/tours)
|   |-- layout.tsx     # Root layout
|   |-- page.tsx       # Homepage
|-- components/      # Shared React components
|   |-- ui/            # Simple, reusable UI elements (Button, Input, etc.)
|   |-- layout/        # Layout components (Header, Footer, Navbar)
|-- lib/             # Utility functions, helpers, and Supabase client
|-- public/          # Static assets (images, fonts)
|-- styles/          # Global styles
|-- types/           # Shared TypeScript type definitions
|-- .eslintrc.json   # ESLint configuration
|-- .gitignore       # Git ignore file
|-- next.config.mjs  # Next.js configuration
|-- package.json     # Project dependencies and scripts
|-- tsconfig.json    # TypeScript configuration
```

## Coding Standards

*   **Language:** All code will be written in TypeScript.
*   **Style Guide:** We will use the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) as a baseline, enforced automatically by ESLint and Prettier.
*   **Formatting:** Prettier will be used for automatic code formatting to ensure a consistent style across the codebase. A pre-commit hook will be set up to run Prettier on staged files.
*   **Component Design:**
    *   Components should be small and focused on a single responsibility.
    *   Use functional components with React Hooks.
    *   Props should be clearly defined with TypeScript interfaces.
*   **Naming Conventions:**
    *   **Components:** `PascalCase` (e.g., `TourCard.tsx`).
    *   **Files (non-component):** `kebab-case` (e.g., `db-helpers.ts`).
    *   **Variables/Functions:** `camelCase`.
    *   **Types/Interfaces:** `PascalCase`.
*   **Comments:** Code should be as self-documenting as possible. Use comments to explain *why* something is done, not *what* is being done. JSDoc blocks should be used for complex functions.
*   **Git Workflow:**
    *   All work will be done on feature branches (e.g., `feat/add-booking-page`).
    *   Pull Requests (PRs) must be reviewed before being merged into `main`.
    *   Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. 