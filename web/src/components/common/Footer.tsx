import styles from "./Footer.module.css"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3 className={styles.brandName}>Unique Tours</h3>
            <p className={styles.brandDescription}>Discover amazing tours and experiences around the world</p>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.contact}>
            <h4 className={styles.contactTitle}>Get in Touch</h4>
            <p className={styles.contactInfo}>Email: info@uniquetours.com</p>
            <p className={styles.contactInfo}>Phone: +1 (555) 123-4567</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p>&copy; {currentYear} Unique Tours. All rights reserved.</p>
          </div>
          <div className={styles.social}>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              Facebook
            </a>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              Twitter
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
