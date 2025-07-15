# Story 4.4 Tourist Cancels Booking

- **Epic:** [Epic 4: Guest & Authenticated Booking Flow with Initial Communication MVP](https://www.notion.so/Epic-4-Guest-Authenticated-Booking-Flow-with-Initial-Communication-MVP-5c023d8a57a34661a08e12a43b925b6a)
- **Status:** To Do
- **Points:** 3

---

As a Tourist, I want to be able to cancel my booking, so that I can manage my plans flexibly.

### Acceptance Criteria

- [ ] A guest tourist can cancel their booking by clicking the unique, secure link in their confirmation email.
- [ ] An authenticated tourist can cancel their booking from a "My Bookings" page in their dashboard.
- [ ] Cancelling a booking changes its status to 'cancelled_by_guest'.
- [ ] The tour guide receives an email notification when a tourist cancels a booking.
- [ ] The system correctly handles the logic to prevent cancellation of tours that are too close to the start time (e.g., within 24 hours), though the policy itself is TBD. For MVP, all bookings are cancellable. 