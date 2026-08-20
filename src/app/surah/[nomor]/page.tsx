import { AyatList } from '@/components/surah/AyatList'
import { SurahInfoCard } from '@/components/surah/SurahInfoCard'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { equranApi } from '@/lib/api/equran'

export async function generateStaticParams() {
  // Generate routes for all 114 surahs
  return Array.from({ length: 114 }).map((_, i) => ({
    nomor: (i + 1).toString(),
  }))
}

export default async function SurahDetailPage({ params }: { params: Promise<{ nomor: string }> }) {
  const resolvedParams = await params;
  const nomor = parseInt(resolvedParams.nomor, 10);
  
  // Fetch on server
  let surahData = undefined;
  try {
    surahData = await equranApi.getSurahDetail(nomor);
  } catch (e) {
    console.error("Failed to fetch surah data on server", e);
  }
  
  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-accent text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-none">{surahData ? surahData.namaLatin : `Surah ${nomor}`}</h1>
            {surahData && (
              <span className="text-[11px] font-medium text-muted-foreground mt-1 uppercase tracking-wider">
                {surahData.tempatTurun} • {surahData.jumlahAyat} Ayat
              </span>
            )}
          </div>
        </div>
        {surahData && (
          <div className="text-xl font-bold font-amiri text-primary">
            {surahData.nama}
          </div>
        )}
      </header>
      
      <div className="flex-1 w-full flex flex-col">
        {surahData && <SurahInfoCard surah={surahData} />}
        <AyatList nomor={nomor} initialData={surahData} />
      </div>
    </div>
  )
}
