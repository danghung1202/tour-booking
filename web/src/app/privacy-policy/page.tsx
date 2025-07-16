import styles from "./page.module.css"

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last Updated: July 9, 2025</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Introduction</h2>
          <p className={styles.paragraph}>
            Welcome to the Unique Tours Platform ('we', 'us', or 'our'). We are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
            you visit our website and use our services.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
          <p className={styles.paragraph}>
            We may collect information about you in a variety of ways. The information we may collect on the Site
            includes:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and
              telephone number, that you voluntarily give to us when you register for an account or when you make a
              booking.
            </li>
            <li className={styles.listItem}>
              <strong>Profile Data (for Guides):</strong> If you register as a Tour Guide, we collect additional
              information for your public profile, including your biographical information and photos you upload.
            </li>
            <li className={styles.listItem}>
              <strong>Booking Information:</strong> When a booking is made, we collect details of the transaction,
              including the tour booked, date, number of participants, and payment information. Note: We do not store
              full credit card details on our servers.
            </li>
            <li className={styles.listItem}>
              <strong>Usage Data:</strong> Information our servers automatically collect when you access the Site, such
              as your IP address, your browser type, your operating system, your access times, and the pages you have
              viewed directly before and after accessing the Site.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. How We Use Your Information</h2>
          <p className={styles.paragraph}>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized
            experience. Specifically, we may use information collected about you to:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Create and manage your account.</li>
            <li className={styles.listItem}>Process your bookings and other transactions.</li>
            <li className={styles.listItem}>Facilitate communication between you and your Tour Guide.</li>
            <li className={styles.listItem}>Email you regarding your account or bookings.</li>
            <li className={styles.listItem}>Monitor and analyze usage and trends to improve the platform.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Disclosure of Your Information</h2>
          <p className={styles.paragraph}>
            We may share information we have collected about you in certain situations. Your information may be
            disclosed as follows:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>To Tour Guides:</strong> When you book a tour, we will share your name and booking details with
              the tour guide so they can provide the service.
            </li>
            <li className={styles.listItem}>
              <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is
              necessary to respond to legal process, to investigate or remedy potential violations of our policies, or
              to protect the rights, property, and safety of others.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Security of Your Information</h2>
          <p className={styles.paragraph}>
            We use administrative, technical, and physical security measures to help protect your personal information.
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware
            that despite our efforts, no security measures are perfect or impenetrable.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Contact Us</h2>
          <p className={styles.paragraph}>
            If you have questions or comments about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:privacy@uniquetours.com" className={styles.emailLink}>
              privacy@uniquetours.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
