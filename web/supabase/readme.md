# How to run the migration SQL and how to use the database in your Next.js application.

## Step 1: Set up Supabase locally (if not already done)

First, you'll need to make sure you have Supabase CLI installed:

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Log in to Supabase (if not already logged in):
```bash
supabase login
```

## Step 2: Initialize Supabase in your project

If you haven't already initialized Supabase in your project:

```bash
cd web
supabase init
```

## Step 3: Link your project to Supabase

Link your local project to your Supabase project:

```bash
supabase link --project-ref your-project-reference
```

Replace `your-project-reference` with your actual Supabase project reference ID, which you can find in the Supabase dashboard.

## Step 4: Run the migration

To apply the migration to your Supabase project:

```bash
supabase db push
```

This will push all migrations in your `supabase/migrations` directory to your Supabase project.

## Step 5: Verify the migration

1. Go to the Supabase dashboard (https://app.supabase.com)
2. Select your project
3. Go to the "Table Editor" section
4. Check that all tables have been created correctly in the `app` schema
5. You can also run SQL queries in the SQL Editor to verify the tables:

```sql
SELECT * FROM app.profiles;
SELECT * FROM app.categories;
SELECT * FROM app.languages;
-- etc.
```

## Step 6: Using the database in your Next.js application

You've already created the necessary files to interact with the database. Here's how to use them:

### 1. Set up environment variables

Make sure your `.env.local` file contains the Supabase URL and anon key:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 2. Using the database helper functions

You can now use the helper functions you've created in `web/src/lib/database.ts` to interact with your database:

#### Example: Getting all categories

```tsx
import { getAllCategories } from '@/lib/database';

// In a React component or server action
const categories = await getAllCategories();
console.log(categories);
```

#### Example: Getting a user profile

```tsx
import { getProfile } from '@/lib/database';

// In a React component or server action
const profile = await getProfile('user-id-here');
console.log(profile);
```

### 3. Creating new records

Here's how to create new records in your database:

#### Example: Creating a new tour

```tsx
import { supabase } from '@/lib/supabase';
import type { Tour } from '@/types/database.types';

async function createTour(tourData: Omit<Tour, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('tours')
    .insert(tourData)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating tour:', error);
    throw error;
  }
  
  return data as Tour;
}
```

### 4. Updating records

Example of updating a tour:

```tsx
import { supabase } from '@/lib/supabase';

async function updateTour(id: string, updateData: Partial<Tour>) {
  const { data, error } = await supabase
    .from('tours')
    .update({ ...updateData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating tour:', error);
    throw error;
  }
  
  return data as Tour;
}
```

### 5. Deleting records

Example of deleting a tour:

```tsx
import { supabase } from '@/lib/supabase';

async function deleteTour(id: string) {
  const { error } = await supabase
    .from('tours')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting tour:', error);
    throw error;
  }
  
  return true;
}
```

## Step 7: Working with relationships

Your schema includes relationships between tables. Here's how to work with them:

### Example: Getting a tour with its category and guide

```tsx
import { supabase } from '@/lib/supabase';

async function getTourWithDetails(tourId: string) {
  const { data, error } = await supabase
    .from('tours')
    .select(`
      *,
      category:category_id(*),
      guide:guide_id(*)
    `)
    .eq('id', tourId)
    .single();
  
  if (error) {
    console.error('Error fetching tour with details:', error);
    throw error;
  }
  
  return data;
}
```

### Example: Getting a tour with its languages

You've already implemented this in your `getTourLanguages` function, but here's how to use it:

```tsx
import { getTour, getTourLanguages } from '@/lib/database';

async function getTourWithLanguages(tourId: string) {
  const [tour, languages] = await Promise.all([
    getTour(tourId),
    getTourLanguages(tourId)
  ]);
  
  return { ...tour, languages };
}
```

## Step 8: Authentication and Row Level Security

Your migration includes Row Level Security policies. Here's how to work with authenticated users:

```tsx
import { supabase } from '@/lib/supabase';

// Sign up a new user
async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  
  if (error) {
    console.error('Error signing up:', error);
    throw error;
  }
  
  return data;
}

// Sign in a user
async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    console.error('Error signing in:', error);
    throw error;
  }
  
  return data;
}

// Sign out
async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

// Get the current user
async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error getting user:', error);
    return null;
  }
  
  return data.user;
}
```

After a user signs up, you'll need to create a profile for them:

```tsx
import { supabase } from '@/lib/supabase';
import type { UserRole } from '@/types/database.types';

async function createUserProfile(userId: string, role: UserRole, name: string) {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      role,
      name
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
  
  return data;
}
```

This should give you a solid foundation for working with your database. Let me know if you need any clarification or have questions about specific aspects of the database implementation!