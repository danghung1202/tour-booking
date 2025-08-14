import { commonTimezones, getFormattedTimezones, getUserTimezone } from '@/utils/timezones';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Interface for timezone data for form components
 */
export interface TimezoneOption {
  name: string;
  value: string;
}

export class TimezoneService {
  private supabase: SupabaseClient<any, "app", any>;

  constructor(supabaseClient: SupabaseClient<any, "app", any>) {
    this.supabase = supabaseClient;
  }

  /**
   * Get all available timezones for use in form select components
   * @returns Array of timezone options
   */
  getAllTimezones(): TimezoneOption[] {
    return getFormattedTimezones();
  }

  /**
   * Get the user's detected timezone
   * @returns The user's IANA timezone string
   */
  getDefaultTimezone(): string {
    return getUserTimezone();
  }

  /**
   * Check if a timezone is valid
   * @param timezone The timezone string to validate
   * @returns boolean indicating if the timezone is valid
   */
  isValidTimezone(timezone: string): boolean {
    return commonTimezones.includes(timezone);
  }
} 