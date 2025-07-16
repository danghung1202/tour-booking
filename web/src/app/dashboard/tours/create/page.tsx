"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Tour } from "@/packages/types"
import { tourService } from "@/services/tourService"
import { categoryService } from "@/services/categoryService"
import TourImageUploader from "@/components/features/TourImageUploader"
import RichTextEditor from "@/components/features/RichTextEditor"
import styles from "./page.module.css"

interface Category {
  id: string
  name: string
}

interface FormErrors {
  title?: string
  description?: string
  price?: string
  duration?: string
  location?: string
  maxParticipants?: string
  category_id?: string
  languages?: string
  time_zone?: string
  available_time_slots?: string
  general?: string
}

export default function CreateTourPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [errors, setErrors] = useState<FormErrors>({})

  // Predefined options
  const availableLanguages = [
    "English",
    "Vietnamese",
    "French",
    "Japanese",
    "Spanish",
    "German",
    "Italian",
    "Korean",
    "Chinese",
  ]
  const availableTimeZones = [
    "Asia/Ho_Chi_Minh",
    "Europe/Paris",
    "America/New_York",
    "America/Los_Angeles",
    "Asia/Tokyo",
    "Australia/Sydney",
    "Europe/London",
    "Asia/Singapore",
  ]

  const [formData, setFormData] = useState<
    Omit<Tour, "id" | "category" | "rating" | "featured" | "createdAt" | "updatedAt">
  >({
    title: "",
    description: "",
    story_html: "",
    price: 0,
    duration: "",
    location: "",
    maxParticipants: 1,
    images: [],
    general_availability_info: "",
    category_id: "",
    languages: [],
    time_zone: "",
    available_time_slots: [],
  })

  // Time slot management state
  const [currentTimeInput, setCurrentTimeInput] = useState("")
  const [editingTimeIndex, setEditingTimeIndex] = useState<number | null>(null)

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true)
        const fetchedCategories = await categoryService.getAll()
        setCategories(fetchedCategories)
      } catch (error) {
        console.error("Failed to load categories:", error)
        setErrors({ general: "Failed to load categories. Please refresh the page." })
      } finally {
        setIsLoadingCategories(false)
      }
    }

    loadCategories()
  }, [])

  const handleInputChange = (field: keyof typeof formData, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    const updatedLanguages = checked
      ? [...formData.languages, language]
      : formData.languages.filter((lang) => lang !== language)

    handleInputChange("languages", updatedLanguages)
  }

  const handleAddTimeSlot = () => {
    if (!currentTimeInput.trim()) return

    const newTimeSlots = [...formData.available_time_slots]

    if (editingTimeIndex !== null) {
      // Update existing time slot
      newTimeSlots[editingTimeIndex] = currentTimeInput
      setEditingTimeIndex(null)
    } else {
      // Add new time slot if it doesn't already exist
      if (!newTimeSlots.includes(currentTimeInput)) {
        newTimeSlots.push(currentTimeInput)
      }
    }

    // Sort time slots chronologically
    newTimeSlots.sort()

    handleInputChange("available_time_slots", newTimeSlots)
    setCurrentTimeInput("")
  }

  const handleEditTimeSlot = (index: number) => {
    setCurrentTimeInput(formData.available_time_slots[index])
    setEditingTimeIndex(index)
  }

  const handleRemoveTimeSlot = (index: number) => {
    const newTimeSlots = formData.available_time_slots.filter((_, i) => i !== index)
    handleInputChange("available_time_slots", newTimeSlots)

    // Reset editing state if we're removing the item being edited
    if (editingTimeIndex === index) {
      setEditingTimeIndex(null)
      setCurrentTimeInput("")
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Tour title is required"
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Tour title must be at least 5 characters"
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "Tour title must be less than 100 characters"
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Tour description is required"
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters"
    } else if (formData.description.trim().length > 1000) {
      newErrors.description = "Description must be less than 1000 characters"
    }

    // Price validation
    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0"
    } else if (formData.price > 10000) {
      newErrors.price = "Price must be less than $10,000"
    }

    // Duration validation
    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required"
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    // Capacity validation
    if (formData.maxParticipants < 1) {
      newErrors.maxParticipants = "Capacity must be at least 1"
    } else if (formData.maxParticipants > 50) {
      newErrors.maxParticipants = "Capacity cannot exceed 50 people"
    }

    // Category validation
    if (!formData.category_id) {
      newErrors.category_id = "Please select a category"
    }

    // Languages validation
    if (formData.languages.length === 0) {
      newErrors.languages = "At least one language must be selected"
    }

    // Time zone validation
    if (!formData.time_zone) {
      newErrors.time_zone = "Please select a time zone"
    }

    // Time slots validation
    if (formData.available_time_slots.length === 0) {
      newErrors.available_time_slots = "At least one time slot must be added"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      await tourService.createTour(formData)
      // Redirect to My Tours page on success
      router.push("/dashboard/tours")
    } catch (error) {
      console.error("Failed to create tour:", error)
      setErrors({
        general: error instanceof Error ? error.message : "Failed to create tour. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push("/dashboard/tours")
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Create a New Tour</h1>
        <p className={styles.subtitle}>Fill in the details below to create your new tour listing</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {errors.general && <div className={styles.generalError}>{errors.general}</div>}

        {/* Basic Information Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Basic Information</h2>

          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>
              Tour Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
              placeholder="Enter an engaging tour title"
              disabled={isSubmitting}
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="description" className={styles.label}>
              Tour Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={`${styles.textarea} ${errors.description ? styles.inputError : ""}`}
              placeholder="Describe what makes your tour special and what guests can expect"
              rows={4}
              disabled={isSubmitting}
            />
            {errors.description && <span className={styles.error}>{errors.description}</span>}
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="price" className={styles.label}>
                Price (USD) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price || ""}
                onChange={(e) => handleInputChange("price", Number(e.target.value) || 0)}
                className={`${styles.input} ${errors.price ? styles.inputError : ""}`}
                placeholder="0"
                min="1"
                max="10000"
                disabled={isSubmitting}
              />
              {errors.price && <span className={styles.error}>{errors.price}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="duration" className={styles.label}>
                Duration *
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className={`${styles.input} ${errors.duration ? styles.inputError : ""}`}
                placeholder="e.g., 3 hours, Half day, Full day"
                disabled={isSubmitting}
              />
              {errors.duration && <span className={styles.error}>{errors.duration}</span>}
            </div>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="location" className={styles.label}>
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className={`${styles.input} ${errors.location ? styles.inputError : ""}`}
                placeholder="Where does the tour take place?"
                disabled={isSubmitting}
              />
              {errors.location && <span className={styles.error}>{errors.location}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="maxParticipants" className={styles.label}>
                Max Participants *
              </label>
              <input
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={(e) => handleInputChange("maxParticipants", Number(e.target.value) || 1)}
                className={`${styles.input} ${errors.maxParticipants ? styles.inputError : ""}`}
                min="1"
                max="50"
                disabled={isSubmitting}
              />
              {errors.maxParticipants && <span className={styles.error}>{errors.maxParticipants}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="category_id" className={styles.label}>
              Category *
            </label>
            {isLoadingCategories ? (
              <div className={styles.loadingSelect}>Loading categories...</div>
            ) : (
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={(e) => handleInputChange("category_id", e.target.value)}
                className={`${styles.select} ${errors.category_id ? styles.inputError : ""}`}
                disabled={isSubmitting}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
            {errors.category_id && <span className={styles.error}>{errors.category_id}</span>}
          </div>
        </section>

        {/* Tour Languages Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tour Languages *</h2>
          <p className={styles.sectionDescription}>
            Select all languages you can conduct this tour in. This helps travelers find tours in their preferred
            language.
          </p>
          <div className={styles.checkboxGrid}>
            {availableLanguages.map((language) => (
              <label key={language} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.languages.includes(language)}
                  onChange={(e) => handleLanguageChange(language, e.target.checked)}
                  className={styles.checkbox}
                  disabled={isSubmitting}
                />
                <span className={styles.checkboxText}>{language}</span>
              </label>
            ))}
          </div>
          {errors.languages && <span className={styles.error}>{errors.languages}</span>}
        </section>

        {/* Time Zone Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tour Time Zone *</h2>
          <p className={styles.sectionDescription}>
            Select the time zone where your tour takes place. This helps travelers understand the local time for
            bookings.
          </p>
          <div className={styles.field}>
            <select
              value={formData.time_zone}
              onChange={(e) => handleInputChange("time_zone", e.target.value)}
              className={`${styles.select} ${errors.time_zone ? styles.inputError : ""}`}
              disabled={isSubmitting}
            >
              <option value="">Select a time zone</option>
              {availableTimeZones.map((timezone) => (
                <option key={timezone} value={timezone}>
                  {timezone.replace("_", " ")}
                </option>
              ))}
            </select>
            {errors.time_zone && <span className={styles.error}>{errors.time_zone}</span>}
          </div>
        </section>

        {/* Available Start Times Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Available Start Times *</h2>
          <p className={styles.sectionDescription}>
            Add the times when your tour can start. Travelers will be able to select from these options when booking.
          </p>

          <div className={styles.timeSlotInput}>
            <input
              type="time"
              value={currentTimeInput}
              onChange={(e) => setCurrentTimeInput(e.target.value)}
              className={styles.input}
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={handleAddTimeSlot}
              disabled={!currentTimeInput.trim() || isSubmitting}
              className={styles.addTimeButton}
            >
              {editingTimeIndex !== null ? "Update Time" : "Add Time"}
            </button>
          </div>

          {formData.available_time_slots.length > 0 && (
            <div className={styles.timeSlotList}>
              {formData.available_time_slots.map((timeSlot, index) => (
                <div key={index} className={styles.timeSlotChip}>
                  <span className={styles.timeSlotText} onClick={() => handleEditTimeSlot(index)}>
                    {timeSlot}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTimeSlot(index)}
                    className={styles.removeTimeButton}
                    disabled={isSubmitting}
                    aria-label={`Remove ${timeSlot} time slot`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          {errors.available_time_slots && <span className={styles.error}>{errors.available_time_slots}</span>}
        </section>

        {/* Images Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tour Images</h2>
          <p className={styles.sectionDescription}>
            Upload high-quality images that showcase your tour. The first image will be used as the main cover photo.
          </p>
          <TourImageUploader
            images={formData.images}
            onImagesChange={(images) => handleInputChange("images", images)}
            disabled={isSubmitting}
          />
        </section>

        {/* Guide's Story Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Your Guide's Story</h2>
          <p className={styles.sectionDescription}>
            Share your personal story and what makes this tour special. This helps guests connect with you and
            understand your passion.
          </p>
          <RichTextEditor
            content={formData.story_html}
            onChange={(content) => handleInputChange("story_html", content)}
            disabled={isSubmitting}
          />
        </section>

        {/* Availability Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>General Availability</h2>
          <div className={styles.field}>
            <label htmlFor="general_availability_info" className={styles.label}>
              Availability Information
            </label>
            <textarea
              id="general_availability_info"
              name="general_availability_info"
              value={formData.general_availability_info}
              onChange={(e) => handleInputChange("general_availability_info", e.target.value)}
              className={styles.textarea}
              placeholder="Describe when your tour is available (e.g., 'Available daily except Sundays', 'Seasonal tour - April to October')"
              rows={3}
              disabled={isSubmitting}
            />
          </div>
        </section>

        {/* Form Actions */}
        <div className={styles.actions}>
          <button type="button" onClick={handleCancel} className={styles.cancelButton} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
            {isSubmitting ? "Creating Tour..." : "Save as Draft"}
          </button>
        </div>
      </form>
    </div>
  )
}
