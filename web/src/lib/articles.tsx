import React from "react"

export interface Article {
  slug: string
  title: string
  author: string
  date: string
  headerImageUrl: string
  content: React.ReactNode
}

// Mock CMS - Static articles data
export const articles: Article[] = [
  {
    slug: "sample-article",
    title: "Sample Article Title",
    author: "John Doe",
    date: "January 15, 2025",
    headerImageUrl: "/placeholder.svg?height=400&width=800",
    content: (
      <div>
        <p>
          This is a sample article to demonstrate the article template structure. The content can include various HTML
          elements and formatting.
        </p>
        <h2>Section Heading</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <ul>
          <li>First bullet point</li>
          <li>Second bullet point</li>
          <li>Third bullet point</li>
        </ul>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    ),
  },
  {
    slug: "hanoi-old-quarter-food-history",
    title: "A Taste of History: Exploring the Timeless Flavors of Hanoi's Old Quarter",
    author: "Sally (UX Expert)",
    date: "July 9, 2025",
    headerImageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2787&auto=format&fit=crop",
    content: (
      <>
        <p>
          Hanoi's Old Quarter is not just a collection of ancient streets; it's a living museum of Vietnamese culture,
          and nowhere is this more apparent than in its food. For centuries, the 36 streets of this historic district
          have been serving up dishes whose recipes have been passed down through generations. To truly understand
          Hanoi, you must first taste it.
        </p>

        <h2>The Philosophy of Street Food</h2>
        <p>
          Unlike fine dining, Hanoi's street food is built on specialization. A family might spend their entire lives
          perfecting a single dish, like Phở or Bún Chả. This dedication creates a level of mastery that is hard to find
          anywhere else. Each stall, each cart, is a testament to a family's legacy and a city's culinary soul.
        </p>

        <h3>Must-Try Dishes and Where to Find Them:</h3>
        <ul>
          <li>
            <strong>Phở Bò (Beef Noodle Soup):</strong> The quintessential Vietnamese dish. The best Phở is often found
            in unassuming, generations-old establishments where the broth has been simmering for hours.
          </li>
          <li>
            <strong>Bún Chả (Grilled Pork with Noodles):</strong> Famously enjoyed by President Barack Obama, this dish
            features smoky grilled pork patties served in a sweet and savory dipping sauce with fresh rice noodles and
            herbs.
          </li>
          <li>
            <strong>Bánh Mì (Vietnamese Sandwich):</strong> A perfect fusion of French colonial legacy and Vietnamese
            flavors, featuring a crispy baguette filled with pâté, cold cuts, fresh herbs, and pickled vegetables.
          </li>
        </ul>

        <h2>More Than Just a Meal</h2>
        <p>
          Eating in the Old Quarter is an experience. It's about pulling up a tiny plastic stool on a crowded sidewalk,
          surrounded by the symphony of city life, and enjoying a meal that is both incredibly delicious and deeply
          connected to the history of the place. It's a culinary journey that connects you directly to the heart of
          Hanoi.
        </p>
      </>
    ),
  },
  // Additional articles can be added here
]

export function getArticleBySlug(slug: string): Article | null {
  return articles.find((article) => article.slug === slug) || null
}

export function getAllArticles(): Article[] {
  return articles
} 