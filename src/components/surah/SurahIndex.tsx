"use client"

import { useState, useMemo } from 'react'
import { useSurahList } from '@/hooks/useSurahList'
import { SurahCard } from './SurahCard'
import { Search } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export function SurahIndex() {
  const { data: surahs, isLoading, error } = useSurahList()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'Mekah' | 'Madinah'>('all')

  const filteredSurahs = useMemo(() => {
    if (!surahs) return []
    return surahs.filter((surah) => {
      const matchesSearch = surah.namaLatin.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            surah.arti.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            surah.nomor.toString() === searchQuery
      const matchesType = filterType === 'all' || surah.tempatTurun === filterType
      
      return matchesSearch && matchesType
    })
  }, [surahs, searchQuery, filterType])

  if (isLoading) {
    return (
      <div className="flex flex-col p-4">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        {Array.from({ length: 5 }).map((_, i) => (
           <Skeleton key={i} className="h-16 w-full mb-2" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="p-8 text-center text-destructive text-sm">Gagal memuat daftar surah. Periksa koneksi internet Anda.</div>
  }

  return (
    <div className="flex flex-col w-full">
      <div className="sticky top-[108px] z-30 bg-background/95 backdrop-blur-sm p-4 space-y-3 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari surah (mis: Yasin)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${filterType === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent text-muted-foreground border-border hover:bg-accent'}`}
          >
            Semua
          </button>
          <button
            onClick={() => setFilterType('Mekah')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${filterType === 'Mekah' ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent text-muted-foreground border-border hover:bg-accent'}`}
          >
            Makkiyah
          </button>
          <button
            onClick={() => setFilterType('Madinah')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${filterType === 'Madinah' ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent text-muted-foreground border-border hover:bg-accent'}`}
          >
            Madaniyah
          </button>
        </div>
      </div>

      <div className="flex-1 pb-4">
        {filteredSurahs.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">Tidak ada surah yang cocok dengan pencarian Anda.</div>
        ) : (
          filteredSurahs.map((surah) => (
            <SurahCard key={surah.nomor} surah={surah} />
          ))
        )}
      </div>
    </div>
  )
}
