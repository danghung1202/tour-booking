import styles from "./page.module.css"

export default function TermsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.lastUpdated}>Last Updated: July 9, 2025</p>
        </header>

        <main className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Agreement to Terms</h2>
            <p className={styles.paragraph}>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on
              behalf of an entity ('you') and the Unique Tours Platform ('we', 'us', or 'our'), concerning your access
              to and use of the website and its services. You agree that by accessing the Site, you have read,
              understood, and agree to be bound by all of these Terms of Service.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. User Accounts</h2>
            <p className={styles.paragraph}>
              You may be required to register with the Site. You agree to keep your password confidential and will be
              responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a
              username you select if we determine, in our sole discretion, that such username is inappropriate.
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>Tourist Role:</strong> Users registered as 'tourists' can browse tours, make bookings, and
                communicate with guides.
              </li>
              <li className={styles.listItem}>
                <strong>Guide Role:</strong> Users approved as 'guides' can create and manage public tour listings and
                manage bookings made by tourists.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Bookings and Payments</h2>
            <p className={styles.paragraph}>
              When you book a tour, you are entering into a direct contract with the Tour Guide. The Unique Tours
              Platform acts as an intermediary marketplace to facilitate this connection.
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>Cancellations and Refunds:</strong> Cancellation policies are set by individual guides but are
                subject to a platform-wide minimum standard. Please review the cancellation policy listed on each tour
                before booking.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. User-Generated Content (for Guides)</h2>
            <p className={styles.paragraph}>
              As a guide, you may create, post, or share content, such as text, photos, and other materials for your
              tour listings ('Content'). You retain all rights in, and are solely responsible for, the Content you post.
              By posting Content, you grant us a non-exclusive, worldwide, royalty-free license to use, host, display,
              and distribute your Content to promote the platform and your tours.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Prohibited Activities</h2>
            <p className={styles.paragraph}>
              You may not access or use the Site for any purpose other than that for which we make the Site available.
              Prohibited activities include, but are not limited to: attempting to impersonate another user, harassing
              our employees or other users, and using any information obtained from the Site in order to harm another
              person.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Limitation of Liability</h2>
            <p className={styles.paragraph}>
              In no event will we or our directors, employees, or agents be liable to you or any third party for any
              direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use
              of the site or the services provided by tour guides.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Contact Us</h2>
            <p className={styles.paragraph}>
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the
              Site, please contact us at:{" "}
              <a href="mailto:support@uniquetours.com" className={styles.emailLink}>
                support@uniquetours.com
              </a>
              .
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}
