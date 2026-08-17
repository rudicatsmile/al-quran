"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { useAppStore } from '@/lib/store'
import Link from 'next/link'
import { Book, Bookmark, History, Settings, Info } from 'lucide-react'

export function Drawer() {
  const isDrawerOpen = useAppStore((state) => state.isDrawerOpen)
  const closeDrawer = useAppStore((state) => state.closeDrawer)

  return (
    <Sheet open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu Aplikasi</SheetTitle>
          <SheetDescription>
            Navigasi fitur Al-Quran
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 mt-6">
          <DrawerItem href="/surah" icon={<Book className="w-5 h-5" />} label="Daftar Surah" onClick={closeDrawer} />
          <DrawerItem href="/bookmark" icon={<Bookmark className="w-5 h-5" />} label="Bookmark" onClick={closeDrawer} />
          <DrawerItem href="/riwayat" icon={<History className="w-5 h-5" />} label="Riwayat Baca" onClick={closeDrawer} />
          
          <button 
            onClick={() => {
              closeDrawer();
              useAppStore.getState().openBottomsheet('settings');
            }} 
            className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors w-full text-left"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Pengaturan</span>
          </button>
          
          <DrawerItem href="/tentang" icon={<Info className="w-5 h-5" />} label="Tentang Aplikasi" onClick={closeDrawer} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

function DrawerItem({ href, icon, label, onClick }: { href: string; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}
