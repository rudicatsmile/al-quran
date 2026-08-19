"use client"

import { useAppStore, useUserSettingsStore } from '@/lib/store'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Moon, Sun, Monitor, Type } from 'lucide-react'

const qariList = [
  { id: '01', name: 'Abdullah Al-Juhany' },
  { id: '02', name: 'Abdul Muhsin Al-Qasim' },
  { id: '03', name: 'Abdurrahman as-Sudais' },
  { id: '04', name: 'Ibrahim Al-Dossari' },
  { id: '05', name: 'Mishary Rashid Alafasy' },
]

const fontList = [
  { id: 'LPMQ Isep Misbah', name: 'LPMQ Isep Misbah (Kemenag)' },
  { id: "'Amiri Quran', serif", name: 'Amiri Quran' },
  { id: "system-ui, sans-serif", name: 'Sistem Default' },
]

export function SettingsSheet() {
  const { activeBottomsheet, closeBottomsheet } = useAppStore()
  const { theme, setTheme } = useTheme()
  const { 
    defaultQari, setDefaultQari,
    showTranslation, setShowTranslation,
    showTransliteration, setShowTransliteration,
    arabicFontSize, setArabicFontSize,
    arabicFontFamily, setArabicFontFamily
  } = useUserSettingsStore()

  const isOpen = activeBottomsheet === 'settings'

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeBottomsheet()}>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[90vh] overflow-y-auto w-full max-w-md mx-auto sm:max-w-md bg-background/95 backdrop-blur-xl">
        <SheetHeader className="text-left pb-2">
          <SheetTitle>Pengaturan</SheetTitle>
          <SheetDescription>Sesuaikan tampilan dan preferensi Qari Anda.</SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col gap-4 py-4 pb-8">
          
          {/* GRUP 1: TAMPILAN & TEMA */}
          <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm flex flex-col gap-5">
            {/* Theme Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Tema Tampilan</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant={theme === 'light' ? 'default' : 'outline'} 
                  className="flex flex-col h-auto py-3 gap-2 bg-background shadow-none"
                  onClick={() => setTheme('light')}
                >
                  <Sun className="w-5 h-5" />
                  <span className="text-xs">Terang</span>
                </Button>
                <Button 
                  variant={theme === 'dark' ? 'default' : 'outline'} 
                  className="flex flex-col h-auto py-3 gap-2 bg-background shadow-none"
                  onClick={() => setTheme('dark')}
                >
                  <Moon className="w-5 h-5" />
                  <span className="text-xs">Gelap</span>
                </Button>
                <Button 
                  variant={theme === 'system' ? 'default' : 'outline'} 
                  className="flex flex-col h-auto py-3 gap-2 bg-background shadow-none"
                  onClick={() => setTheme('system')}
                >
                  <Monitor className="w-5 h-5" />
                  <span className="text-xs">Sistem</span>
                </Button>
              </div>
            </div>

            <div className="h-px bg-border/50 w-full" />

            {/* Tampilan Bacaan Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Tampilan Bacaan</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tampilkan Latin</span>
                  <Switch 
                    checked={showTransliteration} 
                    onCheckedChange={setShowTransliteration} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tampilkan Terjemahan</span>
                  <Switch 
                    checked={showTranslation} 
                    onCheckedChange={setShowTranslation} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* GRUP 2: TIPOGRAFI ARAB */}
          <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm flex flex-col gap-5">
            {/* Jenis Huruf Arab Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Jenis Khat Arab</h3>
              <Select value={arabicFontFamily} onValueChange={setArabicFontFamily}>
                <SelectTrigger className="w-full h-11 bg-background">
                  <SelectValue placeholder="Pilih Font Arab" />
                </SelectTrigger>
                <SelectContent>
                  {fontList.map((font) => (
                    <SelectItem key={font.id} value={font.id}>
                      {font.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="h-px bg-border/50 w-full" />

            {/* Ukuran Huruf Arab Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Ukuran Huruf Arab</h3>
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-md">{arabicFontSize}px</span>
              </div>
              <div className="flex items-center gap-4 bg-background p-3 rounded-lg border border-border/50">
                <Type className="w-4 h-4 text-muted-foreground" />
                <Slider 
                  value={[arabicFontSize]} 
                  onValueChange={(val) => setArabicFontSize(Array.isArray(val) ? val[0] : val)} 
                  min={18} 
                  max={48} 
                  step={2} 
                  className="flex-1"
                />
                <Type className="w-6 h-6 text-foreground" />
              </div>
            </div>
          </div>

          {/* GRUP 3: AUDIO */}
          <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-foreground">Pilih Suara Qari (Murottal)</h3>
            <p className="text-xs text-muted-foreground mb-1">Suara default untuk pemutaran ayat</p>
            <Select value={defaultQari} onValueChange={setDefaultQari}>
              <SelectTrigger className="w-full h-11 bg-background">
                <SelectValue placeholder="Pilih Qari" />
              </SelectTrigger>
              <SelectContent>
                {qariList.map((qari) => (
                  <SelectItem key={qari.id} value={qari.id}>
                    {qari.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  )
}
