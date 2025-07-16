// Mock availability data - in production this would come from the API
const mockUnavailableDates: Record<string, string[]> = {
  "tour-01": ["2024-02-15", "2024-02-16", "2024-02-20", "2024-02-25", "2024-03-01", "2024-03-05"],
  "tour-02": ["2024-02-18", "2024-02-22", "2024-02-28", "2024-03-03", "2024-03-08"],
  "tour-03": ["2024-02-14", "2024-02-21", "2024-02-27", "2024-03-02", "2024-03-06"],
  "tour-04": ["2024-02-17", "2024-02-23", "2024-02-29", "2024-03-04", "2024-03-07"],
  "tour-05": ["2024-02-19", "2024-02-24", "2024-03-01", "2024-03-09", "2024-03-10"],
}

export const availabilityService = {
  /**
   * Fetch unavailable dates for a specific tour
   */
  async getUnavailableDates(tourId: string): Promise<string[]> {
    console.log("Fetching unavailable dates for tour:", tourId)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simulate occasional API errors for testing
    if (Math.random() < 0.02) {
      throw new Error("Failed to fetch availability data")
    }

    const unavailableDates = mockUnavailableDates[tourId] || []
    console.log(`Found ${unavailableDates.length} unavailable dates for tour ${tourId}`)

    return unavailableDates

    // In production, this would be:
    // const response = await fetch(`/api/v1/tours/${tourId}/availability`)
    // if (!response.ok) {
    //   throw new Error('Failed to fetch availability data')
    // }
    // return response.json()
  },

  /**
   * Block a specific date for a tour
   */
  async addUnavailableDate(tourId: string, date: string): Promise<void> {
    console.log(`Blocking date ${date} for tour ${tourId}`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

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

    // In production, this would be:
    // const response = await fetch(`/api/v1/tours/${tourId}/availability`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${accessToken}`
    //   },
    //   body: JSON.stringify({ date })
    // })
    // if (!response.ok) {
    //   throw new Error('Failed to block date')
    // }
  },

  /**
   * Unblock a specific date for a tour
   */
  async removeUnavailableDate(tourId: string, date: string): Promise<void> {
    console.log(`Unblocking date ${date} for tour ${tourId}`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

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

    // In production, this would be:
    // const response = await fetch(`/api/v1/tours/${tourId}/availability`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${accessToken}`
    //   },
    //   body: JSON.stringify({ date })
    // })
    // if (!response.ok) {
    //   throw new Error('Failed to unblock date')
    // }
  },

  /**
   * Get availability statistics for a tour
   */
  async getAvailabilityStats(tourId: string): Promise<{ totalBlocked: number; upcomingBlocked: number }> {
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
  },
}
