"use client"

import { useState, useEffect } from "react"
import { bookingService } from "@/services/bookingService"
import styles from "./page.module.css"

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

type BookingStatus = "pending" | "confirmed" | "rejected" | "cancelled" | "all"

const BOOKINGS_PER_PAGE = 10

export default function ManageBookingsPage() {
  const [allBookings, setAllBookings] = useState<BookingWithTourInfo[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<BookingStatus>("pending")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Fetch bookings when status filter changes
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const bookings = await bookingService.getMyBookings(statusFilter)
        setAllBookings(bookings)
        setCurrentPage(1) // Reset to first page when filter changes
      } catch (err) {
        console.error("Failed to fetch bookings:", err)
        setError("Failed to load bookings. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [statusFilter])

  // Calculate pagination
  const totalPages = Math.ceil(allBookings.length / BOOKINGS_PER_PAGE)
  const startIndex = (currentPage - 1) * BOOKINGS_PER_PAGE
  const endIndex = startIndex + BOOKINGS_PER_PAGE
  const currentBookings = allBookings.slice(startIndex, endIndex)

  const handleStatusFilterChange = (status: BookingStatus) => {
    setStatusFilter(status)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handleBookingAction = async (bookingId: string, newStatus: "confirmed" | "rejected") => {
    try {
      setActionLoading(bookingId)
      await bookingService.updateBookingStatus(bookingId, newStatus)

      // Re-fetch bookings to reflect the change
      const updatedBookings = await bookingService.getMyBookings(statusFilter)
      setAllBookings(updatedBookings)

      // If current page becomes empty after action, go to previous page
      const newTotalPages = Math.ceil(updatedBookings.length / BOOKINGS_PER_PAGE)
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages)
      }
    } catch (err) {
      console.error("Failed to update booking status:", err)
      setError("Failed to update booking. Please try again.")
    } finally {
      setActionLoading(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return styles.statusPending
      case "confirmed":
        return styles.statusConfirmed
      case "rejected":
        return styles.statusRejected
      case "cancelled":
        return styles.statusCancelled
      default:
        return styles.statusDefault
    }
  }

  const filterTabs = [
    { key: "pending" as BookingStatus, label: "Pending", count: 0 },
    { key: "confirmed" as BookingStatus, label: "Confirmed", count: 0 },
    { key: "rejected" as BookingStatus, label: "Rejected", count: 0 },
    { key: "all" as BookingStatus, label: "All Bookings", count: 0 },
  ]

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Manage Bookings</h1>
        </div>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading your bookings...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Manage Bookings</h1>
        </div>
        <div className={styles.error}>
          <h2>Error Loading Bookings</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Bookings</h1>
        <p className={styles.subtitle}>Review and manage booking requests for your tours</p>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleStatusFilterChange(tab.key)}
            className={`${styles.filterTab} ${statusFilter === tab.key ? styles.filterTabActive : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {allBookings.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No Bookings Found</h2>
            <p>
              {statusFilter === "all"
                ? "You don't have any bookings yet."
                : `No ${statusFilter} bookings at the moment.`}
            </p>
            {statusFilter !== "all" && (
              <button onClick={() => handleStatusFilterChange("all")} className={styles.viewAllButton}>
                View All Bookings
              </button>
            )}
          </div>
        ) : (
          <>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Tour Name</th>
                    <th>Booking Date</th>
                    <th>Tourist Name</th>
                    <th>Participants</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.map((booking) => (
                    <tr key={booking.id} className={styles.tableRow}>
                      <td className={styles.tourNameCell}>
                        <div className={styles.tourName}>{booking.tour.title}</div>
                      </td>
                      <td className={styles.dateCell}>{formatDate(booking.booking_date)}</td>
                      <td className={styles.touristCell}>
                        <div className={styles.touristName}>{booking.guest_name}</div>
                        <div className={styles.touristEmail}>{booking.guest_email}</div>
                      </td>
                      <td className={styles.participantsCell}>
                        <div className={styles.participants}>
                          {booking.num_adults} adult{booking.num_adults !== 1 ? "s" : ""}
                          {booking.num_kids > 0 && (
                            <span>
                              , {booking.num_kids} kid{booking.num_kids !== 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                        <div className={styles.totalParticipants}>Total: {booking.num_adults + booking.num_kids}</div>
                      </td>
                      <td className={styles.amountCell}>{formatPrice(booking.total_amount)}</td>
                      <td className={styles.statusCell}>
                        <span className={`${styles.statusBadge} ${getStatusBadgeClass(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className={styles.actionsCell}>
                        {booking.status === "pending" && (
                          <div className={styles.actions}>
                            <button
                              onClick={() => handleBookingAction(booking.id, "confirmed")}
                              disabled={actionLoading === booking.id}
                              className={`${styles.actionButton} ${styles.confirmButton}`}
                            >
                              {actionLoading === booking.id ? "..." : "Confirm"}
                            </button>
                            <button
                              onClick={() => handleBookingAction(booking.id, "rejected")}
                              disabled={actionLoading === booking.id}
                              className={`${styles.actionButton} ${styles.rejectButton}`}
                            >
                              {actionLoading === booking.id ? "..." : "Reject"}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
                >
                  ← Previous
                </button>

                <div className={styles.pageInfo}>
                  Page {currentPage} of {totalPages}
                  <span className={styles.totalCount}>
                    ({allBookings.length} booking{allBookings.length !== 1 ? "s" : ""})
                  </span>
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
