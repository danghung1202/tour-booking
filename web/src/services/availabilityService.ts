import { SupabaseClient } from "@supabase/supabase-js";

// Mock availability data - in production this would come from the API
const mockUnavailableDates: Record<string, string[]> = {
  "tour-01": ["2024-02-15", "2024-02-16", "2024-02-20", "2024-02-25", "2024-03-01", "2024-03-05"],
  "tour-02": ["2024-02-18", "2024-02-22", "2024-02-28", "2024-03-03", "2024-03-08"],
  "tour-03": ["2024-02-14", "2024-02-21", "2024-02-27", "2024-03-02", "2024-03-06"],
  "tour-04": ["2024-02-17", "2024-02-23", "2024-02-29", "2024-03-04", "2024-03-07"],
  "tour-05": ["2024-02-19", "2024-02-24", "2024-03-01", "2024-03-09", "2024-03-10"],
}

export class AvailabilityService {
  private supabase: SupabaseClient<any, "app", any>;

  constructor(supabaseClient: SupabaseClient<any, "app", any>) {
    this.supabase = supabaseClient;
  }

  /**
   * Fetch unavailable dates for a specific tour
   */
  async getUnavailableDates(tourId: string): Promise<string[]> {
    try {
      console.log("Fetching unavailable dates for tour:", tourId)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In a real app, this would use the Supabase client to fetch availability data
      // const { data, error } = await this.supabase
      //   .from('tour_unavailable_dates')
      //   .select('date')
      //   .eq('tour_id', tourId)
      // if (error) throw error
      // return data.map(item => item.date)

      // Simulate occasional API errors for testing
      if (Math.random() < 0.02) {
        throw new Error("Failed to fetch availability data")
      }

      const unavailableDates = mockUnavailableDates[tourId] || []
      console.log(`Found ${unavailableDates.length} unavailable dates for tour ${tourId}`)

      return unavailableDates
    } catch (error) {
      console.error("Error fetching unavailable dates:", error)
      throw error
    }
  }

  /**
   * Block a specific date for a tour
   */
  async addUnavailableDate(tourId: string, date: string): Promise<void> {
    try {
      console.log(`Blocking date ${date} for tour ${tourId}`)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      // In a real app, this would use the Supabase client to add an unavailable date
      // const { error } = await this.supabase
      //   .from('tour_unavailable_dates')
      //   .insert({
      //     tour_id: tourId,
      //     date: date,
      //     created_at: new Date().toISOString()
      //   })
      // if (error) throw error

      // Simulate occasional API errors for testing
      if (Math.random() < 0.02) {
        throw new Error("Failed to block date")
      }

      // Update mock data
      if (!mockUnavailableDates[tourId]) {
        mockUnavailableDates[tourId] = []
      }

      if (!mockUnavailableDates[tourId].includes(date)) {
        mockUnavailableDates[tourId].push(date)
        mockUnavailableDates[tourId].sort() // Keep dates sorted
      }

      console.log(`Date ${date} blocked successfully for tour ${tourId}`)
    } catch (error) {
      console.error("Error blocking date:", error)
      throw error
    }
  }

  /**
   * Unblock a specific date for a tour
   */
  async removeUnavailableDate(tourId: string, date: string): Promise<void> {
    try {
      console.log(`Unblocking date ${date} for tour ${tourId}`)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      // In a real app, this would use the Supabase client to remove an unavailable date
      // const { error } = await this.supabase
      //   .from('tour_unavailable_dates')
      //   .delete()
      //   .eq('tour_id', tourId)
      //   .eq('date', date)
      // if (error) throw error

      // Simulate occasional API errors for testing
      if (Math.random() < 0.02) {
        throw new Error("Failed to unblock date")
      }

      // Update mock data
      if (mockUnavailableDates[tourId]) {
        const index = mockUnavailableDates[tourId].indexOf(date)
        if (index > -1) {
          mockUnavailableDates[tourId].splice(index, 1)
        }
      }

      console.log(`Date ${date} unblocked successfully for tour ${tourId}`)
    } catch (error) {
      console.error("Error unblocking date:", error)
      throw error
    }
  }

  /**
   * Get availability statistics for a tour
   */
  async getAvailabilityStats(tourId: string): Promise<{ totalBlocked: number; upcomingBlocked: number }> {
    try {
      const unavailableDates = await this.getUnavailableDates(tourId)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const upcomingBlocked = unavailableDates.filter((dateStr) => {
        const date = new Date(dateStr)
        return date >= today
      }).length

      return {
        totalBlocked: unavailableDates.length,
        upcomingBlocked,
      }
    } catch (error) {
      console.error("Error getting availability stats:", error)
      throw error
    }
  }
}
