"use client"

import { useEffect } from 'react'
import { db } from '@/lib/db'
import { useSurahDetail } from '@/hooks/useSurahDetail'
import { AyatCard } from './AyatCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useWindowVirtualizer } from '@tanstack/react-virtual'

import type { SurahDetail } from '@/lib/api/equran'

import { AyatAudioPlayer } from './AyatAudioPlayer'

export function AyatList({ nomor, initialData }: { nomor: number, initialData?: SurahDetail }) {
  const { data: surah, isLoading, error } = useSurahDetail(nomor, initialData)

  const virtualizer = useWindowVirtualizer({
    count: surah?.ayat?.length ?? 0,
    estimateSize: () => 200, // Estimate height
    overscan: 3,
  })

  useEffect(() => {
    if (surah) {
      db.history.get(nomor.toString()).then(existing => {
        if (!existing) {
          db.history.put({
            id: nomor.toString(),
            surahNumber: nomor,
            ayatNumber: 1,
            updatedAt: new Date().toISOString()
          })
        } else {
           db.history.put({
             ...existing,
             updatedAt: new Date().toISOString()
           })
        }
      }).catch(err => console.error(err))
    }
  }, [surah, nomor])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-md" />
        ))}
      </div>
    )
  }

  if (error || !surah) {
    return <div className="p-8 text-center text-destructive text-sm">Gagal memuat ayat.</div>
  }

  return (
    <>
      <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const ayat = surah.ayat[virtualItem.index]
          return (
            <div
              key={ayat.nomorAyat}
              data-index={virtualItem.index}
              ref={(el) => {
                if (el) {
                  queueMicrotask(() => virtualizer.measureElement(el));
                }
              }}
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <AyatCard surahNumber={nomor} ayat={ayat} />
            </div>
          )
        })}
      </div>
      <AyatAudioPlayer surah={surah} />
    </>
  )
}
