import { NextRequest, NextResponse } from 'next/server'
import { blobStorage } from '@/lib/storage'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const uploadPath = formData.get('uploadPath') as string || 'uploads'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file
    const validation = blobStorage.validateImageFile(file)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Upload to blob storage
    const filename = blobStorage.generateUniqueFilename(file.name, uploadPath)
    const result = await blobStorage.uploadFile(file, filename, {
      contentType: file.type,
      access: 'public'
    })

    return NextResponse.json({
      success: true,
      file: {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: result.url,
        downloadUrl: result.downloadUrl,
        size: result.size,
        contentType: result.contentType,
        uploadedAt: result.uploadedAt,
        type: blobStorage.getFileTypeFromMimeType(file.type)
      }
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
      return NextResponse.json(
        { error: 'No file URL provided' },
        { status: 400 }
      )
    }

    await blobStorage.deleteFile(url)

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}