# Epic 3 Tourist Tour Discovery & Viewing MVP

Enable prospective and registered Tourists to browse all published tours, browse tours by specific predefined categories, perform simple searches (e.g., by keyword), filter tours by category, and view detailed tour pages. These pages will display comprehensive tour information (including its category), the "Guide's Story", and the Tour Guide's basic profile.

### Story 3.1 Public Tour Listings Page (Browse All Tours)

As a Visitor, I want to view a gallery of all published tours on a main listings page, so I can browse the available experiences.

#### Acceptance Criteria

* 1: A public page `/tours` exists that displays all "Published" tours.
* 2: Each tour is displayed as a card with a primary image, title, price, and duration.
* 3: Clicking a tour card navigates to the detailed tour page.
* 4: The page prominently displays links or a section to browse by predefined categories.

### Story 3.2 Simple Keyword Search & Category Filter for Tours

**As a** Visitor, **I want to** use a simple keyword search and filters for category and language on the tour listings page, **so that** I can quickly find tours relevant to my interests.

#### Acceptance Criteria
1.  The tour listings page includes a keyword search input field.
2.  The page also includes filter options (e.g., dropdowns) to select a single tour **category** and a single **language**.
3.  The list of tours updates to show only results that match the keyword and/or selected filters.
4.  A clear way to reset filters and view all tours again is provided.

### Story 3.3 Detailed Tour Page Viewing

**As a** Visitor, **I want to** view a detailed page for each tour, **so that** I can get all the information needed—including its languages and available times—to make a booking decision.

#### Acceptance Criteria
1.  Each tour has a unique, shareable URL.
2.  The page displays all tour details: title, description, images, duration, price, category, and the "Guide's Story".
3.  The page must clearly display a list of all **Languages** the tour is conducted in (e.g., "Conducted in: English, French").
4.  The page must clearly display the list of available **Time Slots** for the tour, labeled with the tour's local time zone.

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