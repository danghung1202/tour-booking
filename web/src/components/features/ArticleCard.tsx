import Link from "next/link"
import Image from "next/image"
import type { Article } from "@/lib/articles.tsx"
import styles from "./ArticleCard.module.css"

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={article.headerImageUrl || "/placeholder.svg"}
            alt={article.title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{article.title}</h2>
          <div className={styles.metadata}>
            <span className={styles.author}>By {article.author}</span>
            <span className={styles.date}>{article.date}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
