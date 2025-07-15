## Technical Assumptions

### Repository Structure: Monorepo

A single repository (monorepo) will be used to house the Next.js application code.

### Service Architecture

A monolithic application structure utilizing Next.js is preferred for the MVP. This single application will manage both frontend rendering and its API routes/serverless functions for backend logic. Supabase will function as the comprehensive Backend-as-a-Service (BaaS). This approach is chosen to optimize for development speed, simplicity, and ease of deployment.

### Testing requirements

Given the aggressive 1-week development timeline, QA will prioritize validating core functionalities and critical user paths.
* **Primary Approach: Structured Manual Testing:** A concise set of test cases will be developed to cover core features for all user roles.
* **Secondary Approach: Focused Integration Testing:** Targeted integration tests will be performed for key interactions between Next.js and Supabase, specifically for the booking process, tour creation, and cancellation flows.
* **Out of Scope for MVP:** Comprehensive automated End-to-End (E2E) tests are out of scope but will be a post-MVP consideration.
* **Critically Tested Paths:** Rigorous testing is mandatory for the core tourist booking funnel (discovery to confirmation and cancellation) and the guide's tour creation and management flow.

### Additional Technical Assumptions and Requests

* **Primary Technology Stack:** The platform will be built using Next.js (React) for the frontend, Node.js for backend functionalities, and Supabase (PostgreSQL) for the database, authentication, and storage.
* **Data Model Design:** The MVP database schema must be designed for future extensibility to support an "Organization" model. This includes adding a nullable `organization_id` to the `Tours` table and a nullable `assigned_guide_user_id` to the `Bookings` table. These fields will be unused by the MVP application logic but are crucial for future readiness.
* **Compliance:** Adherence to Vietnam's Decree 13/2023/ND-CP will be supported by leveraging Supabase's built-in security features and appropriate application logic. 