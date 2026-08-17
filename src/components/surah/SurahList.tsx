"use client"

import { useSurahList } from '@/hooks/useSurahList'
import { SurahCard } from './SurahCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useWindowVirtualizer } from '@tanstack/react-virtual'

export function SurahList() {
  const { data: surahs, isLoading, error } = useSurahList()

  const virtualizer = useWindowVirtualizer({
    count: surahs?.length ?? 0,
    estimateSize: () => 73, // Estimated height of SurahCard (72px + 1px border)
    overscan: 5,
  })

  if (isLoading) {
    return (
      <div className="flex flex-col">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-b border-border/50">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="space-y-2 flex flex-col items-end">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="p-8 text-center text-destructive text-sm">Gagal memuat daftar surah. Periksa koneksi internet Anda.</div>
  }

  if (!surahs) return null

  return (
    <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
      {virtualizer.getVirtualItems().map((virtualItem) => {
        const surah = surahs[virtualItem.index]
        return (
          <div
            key={surah.nomor}
            className="absolute top-0 left-0 w-full"
            style={{
              height: virtualItem.size,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <SurahCard surah={surah} />
          </div>
        )
      })}
    </div>
  )
}
