import type { Category } from "@/types/database.types";
import { categoriesTable, getAllCategories } from "@/lib/database";

// Keep mock data for fallback and development purposes
const mockCategories: Category[] = [
  {
    id: "cat-001",
    name: "Day tours",
    description: "Explore local attractions and sights during daytime hours",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    created_at: new Date("2024-01-01T00:00:00Z").toISOString(),
  },
  {
    id: "cat-002",
    name: "Night tours",
    description: "Experience the city after dark with evening and night activities",
    image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35",
    created_at: new Date("2024-01-01T00:00:00Z").toISOString(),
  },
  {
    id: "cat-003",
    name: "Adventure",
    description: "Thrilling outdoor activities and adrenaline-pumping experiences",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
    created_at: new Date("2024-01-01T00:00:00Z").toISOString(),
  },
  {
    id: "cat-004",
    name: "Cultural",
    description: "Immerse yourself in local traditions, history, and heritage",
    image: "https://images.unsplash.com/photo-1523730205978-59fd1b2965e3",
    created_at: new Date("2024-01-01T00:00:00Z").toISOString(),
  },
  {
    id: "cat-005",
    name: "Culinary",
    description: "Taste local cuisine and discover food traditions",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    created_at: new Date("2024-01-01T00:00:00Z").toISOString(),
  }
];

export const categoryService = {
  async getAll(): Promise<Category[]> {
    console.log("Fetching all categories from database...");

    try {
      // Use the database helper function to get all categories
      const categories = await getAllCategories();
      
      // If we got categories from the database, return them
      if (categories && categories.length > 0) {
        return categories;
      }
      
      // Fallback to mock data if the database query fails or returns empty
      console.warn("No categories found in database, using mock data");
      return mockCategories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      
      // Fallback to mock data in case of error
      console.warn("Error fetching categories from database, using mock data");
      return mockCategories;
    }
  },

  async getById(id: string): Promise<Category | null> {
    console.log("Fetching category by ID:", id);

    try {
      // Query the database for the category with the given ID
      const { data, error } = await categoriesTable()
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        throw error;
      }
      
      return data as Category;
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      
      // Fallback to mock data in case of error
      const mockCategory = mockCategories.find((c) => c.id === id);
      if (mockCategory) {
        console.warn("Using mock data for category:", id);
        return mockCategory;
      }
      
      return null;
    }
  },

};
