# Story 1.4: User Registration

- **Epic:** 1
- **Story:** 1.4
- **Title:** User Registration for Tourists and Aspiring Guides

---

### Status
`Draft`

---

### Story
**As a** User,
**I want** to register for a new account using my email and a password,
**so that** I can access platform features as a Tourist or request to become a Tour Guide.

---

### Acceptance Criteria
1. A registration page is available with fields for email and password.
2. Upon submission, a new user is created in Supabase `auth.users`.
3. A corresponding entry is created in the `profiles` table with the default role of 'tourist'.
4. The user is automatically logged in and redirected to the homepage or a welcome page.
5. Basic validation for email format and password strength is implemented.

---

### Tasks / Subtasks
- [ ] Task 1: Create a new page component for user registration (e.g., `src/app/register/page.tsx`). (AC: #1)
- [ ] Task 2: Build the registration form UI with fields for email and password, and a submit button. (AC: #1)
- [ ] Task 3: Implement client-side validation for the form fields. (AC: #5)
    - [ ] Subtask 3.1: Validate that the email is in a proper format.
    - [ ] Subtask 3.2: Enforce a minimum password length.
- [ ] Task 4: Implement the form submission handler. (AC: #2, #3, #4)
    - [ ] Subtask 4.1: On submit, call the Supabase `signUp` method with the provided email and password.
    - [ ] Subtask 4.2: Upon successful sign-up, Supabase will trigger the creation of the corresponding `profiles` entry (this should be handled by a database trigger defined in Story 1.2's schema setup).
    - [ ] Subtask 4.3: Handle any errors from the `signUp` call and display appropriate messages to the user.
    - [ ] Subtask 4.4: Upon successful registration, redirect the user to the homepage (`/`).
- [ ] Task 5: Verify the automatic login and redirection flow. (AC: #4)

---

### Dev Notes
- This story relies on the database schema and `profiles` table trigger created in Story 1.2. The trigger should automatically create a `profile` for a new `auth.users` entry.
- Use the Supabase JS client library (`@supabase/supabase-js`) for handling the registration flow on the client side.
- For the MVP, basic client-side validation is sufficient. More robust server-side validation can be added later.
- The redirection after login is a critical part of the user experience. Ensure it is seamless.

---

### QA / Testing
- Verify that a user can successfully create a new account.
- Check the `auth.users` table in Supabase to confirm the new user record is created.
- Check the `profiles` table to confirm a corresponding profile is created with the `role` set to 'tourist'.
- Confirm that the user is automatically logged in and redirected to the correct page after registration.
- Test the validation by attempting to register with an invalid email format and a password that is too short. Ensure appropriate error messages are displayed.

---

### Change Log
- _No changes yet._ 