"use client"

import { useAppStore } from '@/lib/store'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { useTafsirDetail } from '@/hooks/useTafsirDetail'
import { Loader2 } from 'lucide-react'

export function TafsirSheet() {
  const { activeBottomsheet, closeBottomsheet, currentTafsir } = useAppStore()
  const isOpen = activeBottomsheet === 'tafsir'

  const { data: tafsirDetail, isLoading, error } = useTafsirDetail(
    currentTafsir?.surahNumber ?? 1, 
    isOpen && currentTafsir !== null
  )

  const tafsirAyat = tafsirDetail?.tafsir?.find((t) => t.ayat === currentTafsir?.ayatNumber)

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeBottomsheet()}>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[90vh] overflow-y-auto w-full max-w-md mx-auto sm:max-w-md bg-background/95 backdrop-blur-xl">
        <SheetHeader className="text-left pb-4">
          <SheetTitle>Tafsir Kemenag</SheetTitle>
          <SheetDescription>
            {currentTafsir ? `Surat ${tafsirDetail?.namaLatin ?? '...'} Ayat ${currentTafsir.ayatNumber}` : 'Memuat tafsir...'}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col gap-4 py-2 pb-8">
          {isLoading && (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-xl text-sm">
              Gagal memuat tafsir. Pastikan koneksi internet Anda aktif.
            </div>
          )}

          {!isLoading && !error && tafsirAyat && (
            <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm text-sm leading-relaxed text-foreground whitespace-pre-wrap">
              {tafsirAyat.teks}
            </div>
          )}

          {!isLoading && !error && !tafsirAyat && tafsirDetail && (
            <div className="text-sm text-muted-foreground text-center py-4">
              Tafsir untuk ayat ini belum tersedia.
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
