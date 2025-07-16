"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/authService"
import { profileService } from "@/services/profileService"
import type { Profile } from "@/packages/types"
import styles from "./page.module.css"

export default function ProfilePage() {
  const router = useRouter()

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Profile state
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [profileError, setProfileError] = useState<string | null>(null)

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
  })
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null)
  const [profileFormError, setProfileFormError] = useState<string | null>(null)

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser()
        if (!user) {
          router.push("/login")
          return
        }
        setCurrentUser(user)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  // Fetch profile data when authenticated
  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated) return

      try {
        setIsLoadingProfile(true)
        setProfileError(null)

        const profileData = await profileService.getMyProfile()
        setProfile(profileData)
        setProfileForm({
          name: profileData.name || "",
          phone: profileData.phone || "",
        })
      } catch (error) {
        console.error("Failed to fetch profile:", error)
        setProfileError(error instanceof Error ? error.message : "Failed to load profile")
      } finally {
        setIsLoadingProfile(false)
      }
    }

    fetchProfile()
  }, [isAuthenticated])

  // Handle profile form changes
  const handleProfileFormChange = (field: string, value: string) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }))
    // Clear success/error messages when user starts typing
    if (profileSuccess) setProfileSuccess(null)
    if (profileFormError) setProfileFormError(null)
  }

  // Handle password form changes
  const handlePasswordFormChange = (field: string, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }))
    // Clear success/error messages when user starts typing
    if (passwordSuccess) setPasswordSuccess(null)
    if (passwordError) setPasswordError(null)
  }

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      setIsUpdatingProfile(true)
      setProfileFormError(null)
      setProfileSuccess(null)

      // Validate form
      if (!profileForm.name.trim()) {
        setProfileFormError("Name is required")
        return
      }

      // Check if anything changed
      const hasChanges = profileForm.name !== (profile?.name || "") || profileForm.phone !== (profile?.phone || "")

      if (!hasChanges) {
        setProfileFormError("No changes to save")
        return
      }

      // Prepare update data
      const updateData: Partial<Profile> = {}
      if (profileForm.name !== (profile?.name || "")) {
        updateData.name = profileForm.name.trim()
      }
      if (profileForm.phone !== (profile?.phone || "")) {
        updateData.phone = profileForm.phone.trim()
      }

      // Validate data
      const validation = profileService.validateProfileData(updateData)
      if (!validation.isValid) {
        const firstError = Object.values(validation.errors)[0]
        setProfileFormError(firstError)
        return
      }

      // Update profile
      await profileService.updateMyProfile(updateData)

      // Update local state
      if (profile) {
        const updatedProfile = { ...profile, ...updateData }
        setProfile(updatedProfile)
      }

      setProfileSuccess("Profile updated successfully!")

      // Clear success message after 5 seconds
      setTimeout(() => setProfileSuccess(null), 5000)
    } catch (error) {
      console.error("Profile update failed:", error)
      setProfileFormError(error instanceof Error ? error.message : "Failed to update profile")
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  // Handle password change
  const handleChangePassword = async () => {
    try {
      setIsUpdatingPassword(true)
      setPasswordError(null)
      setPasswordSuccess(null)

      // Validate passwords
      if (!passwordForm.newPassword) {
        setPasswordError("New password is required")
        return
      }

      if (!passwordForm.confirmPassword) {
        setPasswordError("Please confirm your new password")
        return
      }

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setPasswordError("Passwords do not match")
        return
      }

      if (passwordForm.newPassword.length < 8) {
        setPasswordError("Password must be at least 8 characters long")
        return
      }

      // Update password
      await authService.updatePassword(passwordForm.newPassword)

      // Clear form
      setPasswordForm({
        newPassword: "",
        confirmPassword: "",
      })

      setPasswordSuccess("Password changed successfully!")

      // Clear success message after 5 seconds
      setTimeout(() => setPasswordSuccess(null), 5000)
    } catch (error) {
      console.error("Password change failed:", error)
      setPasswordError(error instanceof Error ? error.message : "Failed to change password")
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Show loading while fetching profile
  if (isLoadingProfile) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My Profile</h1>
        </div>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  // Show error if profile failed to load
  if (profileError) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My Profile</h1>
        </div>
        <div className={styles.error}>
          <p>Failed to load profile: {profileError}</p>
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
        <h1>My Profile</h1>
        <p>Manage your personal information and account settings</p>
      </div>

      <div className={styles.content}>
        {/* Profile Information Section */}
        <div className={styles.section}>
          <h2>Profile Information</h2>

          {profileSuccess && (
            <div className={styles.successBanner}>
              <span className={styles.successIcon}>✓</span>
              {profileSuccess}
            </div>
          )}

          {profileFormError && (
            <div className={styles.errorBanner}>
              <span className={styles.errorIcon}>⚠</span>
              {profileFormError}
            </div>
          )}

          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={currentUser?.email || ""}
                disabled
                className={`${styles.input} ${styles.disabled}`}
              />
              <p className={styles.helpText}>Your email address cannot be changed</p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={profileForm.name}
                onChange={(e) => handleProfileFormChange("name", e.target.value)}
                placeholder="Enter your full name"
                className={styles.input}
                disabled={isUpdatingProfile}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={profileForm.phone}
                onChange={(e) => handleProfileFormChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                className={styles.input}
                disabled={isUpdatingProfile}
              />
              <p className={styles.helpText}>Optional - used for booking confirmations</p>
            </div>

            <button onClick={handleUpdateProfile} disabled={isUpdatingProfile} className={styles.primaryButton}>
              {isUpdatingProfile ? (
                <>
                  <div className={styles.buttonSpinner}></div>
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </div>

        {/* Change Password Section */}
        <div className={styles.section}>
          <h2>Change Password</h2>

          {passwordSuccess && (
            <div className={styles.successBanner}>
              <span className={styles.successIcon}>✓</span>
              {passwordSuccess}
            </div>
          )}

          {passwordError && (
            <div className={styles.errorBanner}>
              <span className={styles.errorIcon}>⚠</span>
              {passwordError}
            </div>
          )}

          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="newPassword" className={styles.label}>
                New Password *
              </label>
              <input
                type="password"
                id="newPassword"
                value={passwordForm.newPassword}
                onChange={(e) => handlePasswordFormChange("newPassword", e.target.value)}
                placeholder="Enter new password"
                className={styles.input}
                disabled={isUpdatingPassword}
              />
              <p className={styles.helpText}>Must be at least 8 characters long</p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm New Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={(e) => handlePasswordFormChange("confirmPassword", e.target.value)}
                placeholder="Confirm new password"
                className={styles.input}
                disabled={isUpdatingPassword}
              />
            </div>

            <button onClick={handleChangePassword} disabled={isUpdatingPassword} className={styles.primaryButton}>
              {isUpdatingPassword ? (
                <>
                  <div className={styles.buttonSpinner}></div>
                  Changing Password...
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
