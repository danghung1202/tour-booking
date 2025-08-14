---
epic: 1
story: 1.5
title: Login & Logout within Unified Auth Page
---

### Status
`Done`

### Story
**As a** User,
**I want** to log in with my email and password and be able to log out,
**so that** I can securely access and end my session on the platform.

### Acceptance Criteria
1. The `/login` page includes a **login form** to authenticate using a registered email and password, which is toggleable with the registration form.
2. A successful login creates a user session and redirects the user to the homepage.
3. A "Logout" button is available to authenticated users, which securely terminates the session.
4. Appropriate error messages are shown for failed login attempts.

---

### Tasks / Subtasks
- [x] Task 1: **Ensure** the login form is correctly integrated into the `/login` page component (`src/app/login/page.tsx`). (AC: #1)
- [x] Task 2: **Implement a mechanism** (e.g., tabs, links) to toggle between the login and registration forms. (AC: #1)
- [x] Task 3: Build the login form UI with fields for email and password, and a submit button. (AC: #1)
- [x] Task 4: Implement the form submission handler to call the Supabase `signInWithPassword` method. (AC: #1, #2)
- [x] Task 5: Handle successful login.
    - [x] Subtask 5.1: On success, Supabase will create a user session.
    - [x] Subtask 5.2: Redirect the user to the homepage. (AC: #2)
- [x] Task 6: Handle failed login attempts.
    - [x] Subtask 6.1: Display a clear error message to the user (e.g., "Invalid login credentials"). (AC: #4)
- [x] Task 7: Implement the logout functionality. (AC: #3)
    - [x] Subtask 7.1: Create a "Logout" button that is visible only to authenticated users (e.g., in the site header).
    - [x] Subtask 7.2: The button's click handler should call the Supabase `signOut` method.
    - [x] Subtask 7.3: After logout, redirect the user to the homepage and update the UI to reflect the logged-out state.

---

### Dev Notes
- This functionality is part of the unified authentication page at the `/login` route, which also contains the registration form. See Story 1.4 for registration details.
- Use the Supabase JS client library (`@supabase/supabase-js`) for all authentication calls.
- The user's session and authentication state should be managed globally, for example, using React Context or a state management library, so that the UI (like the header) can reactively update to show the user's status.
- Ensure that error messages for failed logins are generic to avoid revealing whether an email address is registered or not.

---

### QA / Testing
- Verify that a registered user can successfully log in from the `/login` page.
- Verify that the user can switch from the registration form to the login form.
- Confirm that after login, the user is redirected to the correct page.
- Test the login with incorrect credentials and verify that a proper error message is displayed. (AC: #4)
- Verify that the "Logout" button appears for logged-in users and is hidden for logged-out users. (AC: #3)
- Confirm that clicking the "Logout" button successfully terminates the session and redirects the user. (AC: #3)
- After logging out, attempt to access a protected route and verify that access is denied.

---

### Change Log
| Date       | Version | Description                               | Author |
|------------|---------|-------------------------------------------|--------|
| 2024-07-18 | 1.0     | Implemented user login and logout logic.  | James  |

---

### Dev Agent Record
#### Agent Model Used
Claude 3.7 Sonnet

#### Debug Log References
- Added `onAuthStateChange` to `authService` to fix linter errors in `AuthContext`.
- Wrapped the root layout in `AuthProvider` to make auth state globally available.
- Updated the `Header` component to be a client component and use the `useAuth` hook.

#### Completion Notes List
- Login and logout functionality has been implemented using Supabase.
- An `AuthContext` has been created to manage the user's session state across the application.
- The `Header` component now dynamically displays the user's status (email and logout button, or login/register links).
- The unified `AuthForm` handles both login and registration, and correctly redirects on success.

#### File List
- web/src/contexts/AuthContext.tsx
- web/src/services/authService.ts
- web/src/app/layout.tsx
- web/src/components/Header.tsx
- web/src/components/Header.module.css 