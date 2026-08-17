import { SurahList } from '@/components/surah/SurahList'
import { Slideshow } from '@/components/home/Slideshow'
import { serverDb } from '@/lib/db/postgres'
import { slideshows, settings } from '@/lib/db/schema'
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
    
  const appNameSetting = await serverDb
    .select()
    .from(settings)
    .where(eq(settings.key, 'appName'))
    .limit(1)
    .catch(() => [])

  const appName = appNameSetting.length > 0 ? appNameSetting[0].value : 'Quran'

  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center gap-3">
        <img src="/logo-yayasan.png" alt="Logo Yayasan" className="h-10 w-auto" />
        <div>
          <h1 className="text-xl font-bold leading-tight">{appName}</h1>
          <p className="text-xs text-muted-foreground">Baca Al-Quran offline-first</p>
        </div>
      </header>
      
      {slides.length > 0 && <Slideshow slides={slides} />}

      <div className="flex-1 w-full mt-2">
        <SurahList />
      </div>
    </div>
  )
}
