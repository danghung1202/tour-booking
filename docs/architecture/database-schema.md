# Database Schema

This section provides the definitive SQL `CREATE TABLE` statements for setting up the PostgreSQL database in Supabase. This schema is the ground truth for all database structures.

```sql
-- Profiles Table
-- Stores public-facing user information and links to Supabase auth.
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  role TEXT NOT NULL CHECK (role IN ('tourist', 'guide', 'admin')),
  name TEXT,
  bio TEXT,
  photo_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categories Table
-- Stores the predefined list of tour categories.
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Languages Table
-- Stores the predefined list of languages for tours.
CREATE TABLE languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE, -- ISO 639-1 code
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tours Table
-- The central table for tour listings.
CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id UUID NOT NULL REFERENCES profiles(id),
  category_id UUID NOT NULL REFERENCES categories(id),
  organization_id UUID, -- For future use
  title TEXT NOT NULL,
  description TEXT,
  story_html TEXT,
  price NUMERIC(10, 2) NOT NULL,
  duration TEXT,
  location TEXT,
  timezone TEXT,
  capacity INT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  images JSONB,
  general_availability_info TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tour Languages Junction Table
-- Links tours to the languages they are offered in.
CREATE TABLE tour_languages (
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  language_id UUID NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
  PRIMARY KEY (tour_id, language_id)
);

-- Bookings Table
-- Stores all booking information.
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID NOT NULL REFERENCES tours(id),
  tourist_id UUID REFERENCES profiles(id), -- Nullable for guest bookings
  assigned_guide_user_id UUID, -- For future use
  booking_datetime TIMESTAMPTZ NOT NULL,
  num_adults INT NOT NULL,
  num_kids INT,
  guest_email TEXT, -- Used if tourist_id is NULL
  phone TEXT,
  comments TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled_by_guide', 'cancelled_by_guest')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tour Availability Table
-- Stores dates when a tour is explicitly unavailable.
CREATE TABLE tour_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  unavailable_date DATE NOT NULL,
  UNIQUE(tour_id, unavailable_date)
);

-- Tour Time Slots Table
-- Stores the available start times for a tour on any given day.
CREATE TABLE tour_time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  start_time TIME NOT NULL,
  UNIQUE(tour_id, start_time)
);
``` 