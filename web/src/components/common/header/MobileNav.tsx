"use client"

import { FC } from "react"
import styles from "./MobileNav.module.css"
import { AuthenticatedUser } from "@/types/database.types"

interface MobileNavProps {
  user: AuthenticatedUser | null
  isMenuOpen: boolean
  navigationLinks: { href: string; label: string }[]
  moreMenuItems: { href: string; label: string }[]
  handleLogout: () => void
  setIsMenuOpen: (isOpen: boolean) => void
}

const MobileNav: FC<MobileNavProps> = ({
  user,
  isMenuOpen,
  navigationLinks,
  moreMenuItems,
  handleLogout,
  setIsMenuOpen,
}) => {

  return (
    <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ""}`}>
      <ul className={styles.mobileNavList}>
        {navigationLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}

        {moreMenuItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </a>
          </li>
        ))}

        {/* Mobile Authentication Section */}
        <li className={styles.mobileAuthSection}>
          {user ? (
            <div className={styles.mobileUserSection}>
              <div className={styles.mobileUserInfo}>
                <span className={styles.mobileUserName}>Welcome, {user.name}</span>
                <span className={styles.mobileUserRole}>
                  {user.role === "guide" ? "Guide" : user.role === "admin" ? "Admin" : "Tourist"}
                </span>
              </div>
              <div className={styles.mobileUserLinks}>
                {user.role === "admin" ? (
                  <>
                    <a href="/admin" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                      Admin Dashboard
                    </a>
                    <a href="/admin/users" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                      Manage Users
                    </a>
                  </>
                ) : user.role === "guide" ? (
                  <>
                    <a href="/dashboard" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                      Guide Dashboard
                    </a>
                    <a
                      href="/dashboard/bookings"
                      className={styles.mobileNavLink}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Manage Bookings
                    </a>
                    <a
                      href="/dashboard/profile"
                      className={styles.mobileNavLink}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </a>
                  </>
                ) : (
                  <>
                    <a href="/my-bookings" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                      My Bookings
                    </a>
                    <a href="/profile" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                      My Profile
                    </a>
                  </>
                )}
                <button
                  className={styles.mobileLogoutButton}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <a href="/login" className={styles.mobileLoginButton} onClick={() => setIsMenuOpen(false)}>
              Login / Register
            </a>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default MobileNav 