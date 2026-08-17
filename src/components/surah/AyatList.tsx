"use client"

import { useSurahDetail } from '@/hooks/useSurahDetail'
import { AyatCard } from './AyatCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useWindowVirtualizer } from '@tanstack/react-virtual'

export function AyatList({ nomor }: { nomor: number }) {
  const { data: surah, isLoading, error } = useSurahDetail(nomor)

  const virtualizer = useWindowVirtualizer({
    count: surah?.ayat?.length ?? 0,
    estimateSize: () => 200, // Estimate height
    overscan: 3,
  })

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
    <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
      {virtualizer.getVirtualItems().map((virtualItem) => {
        const ayat = surah.ayat[virtualItem.index]
        return (
          <div
            key={ayat.nomorAyat}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
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
  )
}
