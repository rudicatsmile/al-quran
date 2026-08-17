"use client"

import { useAppStore, useUserSettingsStore } from '@/lib/store'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Monitor, Check } from 'lucide-react'

const qariList = [
  { id: '01', name: 'Abdullah Al-Juhany' },
  { id: '02', name: 'Abdul Muhsin Al-Qasim' },
  { id: '03', name: 'Abdurrahman as-Sudais' },
  { id: '04', name: 'Ibrahim Al-Dossari' },
  { id: '05', name: 'Mishary Rashid Alafasy' },
]

export function SettingsSheet() {
  const { activeBottomsheet, closeBottomsheet } = useAppStore()
  const { theme, setTheme } = useTheme()
  const { defaultQari, setDefaultQari } = useUserSettingsStore()

  const isOpen = activeBottomsheet === 'settings'

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeBottomsheet()}>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[90vh] overflow-y-auto w-full max-w-md mx-auto sm:max-w-md">
        <SheetHeader className="text-left pb-4">
          <SheetTitle>Pengaturan</SheetTitle>
          <SheetDescription>Sesuaikan tampilan dan preferensi Qari Anda.</SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col gap-6 py-4">
          {/* Theme Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Tema Tampilan</h3>
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant={theme === 'light' ? 'default' : 'outline'} 
                className="flex flex-col h-auto py-3 gap-2"
                onClick={() => setTheme('light')}
              >
                <Sun className="w-5 h-5" />
                <span className="text-xs">Terang</span>
              </Button>
              <Button 
                variant={theme === 'dark' ? 'default' : 'outline'} 
                className="flex flex-col h-auto py-3 gap-2"
                onClick={() => setTheme('dark')}
              >
                <Moon className="w-5 h-5" />
                <span className="text-xs">Gelap</span>
              </Button>
              <Button 
                variant={theme === 'system' ? 'default' : 'outline'} 
                className="flex flex-col h-auto py-3 gap-2"
                onClick={() => setTheme('system')}
              >
                <Monitor className="w-5 h-5" />
                <span className="text-xs">Sistem</span>
              </Button>
            </div>
          </div>

          {/* Qari Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Pilih Suara Qari (Murottal)</h3>
            <div className="flex flex-col gap-2">
              {qariList.map((qari) => (
                <button
                  key={qari.id}
                  onClick={() => setDefaultQari(qari.id)}
                  className={`flex items-center justify-between p-3 rounded-lg border text-left transition-colors ${
                    defaultQari === qari.id 
                      ? 'bg-primary/10 border-primary text-primary font-medium shadow-sm' 
                      : 'bg-card border-border/60 hover:bg-accent/50'
                  }`}
                >
                  <span className="text-sm">{qari.name}</span>
                  {defaultQari === qari.id && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
