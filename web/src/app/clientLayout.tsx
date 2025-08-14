import type React from "react"
import { headers } from "next/headers"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"

interface Props {
  children: React.ReactNode
}

export default async function ClientLayout({ children }: Props) {
  const heads = await headers()
  const pathname = heads.get("x-next-pathname") ?? ""
  const isDashboard = pathname.startsWith("/dashboard")
  const isAdmin = pathname.startsWith("/admin")

  return (
    <>
      {!isDashboard && !isAdmin && <Header />}
      <main>{children}</main>
      {!isDashboard && !isAdmin && <Footer />}
    </>
  )
}
