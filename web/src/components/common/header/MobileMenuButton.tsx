"use client"

import { FC } from "react"
import styles from "./MobileMenuButton.module.css"

interface MobileMenuButtonProps {
  isMenuOpen: boolean
  toggleMenu: () => void
}

const MobileMenuButton: FC<MobileMenuButtonProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <button className={styles.mobileMenuButton} onClick={toggleMenu} aria-label="Toggle navigation menu">
      <span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
  )
}

export default MobileMenuButton 