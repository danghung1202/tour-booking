import type { Category } from "@/packages/types"

const mockCategories: Category[] = [
  {
    id: "cat-001",
    name: "Cultural",
    description: "Explore local culture, history, and traditions",
    created_at: new Date("2024-01-01T00:00:00Z").toISOString(),
    updated_at: new Date("2024-01-01T00:00:00Z").toISOString(),
  },
  {
    id: "cat-002",
    name: "Adventure",
    description: "Outdoor activities and thrilling experiences",
    created_at: new Date("2024-01-01T00:00:00Z").toISOString(),
    updated_at: new Date("2024-01-01T00:00:00Z").toISOString(),
  },
  {
    id: "cat-003",
    name: "Food & Culture",
    description: "Culinary experiences and local cuisine",
    created_at: new Date("2024-01-01T00:00:00Z").toISOString(),
    updated_at: new Date("2024-01-01T00:00:00Z").toISOString(),
  },
  {
    id: "cat-004",
    name: "Water Sports",
    description: "Ocean, lake, and river activities",
    created_at: new Date("2024-01-01T00:00:00Z").toISOString(),
    updated_at: new Date("2024-01-01T00:00:00Z").toISOString(),
  },
  {
    id: "cat-005",
    name: "Wine & Dining",
    description: "Wine tastings and gourmet experiences",
    created_at: new Date("2024-01-01T00:00:00Z").toISOString(),
    updated_at: new Date("2024-01-01T00:00:00Z").toISOString(),
  },
  {
    id: "cat-006",
    name: "Photography",
    description: "Photography workshops and scenic tours",
    created_at: new Date("2024-01-01T00:00:00Z").toISOString(),
    updated_at: new Date("2024-01-01T00:00:00Z").toISOString(),
  }
]

export const categoryService = {
  async getAll(): Promise<Category[]> {
    console.log("Fetching all categories...")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Simulate occasional API errors for testing
    if (Math.random() < 0.02) {
      throw new Error("Failed to fetch categories from API")
    }

    return mockCategories

    // In production, this would be:
    // const response = await fetch('/api/v1/categories')
    // if (!response.ok) {
    //   throw new Error('Failed to fetch categories')
    // }
    // return response.json()
  },

  async getById(id: string): Promise<Category> {
    console.log("Fetching category by ID:", id)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    const category = mockCategories.find((c) => c.id === id)

    if (!category) {
      throw new Error("Category not found")
    }

    return category

    // In production, this would be:
    // const response = await fetch(`/api/v1/categories/${id}`)
    // if (!response.ok) {
    //   throw new Error('Failed to fetch category')
    // }
    // return response.json()
  },
}
