# Story 1.8: Seed Languages and Time Zones

- **Epic:** 1
- **Story:** 1.8
- **Title:** Define Initial Fixed Lists of Tour Languages and Time Zones

---

### Status
`Ready for Review`

---

### Story
**As a** Developer,
**I want** to populate the database with initial, fixed lists of supported tour languages and common time zones,
**so that** these are available for guides to select from dropdown menus when creating or editing a tour.

---

### Acceptance Criteria
1. A `languages` table is created in the Supabase database.
2. The `languages` table is populated with an initial, predefined list of languages (e.g., 'English', 'Vietnamese', 'French', 'Japanese', 'Spanish').
3. The `tours` table schema includes a `timezone` text field that will store a valid IANA Time Zone Name.
4. The application has access to a predefined list of common IANA Time Zones to populate the "Tour Time Zone" dropdown.
5. The language and time zone lists are accessible by the application for use in the tour creation form.

---

### Tasks / Subtasks
- [x] Task 1: If not already created in Story 1.2, write and apply a migration to create the `languages` table. (AC: #1)
- [x] Task 2: Create a new database seed migration to populate the `languages` table. (AC: #2)
    - [x] Subtask 2.1: Write SQL `INSERT` statements for the predefined list of languages: 'English', 'Vietnamese', 'French', 'Japanese', 'Spanish'.
- [x] Task 3: If not already updated in Story 1.2, write and apply a migration to add the `timezone` text field to the `tours` table. (AC: #3)
- [x] Task 4: Create a utility or constant within the application that provides a list of common IANA Time Zone names. (AC: #4)
    - [x] Subtask 4.1: This list will be used to populate a dropdown in the tour creation form.
- [x] Task 5: Create Supabase client functions to fetch the lists of languages and time zones for the frontend. (AC: #5)
- [x] Task 6: Apply the migrations and verify the `languages` table is populated and the `tours` table has the `timezone` column.

---

### Dev Notes
- The `languages` table and the `timezone` column in `tours` should have been created in Story 1.2. This story primarily focuses on seeding the data and ensuring it's accessible to the app.
- For the IANA Time Zones, you can use a library like `moment-timezone` to get a list or define a curated list of common zones in a constants file. A curated list is likely sufficient for the MVP.
- The accessibility of these lists (AC #5) is key for later stories where guides create tours. Ensure the functions to fetch them are simple and efficient.

---

### QA / Testing
- Verify that the `languages` table is created and contains the 5 specified languages.
- Verify that the `tours` table has a `timezone` column of type `text`.
- Confirm that the application has an accessible, predefined list of IANA time zones.
- Test the functions created to fetch the languages and time zones to ensure they return the correct data.

---

### Dev Agent Record
#### Agent Model Used
Claude 3.7 Sonnet

#### Debug Log
No issues encountered during implementation.

#### Completion Notes
- Confirmed `languages` table already exists in initial schema (20250716_initial_schema.sql)
- Confirmed `tours` table already has `timezone` column (20250716_initial_schema.sql)
- Created new migration file (20250720_seed_languages.sql) to seed 5 languages: English, Vietnamese, French, Japanese, Spanish
- Created timezone utility (web/src/utils/timezones.ts) with common IANA timezones and helper functions
- Created language service (web/src/services/languageService.ts) to fetch languages from database
- Created timezone service (web/src/services/timezoneService.ts) to provide timezone options
- All services include functions to format the data for frontend components

#### File List
- Created: web/supabase/migrations/20250720_seed_languages.sql
- Created: web/src/utils/timezones.ts
- Created: web/src/services/languageService.ts
- Created: web/src/services/timezoneService.ts
- Modified: docs/stories/story-1.8-seed-languages-timezones.md

---

### Change Log
- Created database seed migration for languages
- Created utility functions for timezones
- Created services for accessing languages and timezones
- Updated story status to Ready for Review 