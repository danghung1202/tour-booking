"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/authService"
import styles from "./RegisterForm.module.css"

type FormData = {
  email: string
  password: string
  confirmPassword: string
}

type FormErrors = {
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}

export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      await authService.register(formData.email, formData.password)
      // User is automatically logged in after successful registration
      router.push("/")
    } catch (error) {
      console.error("Registration failed:", error)
      setErrors({
        general: error instanceof Error ? error.message : "Registration failed. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {errors.general && <div className={styles.generalError}>{errors.general}</div>}

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          placeholder="Enter your email address"
          disabled={isSubmitting}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          Password *
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
          placeholder="Create a strong password"
          disabled={isSubmitting}
        />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password *
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
          placeholder="Confirm your password"
          disabled={isSubmitting}
        />
        {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
      </div>

      <div className={styles.passwordHints}>
        <p className={styles.hintTitle}>Password requirements:</p>
        <ul className={styles.hintList}>
          <li className={formData.password.length >= 8 ? styles.hintValid : styles.hintInvalid}>
            At least 8 characters
          </li>
          <li className={/(?=.*[a-z])/.test(formData.password) ? styles.hintValid : styles.hintInvalid}>
            One lowercase letter
          </li>
          <li className={/(?=.*[A-Z])/.test(formData.password) ? styles.hintValid : styles.hintInvalid}>
            One uppercase letter
          </li>
          <li className={/(?=.*\d)/.test(formData.password) ? styles.hintValid : styles.hintInvalid}>One number</li>
        </ul>
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  )
}
