export type UserRole = 'tourist' | 'guide' | 'admin';

export type TourStatus = 'draft' | 'published';

export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled';

export interface Profile {
  id: string; // UUID
  role: UserRole;
  name: string | null;
  bio: string | null;
  phone: string | null;
  photo_url: string | null;
  created_at: string; // ISO 8601 timestamp
  updated_at: string | null; // ISO 8601 timestamp
}

export interface Category {
  id: string; // UUID
  name: string;
  description: string | null;
  image: string | null;
  created_at: string; // ISO 8601 timestamp
}

export interface Language {
  id: string; // UUID
  name: string;
  code: string;
  created_at: string; // ISO 8601 timestamp
}

export interface TourImage {
  url: string;
  caption?: string;
}

export interface Tour {
  id: string; // UUID
  guide_id: string; // UUID
  category_id: string; // UUID
  timezone: string;
  organization_id: string | null; // UUID
  title: string;
  description: string | null;
  story_html: string | null;
  price: number;
  duration: string | null;
  location: string | null;
  capacity: number;
  status: TourStatus;
  images: TourImage[] | null;
  general_availability_info: string | null;
  created_at: string; // ISO 8601 timestamp
  updated_at: string | null; // ISO 8601 timestamp
}

export interface TourLanguage {
  tour_id: string; // UUID
  language_id: string; // UUID
}

export interface TourTimeSlot {
  id: string; // UUID
  tour_id: string; // UUID
  start_time: string; // Time in 'HH:MM:SS' format
  created_at: string; // ISO 8601 timestamp
}

export interface Booking {
  id: string; // UUID
  tour_id: string; // UUID
  tourist_id: string | null; // UUID
  assigned_guide_user_id: string | null; // UUID
  guest_name: string | null;
  guest_email: string | null;
  phone: string | null;
  num_adults: number;
  num_kids: number;
  booking_datetime: string; // ISO 8601 timestamp
  status: BookingStatus;
  created_at: string; // ISO 8601 timestamp
  updated_at: string | null; // ISO 8601 timestamp
}

export interface TourAvailability {
  id: string; // UUID
  tour_id: string; // UUID
  unavailable_date: string; // ISO 8601 date
  created_at: string; // ISO 8601 timestamp
}

// Future Organization types
export interface Organization {
  id: string; // UUID
  name: string;
  description: string | null;
  logo_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website: string | null;
  address: string | null;
  created_at: string; // ISO 8601 timestamp
  updated_at: string | null; // ISO 8601 timestamp
}

export type OrganizationMemberRole = 'owner' | 'admin' | 'guide';

export interface OrganizationMember {
  id: string; // UUID
  organization_id: string; // UUID
  profile_id: string; // UUID
  role: OrganizationMemberRole;
  created_at: string; // ISO 8601 timestamp
  updated_at: string | null; // ISO 8601 timestamp
} 