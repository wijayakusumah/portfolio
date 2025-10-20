import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const project = await db.project.findUnique({
      where: { slug },
      include: {
        company: true
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await db.project.update({
      where: { id: project.id },
      data: { viewCount: project.viewCount + 1 }
    })

    return NextResponse.json({ ...project, viewCount: project.viewCount + 1 })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.companyId) {
      return NextResponse.json(
        { error: 'Name and company are required' },
        { status: 400 }
      )
    }

    // Prepare update data with proper field handling
    const updateData: any = {
      name: body.name,
      slug: body.slug,
      companyId: parseInt(body.companyId),
      role: body.role || null,
      type: body.type || null,
      url: body.url || null,
      visibility: body.visibility || 'public',
      status: body.status || null,
      summary: body.summary || null,
      impact: body.impact || null,
      modules: body.modules || null,
      stack: body.stack || null,
      attachments: body.attachments || null,
    }

    const project = await db.project.update({
      where: { slug },
      data: updateData,
      include: {
        company: true
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    await db.project.delete({
      where: { slug }
    })

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}