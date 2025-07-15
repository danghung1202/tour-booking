# Epic 4 Guest & Authenticated Booking Flow with Initial Communication MVP

Enable both unauthenticated (guest) and authenticated Tourists to book an available tour, receive confirmation, and cancel their bookings. Implement basic spam/bot protection for guest bookings. Enable guides to manage their bookings (confirm/reject/see cancellations) and receive relevant notifications. This delivers the platform's primary transaction and communication capabilities.

### Story 4.1 Tour Guide - Manage Specific Tour Instance Availability

As a Tour Guide, I want a simple way to block out specific dates when my tour is not available, so that tourists cannot book it on those days.

#### Acceptance Criteria

* 1: A "Manage Availability" interface is available for each tour a guide owns.
* 2: The guide can select specific dates from a calendar or list to mark them as "unavailable."
* 3: These blocked dates are stored and prevent tourists from selecting them in the booking calendar.

### Story 4.2 Tourist - View Available Tour Slots & Select for Booking

**As a** Tourist on a tour detail page, **I want to** see available dates and time slots and select a specific combination for booking, **so that** I can start the booking process for a specific time.

#### Acceptance Criteria
1.  The booking interface on the tour detail page includes a date picker.
2.  The interface also displays the list of fixed **time slots** available for the tour.
3.  The tourist must select an available **date AND one time slot** to proceed with the booking.
4.  Dates that have been blocked out by the guide are disabled or cannot be selected.

### Story 4.3 Guest Tourist - Submit Booking Details with Spam Protection

As a Guest Tourist (unauthenticated), I want to submit my booking after selecting a date by providing my contact details, so I can reserve a spot without creating an account.

#### Acceptance Criteria

* 1: After selecting a date, a form appears asking for the number of participants, name, and email address.
* 2: A simple spam protection measure (e.g., a CAPTCHA or honeypot field) is implemented.
* 3: On submission, a new booking record is created with a "Pending Confirmation" status.

### Story 4.4 Authenticated Tourist - Submit Booking Details

As an Authenticated Tourist, I want to submit my booking with my details pre-filled, so I can have a faster booking experience.

#### Acceptance Criteria

* 1: For a logged-in user, the booking form is pre-filled with their name and email from their profile.
* 2: The user only needs to input the number of participants.
* 3: On submission, a new booking record is created, linked to their user ID, with a "Pending Confirmation" status.

### Story 4.5 Booking Request Confirmation (On-Screen & Email to Tourist)

**As a** Tourist, after submitting a booking request, **I want to** receive an immediate on-screen confirmation and an email that includes the specific date and time I selected, **so that** I know my request was received with the correct details.

#### Acceptance Criteria
1.  After submitting a booking, an on-screen message confirms that the request has been sent to the guide.
2.  An automated email is sent to the tourist's provided email address, confirming the booking details.
3.  The on-screen and email confirmations must display the specific **date and time slot** that was booked.
4.  For guest bookings, the confirmation email must include a unique, secure link to cancel the booking.

### Story 4.6 Tour Guide - View & Manage Incoming Booking Requests

As a Tour Guide, I want to see a list of all booking requests for my tours and be able to confirm or reject them, so I can manage my schedule.

#### Acceptance Criteria

* 1: A "Manage Bookings" dashboard is available to guides, listing all incoming requests.
* 2: The list shows tour name, date, tourist info, and booking status (e.g., Pending Confirmation, Confirmed, Rejected, Cancelled).
* 3: The guide has "Confirm" and "Reject" buttons for each pending request.
* 4: The `Bookings` table schema considers the nullable `assigned_guide_user_id` for future use.

### Story 4.7 Tourist Pre-Booking Question Submission & Guide Notification

As a Tourist, I want to submit a question to a guide before booking, and as a Tour Guide, I want to receive an email notification for that question, so that communication can happen pre-transaction.

#### Acceptance Criteria

* 1: A contact form is available on the tour detail page.
* 2: When a tourist submits a question, an email containing the message is sent to the tour guide's registered email address.
* 3: The tourist receives an on-screen confirmation that their message was sent.

### Story 4.8 Authenticated Tourist Cancels Booking

As an authenticated Tourist, I want to cancel my pending or confirmed tour booking via my account, so that I am no longer scheduled, and the guide is informed.

#### Acceptance Criteria

* 1: A "My Bookings" section in the tourist's account lists their bookings with an option to "Cancel".
* 2: Cancellation is permitted before a defined cut-off (e.g., before the tour date for MVP).
* 3: Upon cancellation, the booking status changes to "Cancelled by Tourist."
* 4: The available capacity for that tour instance is updated (spots are freed).

### Story 4.9 Guest Tourist Cancels Booking via Email Link

As a Guest Tourist, I want to use the unique link in my confirmation email to cancel my booking, so I can manage my booking without an account.

#### Acceptance Criteria

* 1: The booking confirmation email for guests contains a unique, secure cancellation link.
* 2: Clicking the link leads to a page to confirm cancellation for that specific booking.
* 3: Upon confirmation, the booking status changes to "Cancelled by Guest."
* 4: The tour's capacity is updated, and the cancellation link is invalidated.

### Story 4.10 System Notifications for Booking Events

As a Tour Guide, I want email notifications for booking status changes, and as an Admin, I want to see all statuses clearly, so that all parties are informed.

#### Acceptance Criteria

* 1: An email is sent to the guide when a tourist makes a new booking.
* 2: An email is sent to the tourist when a guide confirms or rejects their booking.
* 3: An email is sent to the guide when a tourist cancels a booking.
* 4: All booking statuses, including "Cancelled," are visible in the guide and admin booking management views. 