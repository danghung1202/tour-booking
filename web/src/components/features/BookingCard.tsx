"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { bookingService } from "@/services/bookingService"
import styles from "./BookingCard.module.css"

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

interface BookingCardProps {
  booking: TouristBooking
  onBookingCancelled: (bookingId: string) => void
}

export default function BookingCard({ booking, onBookingCancelled }: BookingCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "confirmed":
        return styles.statusConfirmed
      case "pending":
        return styles.statusPending
      case "cancelled":
        return styles.statusCancelled
      case "rejected":
        return styles.statusRejected
      default:
        return styles.statusDefault
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmed"
      case "pending":
        return "Pending"
      case "cancelled":
        return "Cancelled"
      case "rejected":
        return "Rejected"
      default:
        return status
    }
  }

  const canCancelBooking = () => {
    return booking.status === "pending" || booking.status === "confirmed"
  }

  const isUpcoming = () => {
    const bookingDate = new Date(booking.booking_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return bookingDate >= today
  }

  const handleCancelClick = () => {
    setError(null)
    setShowCancelModal(true)
  }

  const handleCancelConfirm = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await bookingService.cancelMyBooking(booking.id)
      setShowCancelModal(false)
      onBookingCancelled(booking.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel booking")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelModalClose = () => {
    if (!isLoading) {
      setShowCancelModal(false)
      setError(null)
    }
  }

  const totalParticipants = booking.num_adults + booking.num_kids

  return (
    <>
      <div className={styles.bookingCard}>
        <div className={styles.imageContainer}>
          <Image
            src={booking.tour.images[0] || "/placeholder.svg?height=200&width=300"}
            alt={booking.tour.title}
            width={300}
            height={200}
            className={styles.tourImage}
          />
          <div className={`${styles.statusBadge} ${getStatusBadgeClass(booking.status)}`}>
            {getStatusText(booking.status)}
          </div>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <h3 className={styles.tourTitle}>
              <Link href={`/tours/${booking.tour.id}`} className={styles.tourLink}>
                {booking.tour.title}
              </Link>
            </h3>
            <div className={styles.bookingDate}>{formatDate(booking.booking_date)}</div>
          </div>

          <div className={styles.bookingDetails}>
            <div className={styles.participants}>
              <span className={styles.participantCount}>
                {totalParticipants} {totalParticipants === 1 ? "person" : "people"}
              </span>
              {booking.num_kids > 0 && (
                <span className={styles.participantBreakdown}>
                  ({booking.num_adults} adult{booking.num_adults !== 1 ? "s" : ""}, {booking.num_kids} kid
                  {booking.num_kids !== 1 ? "s" : ""})
                </span>
              )}
            </div>
            <div className={styles.totalAmount}>${booking.total_amount}</div>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.bookingMeta}>
              <span className={styles.bookingId}>Booking #{booking.id.slice(-6)}</span>
              <span className={styles.bookingCreated}>
                Booked on {new Date(booking.created_at).toLocaleDateString()}
              </span>
            </div>

            {canCancelBooking() && isUpcoming() && (
              <button onClick={handleCancelClick} className={styles.cancelButton} disabled={isLoading}>
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className={styles.modalOverlay} onClick={handleCancelModalClose}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Cancel Booking</h3>
            </div>

            <div className={styles.modalContent}>
              <p>Are you sure you want to cancel this booking?</p>
              <div className={styles.bookingSummary}>
                <strong>{booking.tour.title}</strong>
                <br />
                {formatDate(booking.booking_date)}
                <br />
                {totalParticipants} {totalParticipants === 1 ? "person" : "people"} - ${booking.total_amount}
              </div>
              <p className={styles.cancelWarning}>
                This action cannot be undone. Please check the cancellation policy for any applicable fees.
              </p>

              {error && <div className={styles.errorMessage}>{error}</div>}
            </div>

            <div className={styles.modalActions}>
              <button onClick={handleCancelModalClose} className={styles.modalCancelButton} disabled={isLoading}>
                Keep Booking
              </button>
              <button onClick={handleCancelConfirm} className={styles.modalConfirmButton} disabled={isLoading}>
                {isLoading ? "Cancelling..." : "Yes, Cancel Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
