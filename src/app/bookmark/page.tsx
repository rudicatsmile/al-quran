"use client"

import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'
import Link from 'next/link'
import { ChevronLeft, Trash2, Bookmark as BookmarkIcon } from 'lucide-react'
import { useSurahList } from '@/hooks/useSurahList'

export default function BookmarkPage() {
  const bookmarks = useLiveQuery(() => db.bookmarks.orderBy('createdAt').reverse().toArray())
  const { data: surahs } = useSurahList()

  const removeBookmark = async (id: string) => {
    await db.bookmarks.delete(id)
  }

  const getSurahName = (nomor: number) => {
    if (!surahs) return `Surah ${nomor}`
    const surah = surahs.find(s => s.nomor === nomor)
    return surah ? surah.namaLatin : `Surah ${nomor}`
  }

  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-accent text-foreground">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-lg font-bold">Bookmark</h1>
        </div>
      </header>
      
      <div className="flex-1 w-full p-4">
        {bookmarks === undefined ? (
          <p className="text-center text-muted-foreground mt-10">Memuat...</p>
        ) : bookmarks.length === 0 ? (
          <div className="text-center text-muted-foreground mt-20 flex flex-col items-center">
            <BookmarkIcon className="w-12 h-12 mb-4 text-muted-foreground/50" />
            <p>Belum ada ayat yang ditandai.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {bookmarks.map((bm) => (
              <div key={bm.id} className="flex items-center justify-between p-4 bg-card border border-border/50 rounded-lg shadow-sm">
                <Link href={`/surah/${bm.surahNumber}#ayat-${bm.ayatNumber}`} className="flex-1">
                  <h3 className="font-semibold text-primary">{getSurahName(bm.surahNumber)}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Ayat {bm.ayatNumber}</p>
                </Link>
                <button onClick={() => removeBookmark(bm.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors ml-4">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
