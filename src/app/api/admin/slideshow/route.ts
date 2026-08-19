import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { serverDb } from '@/lib/db/postgres'
import { slideshows } from '@/lib/db/schema'
import { put } from '@vercel/blob'
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

    // Generate unique filename
    const ext = file.name.split('.').pop()
    const filename = `slideshows/${crypto.randomUUID()}.${ext}`
    
    // Upload to Vercel Blob
    const blob = await put(filename, file, { access: 'public' })
    const imageUrl = blob.url

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
