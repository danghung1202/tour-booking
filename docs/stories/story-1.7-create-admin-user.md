# Story 1.7: Create Admin User

- **Epic:** 1
- **Story:** 1.7
- **Title:** Initial Admin User Creation Process

---

### Status
`Ready for Review`

---

### Story
**As a** Developer,
**I need** a secure, one-time process to create the first Admin account,
**so that** platform oversight can be established.

---

### Acceptance Criteria
1. A secure script or manual Supabase SQL query is used to assign the 'admin' role to a specific, pre-registered user.
2. The process is documented for the project owner or lead developer to execute.
3. This process is designed for initial setup only and not for ongoing admin creation.

---

### Tasks / Subtasks
- [x] Task 1: Create a new SQL migration file in the `/web/supabase/migrations/` directory specifically for this one-time setup task. (AC: #1)
- [x] Task 2: Write an SQL `UPDATE` statement in the migration file. (AC: #1)
    - [x] Subtask 2.1: The script should target a specific user in the `profiles` table (identified by their user ID or email) and set their `role` to 'admin'.
    - [x] Subtask 2.2: The script should include a placeholder for the user's ID/email that the project owner will need to fill in before running.
- [x] Task 3: Create a new markdown file in the `docs/` folder (e.g., `docs/admin-creation-guide.md`) to document the process. (AC: #2)
    - [x] Subtask 3.1: The document should instruct the user to first register a normal user account through the application's registration page.
    - [x] Subtask 3.2: It should then explain how to find the new user's ID in the Supabase dashboard.
    - [x] Subtask 3.3: It must provide clear instructions on how to update the placeholder in the SQL script with the actual user ID and then run the migration.
- [x] Task 4: Add a note in the documentation emphasizing that this is a one-time setup process. (AC: #3)

---

### Dev Notes
- This is a manual, one-off process, not an automated feature. The primary deliverable is a clear, safe, and documented procedure.
- The SQL script should be simple and explicit. It should only update the `role` column for a single, specified user.
- Security is important. The documentation should be clear that this process gives a user full administrative privileges.

---

### QA / Testing
- Review the SQL script to ensure it is syntactically correct and will only update one user's role.
- Read through the documentation to ensure it is clear, easy to follow, and emphasizes the security implications.
- Manually perform the documented steps in a development environment:
    1. Create a new user.
    2. Follow the guide to update the SQL script.
    3. Run the migration.
    4. Verify in the Supabase `profiles` table that the user's role is now 'admin'.

---

### Dev Agent Record
#### Agent Model Used
Claude 3.7 Sonnet

#### Debug Log
No issues encountered.

#### Completion Notes
- Created SQL migration file (`web/supabase/migrations/20250719_admin_user_creation.sql`) with UPDATE statement to set user role to 'admin'
- Created documentation file (`docs/admin-creation-guide.md`) with detailed instructions
- Added multiple security notices about the one-time nature of this process
- Included both email-based and UUID-based options for identifying users
- Added verification steps to ensure admin status is set correctly

#### File List
- Created: `web/supabase/migrations/20250719_admin_user_creation.sql`
- Created: `docs/admin-creation-guide.md`
- Modified: `docs/stories/story-1.7-create-admin-user.md`

---

### Change Log
- Created initial files and documentation as per story requirements
- Updated story status to Ready for Review 