import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Tour Booking
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/tours" className={styles.navLink}>
            Tours
          </Link>
          <Link href="/guides" className={styles.navLink}>
            Guides
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Contact
          </Link>
        </nav>
        <div className={styles.auth}>
          <Link href="/login" className={styles.authLink}>
            Login
          </Link>
          <Link href="/register" className={`${styles.authLink} ${styles.register}`}>
            Register
          </Link>
        </div>
      </div>
    </header>
  );
} 