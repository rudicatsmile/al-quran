import { SurahList } from '@/components/surah/SurahList'
import { Slideshow } from '@/components/home/Slideshow'
import { serverDb } from '@/lib/db/postgres'
import { slideshows } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const slides = await serverDb
    .select({
      id: slideshows.id,
      imageUrl: slideshows.imageUrl,
      linkUrl: slideshows.linkUrl,
    })
    .from(slideshows)
    .where(eq(slideshows.isActive, true))
    .orderBy(desc(slideshows.orderIndex), desc(slideshows.createdAt))
    .catch(() => []) // Handle error safely

  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3">
        <h1 className="text-xl font-bold">Quran</h1>
        <p className="text-sm text-muted-foreground">Baca Al-Quran offline-first</p>
      </header>
      
      {slides.length > 0 && <Slideshow slides={slides} />}

      <div className="flex-1 w-full mt-2">
        <SurahList />
      </div>
    </div>
  )
}
