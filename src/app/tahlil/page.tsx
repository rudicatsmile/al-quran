"use client"

import { ArrowLeft, Settings2 } from 'lucide-react'
import Link from 'next/link'
import tahlilData from '@/lib/data/tahlil.json'
import { TahlilCard, TahlilItem } from '@/components/tahlil/TahlilCard'
import { ClientInit } from '@/components/providers/client-init'
import { useAppStore } from '@/lib/store'

export default function TahlilPage() {
  const items = tahlilData as TahlilItem[]
  const openBottomsheet = useAppStore(state => state.openBottomsheet)

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      <ClientInit />
      
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-accent/50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div>
            <h1 className="text-xl font-bold leading-tight">Tahlilan</h1>
            <p className="text-xs text-muted-foreground">Kumpulan Doa & Dzikir</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => openBottomsheet('settings')} className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <Settings2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* List */}
      <div className="flex flex-col w-full">
        {items.map((item) => (
          <TahlilCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
