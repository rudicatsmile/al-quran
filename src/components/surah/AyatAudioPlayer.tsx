"use client"

import { useEffect, useRef } from 'react'
import { useAppStore, useUserSettingsStore } from '@/lib/store'
import type { SurahDetail } from '@/lib/api/equran'

export function AyatAudioPlayer({ surah }: { surah: SurahDetail }) {
  const { currentAudio, isPlaying, setIsPlaying, setCurrentAudio } = useAppStore()
  const { defaultQari } = useUserSettingsStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const isCurrentSurah = currentAudio?.surahNumber === surah.nomor
  
  // Find the URL for the currently playing ayat
  const currentAyat = isCurrentSurah ? surah.ayat.find(a => a.nomorAyat === currentAudio?.ayatNumber) : null
  const audioUrl = currentAyat ? (currentAyat.audio[defaultQari] || currentAyat.audio['01']) : ''

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      // Auto-play next ayat if exists
      if (isCurrentSurah && currentAudio) {
        const nextAyatNumber = currentAudio.ayatNumber! + 1
        const nextAyat = surah.ayat.find(a => a.nomorAyat === nextAyatNumber)
        
        if (nextAyat) {
          setCurrentAudio({ surahNumber: surah.nomor, ayatNumber: nextAyatNumber })
        } else {
          setIsPlaying(false)
          setCurrentAudio(null)
        }
      } else {
        setIsPlaying(false)
      }
    }
    
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
  }, [currentAudio, isCurrentSurah, surah, setCurrentAudio, setIsPlaying])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && audioUrl) {
        // Must wait for src to be ready
        audioRef.current.play().catch(e => console.error("Audio play failed", e))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, audioUrl])

  if (!isCurrentSurah) return null;

  return (
    <audio ref={audioRef} src={audioUrl} />
  )
}
