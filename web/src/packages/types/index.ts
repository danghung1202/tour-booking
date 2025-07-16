export interface Category {
  id: string
  slug?: string
  name: string
  image?: string
  description?: string
  created_at: string
  updated_at?: string
}

// Shared Tour type definition
export interface Tour {
  id: string
  title: string
  description: string
  price: number
  location: string
  duration: string
  maxParticipants: number
  images: string[]
  category: string
  category_id: string
  rating?: number
  featured?: boolean
  story_html?: string
  general_availability_info: string
  languages: string[] // New field for supported languages
  time_zone: string // New field for tour time zone
  available_time_slots: string[] // New field for available start times
  createdAt: Date
  updatedAt: Date
}

// Booking related types
export interface BookingRequest {
  booking_date: string // YYYY-MM-DD
  guest_name: string
  guest_email: string
  phone: string
  num_adults: number
  num_kids: number
}

// User Profile type
export interface Profile {
  id: string // UUID
  role: "tourist" | "guide" | "admin"
  name: string
  bio?: string
  phone?: string
  photo_url?: string
  created_at: string // ISO 8601
  updated_at: string
}

// Authentication types
export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: User
  session: {
    access_token: string
    refresh_token: string
    expires_at: number
  }
}

// Tour Guide type
export interface TourGuide {
  id: string
  name: string
  bio: string
  imageUrl: string
  specialties: string[]
  rating: number
}
