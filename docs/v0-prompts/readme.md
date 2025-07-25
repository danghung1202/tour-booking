## How Gemini generate the v0 prompt

I'd be happy to explain the step-by-step process I used to create the prompt for the "Manage Availability" page and specify exactly where I sourced the information from.

My process involved two main phases: **Information Gathering & Synthesis** and **Structured Prompt Creation**.

### Phase 1: Information Gathering & Synthesis

My first step was to gather all clues about this feature from the documents you provided. I treated them as a single source of truth.

1.  **Identifying the Feature's Existence and Place:**
    * I knew the "Manage Availability" page was a required feature because it is explicitly listed in the sitemap within the `front-end-spec.md` document as part of the Guide Dashboard.

2.  **Understanding the Core Logic from the Data Model:**
    * The most critical piece of information came from the `fullstack-architecture.md` document. I examined the **Data Models** section and found the `TourAvailability` table.
    * This table's schema, with columns for `tour_id` and `unavailable_date`, told me that the system's logic is to store a list of specific dates when a tour is **unavailable**. This "blocklist" model is the foundation for the entire feature.

3.  **Designing the User Flow Based on the Data Model:**
    * Since the `TourAvailability` table requires a `tour_id`, I concluded that the user (the guide) must **first select which tour they want to manage**. This led to the requirement for a "Tour Selector Dropdown" on the page.
    * To populate that dropdown, I knew the page would need to fetch the guide's tours, using the `getMyTours()` function we conceptually defined in a previous step.
    * To manage dates, the most intuitive user interface is a **calendar**.
    * The action a user would take is toggling a date's status. Based on the data model, clicking an available date would **create** a `TourAvailability` record, and clicking an unavailable date would **delete** that record.

4.  **Inferring the Necessary API Endpoints:**
    * The `fullstack-architecture.md` did not explicitly define the API endpoints for this feature in its high-level OpenAPI spec.
    * Based on the user flow and the data model, I inferred the necessary RESTful API endpoints that would be required to support the frontend functionality:
        * `GET /api/v1/tours/{tourId}/availability` to fetch the list of blocked dates.
        * `POST /api/v1/tours/{tourId}/availability` to add a new blocked date.
        * `DELETE /api/v1/tours/{tourId}/availability` to remove a blocked date.
    * This inference is a standard part of my process when a specific detail is missing but can be logically derived from the overall architecture.

### Phase 2: Structured Prompt Creation

Once I had all the information and a clear plan, I assembled it into the self-contained, four-part prompt you saw.

1.  **High-Level Goal:** I wrote a concise summary of the objective I had formulated: "allow a guide to select one of their tours, view a calendar of its availability, and click on dates to toggle them...".
2.  **Detailed, Step-by-Step Instructions:** I translated the user flow I designed in Phase 1 into a clear, numbered list for the AI to follow (e.g., Implement Tour Selection, Implement Calendar Display, Implement Date Toggling).
3.  **Code Examples, Data Structures & Constraints:** This is where I embedded all the technical details I gathered and inferred. I explicitly listed the API endpoints and explained how they would work with the `TourAvailability` data model.
4.  **Define a Strict Scope:** Finally, I clearly listed the files to be created to ensure the AI's work was focused and did not cause unintended side effects.

In short, I started with the high-level requirement from the UI/UX spec, drilled down into the specific data model in the architecture document to understand the underlying logic, designed the user flow and API calls around that logic, and then assembled everything into a detailed, structured, and self-contained prompt.