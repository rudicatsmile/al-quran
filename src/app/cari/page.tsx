"use client"

import { useState, useMemo } from 'react'
import { useSurahList } from '@/hooks/useSurahList'
import { SurahCard } from '@/components/surah/SurahCard'
import { ChevronLeft, Search, X } from 'lucide-react'
import Link from 'next/link'
import Fuse from 'fuse.js'

export default function CariPage() {
  const [query, setQuery] = useState('')
  const { data: surahs, isLoading } = useSurahList()

  const fuse = useMemo(() => {
    if (!surahs) return null
    return new Fuse(surahs, {
      keys: [
        { name: 'namaLatin', weight: 2 },
        { name: 'arti', weight: 1.5 },
        { name: 'nama', weight: 1 }
      ],
      threshold: 0.3,
      ignoreLocation: true,
    })
  }, [surahs])

  const results = useMemo(() => {
    if (!query.trim() || !fuse || !surahs) return surahs || []
    return fuse.search(query).map(result => result.item)
  }, [query, fuse, surahs])

  return (
    <div className="flex flex-col w-full h-full min-h-screen pb-20">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-accent text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-bold">Pencarian</h1>
        </div>
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari Surah (contoh: Yasin, Sapi Betina)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-full bg-accent/50 border-none focus:ring-2 focus:ring-primary outline-none transition-shadow text-sm"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 p-1 rounded-full hover:bg-accent text-muted-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>
      
      <div className="flex-1 w-full p-0">
        {isLoading ? (
          <p className="text-center text-muted-foreground mt-10">Memuat data surah...</p>
        ) : results.length === 0 ? (
          <div className="text-center text-muted-foreground mt-20 flex flex-col items-center">
            <Search className="w-12 h-12 mb-4 text-muted-foreground/50" />
            <p>Tidak ada surah yang cocok dengan "{query}"</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="px-4 py-2 bg-accent/30 border-b border-border/50">
              <p className="text-xs font-medium text-muted-foreground">Menampilkan {results.length} Surah</p>
            </div>
            {results.map((surah) => (
              <SurahCard key={surah.nomor} surah={surah} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
