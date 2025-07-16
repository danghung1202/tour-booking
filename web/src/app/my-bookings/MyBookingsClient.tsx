"use client"

import { useState } from "react"
import Link from "next/link"
import BookingCard from "@/components/features/BookingCard"
import { bookingService } from "@/services/bookingService"
import styles from "./page.module.css"

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

interface MyBookingsClientProps {
  initialBookings: TouristBooking[]
  initialError: string | null
}

export default function MyBookingsClient({ initialBookings, initialError }: MyBookingsClientProps) {
  const [bookings, setBookings] = useState<TouristBooking[]>(initialBookings)
  const [error, setError] = useState<string | null>(initialError)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleBookingCancelled = async (bookingId: string) => {
    // Optimistically update the UI
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "cancelled" as const } : booking,
      ),
    )

    // Optionally refresh the data from the server
    try {
      setIsRefreshing(true)
      const updatedBookings = await bookingService.getTouristBookings()
      setBookings(updatedBookings)
      setError(null)
    } catch (err) {
      console.error("Failed to refresh bookings:", err)
      // The optimistic update will remain in place
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true)
      setError(null)
      const updatedBookings = await bookingService.getTouristBookings()
      setBookings(updatedBookings)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh bookings")
    } finally {
      setIsRefreshing(false)
    }
  }

  // Separate bookings into upcoming and past
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.booking_date)
    return bookingDate >= today && booking.status !== "cancelled" && booking.status !== "rejected"
  })

  const pastBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.booking_date)
    return bookingDate < today || booking.status === "cancelled" || booking.status === "rejected"
  })

  if (error && bookings.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>
          <h2>Unable to Load Bookings</h2>
          <p>{error}</p>
          <button onClick={handleRefresh} className={styles.retryButton} disabled={isRefreshing}>
            {isRefreshing ? "Retrying..." : "Try Again"}
          </button>
        </div>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateContent}>
          <div className={styles.emptyStateIcon}>🗺️</div>
          <h2>No Bookings Yet</h2>
          <p>You haven't booked any tours yet. Start exploring our amazing tours and create unforgettable memories!</p>
          <Link href="/tours" className={styles.exploreButton}>
            Explore Tours
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.content}>
      {error && (
        <div className={styles.errorBanner}>
          <p>{error}</p>
          <button onClick={handleRefresh} className={styles.refreshButton} disabled={isRefreshing}>
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      )}

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Upcoming Tours</h2>
            <span className={styles.sectionCount}>
              {upcomingBookings.length} {upcomingBookings.length === 1 ? "booking" : "bookings"}
            </span>
          </div>
          <div className={styles.bookingsGrid}>
            {upcomingBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} onBookingCancelled={handleBookingCancelled} />
            ))}
          </div>
        </section>
      )}

      {/* Past Bookings */}
      {pastBookings.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Past Tours</h2>
            <span className={styles.sectionCount}>
              {pastBookings.length} {pastBookings.length === 1 ? "booking" : "bookings"}
            </span>
          </div>
          <div className={styles.bookingsGrid}>
            {pastBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} onBookingCancelled={handleBookingCancelled} />
            ))}
          </div>
        </section>
      )}

      {/* Refresh indicator */}
      {isRefreshing && (
        <div className={styles.refreshIndicator}>
          <div className={styles.spinner}></div>
          <span>Refreshing bookings...</span>
        </div>
      )}
    </div>
  )
}
