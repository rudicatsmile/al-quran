import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { serverDb } from '@/lib/db/postgres'
import { slideshows } from '@/lib/db/schema'
import { writeFile, access, mkdir } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

export async function POST(request: Request) {
  const session = await auth()
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('image') as File | null
    const linkUrl = formData.get('linkUrl') as string || ''

    if (!file) {
      return NextResponse.json({ error: 'Gambar dibutuhkan' }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Generate unique filename
    const ext = file.name.split('.').pop()
    const filename = `${crypto.randomUUID()}.${ext}`
    
    // Set upload directory to public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    
    // Create directory if it doesn't exist
    try {
      await access(uploadDir)
    } catch {
      await mkdir(uploadDir, { recursive: true })
    }

    // Write file to public/uploads
    await writeFile(path.join(uploadDir, filename), buffer)
    const imageUrl = `/uploads/${filename}`

    // Save to database
    await serverDb.insert(slideshows).values({
      imageUrl,
      linkUrl,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error inserting slideshow:", error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
