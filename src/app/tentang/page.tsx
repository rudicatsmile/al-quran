import Link from 'next/link'
import { ChevronLeft, Info, Heart, Database, Code, BookOpen } from 'lucide-react'

export default function TentangPage() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-accent text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-lg font-bold">Tentang Aplikasi</h1>
        </div>
      </header>

      <div className="flex-1 w-full p-4 space-y-6 max-w-md mx-auto sm:max-w-2xl">

        {/* Logo and App Title */}
        <div className="flex flex-col items-center justify-center pt-8 pb-4 text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 shadow-sm border border-primary/20">
            <BookOpen className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Al-Quran Digital</h2>
          <p className="text-muted-foreground mt-1 text-sm font-medium">Versi 1.0.0</p>
        </div>

        {/* Developer Info */}
        <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-500/10 rounded-lg">
              <Heart className="w-5 h-5 text-rose-500" />
            </div>
            <h3 className="font-semibold text-foreground">Pengembang</h3>
          </div>
          <div className="flex flex-col items-center text-center p-5 bg-accent/30 rounded-xl border border-border/40">
            <h4 className="font-medium text-muted-foreground text-sm uppercase tracking-wider mb-2">Dipersembahkan oleh:</h4>
            <p className="text-primary font-bold text-lg leading-snug">
              Bagian Umum @Sub Bagian Data dan Media
            </p>
            <div className="w-12 h-1 bg-primary/20 rounded-full my-3"></div>
            <p className="font-semibold text-foreground text-lg">
              Yayasan Al Wathoniyah Asshodriyah 9
            </p>
          </div>
        </div>

        {/* Mission/Vision */}
        <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Tujuan Aplikasi</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Aplikasi ini dibangun untuk memberikan kemudahan bagi umat Islam dalam membaca, mempelajari, dan memahami Al-Quran kapan saja dan di mana saja melalui perangkat digital dengan pengalaman pengguna yang modern dan interaktif.
          </p>
        </div>

        {/* Data Source Credits */}
        <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Database className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="font-semibold text-foreground">Sumber Data</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Seluruh data teks Arab, terjemahan, transliterasi Latin, dan audio Murottal bersumber dari <span className="font-medium text-foreground">API EQuran Kemenag RI</span>. Kami mengucapkan terima kasih kepada pihak Kementerian Agama yang telah menyediakan layanan open API yang sangat bermanfaat ini.
          </p>
        </div>

        {/* Tech Stack */}


        <div className="pb-10 pt-4 flex justify-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Yayasan Al Wathoniyah Asshodriyah 9</p>
        </div>
      </div>
    </div>
  )
}
