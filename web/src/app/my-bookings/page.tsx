import { redirect } from "next/navigation"
import { bookingService } from "@/services/bookingService"
import MyBookingsClient from "./MyBookingsClient"
import styles from "./page.module.css"

// Mock authentication check - replace with your actual auth logic
async function getCurrentUser() {
  // Simulate authentication check
  // In a real app, this would check cookies, JWT tokens, etc.
  const isAuthenticated = true // Replace with actual auth check

  if (!isAuthenticated) {
    return null
  }

  return {
    id: "user_123",
    name: "John Doe",
    email: "john.doe@example.com",
  }
}

export default async function MyBookingsPage() {
  // Check authentication
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch bookings data
  let bookings
  let error = null

  try {
    bookings = await bookingService.getTouristBookings()
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load bookings"
    bookings = []
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Bookings</h1>
        <p className={styles.subtitle}>Manage your tour bookings and view upcoming adventures</p>
        </div>
      <div className={styles.main}>                    
        <MyBookingsClient initialBookings={bookings} initialError={error} />
      </div>
    </div>
  )
}
