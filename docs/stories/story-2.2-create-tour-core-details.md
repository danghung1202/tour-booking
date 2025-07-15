# Story 2.2 Initiate New Tour Listing & Define Core Details

- **Epic:** [Epic 2: Tour Guide Onboarding & Tour Creation MVP](https://www.notion.so/Epic-2-Tour-Guide-Onboarding-Tour-Creation-MVP-4db9520f3b464b5f8541334c6792f4a4)
- **Status:** To Do
- **Points:** 8

---

As an authenticated Tour Guide, I want to start creating a new tour by providing its essential details like title, description, price, location, duration, capacity, and assign it to a predefined category, so that the fundamental aspects of my tour are captured and classified.

### Acceptance Criteria

- [ ] A "Create Tour" form is available to authenticated guides.
- [ ] The form includes fields for title, description, price, location, duration, and capacity.
- [ ] The form includes a dropdown to select from the predefined list of categories.
- [ ] On submission, a new record is created in the `tours` table with a `status` of 'draft'.
- [ ] The new tour is associated with the currently logged-in guide.
- [ ] Basic validation is present for required fields (e.g., title, price). 