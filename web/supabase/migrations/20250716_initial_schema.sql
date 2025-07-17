-- Create a new schema for our application
CREATE SCHEMA IF NOT EXISTS app;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a custom enum type for user roles
CREATE TYPE app.user_role AS ENUM ('tourist', 'guide', 'admin');

-- Profiles table to store public user data, linked to Supabase auth
CREATE TABLE app.profiles (
  id uuid NOT NULL PRIMARY KEY, -- Links to auth.users.id
  role app.user_role NOT NULL,
  name text,
  bio text,
  phone text,
  photo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
);
COMMENT ON TABLE app.profiles IS 'Stores public-facing profile information for each user.';

-- Categories for classifying tours
CREATE TABLE app.categories (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  image text,
  created_at timestamptz DEFAULT now()
);
COMMENT ON TABLE app.categories IS 'Predefined categories for tours (e.g., Culinary, Adventure).';

-- Languages that tours can be conducted in
CREATE TABLE app.languages (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL UNIQUE, -- e.g., "English", "Vietnamese"
  code text NOT NULL UNIQUE,  -- e.g., "en", "vi"
  created_at timestamptz DEFAULT now()
);
COMMENT ON TABLE app.languages IS 'A canonical list of languages for tours.';

-- Tours table for all tour listings
CREATE TABLE app.tours (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  guide_id uuid NOT NULL,
  category_id uuid NOT NULL, 
  timezone text NOT NULL, 
  organization_id uuid, -- For future use
  title text NOT NULL,
  description text,
  story_html text,
  price numeric(10, 2) NOT NULL DEFAULT 0,
  duration text,
  location text,
  capacity integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  images jsonb,
  general_availability_info text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  CONSTRAINT tours_guide_id_fkey FOREIGN KEY (guide_id) REFERENCES app.profiles (id),
  CONSTRAINT tours_category_id_fkey FOREIGN KEY (category_id) REFERENCES app.categories (id)
);
COMMENT ON TABLE app.tours IS 'The central table for all tour listings on the platform.';
CREATE INDEX ON app.tours (guide_id);
CREATE INDEX ON app.tours (category_id);
CREATE INDEX ON app.tours (status);

-- Join table for the many-to-many relationship between tours and languages
CREATE TABLE app.tour_languages (
  tour_id uuid NOT NULL,
  language_id uuid NOT NULL,
  CONSTRAINT tour_languages_pkey PRIMARY KEY (tour_id, language_id), -- Ensures a language is only added once per tour
  CONSTRAINT tour_languages_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES app.tours (id) ON DELETE CASCADE,
  CONSTRAINT tour_languages_language_id_fkey FOREIGN KEY (language_id) REFERENCES app.languages (id) ON DELETE CASCADE
);
COMMENT ON TABLE app.tour_languages IS 'Links tours to the multiple languages they are offered in.';

-- Available appointment times for a specific tour
CREATE TABLE app.tour_time_slots (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  tour_id uuid NOT NULL,
  start_time time NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT tour_time_slots_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES app.tours (id) ON DELETE CASCADE,
  UNIQUE (tour_id, start_time)
);
COMMENT ON TABLE app.tour_time_slots IS 'Stores the available appointment times for a specific tour.';
CREATE INDEX ON app.tour_time_slots (tour_id);

-- Bookings made by tourists for tours
CREATE TABLE app.bookings (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  tour_id uuid NOT NULL,
  tourist_id uuid, -- Nullable for guest bookings
  assigned_guide_user_id uuid, -- For future use
  guest_name text,
  guest_email text,
  phone text,
  num_adults integer NOT NULL DEFAULT 1,
  num_kids integer NOT NULL DEFAULT 0,
  booking_datetime timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  CONSTRAINT bookings_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES app.tours (id),
  CONSTRAINT bookings_tourist_id_fkey FOREIGN KEY (tourist_id) REFERENCES app.profiles (id),
  CONSTRAINT require_at_least_one_participant CHECK (num_adults + num_kids >= 1),
  CONSTRAINT booking_type_check CHECK (
    (tourist_id IS NOT NULL AND guest_email IS NULL AND guest_name IS NULL) OR 
    (tourist_id IS NULL AND guest_email IS NOT NULL)
  )
);
COMMENT ON TABLE app.bookings IS 'Represents a booking request made by a user for a tour.';
CREATE INDEX ON app.bookings (tour_id);
CREATE INDEX ON app.bookings (tourist_id);
CREATE INDEX ON app.bookings (status);

-- Stores dates when a tour is not available
CREATE TABLE app.tour_availabilities (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  tour_id uuid NOT NULL,
  unavailable_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT tour_availabilities_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES app.tours (id) ON DELETE CASCADE,
  UNIQUE (tour_id, unavailable_date)
);
COMMENT ON TABLE app.tour_availabilities IS 'Stores specific dates that a guide has marked as unavailable for a tour.';

-- Row Level Security (RLS) setup
-- By default, deny all access
ALTER TABLE app.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.tour_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.tour_time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.tour_availabilities ENABLE ROW LEVEL SECURITY;

-- Create basic policies (these will be refined in later stories)
-- Profiles: Users can read all profiles, but only update their own
CREATE POLICY "Profiles are viewable by everyone" ON app.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON app.profiles FOR UPDATE USING (auth.uid() = id);

-- Categories and Languages: Readable by everyone, writable by admins
CREATE POLICY "Categories are viewable by everyone" ON app.categories FOR SELECT USING (true);
CREATE POLICY "Languages are viewable by everyone" ON app.languages FOR SELECT USING (true);

-- Tours: Readable by everyone if published, writable by the guide who created them
CREATE POLICY "Published tours are viewable by everyone" ON app.tours FOR SELECT USING (status = 'published');
CREATE POLICY "Guides can view their own tours" ON app.tours FOR SELECT USING (auth.uid() = guide_id);
CREATE POLICY "Guides can update their own tours" ON app.tours FOR UPDATE USING (auth.uid() = guide_id);
CREATE POLICY "Guides can insert their own tours" ON app.tours FOR INSERT WITH CHECK (auth.uid() = guide_id);
CREATE POLICY "Guides can delete their own tours" ON app.tours FOR DELETE USING (auth.uid() = guide_id);

-- Bookings: Tourists can see their own bookings, guides can see bookings for their tours
CREATE POLICY "Tourists can view their own bookings" ON app.bookings FOR SELECT USING (auth.uid() = tourist_id);
CREATE POLICY "Guides can view bookings for their tours" ON app.bookings FOR SELECT USING (
  auth.uid() IN (SELECT guide_id FROM app.tours WHERE id = tour_id)
);

-- Future Organization structure documentation
COMMENT ON SCHEMA app IS 'Contains all application-specific tables for the tour booking platform. 

Future Organization Structure:
- Organizations table will be added to support tour companies with multiple guides
- OrganizationMembers table will link profiles to organizations with role information
- This will enable features like assigning different guides to bookings within an organization'; 