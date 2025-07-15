# Story 1.8 Define Initial Fixed Lists of Tour Languages and Time Zones

**As a** Developer, **I want to** populate the database with initial, fixed lists of supported tour languages and common time zones, **so that** these are available for guides to select from dropdown menus when creating or editing a tour.

### Acceptance Criteria

1.  A `languages` table is created in the Supabase database.
2.  The `languages` table is populated with an initial, predefined list of languages (e.g., 'English', 'Vietnamese', 'French', 'Japanese', 'Spanish').
3.  The `tours` table schema includes a `timezone` text field that will store a valid IANA Time Zone Name.
4.  The application has access to a predefined list of common IANA Time Zones to populate the "Tour Time Zone" dropdown.
5.  The language and time zone lists are accessible by the application for use in the tour creation form.