---
epic: "Epic 1 Project Foundation & Core Platform Setup"
status: "Ready for Dev"
points: 8
---

# Story 1.1: initial-project-setup

### Status
- Ready for Dev

### Story
**As a** Developer,
**I want** to set up a new Next.js project with TypeScript, connect it to a Supabase backend, and establish a basic CI/CD pipeline to Vercel,
**so that** we have a foundational, deployable codebase to build upon.

### Acceptance Criteria
1. A new Next.js application is initialized with TypeScript.
2. The application is configured to connect to the Supabase project using environment variables.
3. The project is pushed to a new Git repository.
4. A Vercel project is created and linked to the Git repository for automated deployments.
5. Successful pushes to the `main` branch deploy automatically to the Vercel production environment.
6. Pushes to any other branch create a Vercel "Preview Deployment".

### Tasks / Subtasks
- [x] Task 1: Initialize Next.js application with TypeScript using `create-next-app`. (AC: #1)
- [x] Task 2: Create `.env.local` file and add Supabase URL and Anon Key. (AC: #2)
- [x] Task 3: Add `.env.local` to `.gitignore`. (AC: #2)
- [x] Task 4: Initialize a new Git repository and perform an initial commit. (AC: #3)
- [x] Task 5: Create a new Vercel project and link it to the Git repository. (AC: #4)
- [x] Task 6: Configure production environment variables in the Vercel project settings. (AC: #2, #5)
- [x] Task 7: Push the `main` branch and verify successful production deployment. (AC: #5)
- [ ] Task 8: Create a new branch (e.g., `dev`), push it, and verify successful preview deployment. (AC: #6)

### Dev Notes
This story establishes the fundamental scaffolding for the entire project. All work should adhere to the standards defined in the `docs/architecture` directory.

*   **Tech Stack:**
    *   **Next.js:** Use version ~14.2.
    *   **TypeScript:** Use version ~5.4.
*   **Environment Variables:**
    *   Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for the Supabase connection.
*   **Deployment:**
    *   The CI/CD pipeline is fully managed by Vercel's Git integration. No custom pipeline configuration is needed.

#### Testing
*   **Scope:** Testing for this foundational story is manual.
*   **Priority:** High (Manual).
*   **Tasks:**
    *   Manually verify the Vercel production deployment by accessing the URL after merging to `main`.
    *   Manually verify the Vercel preview deployment by accessing the unique URL generated from a feature branch push.
    *   No automated tests (Unit, Integration, E2E) are required for this story.

### Change Log
| Date | Version | Description | Author |
| --- | --- | --- | --- |
|      |         |             |        |

### Dev Agent Record
#### Agent Model Used
Claude 3.7 Sonnet

#### Debug Log References
- Encountered issue with PowerShell command chaining using `&&`
- Used separate commands for directory creation and navigation
- Tailwind was installed by default despite specifying `--tailwind false`
- Removed Tailwind dependencies and configured CSS Modules

#### Completion Notes List
- Successfully initialized Next.js project with TypeScript
- Set up Supabase client
- Configured CSS Modules for styling
- Created sample components (Header) with CSS Modules
- Updated project structure and README
- Environment variables are configured in .env.local (placeholder values)
- .env.local is properly excluded in .gitignore

#### File List
- web/src/app/page.tsx
- web/src/app/page.module.css
- web/src/app/layout.tsx
- web/src/app/globals.css
- web/src/lib/supabase.ts
- web/src/components/Header.tsx
- web/src/components/Header.module.css
- web/.env.local
- web/README.md
- web/package.json
- web/postcss.config.mjs

### QA Results
_To be populated by QA Agent_ 