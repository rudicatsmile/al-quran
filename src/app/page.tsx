import { SurahList } from '@/components/surah/SurahList'

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3">
        <h1 className="text-xl font-bold">Quran</h1>
        <p className="text-sm text-muted-foreground">Baca Al-Quran offline-first</p>
      </header>
      <div className="flex-1 w-full">
        <SurahList />
      </div>
    </div>
  )
}
