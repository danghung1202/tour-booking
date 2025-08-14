/**
 * A curated list of common IANA timezone names
 * This list includes major time zones from different regions
 * Source: IANA Time Zone Database (https://www.iana.org/time-zones)
 */
export const commonTimezones = [
  // Africa
  'Africa/Cairo',
  'Africa/Casablanca',
  'Africa/Johannesburg',
  'Africa/Lagos',
  'Africa/Nairobi',
  
  // America - North
  'America/Anchorage',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Mexico_City',
  'America/New_York',
  'America/Toronto',
  'America/Vancouver',
  
  // America - Central/South
  'America/Bogota',
  'America/Buenos_Aires',
  'America/Caracas',
  'America/Lima',
  'America/Rio_de_Janeiro',
  'America/Santiago',
  
  // Asia
  'Asia/Bangkok',
  'Asia/Dubai',
  'Asia/Ho_Chi_Minh',
  'Asia/Hong_Kong',
  'Asia/Jakarta',
  'Asia/Jerusalem',
  'Asia/Kolkata',
  'Asia/Kuala_Lumpur',
  'Asia/Manila',
  'Asia/Seoul',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Asia/Taipei',
  'Asia/Tokyo',
  
  // Australia/Pacific
  'Australia/Adelaide',
  'Australia/Brisbane',
  'Australia/Melbourne',
  'Australia/Perth',
  'Australia/Sydney',
  'Pacific/Auckland',
  'Pacific/Fiji',
  'Pacific/Honolulu',
  
  // Europe
  'Europe/Amsterdam',
  'Europe/Athens',
  'Europe/Berlin',
  'Europe/Brussels',
  'Europe/Istanbul',
  'Europe/London',
  'Europe/Madrid',
  'Europe/Moscow',
  'Europe/Paris',
  'Europe/Rome',
  'Europe/Stockholm',
  'Europe/Zurich'
];

/**
 * Get a formatted list of timezones for display in UI components
 * @returns Array of timezone objects with name and value properties
 */
export function getFormattedTimezones() {
  return commonTimezones.map(timezone => ({
    name: formatTimezoneName(timezone),
    value: timezone
  }));
}

/**
 * Format a timezone string for display
 * @param timezone IANA timezone string
 * @returns Formatted timezone string (e.g. "Los Angeles (UTC-08:00)")
 */
export function formatTimezoneName(timezone: string): string {
  try {
    // Get the city name from the timezone string
    const city = timezone.split('/').pop()?.replace('_', ' ');
    
    // Get the UTC offset
    const now = new Date();
    const offset = new Intl.DateTimeFormat('en', {
      timeZone: timezone,
      timeZoneName: 'short'
    })
    .formatToParts(now)
    .find(part => part.type === 'timeZoneName')?.value || '';

    return `${city} (${offset})`;
  } catch (error) {
    // Fallback if there's an error
    return timezone;
  }
}

/**
 * Get the current user's timezone based on browser settings
 * @returns IANA timezone string
 */
export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    // Default to UTC if detection fails
    return 'UTC';
  }
}

export default commonTimezones; 