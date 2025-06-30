Of course. Here is the updated Product Requirements Document with the "Out of Scope Ideas Post MVP" section included.

# Unique Tours Platform Product Requirements Document (PRD)

## Goals and Background Context

### Goals

* Establish the platform as the leading online destination for unique, authentic, and offbeat global tour experiences.
* Empower local tour guides by providing a platform to share their passions and manage their niche offerings effectively.
* Enable travelers to discover and book unforgettable, off-the-beaten-path adventures.
* Successfully launch an MVP within a 1-week development timeframe featuring core functionalities for tourists, guides, and administrators.
* Onboard 5-10 guides with 10-15 tours and achieve 5-10 bookings within the first two weeks of launch.
* Gather feedback from early adopters to guide future development.

### Background Context

The current tourism market is saturated with large platforms focusing on mainstream tours, making it difficult for travelers to find unique, local experiences. Concurrently, local guides offering these specialized tours lack visibility on platforms tailored to their needs.

The Unique Tours Platform will bridge this gap by creating a dedicated marketplace connecting these guides with travelers seeking authentic experiences. It will provide guides with tools to create, promote, and manage their tours, emphasizing rich storytelling. For tourists, it will be a trusted source for booking memorable, non-traditional adventures, solving the discovery problem for both sides of the market.

### Change Log

| Date | Version | Description | Author |
| :--- | :------ | :---------- | :----- |
| 2025-05-21 | 1.0 | Initial PRD draft created for MVP phase. | 2-pm (AI) |
| 2025-05-27 | 1.1 | Added Booking Cancellation and Tour Category features to MVP scope. | 2-pm (AI) |
| 2025-05-28 | 1.2 | Updated to reflect database design for future Organization extensibility per new Brief. | 2-pm (AI) |

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

## User Interface Design Goals

### Overall UX Vision

The platform will project trustworthiness as a go-to source for unique, authentic local tours. The design will be minimalist, modern, clean, and visually appealing, inspired by `atasteofhanoi.com`, to emphasize the uniqueness of the tours and guides' stories. The user journey for both tourists (discovery to booking and cancellation) and guides (tour creation to managing bookings) must be intuitive and straightforward.

### Key Interaction Paradigms

* **Tourists:** Seamless Browse of tour listings with clear calls-to-action, simple search and category filtering, an intuitive booking process, and a straightforward method for cancellation (via account or secure email link).
* **Tour Guides:** An easy-to-use interface for creating and managing tour listings, including a rich-text editor and category assignment. A simple mechanism for managing availability and a clear presentation of bookings and cancellations.
* **Admin:** Efficient tools for user and tour management with a clear dashboard for key metrics.

### Core Screens and Views

* **Tourist-Facing:**
    * Homepage/Tour Discovery (featuring unique tours, search/filter, category navigation)
    * Category-specific Tour Listing Page
    * Tour Detail Page (comprehensive info including category, Guide's Story, guide bio, booking interface, contact option)
    * Booking Confirmation Page
    * Booking Cancellation Interface/Page
    * Simple login/registration for booking.
* **Guide-Facing:**
    * Dashboard (overview of listings, bookings including cancellations)
    * Tour Creation/Editing Interface (with category selection)
    * Availability Management Interface
    * Booking Management Interface (showing cancelled status)
    * Profile Management Page
    * Registration/Login.
* **Admin-Facing:**
    * Main Dashboard (key platform statistics)
    * User Management Interface
    * Tour Management Interface
    * (Behind the scenes) Predefined list of Categories for assignment.

### Accessibility: None

For the MVP, advanced accessibility features are a lower priority due to the aggressive timeline. Basic usability will be the focus.

### Branding

* **Platform Name:** "Unique Tours Platform".
* **Core Message:** Emphasis on "unique, offbeat, authentic local experiences".
* **Visual Style:** Clean, minimalist, and modern, inspired by `atasteofhanoi.com`.
* **Color Palette:** Should align with the aesthetic and color scheme observed on `https://atasteofhanoi.com/`.

### Target Device and Platforms

The MVP will be a web application designed with a "mobile-first responsive" approach, ensuring it functions effectively on both desktop and mobile browsers.

## Technical Assumptions

### Repository Structure: Monorepo

A single repository (monorepo) will be used to house the Next.js application code.

### Service Architecture

A monolithic application structure utilizing Next.js is preferred for the MVP. This single application will manage both frontend rendering and its API routes/serverless functions for backend logic. Supabase will function as the comprehensive Backend-as-a-Service (BaaS). This approach is chosen to optimize for development speed, simplicity, and ease of deployment.

### Testing requirements

Given the aggressive 1-week development timeline, QA will prioritize validating core functionalities and critical user paths.
* **Primary Approach: Structured Manual Testing:** A concise set of test cases will be developed to cover core features for all user roles.
* **Secondary Approach: Focused Integration Testing:** Targeted integration tests will be performed for key interactions between Next.js and Supabase, specifically for the booking process, tour creation, and cancellation flows.
* **Out of Scope for MVP:** Comprehensive automated End-to-End (E2E) tests are out of scope but will be a post-MVP consideration.
* **Critically Tested Paths:** Rigorous testing is mandatory for the core tourist booking funnel (discovery to confirmation and cancellation) and the guide's tour creation and management flow.

### Additional Technical Assumptions and Requests

* **Primary Technology Stack:** The platform will be built using Next.js (React) for the frontend, Node.js for backend functionalities, and Supabase (PostgreSQL) for the database, authentication, and storage.
* **Data Model Design:** The MVP database schema must be designed for future extensibility to support an "Organization" model. This includes adding a nullable `organization_id` to the `Tours` table and a nullable `assigned_guide_user_id` to the `Bookings` table. These fields will be unused by the MVP application logic but are crucial for future readiness.
* **Compliance:** Adherence to Vietnam's Decree 13/2023/ND-CP will be supported by leveraging Supabase's built-in security features and appropriate application logic.

## Epics

-   Epic1 Project Foundation & Core Platform Setup: Establish the initial Next.js application, connect to Supabase with a future-proof schema, set up initial tour categories, configure basic deployment, and implement user registration and login for all roles.
-   Epic2 Tour Guide Onboarding & Tour Creation MVP: Enable authenticated Tour Guides to complete their profiles and create, edit, and publish detailed tour listings, including assigning a category and crafting a "Guide's Story."
-   Epic3 Tourist Tour Discovery & Viewing MVP: Enable tourists to browse all tours, browse by category, use simple search and category filters, and view detailed tour pages with guide information.
-   Epic4 Guest & Authenticated Booking Flow with Initial Communication MVP: Enable all tourists to book tours, receive confirmations, and cancel their bookings, with corresponding notifications for guides. Allow tourists to send pre-booking questions.
-   Epic5 Admin Essentials - User/Tour Oversight & Basic Dashboard MVP: Provide Admins with tools to manage users and tours, view all bookings including cancellations, and monitor key platform statistics on a simple dashboard.

## Epic 1 Project Foundation & Core Platform Setup

This epic lays the essential technical groundwork and user access control for all subsequent features. It includes establishing the Next.js application, connecting to Supabase, designing the schema for future Organization extensibility, setting up initial tour categories, creating a basic deployment pipeline, and implementing user registration and login for all three user roles (Tourist, Tour Guide, Admin).

### Story 1.1 Initial Project Setup & Basic Deployment Pipeline

As a Developer, I want to set up a new Next.js project with TypeScript, connect it to a Supabase backend, and establish a basic CI/CD pipeline to Vercel, so that we have a foundational, deployable codebase to build upon.

#### Acceptance Criteria

* 1: A new Next.js application is initialized with TypeScript.
* 2: The application is configured to connect to the Supabase project using environment variables.
* 3: The project is pushed to a Git repository.
* 4: A Vercel project is created and linked to the Git repository for automated deployments.
* 5: Successful pushes to the main branch deploy automatically to Vercel production.

### Story 1.2 User Role Definition & Foundational Data Model in Supabase

As a Developer, I want to define the core data models in Supabase for user profiles and roles, so that the platform can distinguish between Tourists, Guides, and Admins, and prepare the schema for future extensibility.

#### Acceptance Criteria

* 1: The Supabase `auth.users` table is used for core authentication.
* 2: A `profiles` table is created, linked one-to-one with `auth.users`, containing a `role` column ('tourist', 'guide', 'admin') and basic profile info (name, bio, photo URL).
* 3: The `Tours` table schema includes a nullable `organization_id` field to accommodate future Organization functionality.
* 4: The `Bookings` table schema includes a nullable `assigned_guide_user_id` field for future Organization functionality.
* 5: Initial placeholder structures or design considerations for future `Organizations` and `OrganizationMembers` tables are documented.

### Story 1.3 Define Initial Fixed List of Tour Categories

As a Developer, I want to populate the database with an initial, fixed list of tour categories during setup, so that these are available for guides to use when creating tours and for tourists to use for filtering.

#### Acceptance Criteria

* 1: A `categories` table (or equivalent simple structure) is created in the Supabase database.
* 2: The table is populated with an initial, predefined list of categories (e.g., 'Day tours', 'Night tours', 'Adventure', 'Cultural', 'Culinary').
* 3: The category list is accessible by the application for use in the tour creation form and tour filtering features.

### Story 1.4 User Registration for Tourists and Aspiring Guides

As a User, I want to register for a new account using my email and a password, so that I can access platform features as a Tourist or request to become a Tour Guide.

#### Acceptance Criteria

* 1: A registration page is available with fields for email and password.
* 2. Upon submission, a new user is created in Supabase `auth.users`.
* 3. A corresponding entry is created in the `profiles` table with the default role of 'tourist'.
* 4. The user is automatically logged in and redirected to the homepage or a welcome page.
* 5: Basic validation for email format and password strength is implemented.

### Story 1.5 Unified User Login & Logout Functionality

As a User, I want to log in with my email and password and be able to log out, so that I can securely access and end my session on the platform.

#### Acceptance Criteria

* 1: A login page allows users to authenticate using their registered email and password.
* 2: A successful login creates a user session and redirects the user.
* 3: A "Logout" button is available to authenticated users, which securely terminates the session.
* 4: Appropriate error messages are shown for failed login attempts.

### Story 1.6 Basic Platform Layout, Navigation Shell, and Styling Foundation

As a User, I want a consistent and clean layout with a main navigation bar, so that I can easily move between the main sections of the platform.

#### Acceptance Criteria

* 1: A responsive layout shell is created with a header, main content area, and footer.
* 2: The header displays the platform name and navigation links (e.g., Home, Tours, Browse by Category, Login/Register).
* 3: Navigation links adapt based on the user's authentication status and role.
* 4: The visual style is minimalist and modern, inspired by `atasteofhanoi.com`.

### Story 1.7 Initial Admin User Creation Process

As a Developer, I need a secure, one-time process to create the first Admin account, so that platform oversight can be established.

#### Acceptance Criteria

* 1: A secure script or manual Supabase SQL query is used to assign the 'admin' role to a specific, pre-registered user.
* 2: The process is documented for the project owner or lead developer to execute.
* 3: This process is designed for initial setup only and not for ongoing admin creation.

## Epic 2 Tour Guide Onboarding & Tour Creation MVP

Enable authenticated Tour Guides to complete their profile (name, photo, bio) and to create, edit, and publish detailed tour listings. Listings must include title, description, price, location, duration, images, capacity, assignment to a predefined category, and the "Guide's Story" using a rich-text editor. This delivers the core supply-side functionality for the platform.

### Story 2.1 Tour Guide Profile Completion & Management

As an authenticated Tour Guide, I want to complete and update my public profile (name, photo, bio), so that tourists can learn more about me.

#### Acceptance Criteria

* 1: A "Manage Profile" page is available to users with the 'guide' role.
* 2: The guide can input/update their name, a short biography, and upload a profile photo.
* 3: The uploaded photo is stored securely using Supabase Storage.
* 4: The updated information is saved to the guide's record in the `profiles` table.

### Story 2.2 Initiate New Tour Listing & Define Core Details

As an authenticated Tour Guide, I want to start creating a new tour by providing its essential details like title, description, price, location, duration, capacity, and assign it to a predefined category, so that the fundamental aspects of my tour are captured and classified.

#### Acceptance Criteria

* 1: A "Create Tour" form is available to guides.
* 2: The form includes fields for all core details (title, description, price, etc.).
* 3: The form includes a mandatory dropdown to select **one category** from the predefined list created in Epic 1.
* 4: The selected category is saved and associated with the tour record in the database.
* 5: The `tours` table schema stores the assigned category and considers the nullable `organization_id` for future use.

### Story 2.3 Enhance Tour Listing with Images

As a Tour Guide, I want to upload multiple images for my tour listing, so that I can visually showcase the experience to potential tourists.

#### Acceptance Criteria

* 1: The tour creation/editing form allows for multiple image uploads.
* 2: Images are uploaded and stored securely via Supabase Storage.
* 3: The image URLs are associated with the correct tour record.
* 4: Guides can see and manage the uploaded images for their tour.

### Story 2.4 Craft "Guide's Story" for Tour Listing with Rich-Text Editor

As a Tour Guide, I want to use a rich-text editor to craft a compelling "Guide's Story" for my tour, so that I can share a rich narrative and highlight what makes my tour unique.

#### Acceptance Criteria

* 1: The tour creation/editing form includes a rich-text editor field for the "Guide's Story."
* 2: The editor allows for basic formatting (bold, italics, lists).
* 3: The formatted content is saved securely and rendered correctly on the tour detail page.

### Story 2.5 Manage Tour Listing Lifecycle (Edit, Publish, Unpublish)

As a Tour Guide, I want to edit my existing tours and control their visibility by publishing or unpublishing them, so I can manage my offerings over time.

#### Acceptance Criteria

* 1: Guides can access a list of all tours they have created.
* 2: From the list, guides can choose to edit any tour, which opens the tour form populated with existing data.
* 3: Guides can toggle a tour's status between "Draft" (or "Unpublished") and "Published."
* 4: Only "Published" tours are visible to the public.

### Story 2.6 Define General Tour Availability Information

As a Tour Guide, I want to provide general information about my tour's availability in the description, so tourists understand when the tour is typically offered.

#### Acceptance Criteria

* 1: The tour creation form includes a text area for "General Availability" (e.g., "Runs daily, except Mondays").
* 2: This information is displayed clearly on the tour detail page.
* 3: This is distinct from the specific date-blocking functionality (Story 4.1).

## Epic 3 Tourist Tour Discovery & Viewing MVP

Enable prospective and registered Tourists to browse all published tours, browse tours by specific predefined categories, perform simple searches (e.g., by keyword), filter tours by category, and view detailed tour pages. These pages will display comprehensive tour information (including its category), the "Guide's Story", and the Tour Guide's basic profile.

### Story 3.1 Public Tour Listings Page (Browse All Tours)

As a Visitor, I want to view a gallery of all published tours on a main listings page, so I can browse the available experiences.

#### Acceptance Criteria

* 1: A public page `/tours` exists that displays all "Published" tours.
* 2: Each tour is displayed as a card with a primary image, title, price, and duration.
* 3: Clicking a tour card navigates to the detailed tour page.
* 4: The page prominently displays links or a section to browse by predefined categories.

### Story 3.2 Simple Keyword Search & Category Filter for Tours

As a Visitor, I want to use a simple keyword search and a category filter on the tour listings page, so I can quickly find tours relevant to my interests.

#### Acceptance Criteria

* 1: The tour listings page includes a keyword search input field.
* 2: The page also includes a filter option (e.g., a dropdown) to select a single tour category.
* 3: The list of tours updates to show only results that match the keyword and/or selected category.
* 4: A clear way to reset filters and view all tours again is provided.

### Story 3.3 Detailed Tour Page Viewing

As a Visitor, I want to view a detailed page for each tour, so I can get all the information needed to make a booking decision.

#### Acceptance Criteria

* 1: Each tour has a unique, shareable URL.
* 2: The page displays all tour details: title, description, images, duration, price, category, inclusions/exclusions, meeting point, and the "Guide's Story".
* 3: The tour's assigned category is clearly displayed.
* 4: The page also includes the booking interface and the contact form for pre-booking questions.

### Story 3.4 View Basic Tour Guide Profile Information

As a Visitor on a tour detail page, I want to see the profile of the Tour Guide offering the tour, so that I can build trust and learn about the person behind the experience.

#### Acceptance Criteria

* 1: A section on the tour detail page displays the guide's name, photo, and biography.
* 2: This information is pulled from the guide's managed profile.

### Story 3.5 View Tours by Category Page

As a Visitor, I want to navigate to a page for a specific tour category (e.g., 'Culinary'), so I can easily see all tours of that type.

#### Acceptance Criteria

* 1: A mechanism exists to access category-specific pages (e.g., links in the navigation or on the main tours page).
* 2: Each category page (e.g., `/tours/culinary`) dynamically lists all "Published" tours assigned to that category.
* 3: The page clearly indicates which category is being viewed.
* 4: If no tours exist for a category, a user-friendly message is shown.

## Epic 4 Guest & Authenticated Booking Flow with Initial Communication MVP

Enable both unauthenticated (guest) and authenticated Tourists to book an available tour, receive confirmation, and cancel their bookings. Implement basic spam/bot protection for guest bookings. Enable guides to manage their bookings (confirm/reject/see cancellations) and receive relevant notifications. This delivers the platform's primary transaction and communication capabilities.

### Story 4.1 Tour Guide - Manage Specific Tour Instance Availability

As a Tour Guide, I want a simple way to block out specific dates when my tour is not available, so that tourists cannot book it on those days.

#### Acceptance Criteria

* 1: A "Manage Availability" interface is available for each tour a guide owns.
* 2: The guide can select specific dates from a calendar or list to mark them as "unavailable."
* 3: These blocked dates are stored and prevent tourists from selecting them in the booking calendar.

### Story 4.2 Tourist - View Available Tour Slots & Select for Booking

As a Tourist on a tour detail page, I want to see available dates and select one for booking, so I can start the booking process.

#### Acceptance Criteria

* 1: The booking interface on the tour detail page includes a date picker.
* 2: Dates blocked by the guide (as per Story 4.1) are disabled or not shown.
* 3: The tourist can select an available date to proceed with the booking.

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

As a Tourist, after submitting a booking request, I want to receive an immediate on-screen confirmation and an email, so I know my request was received.

#### Acceptance Criteria

* 1: After submitting a booking, an on-screen message confirms that the request has been sent to the guide.
* 2: An automated email is sent to the tourist's provided email address, confirming the booking details and stating that it is pending confirmation.
* 3: For guest bookings, the confirmation email must include a unique, secure link to cancel the booking.

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

## Epic 5 Admin Essentials - User/Tour Oversight & Basic Dashboard MVP

Provide authenticated Admin users with the essential tools to manage user accounts (view, activate/deactivate, assign roles), tour listings (view all, edit key details including category consistency, unpublish if necessary), and view booking information including cancellations. Admins will also have access to a simple dashboard displaying key platform statistics. This ensures basic platform integrity, support, and monitoring.

### Story 5.1 Admin Dashboard with Key Platform Statistics

As an Admin, I want to see a simple dashboard with high-level platform metrics, so I can quickly assess the platform's activity.

#### Acceptance Criteria

* 1: An admin dashboard page is accessible only to users with the 'admin' role.
* 2: The dashboard displays: Total registered Tourists, Total registered Tour Guides, Total "Published" tours, and Total number of bookings (across all statuses including Cancelled).

### Story 5.2 Admin - View and Manage User Accounts

As an Admin, I want to view a list of all users and manage their accounts, so I can maintain platform health and handle user support requests.

#### Acceptance Criteria

* 1: An admin interface lists all registered users with their email and role.
* 2: The Admin can change a user's role (e.g., promote a 'tourist' to a 'guide').
* 3: The Admin can activate or deactivate user accounts.

### Story 5.3 Admin - View and Manage Tour Listings

As an Admin, I want to view and manage all tour listings on the platform, so I can perform quality control and support guides.

#### Acceptance Criteria

* 1: An admin interface lists all tours created on the platform.
* 2: The Admin can edit any tour's details, including its assigned category.
* 3: The Admin can unpublish any tour if it violates platform policies.

## Out of Scope Ideas Post MVP

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
* **Tourist User Accounts (Enhanced)**
* **Enhanced Tour Guide Tools**
* **Expanded "Blog" / Content Features**
* **Admin Panel Enhancements** (including UI for managing Tour Categories, advanced reporting, moderation)
* **External Platform Integrations**
* **Mobile Applications**
* **Multi-language Support**

## Checklist Results Report

**Project:** Unique Tours Platform
**Date:** May 21, 2025 (reflects date of original checklist assessment)
**PRD Version:** 1.0 (as assessed)

This report summarizes the assessment of the "Unique Tours Platform" Product Requirements Document (PRD) v1.0 against the Product Manager (PM) Requirements Checklist. The PRD is now at v1.2, which is more comprehensive, but the original assessment notes remain relevant for context.

**PRD & EPIC VALIDATION SUMMARY (from v1.0 assessment)**

| Category | Status | Critical Issues Noted for MVP PRD |
| :--- | :--- | :--- |
| 1. Problem Definition & Context | PARTIAL | Quantification of problem impact; Full success metrics summary. |
| 2. MVP Scope Definition | PARTIAL | Rationale for each out-of-scope item; Criteria for moving beyond MVP. |
| 3. User Experience Requirements | PARTIAL | Detailed flow/edge case docs; General error strategy; Formal IA/UI list. |
| 4. Functional Requirements | PARTIAL | Explicit CLI testability for backend stories. |
| 5. Non-Functional Requirements | PARTIAL | Specific perf targets; Security testing; Backup/Recovery details. |
| 6. Epic & Story Structure | PASS | Minor notes on story independence/dependency mapping. |
| 7. Technical Guidance | PARTIAL | Explicit risk flagging; Broader decision framework; Doc standards. |
| 8. Cross-Functional Requirements| PARTIAL | Data retention; Detailed API specs; Detailed Ops procedures. |
| 9. Clarity & Communication | PARTIAL | Lack of diagrams; Post-session PRD update process. |

**Final Decision (PRD is now v1.2 and more comprehensive):**
* **READY FOR ARCHITECT (and Design Architect)**: The PRD and epics are deemed sufficiently comprehensive and structured for the MVP phase.

## Next Steps

### Design Architect Prompt

**Objective:** Elaborate on the UI/UX aspects of the product defined in this PRD for the "Unique Tours Platform".
**Mode:** UI/UX Specification Mode
**Input:** This completed PRD document (Unique Tours Platform PRD v1.2).
**Key Tasks:**
1.  Review the product goals, user stories (including cancellation, categories features), user interaction and design goals, and any UI-related notes herein. Pay special attention to the visual inspiration from `atasteofhanoi.com` and the mobile-first responsive requirement.
2.  Collaboratively define detailed user flows for key tasks (e.g., tourist booking including cancellation flows, guide tour creation including category assignment, tourist browse/filtering by categories).
3.  Create wireframes and key screen mockups that align with the minimalist, modern aesthetic for all core flows.
4.  Specify usability requirements and any basic accessibility considerations feasible for MVP.
5.  Ensure the resulting UI/UX specification document clearly links back to and complements this PRD.

### Architect Prompt

Based on the requirements in this PRD (v1.2), please create the technical architecture and solution design for the Unique Tours Platform MVP.

**Key Technical Constraints & Guidance:**
* **Architecture:** Use a monorepo with a monolithic Next.js application and Supabase as the BaaS.
* **Technology Stack:** Next.js (React), Node.js, and PostgreSQL via Supabase are mandated.
* **Database:** The schema **must** be designed for future "Organization Model" extensibility as detailed in Story 1.2 and the Technical Assumptions.
* **Timeline & Budget:** The original 1-week timeline is now significantly impacted by new features. Please provide a revised estimate. The initial monthly hosting budget is $50-$100.
* **Testing:** The MVP will rely on structured manual testing and focused integration testing for critical paths like booking, cancellation, and tour creation.
* **Points for Investigation:** Please address spam protection for guest forms, secure guest cancellation link implementation, efficient database querying for categories/filters, and ensuring the data model correctly anticipates future needs without over-complicating the MVP.