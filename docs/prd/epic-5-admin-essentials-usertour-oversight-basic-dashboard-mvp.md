# Epic 5 Admin Essentials - User/Tour Oversight & Basic Dashboard MVP

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

**As an** Admin, **I want to** view and manage all tour listings on the platform, including their languages and time slots, **so that** I can perform quality control and support guides.

#### Acceptance Criteria
1.  An admin interface lists all tours created on the platform.
2.  The Admin can edit any tour's details, including its assigned category.
3.  The Admin can view, edit, or remove the **languages** and defined **time slots** associated with any tour.
4.  The Admin can unpublish any tour if it violates platform policies. 