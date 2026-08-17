"use client"

import { useEffect, useRef } from 'react'
import { useAppStore, useUserSettingsStore } from '@/lib/store'
import { equranApi } from '@/lib/api/equran'

export function AudioProvider() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { currentAudio, isPlaying, playbackSpeed, setIsPlaying, setCurrentAudio } = useAppStore()
  const defaultQari = useUserSettingsStore((state) => state.defaultQari)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      
      audioRef.current.onended = async () => {
        const current = useAppStore.getState().currentAudio;
        if (!current) return;
        try {
          const surah = await equranApi.getSurahDetail(current.surahNumber);
          if (current.ayatNumber && current.ayatNumber < surah.jumlahAyat) {
             setCurrentAudio({ surahNumber: current.surahNumber, ayatNumber: current.ayatNumber + 1 });
             useAppStore.getState().setIsPlaying(true);
          } else {
             // End of Surah
             useAppStore.getState().setIsPlaying(false);
          }
        } catch (e) {
          useAppStore.getState().setIsPlaying(false);
        }
      }
      
      audioRef.current.onplay = () => useAppStore.getState().setIsPlaying(true)
      audioRef.current.onpause = () => useAppStore.getState().setIsPlaying(false)
    }
  }, [setCurrentAudio])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed
    }
  }, [playbackSpeed])

  useEffect(() => {
    async function playAudio() {
      if (!currentAudio || !audioRef.current) {
        if (!currentAudio && audioRef.current) {
          audioRef.current.pause()
        }
        return
      }
      
      try {
        const surah = await equranApi.getSurahDetail(currentAudio.surahNumber)
        const ayat = surah.ayat.find(a => a.nomorAyat === currentAudio.ayatNumber)
        
        if (ayat && ayat.audio[defaultQari]) {
          if (audioRef.current.src !== ayat.audio[defaultQari]) {
            audioRef.current.src = ayat.audio[defaultQari]
          }
          if (isPlaying) {
            audioRef.current.play().catch(e => {
              console.error("Audio play blocked", e)
              setIsPlaying(false)
            })
          } else {
            audioRef.current.pause()
          }
          
          if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: `Surah ${surah.namaLatin} - Ayat ${currentAudio.ayatNumber}`,
              artist: `Murottal`,
              album: 'Quran Web App',
              artwork: [
                { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
              ]
            });
            
            navigator.mediaSession.setActionHandler('play', () => setIsPlaying(true));
            navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false));
            navigator.mediaSession.setActionHandler('nexttrack', () => {
              setCurrentAudio({ ...currentAudio, ayatNumber: (currentAudio.ayatNumber || 1) + 1 });
            });
            navigator.mediaSession.setActionHandler('previoustrack', () => {
              if (currentAudio.ayatNumber && currentAudio.ayatNumber > 1) {
                setCurrentAudio({ ...currentAudio, ayatNumber: currentAudio.ayatNumber - 1 });
              }
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch audio", err)
      }
    }
    
    playAudio()
  }, [currentAudio, isPlaying, defaultQari, setIsPlaying, setCurrentAudio])

  return null
}
