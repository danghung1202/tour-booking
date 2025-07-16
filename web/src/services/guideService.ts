// Mock data for guides with their tours
const mockGuidesWithTours = [
  {
    id: "guide-1",
    name: "Maria Rodriguez",
    bio: "Born and raised in the heart of the city, Maria has been sharing the hidden stories of our historic district for over 8 years. With a background in art history and a passion for local culture, she brings each cobblestone and building facade to life with fascinating tales that you won't find in any guidebook. Maria speaks fluent English, Spanish, and Portuguese, making her tours accessible to visitors from around the world.",
    photo_url: "/placeholder.svg?height=400&width=400",
    tours: [
      {
        id: "tour-1",
        title: "Historic Downtown Walking Tour",
        images: ["/placeholder.svg?height=300&width=400"],
        price: 25,
        duration: 120,
        rating: 4.8,
        reviewCount: 156,
      },
      {
        id: "tour-2",
        title: "Art & Architecture Discovery",
        images: ["/placeholder.svg?height=300&width=400"],
        price: 35,
        duration: 180,
        rating: 4.9,
        reviewCount: 89,
      },
    ],
  },
  {
    id: "guide-2",
    name: "James Thompson",
    bio: "A former chef turned tour guide, James combines his love for food with his extensive knowledge of local history. Having worked in restaurants across the city for 15 years, he knows every hidden gem, family recipe, and culinary tradition that makes our food scene unique. His tours are perfect for food lovers who want to taste authentic flavors while learning about the cultural stories behind each dish.",
    photo_url: "/placeholder.svg?height=400&width=400",
    tours: [
      {
        id: "tour-3",
        title: "Culinary Heritage Tour",
        images: ["/placeholder.svg?height=300&width=400"],
        price: 45,
        duration: 210,
        rating: 4.7,
        reviewCount: 203,
      },
      {
        id: "tour-4",
        title: "Street Food Adventure",
        images: ["/placeholder.svg?height=300&width=400"],
        price: 30,
        duration: 150,
        rating: 4.6,
        reviewCount: 127,
      },
    ],
  },
  {
    id: "guide-3",
    name: "Sarah Chen",
    bio: "With a PhD in Environmental Science and 10 years of experience as a park ranger, Sarah is passionate about connecting people with nature. She specializes in eco-tours that highlight local wildlife, sustainable practices, and conservation efforts. Sarah's tours are educational, inspiring, and perfect for families who want to learn about environmental stewardship while exploring beautiful natural spaces.",
    photo_url: "/placeholder.svg?height=400&width=400",
    tours: [
      {
        id: "tour-5",
        title: "Nature & Wildlife Discovery",
        images: ["/placeholder.svg?height=300&width=400"],
        price: 40,
        duration: 240,
        rating: 4.9,
        reviewCount: 94,
      },
      {
        id: "tour-6",
        title: "Sustainable City Tour",
        images: ["/placeholder.svg?height=300&width=400"],
        price: 28,
        duration: 120,
        rating: 4.8,
        reviewCount: 76,
      },
    ],
  },
  {
    id: "guide-4",
    name: "Ahmed Hassan",
    bio: "Ahmed is a local historian and storyteller who has dedicated his life to preserving and sharing the rich cultural heritage of our community. With over 12 years of experience leading cultural tours, he has an incredible ability to weave together historical facts, personal anecdotes, and local legends into captivating narratives. His tours offer deep insights into traditions, customs, and the diverse communities that have shaped our city.",
    photo_url: "/placeholder.svg?height=400&width=400",
    tours: [
      {
        id: "tour-7",
        title: "Cultural Heritage Experience",
        images: ["/placeholder.svg?height=300&width=400"],
        price: 38,
        duration: 180,
        rating: 4.9,
        reviewCount: 142,
      },
    ],
  },
]

export interface TourSnippet {
  id: string
  title: string
  images: string[]
  price: number
  duration: number
  rating: number
  reviewCount: number
}

export interface GuideWithTours {
  id: string
  name: string
  bio: string
  photo_url: string
  tours: TourSnippet[]
}

export const guideService = {
  async getAllGuidesWithTours(): Promise<GuideWithTours[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In a real app, this would make an API call to GET /api/v1/guides
    // The API would return only guides with role 'guide' and only published tours
    return mockGuidesWithTours
  },
}
