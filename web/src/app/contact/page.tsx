"use client"

import type React from "react"

import { useState } from "react"
import styles from "./page.module.css"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (err) {
      setError("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>Have questions about our tours or need assistance?<br/> We're here to help!</p>
      </div>

      <div className={styles.content}>
        {/* Left Column - Contact Form */}
        <div className={styles.formColumn}>
          <h2 className={styles.sectionTitle}>Send Us a Message</h2>

          {isSubmitted ? (
            <div className={styles.successMessage}>
              <h3>Thank you for your message!</h3>
              <p>We'll get back to you shortly.</p>
              <button className={styles.resetButton} onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                  placeholder="Your full name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="What is this regarding?"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className={styles.textarea}
                  placeholder="Tell us how we can help you..."
                  rows={6}
                />
              </div>

              {error && <div className={styles.errorMessage}>{error}</div>}

              <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          )}
        </div>

        {/* Right Column - Contact Information */}
        <div className={styles.infoColumn}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>

          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <h3 className={styles.contactLabel}>Email</h3>
              <p className={styles.contactValue}>
                For general inquiries, email us at{" "}
                <a href="mailto:support@uniquetours.com" className={styles.emailLink}>
                  support@uniquetours.com
                </a>
              </p>
            </div>

            <div className={styles.contactItem}>
              <h3 className={styles.contactLabel}>Address</h3>
              <p className={styles.contactValue}>Our Office: 123 Travel Lane, Hoan Kiem District, Hanoi, Vietnam</p>
            </div>

            <div className={styles.contactItem}>
              <h3 className={styles.contactLabel}>Business Hours</h3>
              <p className={styles.contactValue}>Monday – Friday, 9:00 AM – 5:00 PM (+07)</p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapIcon}>📍</div>
              <p>Interactive Map</p>
              <small>Location: Hanoi, Vietnam</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
