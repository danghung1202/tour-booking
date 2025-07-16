import styles from "./page.module.css"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.headline}>Our Story: Connecting Travelers with Local Storytellers</h1>
          <p className={styles.subHeadline}>
            We believe the best travel memories come from genuine connections and unique discoveries, not just
            sightseeing.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Mission: Beyond the Beaten Path</h2>
          <p className={styles.missionText}>
            In a world of crowded tourist spots, we saw a need for something more authentic. Our mission is to create a
            trustworthy platform that connects adventurous travelers with passionate local storytellers. We move beyond
            the ordinary to help you find unforgettable, off-the-beaten-path adventures that offer a true glimpse into
            the heart of a place.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className={styles.philosophySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Philosophy: How We're Different</h2>
          <div className={styles.philosophyGrid}>
            <div className={styles.philosophyCard}>
              <div className={styles.iconWrapper}>
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Curated Local Experts</h3>
              <p className={styles.cardText}>
                Every guide on our platform is more than just a tour operator; they are a passionate storyteller, a
                local expert, and a guardian of their culture. We handpick and vet every guide to ensure your experience
                is safe, enriching, and truly authentic.
              </p>
            </div>

            <div className={styles.philosophyCard}>
              <div className={styles.iconWrapper}>
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Exclusively Unique Tours</h3>
              <p className={styles.cardText}>
                Our platform is dedicated to niche tour offerings. We focus on the content-rich stories and unique
                perspectives our guides bring to life. You won't find generic bus tours here—only memorable experiences
                crafted with passion.
              </p>
            </div>

            <div className={styles.philosophyCard}>
              <div className={styles.iconWrapper}>
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Direct & Fair Connection</h3>
              <p className={styles.cardText}>
                We empower local entrepreneurs by providing a direct link between you and the guide. This transparent
                approach ensures that the people who create and lead these amazing experiences are fairly compensated
                for sharing their expertise and passion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className={styles.foundersSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Meet the Founders</h2>
          <p className={styles.foundersText}>
            Unique Tours was founded by a small team of travelers and technologists, including Winston (our architect)
            and Sally (our UX expert), who believe in the power of travel to create meaningful connections.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Find Your Next Story?</h2>
          <Link href="/tours" className={styles.ctaButton}>
            Explore Our Tours
          </Link>
        </div>
      </section>
    </main>
  )
}
