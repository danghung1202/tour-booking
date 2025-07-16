"use client"

import { useState, useEffect } from "react"
import { tourService } from "@/services/tourService"
import type { Tour } from "@/packages/types"
import styles from "./page.module.css"

const TOURS_PER_PAGE = 5

export default function MyToursPage() {
  const [allTours, setAllTours] = useState<Tour[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const tours = await tourService.getMyTours()
        setAllTours(tours)
      } catch (err) {
        console.error("Failed to fetch tours:", err)
        setError("Failed to load tours. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTours()
  }, [])

  // Calculate pagination
  const totalPages = Math.ceil(allTours.length / TOURS_PER_PAGE)
  const startIndex = (currentPage - 1) * TOURS_PER_PAGE
  const endIndex = startIndex + TOURS_PER_PAGE
  const currentTours = allTours.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Tours</h1>
        </div>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading your tours...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Tours</h1>
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
        <div className={styles.headerTop}>
          <h1 className={styles.title}>My Tours</h1>
          <a href="/dashboard/tours/create" className={styles.createButton}>
            Create New Tour
          </a>
        </div>
        <p className={styles.subtitle}>Manage and track all your tour offerings</p>
        <div className={styles.stats}>
          <span className={styles.totalCount}>
            {allTours.length} tour{allTours.length !== 1 ? "s" : ""} total
          </span>
          <span className={styles.separator}>•</span>
          <span className={styles.featuredCount}>{allTours.filter((tour) => tour.featured).length} featured</span>
        </div>
      </div>

      <div className={styles.content}>
        {allTours.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No Tours Yet</h2>
            <p>You haven't created any tours yet. Click "Create New Tour" above to get started!</p>
          </div>
        ) : (
          <>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Tour Title</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTours.map((tour) => (
                    <tr key={tour.id} className={styles.tableRow}>
                      <td className={styles.titleCell}>
                        <div className={styles.tourTitle}>{tour.title}</div>
                        <div className={styles.tourLocation}>{tour.location}</div>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles.statusPublished}`}>Published</span>
                      </td>
                      <td className={styles.priceCell}>{formatPrice(tour.price)}</td>
                      <td className={styles.actionsCell}>
                        <div className={styles.actions}>
                          <button className={styles.actionButton} title="Edit Tour">
                            ✏️
                          </button>
                          <button className={styles.actionButton} title="View Public Page">
                            👁️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
