import { useState } from 'react'
import { Ayat } from '@/lib/api/equran'
import { MoreVertical, Play, Pause, Bookmark as BookmarkIcon, BookmarkCheck, BookOpen } from 'lucide-react'
import { useAppStore, useUserSettingsStore } from '@/lib/store'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'

interface AyatCardProps {
  surahNumber: number;
  ayat: Ayat;
}

export function AyatCard({ surahNumber, ayat }: AyatCardProps) {
  const { currentAudio, isPlaying, setIsPlaying, setCurrentAudio, openBottomsheet, setCurrentTafsir } = useAppStore()
  const { showTranslation, showTransliteration, arabicFontSize, arabicFontFamily, isTahfizhMode } = useUserSettingsStore()
  
  const [isRevealed, setIsRevealed] = useState(false)

  const isThisAyatPlaying = currentAudio?.surahNumber === surahNumber && currentAudio?.ayatNumber === ayat.nomorAyat
  
  const bookmarkId = `${surahNumber}-${ayat.nomorAyat}`
  const isBookmarked = useLiveQuery(() => db.bookmarks.get(bookmarkId), [bookmarkId])
  
  const handlePlay = async () => {
    if (isThisAyatPlaying) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentAudio({ surahNumber, ayatNumber: ayat.nomorAyat })
      setIsPlaying(true)
      
      try {
        await db.history.put({
          id: surahNumber.toString(),
          surahNumber,
          ayatNumber: ayat.nomorAyat,
          updatedAt: new Date().toISOString()
        })
      } catch (err) {
        console.error("Failed to save history", err)
      }
    }
  }

  const toggleBookmark = async () => {
    if (isBookmarked) {
      await db.bookmarks.delete(bookmarkId)
    } else {
      await db.bookmarks.put({
        id: bookmarkId,
        surahNumber,
        ayatNumber: ayat.nomorAyat,
        createdAt: new Date().toISOString(),
      })
    }
  }

  const handleReveal = () => {
    if (isTahfizhMode && !isRevealed) {
      setIsRevealed(true)
    }
  }
  
  const handleOpenTafsir = () => {
    setCurrentTafsir({ surahNumber, ayatNumber: ayat.nomorAyat })
    openBottomsheet('tafsir')
  }

  // if tahfizh mode is active and not revealed, apply blur
  const blurClass = isTahfizhMode && !isRevealed ? 'blur-md select-none transition-all duration-300' : 'transition-all duration-300'
  const cursorClass = isTahfizhMode && !isRevealed ? 'cursor-pointer' : ''

  return (
    <div id={`ayat-${ayat.nomorAyat}`} className={`flex flex-col p-4 border-b border-border/50 gap-4 transition-colors ${isThisAyatPlaying ? 'bg-primary/5' : ''}`}>
      <div className="flex justify-between items-center bg-accent/30 p-2 rounded-md">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
          {ayat.nomorAyat}
        </div>
        <div className="flex gap-1">
          <button onClick={handlePlay} className={`p-2 transition-colors ${isThisAyatPlaying && isPlaying ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
            {isThisAyatPlaying && isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button onClick={toggleBookmark} className={`p-2 transition-colors ${isBookmarked ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
            {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkIcon className="w-5 h-5" />}
          </button>
          <button onClick={handleOpenTafsir} className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <BookOpen className="w-5 h-5" />
          </button>
          <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className={`text-right mt-2 ${cursorClass}`} dir="rtl" onClick={handleReveal}>
        <p className={`font-arabic leading-relaxed text-foreground ${blurClass}`} style={{ fontSize: `${arabicFontSize}px`, fontFamily: arabicFontFamily, lineHeight: '2.5' }}>
          {ayat.teksArab}
        </p>
      </div>
      
      {(showTransliteration || showTranslation) && (
        <div className={`flex flex-col gap-1 mt-2 ${cursorClass}`} onClick={handleReveal}>
          {showTransliteration && <p className={`text-sm text-primary font-medium ${blurClass}`}>{ayat.teksLatin}</p>}
          {showTranslation && <p className={`text-sm text-muted-foreground ${blurClass}`}>{ayat.teksIndonesia}</p>}
        </div>
      )}
    </div>
  )
}
