"use client"

import type React from "react"

import { useState, useRef } from "react"
import styles from "./TourImageUploader.module.css"

interface TourImageUploaderProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  disabled?: boolean
}

interface UploadingImage {
  id: string
  file: File
  progress: number
  url?: string
  error?: string
}

export default function TourImageUploader({ images, onImagesChange, disabled = false }: TourImageUploaderProps) {
  const [uploadingImages, setUploadingImages] = useState<UploadingImage[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files || disabled) return

    const validFiles = Array.from(files).filter((file) => {
      // Check file type
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not an image file`)
        return false
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is 5MB`)
        return false
      }

      return true
    })

    if (validFiles.length === 0) return

    // Create uploading entries
    const newUploadingImages: UploadingImage[] = validFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      progress: 0,
    }))

    setUploadingImages((prev) => [...prev, ...newUploadingImages])

    // Start uploads
    newUploadingImages.forEach((uploadingImage) => {
      simulateUpload(uploadingImage)
    })
  }

  const simulateUpload = async (uploadingImage: UploadingImage) => {
    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100))

        setUploadingImages((prev) => prev.map((img) => (img.id === uploadingImage.id ? { ...img, progress } : img)))
      }

      // Simulate successful upload - create a blob URL for preview
      const imageUrl = URL.createObjectURL(uploadingImage.file)

      // In a real implementation, this would be the Supabase Storage URL
      const mockStorageUrl = `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(uploadingImage.file.name)}`

      setUploadingImages((prev) =>
        prev.map((img) => (img.id === uploadingImage.id ? { ...img, url: mockStorageUrl, progress: 100 } : img)),
      )

      // Add to final images array
      onImagesChange([...images, mockStorageUrl])

      // Remove from uploading after a short delay
      setTimeout(() => {
        setUploadingImages((prev) => prev.filter((img) => img.id !== uploadingImage.id))
      }, 1000)
    } catch (error) {
      console.error("Upload failed:", error)
      setUploadingImages((prev) =>
        prev.map((img) => (img.id === uploadingImage.id ? { ...img, error: "Upload failed" } : img)),
      )
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setDragActive(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (!disabled) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
  }

  const handleRemoveImage = (indexToRemove: number) => {
    const newImages = images.filter((_, index) => index !== indexToRemove)
    onImagesChange(newImages)
  }

  const handleBrowseClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={styles.container}>
      {/* Upload Area */}
      <div
        className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ""} ${disabled ? styles.disabled : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleInputChange}
          className={styles.hiddenInput}
          disabled={disabled}
        />

        <div className={styles.uploadContent}>
          <div className={styles.uploadIcon}>📸</div>
          <div className={styles.uploadText}>
            <p className={styles.uploadPrimary}>{dragActive ? "Drop images here" : "Drag & drop images here"}</p>
            <p className={styles.uploadSecondary}>
              or <span className={styles.browseLink}>browse files</span>
            </p>
          </div>
          <div className={styles.uploadHint}>Supports: JPG, PNG, WebP • Max size: 5MB each</div>
        </div>
      </div>

      {/* Uploading Images */}
      {uploadingImages.length > 0 && (
        <div className={styles.uploadingSection}>
          <h4 className={styles.sectionTitle}>Uploading...</h4>
          <div className={styles.uploadingGrid}>
            {uploadingImages.map((uploadingImage) => (
              <div key={uploadingImage.id} className={styles.uploadingItem}>
                <div className={styles.uploadingPreview}>
                  <img
                    src={URL.createObjectURL(uploadingImage.file) || "/placeholder.svg"}
                    alt="Uploading"
                    className={styles.uploadingImage}
                  />
                  <div className={styles.uploadingOverlay}>
                    {uploadingImage.error ? (
                      <div className={styles.uploadError}>❌</div>
                    ) : uploadingImage.progress === 100 ? (
                      <div className={styles.uploadSuccess}>✅</div>
                    ) : (
                      <div className={styles.uploadProgress}>
                        <div className={styles.progressBar}>
                          <div className={styles.progressFill} style={{ width: `${uploadingImage.progress}%` }} />
                        </div>
                        <span className={styles.progressText}>{uploadingImage.progress}%</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.uploadingName}>{uploadingImage.file.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Images */}
      {images.length > 0 && (
        <div className={styles.imagesSection}>
          <h4 className={styles.sectionTitle}>
            Uploaded Images ({images.length})
            {images.length > 0 && <span className={styles.coverNote}>First image will be the cover photo</span>}
          </h4>
          <div className={styles.imagesGrid}>
            {images.map((imageUrl, index) => (
              <div key={index} className={`${styles.imageItem} ${index === 0 ? styles.coverImage : ""}`}>
                <div className={styles.imagePreview}>
                  <img src={imageUrl || "/placeholder.svg"} alt={`Tour image ${index + 1}`} className={styles.image} />
                  {index === 0 && <div className={styles.coverBadge}>Cover Photo</div>}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className={styles.removeButton}
                    disabled={disabled}
                    title="Remove image"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className={styles.instructions}>
        <h4 className={styles.instructionsTitle}>Image Guidelines:</h4>
        <ul className={styles.instructionsList}>
          <li>Upload high-quality images that showcase your tour</li>
          <li>The first image will be used as the main cover photo</li>
          <li>Recommended size: 1200x800 pixels or larger</li>
          <li>You can drag images to reorder them (coming soon)</li>
        </ul>
      </div>
    </div>
  )
}
