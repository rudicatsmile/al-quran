"use client"

import { useSurahList } from '@/hooks/useSurahList'
import { juzList } from '@/lib/data/juz'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export function JuzIndex() {
  const { data: surahs, isLoading, error } = useSurahList()

  if (isLoading) {
    return (
      <div className="flex flex-col p-4 gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
           <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    )
  }

  if (error || !surahs) {
    return <div className="p-8 text-center text-destructive text-sm">Gagal memuat data Juz.</div>
  }

  const getSurahName = (nomor: number) => {
    const surah = surahs.find(s => s.nomor === nomor)
    return surah ? surah.namaLatin : `Surah ${nomor}`
  }

  return (
    <div className="flex flex-col w-full p-4 gap-3 pb-8">
      {juzList.map((juz) => (
        <Link 
          key={juz.juz} 
          href={`/surah/${juz.surahMulai}#ayat-${juz.ayatMulai}`}
          className="flex items-center p-4 bg-card border border-border/60 hover:bg-accent hover:border-primary/50 rounded-xl transition-all shadow-sm group"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mr-4">
            <span className="font-bold text-lg">{juz.juz}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-base">Juz {juz.juz}</h3>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Mulai: {getSurahName(juz.surahMulai)} ayat {juz.ayatMulai}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
