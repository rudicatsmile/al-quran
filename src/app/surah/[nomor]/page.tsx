import { AyatList } from '@/components/surah/AyatList'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function SurahDetailPage({ params }: { params: Promise<{ nomor: string }> }) {
  const resolvedParams = await params;
  const nomor = parseInt(resolvedParams.nomor, 10);
  
  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-accent text-foreground">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-lg font-bold">Surah {nomor}</h1>
        </div>
      </header>
      <div className="flex-1 w-full">
        <AyatList nomor={nomor} />
      </div>
    </div>
  )
}
