# Admin User Creation Guide

## Overview

This document outlines the one-time process to create the initial admin user for the Tour Booking platform. **This is a manual, one-time setup process** and not intended for ongoing admin creation.

## Prerequisites

- Access to the Supabase dashboard for the project
- A registered user account in the application (this will be promoted to admin)

## Step-by-Step Instructions

### 1. Register a Normal User Account

First, create a standard user account through the application's registration page:

1. Navigate to the registration page of the Tour Booking application
2. Complete the registration form with the details for your admin account
3. Submit the form and verify your email if required

### 2. Identify the User ID

Next, you need to find the user's email or ID in the Supabase dashboard:

1. Log in to your Supabase dashboard
2. Navigate to "Authentication" > "Users"
3. Find the user you just created in the list
4. Note either:
   - The user's email address
   - The user's UUID (a string like `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### 3. Update the SQL Migration File

1. Open the SQL migration file at: `/web/supabase/migrations/20250719_admin_user_creation.sql`
2. Find the placeholder value `USER_EMAIL_HERE`
3. Replace it with the actual email of the user you want to promote to admin
   - Alternatively, if you prefer to use the UUID, uncomment the second method and replace `USER_UUID_HERE` with the actual UUID

Example:
```sql
-- Using email (recommended)
UPDATE app.profiles
SET role = 'admin'
WHERE id = (
  SELECT id 
  FROM auth.users 
  WHERE email = 'admin@yourdomain.com'
);

-- Or using UUID
-- UPDATE app.profiles
-- SET role = 'admin'
-- WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
```

### 4. Run the Migration

To execute the SQL migration:

1. Use the Supabase CLI command:
   ```bash
   supabase db push --db-url=YOUR_DATABASE_URL
   ```
   
   Or run the migration through the Supabase dashboard:
   
2. Navigate to the SQL Editor in your Supabase dashboard
3. Paste the content of the modified migration file
4. Click "Run" to execute the query

### 5. Verify Admin Status

To confirm the user now has admin privileges:

1. In the Supabase dashboard, navigate to "Database" > "Table editor"
2. Select the "app" schema and "profiles" table
3. Find your user and verify that the "role" column shows "admin"

## Security Notice

**IMPORTANT:** This process grants full administrative privileges to the specified user. This user will have access to sensitive information and powerful functionality within your application. Ensure this is only done for trusted individuals who require this level of access.

## Support

If you encounter any issues during this process, please contact the development team for assistance.

---

**Note:** This is a one-time setup process for initial platform administration. Additional admin users should be created through the admin interface once the application is fully developed. 