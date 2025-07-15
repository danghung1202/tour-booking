# Tech Stack

This section is the single source of truth for all technologies, frameworks, and libraries to be used in the project. All development must adhere to these choices and specified versions to ensure consistency and prevent integration issues.

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Language** | TypeScript | \~5.4 | Type-safe development, code quality, and tooling. | Specified in the PRD to ensure a robust and maintainable codebase. |
| **Frontend Framework** | Next.js | \~14.2 | React framework for the frontend application. | Mandated by the PRD for its features like SSR, API routes, and fast development cycle. |
| **UI Component Library**| Custom Components | N/A | Building UI elements based on the UI/UX spec. | The UI/UX spec calls for a unique, minimalist style, making a custom library more suitable than a pre-packaged one. |
| **State Management** | React Context API | \~18.3 | For managing simple, global UI state. | Sufficient for MVP needs without adding the complexity of a larger library. Can be extended if needed. |
| **Backend Language** | TypeScript | \~5.4 | For writing Next.js API routes. | Provides end-to-end type safety and allows code sharing with the frontend. |
| **Backend Framework** | Next.js API Routes | \~14.2 | Server-side logic and backend endpoints. | Aligns with the monolithic application architecture chosen for speed and simplicity. |
| **API Style** | REST | N/A | Standard for client-server communication. | Well-understood, stateless, and integrates seamlessly with Next.js API routes. |
| **Database** | PostgreSQL | 16 | Primary data store provided by Supabase. | Mandated by the PRD; a powerful and reliable relational database. |
| **Cache** | N/A for MVP | N/A | Caching layer for performance. | Not required for MVP performance goals. Can be introduced later with Vercel Edge Caching or a dedicated service. |
| **File Storage** | Supabase Storage | N/A | Storing user-uploaded files like tour images. | Integrated with the Supabase stack for seamless and secure file management. |
| **Authentication** | Supabase Auth | N/A | User registration, login, and session management. | Provides a secure, pre-built authentication solution, as required by the PRD. |
| **Frontend Testing** | Jest / RTL | \~29.7 | Unit and integration testing for components. | Industry standard for React/Next.js; supports the PRD's focused testing approach. |
| **Backend Testing** | Jest | \~29.7 | Unit testing for API routes. | Allows for consistent testing practices across the entire monorepo. |
| **E2E Testing** | N/A for MVP | N/A | End-to-end testing of user flows. | Explicitly out of scope for the MVP to meet the timeline, but foundational tools can be set up. |
| **Build Tool** | Next.js CLI | \~14.2 | Building, serving, and exporting the application. | The default and required build tool for Next.js projects. |
| **Bundler** | Webpack | \~5.0 | Bundles application code for production. | Used internally by Next.js; no direct configuration needed for MVP. |
| **IaC Tool** | N/A for MVP | N/A | Infrastructure as Code. | Not required as Vercel and Supabase provide the infrastructure via their platforms. |
| **CI/CD** | Vercel | N/A | Continuous integration and deployment. | Specified in the PRD for automated, Git-based deployments. |
| **Monitoring** | Vercel Analytics | N/A | Performance and visitor metrics. | Built-in to the Vercel platform, providing Core Web Vitals and basic analytics with zero configuration. |
| **Logging** | Vercel Log Drains | N/A | Real-time logging for API routes. | Natively provided by the Vercel platform for debugging and monitoring serverless functions. |
| **CSS Framework** | CSS Modules | N/A | Scoped CSS for styling components. | Provides scoped styling out-of-the-box with Next.js, preventing style conflicts and aligning with the custom component approach. | 