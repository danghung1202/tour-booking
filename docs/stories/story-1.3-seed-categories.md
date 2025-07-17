# Story 1.3: Seed Tour Categories

- **Epic:** 1
- **Story:** 1.3
- **Title:** Define Initial Fixed List of Tour Categories

---

### Status
`Draft`

---

### Story
**As a** Developer,
**I want** to populate the database with an initial, fixed list of tour categories during setup,
**so that** these are available for guides to use when creating tours and for tourists to use for filtering.

---

### Acceptance Criteria
1. A `categories` table (or equivalent simple structure) is created in the Supabase database.
2. The table is populated with an initial, predefined list of categories (e.g., 'Day tours', 'Night tours', 'Adventure', 'Cultural', 'Culinary').
3. The category list is accessible by the application for use in the tour creation form and tour filtering features.

---

### Tasks / Subtasks
- [ ] Task 1: Create a new Supabase database migration file for seeding data. (AC: #1)
    - [ ] Subtask 1.1: This can be a separate seed script or part of the initial schema migration if the `categories` table is also created in Story 1.2.
- [ ] Task 2: Write SQL `INSERT` statements to populate the `categories` table. (AC: #2)
    - [ ] Subtask 2.1: Insert the following categories: 'Day tours', 'Night tours', 'Adventure', 'Cultural', 'Culinary'.
- [ ] Task 3: Create a Supabase Edge Function or a client-side utility to fetch the list of categories. (AC: #3)
    - [ ] Subtask 3.1: This function/utility will be used by the frontend to populate dropdowns or filter lists.
- [ ] Task 4: Apply the seeding script to the database and verify that the data is present in the `categories` table.
- [ ] Task 5: Write a simple test or verification step to confirm the application can successfully fetch and display the categories.

---

### Dev Notes
- The `categories` table should have been created in Story 1.2. This story focuses purely on seeding it with data. If it wasn't, the creation of the table is the first task.
- Seeding can be done via a Supabase migration (`.sql` file) or a seed script (`.ts` file) that runs after migrations. For a fixed list, a SQL migration is often simplest.
- The list of categories is defined in the Acceptance Criteria. Do not add or omit any.
- The method for making the categories "accessible by the application" is left to the developer's discretion but should be a simple and efficient query (e.g., `select * from categories`).

---

### QA / Testing
- Verify that the `categories` table contains exactly the 5 specified categories after the migration/seed script is run.
- Confirm there is a function or API endpoint available to the application that returns the list of categories.
- Ensure no other data is affected by the seeding process.

---

### Change Log
- _No changes yet._ 