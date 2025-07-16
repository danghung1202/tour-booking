"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { profileService } from "@/services/profileService"
import type { Profile } from "@/packages/types"
import styles from "./page.module.css"

interface FormData {
  name: string
  phone: string
  bio: string
  photo_url: string
}

interface FormErrors {
  name?: string
  phone?: string
  bio?: string
  photo?: string
  general?: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    bio: "",
    photo_url: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true)
        setErrors({})
        const profileData = await profileService.getMyProfile()
        setProfile(profileData)
        setFormData({
          name: profileData.name || "",
          phone: profileData.phone || "",
          bio: profileData.bio || "",
          photo_url: profileData.photo_url || "",
        })
      } catch (err) {
        console.error("Failed to fetch profile:", err)
        setErrors({ general: "Failed to load profile data. Please try again." })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  // Track changes to form data
  useEffect(() => {
    if (!profile) return

    const hasFormChanges =
      formData.name !== (profile.name || "") ||
      formData.phone !== (profile.phone || "") ||
      formData.bio !== (profile.bio || "") ||
      formData.photo_url !== (profile.photo_url || "")

    setHasChanges(hasFormChanges)
  }, [formData, profile])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    // Clear success message when user makes changes
    if (successMessage) {
      setSuccessMessage(null)
    }
  }

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploadingPhoto(true)
      setErrors({ ...errors, photo: undefined })

      const photoUrl = await profileService.uploadProfilePhoto(file)
      setFormData((prev) => ({ ...prev, photo_url: photoUrl }))

      // Clear success message when photo changes
      if (successMessage) {
        setSuccessMessage(null)
      }
    } catch (err) {
      console.error("Photo upload failed:", err)
      setErrors((prev) => ({
        ...prev,
        photo: err instanceof Error ? err.message : "Failed to upload photo. Please try again.",
      }))
    } finally {
      setIsUploadingPhoto(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!hasChanges) {
      setErrors({ general: "No changes to save." })
      return
    }

    // Validate form data
    const validation = profileService.validateProfileData(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    try {
      setIsUpdating(true)
      setErrors({})
      setSuccessMessage(null)

      // Only send changed fields
      const changedFields: Partial<Profile> = {}
      if (formData.name !== (profile?.name || "")) {
        changedFields.name = formData.name
      }
      if (formData.phone !== (profile?.phone || "")) {
        changedFields.phone = formData.phone
      }
      if (formData.bio !== (profile?.bio || "")) {
        changedFields.bio = formData.bio
      }
      if (formData.photo_url !== (profile?.photo_url || "")) {
        changedFields.photo_url = formData.photo_url
      }

      await profileService.updateMyProfile(changedFields)

      // Update local profile state
      if (profile) {
        const updatedProfile = { ...profile, ...changedFields, updated_at: new Date().toISOString() }
        setProfile(updatedProfile)
      }

      setSuccessMessage("Profile updated successfully!")
      setHasChanges(false)

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (err) {
      console.error("Profile update failed:", err)
      setErrors({
        general: err instanceof Error ? err.message : "Failed to update profile. Please try again.",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handlePhotoClick = () => {
    if (!isUploadingPhoto && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const formatLastUpdated = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString))
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Profile</h1>
        </div>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (errors.general && !profile) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Profile</h1>
        </div>
        <div className={styles.error}>
          <h2>Error Loading Profile</h2>
          <p>{errors.general}</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Profile</h1>
        <p className={styles.subtitle}>Manage your public profile information that guests will see</p>
        {profile && <p className={styles.lastUpdated}>Last updated: {formatLastUpdated(profile.updated_at)}</p>}
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className={styles.successBanner}>
          <span className={styles.successIcon}>✅</span>
          <span className={styles.successText}>{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className={styles.dismissSuccess}>
            ×
          </button>
        </div>
      )}

      {/* Error Message */}
      {errors.general && (
        <div className={styles.errorBanner}>
          <span className={styles.errorIcon}>⚠️</span>
          <span className={styles.errorText}>{errors.general}</span>
          <button onClick={() => setErrors({ ...errors, general: undefined })} className={styles.dismissError}>
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Profile Photo Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Profile Photo</h2>
          <div className={styles.photoSection}>
            <div className={styles.photoContainer}>
              <img
                src={formData.photo_url || "/placeholder.svg?height=200&width=200&text=No+Photo"}
                alt="Profile"
                className={styles.profilePhoto}
              />
              {isUploadingPhoto && (
                <div className={styles.photoOverlay}>
                  <div className={styles.uploadingSpinner}></div>
                  <span className={styles.uploadingText}>Uploading...</span>
                </div>
              )}
            </div>
            <div className={styles.photoActions}>
              <button
                type="button"
                onClick={handlePhotoClick}
                disabled={isUploadingPhoto}
                className={styles.changePhotoButton}
              >
                {isUploadingPhoto ? "Uploading..." : "Change Picture"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className={styles.hiddenFileInput}
              />
              <p className={styles.photoHint}>JPG, PNG or WebP. Max size 5MB.</p>
            </div>
          </div>
          {errors.photo && <span className={styles.fieldError}>{errors.photo}</span>}
        </section>

        {/* Basic Information Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Basic Information</h2>

          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              placeholder="Enter your full name"
              disabled={isUpdating}
            />
            {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
              placeholder="Enter your phone number"
              disabled={isUpdating}
            />
            {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
            <p className={styles.fieldHint}>This will be visible to guests who book your tours</p>
          </div>
        </section>

        {/* Bio Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About You</h2>
          <div className={styles.field}>
            <label htmlFor="bio" className={styles.label}>
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className={`${styles.textarea} ${errors.bio ? styles.inputError : ""}`}
              placeholder="Tell guests about yourself, your experience, and what makes your tours special..."
              rows={6}
              disabled={isUpdating}
            />
            <div className={styles.charCount}>{formData.bio.length}/1000 characters</div>
            {errors.bio && <span className={styles.fieldError}>{errors.bio}</span>}
            <p className={styles.fieldHint}>
              This bio will appear on your public profile and help guests understand your expertise and passion for
              guiding
            </p>
          </div>
        </section>

        {/* Form Actions */}
        <div className={styles.actions}>
          <button
            type="submit"
            disabled={isUpdating || !hasChanges}
            className={`${styles.updateButton} ${!hasChanges ? styles.noChanges : ""}`}
          >
            {isUpdating ? "Updating Profile..." : hasChanges ? "Update Profile" : "No Changes to Save"}
          </button>
          {hasChanges && <p className={styles.changesHint}>You have unsaved changes</p>}
        </div>
      </form>
    </div>
  )
}
