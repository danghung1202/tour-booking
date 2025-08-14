"use client"

import { useState } from "react"
import MobileMenuButton from "./MobileMenuButton"
import MobileNav from "./MobileNav"
import { authClientService } from "@/services/authClientService"
import { AuthenticatedUser } from "@/types/database.types"

interface MobileMenuProps {
  user: AuthenticatedUser | null
  navigationLinks: { href: string; label: string }[]
  moreMenuItems: { href: string; label: string }[]
}

export default function MobileMenu({ user, navigationLinks, moreMenuItems }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    try {
      await authClientService.logout()
      window.location.href = "/"
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <>
      <MobileMenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MobileNav
        user={user}
        isMenuOpen={isMenuOpen}
        navigationLinks={navigationLinks}
        moreMenuItems={moreMenuItems}
        handleLogout={handleLogout}
        setIsMenuOpen={setIsMenuOpen}
      />
    </>
  )
} 