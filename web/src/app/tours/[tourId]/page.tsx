import { notFound } from "next/navigation"
import { tourService } from "@/services/tourService"
import BookingForm from "@/components/features/BookingForm"
import type { Tour } from "@/packages/types"
import styles from "./page.module.css"

type PageProps = {
  params: {
    tourId: string
  }
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const tour = await tourService.getById(params.tourId)
    return {
      title: `${tour.title} - Unique Tours`,
      description: tour.description.substring(0, 160),
      openGraph: {
        title: tour.title,
        description: tour.description,
        images: tour.images?.[0] ? [{ url: tour.images[0] }] : [],
      },
    }
  } catch {
    return {
      title: "Tour Not Found - Unique Tours",
      description: "The requested tour could not be found.",
    }
  }
}

export default async function TourDetailPage({ params }: PageProps) {
  let tour: Tour

  try {
    tour = await tourService.getById(params.tourId)
  } catch (error) {
    console.error("Failed to fetch tour:", error)
    notFound()
  }

  if (!tour) {
    notFound()
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Left Column - Main Content */}
        <div className={styles.mainContent}>
          {/* Image Gallery */}
          <section className={styles.gallery}>
            {tour.images && tour.images.length > 0 ? (
              <>
                <div className={styles.primaryImageContainer}>
                  <img src={tour.images[0] || "/placeholder.svg"} alt={tour.title} className={styles.primaryImage} />
                  {tour.featured && <div className={styles.featuredBadge}>Featured Tour</div>}
                </div>
                {tour.images.length > 1 && (
                  <div className={styles.thumbnailGrid}>
                    {tour.images.slice(1, 5).map((image, index) => (
                      <div key={index} className={styles.thumbnailContainer}>
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${tour.title} - Image ${index + 2}`}
                          className={styles.thumbnail}
                        />
                      </div>
                    ))}
                    {tour.images.length > 5 && (
                      <div className={styles.moreImages}>
                        <span>+{tour.images.length - 5} more</span>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className={styles.primaryImageContainer}>
                <img src="/placeholder.svg?height=400&width=600" alt={tour.title} className={styles.primaryImage} />
              </div>
            )}
          </section>

          {/* Main Details */}
          <section className={styles.details}>
            <header className={styles.header}>
              <h1 className={styles.title}>{tour.title}</h1>
              {tour.rating && (
                <div className={styles.rating}>
                  <span className={styles.stars}>⭐</span>
                  <span className={styles.ratingValue}>{tour.rating.toFixed(1)}</span>
                  <span className={styles.ratingText}>({Math.floor(tour.rating * 23)} reviews)</span>
                </div>
              )}
            </header>

            {/* Key Info Summary */}
            <div className={styles.keyInfo}>
              <div className={styles.infoGrid}>
                {tour.location && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📍</span>
                    <div>
                      <span className={styles.infoLabel}>Location</span>
                      <span className={styles.infoValue}>{tour.location}</span>
                    </div>
                  </div>
                )}
                {tour.duration && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>⏱️</span>
                    <div>
                      <span className={styles.infoLabel}>Duration</span>
                      <span className={styles.infoValue}>{tour.duration}</span>
                    </div>
                  </div>
                )}
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>💰</span>
                  <div>
                    <span className={styles.infoLabel}>Price</span>
                    <span className={styles.infoValue}>From ${tour.price}</span>
                  </div>
                </div>
                {tour.maxParticipants && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>👥</span>
                    <div>
                      <span className={styles.infoLabel}>Group Size</span>
                      <span className={styles.infoValue}>Max {tour.maxParticipants} people</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Description */}
            <div className={styles.description}>
              <h2 className={styles.sectionTitle}>About This Tour</h2>
              <p className={styles.descriptionText}>{tour.description}</p>
            </div>

            {/* Category */}
            {tour.category && (
              <div className={styles.categorySection}>
                <span className={styles.categoryBadge}>{tour.category}</span>
              </div>
            )}
          </section>

          {/* Guide's Story Section */}
          {tour.story_html && (
            <section className={styles.storySection}>
              <h2 className={styles.sectionTitle}>A Story from Your Guide</h2>
              <div className={styles.storyContent}>
                <div className={styles.storyHtml} dangerouslySetInnerHTML={{ __html: tour.story_html }} />
              </div>
            </section>
          )}

          {/* Additional Details for Mobile */}
          <div className={styles.mobileBookingCta}>
            <div className={styles.mobilePrice}>From ${tour.price}</div>
            <div className={styles.mobileBookingText}>Book your adventure below</div>
          </div>
        </div>

        {/* Right Column - Booking Form (Sticky) */}
        <aside className={styles.bookingSidebar}>
          <div className={styles.bookingContainer}>
            <h2 className={styles.bookingTitle}>Book Your Adventure</h2>
            <BookingForm tourId={tour.id} tourPrice={tour.price} />
          </div>
        </aside>
      </div>

      {/* Mobile Booking Section */}
      <section className={styles.mobileBookingSection}>
        <h2 className={styles.bookingTitle}>Book Your Adventure</h2>
        <BookingForm tourId={tour.id} tourPrice={tour.price} />
      </section>
    </div>
  )
}
