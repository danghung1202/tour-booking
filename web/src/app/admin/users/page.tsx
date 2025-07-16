"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { adminService, type AdminUser } from "@/services/adminService"
import styles from "./page.module.css"

export default function ManageUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const usersPerPage = 10

  // Fetch users
  const fetchUsers = async (search = "", page = 1) => {
    try {
      setLoading(true)
      setError(null)
      const response = await adminService.getUsers(search, page, usersPerPage)
      setUsers(response.users)
      setTotalPages(response.totalPages)
      setTotalUsers(response.total)
      setCurrentPage(response.page)
    } catch (err) {
      setError("Failed to fetch users. Please try again.")
      console.error("Error fetching users:", err)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchUsers()
  }, [])

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchUsers(searchTerm, 1)
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchUsers(searchTerm, page)
  }

  // Update user role
  const handleRoleChange = async (userId: string, newRole: "tourist" | "guide" | "admin") => {
    try {
      setUpdatingUserId(userId)
      setError(null)
      await adminService.updateUserRole(userId, newRole)

      // Update local state
      setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))

      setSuccessMessage(`User role updated to ${newRole} successfully!`)
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user role")
    } finally {
      setUpdatingUserId(null)
    }
  }

  // Update user status
  const handleStatusChange = async (userId: string, newStatus: "active" | "suspended") => {
    try {
      setUpdatingUserId(userId)
      setError(null)
      await adminService.updateUserStatus(userId, newStatus)

      // Update local state
      setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))

      setSuccessMessage(`User ${newStatus === "active" ? "activated" : "suspended"} successfully!`)
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user status")
    } finally {
      setUpdatingUserId(null)
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get role badge class
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "admin":
        return styles.roleAdmin
      case "guide":
        return styles.roleGuide
      case "tourist":
        return styles.roleTourist
      default:
        return styles.roleTourist
    }
  }

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    return status === "active" ? styles.statusActive : styles.statusSuspended
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Manage Users</h1>
          <p className={styles.subtitle}>View and manage all platform users ({totalUsers} total)</p>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className={styles.successBanner}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20,6 9,17 4,12" />
          </svg>
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className={styles.errorBanner}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
        </div>
      )}

      {/* Search */}
      <div className={styles.searchSection}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchInputWrapper}>
            <svg
              className={styles.searchIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button type="submit" className={styles.searchButton} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      <div className={styles.content}>
      {/* Users Table */}
      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className={styles.emptyState}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h3>No users found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className={styles.userInfo}>
                        <div className={styles.userAvatar}>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div>
                          <div className={styles.userName}>{user.name}</div>
                          <div className={styles.userEmail}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.roleBadge} ${getRoleBadgeClass(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusBadgeClass(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className={styles.dateCell}>{formatDate(user.created_at)}</td>
                    <td className={styles.dateCell}>{user.last_login ? formatDate(user.last_login) : "Never"}</td>
                    <td>
                      <div className={styles.actions}>
                        {/* Role Change Dropdown */}
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as "tourist" | "guide" | "admin")}
                          disabled={updatingUserId === user.id}
                          className={styles.roleSelect}
                        >
                          <option value="tourist">Tourist</option>
                          <option value="guide">Guide</option>
                          <option value="admin">Admin</option>
                        </select>

                        {/* Status Toggle Button */}
                        <button
                          onClick={() => handleStatusChange(user.id, user.status === "active" ? "suspended" : "active")}
                          disabled={updatingUserId === user.id}
                          className={`${styles.statusButton} ${user.status === "active" ? styles.suspendButton : styles.activateButton}`}
                        >
                          {updatingUserId === user.id ? (
                            <div className={styles.buttonSpinner}></div>
                          ) : user.status === "active" ? (
                            "Suspend"
                          ) : (
                            "Activate"
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className={styles.paginationButton}
          >
            Previous
          </button>

          <div className={styles.paginationInfo}>
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className={styles.paginationButton}
          >
            Next
          </button>
        </div>
      )}
      </div>
    </div>
  )
}
