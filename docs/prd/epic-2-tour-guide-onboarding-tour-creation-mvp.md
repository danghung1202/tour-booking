# Epic 2 Tour Guide Onboarding & Tour Creation MVP

Enable authenticated Tour Guides to complete their profile (name, photo, bio) and to create, edit, and publish detailed tour listings. Listings must include title, description, price, location, duration, images, capacity, assignment to a predefined category, and the "Guide's Story" using a rich-text editor. This delivers the core supply-side functionality for the platform.

### Story 2.1 Tour Guide Profile Completion & Management

As an authenticated Tour Guide, I want to complete and update my public profile (name, photo, bio), so that tourists can learn more about me.

#### Acceptance Criteria

* 1: A "Manage Profile" page is available to users with the 'guide' role.
* 2: The guide can input/update their name, a short biography, and upload a profile photo.
* 3: The uploaded photo is stored securely using Supabase Storage.
* 4: The updated information is saved to the guide's record in the `profiles` table.

### Story 2.2 Initiate New Tour Listing & Define Core Details

**As a** Tour Guide, **I want to** start creating a new tour by providing its essential details, including title, description, price, location, images, category, languages, timezone, and available time slots, **so that** the fundamental aspects of my tour are fully captured and classified for tourists to view.

#### Acceptance Criteria
1.  A "Create Tour" form is available to guides.
2.  The form includes fields for all core details (title, description, price, etc.).
3.  The form includes a mandatory dropdown to select **one category** from the predefined list.
4.  The form includes a mandatory multi-select input (e.g., checkboxes) for the guide to select all **languages** the tour is offered in.
5.  The form includes a mandatory dropdown for the guide to select the tour's primary **time zone**.
6.  The form includes an interface for the guide to add, edit, and remove multiple available **time slots** (e.g., '09:00', '13:00').
7.  The selected category, languages, timezone, and time slots are saved and associated with the tour record in the database.

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