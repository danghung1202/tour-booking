# Story 2.4 Manage Tour Status (Publish/Unpublish)

- **Epic:** [Epic 2: Tour Guide Onboarding & Tour Creation MVP](https://www.notion.so/Epic-2-Tour-Guide-Onboarding-Tour-Creation-MVP-4db9520f3b464b5f8541334c6792f4a4)
- **Status:** To Do
- **Points:** 3

---

As an authenticated Tour Guide, I want to be able to publish my draft tours to make them visible to tourists and unpublish them to hide them, so that I have full control over my listings' visibility.

### Acceptance Criteria

- [ ] In the guide's "My Tours" dashboard, there is a clear indicator of the status of each tour (e.g., Draft, Published).
- [ ] The guide has access to controls (e.g., a button or toggle) to change a tour's status between 'draft' and 'published'.
- [ ] Changing the status updates the `status` column in the `tours` table accordingly.
- [ ] Only tours with the 'published' status appear in public listings and search results.
- [ ] The guide can also change the status to 'archived', which removes it from their main dashboard view but does not delete it. 