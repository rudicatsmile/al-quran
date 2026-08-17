"use client"

import { useAppStore } from '@/lib/store'
import { Play, Pause, SkipForward, SkipBack, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MiniPlayer() {
  const { currentAudio, isPlaying, setIsPlaying, setCurrentAudio } = useAppStore()

  if (!currentAudio) return null

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 bg-card border-t border-border shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-2 flex items-center justify-between px-4 max-w-md mx-auto transition-transform duration-300">
      <div className="flex flex-col">
        <p className="text-sm font-bold text-primary">Surah {currentAudio.surahNumber}</p>
        <p className="text-xs text-muted-foreground">Ayat {currentAudio.ayatNumber}</p>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
          if (currentAudio.ayatNumber && currentAudio.ayatNumber > 1) {
            setCurrentAudio({ ...currentAudio, ayatNumber: currentAudio.ayatNumber - 1 })
          }
        }}>
          <SkipBack className="w-4 h-4" />
        </Button>
        
        <Button variant="default" size="icon" className="rounded-full h-10 w-10 shadow-md" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
          setCurrentAudio({ ...currentAudio, ayatNumber: (currentAudio.ayatNumber || 1) + 1 })
        }}>
          <SkipForward className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => {
          setCurrentAudio(null)
          setIsPlaying(false)
        }}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
