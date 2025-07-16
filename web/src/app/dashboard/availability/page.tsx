"use client"

import { useState, useEffect } from "react"
import { tourService } from "@/services/tourService"
import { availabilityService } from "@/services/availabilityService"
import type { Tour } from "@/packages/types"
import styles from "./page.module.css"

export default function ManageAvailabilityPage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [selectedTourId, setSelectedTourId] = useState<string>("")
  const [unavailableDates, setUnavailableDates] = useState<string[]>([])
  const [isLoadingTours, setIsLoadingTours] = useState(true)
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false)
  const [isUpdatingDate, setIsUpdatingDate] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Load tours on component mount
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoadingTours(true)
        setError(null)
        const fetchedTours = await tourService.getMyTours()
        setTours(fetchedTours)

        // Auto-select first tour if available
        if (fetchedTours.length > 0) {
          setSelectedTourId(fetchedTours[0].id)
        }
      } catch (err) {
        console.error("Failed to fetch tours:", err)
        setError("Failed to load tours. Please try again.")
      } finally {
        setIsLoadingTours(false)
      }
    }

    fetchTours()
  }, [])

  // Load availability when tour selection changes
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedTourId) {
        setUnavailableDates([])
        return
      }

      try {
        setIsLoadingAvailability(true)
        setError(null)
        const dates = await availabilityService.getUnavailableDates(selectedTourId)
        setUnavailableDates(dates)
      } catch (err) {
        console.error("Failed to fetch availability:", err)
        setError("Failed to load availability data. Please try again.")
      } finally {
        setIsLoadingAvailability(false)
      }
    }

    fetchAvailability()
  }, [selectedTourId])

  const handleTourChange = (tourId: string) => {
    setSelectedTourId(tourId)
  }

  const handleDateClick = async (date: Date) => {
    if (!selectedTourId || isUpdatingDate) return

    const dateStr = formatDateForAPI(date)
    const isCurrentlyUnavailable = unavailableDates.includes(dateStr)

    try {
      setIsUpdatingDate(dateStr)
      setError(null)

      if (isCurrentlyUnavailable) {
        await availabilityService.removeUnavailableDate(selectedTourId, dateStr)
      } else {
        await availabilityService.addUnavailableDate(selectedTourId, dateStr)
      }

      // Refresh availability data
      const updatedDates = await availabilityService.getUnavailableDates(selectedTourId)
      setUnavailableDates(updatedDates)
    } catch (err) {
      console.error("Failed to update date availability:", err)
      setError("Failed to update date availability. Please try again.")
    } finally {
      setIsUpdatingDate(null)
    }
  }

  const formatDateForAPI = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  const formatDateForDisplay = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const isDateUnavailable = (date: Date): boolean => {
    const dateStr = formatDateForAPI(date)
    return unavailableDates.includes(dateStr)
  }

  const isDateInPast = (date: Date): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay()) // Start from Sunday

    const days = []
    const currentDate = new Date(startDate)

    // Generate 6 weeks of days (42 days total)
    for (let i = 0; i < 42; i++) {
      const date = new Date(currentDate)
      const isCurrentMonth = date.getMonth() === month
      const isToday = date.toDateString() === new Date().toDateString()
      const isPast = isDateInPast(date)
      const isUnavailable = isDateUnavailable(date)
      const isUpdating = isUpdatingDate === formatDateForAPI(date)

      days.push(
        <button
          key={date.toISOString()}
          onClick={() => handleDateClick(date)}
          disabled={!isCurrentMonth || isPast || isUpdating || isLoadingAvailability}
          className={`${styles.calendarDay} ${
            !isCurrentMonth ? styles.otherMonth : ""
          } ${isToday ? styles.today : ""} ${isPast ? styles.pastDate : ""} ${
            isUnavailable ? styles.unavailable : styles.available
          } ${isUpdating ? styles.updating : ""}`}
          title={
            isPast
              ? "Past date"
              : isUnavailable
                ? `Unavailable - Click to make available`
                : `Available - Click to block`
          }
        >
          <span className={styles.dayNumber}>{date.getDate()}</span>
          {isUpdating && <span className={styles.loadingDot}>•</span>}
        </button>,
      )

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return days
  }

  const selectedTour = tours.find((tour) => tour.id === selectedTourId)
  const upcomingUnavailableDates = unavailableDates.filter((dateStr) => {
    const date = new Date(dateStr)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  })

  if (isLoadingTours) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Manage Availability</h1>
        </div>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading your tours...</p>
        </div>
      </div>
    )
  }

  if (error && tours.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Manage Availability</h1>
        </div>
        <div className={styles.error}>
          <h2>Error Loading Tours</h2>
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
        <h1 className={styles.title}>Manage Availability</h1>
        <p className={styles.subtitle}>Block specific dates when your tours are not available for booking</p>
      </div>

      {error && (
        <div className={styles.errorBanner}>
          <span className={styles.errorIcon}>⚠️</span>
          <span className={styles.errorText}>{error}</span>
          <button onClick={() => setError(null)} className={styles.dismissError}>
            ×
          </button>
        </div>
      )}

      {tours.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No Tours Available</h2>
          <p>You need to create tours before you can manage their availability.</p>
          <a href="/dashboard/tours/create" className={styles.createTourButton}>
            Create Your First Tour
          </a>
        </div>
      ) : (
        <>
          {/* Tour Selector */}
          <div className={styles.tourSelector}>
            <label htmlFor="tour-select" className={styles.selectorLabel}>
              Select a tour to manage its availability:
            </label>
            <select
              id="tour-select"
              value={selectedTourId}
              onChange={(e) => handleTourChange(e.target.value)}
              className={styles.tourSelect}
            >
              <option value="">Choose a tour...</option>
              {tours.map((tour) => (
                <option key={tour.id} value={tour.id}>
                  {tour.title} - {tour.location}
                </option>
              ))}
            </select>
          </div>

          {selectedTour && (
            <>
              {/* Tour Info */}
              <div className={styles.tourInfo}>
                <h2 className={styles.tourTitle}>{selectedTour.title}</h2>
                <div className={styles.tourDetails}>
                  <span className={styles.tourDetail}>📍 {selectedTour.location}</span>
                  <span className={styles.tourDetail}>⏱️ {selectedTour.duration}</span>
                  <span className={styles.tourDetail}>💰 ${selectedTour.price}</span>
                </div>
                <div className={styles.availabilityStats}>
                  <span className={styles.stat}>
                    <strong>{upcomingUnavailableDates.length}</strong> upcoming blocked dates
                  </span>
                  <span className={styles.stat}>
                    <strong>{unavailableDates.length}</strong> total blocked dates
                  </span>
                </div>
              </div>

              {/* Calendar */}
              <div className={styles.calendarSection}>
                <div className={styles.calendarHeader}>
                  <button
                    onClick={() => navigateMonth("prev")}
                    className={styles.navButton}
                    disabled={isLoadingAvailability}
                  >
                    ← Previous
                  </button>
                  <h3 className={styles.monthTitle}>
                    {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h3>
                  <button
                    onClick={() => navigateMonth("next")}
                    className={styles.navButton}
                    disabled={isLoadingAvailability}
                  >
                    Next →
                  </button>
                </div>

                <div className={styles.calendar}>
                  <div className={styles.weekDays}>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className={styles.weekDay}>
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className={styles.calendarGrid}>
                    {isLoadingAvailability ? (
                      <div className={styles.calendarLoading}>
                        <div className={styles.loadingSpinner}></div>
                        <p>Loading availability...</p>
                      </div>
                    ) : (
                      renderCalendar()
                    )}
                  </div>
                </div>

                {/* Legend */}
                <div className={styles.legend}>
                  <div className={styles.legendItem}>
                    <div className={`${styles.legendColor} ${styles.availableColor}`}></div>
                    <span>Available (click to block)</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div className={`${styles.legendColor} ${styles.unavailableColor}`}></div>
                    <span>Blocked (click to unblock)</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div className={`${styles.legendColor} ${styles.pastColor}`}></div>
                    <span>Past dates</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
