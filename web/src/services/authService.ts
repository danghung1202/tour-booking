// --- MOCK IMPLEMENTATION FOR DEVELOPMENT ONLY ---
// This file simulates Supabase Auth for local development.
// Replace with actual Supabase calls before production.

// Mock user data that mimics the structure of a real user profile
const mockAdminUser = {
  id: "3fa1a2b0-7d87-4234-80ec-24631707de55", // Example UUID
  email: "admin@booking.com",
  role: "admin", // This is critical for passing the dashboard's authorization check
  name: "Admin",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

const mockGuideUser = {
  id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11", // Example UUID
  email: "guide@booking.com",
  role: "guide", // This is critical for passing the dashboard's authorization check
  name: "Hung Dang",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

const mockTouristUser = {
  id: "b1ffcd88-8d1c-5fg9-cc7e-7cc0ce491b22", // Example UUID
  email: "tourist@booking.com",
  role: "tourist",
  name: "Jane Smith",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

// Mock session data
const mockSession = {
  access_token: "mock-access-token-12345",
  refresh_token: "mock-refresh-token-67890",
  expires_at: Date.now() + 3600000, // 1 hour from now
  token_type: "bearer",
  user: mockGuideUser,
}

// LocalStorage keys
const STORAGE_KEYS = {
  USER: "mock_auth_user",
  SESSION: "mock_auth_session",
} as const

// Helper functions for localStorage operations
const storage = {
  setItem(key: string, value: any) {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.warn("Failed to save to localStorage:", error)
      }
    }
  },

  getItem<T>(key: string): T | null {
    if (typeof window !== "undefined") {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (error) {
        console.warn("Failed to read from localStorage:", error)
        return null
      }
    }
    return null
  },

  removeItem(key: string) {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(key)
      } catch (error) {
        console.warn("Failed to remove from localStorage:", error)
      }
    }
  },

  clear() {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEYS.USER)
        localStorage.removeItem(STORAGE_KEYS.SESSION)
      } catch (error) {
        console.warn("Failed to clear localStorage:", error)
      }
    }
  },
}

// Helper functions to get current user/session from localStorage
const getCurrentUserFromStorage = () => {
  return storage.getItem<typeof mockAdminUser | typeof mockGuideUser | typeof mockTouristUser>(STORAGE_KEYS.USER)
}

const getCurrentSessionFromStorage = () => {
  return storage.getItem<typeof mockSession>(STORAGE_KEYS.SESSION)
}

// Helper function to save user and session to localStorage
const saveUserSession = (user: typeof mockAdminUser | typeof mockGuideUser | typeof mockTouristUser) => {
  const session = {
    ...mockSession,
    user,
    expires_at: Date.now() + 3600000, // Reset expiration to 1 hour from now
  }

  storage.setItem(STORAGE_KEYS.USER, user)
  storage.setItem(STORAGE_KEYS.SESSION, session)
}

export const authService = {
  /**
   * Simulates user registration with hardcoded response.
   */
  async register(email: string, password: string): Promise<void> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For development, we'll simulate successful registration
      // and automatically log in as a tourist
      console.log("Mock registration successful for:", email)

      // Create tourist user with provided email
      const newTouristUser = { ...mockTouristUser, email }

      // Save to localStorage
      saveUserSession(newTouristUser)

      console.log("User registered and logged in successfully:", newTouristUser.email)
    } catch (error) {
      console.error("Mock registration error:", error)
      throw new Error("Registration failed. Please try again.")
    }
  },

  /**
   * Simulates user login with hardcoded credentials.
   */
  async login(email: string, password: string): Promise<void> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Check hardcoded admin credentials
      if (email === "admin@booking.com" && password === "Tour@2025") {
        console.log("Mock login successful for admin")
        saveUserSession(mockAdminUser)
        return
      }

      // Check hardcoded guide credentials
      if (email === "guide@booking.com" && password === "Tour@2025") {
        console.log("Mock login successful for guide")
        saveUserSession(mockGuideUser)
        return
      }

      // Check hardcoded tourist credentials
      if (email === "tourist@booking.com" && password === "Tour@2025") {
        console.log("Mock login successful for tourist")
        saveUserSession(mockTouristUser)
        return
      }

      // Invalid credentials
      console.error("Mock login failed: Invalid credentials")
      throw new Error("Invalid email or password")
    } catch (error) {
      console.error("Login error:", error)

      if (error instanceof Error) {
        throw error
      }

      throw new Error("Login failed. Please try again.")
    }
  },

  /**
   * Simulates user logout.
   */
  async logout(): Promise<void> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      console.log("Mock logout successful")

      // Clear localStorage
      storage.clear()
    } catch (error) {
      console.error("Logout error:", error)
      throw new Error("Logout failed. Please try again.")
    }
  },

  /**
   * Returns the current mock user from localStorage.
   */
  async getCurrentUser() {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 200))

      const user = getCurrentUserFromStorage()

      // Check if session is expired
      if (user) {
        const session = getCurrentSessionFromStorage()
        if (session && session.expires_at < Date.now()) {
          console.log("Session expired, clearing storage")
          storage.clear()
          return null
        }
      }

      return user
    } catch (error) {
      console.error("Get current user error:", error)
      return null
    }
  },

  /**
   * Returns the current mock session from localStorage.
   */
  async getSession() {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 200))

      const session = getCurrentSessionFromStorage()

      // Check if session is expired
      if (session && session.expires_at < Date.now()) {
        console.log("Session expired, clearing storage")
        storage.clear()
        return null
      }

      return session
    } catch (error) {
      console.error("Get session error:", error)
      return null
    }
  },

  /**
   * Checks if user is authenticated.
   */
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser()
    return user !== null
  },

  /**
   * Gets the current user's role.
   */
  async getUserRole(): Promise<string | null> {
    const user = await this.getCurrentUser()
    return user?.role || null
  },

  /**
   * Refreshes the current session expiration time.
   */
  async refreshSession(): Promise<void> {
    const user = getCurrentUserFromStorage()
    if (user) {
      saveUserSession(user)
      console.log("Session refreshed")
    }
  },

  /**
   * Checks if the current session is valid (not expired).
   */
  async isSessionValid(): Promise<boolean> {
    const session = getCurrentSessionFromStorage()
    if (!session) return false

    return session.expires_at > Date.now()
  },

  /**
   * Updates the current user's password.
   */
  async updatePassword(newPassword: string): Promise<void> {
    try {
      console.log("Updating user password...")

      // Validate password strength
      if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long")
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate occasional API errors for testing
      if (Math.random() < 0.05) {
        throw new Error("Failed to update password - server error")
      }

      console.log("Password updated successfully")

      // In production, this would be:
      // const { error } = await supabase.auth.updateUser({
      //   password: newPassword
      // })
      // if (error) throw error
    } catch (error) {
      console.error("Password update error:", error)

      if (error instanceof Error) {
        throw error
      }

      throw new Error("Failed to update password. Please try again.")
    }
  },
}

// Export mock Supabase client for compatibility (if needed elsewhere)
export const supabase = {
  auth: {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      await authService.login(email, password)
      const user = getCurrentUserFromStorage()
      const session = getCurrentSessionFromStorage()
      return {
        data: { user, session },
        error: null,
      }
    },
    signOut: async () => {
      await authService.logout()
      return { error: null }
    },
    getUser: async () => {
      const user = await authService.getCurrentUser()
      return { data: { user }, error: null }
    },
    getSession: async () => {
      const session = await authService.getSession()
      return { data: { session }, error: null }
    },
  },
}
