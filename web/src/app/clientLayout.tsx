"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"

interface Props {
  children: React.ReactNode
}

export default function ClientLayout({ children }: Props) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith("/dashboard")
  const isAdmin = pathname?.startsWith("/admin")

  return (
    <>
      {!isDashboard && !isAdmin && <Header />}
      <main>{children}</main>
      {!isDashboard && !isAdmin && <Footer />}
    </>
  )
}
