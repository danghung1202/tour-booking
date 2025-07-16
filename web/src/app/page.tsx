import Link from "next/link"
import Image from "next/image"
import { tourService } from "@/services/tourService"
import { categoryService } from "@/services/categoryService"
import { guideService } from "@/services/guideService"
import TourCard from "@/components/common/TourCard"
import styles from "./page.module.css"

export default async function HomePage() {
  // Fetch data for dynamic sections
  const [featuredTours, categories, featuredGuides] = await Promise.all([
    tourService.getFeaturedTours(),
    categoryService.getAll(),
    guideService.getAllGuidesWithTours(),
  ])

  // Get first 3 guides for the featured section
  const guidesToShow = featuredGuides.slice(0, 3)

  return (
    <div className={styles.homepage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/placeholder.svg?height=800&width=1200"
            alt="Beautiful travel destination"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Discover Authentic Local Experiences</h1>
          <p className={styles.heroSubtitle}>
            Connect with passionate local guides and explore hidden gems through unique, personalized tours
          </p>
          <Link href="/tours" className={styles.heroCta}>
            Explore All Tours
          </Link>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Tours</h2>
            <p className={styles.sectionSubtitle}>
              Handpicked experiences that showcase the best of local culture and adventure
            </p>
          </div>
          <div className={styles.toursGrid}>
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          <div className={styles.sectionCta}>
            <Link href="/tours" className={styles.secondaryButton}>
              View All Tours
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Browse by Interest</h2>
            <p className={styles.sectionSubtitle}>Find the perfect tour that matches your passion and interests</p>
          </div>
          <div className={styles.categoriesGrid}>
            {categories.map((category) => (
              <Link key={category.id} href={`/tours?category=${category.slug}`} className={styles.categoryCard}>
                <div className={styles.categoryImageWrapper}>
                  <Image
                    src={category.image || "/placeholder.svg?height=300&width=400"}
                    alt={category.name}
                    fill
                    className={styles.categoryImage}
                  />
                  <div className={styles.categoryOverlay} />
                </div>
                <div className={styles.categoryContent}>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <p className={styles.categoryDescription}>{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
            <p className={styles.sectionSubtitle}>
              We're committed to providing authentic, high-quality experiences that create lasting memories
            </p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Vetted Local Experts</h3>
              <p className={styles.featureDescription}>
                All our guides are passionate storytellers who know their destinations inside and out
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Unique Adventures</h3>
              <p className={styles.featureDescription}>
                Discover hidden gems and authentic experiences you won't find anywhere else
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4l3 3V8l-3 3z" />
                  <path d="M22 9l-6 6" />
                  <path d="M16 9l6 6" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Seamless Booking</h3>
              <p className={styles.featureDescription}>
                Easy and reliable booking process with instant confirmation and flexible cancellation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Guides Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Meet Our Storytellers</h2>
            <p className={styles.sectionSubtitle}>
              Our tours are led by passionate locals who are experts in their field and can't wait to share their
              stories with you
            </p>
          </div>
          <div className={styles.guidesGrid}>
            {guidesToShow.map((guide) => (
              <div key={guide.id} className={styles.guideCard}>
                <div className={styles.guideImageWrapper}>
                  <Image
                    src={guide.photo_url || "/placeholder.svg?height=200&width=200"}
                    alt={guide.name}
                    width={200}
                    height={200}
                    className={styles.guideImage}
                  />
                </div>
                <div className={styles.guideContent}>
                  <h3 className={styles.guideName}>{guide.name}</h3>
                  <p className={styles.guideBio}>
                    {guide.bio.length > 120 ? `${guide.bio.substring(0, 120)}...` : guide.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.sectionCta}>
            <Link href="/guides" className={styles.secondaryButton}>
              Meet All Our Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
