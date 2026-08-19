"use client"

import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'
import { useSurahList } from '@/hooks/useSurahList'
import Link from 'next/link'
import { ChevronLeft, History, Clock } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function RiwayatPage() {
  const history = useLiveQuery(() => db.history.orderBy('updatedAt').reverse().toArray())
  const { data: surahs, isLoading: isLoadingSurah } = useSurahList()

  const getSurahName = (nomor: number) => {
    if (!surahs) return `Surah ${nomor}`
    const surah = surahs.find(s => s.nomor === nomor)
    return surah ? surah.namaLatin : `Surah ${nomor}`
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-accent text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold">Terakhir Dibaca</h1>
        </div>
      </header>

      <div className="flex-1 w-full p-4 flex flex-col gap-3 pb-8">
        {history === undefined || isLoadingSurah ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-24 rounded-xl" />
          ))
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground bg-card border border-border/50 border-dashed rounded-xl mt-4">
            <History className="w-12 h-12 mb-4 opacity-20" />
            <p>Belum ada riwayat bacaan.</p>
            <p className="text-xs mt-1">Riwayat akan tersimpan otomatis saat Anda membaca atau memutar audio surah.</p>
          </div>
        ) : (
          history.map(item => (
            <Link 
              key={item.id}
              href={`/surah/${item.surahNumber}#ayat-${item.ayatNumber}`}
              className="flex flex-col p-4 bg-card border border-border/60 rounded-xl hover:border-primary/50 hover:bg-accent transition-all shadow-sm group"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {getSurahName(item.surahNumber)}
                  </h3>
                  <span className="text-sm font-medium text-primary mt-1">Ayat {item.ayatNumber}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground gap-1.5 bg-background px-2.5 py-1 rounded-full border border-border/50">
                  <Clock className="w-3.5 h-3.5" />
                  {formatTime(item.updatedAt)}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="text-xs font-semibold px-3 py-1.5 bg-primary/10 text-primary rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Lanjutkan Bacaan
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
