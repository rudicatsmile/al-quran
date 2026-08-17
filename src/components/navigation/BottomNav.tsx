"use client"

import Link from 'next/link'
import { Home, BookOpen, Bookmark, Search, Menu } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { usePathname } from 'next/navigation'

export function BottomNav() {
  const pathname = usePathname()
  const openDrawer = useAppStore((state) => state.openDrawer)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-between items-center h-16 px-4 max-w-md mx-auto">
        <NavItem href="/" icon={<Home className="w-6 h-6" />} label="Beranda" active={pathname === '/'} />
        <NavItem href="/surah" icon={<BookOpen className="w-6 h-6" />} label="Al-Quran" active={pathname === '/surah' || pathname?.startsWith('/surah/')} />
        <NavItem href="/bookmark" icon={<Bookmark className="w-6 h-6" />} label="Bookmark" active={pathname === '/bookmark'} />
        <NavItem href="/cari" icon={<Search className="w-6 h-6" />} label="Cari" active={pathname === '/cari'} />
        <button onClick={openDrawer} className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary">
          <Menu className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Lainnya</span>
        </button>
      </div>
    </nav>
  )
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link href={href} className={`flex flex-col items-center justify-center w-full h-full ${active ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
      {icon}
      <span className="text-[10px] font-medium mt-1">{label}</span>
    </Link>
  )
}
