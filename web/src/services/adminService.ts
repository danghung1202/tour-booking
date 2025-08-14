// Mock admin service for managing users and platform data
import { SupabaseClient } from "@supabase/supabase-js";

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

export class AdminService {
  private supabase: SupabaseClient<any, "app", any>;

  constructor(supabaseClient: SupabaseClient<any, "app", any>) {
    this.supabase = supabaseClient;
  }

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
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In a real app, this would query the database
      // const query = this.supabase.from('profiles').select('*')
      // if (search && search.trim()) {
      //   const searchTerm = `%${search.toLowerCase()}%`
      //   query.or(`name.ilike.${searchTerm},email.ilike.${searchTerm},role.ilike.${searchTerm}`)
      // }
      // const { data, error, count } = await query
      //   .range((page - 1) * limit, page * limit - 1)
      //   .order('created_at', { ascending: false })
      // if (error) throw error
      
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
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  // Update user role
  async updateUserRole(userId: string, newRole: "tourist" | "guide" | "admin"): Promise<AdminUser> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      // In a real app, this would update the database
      // const { data, error } = await this.supabase
      //   .from('profiles')
      //   .update({ role: newRole })
      //   .eq('id', userId)
      //   .select()
      //   .single()
      // if (error) throw error
      // return data

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
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error;
    }
  }

  // Update user status
  async updateUserStatus(userId: string, status: "active" | "suspended"): Promise<AdminUser> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      // In a real app, this would update the database
      // const { data, error } = await this.supabase
      //   .from('profiles')
      //   .update({ status: status })
      //   .eq('id', userId)
      //   .select()
      //   .single()
      // if (error) throw error
      // return data

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
    } catch (error) {
      console.error("Error updating user status:", error);
      throw error;
    }
  }

  // Get admin dashboard stats
  async getStats(): Promise<AdminStats> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 400))

      // In a real app, this would query the database for stats
      // const { data: userCount, error: userError } = await this.supabase
      //   .from('profiles')
      //   .select('count')
      // const { data: tourCount, error: tourError } = await this.supabase
      //   .from('tours')
      //   .select('count')
      // ... etc.

      return {
        totalUsers: mockUsers.length,
        totalTours: 45,
        totalBookings: 128,
        revenue: 15420,
      }
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      throw error;
    }
  }
}
