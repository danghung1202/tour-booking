# Project Brief: Unique Tours Platform

## Introduction / Problem Statement

The current tourism market is heavily populated by large booking platforms that often prioritize mainstream, high-volume tours. This makes it challenging for tourists to discover unique, offbeat, and authentic local experiences that go beyond standard itineraries. Simultaneously, many local tour guides who offer these specialized and personalized tours struggle to gain visibility and effectively manage bookings through platforms that are not tailored to their niche offerings.

Unique Tours Platform aims to address this gap by providing a dedicated online marketplace that connects discerning tourists with local guides offering unique and unconventional tour experiences. The platform will provide tools for guides to easily create, promote, and manage their specialized tours, including features that allow them to share rich narratives and highlight the distinctiveness of their offerings. For tourists, it will serve as a trusted source for finding and booking memorable, off-the-beaten-path adventures that are not easily accessible through mainstream channels. This project is needed to bridge the gap between providers of unique tours and travelers seeking more authentic and personalized experiences.

## Vision & Goals

-   **Vision:** To be the leading online platform for discovering and booking unique, authentic, and offbeat tour experiences worldwide, empowering local guides and organizations to share their passions and enabling travelers to create unforgettable memories beyond the mainstream.
-   **Primary Goals (MVP):**
    1.  **Launch Core Platform (Individual Guide Focus):** Successfully develop and deploy the "Unique Tours Platform" MVP with core functionalities for Tourists (browse, book, contact guides), **individual** Tour Guides (create/manage tours and availability, manage bookings, "Guide's Story"), and Admin (user/tour management, simple dashboard) within the 1-week development timeframe (aiming for launch by **June 4, 2025**). The underlying database schema will be designed for future extensibility to support Organization accounts.
    2.  **Enable Initial Tour Listings:** Onboard at least 5-10 **individual** tour guides who collectively list a minimum of 10-15 unique, offbeat tours on the platform within the first week of its operational launch.
    3.  **Facilitate Early Bookings:** Achieve at least 5-10 successful tour bookings (for individual guide tours) through the platform within the first two weeks following the operational launch, validating the core booking funnel.
    4.  **Gather User Feedback:** Collect initial feedback from at least 3-5 early adopter tour guides and 5-10 early adopter tourists (via simple surveys or direct contact) within one month of launch to identify key pain points and priority improvements for post-MVP development, including validation for Organization features.
-   **Success Metrics (Initial Ideas):**
    * **Platform Adoption:**
        * Number of registered **individual** Tour Guides.
        * Number of unique tours published on the platform.
        * Number of registered Tourists.
    * **Engagement & Usage:**
        * Number of tour bookings processed.
        * Number of pre-booking questions submitted by tourists.
        * Average number of tours viewed per tourist session.
    * **User Satisfaction (Post-Launch Phase):**
        * Qualitative feedback scores from initial surveys.
        * Completion rate of the core booking funnel.
    * **Technical Performance:**
        * Platform uptime and availability of core features (target 99%+).

## Target Audience / Users

The platform will serve three primary user groups for MVP, with a fourth (Organizations) planned for Post-MVP:

1.  **Tourists ("Explorers"):** (Description as previously defined)
2.  **Individual Tour Guides ("Storytellers" / "Local Experts"):** (Description as previously defined, emphasizing individual operation for MVP)
3.  **Admin (Platform Operations):** (Description as previously defined)
    * *(Post-MVP, a new user sub-type or role for "Organization Managers" and "Organization Member Guides" will be introduced).*

## Key Features / Scope (High-Level Ideas for MVP)

*(Focus remains on individual guide functionality for the 1-week MVP build. Database will be designed for future Organization extensibility as noted in "Initial Architectural Preferences")*

**For Tourists ("Explorers"):** (Features as previously defined)
* **Tour Discovery**
* **Tour Details Viewing**
* **Booking & Communication**

**For Individual Tour Guides ("Storytellers"):** (Features as previously defined)
* **Account & Profile Management**
* **Tour Management** (Tours created are associated with the individual guide for MVP)
* **Availability & Booking Management**
* **Notifications**

**For Admin (Platform Operations):** (Features as previously defined)
* **User Oversight**
* **Tour Oversight**
* **Basic Platform Monitoring**

## Post MVP Features / Scope and Ideas

* **Organization Account & Management Functionality (High Priority):**
    * Allow approved Tour Guides to create and manage an "Organization" profile.
    * Functionality for Organization Managers to invite existing approved Tour Guides to become members of their Organization.
    * Ability for Organizations (via their Manager or designated members) to create, list, and manage tours under the Organization's banner.
    * Mechanism for Organization Managers to assign member guides to specific bookings for the Organization's tours.
    * Specific dashboard views and tools for Organization Managers.
* **Online Payments & Commission System** (As previously defined)
* **Reviews and Rating System** (As previously defined)
* **Advanced Search & Filtering for Tourists** (As previously defined)
* **Tourist User Accounts** (As previously defined)
* **Enhanced Tour Guide Tools** (As previously defined, considering both individual and org guides)
* **Expanded "Blog" / Content Features** (As previously defined)
* **Admin Panel Enhancements** (As previously defined)
* **External Platform Integrations** (As previously defined)
* **Mobile Applications** (As previously defined)
* **Multi-language Support** (As previously defined)

## Known Technical Constraints or Preferences

-   **Constraints:**
    * **Timeline:** Aggressive 1-week development sprint for the MVP (individual guide focus), aiming for launch around **June 4, 2025**.
    * **Budget (Hosting):** Initial monthly hosting costs $50-$100, scalable.
    * **Technology Stack Mandate:** Next.js (React), Node.js, Supabase (PostgreSQL).
    * **Compliance (Initial Focus for MVP):** Adherence to general data privacy best practices and initial considerations for Vietnam's Decree 13/2023/ND-CP on Personal Data Protection (PDPD).
-   **Initial Architectural Preferences (if any):**
    * **Overall Service Architecture (MVP):** Monolithic Next.js application with Supabase as BaaS.
    * **Repository Structure (MVP):** Single repository (monorepo).
    * **Database Design for Future Extensibility (Organization Model):**
        * The database schema will be designed from the outset to support future "Organization" functionality. This includes:
            * **`Organizations` Table (New):** To store organization details (e.g., `id`, `name`, `manager_user_id`).
            * **`OrganizationMembers` Table (New Junction Table):** To link `Users` (guides) to `Organizations` (e.g., `organization_id`, `user_id`).
            * **`Tours` Table (Modified):** To include a nullable `organization_id` (Foreign Key). If `NULL`, the tour belongs to an individual guide (MVP scenario). If populated, it belongs to an Organization.
            * **`Bookings` Table (Modified):** To include a nullable `assigned_guide_user_id` (Foreign Key). For Organization tours, this allows a manager to assign a specific member guide.
        * *Note: While the database schema will accommodate these relationships, the UI and application logic for creating and managing Organizations, inviting members, creating org-specific tours, and assigning guides to org bookings are **Post-MVP features**.*
-   **Risks:**
    * Aggressive MVP timeline.
    * Scope creep.
    * Reliance on AI coding assistance.
    * Market adoption for a new platform.
    * Clear differentiation of the "unique and offbeat" value proposition.
    * Initial hosting scalability if unexpectedly high traffic.
    * Technical debt from rapid development.
    * Ongoing regulatory compliance (e.g., Decree 13).
    * **Ensuring the MVP data model correctly anticipates future Organization needs without over-complicating the initial build or significantly impacting the MVP timeline.**
-   **User Preferences:** (As previously defined)
    * Visual inspiration from `atasteofhanoi.com`.
    * Strong niche focus on "unique, offbeat tours."
    * Future evolution of "Guide's Story" potentially integrating with a broader blog system.

## Relevant Research (Optional)
(As previously defined)

* **User Interface & Experience Inspiration**
* **Market Niche Identification**
* **Preliminary Compliance Review**

Further dedicated market and user research is recommended post-MVP.

## PM Prompt

This Project Brief provides the full context for **Unique Tours Platform**. Please start in 'PRD Generation Mode', review the brief thoroughly to work with the user to create the PRD section by section 1 at a time, asking for any necessary clarification or suggesting improvements as your mode 1 programming allows. For the MVP, focus PRD efforts on functionalities for individual Tour Guides and Tourists, while ensuring the underlying data model discussions incorporate the planned extensibility for Organization accounts as outlined in the "Initial Architectural Preferences" section.