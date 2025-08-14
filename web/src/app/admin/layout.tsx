import type React from "react"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/features/AdminSidebar"
import styles from "./layout.module.css"
import { createClient } from '@/lib/supabase/server';
import { AuthService } from '@/services/authService';

export const metadata = {
  title: "Admin Dashboard - Unique Tours",
  description: "Admin dashboard for managing users, tours, and platform data",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    // Create Supabase client
    const supabase = await createClient();
    
    // Initialize services with the Supabase client
    const authService = new AuthService(supabase);
    
    // Check authentication
    const user = await authService.getCurrentUser();

    if (!user) {
      redirect("/login");
    }

    // Check authorization - must be an admin
    if (user.role !== "admin") {
      redirect("/");
    }

    return (
      <div className={styles.adminLayout}>
        {/* Left Column - Sidebar */}
        <aside className={styles.sidebar}>
          <AdminSidebar />
        </aside>

        {/* Right Column - Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.contentWrapper}>{children}</div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Admin layout error:", error);
    redirect("/login");
  }
}
