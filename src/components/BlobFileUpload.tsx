'use client'

import { useState, useRef } from 'react'
import { Upload, X, File, Image as ImageIcon, Video, FileText, Loader2 } from 'lucide-react'
import { blobStorage } from '@/lib/storage'

interface BlobFileUploadProps {
  accept?: string
  multiple?: boolean
  maxFiles?: number
  maxFileSize?: number // in bytes
  onFilesChange: (files: UploadedFile[]) => void
  className?: string
  uploadPath?: string // prefix for blob storage
}

interface UploadedFile {
  id: string
  name: string
  url: string
  downloadUrl: string
  size: number
  type: 'image' | 'video' | 'document' | 'other'
  contentType: string
  uploadedAt: Date
  preview?: string
}

export default function BlobFileUpload({ 
  accept = "image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx", 
  multiple = true, 
  maxFiles = 10,
  maxFileSize = 50 * 1024 * 1024, // 50MB default
  onFilesChange,
  className = "",
  uploadPath = "uploads"
}: BlobFileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > maxFileSize) {
      return {
        valid: false,
        error: `File "${file.name}" is too large. Maximum size is ${formatFileSize(maxFileSize)}`
      }
    }

    // Check file type based on accept prop
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim())
      const isAccepted = acceptedTypes.some(acceptedType => {
        if (acceptedType.startsWith('.')) {
          return file.name.toLowerCase().endsWith(acceptedType.toLowerCase())
        }
        if (acceptedType.includes('*')) {
          const baseType = acceptedType.split('/')[0]
          return file.type.startsWith(baseType)
        }
        return file.type === acceptedType
      })

      if (!isAccepted) {
        return {
          valid: false,
          error: `File "${file.name}" is not an accepted file type.`
        }
      }
    }

    return { valid: true }
  }

  const createPreview = (file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.readAsDataURL(file)
      } else {
        resolve(undefined)
      }
    })
  }

  const uploadFile = async (file: File): Promise<UploadedFile> => {
    const filename = blobStorage.generateUniqueFilename(file.name, uploadPath)
    const result = await blobStorage.uploadFile(file, filename, {
      contentType: file.type,
      access: 'public'
    })

    const preview = await createPreview(file)
    const fileType = blobStorage.getFileTypeFromMimeType(file.type)

    return {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      url: result.url,
      downloadUrl: result.downloadUrl,
      size: result.size,
      type: fileType as 'image' | 'video' | 'document' | 'other',
      contentType: result.contentType,
      uploadedAt: result.uploadedAt,
      preview
    }
  }

  const handleFiles = async (files: FileList | null) => {
    if (!files) return

    setError('')
    setUploading(true)
    const newFiles: UploadedFile[] = []
    const remainingSlots = maxFiles - uploadedFiles.length

    try {
      for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
        const file = files[i]
        
        // Validate file
        const validation = validateFile(file)
        if (!validation.valid) {
          setError(validation.error || 'Invalid file')
          continue
        }

        // Upload file to blob storage
        const uploadedFile = await uploadFile(file)
        newFiles.push(uploadedFile)
      }

      const updatedFiles = [...uploadedFiles, ...newFiles]
      setUploadedFiles(updatedFiles)
      onFilesChange(updatedFiles)
    } catch (err) {
      console.error('Upload error:', err)
      setError('Failed to upload files. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const removeFile = async (id: string) => {
    const fileToRemove = uploadedFiles.find(f => f.id === id)
    if (fileToRemove) {
      try {
        await blobStorage.deleteFile(fileToRemove.url)
      } catch (err) {
        console.error('Error deleting file from blob storage:', err)
        // Continue with local removal even if blob deletion fails
      }
    }

    const updatedFiles = uploadedFiles.filter(f => f.id !== id)
    setUploadedFiles(updatedFiles)
    setError('')
    onFilesChange(updatedFiles)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const getFileIcon = (type: 'image' | 'video' | 'document' | 'other') => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-6 w-6 text-blue-500" />
      case 'video':
        return <Video className="h-6 w-6 text-purple-500" />
      case 'document':
        return <FileText className="h-6 w-6 text-gray-500" />
      case 'other':
        return <File className="h-6 w-6 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploadedFiles.length >= maxFiles || uploading}
        />
        
        <div className="flex flex-col items-center">
          {uploading ? (
            <Loader2 className="h-12 w-12 text-blue-500 mb-4 animate-spin" />
          ) : (
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
          )}
          <div className="text-lg font-medium text-gray-900 mb-2">
            {uploading 
              ? 'Uploading files...' 
              : uploadedFiles.length >= maxFiles 
                ? 'Maximum files reached' 
                : 'Drop files here or click to upload'
            }
          </div>
          <p className="text-sm text-gray-500">
            {multiple ? `Up to ${maxFiles} files` : 'Single file'} • Images, videos, and documents
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Max file size: {formatFileSize(maxFileSize)} per file
          </p>
        </div>
      </div>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium text-gray-900">
            Uploaded Files ({uploadedFiles.length}/{maxFiles})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((uploadedFile) => (
              <div
                key={uploadedFile.id}
                className="relative bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => removeFile(uploadedFile.id)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
                
                <div className="flex items-start space-x-3">
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview}
                      alt="Preview"
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                      {getFileIcon(uploadedFile.type)}
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(uploadedFile.size)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {uploadedFile.uploadedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}