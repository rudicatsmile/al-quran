"use client"

import { useState, useRef, useEffect } from 'react'
import type { SurahDetail } from '@/lib/api/equran'
import { Play, Pause, Info, ChevronDown, ChevronUp, Mic2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUserSettingsStore } from '@/lib/store'

const qariList = [
  { id: '01', name: 'Abdullah Al-Juhany' },
  { id: '02', name: 'Abdul Muhsin Al-Qasim' },
  { id: '03', name: 'Abdurrahman as-Sudais' },
  { id: '04', name: 'Ibrahim Al-Dossari' },
  { id: '05', name: 'Mishary Rashid Alafasy' },
]

export function SurahInfoCard({ surah }: { surah: SurahDetail }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { defaultQari } = useUserSettingsStore()

  const audioUrl = surah.audioFull[defaultQari] || surah.audioFull['01']
  const selectedQariName = qariList.find(q => q.id === defaultQari)?.name || 'Murottal'

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current
      const handleEnded = () => setIsPlaying(false)
      const handlePause = () => setIsPlaying(false)
      const handlePlay = () => setIsPlaying(true)
      
      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('play', handlePlay)
      
      return () => {
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('play', handlePlay)
      }
    }
  }, [audioUrl])

  // Pause audio when qari changes
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [defaultQari])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  return (
    <div className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm mx-4 my-4 flex flex-col">
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-primary">Arti Surat</span>
            <span className="text-lg font-bold text-foreground">{surah.arti}</span>
          </div>
          
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <Button 
              onClick={togglePlay}
              variant="default"
              size="icon"
              className="rounded-full w-12 h-12 shadow-md bg-primary hover:bg-primary/90"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </Button>
            <div className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-accent/50 px-2 py-0.5 rounded-full max-w-[100px]">
              <Mic2 className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{selectedQariName}</span>
            </div>
          </div>
        </div>
        
        <div className="h-px w-full bg-border/50 my-1" />
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Info className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Deskripsi Singkat</span>
          </div>
          <div 
            className={`text-sm text-muted-foreground leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}
            dangerouslySetInnerHTML={{ __html: surah.deskripsi }}
          />
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-primary hover:underline self-start flex items-center gap-1 mt-1"
          >
            {isExpanded ? (
              <>Tutup <ChevronUp className="w-3 h-3" /></>
            ) : (
              <>Baca Selengkapnya <ChevronDown className="w-3 h-3" /></>
            )}
          </button>
        </div>
      </div>
      
      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} preload="none" />
      )}
    </div>
  )
}
