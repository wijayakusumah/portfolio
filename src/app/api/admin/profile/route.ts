import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('auth')

    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get the first admin (for now, we'll assume there's only one)
    const admin = await db.admin.findFirst({
      select: {
        id: true,
        username: true
      }
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(admin)
  } catch (error) {
    console.error('Get admin error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('auth')

    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { username, currentPassword, newPassword } = await request.json()

    if (!username || (!currentPassword && !newPassword)) {
      return NextResponse.json(
        { error: 'Username is required and either current password or new password must be provided' },
        { status: 400 }
      )
    }

    // Get the current admin
    const currentAdmin = await db.admin.findFirst()

    if (!currentAdmin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      )
    }

    // If changing password, verify current password
    if (currentPassword && newPassword) {
      const isPasswordValid = await bcrypt.compare(currentPassword, currentAdmin.password)

      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 401 }
        )
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10)

      // Update both username and password
      const updatedAdmin = await db.admin.update({
        where: { id: currentAdmin.id },
        data: {
          username,
          password: hashedNewPassword
        },
        select: {
          id: true,
          username: true
        }
      })

      return NextResponse.json({ 
        message: 'Username and password updated successfully',
        admin: updatedAdmin
      })
    } else {
      // Only update username
      const updatedAdmin = await db.admin.update({
        where: { id: currentAdmin.id },
        data: {
          username
        },
        select: {
          id: true,
          username: true
        }
      })

      return NextResponse.json({ 
        message: 'Username updated successfully',
        admin: updatedAdmin
      })
    }
  } catch (error) {
    console.error('Update admin error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}