# Story 1.8: Seed Languages and Time Zones

- **Epic:** 1
- **Story:** 1.8
- **Title:** Define Initial Fixed Lists of Tour Languages and Time Zones

---

### Status
`Draft`

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
- [ ] Task 1: If not already created in Story 1.2, write and apply a migration to create the `languages` table. (AC: #1)
- [ ] Task 2: Create a new database seed migration to populate the `languages` table. (AC: #2)
    - [ ] Subtask 2.1: Write SQL `INSERT` statements for the predefined list of languages: 'English', 'Vietnamese', 'French', 'Japanese', 'Spanish'.
- [ ] Task 3: If not already updated in Story 1.2, write and apply a migration to add the `timezone` text field to the `tours` table. (AC: #3)
- [ ] Task 4: Create a utility or constant within the application that provides a list of common IANA Time Zone names. (AC: #4)
    - [ ] Subtask 4.1: This list will be used to populate a dropdown in the tour creation form.
- [ ] Task 5: Create Supabase client functions to fetch the lists of languages and time zones for the frontend. (AC: #5)
- [ ] Task 6: Apply the migrations and verify the `languages` table is populated and the `tours` table has the `timezone` column.

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

### Change Log
- _No changes yet._ 