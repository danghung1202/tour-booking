"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authService } from "@/services/authService"
import styles from "./DashboardSidebar.module.css"

type User = {
  id: string
  email: string
  role: string
  name: string
}

type DashboardSidebarProps = {
  user: User
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const navigationLinks = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: "📊",
    },
    {
      href: "/dashboard/tours",
      label: "My Tours",
      icon: "🗺️",
    },
    {
      href: "/dashboard/bookings",
      label: "Manage Bookings",
      icon: "📅",
    },
    {
      href: "/dashboard/availability",
      label: "Manage Availability",
      icon: "🕒",
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: "👤",
    },
  ]

  const handleLogout = async () => {
    if (isLoggingOut) return

    setIsLoggingOut(true)
    try {
      await authService.logout()
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      // Still redirect to login even if logout fails
      router.push("/login")
    } finally {
      setIsLoggingOut(false)
    }
  }

  const isActiveLink = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  return (
    <div className={styles.sidebar}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <a href="/" className={styles.logoLink}>
            Unique Tours
          </a>
        </div>
        <div className={styles.subtitle}>Guide Dashboard</div>
      </div>

      {/* User Info */}
      <div className={styles.userInfo}>
        <div className={styles.userAvatar}>
          <span className={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</span>
        </div>
        <div className={styles.userDetails}>
          <div className={styles.userName}>{user.name}</div>
          <div className={styles.userRole}>Tour Guide</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${styles.navLink} ${isActiveLink(link.href) ? styles.navLinkActive : ""}`}
              >
                <span className={styles.navIcon}>{link.icon}</span>
                <span className={styles.navLabel}>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <button onClick={handleLogout} disabled={isLoggingOut} className={styles.logoutButton}>
          <span className={styles.logoutIcon}>🚪</span>
          <span className={styles.logoutText}>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </div>
  )
}
