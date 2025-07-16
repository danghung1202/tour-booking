import type React from "react"
import { redirect } from "next/navigation"
import { authService } from "@/services/authService"
import AdminSidebar from "@/components/features/AdminSidebar"
import styles from "./layout.module.css"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check authentication and authorization
  const user = await authService.getCurrentUser()

  // Redirect if not authenticated or not an admin
  if (!user || user.role !== "admin") {
    redirect("/")
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <AdminSidebar />
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>{children}</div>
      </main>
    </div>
  )
}
