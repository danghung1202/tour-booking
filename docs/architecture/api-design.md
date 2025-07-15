# API Design and Endpoints

This section defines the RESTful API endpoints that will be implemented as Next.js API routes. These endpoints serve as the backend-for-frontend (BFF), handling communication between the client application and the Supabase backend.

**Base Path:** `/api`

### API General Principles

*   **Authentication:** Endpoints requiring authentication must be protected. The user's session (JWT) will be verified on the server side for all protected routes.
*   **Error Handling:** APIs will return standard HTTP status codes. Error responses will have a consistent JSON format: `{ "error": { "message": "Human-readable error message" } }`.
*   **Data Validation:** All incoming data (request bodies, query params) will be rigorously validated on the server side before being processed or sent to the database.

### Endpoints

#### **Tours**

*   **`GET /api/tours`**:
    *   **Description:** Retrieves a list of all published tours. Supports filtering by category and searching by keyword.
    *   **Auth:** Public.
    *   **Query Params:**
        *   `category?: string` - The ID of the category to filter by.
        *   `search?: string` - A search term to match against tour titles and descriptions.
    *   **Success Response:** `200 OK` with `{ data: Tour[] }`.
*   **`GET /api/tours/[id]`**:
    *   **Description:** Retrieves a single tour by its ID.
    *   **Auth:** Public.
    *   **Success Response:** `200 OK` with `{ data: Tour }`.

#### **Bookings**

*   **`POST /api/bookings`**:
    *   **Description:** Creates a new booking for a tour.
    *   **Auth:** Public (for guest bookings) but can also be used by authenticated tourists.
    *   **Request Body:**
        ```json
        {
          "tour_id": "uuid",
          "booking_datetime": "iso_string",
          "num_adults": "integer",
          "num_kids": "integer",
          "guest_email": "string",
          "phone": "string",
          "comments": "string"
        }
        ```
    *   **Success Response:** `201 Created` with `{ data: Booking }`.
*   **`POST /api/bookings/[id]/cancel`**:
    *   **Description:** Cancels a booking. Can be accessed by the booking owner or a guide.
    *   **Auth:** Protected (must be booking owner or guide of the tour).
    *   **Success Response:** `200 OK` with `{ data: Booking }`.

#### **Guide Dashboard** (All routes require 'guide' role)

*   **`GET /api/guide/tours`**:
    *   **Description:** Retrieves all tours created by the currently authenticated guide.
    *   **Auth:** Protected (Guide role).
    *   **Success Response:** `200 OK` with `{ data: Tour[] }`.
*   **`POST /api/guide/tours`**:
    *   **Description:** Creates a new tour for the authenticated guide.
    *   **Auth:** Protected (Guide role).
    *   **Request Body:** `Tour` object data.
    *   **Success Response:** `201 Created` with `{ data: Tour }`.
*   **`PUT /api/guide/tours/[id]`**:
    *   **Description:** Updates an existing tour owned by the authenticated guide.
    *   **Auth:** Protected (Guide role).
    *   **Request Body:** Partial `Tour` object data.
    *   **Success Response:** `200 OK` with `{ data: Tour }`.

#### **Admin Dashboard** (All routes require 'admin' role)

*   **`GET /api/admin/users`**:
    *   **Description:** Retrieves a list of all users.
    *   **Auth:** Protected (Admin role).
    *   **Success Response:** `200 OK` with `{ data: Profile[] }`.
*   **`PUT /api/admin/users/[id]`**:
    *   **Description:** Updates a user's profile (e.g., change role, deactivate).
    *   **Auth:** Protected (Admin role).
    *   **Success Response:** `200 OK` with `{ data: Profile }`. 