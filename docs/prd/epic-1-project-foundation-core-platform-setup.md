# Epic 1 Project Foundation & Core Platform Setup

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

**As a** Developer, **I want to** define the core data models in Supabase for user profiles, roles, tours, bookings, languages, and time slots, **so that** the platform can distinguish between user types and the database schema can support all required MVP features while being ready for future extensibility.

#### Acceptance Criteria

* 1.  The Supabase `auth.users` table is used for core authentication.
* 2.  A `profiles` table is created, linked one-to-one with `auth.users`, containing a `role` column ('tourist', 'guide', 'admin') and a `phone` field.
* 3.  A `languages` table is created to store a canonical list of tour languages.
* 4.  A `categories` table is created to store a canonical list of tour categories.
* 5.  A `tours` table is created that includes a `timezone` field and foreign keys to `profiles`, `categories`, and `languages`. The table also includes a nullable `organization_id` field for future extensibility.
* 6.  A `tour_languages` join table is created to support a many-to-many relationship between tours and languages.
* 7.  A `tour_time_slots` table is created to store the available appointment times for each tour.
* 8.  A `bookings` table is created with a `booking_datetime` (TIMESTAMPTZ) field and a nullable `assigned_guide_user_id` for future functionality.
* 9. Initial placeholder structures or design considerations for future `Organizations` and `OrganizationMembers` tables are documented.

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

### Story 1.8 Define Initial Fixed Lists of Tour Languages and Time Zones

**As a** Developer, **I want to** populate the database with initial, fixed lists of supported tour languages and common time zones, **so that** these are available for guides to select from dropdown menus when creating or editing a tour.

#### Acceptance Criteria

1.  A `languages` table is created in the Supabase database.
2.  The `languages` table is populated with an initial, predefined list of languages (e.g., 'English', 'Vietnamese', 'French', 'Japanese', 'Spanish').
3.  The `tours` table schema includes a `timezone` text field that will store a valid IANA Time Zone Name.
4.  The application has access to a predefined list of common IANA Time Zones to populate the "Tour Time Zone" dropdown.
5.  The language and time zone lists are accessible by the application for use in the tour creation form. 