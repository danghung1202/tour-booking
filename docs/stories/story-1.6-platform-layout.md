# Story 1.6: Platform Layout and Navigation

- **Epic:** 1
- **Story:** 1.6
- **Title:** Basic Platform Layout, Navigation Shell, and Styling Foundation

---

### Status
`Draft`

---

### Story
**As a** User,
**I want** a consistent and clean layout with a main navigation bar,
**so that** I can easily move between the main sections of the platform.

---

### Acceptance Criteria
1. A responsive layout shell is created with a header, main content area, and footer.
2. The header displays the platform name and navigation links (e.g., Home, Tours, Browse by Category, Login/Register).
3. Navigation links adapt based on the user's authentication status and role.
4. The visual style is minimalist and modern, inspired by `atasteofhanoi.com`.

---

### Tasks / Subtasks
- [ ] Task 1: Create a root layout component (`src/app/layout.tsx`) that defines the main HTML structure, including header, main, and footer sections. (AC: #1)
- [ ] Task 2: Create a `Header` component. (AC: #2, #3)
    - [ ] Subtask 2.1: Inside the `Header`, display the platform name/logo.
    - [ ] Subtask 2.2: Implement navigation links: 'Home', 'Tours', 'Browse by Category'.
    - [ ] Subtask 2.3: Implement conditional rendering for authentication links:
        - If the user is logged out, show 'Login' and 'Register' links.
        - If the user is logged in, show a 'Logout' button and a link to their profile/dashboard.
- [ ] Task 3: Create a `Footer` component with basic information (e.g., copyright notice, links to privacy policy). (AC: #1)
- [ ] Task 4: Set up the global styling foundation. (AC: #4)
    - [ ] Subtask 4.1: Use a `globals.css` file for base styles (fonts, colors, etc.).
    - [ ] Subtask 4.2: The style should be clean, minimalist, and modern, taking inspiration from the specified website.
- [ ] Task 5: Ensure the layout is responsive and works reasonably well on both desktop and mobile screen sizes. (AC: #1)

---

### Dev Notes
- This is a foundational UI story. The components created here (`Layout`, `Header`, `Footer`) will be used across the entire application.
- State management for the user's authentication status is crucial for AC #3. Use a React Context provider that wraps the application to make the user session available to all components.
- The styling should be simple and clean. Focus on layout, typography, and a basic color scheme. Avoid complex or overly detailed styling at this stage. The goal is to establish a visual foundation.
- For `Browse by Category`, the link can initially point to a placeholder page. The functionality will be built out in a later story.

---

### QA / Testing
- Verify that the header, main content area, and footer are present on all pages. (AC: #1)
- Check that the header contains the correct navigation links. (AC: #2)
- Test the conditional navigation links:
    - As a logged-out user, confirm 'Login' and 'Register' are visible.
    - Log in and confirm 'Login'/'Register' are replaced with 'Logout' and a profile link. (AC: #3)
- Review the overall look and feel to ensure it aligns with the minimalist and modern aesthetic described. (AC: #4)
- View the site on a mobile-sized screen to ensure the layout is responsive and usable. (AC: #1)

---

### Change Log
- _No changes yet._ 