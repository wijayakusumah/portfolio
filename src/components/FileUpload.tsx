'use client'

import { useState, useRef } from 'react'
import { Upload, X, File, Image as ImageIcon, Video, FileText } from 'lucide-react'

interface FileUploadProps {
  accept?: string
  multiple?: boolean
  maxFiles?: number
  maxFileSize?: number // in bytes
  onFilesChange: (files: File[]) => void
  className?: string
}

interface UploadedFile {
  file: File
  id: string
  preview?: string
  type: 'image' | 'video' | 'document'
}

export default function FileUpload({ 
  accept = "image/*,video/*,.pdf,.doc,.docx", 
  multiple = true, 
  maxFiles = 10,
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  onFilesChange,
  className = ""
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileType = (file: File): 'image' | 'video' | 'document' => {
    if (file.type.startsWith('image/')) return 'image'
    if (file.type.startsWith('video/')) return 'video'
    return 'document'
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

  const handleFiles = async (files: FileList | null) => {
    if (!files) return

    setError('')
    const newFiles: UploadedFile[] = []
    const remainingSlots = maxFiles - uploadedFiles.length

    for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
      const file = files[i]
      
      // Check file size
      if (file.size > maxFileSize) {
        setError(`File "${file.name}" is too large. Maximum size is ${formatFileSize(maxFileSize)}`)
        continue
      }

      const preview = await createPreview(file)
      newFiles.push({
        file,
        id: Math.random().toString(36).substr(2, 9),
        preview,
        type: getFileType(file)
      })
    }

    const updatedFiles = [...uploadedFiles, ...newFiles]
    setUploadedFiles(updatedFiles)
    onFilesChange(updatedFiles.map(f => f.file))
  }

  const removeFile = (id: string) => {
    const updatedFiles = uploadedFiles.filter(f => f.id !== id)
    setUploadedFiles(updatedFiles)
    setError('')
    onFilesChange(updatedFiles.map(f => f.file))
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

  const getFileIcon = (type: 'image' | 'video' | 'document') => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-6 w-6 text-blue-500" />
      case 'video':
        return <Video className="h-6 w-6 text-purple-500" />
      case 'document':
        return <FileText className="h-6 w-6 text-gray-500" />
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
        }`}
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
          disabled={uploadedFiles.length >= maxFiles}
        />
        
        <div className="flex flex-col items-center">
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <div className="text-lg font-medium text-gray-900 mb-2">
            {uploadedFiles.length >= maxFiles 
              ? 'Maximum files reached' 
              : 'Drop files here or click to upload'
            }
          </div>
          <p className="text-sm text-gray-500">
            {multiple ? `Up to ${maxFiles} files` : 'Single file'} • Images, videos, and documents
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Max file size: 10MB per file
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
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(uploadedFile.file.size)}
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