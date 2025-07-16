"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/authService"
import styles from "./LoginForm.module.css"

type FormData = {
  email: string
  password: string
}

type FormErrors = {
  email?: string
  password?: string
  general?: string
}

export default function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
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
      await authService.login(formData.email, formData.password)
      router.push("/")
    } catch (error) {
      console.error("Login failed:", error)
      setErrors({
        general: error instanceof Error ? error.message : "Login failed. Please check your credentials and try again.",
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
          placeholder="Enter your password"
          disabled={isSubmitting}
        />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
      </div>

      <div className={styles.forgotPassword}>
        <a href="#" className={styles.forgotLink}>
          Forgot your password?
        </a>
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
    </form>
  )
}
