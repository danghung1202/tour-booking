import type { BookingRequest } from "@/packages/types"

interface BookingResponse {
  id: string
  status: string
  message: string
  booking_date: string
  guest_name: string
  guest_email: string
  phone: string
  num_adults: number
  num_kids: number
  total_amount: number
  created_at: string
}

interface BookingWithTourInfo {
  id: string
  booking_date: string
  guest_name: string
  guest_email: string
  phone: string
  num_adults: number
  num_kids: number
  status: "pending" | "confirmed" | "rejected" | "cancelled"
  total_amount: number
  created_at: string
  tour: {
    title: string
  }
}

interface TouristBooking {
  id: string
  booking_date: string
  status: "pending" | "confirmed" | "rejected" | "cancelled"
  num_adults: number
  num_kids: number
  total_amount: number
  created_at: string
  tour: {
    id: string
    title: string
    images: string[]
  }
}

// API client utility
const apiClient = {
  async post<T>(url: string, data: any): Promise<T> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  },
}

export const bookingService = {
  async create(tourId: string, bookingData: BookingRequest): Promise<BookingResponse> {
    try {
      // Validate required fields
      if (!tourId) {
        throw new Error("Tour ID is required")
      }

      if (!bookingData.booking_date || !bookingData.guest_name || !bookingData.guest_email || !bookingData.phone) {
        throw new Error("All required fields must be provided")
      }

      if (bookingData.num_adults < 1) {
        throw new Error("At least 1 adult is required")
      }

      if (bookingData.num_kids < 0) {
        throw new Error("Number of kids cannot be negative")
      }

      // In a real application, this would call your actual API endpoint
      // For now, we'll simulate an API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful response that matches the API specification
      const response: BookingResponse = {
        id: `booking_${Date.now()}`,
        status: "pending_confirmation",
        message: "Booking request submitted successfully",
        booking_date: bookingData.booking_date,
        guest_name: bookingData.guest_name,
        guest_email: bookingData.guest_email,
        phone: bookingData.phone,
        num_adults: bookingData.num_adults,
        num_kids: bookingData.num_kids,
        total_amount: 150 * (bookingData.num_adults + bookingData.num_kids), // Mock calculation
        created_at: new Date().toISOString(),
      }

      // Log the booking data for development purposes
      console.log("Booking submitted to API:", {
        endpoint: `/api/v1/tours/${tourId}/bookings`,
        method: "POST",
        payload: bookingData,
        response: response,
      })

      return response

      // In production, uncomment this line and remove the mock code above:
      // return apiClient.post<BookingResponse>(`/api/v1/tours/${tourId}/bookings`, bookingData)
    } catch (error) {
      console.error("Booking service error:", error)

      if (error instanceof Error) {
        throw error
      }

      throw new Error("Failed to submit booking request. Please try again.")
    }
  },

  async getMyBookings(status?: string): Promise<BookingWithTourInfo[]> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      console.log("Fetching bookings with status filter:", status)

      // Mock bookings data that includes tour information
      const mockBookings: BookingWithTourInfo[] = [
        {
          id: "booking_001",
          booking_date: "2024-02-15",
          guest_name: "Sarah Johnson",
          guest_email: "sarah.johnson@email.com",
          phone: "+1-555-0123",
          num_adults: 2,
          num_kids: 1,
          status: "pending",
          total_amount: 450,
          created_at: new Date("2024-01-20T10:30:00Z").toISOString(),
          tour: {
            title: "Hanoi Street Food Discovery",
          },
        },
        {
          id: "booking_002",
          booking_date: "2024-02-18",
          guest_name: "Michael Chen",
          guest_email: "michael.chen@email.com",
          phone: "+1-555-0124",
          num_adults: 1,
          num_kids: 0,
          status: "confirmed",
          total_amount: 150,
          created_at: new Date("2024-01-22T14:15:00Z").toISOString(),
          tour: {
            title: "Old Quarter History Walk",
          },
        },
        {
          id: "booking_003",
          booking_date: "2024-02-20",
          guest_name: "Emily Rodriguez",
          guest_email: "emily.rodriguez@email.com",
          phone: "+1-555-0125",
          num_adults: 4,
          num_kids: 2,
          status: "pending",
          total_amount: 420,
          created_at: new Date("2024-01-25T09:45:00Z").toISOString(),
          tour: {
            title: "Incense Village Photography Tour",
          },
        },
        {
          id: "booking_004",
          booking_date: "2024-02-22",
          guest_name: "David Kim",
          guest_email: "david.kim@email.com",
          phone: "+1-555-0126",
          num_adults: 2,
          num_kids: 0,
          status: "rejected",
          total_amount: 180,
          created_at: new Date("2024-01-28T16:20:00Z").toISOString(),
          tour: {
            title: "Red River Delta Biking",
          },
        },
        {
          id: "booking_005",
          booking_date: "2024-02-25",
          guest_name: "Lisa Thompson",
          guest_email: "lisa.thompson@email.com",
          phone: "+1-555-0127",
          num_adults: 3,
          num_kids: 1,
          status: "confirmed",
          total_amount: 480,
          created_at: new Date("2024-01-30T11:10:00Z").toISOString(),
          tour: {
            title: "Ha Long Bay Day Trip",
          },
        },
        {
          id: "booking_006",
          booking_date: "2024-02-28",
          guest_name: "Robert Wilson",
          guest_email: "robert.wilson@email.com",
          phone: "+1-555-0128",
          num_adults: 1,
          num_kids: 0,
          status: "pending",
          total_amount: 65,
          created_at: new Date("2024-02-01T13:30:00Z").toISOString(),
          tour: {
            title: "Cooking Class with Local Chef",
          },
        },
        {
          id: "booking_007",
          booking_date: "2024-03-02",
          guest_name: "Amanda Davis",
          guest_email: "amanda.davis@email.com",
          phone: "+1-555-0129",
          num_adults: 2,
          num_kids: 2,
          status: "cancelled",
          total_amount: 220,
          created_at: new Date("2024-02-03T08:45:00Z").toISOString(),
          tour: {
            title: "Ceramic Village Workshop",
          },
        },
        {
          id: "booking_008",
          booking_date: "2024-03-05",
          guest_name: "James Brown",
          guest_email: "james.brown@email.com",
          phone: "+1-555-0130",
          num_adults: 1,
          num_kids: 0,
          status: "confirmed",
          total_amount: 40,
          created_at: new Date("2024-02-05T15:20:00Z").toISOString(),
          tour: {
            title: "Early Morning Market Run",
          },
        },
        {
          id: "booking_009",
          booking_date: "2024-03-08",
          guest_name: "Maria Garcia",
          guest_email: "maria.garcia@email.com",
          phone: "+1-555-0131",
          num_adults: 2,
          num_kids: 0,
          status: "pending",
          total_amount: 100,
          created_at: new Date("2024-02-07T12:15:00Z").toISOString(),
          tour: {
            title: "Hidden Temples of Hanoi",
          },
        },
        {
          id: "booking_010",
          booking_date: "2024-03-10",
          guest_name: "Kevin Lee",
          guest_email: "kevin.lee@email.com",
          phone: "+1-555-0132",
          num_adults: 1,
          num_kids: 0,
          status: "rejected",
          total_amount: 35,
          created_at: new Date("2024-02-09T10:30:00Z").toISOString(),
          tour: {
            title: "Train Street Photo Hunt",
          },
        },
        {
          id: "booking_011",
          booking_date: "2024-03-12",
          guest_name: "Jennifer White",
          guest_email: "jennifer.white@email.com",
          phone: "+1-555-0133",
          num_adults: 3,
          num_kids: 1,
          status: "confirmed",
          total_amount: 600,
          created_at: new Date("2024-02-11T14:45:00Z").toISOString(),
          tour: {
            title: "Ninh Binh Adventure",
          },
        },
        {
          id: "booking_012",
          booking_date: "2024-03-15",
          guest_name: "Thomas Anderson",
          guest_email: "thomas.anderson@email.com",
          phone: "+1-555-0134",
          num_adults: 2,
          num_kids: 0,
          status: "pending",
          total_amount: 170,
          created_at: new Date("2024-02-13T09:20:00Z").toISOString(),
          tour: {
            title: "Secret War Tunnels Exploration",
          },
        },
      ]

      // Filter bookings based on status
      let filteredBookings = mockBookings
      if (status && status !== "all") {
        filteredBookings = mockBookings.filter((booking) => booking.status === status)
      }

      // Sort by created_at descending (newest first)
      filteredBookings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      console.log(`Returning ${filteredBookings.length} bookings for status: ${status || "all"}`)
      return filteredBookings

      // In production, this would be:
      // const queryParams = status && status !== 'all' ? `?status=${status}` : ''
      // return apiClient.get<BookingWithTourInfo[]>(`/api/v1/my-bookings${queryParams}`)
    } catch (error) {
      console.error("Get my bookings error:", error)
      throw new Error("Failed to fetch bookings. Please try again.")
    }
  },

  async updateBookingStatus(bookingId: string, status: "confirmed" | "rejected"): Promise<void> {
    try {
      // Validate inputs
      if (!bookingId) {
        throw new Error("Booking ID is required")
      }

      if (!["confirmed", "rejected"].includes(status)) {
        throw new Error("Invalid status. Must be 'confirmed' or 'rejected'")
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log(`Updating booking ${bookingId} to status: ${status}`)

      // Mock successful response
      console.log("Booking status updated successfully")

      // In production, this would be:
      // return apiClient.patch(`/api/v1/bookings/${bookingId}`, { status })
    } catch (error) {
      console.error("Update booking status error:", error)

      if (error instanceof Error) {
        throw error
      }

      throw new Error("Failed to update booking status. Please try again.")
    }
  },

  async getTouristBookings(): Promise<TouristBooking[]> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Fetching tourist bookings...")

      // Mock tourist bookings data with tour information
      const mockTouristBookings: TouristBooking[] = [
        {
          id: "booking_t001",
          booking_date: "2024-03-20",
          status: "confirmed",
          num_adults: 2,
          num_kids: 0,
          total_amount: 300,
          created_at: new Date("2024-02-15T10:30:00Z").toISOString(),
          tour: {
            id: "tour_001",
            title: "Hanoi Street Food Discovery",
            images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
          },
        },
        {
          id: "booking_t002",
          booking_date: "2024-03-25",
          status: "pending",
          num_adults: 1,
          num_kids: 1,
          total_amount: 200,
          created_at: new Date("2024-02-18T14:15:00Z").toISOString(),
          tour: {
            id: "tour_002",
            title: "Old Quarter History Walk",
            images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
          },
        },
        {
          id: "booking_t003",
          booking_date: "2024-02-10",
          status: "confirmed",
          num_adults: 4,
          num_kids: 2,
          total_amount: 900,
          created_at: new Date("2024-01-25T09:45:00Z").toISOString(),
          tour: {
            id: "tour_003",
            title: "Ha Long Bay Day Trip",
            images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
          },
        },
        {
          id: "booking_t004",
          booking_date: "2024-01-15",
          status: "cancelled",
          num_adults: 2,
          num_kids: 0,
          total_amount: 180,
          created_at: new Date("2024-01-10T16:20:00Z").toISOString(),
          tour: {
            id: "tour_004",
            title: "Red River Delta Biking",
            images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
          },
        },
        {
          id: "booking_t005",
          booking_date: "2024-04-05",
          status: "pending",
          num_adults: 3,
          num_kids: 1,
          total_amount: 480,
          created_at: new Date("2024-02-20T11:10:00Z").toISOString(),
          tour: {
            id: "tour_005",
            title: "Incense Village Photography Tour",
            images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
          },
        },
        {
          id: "booking_t006",
          booking_date: "2024-01-28",
          status: "rejected",
          num_adults: 1,
          num_kids: 0,
          total_amount: 65,
          created_at: new Date("2024-01-20T13:30:00Z").toISOString(),
          tour: {
            id: "tour_006",
            title: "Cooking Class with Local Chef",
            images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
          },
        },
      ]

      // Sort by booking_date descending (upcoming first, then past)
      mockTouristBookings.sort((a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime())

      console.log(`Returning ${mockTouristBookings.length} tourist bookings`)
      return mockTouristBookings

      // In production, this would be:
      // return apiClient.get<TouristBooking[]>('/api/v1/my-bookings')
    } catch (error) {
      console.error("Get tourist bookings error:", error)
      throw new Error("Failed to fetch your bookings. Please try again.")
    }
  },

  async cancelMyBooking(bookingId: string): Promise<void> {
    try {
      // Validate input
      if (!bookingId) {
        throw new Error("Booking ID is required")
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log(`Cancelling booking ${bookingId}`)

      // Simulate potential API error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error("Unable to cancel booking. Please contact support.")
      }

      // Mock successful response
      console.log("Booking cancelled successfully")

      // In production, this would be:
      // return apiClient.patch(`/api/v1/my-bookings/${bookingId}/cancel`)
    } catch (error) {
      console.error("Cancel booking error:", error)

      if (error instanceof Error) {
        throw error
      }

      throw new Error("Failed to cancel booking. Please try again.")
    }
  },
}
