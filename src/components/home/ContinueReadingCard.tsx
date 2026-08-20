"use client"

import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'
import { equranApi } from '@/lib/api/equran'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen } from 'lucide-react'

export function ContinueReadingCard() {
  const router = useRouter()
  
  // Get the most recent history entry
  const history = useLiveQuery(async () => {
    return await db.history.orderBy('updatedAt').reverse().first()
  })
  
  const [surahName, setSurahName] = useState<string | null>(null)

  useEffect(() => {
    if (history) {
      // Check cache first for Surah name, or fetch
      db.surahCache.get(history.surahNumber).then(cached => {
        if (cached) {
          setSurahName(cached.data.namaLatin)
        } else {
          equranApi.getSurahDetail(history.surahNumber).then(data => {
            setSurahName(data.namaLatin)
          }).catch(() => setSurahName(`Surat ${history.surahNumber}`))
        }
      })
    }
  }, [history])

  if (!history) return null;

  return (
    <div className="px-4 py-2">
      <div 
        onClick={() => router.push(`/surah/${history.surahNumber}`)}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-5 text-primary-foreground shadow-lg cursor-pointer hover:shadow-xl transition-all"
      >
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <BookOpen className="w-24 h-24 transform rotate-12" />
        </div>
        
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider opacity-90">Terakhir Dibaca</span>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold">{surahName || 'Memuat...'}</h3>
            <p className="text-sm opacity-90">Ayat {history.ayatNumber}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
