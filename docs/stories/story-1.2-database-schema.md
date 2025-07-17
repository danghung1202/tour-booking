# Story 1.2: Database Schema

- **Epic:** 1
- **Story:** 1.2
- **Title:** User Role Definition & Foundational Data Model in Supabase

---

### Status
`Done`

---

### Story
**As a** Developer,
**I want** to define the core data models in Supabase for user profiles, roles, tours, bookings, languages, and time slots,
**so that** the platform can distinguish between user types and the database schema can support all required MVP features while being ready for future extensibility.

---

### Acceptance Criteria
1. The Supabase `auth.users` table is used for core authentication.
2. A `profiles` table is created, linked one-to-one with `auth.users`, containing a `role` column ('tourist', 'guide', 'admin') and a `phone` field.
3. A `languages` table is created to store a canonical list of tour languages.
4. A `categories` table is created to store a canonical list of tour categories.
5. A `tours` table is created that includes a `timezone` field and foreign keys to `profiles` (for the guide) and `categories`. The table also includes a nullable `organization_id` field for future extensibility.
6. A `tour_languages` join table is created to support a many-to-many relationship between tours and languages.
7. A `tour_time_slots` table is created to store the available appointment times for each tour.
8. A `bookings` table is created with a `booking_datetime` (TIMESTAMPTZ) field and a nullable `assigned_guide_user_id` for future functionality.
9. Initial placeholder structures or design considerations for future `Organizations` and `OrganizationMembers` tables are documented.

---

### Tasks / Subtasks
- [x] Task 1: Create a new SQL migration file for the database schema changes within the Supabase project.
- [x] Task 2: Write SQL to create the `profiles` table with a one-to-one foreign key to `auth.users`. (AC: #2)
    - [x] Subtask 2.1: Add `id` (PK, references `auth.users.id`), `role` (as an enum type: `tourist`, `guide`, `admin`), `phone` (`text`), and other profile fields like `full_name`, `avatar_url`.
- [x] Task 3: Write SQL to create the `languages` table. (AC: #3)
    - [x] Subtask 3.1: Add `id` (PK), and `name` (`text`, unique) columns.
- [x] Task 4: Write SQL to create the `categories` table. (AC: #4)
    - [x] Subtask 4.1: Add `id` (PK), and `name` (`text`, unique) columns.
- [x] Task 5: Write SQL to create the `tours` table. (AC: #5)
    - [x] Subtask 5.1: Add columns for `id` (PK), `guide_id` (FK to `profiles.id`), `category_id` (FK to `categories.id`), `title`, `description`, `price`, `location`, `duration`, `capacity`, `timezone`, and `organization_id` (nullable).
- [x] Task 6: Write SQL to create the `tour_languages` join table for the many-to-many relationship. (AC: #6)
    - [x] Subtask 6.1: Add `tour_id` (FK to `tours.id`) and `language_id` (FK to `languages.id`). Define a composite primary key.
- [x] Task 7: Write SQL to create the `tour_time_slots` table. (AC: #7)
    - [x] Subtask 7.1: Add `id` (PK), `tour_id` (FK to `tours.id`), and `start_time` (`time`) columns.
- [x] Task 8: Write SQL to create the `bookings` table. (AC: #8)
    - [x] Subtask 8.1: Add `id` (PK), `tour_id` (FK to `tours.id`), `tourist_id` (FK to `profiles.id`), `booking_datetime` (`timestamptz`), `status`, and `assigned_guide_user_id` (nullable FK to `profiles.id`).
- [x] Task 9: Create/update a markdown file in `docs/architecture/` to document the schema design and the placeholder considerations for future `Organizations` and `OrganizationMembers` tables. (AC: #9)
- [x] Task 10: Apply the migration script and verify in the Supabase dashboard that all tables, columns, keys, and relationships are created correctly.

---

### Dev Notes
- The SQL for creating tables should be placed in a new migration file under `supabase/migrations/`.
- Use a new database schema (e.g., `app`) for application-specific tables rather than the `public` schema to keep things organized.
- Consider using RLS (Row Level Security) from the start. Define initial policies that deny all access by default.
- The `role` in the `profiles` table is critical for authorization logic throughout the application. Using a PostgreSQL `ENUM` type for this is recommended for data integrity.

---

### QA / Testing
- Verify all tables are created with the correct columns, types, and constraints (PKs, FKs, unique, not null).
- Confirm that the foreign key relationships are correctly established between tables.
- Check that the one-to-one relationship between `auth.users` and `profiles` is enforced.
- Ensure the `Organizations` and `OrganizationMembers` design notes are documented as specified.

---

### Change Log
| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 2025-07-16 | 1.0 | Created initial database schema | James |

---

### Dev Agent Record
#### Agent Model Used
Claude 3.7 Sonnet

#### Debug Log References
- Fixed TypeScript type issues in the getTourLanguages function

#### Completion Notes List
- Created SQL migration file with all required tables
- Added Row Level Security policies
- Created TypeScript types for the database schema
- Created helper functions for database access
- Added documentation for future Organization structure
- Added documentation on how to migrate using Supabase

#### File List
- web/supabase/migrations/20250716_initial_schema.sql
- web/supabase/readme.md
- web/src/types/database.types.ts
- web/src/lib/database.ts
- docs/architecture/organization-design.md 