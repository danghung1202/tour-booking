import Link from "next/link"
import Image from "next/image"
import type { Tour } from "@/packages/types"
import styles from "./TourCard.module.css"

type TourCardProps = {
  tour: Tour
}

export default function TourCard({ tour }: TourCardProps) {
  // Use the first image from the images array, fallback to placeholder
  const displayImage = tour && tour.images && tour.images.length > 0 ? tour.images[0] : "/placeholder.svg?height=250&width=400"

  // Format price as currency
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(tour.price)

  return (
    <Link href={`/tours/${tour.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={displayImage || "/placeholder.svg"}
          alt={tour.title}
          width={400}
          height={250}
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {tour.featured && <div className={styles.featuredBadge}>Featured</div>}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{tour.title}</h3>
          <div className={styles.price}>From {formattedPrice}</div>
        </div>

        <div className={styles.details}>
          {tour.location && (
            <div className={styles.detail}>
              <span className={styles.detailIcon}>📍</span>
              <span className={styles.detailText}>{tour.location}</span>
            </div>
          )}

          {tour.duration && (
            <div className={styles.detail}>
              <span className={styles.detailIcon}>⏱️</span>
              <span className={styles.detailText}>{tour.duration}</span>
            </div>
          )}

          {tour.maxParticipants && (
            <div className={styles.detail}>
              <span className={styles.detailIcon}>👥</span>
              <span className={styles.detailText}>Max {tour.maxParticipants} people</span>
            </div>
          )}
        </div>

        {tour.description && (
          <p className={styles.description}>
            {tour.description.length > 120 ? `${tour.description.substring(0, 120)}...` : tour.description}
          </p>
        )}

        <div className={styles.footer}>
          {tour.category && <span className={styles.category}>{tour.category}</span>}
          {tour.rating && (
            <div className={styles.rating}>
              <span className={styles.stars}>⭐</span>
              <span className={styles.ratingValue}>{tour.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
