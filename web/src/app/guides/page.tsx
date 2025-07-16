import { guideService } from "@/services/guideService"
import { GuideProfileCard } from "@/components/features/GuideProfileCard"
import styles from "./page.module.css"

export default async function GuidesPage() {
  const guides = await guideService.getAllGuidesWithTours()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Meet Our Local Experts</h1>
        <p className={styles.subtitle}>
          Discover the passionate storytellers behind our tours. Each of our carefully selected guides brings years of
          local knowledge, unique perspectives, and genuine enthusiasm to create unforgettable experiences. Get to know
          the experts who will be your companions on this journey of discovery.
        </p>
      </div>

      <div className={styles.guidesContainer}>
        {guides.length > 0 ? (
          guides.map((guide) => <GuideProfileCard key={guide.id} guide={guide} />)
        ) : (
          <div className={styles.emptyState}>
            <h2>No Guides Available</h2>
            <p>We're currently updating our guide profiles. Please check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
