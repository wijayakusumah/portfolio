import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN
    const databaseUrl = process.env.DATABASE_URL

    return NextResponse.json({
      blobStorage: {
        configured: !!blobToken,
        tokenLength: blobToken?.length || 0
      },
      database: {
        configured: !!databaseUrl,
        host: databaseUrl?.split('@')[1]?.split('/')[0] || 'not configured'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Configuration check failed' },
      { status: 500 }
    )
  }
}