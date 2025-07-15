# Testing Strategy

This section outlines the approach to testing for the MVP, balancing the need for quality with the aggressive development timeline.

### Philosophy

The MVP testing strategy prioritizes validating critical user paths and core functionalities. The approach is pragmatic, focusing on manual and focused integration testing where it provides the most value.

### Testing Levels

1.  **Unit Testing:**
    *   **Scope:** Focused on individual React components and utility functions.
    *   **Tools:** Jest and React Testing Library (RTL).
    *   **Priority:** Medium. While important, comprehensive unit tests for all components are secondary to ensuring the main user flows work correctly. We will focus on testing complex UI components or business logic functions.

2.  **Integration Testing:**
    *   **Scope:** Testing the interaction between major parts of the application, primarily between the Next.js frontend and the Next.js API routes, and between the API routes and Supabase.
    *   **Tools:** Jest for testing API routes. Manual testing for frontend-to-backend integration.
    *   **Priority:** High. We must ensure the data contracts between the client and server are solid and that core operations like creating a booking or a tour work end-to-end from a data perspective.

3.  **End-to-End (E2E) Testing:**
    *   **Scope:** Testing complete user flows in a browser-like environment.
    *   **Tools:** N/A for MVP.
    *   **Priority:** Out of scope for MVP. This will be a key focus post-launch.

### Manual Testing

*   **Approach:** Structured manual testing will be the primary method for QA. A test plan with concise test cases will be created to cover the critical paths.
*   **Critical Paths to Test:**
    1.  **Tourist Flow:** Tour discovery -> View Details -> Booking -> Receive Confirmation -> Cancel Booking.
    2.  **Guide Flow:** Registration -> Profile Completion -> Create Tour -> View Bookings -> Confirm/Reject Booking.
    3.  **Admin Flow:** Login -> View Users -> View Tours -> View Bookings. 