"use client"

import { useState } from "react"
import Link from "next/link"
import styles from "./DropdownMenu.module.css"

interface NavItem {
  href: string
  label: string
}

interface DropdownMenuProps {
  title: string
  items: NavItem[]
}

export default function DropdownMenu({ title, items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  const handleClick = () => {
    setIsOpen(false)
  }

  return (
    <div className={styles.dropdown} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className={styles.dropdownButton} aria-expanded={isOpen}>
        {title}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <ul className={styles.dropdownList}>
            {items.map((item, index) => (
              <li key={item.href} className={styles.dropdownItem}>
                <Link href={item.href} className={styles.dropdownLink} onClick={handleClick}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
