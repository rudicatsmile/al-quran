import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import maulidIndex from '@/lib/data/maulid.json'
import maulidContent from '@/lib/data/maulid-content.json'
import { MaulidContentCard, MaulidItem } from '@/components/maulid/MaulidContentCard'
import { ClientInit } from '@/components/providers/client-init'
import { SettingsButton } from './SettingsButton'

export function generateStaticParams() {
  return maulidIndex.map((kitab) => ({
    id: kitab.id,
  }))
}

export default async function MaulidDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  
  const kitab = maulidIndex.find(k => k.id === id)

  if (!kitab) {
    notFound()
  }

  // @ts-ignore
  const items = (maulidContent[id] || []) as MaulidItem[]

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      <ClientInit />
      
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/maulid" className="p-2 -ml-2 rounded-full hover:bg-accent/50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div>
            <h1 className="text-xl font-bold leading-tight">{kitab.title}</h1>
            <p className="text-xs text-muted-foreground line-clamp-1">{kitab.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SettingsButton />
        </div>
      </header>

      <div className="flex flex-col w-full">
        {items.length > 0 ? (
          items.map((item) => (
            <MaulidContentCard key={item.id} item={item} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <p className="text-muted-foreground">Isi kitab ini belum tersedia.</p>
          </div>
        )}
      </div>
    </div>
  )
}
