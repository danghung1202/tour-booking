import { authServerService } from "@/services/authServerService";
import styles from "./Header.module.css"
import DesktopNav from "./header/DesktopNav"
import MobileMenu from "./header/MobileMenu"

export default async function Header() {
  const user = await authServerService.getCurrentUser()

  const navigationLinks = [
    { href: "/tours", label: "Tours" },
    { href: "/guides", label: "Our Guides" },
    { href: "/articles", label: "Our Stories" },
  ]

  const moreMenuItems = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/">Unique Tours</a>
        </div>
        <DesktopNav user={user} navigationLinks={navigationLinks} moreMenuItems={moreMenuItems} />
        <MobileMenu user={user} navigationLinks={navigationLinks} moreMenuItems={moreMenuItems} />
      </div>
    </header>
  )
}
