import Link from 'next/link'
import type { Surah } from '@/lib/api/equran'

interface SurahCardProps {
  surah: Surah;
}

export function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link href={`/surah/${surah.nomor}`} className="flex items-center gap-4 p-4 border-b border-border/50 hover:bg-accent/50 transition-colors">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground font-semibold text-sm">
        {surah.nomor}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-base">{surah.namaLatin}</h3>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {surah.tempatTurun} • {surah.jumlahAyat} AYAT
        </p>
      </div>
      <div className="text-right">
        <h3 className="font-bold text-lg font-arabic text-primary">{surah.nama}</h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{surah.arti}</p>
      </div>
    </Link>
  )
}
