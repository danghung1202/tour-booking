import styles from "./page.module.css"

export default function DashboardOverview() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Welcome back! Here's what's happening with your tours today.</p>
      </header>

      <div className={styles.content}>
        <div className={styles.welcomeCard}>
          <h2 className={styles.cardTitle}>Welcome to Your Guide Dashboard</h2>
          <p className={styles.cardDescription}>
            From here, you can manage all aspects of your tour guide business. Use the sidebar navigation to:
          </p>
          <ul className={styles.featureList}>
            <li>View and manage your tours</li>
            <li>Handle booking requests and confirmations</li>
            <li>Set your availability calendar</li>
            <li>Update your profile and preferences</li>
          </ul>
        </div>

        <div className={styles.quickStats}>
          <div className={styles.statCard}>
            <h3 className={styles.statTitle}>Active Tours</h3>
            <div className={styles.statValue}>12</div>
            <p className={styles.statDescription}>Tours currently available</p>
          </div>

          <div className={styles.statCard}>
            <h3 className={styles.statTitle}>Pending Bookings</h3>
            <div className={styles.statValue}>5</div>
            <p className={styles.statDescription}>Awaiting your response</p>
          </div>

          <div className={styles.statCard}>
            <h3 className={styles.statTitle}>This Month</h3>
            <div className={styles.statValue}>28</div>
            <p className={styles.statDescription}>Tours completed</p>
          </div>
        </div>

        <div className={styles.actionCard}>
          <h3 className={styles.actionTitle}>Quick Actions</h3>
          <p className={styles.actionDescription}>Get started with these common tasks:</p>
          <div className={styles.actionButtons}>
            <a href="/dashboard/tours" className={styles.actionButton}>
              Manage Tours
            </a>
            <a href="/dashboard/bookings" className={styles.actionButton}>
              View Bookings
            </a>
            <a href="/dashboard/availability" className={styles.actionButton}>
              Set Availability
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
