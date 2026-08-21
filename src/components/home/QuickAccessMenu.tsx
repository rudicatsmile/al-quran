import Link from 'next/link'
import { Book, Compass, MoonStar, BookOpen } from 'lucide-react'

export function QuickAccessMenu() {
  return (
    <div className="px-4 py-2 mt-2">
      <div className="grid grid-cols-4 gap-2">
        <Link href="/tahlil" className="flex flex-col items-center justify-center p-3 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="text-[10px] font-semibold text-primary text-center leading-tight">Tahlil &<br/>Doa</span>
        </Link>
        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-accent hover:bg-accent/80 transition-colors gap-2 opacity-50 cursor-not-allowed">
          <MoonStar className="w-6 h-6 text-foreground" />
          <span className="text-[10px] font-semibold text-foreground text-center leading-tight">Jadwal<br/>Puasa</span>
        </div>
        <Link href="/maulid" className="flex flex-col items-center justify-center p-3 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors gap-2">
          <Book className="w-6 h-6 text-primary" />
          <span className="text-[10px] font-semibold text-primary text-center leading-tight">Kitab<br/>Maulid</span>
        </Link>
        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-accent hover:bg-accent/80 transition-colors gap-2 opacity-50 cursor-not-allowed">
          <Compass className="w-6 h-6 text-foreground" />
          <span className="text-[10px] font-semibold text-foreground text-center leading-tight">Arah<br/>Kiblat</span>
        </div>
      </div>
    </div>
  )
}
