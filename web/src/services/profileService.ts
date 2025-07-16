import type { Profile } from "@/packages/types"

// Mock profile data for the authenticated guide
const mockGuideProfile: Profile = {
  id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  role: "guide",
  name: "Hung Dang",
  bio: "Passionate local guide with over 8 years of experience showing visitors the hidden gems of Hanoi. I specialize in street food tours, cultural experiences, and photography walks through the Old Quarter. Born and raised in Hanoi, I love sharing the stories and traditions that make this city so special.",
  phone: "+84 123 456 789",
  photo_url: "/placeholder.svg?height=200&width=200&text=Profile+Photo",
  created_at: new Date("2023-06-15T10:00:00Z").toISOString(),
  updated_at: new Date("2024-01-20T14:30:00Z").toISOString(),
}

// Simulate file upload to Supabase Storage
const simulateFileUpload = async (file: File): Promise<string> => {
  console.log("Simulating file upload to Supabase Storage:", file.name)

  // Simulate upload progress and delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simulate occasional upload errors
  if (Math.random() < 0.05) {
    throw new Error("Upload failed - please try again")
  }

  // Return a mock URL that would come from Supabase Storage
  const timestamp = Date.now()
  const mockUrl = `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(file.name)}&t=${timestamp}`

  console.log("File uploaded successfully:", mockUrl)
  return mockUrl

  // In production, this would be:
  // const { data, error } = await supabase.storage
  //   .from('profile-photos')
  //   .upload(`${userId}/${file.name}`, file)
  // if (error) throw error
  // return supabase.storage.from('profile-photos').getPublicUrl(data.path).data.publicUrl
}

export const profileService = {
  /**
   * Fetch the current guide's profile information
   */
  async getMyProfile(): Promise<Profile> {
    console.log("Fetching current guide's profile...")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Simulate occasional API errors for testing
    if (Math.random() < 0.02) {
      throw new Error("Failed to fetch profile data")
    }

    console.log("Profile data fetched successfully")
    return { ...mockGuideProfile }

    // In production, this would be:
    // const response = await fetch('/api/v1/my-profile', {
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`
    //   }
    // })
    // if (!response.ok) {
    //   throw new Error('Failed to fetch profile')
    // }
    // return response.json()
  },

  /**
   * Update the current guide's profile information
   */
  async updateMyProfile(profileData: Partial<Profile>): Promise<void> {
    console.log("Updating profile with data:", profileData)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Simulate occasional API errors for testing
    if (Math.random() < 0.03) {
      throw new Error("Failed to update profile - server error")
    }

    // Update mock data
    Object.assign(mockGuideProfile, {
      ...profileData,
      updated_at: new Date().toISOString(),
    })

    console.log("Profile updated successfully")

    // In production, this would be:
    // const response = await fetch('/api/v1/my-profile', {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${accessToken}`
    //   },
    //   body: JSON.stringify(profileData)
    // })
    // if (!response.ok) {
    //   throw new Error('Failed to update profile')
    // }
  },

  /**
   * Upload a profile photo to Supabase Storage
   */
  async uploadProfilePhoto(file: File): Promise<string> {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("Please select a valid image file")
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image file must be smaller than 5MB")
    }

    console.log("Uploading profile photo:", file.name, `(${(file.size / 1024 / 1024).toFixed(2)}MB)`)

    try {
      const photoUrl = await simulateFileUpload(file)
      return photoUrl
    } catch (error) {
      console.error("Profile photo upload failed:", error)
      throw error
    }
  },

  /**
   * Validate profile data before submission
   */
  validateProfileData(profileData: Partial<Profile>): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {}

    // Name validation
    if (profileData.name !== undefined) {
      if (!profileData.name.trim()) {
        errors.name = "Name is required"
      } else if (profileData.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters"
      } else if (profileData.name.trim().length > 100) {
        errors.name = "Name must be less than 100 characters"
      }
    }

    // Phone validation
    if (profileData.phone !== undefined && profileData.phone.trim()) {
      const phoneRegex = /^[+]?[1-9][\d\s\-()]{7,20}$/
      if (!phoneRegex.test(profileData.phone.replace(/\s/g, ""))) {
        errors.phone = "Please enter a valid phone number"
      }
    }

    // Bio validation
    if (profileData.bio !== undefined && profileData.bio.trim()) {
      if (profileData.bio.trim().length > 1000) {
        errors.bio = "Bio must be less than 1000 characters"
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  },
}
