---
epic: 1
story: 1.4
title: User Registration within Unified Auth Page
---

### Status
`Done`

### Story
**As a** User,
**I want** to register for a new account using my email and a password,
**so that** I can access platform features as a Tourist or request to become a Tour Guide.

### Acceptance Criteria
1. The `/login` page includes a **registration form** with fields for email and password, which is toggleable with the login form.
2. Upon submission, a new user is created in Supabase `auth.users`.
3. A corresponding entry is created in the `profiles` table with the default role of 'tourist'.
4. The user is automatically logged in and redirected to the homepage.
5. Basic validation for email format and password strength is implemented.

---

### Tasks / Subtasks
- [x] Task 1: **Integrate** the registration form into the `/login` page component (`src/app/login/page.tsx`). (AC: #1)
- [x] Task 2: **Implement a mechanism** (e.g., tabs, links) to toggle between the login and registration forms. (AC: #1)
- [x] Task 3: Build the registration form UI with fields for email and password, and a submit button. (AC: #1)
- [x] Task 4: Implement client-side validation for the form fields. (AC: #5)
    - [x] Subtask 4.1: Validate that the email is in a proper format.
    - [x] Subtask 4.2: Enforce a minimum password length.
- [x] Task 5: Implement the form submission handler. (AC: #2, #3, #4)
    - [x] Subtask 5.1: On submit, call the Supabase `signUp` method with the provided email and password.
    - [x] Subtask 5.2: Upon successful sign-up, Supabase will trigger the creation of the corresponding `profiles` entry (this should be handled by a database trigger defined in Story 1.2's schema setup).
    - [x] Subtask 5.3: Handle any errors from the `signUp` call and display appropriate messages to the user.
    - [x] Subtask 5.4: Upon successful registration, redirect the user to the homepage (`/`).
- [x] Task 6: Verify the automatic login and redirection flow. (AC: #4)

---

### Dev Notes
- This functionality is part of the unified authentication page at the `/login` route, which also contains the login form. See Story 1.5 for login details.
- This story relies on the database schema and `profiles` table trigger created in Story 1.2. The trigger should automatically create a `profile` for a new `auth.users` entry.
- Use the Supabase JS client library (`@supabase/supabase-js`) for handling the registration flow on the client side.
- For the MVP, basic client-side validation is sufficient. More robust server-side validation can be added later.
- The redirection after login is a critical part of the user experience. Ensure it is seamless.

---

### QA / Testing
- Verify that a user can successfully create a new account using the registration form on the `/login` page.
- Verify that the user can switch from the login form to the registration form.
- Check the `auth.users` table in Supabase to confirm the new user record is created.
- Check the `profiles` table to confirm a corresponding profile is created with the `role` set to 'tourist'.
- Confirm that the user is automatically logged in and redirected to the correct page after registration.
- Test the validation by attempting to register with an invalid email format and a password that is too short. Ensure appropriate error messages are displayed.

---

### Change Log
| Date       | Version | Description                               | Author |
|------------|---------|-------------------------------------------|--------|
| 2024-07-18 | 1.0     | Implemented user registration logic.      | James  |

---

### Dev Agent Record
#### Agent Model Used
Claude 3.7 Sonnet

#### Debug Log References
- Created a database trigger to automatically create a user profile on registration.
- Replaced the mock `authService` with a real Supabase implementation.

#### Completion Notes List
- The user registration backend logic is now implemented and connected to Supabase.
- A new user profile is automatically created with a 'tourist' role upon registration.
- The `authService` now handles real authentication, including registration, login, logout, and session management.
- The front-end registration form will now correctly interact with the Supabase backend.

#### File List
- web/supabase/migrations/20250718_add_profile_trigger.sql
- web/src/services/authService.ts 