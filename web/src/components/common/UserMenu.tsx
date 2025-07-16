"use client"

import { useState, useRef, useEffect } from "react"
import { authService } from "@/services/authService"
import styles from "./UserMenu.module.css"

interface User {
  id: string
  name: string
  email: string
  role: "guide" | "tourist" | "admin"
}

interface UserMenuProps {
  user: User
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await authService.logout()
      window.location.href = "/"
    } catch (error) {
      console.error("Logout error:", error)
      setIsLoggingOut(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "guide":
        return "Guide"
      case "tourist":
        return "Tourist"
      case "admin":
        return "Admin"
      default:
        return "User"
    }
  }

  return (
    <div className={styles.userMenu} ref={menuRef}>
      <button
        className={styles.userButton}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`User menu for ${user.name}`}
      >
        <div className={styles.userAvatar}>{getInitials(user.name)}</div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userRole}>{getRoleDisplayName(user.role)}</span>
        </div>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <div className={styles.dropdownUserInfo}>
              <div className={styles.dropdownAvatar}>{getInitials(user.name)}</div>
              <div>
                <div className={styles.dropdownUserName}>{user.name}</div>
                <div className={styles.dropdownUserEmail}>{user.email}</div>
              </div>
            </div>
          </div>

          <div className={styles.dropdownDivider}></div>

          <div className={styles.dropdownSection}>
            {user.role === "admin" ? (
              <>
                <a href="/admin" className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 3C2 2.44772 2.44772 2 3 2H7C7.55228 2 8 2.44772 8 3V7C8 7.55228 7.55228 8 7 8H3C2.44772 8 2 7.55228 2 7V3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5C14 5.55228 13.5523 6 13 6H11C10.4477 6 10 5.55228 10 5V3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2 11C2 10.4477 2.44772 10 3 10H7C7.55228 10 8 10.4477 8 11V13C8 13.5523 7.55228 14 7 14H3C2.44772 14 2 13.5523 2 13V11Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10 9C10 8.44772 10.4477 8 11 8H13C13.5523 8 14 8.44772 14 9V13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13V9Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Admin Dashboard
                </a>
                <a href="/admin/users" className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M0 14C0 11.7909 1.79086 10 4 10H12C14.2091 10 16 11.7909 16 14V16H0V14Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Manage Users
                </a>
              </>
            ) : user.role === "guide" ? (
              <>
                <a href="/dashboard" className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 3C2 2.44772 2.44772 2 3 2H7C7.55228 2 8 2.44772 8 3V7C8 7.55228 7.55228 8 7 8H3C2.44772 8 2 7.55228 2 7V3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5C14 5.55228 13.5523 6 13 6H11C10.4477 6 10 5.55228 10 5V3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2 11C2 10.4477 2.44772 10 3 10H7C7.55228 10 8 10.4477 8 11V13C8 13.5523 7.55228 14 7 14H3C2.44772 14 2 13.5523 2 13V11Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10 9C10 8.44772 10.4477 8 11 8H13C13.5523 8 14 8.44772 14 9V13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13V9Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Guide Dashboard
                </a>
                <a href="/dashboard/bookings" className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path d="M5 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M5 9H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Manage Bookings
                </a>
                <a href="/dashboard/profile" className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M0 14C0 11.7909 1.79086 10 4 10H12C14.2091 10 16 11.7909 16 14V16H0V14Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  My Profile
                </a>
              </>
            ) : (
              <>
                <a href="/my-bookings" className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path d="M5 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M5 9H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  My Bookings
                </a>
                <a href="/profile" className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M0 14C0 11.7909 1.79086 10 4 10H12C14.2091 10 16 11.7909 16 14V16H0V14Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  My Profile
                </a>
              </>
            )}
          </div>

          <div className={styles.dropdownDivider}></div>

          <div className={styles.dropdownSection}>
            <button
              className={`${styles.dropdownItem} ${styles.logoutItem}`}
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11 11L14 8L11 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
