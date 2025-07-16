import styles from "./page.module.css"

export default function AdminDashboardOverview() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Welcome back! Here's what's happening today.</p>
      </header>

      <div className={styles.content}>
        <div className={styles.welcomeCard}>
          <h2 className={styles.cardTitle}>Welcome to Admin Dashboard</h2>
          <p className={styles.cardDescription}>
            From here, you can manage all aspects of tour platform. Use the sidebar navigation to:
          </p>
          <ul className={styles.featureList}>
            <li>View and manage all platform users</li>
            <li>View all platform tours and bookings</li>
          </ul>
        </div>

        <div className={styles.quickStats}>
          <div className={styles.statCard}>
            <h3 className={styles.statTitle}>Active User</h3>
            <div className={styles.statValue}>8</div>
            <p className={styles.statDescription}>User currently active</p>
          </div>
		  
		  <div className={styles.statCard}>
            <h3 className={styles.statTitle}>Active Tours</h3>
            <div className={styles.statValue}>24</div>
            <p className={styles.statDescription}>Tours currently available</p>
          </div>

          <div className={styles.statCard}>
            <h3 className={styles.statTitle}>Pending Bookings</h3>
            <div className={styles.statValue}>15</div>
            <p className={styles.statDescription}>Awaiting your response</p>
          </div>

        </div>

        <div className={styles.actionCard}>
          <h3 className={styles.actionTitle}>Quick Actions</h3>
          <p className={styles.actionDescription}>Get started with these common tasks:</p>
          <div className={styles.actionButtons}>
            <a href="/admin/users" className={styles.actionButton}>
              Manage Users
            </a>
            <a href="/admin/tours" className={styles.actionButton}>
              Manage Tours
            </a>
            <a href="/admin/bookings" className={styles.actionButton}>
              View Bookings
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
