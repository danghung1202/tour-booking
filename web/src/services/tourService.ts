import type { Tour } from "@/packages/types"

const mockTours: Tour[] = [
  {
    id: "1",
    title: "Amazing City Walking Tour",
    description:
      "Discover the hidden gems of our beautiful city with expert local guides. This comprehensive walking tour takes you through historic neighborhoods, bustling local markets, and iconic landmarks that define our city's character. You'll experience authentic local culture, taste traditional foods, and hear fascinating stories that bring the city's history to life.",
    price: 150,
    location: "Downtown Historic District",
    duration: "3 hours",
    maxParticipants: 15,
    images: [
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    category: "Cultural",
    category_id: "cultural-001",
    rating: 4.8,
    featured: true,
    story_html: `
      <p>As a local guide who has called this city home for over 20 years, I've watched it transform while maintaining its unique character. Every corner has a story, and I'm excited to share them with you.</p>
      
      <h3>Why This Tour is Special</h3>
      <p>This isn't just another walking tour. We'll visit places that most tourists never see - the hidden courtyards where artists gather, the family-run bakery that's been serving the same recipes for three generations, and the viewpoint that offers the most spectacular sunset in the city.</p>
      
      <blockquote>"The best way to know a city is to walk it with someone who loves it." - Maria, Local Guide</blockquote>
      
      <p>I've designed this route to give you an authentic taste of local life. We'll stop at my favorite coffee shop, meet some of the local artisans, and I'll share the stories that make this place truly special.</p>
    `,
    general_availability_info: "Available daily except Sundays",
    languages: ["English", "Spanish"],
    time_zone: "America/New_York",
    available_time_slots: ["09:00", "14:00"],
    createdAt: new Date("2024-01-15T10:00:00Z"),
    updatedAt: new Date("2024-01-20T14:30:00Z"),
  },
  {
    id: "2",
    title: "Sunset Mountain Hiking Adventure",
    description:
      "Experience breathtaking views and pristine nature on this guided mountain hike. Perfect for adventure seekers looking to explore the great outdoors while witnessing one of nature's most spectacular displays - a mountain sunset.",
    price: 200,
    location: "Blue Ridge Mountains",
    duration: "5 hours",
    maxParticipants: 10,
    images: [
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    category: "Adventure",
    category_id: "adventure-001",
    rating: 4.9,
    featured: false,
    story_html: `
      <p>There's something magical about watching the sun set from a mountain peak. After 15 years of guiding hikers up these trails, I still get goosebumps every single time.</p>
      
      <h3>The Journey</h3>
      <p>We'll start our ascent in the late afternoon, taking the scenic route through ancient forests and across crystal-clear streams. The trail is challenging but rewarding, suitable for intermediate hikers who want to push their limits.</p>
      
      <p>As we reach the summit, you'll understand why this spot is considered one of the most beautiful viewpoints in the region. The 360-degree views are simply breathtaking, and watching the sunset paint the sky in brilliant colors is an experience you'll never forget.</p>
    `,
    general_availability_info: "Seasonal tour - April to October",
    languages: ["English"],
    time_zone: "America/New_York",
    available_time_slots: ["15:00"],
    createdAt: new Date("2024-01-10T08:00:00Z"),
    updatedAt: new Date("2024-01-18T16:45:00Z"),
  },
  {
    id: "3",
    title: "Historic Downtown Food Tour",
    description:
      "Taste the best local cuisine while exploring historic downtown landmarks. This culinary journey takes you through the heart of the city's food scene, from traditional family restaurants to modern fusion kitchens.",
    price: 120,
    location: "Historic Downtown",
    duration: "4 hours",
    maxParticipants: 12,
    images: ["/placeholder.svg?height=500&width=800", "/placeholder.svg?height=300&width=400"],
    category: "Food & Culture",
    category_id: "food-001",
    rating: 4.7,
    featured: true,
    story_html: `
      <p>Food tells the story of a place better than any history book. As a chef turned tour guide, I've spent years discovering the culinary secrets that make our city unique.</p>
      
      <h3>A Culinary Journey</h3>
      <p>We'll visit five carefully selected establishments, each representing a different era and culture that shaped our city's food scene. From the century-old bakery to the innovative fusion restaurant, you'll taste the evolution of our local cuisine.</p>
      
      <p>This isn't just about eating - it's about understanding how food connects us to our heritage and community.</p>
    `,
    general_availability_info: "Available Tuesday to Saturday",
    languages: ["English", "French"],
    time_zone: "America/New_York",
    available_time_slots: ["11:00", "17:00"],
    createdAt: new Date("2024-01-12T12:00:00Z"),
    updatedAt: new Date("2024-01-22T10:15:00Z"),
  },
  {
    id: "4",
    title: "Coastal Kayaking Experience",
    description:
      "Paddle through crystal clear waters and explore hidden coastal caves. This water adventure combines the thrill of kayaking with the beauty of untouched coastal landscapes.",
    price: 180,
    location: "Pacific Coast",
    duration: "6 hours",
    maxParticipants: 8,
    images: [
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    category: "Water Sports",
    category_id: "water-001",
    rating: 4.6,
    featured: false,
    story_html: `
      <p>The ocean has been my playground for over a decade. There's nothing quite like the feeling of gliding through calm waters while surrounded by dramatic coastal cliffs.</p>
      
      <h3>Hidden Treasures</h3>
      <p>We'll explore sea caves that can only be accessed by kayak, witness marine wildlife in their natural habitat, and discover secluded beaches that few people ever see.</p>
      
      <p>Whether you're a beginner or experienced paddler, this tour offers the perfect balance of adventure and natural beauty.</p>
    `,
    general_availability_info: "Weather dependent - check availability",
    languages: ["English"],
    time_zone: "America/Los_Angeles",
    available_time_slots: ["08:00", "13:00"],
    createdAt: new Date("2024-01-08T14:00:00Z"),
    updatedAt: new Date("2024-01-25T09:30:00Z"),
  },
  {
    id: "5",
    title: "Wine Country Vineyard Tour",
    description:
      "Visit premium vineyards and enjoy wine tastings in beautiful countryside. This sophisticated tour combines wine education with stunning rural landscapes and gourmet food pairings.",
    price: 250,
    location: "Napa Valley",
    duration: "8 hours",
    maxParticipants: 20,
    images: [
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    category: "Wine & Dining",
    category_id: "wine-001",
    rating: 4.9,
    featured: true,
    story_html: `
      <p>Wine is poetry in a bottle, and every vineyard has its own verse to share. As a certified sommelier, I'm passionate about sharing the stories behind each glass.</p>
      
      <h3>From Vine to Glass</h3>
      <p>We'll visit three distinct vineyards, each with its own character and winemaking philosophy. You'll learn about terroir, taste wines paired with artisanal cheeses, and meet the passionate people who craft these exceptional wines.</p>
      
      <p>This tour is designed for wine enthusiasts who want to deepen their appreciation and understanding of fine wine.</p>
    `,
    general_availability_info: "Available year-round, advance booking required",
    languages: ["English", "French"],
    time_zone: "America/Los_Angeles",
    available_time_slots: ["10:00", "14:00"],
    createdAt: new Date("2024-01-05T11:00:00Z"),
    updatedAt: new Date("2024-01-28T13:20:00Z"),
  },
  {
    id: "6",
    title: "Photography Workshop Safari",
    description:
      "Learn professional photography techniques while capturing wildlife in their natural habitat. This unique experience combines photography education with wildlife observation.",
    price: 300,
    location: "Wildlife Reserve",
    duration: "Full day",
    maxParticipants: 6,
    images: ["/placeholder.svg?height=500&width=800", "/placeholder.svg?height=300&width=400"],
    category: "Photography",
    category_id: "photo-001",
    rating: 4.8,
    featured: false,
    story_html: `
      <p>Photography is about capturing moments that tell a story. In the wild, every moment is precious and fleeting.</p>
      
      <h3>Capture the Wild</h3>
      <p>As a wildlife photographer with 20 years of experience, I'll teach you the techniques needed to photograph animals in their natural environment. We'll cover everything from camera settings to animal behavior.</p>
      
      <p>You'll leave with not just great photos, but a deeper understanding of wildlife and the skills to continue your photography journey.</p>
    `,
    general_availability_info: "Seasonal availability - best from May to September",
    languages: ["English"],
    time_zone: "Africa/Nairobi",
    available_time_slots: ["06:00", "15:00"],
    createdAt: new Date("2024-01-03T07:00:00Z"),
    updatedAt: new Date("2024-01-30T15:45:00Z"),
  },
]

// Mock tours specifically for the guide dashboard
const mockMyTours: Tour[] = [
  // Page 1
  {
    id: "tour-01",
    title: "Hanoi Street Food Discovery",
    description:
      "Explore the vibrant street food scene of Hanoi's Old Quarter with a local guide who knows all the best hidden spots.",
    price: 50,
    location: "Hanoi Old Quarter",
    duration: "4 hours",
    maxParticipants: 8,
    images: ["/placeholder.svg?height=300&width=400"],
    category: "Food & Culture",
    category_id: "food-002",
    rating: 4.9,
    featured: true,
    general_availability_info: "Daily tours available",
    languages: ["English", "Vietnamese"],
    time_zone: "Asia/Ho_Chi_Minh",
    available_time_slots: ["09:00", "14:00", "18:00"],
    createdAt: new Date("2024-01-15T10:00:00Z"),
    updatedAt: new Date("2024-01-20T14:30:00Z"),
  },
  {
    id: "tour-02",
    title: "Old Quarter History Walk",
    description:
      "Discover the rich history and architecture of Hanoi's ancient commercial district through stories and legends.",
    price: 45,
    location: "Hanoi Old Quarter",
    duration: "3 hours",
    maxParticipants: 12,
    images: ["/placeholder.svg?height=300&width=400"],
    category: "Cultural",
    category_id: "cultural-002",
    rating: 4.7,
    featured: false,
    general_availability_info: "Morning and afternoon tours",
    languages: ["English", "Vietnamese", "French"],
    time_zone: "Asia/Ho_Chi_Minh",
    available_time_slots: ["08:00", "15:00"],
    createdAt: new Date("2024-01-12T09:00:00Z"),
    updatedAt: new Date("2024-01-18T11:30:00Z"),
  },
  {
    id: "tour-03",
    title: "Incense Village Photography Tour",
    description:
      "Visit the traditional incense-making village and capture stunning photos of this ancient craft in action.",
    price: 70,
    location: "Quang Phu Cau Village",
    duration: "6 hours",
    maxParticipants: 6,
    images: ["/placeholder.svg?height=300&width=400"],
    category: "Photography",
    category_id: "photo-002",
    rating: 4.8,
    featured: false,
    general_availability_info: "Best lighting in early morning",
    languages: ["English", "Vietnamese"],
    time_zone: "Asia/Ho_Chi_Minh",
    available_time_slots: ["06:00"],
    createdAt: new Date("2024-01-10T08:00:00Z"),
    updatedAt: new Date("2024-01-15T16:45:00Z"),
  },
  {
    id: "tour-04",
    title: "Red River Delta Biking",
    description: "Cycle through scenic countryside, rice paddies, and traditional villages along the Red River Delta.",
    price: 90,
    location: "Red River Delta",
    duration: "8 hours",
    maxParticipants: 10,
    images: ["/placeholder.svg?height=300&width=400"],
    category: "Adventure",
    category_id: "adventure-002",
    rating: 4.6,
    featured: true,
    general_availability_info: "Full day tours, weather dependent",
    languages: ["English", "Vietnamese"],
    time_zone: "Asia/Ho_Chi_Minh",
    available_time_slots: ["07:00"],
    createdAt: new Date("2024-01-08T07:00:00Z"),
    updatedAt: new Date("2024-01-22T13:20:00Z"),
  },
  {
    id: "tour-05",
    title: "Ha Long Bay Day Trip",
    description:
      "Experience the UNESCO World Heritage site with limestone karsts, emerald waters, and floating fishing villages.",
    price: 120,
    location: "Ha Long Bay",
    duration: "12 hours",
    maxParticipants: 15,
    images: ["/placeholder.svg?height=300&width=400"],
    category: "Nature",
    category_id: "nature-001",
    rating: 4.9,
    featured: false,
    general_availability_info: "Daily departures from Hanoi",
    languages: ["English", "Vietnamese", "Japanese"],
    time_zone: "Asia/Ho_Chi_Minh",
    available_time_slots: ["06:30"],
    createdAt: new Date("2024-01-05T06:00:00Z"),
    updatedAt: new Date("2024-01-25T10:15:00Z"),
  },
  // Page 2
  {
    id: "tour-06",
    title: "Cooking Class with Local Chef",
    description: "Learn to prepare authentic Vietnamese dishes in a traditional kitchen with a master chef.",
    price: 65,
    location: "Local Family Kitchen",
    duration: "5 hours",
    maxParticipants: 8,
    images: ["/placeholder.svg?height=300&width=400"],
    category: "Food & Culture",
    category_id: "food-003",
    rating: 4.8,
    featured: true,
    general_availability_info: "Morning and evening classes",
    languages: ["English", "Vietnamese"],
    time_zone: "Asia/Ho_Chi_Minh",
    available_time_slots: ["09:00", "17:00"],
    createdAt: new Date("2024-01-03T09:00:00Z"),
    updatedAt: new Date("2024-01-28T14:45:00Z"),
  },
  {
    id: "tour-07",
    title: "Ceramic Village Workshop",
    description: "Try your hand at traditional pottery making in the famous Bat Trang ceramic village.",
    price: 55,
    location: "Bat Trang Village",
    duration: "4 hours",
    maxParticipants: 10,
    images: ["/placeholder.svg?height=300&width=400"],
    category: "Cultural",
    category_id: "cultural-003",
    rating: 4.5,
    featured: false,
    general_availability_info: "Afternoon workshops available",
    languages: ["English", "Vietnamese"],
    time_zone: "Asia/Ho_Chi_Minh",
    available_time_slots: ["13:00", "15:00"],
    createdAt: new Date("2024-01-02T10:00:00Z"),
    updatedAt: new Date("2024-01-20T12:30:00Z"),
  },
  {
    id: "tour-08",
    title: "Early Morning Market Run",
    description: "Join locals at dawn to experience the bustling wholesale markets and fresh produce trading.",
    price: 40,
    location: "Long Bien Market",
    duration: "3 hours",
    maxParticipants: 6,
    images: ["/placeholder.svg?height=300&width=400"],
    category: "Cultural",
    category_id: "cultural-004",
    rating: 4.7,
    featured: false,
    general_availability_info: "Early morning only",
    languages: ["English", "Vietnamese"],
    time_zone: "Asia/Ho_Chi_Minh",
    available_time_slots: ["05:00"],
    createdAt: new Date("2024-01-01T05:00:00Z"),
    updatedAt: new Date("2024-01-15T08:20:00Z"),
  },
  {
    id: "tour-09",
    title: "Hidden Temples of Hanoi",
    description: "Discover ancient temples and pagodas tucked away in Hanoi's narrow alleys and residential areas.",
    price: 50,
    location: "Various Hanoi Districts",
    duration: "4 hours",
    maxParticipants: 8,
    images: ["/placeholder.svg?height=300&width=400"],
    category: "Cultural",
    category_id: "cultural-005",
    rating: 4.6,
    featured: false,
    general_availability_info: "Morning tours recommended",
    languages: ["English", "Vietnamese"],
    time_zone: "Asia/Ho_Chi_Minh",
    available_time_slots: ["08:00", "10:00"],
    createdAt: new Date("2023-12-28T11:00:00Z"),
    updatedAt: new Date("2024-01-12T15:45:00Z"),
  },
  {
    id: "tour-10",
    title: "Train Street Photo Hunt",
    description: "Capture the famous train street and daily life of residents living alongside the railway tracks.",
    price: 35,
    location: "Train Street, Hanoi",
    duration: "2 hours",
    maxParticipants: 4,
    images: ["/placeholder.svg?height=300&width=400"],
    category: "Photography",
    category_id: "photo-003",
    rating: 4.4,
    featured: true,
    general_availability_info: "Train schedule dependent",
    languages: ["English", "Vietnamese"],
    time_zone: "Asia/Ho_Chi_Minh",
    available_time_slots: ["15:30", "17:30"],
    createdAt: new Date("2023-12-25T14:00:00Z"),
    updatedAt: new Date("2024-01-10T09:30:00Z"),
  },
  // Page 3
  {
    id: "tour-11",
    title: "Ninh Binh Adventure",
    description:
      "Explore the 'Halong Bay on land' with boat rides through caves, temple visits, and mountain climbing.",
    price: 150,
    location: "Ninh Binh Province",
    duration: "12 hours",
    maxParticipants: 12,
    images: ["/placeholder.svg?height=300&width=400"],
    category: "Adventure",
    category_id: "adventure-003",
    rating: 4.9,
    featured: true,
    general_availability_info: "Full day adventure tours",
    languages: ["English", "Vietnamese"],
    time_zone: "Asia/Ho_Chi_Minh",
    available_time_slots: ["06:00"],
    createdAt: new Date("2023-12-20T07:00:00Z"),
    updatedAt: new Date("2024-01-05T16:20:00Z"),
  },
  {
    id: "tour-12",
    title: "Secret War Tunnels Exploration",
    description:
      "Venture into historical underground tunnels and learn about Vietnam's wartime history from a local perspective.",
    price: 85,
    location: "Cu Chi Tunnels",
    duration: "6 hours",
    maxParticipants: 10,
    images: ["/placeholder.svg?height=300&width=400"],
    category: "Historical",
    category_id: "historical-001",
    rating: 4.7,
    featured: false,
    general_availability_info: "Historical site tours",
    languages: ["English", "Vietnamese"],
    time_zone: "Asia/Ho_Chi_Minh",
    available_time_slots: ["08:00", "13:00"],
    createdAt: new Date("2023-12-15T08:00:00Z"),
    updatedAt: new Date("2024-01-08T11:45:00Z"),
  },
]

export const tourService = {
  async getAll(): Promise<Tour[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate occasional API errors for testing
    if (Math.random() < 0.05) {
      throw new Error("Failed to fetch tours from API")
    }

    return mockTours
  },

  async getById(id: string): Promise<Tour> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Simulate occasional API errors for testing
    if (Math.random() < 0.05) {
      throw new Error("Failed to fetch tour from API")
    }

    const tour = mockTours.find((t) => t.id === id)

    if (!tour) {
      throw new Error("Tour not found")
    }

    return tour

    // In production, this would be:
    // const response = await fetch(`/api/v1/tours/${id}`)
    // if (!response.ok) {
    //   throw new Error('Failed to fetch tour')
    // }
    // return response.json()
  },

  async getFeaturedTours(): Promise<Tour[]> {
    console.log("Fetching featured tours...")

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Filter tours that are marked as featured
    const featuredTours = mockTours.filter((tour) => tour.featured)

    return Promise.resolve(featuredTours)
  },

  async getMyTours(): Promise<Tour[]> {
    console.log("Fetching mock tours for guide...")

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return Promise.resolve(mockMyTours)
  },

  async createTour(tourData: {
    title: string
    description: string
    story_html: string
    price: number
    duration: string
    location: string
    maxParticipants: number
    images: string[]
    general_availability_info: string
    category_id: string
    languages: string[]
    time_zone: string
    available_time_slots: string[]
  }): Promise<void> {
    console.log("Creating new tour with data:", tourData)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate occasional API errors for testing
    if (Math.random() < 0.05) {
      throw new Error("Failed to create tour - server error")
    }

    // Validate required fields
    if (!tourData.languages || tourData.languages.length === 0) {
      throw new Error("At least one language must be selected")
    }

    if (!tourData.time_zone) {
      throw new Error("Time zone must be selected")
    }

    if (!tourData.available_time_slots || tourData.available_time_slots.length === 0) {
      throw new Error("At least one time slot must be added")
    }

    // In a real implementation, this would make a POST request to the API
    // const response = await fetch('/api/v1/my-tours', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${accessToken}`
    //   },
    //   body: JSON.stringify({
    //     ...tourData,
    //     status: 'draft'
    //   })
    // })
    //
    // if (!response.ok) {
    //   throw new Error('Failed to create tour')
    // }

    console.log("Tour created successfully as draft")
  },
}
