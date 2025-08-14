import type React from "react"
import { redirect } from "next/navigation"
import DashboardSidebar from "@/components/features/DashboardSidebar"
import styles from "./layout.module.css"
import { createClient } from '@/lib/supabase/server';
import { AuthService } from '@/services/authService';

export const metadata = {
  title: "Guide Dashboard - Unique Tours",
  description: "Tour guide dashboard for managing tours, bookings, and availability",
}

export default async function DashboardLayout({
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

    // Check authorization - must be a guide
    if (user.role !== "guide") {
      redirect("/");
    }

    return (
      <div className={styles.dashboardLayout}>
        {/* Left Column - Sidebar */}
        <aside className={styles.sidebar}>
          <DashboardSidebar user={user} />
        </aside>

        {/* Right Column - Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.contentWrapper}>{children}</div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Dashboard layout error:", error);
    redirect("/login");
  }
}
