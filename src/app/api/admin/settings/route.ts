import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { serverDb } from '@/lib/db/postgres'
import { settings } from '@/lib/db/schema'

export async function POST(request: Request) {
  const session = await auth()
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { key, value } = body

    if (!key || typeof value === 'undefined') {
      return NextResponse.json({ error: 'Key dan value dibutuhkan' }, { status: 400 })
    }

    // Upsert (Insert or Update)
    await serverDb.insert(settings)
      .values({ key, value })
      .onConflictDoUpdate({
        target: settings.key,
        set: { value },
      })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
