"use client"

import type React from "react"

import { useState, useRef } from "react"
import styles from "./RichTextEditor.module.css"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  disabled?: boolean
}

export default function RichTextEditor({ content, onChange, disabled = false }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const insertFormatting = (before: string, after = "") => {
    if (!textareaRef.current || disabled) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)
    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const formatButtons = [
    { label: "Bold", action: () => insertFormatting("<strong>", "</strong>"), icon: "B" },
    { label: "Italic", action: () => insertFormatting("<em>", "</em>"), icon: "I" },
    { label: "Heading", action: () => insertFormatting("<h3>", "</h3>"), icon: "H" },
    { label: "Paragraph", action: () => insertFormatting("<p>", "</p>"), icon: "P" },
    { label: "List Item", action: () => insertFormatting("<li>", "</li>"), icon: "•" },
    { label: "Quote", action: () => insertFormatting("<blockquote>", "</blockquote>"), icon: '"' },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.formatButtons}>
          {formatButtons.map((button) => (
            <button
              key={button.label}
              type="button"
              onClick={button.action}
              className={styles.formatButton}
              title={button.label}
              disabled={disabled}
            >
              <span className={styles.formatIcon}>{button.icon}</span>
            </button>
          ))}
        </div>

        <div className={styles.viewToggle}>
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`${styles.toggleButton} ${!isPreview ? styles.active : ""}`}
            disabled={disabled}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`${styles.toggleButton} ${isPreview ? styles.active : ""}`}
            disabled={disabled}
          >
            Preview
          </button>
        </div>
      </div>

      <div className={styles.editorArea}>
        {isPreview ? (
          <div className={styles.preview}>
            {content ? (
              <div className={styles.previewContent} dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <div className={styles.emptyPreview}>Nothing to preview yet. Start writing your story!</div>
            )}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleTextChange}
            className={styles.textarea}
            placeholder="Share your story here... You can use HTML tags like <strong>bold</strong>, <em>italic</em>, <h3>headings</h3>, <p>paragraphs</p>, <blockquote>quotes</blockquote>, and <li>list items</li>."
            disabled={disabled}
            rows={12}
          />
        )}
      </div>

      <div className={styles.help}>
        <details className={styles.helpDetails}>
          <summary className={styles.helpSummary}>HTML Formatting Help</summary>
          <div className={styles.helpContent}>
            <div className={styles.helpGrid}>
              <div className={styles.helpItem}>
                <code>&lt;strong&gt;text&lt;/strong&gt;</code>
                <span>Bold text</span>
              </div>
              <div className={styles.helpItem}>
                <code>&lt;em&gt;text&lt;/em&gt;</code>
                <span>Italic text</span>
              </div>
              <div className={styles.helpItem}>
                <code>&lt;h3&gt;text&lt;/h3&gt;</code>
                <span>Heading</span>
              </div>
              <div className={styles.helpItem}>
                <code>&lt;p&gt;text&lt;/p&gt;</code>
                <span>Paragraph</span>
              </div>
              <div className={styles.helpItem}>
                <code>&lt;blockquote&gt;text&lt;/blockquote&gt;</code>
                <span>Quote block</span>
              </div>
              <div className={styles.helpItem}>
                <code>&lt;ul&gt;&lt;li&gt;item&lt;/li&gt;&lt;/ul&gt;</code>
                <span>Bullet list</span>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}
