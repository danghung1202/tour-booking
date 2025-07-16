"use client"

import { tourService } from "@/services/tourService"
import TourCard from "@/components/common/TourCard"
import type { Tour } from "@/packages/types"
import styles from "./page.module.css"
import { useEffect, useState } from "react"

export default function ToursClientPage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const fetchedTours = await tourService.getAll()
        setTours(fetchedTours)
        setHasError(false)
      } catch (error) {
        console.error("Failed to fetch tours:", error)
        setHasError(true)
      }
    }

    fetchTours()
  }, [])

  if (hasError) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <h1 className={styles.title}>Explore Our Unique Tours</h1>
          <div className={styles.errorMessage}>
            <h2>Unable to Load Tours</h2>
            <p>We're experiencing technical difficulties loading our tours.</p>
            <p>Please try refreshing the page or check back later.</p>
            <button onClick={() => window.location.reload()} className={styles.retryButton}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!tours || tours.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h1 className={styles.title}>Explore Our Unique Tours</h1>
          <div className={styles.emptyMessage}>
            <h2>No Tours Available</h2>
            <p>We're currently updating our tour offerings.</p>
            <p>Please check back soon for exciting new adventures!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Explore Our Unique Tours</h1>
        <p className={styles.subtitle}>
          Discover amazing experiences and create unforgettable memories with our carefully curated collection of tours.
        </p>
        <div className={styles.tourStats}>
          <span className={styles.tourCount}>
            {tours.length} tour{tours.length !== 1 ? "s" : ""} available
          </span>
          <span className={styles.separator}>•</span>
          <span className={styles.featuredCount}>{tours.filter((tour) => tour.featured).length} featured</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </main>
    </div>
  )
}
