"use client"

import { useState, useEffect } from "react"
import { authService } from "@/services/authService"
import UserMenu from "./UserMenu"
import styles from "./Header.module.css"
import DropdownMenu from "./DropdownMenu"

interface User {
  id: string
  name: string
  email: string
  role: "guide" | "tourist" | "admin"
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Error checking authentication:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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

        {/* Desktop Navigation */}
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
            {isLoading ? (
              <div className={styles.loadingSpinner}>
                <div className={styles.spinner}></div>
              </div>
            ) : user ? (
              <UserMenu user={user} />
            ) : (
              <a href="/login" className={styles.loginButton}>
                Login / Register
              </a>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className={styles.mobileMenuButton} onClick={toggleMenu} aria-label="Toggle navigation menu">
          <span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Navigation */}
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
              {isLoading ? (
                <div className={styles.loadingSpinner}>
                  <div className={styles.spinner}></div>
                </div>
              ) : user ? (
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
                      onClick={async () => {
                        try {
                          await authService.logout()
                          setUser(null)
                          setIsMenuOpen(false)
                          window.location.href = "/"
                        } catch (error) {
                          console.error("Logout error:", error)
                        }
                      }}
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
      </div>
    </header>
  )
}
