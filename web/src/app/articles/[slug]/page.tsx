import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/lib/articles.tsx"
import styles from "./page.module.css"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className={styles.articlePage}>
      {/* Header Image */}
      <div className={styles.headerImageContainer}>
        <img src={article.headerImageUrl || "/placeholder.svg"} alt={article.title} className={styles.headerImage} />
      </div>

      {/* Article Content */}
      <div className={styles.contentContainer}>
        {/* Article Header */}
        <header className={styles.articleHeader}>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.metadata}>
            <span className={styles.author}>Posted by {article.author}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.date}>{article.date}</span>
          </div>
        </header>

        {/* Article Body */}
        <article className={styles.articleBody}>{article.content}</article>
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: `${article.title} | Unique Tours`,
    description: `Read ${article.title} by ${article.author} on Unique Tours.`,
  }
}
