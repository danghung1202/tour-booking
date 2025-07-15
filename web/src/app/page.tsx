import styles from './page.module.css';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Tour Booking Platform</h1>
          <p className={styles.description}>
            Welcome to our tour booking platform. Find and book amazing tours with local guides.
          </p>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>Discover Tours</h2>
              <p>Find unique experiences in destinations around the world.</p>
            </div>
            <div className={styles.card}>
              <h2>Meet Local Guides</h2>
              <p>Connect with knowledgeable local guides for authentic experiences.</p>
            </div>
            <div className={styles.card}>
              <h2>Book Securely</h2>
              <p>Easy and secure booking process with instant confirmation.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
