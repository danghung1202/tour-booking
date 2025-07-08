# Unique Tours Platform Product Requirements Document (PRD)

**Version:** 1.2
**Date:** May 28, 2025

## Goal, Objective and Context

**Goal:**
To be the leading online platform for discovering and booking unique, authentic, and offbeat tour experiences worldwide, empowering local guides to share their passions and enabling travelers to create unforgettable memories beyond the mainstream.

**Objective (MVP Focus):**
* Successfully develop and deploy the "Unique Tours Platform" MVP with core functionalities for Tourists (browse, filter by category, book, cancel bookings, contact guides), Tour Guides (create/manage tours with categories and availability, manage bookings including cancellations, "Guide's Story"), and Admin (user/tour management, initial category setup, simple dashboard) within the 1-week development timeframe.
* Onboard at least 5-10 tour guides who collectively list a minimum of 10-15 unique, offbeat tours on the platform within the first week of its operational launch.
* Achieve at least 5-10 successful tour bookings through the platform within the first two weeks following the operational launch.
* Collect initial feedback from at least 3-5 early adopter tour guides and 5-10 early adopter tourists within one month of launch to identify key pain points and priority improvements.

**Context:**
The current tourism market is dominated by large booking platforms that tend to prioritize mainstream, high-volume tours. This makes it challenging for tourists to discover unique, offbeat, and authentic local experiences that go beyond standard itineraries. Simultaneously, many local tour guides who offer these specialized and personalized tours struggle to gain visibility and effectively manage bookings through platforms that are not tailored to their niche offerings. Unique Tours Platform aims to address this gap by providing a dedicated online marketplace that connects discerning tourists with local guides offering unique and unconventional tour experiences. The platform will provide tools for guides to easily create, promote, and manage their specialized tours, including features that allow them to share rich narratives and highlight the distinctiveness of their offerings. For tourists, it will serve as a trusted source for finding and booking memorable, off-the-beaten-path adventures that are not easily accessible through mainstream channels. This project is needed to bridge the gap between providers of unique tours and travelers seeking more authentic and personalized experiences.

## Functional Requirements (MVP)

**For Tourists ("Explorers"):**

* **Tour Discovery:**
    * Ability to browse and view listings of unique tours.
    * Ability to use simple search (by keyword) and filter (by **predefined category** and possibly location) to find tours.
    * **NEW:** Ability to browse tours by selecting a predefined category (e.g., view a category-specific tour listing page).
* **Tour Details Viewing:**
    * Ability to access detailed tour pages which include: title, description, images, duration, meeting point, price, **category,** and inclusions/exclusions.
    * Ability to view the "Guide's Story" – rich promotional content specific to each tour.
    * Ability to view basic Tour Guide profiles, including name, photo, and biography.
* **Booking & Communication:**
    * An intuitive process to book a tour, including selecting a date/time, inputting the number of participants, providing contact details, and adding comments.
    * Receive on-screen and email confirmations immediately after submitting a new booking.
    * **NEW:** Ability to cancel their submitted tour booking (e.g., before the tour start time/date).
    * **NEW:** For guest bookings, ability to receive a confirmation email with a unique link to cancel their booking.
    * Ability to submit pre-booking questions to Tour Guides through a contact form available on the tour detail page.
    * Receive email notifications when a Tour Guide confirms or rejects their booking request, **or when their booking is cancelled**.

**For Tour Guides ("Storytellers"):**

* **Account & Profile Management:**
    * Ability to register for a new account and manage their existing user account settings.
    * Ability to create and update their public profile, including name, photo, and a short biography.
* **Tour Management:**
    * Ability to create new tour listings, providing all essential details such as title, descriptions, price, location, duration, images, general availability, tour capacity, **and assigning one predefined category**.
    * Access to a rich-text editor to create, craft, and manage the "Guide's Story" for each tour they offer.
    * Ability to edit or unpublish their existing tour listings.
* **Availability & Booking Management:**
    * Tools to manage their tour availability, specifically by blocking out specific dates or instances (e.g., via a list-based system).
    * Ability to view all incoming tour bookings.
    * View booking statuses including "Pending Confirmation," "Confirmed," "Rejected," and "**Cancelled**."
    * Ability to confirm or reject incoming bookings, with an option to include comments for the tourist (which will trigger an email notification to the tourist).
* **Notifications:**
    * Receive email notifications for new tour bookings and new pre-booking questions submitted by tourists.
    * **NEW:** Receive email notifications when a tourist cancels a booking for one of their tours.

**For Admin (Platform Operations):**

* **User Oversight:**
    * Ability to view and manage all user accounts (both Tourists and Tour Guides), including options to activate or deactivate accounts.
    * Ability to assign or modify user roles (e.g., promoting a user to a Guide role).
* **Tour Oversight:**
    * Ability to view all tours listed on the platform.
    * Ability to edit tour details or unpublish tours if necessary (e.g., quality control, responding to complaints, or supporting guides).
* **Booking Oversight:**
    * **NEW:** Ability to view cancelled bookings (e.g., as a status in booking lists or admin views).
* **Category Management (MVP - Initial Setup):**
    * **NEW:** The platform will have an initial, predefined fixed list of tour categories (e.g., 'Day tours', 'Night tours', 'Adventure', 'Cultural', 'Culinary'). For MVP, this list will be set up directly by developers during initial platform deployment.
* **Basic Platform Monitoring:**
    * Access to a simple dashboard displaying key platform statistics, such as the total number of registered users (broken down by role), the total number of active tours, and the total number of bookings.

## Non Functional Requirements (MVP)

* **Performance:**
    * The platform must provide a responsive user experience with acceptable page load times for tourists Browse tours and for guides managing their listings.
    * The system should efficiently handle core operations like tour booking and updating availability.
    * Initial hosting setup should perform adequately under modest initial user traffic as outlined in the project goals.
* **Scalability:**
    * The underlying infrastructure must be scalable to accommodate future growth in user numbers (tourists and guides), tour listings, and booking volumes.
    * The MVP architecture, while initially deployed on a minimal-cost setup, should be designed to allow for scaling if user traffic significantly exceeds early expectations.
* **Availability:**
    * Core platform functionalities (tour discovery, booking, guide tour/availability management, admin oversight) will target an uptime of 99% or higher.
* **Security:**
    * User passwords must be securely stored (e.g., using industry-standard hashing techniques).
    * All personal user information must be handled securely, protecting against unauthorized access.
    * The platform will leverage Supabase's built-in features for secure data storage.
* **Compliance (Data Privacy - focusing on Vietnam Decree 13/2023/ND-CP for MVP):**
    * The platform must implement clear mechanisms to obtain explicit user consent for data collection and processing (e.g., for account creation, booking, "Contact Guide" form)[cite: 77, 192].
    * A basic, clear, and easily accessible privacy notice (or policy) will be provided, explaining what data is collected, why, and how it's used and stored[cite: 78, 193].
    * The platform will only collect the minimum personal data necessary for its stated functionalities[cite: 79, 194].
* **Usability:**
    * The platform interface should be intuitive and easy to navigate for all target user groups: Tourists, Tour Guides, and Admin.
    * The tour booking process for Tourists must be simple, straightforward, and inspire trust.
    * The tools provided to Tour Guides for creating tour listings and managing their availability must be easy to use, even for those who may not be highly technical.
* **Maintainability (MVP Context):**
    * Given the aggressive 1-week timeline, the initial focus is on rapid delivery. However, the code should be organized in a way that allows for addressing technical debt post-MVP without requiring a complete rewrite for future iterations.
* **Deployability:**
    * The choice of Next.js and Supabase is intended to facilitate rapid development and straightforward deployment for the MVP.
* **Cost-Effectiveness:**
    * The initial monthly hosting and operational costs for the MVP must be kept within the $50-$100 budget[cite: 71, 186].

## User Interaction and Design Goals

**Overall Vision & Experience:**
* The platform should project an image of trustworthiness and serve as a go-to source for unique, offbeat, and authentic local tour experiences.
* The design should be **minimalist, modern, clean, and visually appealing**, drawing direct inspiration from the presentation style of atasteofhanoi.com[cite: 103, 218]. It should emphasize the uniqueness of the tours and the stories of the guides.
* For tourists, the experience should be engaging, inspiring them to explore and book memorable adventures. They value detailed descriptions and good quality visuals[cite: 23, 138].
* For tour guides, the platform should be easy to use and empowering, allowing them to showcase their unique offerings effectively, even if they are not highly technical[cite: 27, 142].
* The overall user journey for both tourists (from discovery to booking **and potential cancellation**) and guides (from tour creation to managing bookings **including cancellations**) should be intuitive and straightforward.

**Key Interaction Paradigms:**
* **Tourists:**
    * Seamless Browse of tour listings with clear calls to action.
    * Simple and effective search/filtering capabilities, **including by category.**
    * An intuitive booking process that is easy to understand and complete.
    * A straightforward way to cancel bookings (via account or secure email link for guests).
    * A straightforward way to contact guides with pre-booking questions (e.g., via a form on the tour page).
* **Tour Guides:**
    * An easy-to-use interface for creating and managing tour listings, including a rich-text editor for the "Guide's Story" **and category assignment**.
    * A simple mechanism for managing tour availability (e.g., a list-based system to block dates).
    * Clear presentation of incoming bookings **(and cancellations)** with simple actions to confirm or reject.
* **Admin:**
    * Efficient tools for user and tour management with clear dashboard visibility of key platform metrics.

**Core Screens/Views (Conceptual):**
* **Tourist-Facing:**
    * Homepage/Tour Discovery (featuring unique tours, search/filter, **category navigation**)
    * **NEW (or enhanced):** Category-specific Tour Listing Page
    * Tour Detail Page (comprehensive info including **category**, Guide's Story, guide bio, booking interface, contact option)
    * Booking Confirmation Page (with clear next steps/information)
    * **NEW:** Booking Cancellation Interface/Page (for guests via link, for authenticated users in their account area)
    * Simple login/registration for booking.
* **Guide-Facing:**
    * Dashboard (overview of listings, bookings including **cancellations**)
    * Tour Creation/Editing Interface (with **category selection**)
    * Availability Management Interface
    * Booking Management Interface (showing **cancelled status**)
    * Profile Management Page
    * Registration/Login.
* **Admin-Facing:**
    * Main Dashboard (key platform statistics)
    * User Management Interface (view, manage roles, status)
    * Tour Management Interface (view, edit, unpublish tours)
    * (Behind the scenes for MVP) Predefined list of Categories for assignment.

**Accessibility Aspirations:**
* For the MVP, advanced accessibility features are a lower priority due to the aggressive timeline. Basic usability will be the focus.

**Branding Considerations (High-Level):**
* Platform Name: "Unique Tours Platform".
* Core Message: Emphasis on "unique, offbeat, authentic local experiences"[cite: 104, 219].
* Visual Style: Clean, minimalist, and modern, inspired by `atasteofhanoi.com`[cite: 103, 218].
* Color Palette: Should align with the aesthetic and color scheme observed on `https://atasteofhanoi.com/`.

**Target Devices/Platforms:**
* The MVP will be a web application.
* It **must be designed with a "mobile-first responsive" approach**, ensuring it functions effectively and provides a good user experience on both desktop and mobile browsers.

## Technical Assumptions

* **Primary Technology Stack:**
    * Frontend: Next.js (React)[cite: 74, 189].
    * Backend: Node.js (implicitly for Next.js backend functionalities or serverless functions)[cite: 74, 189].
    * Database & BaaS: Supabase (providing PostgreSQL database, authentication, and storage capabilities)[cite: 74, 189]. This stack was chosen for its comprehensive features, alignment with SQL preferences[cite: 75, 190], and to facilitate rapid development for the MVP.
* **Compliance Implementation Approach:** Secure handling of user data and adherence to privacy requirements (specifically Vietnam's Decree 13/2023/ND-CP for MVP [cite: 77, 192]) will be supported by leveraging Supabase's built-in security features [cite: 80, 195] and ensuring the application logic aligns with these requirements.
* **Development & Deployment Focus:** The selection of Next.js and Supabase is geared towards maximizing development speed and simplifying deployment[cite: 84, 199], which are crucial for the MVP phase.

* **Repository & Service Architecture:**
    * **Repository Structure:** A single repository (monorepo) will be used to house the Next.js application code[cite: 85, 200].
    * **Service Architecture:** A monolithic application structure utilizing Next.js is preferred for the MVP[cite: 81, 196]. This single application will manage both frontend rendering and its API routes/serverless functions for backend logic[cite: 82, 197]. Supabase will function as the comprehensive Backend-as-a-Service (BaaS)[cite: 83, 198].
    * **Rationale:** This combined approach (monorepo and Next.js monolith with Supabase as BaaS) has been explicitly chosen to optimize for speed of development, operational simplicity, and ease of deployment[cite: 84, 199]. These factors are paramount given the aggressive 1-week timeline for the MVP.

* **MODIFIED: Data Model Design for Future Extensibility:**
    * As per the updated Project Brief, the MVP database schema must be designed to support future "Organization" functionality[cite: 86, 201]. This includes:
        * Placeholder structures or considerations for an `Organizations` table (e.g., id, name, manager_user_id)[cite: 87, 202].
        * Placeholder structures or considerations for an `OrganizationMembers` junction table (linking users/guides to Organizations)[cite: 88, 203].
        * The `Tours` table schema should include a nullable `organization_id` field (Foreign Key)[cite: 89, 204]. For MVP, this will be NULL as tours belong to individual guides[cite: 90, 205].
        * The `Bookings` table schema should include a nullable `assigned_guide_user_id` field (Foreign Key)[cite: 91, 206]. For MVP, this might be unused or could store the ID of the guide who owns the tour.
    * **Note:** The UI and application logic for creating and managing Organizations, inviting members, org-specific tours, and assigning guides to org bookings are **Post-MVP features**[cite: 93, 208]. The MVP focuses on individual guides and tourists; this database design is for future readiness.

### Testing requirements

Given the aggressive 1-week development timeline for the MVP, a pragmatic and focused testing approach is crucial. Quality assurance will prioritize validating core functionalities and critical user paths.

* **Primary Approach: Structured Manual Testing:**
    * The primary method for validating MVP functionality will be structured manual testing.
    * A concise set of test cases and user scenarios will be developed to cover the core features for Tourists, Tour Guides, and Admin users.
* **Secondary Approach: Focused Integration Testing:**
    * Targeted integration tests will be performed for key interactions between the Next.js frontend and the Supabase backend.
    * This will specifically cover the critical data flows and logic for:
        * The tourist booking process (data submission, storage, and confirmation).
        * The tour guide's tour creation and publishing process (data saving and display).
* **Automated End-to-End (E2E) Testing:**
    * Comprehensive automated E2E tests are considered out of scope for the initial 1-week MVP sprint due to time constraints. These will be a key consideration for post-MVP development.
    * If development progress allows, a single "happy path" E2E test for the core tourist booking flow may be considered as a stretch goal, but manual and integration testing remain the priority.
* **Critically Tested Paths:**
    * Rigorous testing (manual and integration) will be mandatory for:
        * The core tourist booking funnel (from tour discovery to booking confirmation).
        * The guide's ability to successfully create, manage details for, and publish a new tour.
* **Quality Assurance Iteration:** While this outlines the MVP testing scope, quality assurance will be an ongoing effort, with more comprehensive testing strategies planned post-launch.

## Epic Overview

Here are the Epics and User Stories defined for the MVP, updated to include Booking Cancellation and Tour Categories.

* **Epic 1: Project Foundation & Core Platform Setup**
    * **Goal:** Establish the initial Next.js application structure, connect to Supabase for database and authentication (designing the schema for future Organization extensibility), set up initial fixed tour categories, set up basic automated deployment (e.g., to Vercel), and implement core user registration and login capabilities for all three user roles (Tourist, Tour Guide, Admin). This epic lays the essential technical groundwork and user access control for all subsequent features, including considerations for how guest user interactions (like bookings) are handled.
    * **User Stories for Epic 1:**
        * **Story 1.1: Initial Project Setup & Basic Deployment Pipeline** (ACs unchanged from initial definition)
        * **Story 1.2: User Role Definition & Foundational Data Model in Supabase**
            * *(Description unchanged from initial definition)*
            * **Modified/Add to Acceptance Criteria (ACs):**
                * The Supabase `auth.users` table is utilized for core authentication.
                * A `user_roles` table or a `role` column within a `profiles` table (linked one-to-one with `auth.users`) is created to define user roles (e.g., 'tourist', 'guide', 'admin').
                * A `profiles` table (or role-specific profile tables like `guide_profiles`) is created to store additional user information not in `auth.users` (e.g., name, bio, photo URL), linked to `auth.users` via user ID.
                * The schema includes fields for common user attributes (e.g., ID, email, role, created_at, updated_at) and basic profile fields relevant to each role for MVP.
                * **The database schema design for `Tours` and `Bookings` must include placeholder fields (e.g., nullable `organization_id` in `Tours`[cite: 89, 204], nullable `assigned_guide_user_id` in `Bookings` [cite: 91, 206]) to accommodate future Organization functionality as detailed in the Project Brief, even if these fields are not used by MVP application logic for individual guide tours.**
                * **Initial considerations for `Organizations` [cite: 87, 202] and `OrganizationMembers` [cite: 88, 203] table structures are made, even if these tables are not fully implemented or populated for MVP application logic.**
                * (Iterative Schema) The initial schema focuses only on the data absolutely necessary for MVP user roles, basic profile info, and the groundwork for future extensibility.
        * **Developer Setup Task (associated with Epic 1): Define Initial Fixed List of Tour Categories**
            * **Task Description:** As a Developer, during initial platform setup, I will populate the database (or define in configuration) with an initial, fixed list of approximately 3-5 agreed-upon tour categories (e.g., 'Day tours', 'Night tours', 'Adventure', 'Cultural', 'Culinary'), so that these categories are available for guides to assign to their tours and for tourists to use in discovery and filtering.
            * **Acceptance Criteria (ACs):**
                * A `categories` table (or equivalent simple structure like an enum type) is created in the Supabase database if not covered by Story 1.2.
                * The table/structure is populated with the initial, predefined list of tour categories.
                * This predefined list of categories is accessible by the tour creation/editing interface for guides and by the tour discovery/filtering features for tourists.
        * **Story 1.3: User Registration for Tourists and Aspiring Guides** (ACs unchanged from initial definition)
        * **Story 1.4: Unified User Login & Logout Functionality** (ACs unchanged from initial definition)
        * **Story 1.5: Basic Platform Layout, Navigation Shell, and Styling Foundation**
            * **Modified AC:** The header displays the platform name (or placeholder logo) and provides basic navigation links (e.g., Home, Tours, **Browse by Category links/dropdown**, Login/Register). Navigation links dynamically adapt based on user authentication status and role. (Other ACs unchanged).
        * **Story 1.6: Initial Admin User Creation Process** (ACs unchanged from initial definition)

* **Epic 2: Tour Guide Onboarding & Tour Creation MVP**
    * **Updated Goal:** Enable authenticated Tour Guides to complete their profile (name, photo, bio) and to create, edit, and publish detailed tour listings. Listings must include title, description, price, location, duration, images, capacity, **assignment to a predefined category,** and the "Guide's Story" using a rich-text editor. This delivers the core supply-side functionality for the platform.
    * **User Stories for Epic 2:**
        * **Story 2.1: Tour Guide Profile Completion & Management** (ACs unchanged from initial definition)
        * **Story 2.2: Initiate New Tour Listing & Define Core Details**
            * **Modified Description:** As an authenticated Tour Guide, I want to start creating a new tour listing by providing its essential details such as title, a concise description, price, general location, duration, maximum participant capacity, inclusions, exclusions, **and assign it to a predefined category,** so that the fundamental aspects of my tour are captured and it can be appropriately classified for tourists.
            * **Add to Acceptance Criteria (ACs):**
                * The tour creation/editing form includes a mandatory dropdown or selection mechanism for the guide to choose **one category** for the tour from a predefined, fixed list of categories (populated from the list set up in Epic 1).
                * The selected category (e.g., its ID or unique name) is saved and associated with the tour record in the database.
                * The `tours` table schema in Supabase is updated to include a field to store the assigned category for each tour (and considers the nullable `organization_id` for future use [cite: 89, 204]).
        * **Story 2.3: Enhance Tour Listing with Images** (ACs unchanged from initial definition)
        * **Story 2.4: Craft "Guide's Story" for Tour Listing with Rich-Text Editor** (ACs unchanged from initial definition)
        * **Story 2.5: Manage Tour Listing Lifecycle (Edit, Publish, Unpublish)** (ACs unchanged from initial definition)
        * **Story 2.6: Define General Tour Availability Information** (ACs unchanged from initial definition)

* **Epic 3: Tourist Tour Discovery & Viewing MVP**
    * **Updated Goal:** Enable prospective and registered Tourists to browse all published tours, **browse tours by specific predefined categories,** perform simple searches (e.g., by keyword), **filter tours by category,** and view detailed tour pages. These pages will display comprehensive tour information (including its category), the "Guide's Story", and the Tour Guide's basic profile. This delivers enhanced core demand-side discovery functionality.
    * **User Stories for Epic 3:**
        * **Story 3.1: Public Tour Listings Page (Browse All Tours)**
            * **Add to Acceptance Criteria (ACs):**
                * The main tour listings page may prominently display links, buttons, or a section for Browse by the predefined categories, allowing users to navigate to the respective category pages (as per Story 3.5).
        * **Story 3.2: Simple Keyword Search & Category Filter for Tours** (Title Modified)
            * **Modified Description:** As a Visitor or registered Tourist, I want to use a simple keyword search functionality **and a category filter** on the tour listings page, so that I can quickly find tours relevant to my interests based on keywords or by selecting a specific, predefined tour type/category.
            * **Add/Modify Acceptance Criteria (ACs):**
                * The tour listings page (or main search interface area) includes a filter option (e.g., a dropdown menu) that allows users to select a single tour category from the predefined list.
                * When a category is selected from the filter, the displayed list of tours updates to show only those tours belonging to the selected category (and also matching any active keyword search).
                * If both a keyword search and a category filter are active, results must match both criteria.
                * A clear indication of any active filters (search term, selected category) is provided, along with an easy way to reset or clear all filters to view all tours again.
        * **Story 3.3: Detailed Tour Page Viewing**
            * **Add to Acceptance Criteria (ACs):**
                * The tour detail page clearly displays the tour's assigned Category (e.g., "Category: Day Tour").
        * **Story 3.4: View Basic Tour Guide Profile Information** (ACs unchanged from initial definition)
        * **Story 3.5 (NEW): View Tours by Category Page**
            * **As a Visitor or registered Tourist, I want to be able to navigate to a page dedicated to a specific tour category (e.g., 'Day Tours'), so that I can easily see all available tours that match that particular theme or type.**
            * **Acceptance Criteria (ACs):**
                * A clear mechanism exists for users to access category-specific tour listing pages (e.g., from a list/menu of available categories displayed on the main tours page or in the site navigation).
                * Each category page dynamically lists all "Published" tours that have been assigned to that specific category.
                * The tour cards displayed on these category pages use the same visual format and show the same key information as on the main tour listings page (as per Story 3.1).
                * The category page clearly indicates to the user which category of tours is currently being viewed (e.g., a heading like "Showing tours in: Day Tours").
                * Basic pagination (e.g., "Load More" or page numbers) is implemented if the number of tours within a category is large.
                * If no tours are currently published within a selected category, a user-friendly message is displayed.

* **Epic 4: Guest & Authenticated Booking Flow with Initial Communication MVP**
    * **Updated Goal:** Enable **both unauthenticated (guest) and authenticated Tourists** to book an available tour by selecting date/time and providing necessary details, receiving on-screen and email confirmation. Implement basic spam/bot protection measures for guest bookings. **Enable tourists (registered and guest via email link) to cancel their bookings before the tour start, triggering notifications to Guides and Admins.** Tourists should also be able to submit pre-booking questions to guides. Authenticated Guides will be able to view and manage their incoming bookings (confirm/reject/see cancellations), and receive email notifications for new bookings, questions, **and cancellations**. Tourists will receive email notification of booking status changes **including cancellation**. This delivers the platform's primary transaction, communication, **and self-service cancellation capabilities** for all target tourists.
    * **User Stories for Epic 4:**
        * **Story 4.1: Tour Guide - Manage Specific Tour Instance Availability** (ACs unchanged from initial definition)
        * **Story 4.2: Tourist - View Available Tour Slots & Select for Booking** (ACs unchanged from initial definition)
        * **Story 4.3: Guest Tourist - Submit Booking Details with Spam Protection** (ACs unchanged from initial definition)
        * **Story 4.4: Authenticated Tourist - Submit Booking Details** (ACs unchanged from initial definition)
        * **Story 4.5: Booking Request Confirmation (On-Screen & Email to Tourist)**
            * **Modified AC:** Add: "For guest bookings, the confirmation email must include a unique, secure link enabling the guest to cancel their booking (as per Story 4.10)."
        * **Story 4.6: Tour Guide - View & Manage Incoming Booking Requests**
            * **Modified AC:** Modify the list of statuses displayed to include: "..., current Booking Status (e.g., Pending Confirmation, Confirmed, Rejected, **Cancelled by Tourist, Cancelled by Guest**)..."
            * **Add to ACs:** The `Bookings` table schema should include considerations for a nullable `assigned_guide_user_id` for future Organization functionality[cite: 91, 206], although for MVP individual guide bookings, this field might store the ID of the guide who owns the tour.
        * **Story 4.7: Automated Notifications for Booking Events** (ACs unchanged from initial definition, covered by 4.11 for cancellations)
        * **Story 4.8: Tourist Pre-Booking Question Submission & Guide Notification** (ACs unchanged from initial definition)
        * **Story 4.9 (NEW): Authenticated Tourist Cancels Booking**
            * **As an authenticated Tourist, I want to be able to cancel my pending or confirmed tour booking (e.g., via my booking history page) before the tour start time/date, so that I am no longer scheduled, and the guide is informed.**
            * **Acceptance Criteria (ACs):**
                * An option to "Cancel Booking" is available for relevant bookings listed in the tourist's account (e.g., in a "My Bookings" section).
                * Cancellation is permitted if the request is made before a defined cut-off point (e.g., any time before the tour date for MVP).
                * Upon confirming cancellation, the booking status in the system changes to "Cancelled by Tourist."
                * The tourist receives an on-screen confirmation message of the cancellation.
                * The tour instance's available capacity is updated (i.e., spots are freed up).
        * **Story 4.10 (NEW): Guest Tourist Cancels Booking via Email Link**
            * **As a Guest Tourist who booked a tour, I want a unique link in my booking confirmation email that allows me to cancel my booking before the tour start time/date, so that I can manage my booking without needing an account.**
            * **Acceptance Criteria (ACs):**
                * The booking confirmation email sent to guest tourists (Story 4.5) must contain a unique, secure, and time-limited (or single-use) link to a cancellation page.
                * Clicking the cancellation link takes the guest to a page where they can confirm their intention to cancel the specific booking.
                * Upon confirmation on this page, the booking status in the system changes to "Cancelled by Guest."
                * The guest receives an on-screen confirmation message of the cancellation.
                * The tour instance's available capacity is updated.
                * The cancellation link should no longer be usable after successful cancellation or after the tour start time.
        * **Story 4.11 (NEW): System Notifications for Booking Cancellations**
            * **As a Tour Guide, I want to receive an email notification when a tourist (registered or guest) cancels a booking for one of my tours, so I am immediately aware of the change.**
            * **As an Admin, I want cancelled bookings to be clearly identifiable in the system, so I can monitor overall platform activity and booking statuses.**
            * **Acceptance Criteria (ACs):**
                * An automated email notification is sent to the Tour Guide's registered email address when any booking for their tours is cancelled. The email includes details of the cancelled booking (tour name, date, time, tourist identifier if available).
                * The booking status is updated to "Cancelled by Tourist" or "Cancelled by Guest" and is visible in the Tour Guide's booking management interface (Story 4.6).
                * The booking status is updated and visible in any Admin views that list bookings.

* **Epic 5: Admin Essentials - User/Tour Oversight & Basic Dashboard MVP**
    * **Updated Goal:** Provide authenticated Admin users with the essential tools to manage user accounts (view, activate/deactivate, assign roles), tour listings (view all, edit key details including **category consistency**, unpublish if necessary), **and view booking information including cancellations.** Admins will also have access to a simple dashboard displaying key platform statistics (e.g., total users by role, total active tours, total bookings). This ensures basic platform integrity, support, and monitoring.
    * **User Stories for Epic 5:**
        * **Story 5.1: Admin Dashboard with Key Platform Statistics**
            * **Modified AC (minor):** The dashboard displays the following statistics for MVP: Total number of registered Tourists; Total number of registered Tour Guides; Total number of "Published" tours; Total number of tour bookings made (across all statuses: Pending, Confirmed, Rejected, **Cancelled**), including guest bookings.
        * **Story 5.2: Admin - View and Manage User Accounts** (ACs unchanged from initial definition)
        * **Story 5.3: Admin - View and Manage Tour Listings**
            * **Add to Acceptance Criteria (ACs):** When viewing or editing tour details, Admins can see and modify the category assigned to the tour (from the predefined list).

## Key Reference Documents

{This section will be created later, from the sections prior to this being carved up into smaller documents}

## Out of Scope Ideas Post MVP

*(Updated based on Project Brief v2)*

The following features and ideas are considered out of scope for the initial MVP but may be prioritized for future development phases:

* **Organization Account & Management Functionality (High Priority)**:
    * Allow approved Tour Guides to create and manage an "Organization" profile.
    * Functionality for Organization Managers to invite existing approved Tour Guides to become members.
    * Ability for Organizations to create, list, and manage tours under the Organization's banner.
    * Mechanism for Organization Managers to assign member guides to specific bookings for Organization's tours.
    * Specific dashboard views and tools for Organization Managers.
* **Online Payments & Commission System**
* **Reviews and Rating System**
* **Advanced Search & Filtering for Tourists** (beyond basic keyword and single category)
* **Tourist User Accounts (Enhanced)** [cite: 61, 176]
* **Enhanced Tour Guide Tools**
* **Expanded "Blog" / Content Features** [cite: 65, 180]
* **Admin Panel Enhancements** (including UI for managing Tour Categories, advanced reporting, moderation) [cite: 66, 181]
* **External Platform Integrations** [cite: 67, 182]
* **Mobile Applications** [cite: 68, 183]
* **Multi-language Support** [cite: 69, 184]

## [OPTIONAL: For Simplified PM-to-Development Workflow Only] Core Technical Decisions & Application Structure

This section is not applicable as the "Full Agile Team Workflow" was selected. Technical decisions beyond the high-level assumptions will be primarily determined by the Architect, who will create a detailed technical architecture document based on this PRD.

## Change Log

| Change                                                                                   | Date       | Version | Description                                                                                                | Author   |
| :--------------------------------------------------------------------------------------- | :--------- | :------ | :--------------------------------------------------------------------------------------------------------- | :------- |
| Initial PRD draft created for MVP phase.                                                 | 2025-05-21 | 1.0     | Compilation of all defined sections for the MVP.                                                           | 2-pm (AI) |
| Added Booking Cancellation and Tour Category features to MVP scope.                      | 2025-05-27 | 1.1     | Updated Functional Requirements, Epics, and User Stories. Noted timeline impact.                             | 2-pm (AI) |
| Updated to reflect database design for future Organization extensibility per new Brief. | 2025-05-28 | 1.2     | Modified Story 1.2 (Data Model) ACs, Architect Prompt. Confirmed MVP app logic for individual guides. | 2-pm (AI) |

--- END PRD START CHECKLIST OUTPUT ------

## Checklist Results Report

*(The Checklist Results Report from PRD v1.0 is retained here. The new features in v1.1 and data model considerations in v1.2 were added as extensions/clarifications. The overall assessment statuses for each category from the v1.0 assessment would largely remain, with the understanding that "Feature Completeness" now covers more scope and "Technical Guidance" for the data model is more specific. Deficiencies noted in the v1.0 checklist still apply where relevant.)*

**Project:** Unique Tours Platform
**Date:** May 21, 2025 (reflects date of original checklist assessment)
**PRD Version:** 1.0 (as assessed)

This report summarizes the assessment of the "Unique Tours Platform" Product Requirements Document (PRD) v1.0 against the Product Manager (PM) Requirements Checklist.

**Status Legend:**
* `[X]` - Met: The requirement is fully addressed in the PRD.
* `[P]` - Partially Met/Deficient: The requirement is partially addressed or has aspects that could be improved. Decisions on handling these are noted.
* `[N/A]` - Not Applicable: The requirement is not applicable to this project or PRD phase.

---
*(The detailed checklist items and PRD & EPIC VALIDATION SUMMARY table from the previously generated report would follow here. For brevity in this response, it's not repeated, but it's part of the actual document.)*
---

**PRD & EPIC VALIDATION SUMMARY (from v1.0 assessment)**

| Category                        | Status   | Critical Issues Noted for MVP PRD                                       |
| :------------------------------ | :------- | :---------------------------------------------------------------------- |
| 1. Problem Definition & Context | PARTIAL  | Quantification of problem impact; Full success metrics summary.         |
| 2. MVP Scope Definition         | PARTIAL  | Rationale for each out-of-scope item; Criteria for moving beyond MVP.   |
| 3. User Experience Requirements | PARTIAL  | Detailed flow/edge case docs; General error strategy; Formal IA/UI list. |
| 4. Functional Requirements      | PARTIAL  | Explicit CLI testability for backend stories.                           |
| 5. Non-Functional Requirements  | PARTIAL  | Specific perf targets; Security testing; Backup/Recovery details.       |
| 6. Epic & Story Structure       | PASS     | Minor notes on story independence/dependency mapping.                  |
| 7. Technical Guidance           | PARTIAL  | Explicit risk flagging; Broader decision framework; Doc standards.      |
| 8. Cross-Functional Requirements| PARTIAL  | Data retention; Detailed API specs; Detailed Ops procedures.          |
| 9. Clarity & Communication      | PARTIAL  | Lack of diagrams; Post-session PRD update process.                      |

**Critical Deficiencies (for MVP PRD Handoff - from v1.0 assessment):**
* None identified that critically block handoff for an MVP where speed is prioritized and subsequent architectural/design elaboration is planned.

**Recommendations & Final Notes on Deficiencies (from v1.0 assessment, still relevant):**
* Noted items for future PRD iterations, Design Architect, and Technical Architect/Development Team.
* The aggressive 1-week timeline for MVP development (now further impacted by features added in v1.1/v1.2) was a guiding factor.

**Final Decision (PRD is now v1.2 and more comprehensive):**
* **READY FOR ARCHITECT (and Design Architect)**: The PRD and epics are deemed sufficiently comprehensive and structured for the MVP phase.

--- END Checklist START Design Architect `UI/UX Specification Mode` Prompt ------

## Prompt for Design Architect (UI/UX Specification Mode)

**Objective:** Elaborate on the UI/UX aspects of the product defined in this PRD for the "Unique Tours Platform".
**Mode:** UI/UX Specification Mode
**Input:** This completed PRD document (Unique Tours Platform PRD v1.2).
**Key Tasks:**
1.  Review the product goals, user stories (including cancellation, categories features), user interaction and design goals, and any UI-related notes herein. Pay special attention to the visual inspiration from `atasteofhanoi.com` [cite: 103, 218] and the mobile-first responsive requirement.
2.  Collaboratively define detailed user flows for key tasks (e.g., tourist booking including cancellation flows, guide tour creation including category assignment, tourist Browse/filtering by categories).
3.  Create wireframes (conceptual, for key screens) and key screen mockups/descriptions that align with the minimalist, modern aesthetic for all core flows including new features.
4.  Specify usability requirements and any basic accessibility considerations feasible for MVP.
5.  Populate or create a `front-end-spec-tmpl.txt` document (or similar format) detailing these UI/UX specifications.
6.  Ensure that this PRD is updated with references to the detailed UI/UX specifications, or that the UI/UX specification document clearly links back and complements this PRD.

Please guide the user through this process to enrich the PRD with detailed UI/UX specifications.

--- END Design Architect `UI/UX Specification Mode` Prompt START Architect Prompt ------

## Initial Architect Prompt

Based on our discussions and requirements analysis for the **Unique Tours Platform** (PRD v1.2), I've compiled the following technical guidance to inform your architecture analysis and decisions to kick off Architecture Creation Mode:

### Technical Infrastructure

* **Repository & Service Architecture Decision:** A single repository (monorepo) will house the Next.js application code[cite: 85, 200]. A monolithic application structure using Next.js is preferred for the MVP[cite: 81, 196]. Supabase will serve as the comprehensive Backend-as-a-Service (BaaS)[cite: 83, 198].
* **Starter Project/Template:** New project, standard Next.js initialization.
* **Hosting/Cloud Provider:** Vercel for Next.js hosting/CI/CD. Supabase for BaaS.
* **Frontend Platform:** Next.js (React)[cite: 74, 189].
* **Backend Platform:** Node.js (for Next.js backend/serverless functions)[cite: 74, 189]. Supabase for BaaS.
* **Database Requirements:** PostgreSQL via Supabase. **The schema must be designed for future extensibility to support an "Organization Model" as detailed in this PRD (Story 1.2 ACs and Project Brief sections on Database Design), even though MVP application logic focuses on individual guides.**

### Technical Constraints

* **Aggressive Timeline:** Original 1-week MVP sprint target [cite: 70, 185] is now significantly impacted by added features (cancellation, categories). Please provide a revised estimate.
* **Hosting Budget:** Initial monthly costs within $50-$100[cite: 71, 186].
* **Compliance:** Adherence to Vietnam's Decree 13/2023/ND-CP for MVP.
* **Mandated Stack:** Next.js, Supabase[cite: 74, 189].

### Deployment Considerations

* **CI/CD:** Basic automated CI/CD pipeline to Vercel.
* **Deployment Target:** MVP launch (timeline needs reassessment).
* **Environments:** Local, Vercel preview, Vercel production.

### Local Development & Testing Requirements

* **Local Environment:** Developers run Next.js locally, connect to Supabase.
* **Testing Strategy (MVP):** Manual testing of core features (including cancellation, categories); Focused integration testing for booking, cancellation, tour creation with categories.
* **Critically Tested Paths:** Tourist booking funnel (including cancellation); Guide tour creation (including category assignment).

### Other Technical Considerations

* **Scalability:** Architecture should allow future scaling[cite: 72, 187].
* **Security:** Secure PII handling via Supabase features[cite: 80, 195]. Spam/bot protection for guest actions. Secure guest cancellation links.
* **User Interface:** Mobile-first responsive design.
* **Technical Debt:** Acknowledge and manage[cite: 100, 215].
* **Points for Architect Investigation (from PM Checklist & new features):**
    * Spam/bot protection details.
    * Secure guest booking cancellation links.
    * Efficient querying for categories/filtering.
    * Impact of AI coding assistance[cite: 96, 211].
    * Detailed backup/recovery beyond Supabase defaults (if needed for specific RPO/RTO post-MVP).
    * Detailed fault tolerance mechanisms.
    * Specific performance monitoring approach (post-MVP).
    * Code/architecture documentation standards.
    * Defining detailed API specifications.
    * Operational alerting mechanisms (post-MVP).
    * **Ensuring MVP data model correctly anticipates future Organization needs without over-complicating the initial build or significantly impacting the MVP timeline**[cite: 102, 217].

Please use this PRD (v1.2) and the above guidance to create the technical architecture and solution design for the Unique Tours Platform MVP. **Please also provide an updated estimate on the development timeline given the expanded scope.**
--- END Architect Prompt -----

---