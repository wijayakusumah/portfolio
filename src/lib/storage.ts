import { put, del } from '@vercel/blob'

export interface UploadResult {
  url: string
  downloadUrl: string
  contentType: string
  size: number
  uploadedAt: Date
}

export class BlobStorage {
  private token: string

  constructor() {
    this.token = process.env.BLOB_READ_WRITE_TOKEN!
    if (!this.token) {
      throw new Error('BLOB_READ_WRITE_TOKEN environment variable is not set')
    }
  }

  async uploadFile(
    file: File | Buffer,
    filename: string,
    options: {
      contentType?: string
      access?: 'public' | 'private'
    } = {}
  ): Promise<UploadResult> {
    try {
      const blob = await put(filename, file, {
        access: options.access || 'public',
        token: this.token,
        contentType: options.contentType,
      })

      return {
        url: blob.url,
        downloadUrl: blob.downloadUrl,
        contentType: blob.contentType,
        size: blob.size,
        uploadedAt: new Date(blob.uploadedAt),
      }
    } catch (error) {
      console.error('Error uploading file to blob storage:', error)
      throw new Error('Failed to upload file')
    }
  }

  async deleteFile(url: string): Promise<void> {
    try {
      await del(url, { token: this.token })
    } catch (error) {
      console.error('Error deleting file from blob storage:', error)
      throw new Error('Failed to delete file')
    }
  }

  generateUniqueFilename(originalName: string, prefix?: string): string {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const extension = originalName.split('.').pop()
    const baseName = originalName.split('.').slice(0, -1).join('.')
    
    const prefixPart = prefix ? `${prefix}_` : ''
    return `${prefixPart}${timestamp}_${randomString}_${baseName}.${extension}`
  }

  getFileTypeFromMimeType(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'image'
    if (mimeType.startsWith('video/')) return 'video'
    if (mimeType.startsWith('audio/')) return 'audio'
    if (mimeType.includes('pdf')) return 'document'
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'spreadsheet'
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'presentation'
    if (mimeType.includes('word') || mimeType.includes('document')) return 'document'
    if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('tar')) return 'archive'
    return 'other'
  }

  validateImageFile(file: File): { valid: boolean; error?: string } {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'
      }
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File size too large. Maximum size is 10MB.'
      }
    }

    return { valid: true }
  }

  validateDocumentFile(file: File): { valid: boolean; error?: string } {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'text/csv'
    ]
    const maxSize = 50 * 1024 * 1024 // 50MB

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Only PDF, Word, Excel, PowerPoint, and text files are allowed.'
      }
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File size too large. Maximum size is 50MB.'
      }
    }

    return { valid: true }
  }
}

export const blobStorage = new BlobStorage()