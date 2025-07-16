import Image from "next/image"
import type { GuideWithTours } from "@/services/guideService"
import TourCard from "@/components/common/TourCard"
import styles from "./GuideProfileCard.module.css"

interface GuideProfileCardProps {
  guide: GuideWithTours
}

export function GuideProfileCard({ guide }: GuideProfileCardProps) {
  return (
    <div className={styles.guideCard}>
      <div className={styles.profileSection}>
        <div className={styles.imageContainer}>
          <Image
            src={guide.photo_url || "/placeholder.svg"}
            alt={`${guide.name} - Tour Guide`}
            width={300}
            height={300}
            className={styles.guideImage}
          />
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.guideName}>{guide.name}</h2>
          <p className={styles.guideBio}>{guide.bio}</p>
        </div>
      </div>

      <div className={styles.toursSection}>
        <h3 className={styles.toursHeading}>Tours by {guide.name}</h3>
        <div className={styles.toursGrid}>
          {guide.tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  )
}
