"use client"

import UserMenu from "../UserMenu"
import DropdownMenu from "../DropdownMenu"
import styles from "./DesktopNav.module.css"
import { FC } from "react"
import { AuthenticatedUser } from "@/types/database.types"

interface DesktopNavProps {
  user: AuthenticatedUser | null
  navigationLinks: { href: string; label: string }[]
  moreMenuItems: { href: string; label: string }[]
}

const DesktopNav: FC<DesktopNavProps> = ({ user, navigationLinks, moreMenuItems }) => {
  return (
    <nav className={styles.desktopNav}>
      <ul className={styles.navList}>
        {navigationLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <DropdownMenu title="More" items={moreMenuItems} />

      {/* Authentication Section */}
      <div className={styles.authSection}>
        {user ? (
          <UserMenu user={user} />
        ) : (
          <a href="/login" className={styles.loginButton}>
            Login / Register
          </a>
        )}
      </div>
    </nav>
  )
}

export default DesktopNav 