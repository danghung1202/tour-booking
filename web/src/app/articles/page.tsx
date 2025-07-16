import { getAllArticles } from "@/lib/articles.tsx"
import ArticleCard from "@/components/features/ArticleCard"
import styles from "./page.module.css"

export default function ArticlesPage() {
  // Fetch all articles and sort by date (newest first)
  const articles = getAllArticles().sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Our Guides & Stories</h1>
        <p className={styles.subtitle}>
          Discover authentic travel experiences, local insights, and cultural stories from our community of passionate
          guides and travelers.
        </p>
      </div>

      <div className={styles.articlesGrid}>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}
