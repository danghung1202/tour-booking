# Story 1.4 User Registration for Tourists and Aspiring Guides

- **Epic:** [Epic 1: Project Foundation & Core Platform Setup](https://www.notion.so/Epic-1-Project-Foundation-Core-Platform-Setup-e61649472398458995543c535414c53c)
- **Status:** To Do
- **Points:** 5

---

As a User, I want to register for a new account using my email and a password, so that I can access platform features as a Tourist or request to become a Tour Guide.

### Acceptance Criteria

- [ ] A registration page is available with fields for email and password.
- [ ] Upon submission, a new user is created in Supabase `auth.users`.
- [ ] A corresponding entry is created in the `profiles` table with the default role of 'tourist'.
- [ ] The user is automatically logged in and redirected to the homepage or a welcome page.
- [ ] Basic validation for email format and password strength is implemented. 