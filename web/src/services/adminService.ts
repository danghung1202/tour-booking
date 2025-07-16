// Mock admin service for managing users and platform data
export interface AdminUser {
  id: string
  name: string
  email: string
  role: "tourist" | "guide" | "admin"
  created_at: string
  last_login?: string
  status: "active" | "suspended"
}

export interface AdminStats {
  totalUsers: number
  totalTours: number
  totalBookings: number
  revenue: number
}

// Mock data
const mockUsers: AdminUser[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    role: "tourist",
    created_at: "2024-01-15T10:30:00Z",
    last_login: "2024-01-20T14:22:00Z",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "guide",
    created_at: "2024-01-10T09:15:00Z",
    last_login: "2024-01-19T16:45:00Z",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike.wilson@email.com",
    role: "tourist",
    created_at: "2024-01-12T11:20:00Z",
    last_login: "2024-01-18T13:30:00Z",
    status: "active",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    role: "guide",
    created_at: "2024-01-08T08:45:00Z",
    last_login: "2024-01-20T10:15:00Z",
    status: "active",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@email.com",
    role: "tourist",
    created_at: "2024-01-05T14:30:00Z",
    last_login: "2024-01-17T12:20:00Z",
    status: "suspended",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    role: "guide",
    created_at: "2024-01-03T16:10:00Z",
    last_login: "2024-01-19T09:40:00Z",
    status: "active",
  },
  {
    id: "7",
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    role: "tourist",
    created_at: "2024-01-01T12:00:00Z",
    last_login: "2024-01-16T15:25:00Z",
    status: "active",
  },
  {
    id: "8",
    name: "Jennifer Martinez",
    email: "jennifer.martinez@email.com",
    role: "guide",
    created_at: "2023-12-28T10:45:00Z",
    last_login: "2024-01-20T11:30:00Z",
    status: "active",
  },
]

export const adminService = {
  // Get all users with optional search and pagination
  async getUsers(
    search?: string,
    page = 1,
    limit = 10,
  ): Promise<{
    users: AdminUser[]
    total: number
    page: number
    totalPages: number
  }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filteredUsers = mockUsers

    // Apply search filter
    if (search && search.trim()) {
      const searchLower = search.toLowerCase()
      filteredUsers = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.role.toLowerCase().includes(searchLower),
      )
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return {
      users: paginatedUsers,
      total: filteredUsers.length,
      page,
      totalPages: Math.ceil(filteredUsers.length / limit),
    }
  },

  // Update user role
  async updateUserRole(userId: string, newRole: "tourist" | "guide" | "admin"): Promise<AdminUser> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Simulate random API errors (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Failed to update user role. Please try again.")
    }

    const userIndex = mockUsers.findIndex((user) => user.id === userId)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    mockUsers[userIndex].role = newRole
    return mockUsers[userIndex]
  },

  // Update user status
  async updateUserStatus(userId: string, status: "active" | "suspended"): Promise<AdminUser> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Simulate random API errors (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Failed to update user status. Please try again.")
    }

    const userIndex = mockUsers.findIndex((user) => user.id === userId)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    mockUsers[userIndex].status = status
    return mockUsers[userIndex]
  },

  // Get admin dashboard stats
  async getStats(): Promise<AdminStats> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    return {
      totalUsers: mockUsers.length,
      totalTours: 45,
      totalBookings: 128,
      revenue: 15420,
    }
  },
}
