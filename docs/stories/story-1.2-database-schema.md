# Story 1.2 User Role Definition & Foundational Data Model in Supabase

- **Epic:** [Epic 1: Project Foundation & Core Platform Setup](https://www.notion.so/Epic-1-Project-Foundation-Core-Platform-Setup-e61649472398458995543c535414c53c)
- **Status:** To Do
- **Points:** 8

---

**As a** Developer, **I want to** define the core data models in Supabase for user profiles, roles, tours, bookings, languages, and time slots, **so that** the platform can distinguish between user types and the database schema can support all required MVP features while being ready for future extensibility.

### Acceptance Criteria

- [ ] The Supabase `auth.users` table is used for core authentication.
- [ ] A `profiles` table is created, linked one-to-one with `auth.users`, containing a `role` column ('tourist', 'guide', 'admin') and a `phone` field.
- [ ] A `languages` table is created to store a canonical list of tour languages.
- [ ] A `categories` table is created to store a canonical list of tour categories.
- [ ] A `tours` table is created that includes a `timezone` field and foreign keys to `profiles`, `categories`, and `languages`. The table also includes a nullable `organization_id` field for future extensibility.
- [ ] A `tour_languages` join table is created to support a many-to-many relationship between tours and languages.
- [ ] A `tour_time_slots` table is created to store the available appointment times for each tour.
- [ ] A `bookings` table is created with a `booking_datetime` (TIMESTAMPTZ) field and a nullable `assigned_guide_user_id` for future functionality.
- [ ] Initial placeholder structures or design considerations for future `Organizations` and `OrganizationMembers` tables are documented. 