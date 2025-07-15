# Database Schema

This section provides the definitive SQL `CREATE TABLE` statements for setting up the PostgreSQL database in Supabase. This schema is the ground truth for all database structures.

```sql
-- Profiles table to store public user data, linked to Supabase auth
CREATE TABLE public.profiles (
  id uuid NOT NULL PRIMARY KEY, -- Links to auth.users.id
  role text NOT NULL CHECK (role IN ('tourist', 'guide', 'admin')),
  name text,
  bio text,
  phone text,
  photo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
);
COMMENT ON TABLE public.profiles IS 'Stores public-facing profile information for each user.';

-- Categories for classifying tours
CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  image text,
  created_at timestamptz DEFAULT now()
);
COMMENT ON TABLE public.categories IS 'Predefined categories for tours (e.g., Culinary, Adventure).';

-- NEW TABLE: Stores the languages that tours can be conducted in.
CREATE TABLE public.languages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE, -- e.g., "English", "Vietnamese"
  code text NOT NULL UNIQUE,  -- e.g., "en", "vi"
  created_at timestamptz DEFAULT now()
);
COMMENT ON TABLE public.languages IS 'A canonical list of languages for tours.';

-- Tours table for all tour listings
CREATE TABLE public.tours (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
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
  CONSTRAINT tours_guide_id_fkey FOREIGN KEY (guide_id) REFERENCES public.profiles (id),
  CONSTRAINT tours_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories (id)
);
COMMENT ON TABLE public.tours IS 'The central table for all tour listings on the platform.';
CREATE INDEX ON public.tours (guide_id);
CREATE INDEX ON public.tours (category_id);
CREATE INDEX ON public.tours (status);

-- STEP 2: Create a new join table for the many-to-many relationship
CREATE TABLE public.tour_languages (
  tour_id uuid NOT NULL,
  language_id uuid NOT NULL,
  CONSTRAINT tour_languages_pkey PRIMARY KEY (tour_id, language_id), -- Ensures a language is only added once per tour
  CONSTRAINT tour_languages_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours (id) ON DELETE CASCADE,
  CONSTRAINT tour_languages_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.languages (id) ON DELETE CASCADE
);
COMMENT ON TABLE public.tour_languages IS 'Links tours to the multiple languages they are offered in.';

-- NEW TABLE: Stores the available appointment times for a specific tour.
CREATE TABLE public.tour_time_slots (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tour_id uuid NOT NULL,
  start_time time NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT tour_time_slots_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours (id) ON DELETE CASCADE,
  UNIQUE (tour_id, start_time)
);
COMMENT ON TABLE public.tour_time_slots IS 'Stores the available appointment times for a specific tour.';
CREATE INDEX ON public.tour_time_slots (tour_id);

-- Bookings made by tourists for tours
CREATE TABLE public.bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
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
  CONSTRAINT bookings_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours (id),
  CONSTRAINT bookings_tourist_id_fkey FOREIGN KEY (tourist_id) REFERENCES public.profiles (id),
  CONSTRAINT require_at_least_one_participant CHECK (num_adults + num_kids >= 1),
  CONSTRAINT booking_type_check CHECK (
    (tourist_id IS NOT NULL AND guest_email IS NULL AND guest_name IS NULL) OR 
    (tourist_id IS NULL AND guest_email IS NOT NULL)
  )
);
COMMENT ON TABLE public.bookings IS 'Represents a booking request made by a user for a tour.';
CREATE INDEX ON public.bookings (tour_id);
CREATE INDEX ON public.bookings (tourist_id);
CREATE INDEX ON public.bookings (status);

-- Stores dates when a tour is not available
CREATE TABLE public.tour_availabilities (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tour_id uuid NOT NULL,
  unavailable_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT tour_availabilities_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours (id) ON DELETE CASCADE,
  UNIQUE (tour_id, unavailable_date)
);
COMMENT ON TABLE public.tour_availabilities IS 'Stores specific dates that a guide has marked as unavailable for a tour.';
```