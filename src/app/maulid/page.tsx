"use client"

import { ArrowLeft, BookOpen } from 'lucide-react'
import Link from 'next/link'
import maulidIndex from '@/lib/data/maulid.json'
import { ClientInit } from '@/components/providers/client-init'

export default function MaulidIndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      <ClientInit />
      
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-accent/50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <div>
          <h1 className="text-xl font-bold leading-tight">Maulid</h1>
          <p className="text-xs text-muted-foreground">Kumpulan Bacaan Maulid</p>
        </div>
      </header>

      <div className="flex flex-col p-4 gap-3">
        {maulidIndex.map((kitab) => (
          <Link href={`/maulid/${kitab.id}`} key={kitab.id}>
            <div className="flex items-center p-4 border border-border/50 rounded-2xl bg-card shadow-sm hover:shadow-md hover:border-primary/50 transition-all gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-foreground">{kitab.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{kitab.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
