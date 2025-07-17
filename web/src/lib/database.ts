import { supabase } from './supabase';
import type { 
  Profile, 
  Category, 
  Language, 
  Tour, 
  TourLanguage, 
  TourTimeSlot, 
  Booking, 
  TourAvailability 
} from '@/types/database.types';

// Profiles
export const profilesTable = () => supabase.from('profiles');

export const getProfile = async (id: string): Promise<Profile | null> => {
  const { data, error } = await profilesTable()
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return data as Profile;
};

// Categories
export const categoriesTable = () => supabase.from('categories');

export const getAllCategories = async (): Promise<Category[]> => {
  const { data, error } = await categoriesTable().select('*');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data as Category[];
};

// Languages
export const languagesTable = () => supabase.from('languages');

export const getAllLanguages = async (): Promise<Language[]> => {
  const { data, error } = await languagesTable().select('*');
  
  if (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
  
  return data as Language[];
};

// Tours
export const toursTable = () => supabase.from('tours');

export const getTour = async (id: string): Promise<Tour | null> => {
  const { data, error } = await toursTable()
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching tour:', error);
    return null;
  }
  
  return data as Tour;
};

export const getToursByGuide = async (guideId: string): Promise<Tour[]> => {
  const { data, error } = await toursTable()
    .select('*')
    .eq('guide_id', guideId);
  
  if (error) {
    console.error('Error fetching tours by guide:', error);
    return [];
  }
  
  return data as Tour[];
};

export const getPublishedTours = async (): Promise<Tour[]> => {
  const { data, error } = await toursTable()
    .select('*')
    .eq('status', 'published');
  
  if (error) {
    console.error('Error fetching published tours:', error);
    return [];
  }
  
  return data as Tour[];
};

// Tour Languages
export const tourLanguagesTable = () => supabase.from('tour_languages');

export const getTourLanguages = async (tourId: string): Promise<Language[]> => {
  // First, get the language IDs for the tour
  const { data: tourLanguages, error: tourLanguagesError } = await tourLanguagesTable()
    .select('language_id')
    .eq('tour_id', tourId);
  
  if (tourLanguagesError || !tourLanguages.length) {
    console.error('Error fetching tour language IDs:', tourLanguagesError);
    return [];
  }
  
  // Then, get the language details
  const languageIds = tourLanguages.map(tl => tl.language_id);
  const { data: languages, error: languagesError } = await languagesTable()
    .select('*')
    .in('id', languageIds);
  
  if (languagesError) {
    console.error('Error fetching languages:', languagesError);
    return [];
  }
  
  return languages as Language[];
};

// Tour Time Slots
export const tourTimeSlotsTable = () => supabase.from('tour_time_slots');

export const getTourTimeSlots = async (tourId: string): Promise<TourTimeSlot[]> => {
  const { data, error } = await tourTimeSlotsTable()
    .select('*')
    .eq('tour_id', tourId);
  
  if (error) {
    console.error('Error fetching tour time slots:', error);
    return [];
  }
  
  return data as TourTimeSlot[];
};

// Bookings
export const bookingsTable = () => supabase.from('bookings');

export const getBooking = async (id: string): Promise<Booking | null> => {
  const { data, error } = await bookingsTable()
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching booking:', error);
    return null;
  }
  
  return data as Booking;
};

export const getBookingsByTourist = async (touristId: string): Promise<Booking[]> => {
  const { data, error } = await bookingsTable()
    .select('*')
    .eq('tourist_id', touristId);
  
  if (error) {
    console.error('Error fetching bookings by tourist:', error);
    return [];
  }
  
  return data as Booking[];
};

export const getBookingsByTour = async (tourId: string): Promise<Booking[]> => {
  const { data, error } = await bookingsTable()
    .select('*')
    .eq('tour_id', tourId);
  
  if (error) {
    console.error('Error fetching bookings by tour:', error);
    return [];
  }
  
  return data as Booking[];
};

// Tour Availabilities
export const tourAvailabilitiesTable = () => supabase.from('tour_availabilities');

export const getTourUnavailableDates = async (tourId: string): Promise<TourAvailability[]> => {
  const { data, error } = await tourAvailabilitiesTable()
    .select('*')
    .eq('tour_id', tourId);
  
  if (error) {
    console.error('Error fetching tour unavailable dates:', error);
    return [];
  }
  
  return data as TourAvailability[];
}; 