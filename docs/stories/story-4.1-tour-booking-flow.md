# Story 4.1 Guest & Authenticated Tourist Booking Flow

- **Epic:** [Epic 4: Guest & Authenticated Booking Flow with Initial Communication MVP](https://www.notion.so/Epic-4-Guest-Authenticated-Booking-Flow-with-Initial-Communication-MVP-5c023d8a57a34661a08e12a43b925b6a)
- **Status:** To Do
- **Points:** 8

---

As a Tourist (either guest or logged-in), I want to book a tour by selecting an available date and time, providing my contact details, and submitting the request, so that I can reserve my spot.

### Acceptance Criteria

- [ ] The tour detail page includes a booking interface with a calendar and time slot selector.
- [ ] The calendar displays the guide's availability (i.e., blocked-off dates are not selectable).
- [ ] The booking form requires fields for the number of adults/kids and contact information (name, email, phone).
- [ ] If the user is logged in, their name and email are pre-filled.
- [ ] On submission, a new record is created in the `bookings` table with a 'pending' status.
- [ ] The tourist sees an on-screen confirmation message immediately after submitting.
- [ ] An email notification is sent to the tourist confirming their booking request is pending.
- [ ] The tourist's confirmation email contains a unique, secure link to cancel their booking. 