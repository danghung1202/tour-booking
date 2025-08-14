# Organization Structure Design

This document outlines the planned design for the Organization feature, which will be implemented in future iterations of the tour booking platform.

## Overview

The Organization feature will allow multiple guides to operate under a single entity (e.g., a tour company). This enables scenarios where:

1. A tour company can have multiple guides
2. Bookings can be assigned to different guides within the same organization
3. Organization administrators can manage tours, guides, and bookings

## Planned Database Tables

### Organizations

```sql
CREATE TABLE app.organizations (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  description text,
  logo_url text,
  contact_email text,
  contact_phone text,
  website text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);
```

### Organization Members

```sql
CREATE TABLE app.organization_members (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  organization_id uuid NOT NULL,
  profile_id uuid NOT NULL,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'guide')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  CONSTRAINT organization_members_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES app.organizations (id) ON DELETE CASCADE,
  CONSTRAINT organization_members_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES app.profiles (id) ON DELETE CASCADE,
  UNIQUE (organization_id, profile_id)
);
```

## Integration with Existing Schema

The current database schema already includes an `organization_id` field in the `tours` table, which will be used to link tours to organizations. When the Organization feature is implemented:

1. The `organization_id` field in the `tours` table will be populated for tours created by guides who are part of an organization.
2. The `assigned_guide_user_id` field in the `bookings` table will be used to assign bookings to specific guides within an organization.

## Planned Functionality

1. **Organization Management**
   - Create and manage organizations
   - Invite guides to join an organization
   - Assign roles to organization members

2. **Tour Management**
   - Create tours under an organization
   - Assign tours to specific guides
   - Share tour templates across the organization

3. **Booking Management**
   - View all bookings for the organization
   - Assign bookings to different guides
   - Handle guide availability and scheduling

4. **Analytics and Reporting**
   - View organization-wide analytics
   - Generate reports on tour and guide performance

## Security Considerations

Row Level Security (RLS) policies will be implemented to ensure:

1. Organization owners and admins can view and manage all resources related to their organization
2. Guides can only view and manage their own tours and bookings, unless given broader access
3. Tourists cannot access organization management features

## Implementation Timeline

The Organization feature is planned for post-MVP development and will be implemented in phases:

1. Basic organization structure and membership
2. Tour management within organizations
3. Booking assignment and management
4. Advanced features like analytics and reporting 