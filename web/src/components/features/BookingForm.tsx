"use client"

import type React from "react"
import { useState } from "react"
import type { BookingRequest } from "@/packages/types"
import { bookingService } from "@/services/bookingService"
import styles from "./BookingForm.module.css"

type BookingFormProps = {
  tourId: string
  tourPrice: number
}

type FormErrors = {
  booking_date?: string
  guest_name?: string
  guest_email?: string
  phone?: string
  num_adults?: string
  num_kids?: string
}

export default function BookingForm({ tourId, tourPrice }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingRequest>({
    booking_date: "",
    guest_name: "",
    guest_email: "",
    phone: "",
    num_adults: 1,
    num_kids: 0,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const timeSlots = ["09:00", "13:30", "17:00"]
  const [selectedTime, setSelectedTime] = useState("")

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    // Basic phone validation - accepts various formats
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate selected time
    if (!selectedTime) {
      newErrors.booking_date = "Please select a time slot"
    }

    // Validate booking_date
    if (!formData.booking_date) {
      newErrors.booking_date = "Please select a booking date"
    } else {
      const selectedDate = new Date(formData.booking_date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        newErrors.booking_date = "Please select a future date"
      }
    }

    // Validate guest_name
    if (!formData.guest_name.trim()) {
      newErrors.guest_name = "Guest name is required"
    } else if (formData.guest_name.trim().length < 2) {
      newErrors.guest_name = "Guest name must be at least 2 characters"
    }

    // Validate guest_email
    if (!formData.guest_email.trim()) {
      newErrors.guest_email = "Email address is required"
    } else if (!validateEmail(formData.guest_email)) {
      newErrors.guest_email = "Please enter a valid email address"
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Validate num_adults
    if (formData.num_adults < 1) {
      newErrors.num_adults = "At least 1 adult is required"
    } else if (formData.num_adults > 20) {
      newErrors.num_adults = "Maximum 20 adults allowed"
    }

    // Validate num_kids
    if (formData.num_kids < 0) {
      newErrors.num_kids = "Number of kids cannot be negative"
    } else if (formData.num_kids > 20) {
      newErrors.num_kids = "Maximum 20 kids allowed"
    }

    // Validate total participants
    const totalParticipants = formData.num_adults + formData.num_kids
    if (totalParticipants > 20) {
      newErrors.num_adults = "Total participants cannot exceed 20"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof BookingRequest, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    // Clear time error when date changes
    if (field === "booking_date" && selectedTime && errors.booking_date) {
      setErrors((prev) => ({ ...prev, booking_date: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await bookingService.create(tourId, formData)
      setIsSubmitted(true)
      setSelectedTime("")
    } catch (error) {
      console.error("Booking submission failed:", error)
      setErrors({ guest_name: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={styles.confirmation}>
        <div className={styles.confirmationIcon}>✓</div>
        <h3 className={styles.confirmationTitle}>Booking Request Submitted!</h3>
        <p className={styles.confirmationMessage}>
          Thank you! Your booking request has been submitted successfully. We will contact you shortly to confirm your
          booking and provide payment details.
        </p>
        <div className={styles.confirmationDetails}>
          <p>
            <strong>Booking Date:</strong> {formData.booking_date}
          </p>
          <p>
            <strong>Participants:</strong> {formData.num_adults} adult{formData.num_adults !== 1 ? "s" : ""}
            {formData.num_kids > 0 ? `, ${formData.num_kids} kid${formData.num_kids !== 1 ? "s" : ""}` : ""}
          </p>
          <p>
            <strong>Contact Email:</strong> {formData.guest_email}
          </p>
        </div>
      </div>
    )
  }

  const totalParticipants = formData.num_adults + formData.num_kids
  const totalPrice = tourPrice * totalParticipants

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="booking_date" className={styles.label}>
          Booking Date *
        </label>
        <input
          type="date"
          id="booking_date"
          name="booking_date"
          value={formData.booking_date}
          onChange={(e) => handleInputChange("booking_date", e.target.value)}
          className={`${styles.input} ${errors.booking_date ? styles.inputError : ""}`}
          min={new Date().toISOString().split("T")[0]}
        />
        {errors.booking_date && <span className={styles.error}>{errors.booking_date}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Select Time Slot *</label>
        <div className={styles.timeSlots}>
          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => {
                setSelectedTime(time)
                if (errors.booking_date) {
                  setErrors((prev) => ({ ...prev, booking_date: undefined }))
                }
              }}
              className={`${styles.timeSlot} ${selectedTime === time ? styles.timeSlotSelected : ""}`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="guest_name" className={styles.label}>
          Full Name *
        </label>
        <input
          type="text"
          id="guest_name"
          name="guest_name"
          value={formData.guest_name}
          onChange={(e) => handleInputChange("guest_name", e.target.value)}
          className={`${styles.input} ${errors.guest_name ? styles.inputError : ""}`}
          placeholder="Enter your full name"
        />
        {errors.guest_name && <span className={styles.error}>{errors.guest_name}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="guest_email" className={styles.label}>
          Email Address *
        </label>
        <input
          type="email"
          id="guest_email"
          name="guest_email"
          value={formData.guest_email}
          onChange={(e) => handleInputChange("guest_email", e.target.value)}
          className={`${styles.input} ${errors.guest_email ? styles.inputError : ""}`}
          placeholder="Enter your email address"
        />
        {errors.guest_email && <span className={styles.error}>{errors.guest_email}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="phone" className={styles.label}>
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
          placeholder="Enter your phone number"
        />
        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
      </div>

      <div className={styles.participantsRow}>
        <div className={styles.field}>
          <label htmlFor="num_adults" className={styles.label}>
            Number of Adults *
          </label>
          <input
            type="number"
            id="num_adults"
            name="num_adults"
            value={formData.num_adults}
            onChange={(e) => handleInputChange("num_adults", Number.parseInt(e.target.value) || 1)}
            className={`${styles.input} ${errors.num_adults ? styles.inputError : ""}`}
            min="1"
            max="20"
          />
          {errors.num_adults && <span className={styles.error}>{errors.num_adults}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="num_kids" className={styles.label}>
            Number of Kids
          </label>
          <input
            type="number"
            id="num_kids"
            name="num_kids"
            value={formData.num_kids}
            onChange={(e) => handleInputChange("num_kids", Number.parseInt(e.target.value) || 0)}
            className={`${styles.input} ${errors.num_kids ? styles.inputError : ""}`}
            min="0"
            max="20"
          />
          {errors.num_kids && <span className={styles.error}>{errors.num_kids}</span>}
        </div>
      </div>

      <div className={styles.priceSection}>
        <div className={styles.priceBreakdown}>
          <div className={styles.priceRow}>
            <span>Adults ({formData.num_adults}):</span>
            <span>${tourPrice * formData.num_adults}</span>
          </div>
          {formData.num_kids > 0 && (
            <div className={styles.priceRow}>
              <span>Kids ({formData.num_kids}):</span>
              <span>${tourPrice * formData.num_kids}</span>
            </div>
          )}
          <div className={styles.totalRow}>
            <span>Total Price:</span>
            <span className={styles.totalPrice}>${totalPrice}</span>
          </div>
        </div>
      </div>

      <button type="submit" disabled={isSubmitting || !selectedTime} className={styles.submitButton}>
        {isSubmitting ? "Submitting..." : "Submit Booking Request"}
      </button>
    </form>
  )
}
