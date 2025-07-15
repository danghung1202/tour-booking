## Requirements

### Functional

* **FR1:** Tourists can browse and view all unique tour listings.
* **FR2:** Tourists can search for tours by keyword and filter by a predefined category.
* **FR3:** Tourists can browse tours by navigating to a category-specific listing page.
* **FR4:** Tourists can view a detailed tour page with a full description, images, price, category, guide's story, and guide profile.
* **FR5:** Tourists can book a tour by selecting a date/time, providing contact details, and adding comments.
* **FR6:** Tourists receive an immediate on-screen and email confirmation after booking.
* **FR7:** Tourists can cancel their tour booking. Guest tourists can cancel via a unique link in their confirmation email.
* **FR8:** Tourists can submit pre-booking questions to guides via a contact form.
* **FR9:** Tourists receive email notifications for booking status changes (confirmed, rejected, cancelled).
* **FR10:** Tour Guides can register for an account and manage their profile (name, photo, biography).
* **FR11:** Tour Guides can create, edit, and unpublish tour listings, including assigning one predefined category and crafting a "Guide's Story" with a rich-text editor.
* **FR12:** Tour Guides can manage their availability by blocking out specific dates.
* **FR13:** Tour Guides can view all incoming bookings with statuses including "Pending Confirmation," "Confirmed," "Rejected," and "Cancelled."
* **FR14:** Tour Guides can confirm or reject bookings, triggering an email notification to the tourist.
* **FR15:** Tour Guides receive email notifications for new bookings, questions, and cancellations.
* **FR16:** Admins can view and manage all user accounts, including activation/deactivation and role assignment.
* **FR17:** Admins can view, edit, or unpublish any tour on the platform.
* **FR18:** Admins can view all bookings, including cancelled ones.
* **FR19:** Admins have access to an initial, fixed list of tour categories set up by developers during deployment.
* **FR20:** Admins can view a simple dashboard with key statistics: total users by role, total active tours, and total bookings.

### Non Functional

* **NFR1:** The platform must be responsive with acceptable page load times for all users.
* **NFR2:** The system must efficiently handle core operations like booking and availability updates.
* **NFR3:** The infrastructure must be scalable to accommodate future growth.
* **NFR4:** The platform will target an uptime of 99% or higher.
* **NFR5:** User passwords must be securely hashed.
* **NFR6:** All personal user information must be handled securely, leveraging Supabase's built-in features.
* **NFR7:** The platform must obtain explicit user consent for data collection and processing in compliance with Vietnam Decree 13/2023/ND-CP.
* **NFR8:** A clear and accessible privacy policy must be provided.
* **NFR9:** The platform will only collect the minimum personal data necessary (data minimization).
* **NFR10:** The user interface must be intuitive and easy to navigate for tourists, guides, and admins.
* **NFR11:** The code should be organized for maintainability to address technical debt post-MVP.
* **NFR12:** The technology stack (Next.js, Supabase) must facilitate rapid development and straightforward deployment.
* **NFR13:** Initial monthly operational costs must be kept within a $50-$100 budget. 