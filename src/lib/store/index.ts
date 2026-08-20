import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type BottomsheetType = 'none' | 'settings' | 'qari' | 'ayatActions' | 'player' | 'tafsir'

interface AppState {
  // UI State
  isDrawerOpen: boolean
  activeBottomsheet: BottomsheetType

  // Audio Player State
  currentAudio: { surahNumber: number; ayatNumber?: number } | null
  isPlaying: boolean
  playbackSpeed: number
  
  // Tafsir State
  currentTafsir: { surahNumber: number; ayatNumber: number } | null

  // Actions
  openDrawer: () => void
  closeDrawer: () => void
  openBottomsheet: (type: BottomsheetType) => void
  closeBottomsheet: () => void
  setCurrentAudio: (audio: { surahNumber: number; ayatNumber?: number } | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  setPlaybackSpeed: (speed: number) => void
  setCurrentTafsir: (tafsir: { surahNumber: number; ayatNumber: number } | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  isDrawerOpen: false,
  activeBottomsheet: 'none',

  currentAudio: null,
  isPlaying: false,
  playbackSpeed: 1.0,
  
  currentTafsir: null,

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  openBottomsheet: (type) => set({ activeBottomsheet: type }),
  closeBottomsheet: () => set({ activeBottomsheet: 'none' }),
  setCurrentAudio: (audio) => set({ currentAudio: audio }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
  setCurrentTafsir: (tafsir) => set({ currentTafsir: tafsir }),
}))

interface UserSettingsState {
  arabicFontSize: number
  arabicFontFamily: string
  showTranslation: boolean
  showTransliteration: boolean
  isTahfizhMode: boolean
  defaultQari: string

  setArabicFontSize: (size: number) => void
  setArabicFontFamily: (font: string) => void
  setShowTranslation: (show: boolean) => void
  setShowTransliteration: (show: boolean) => void
  setIsTahfizhMode: (show: boolean) => void
  setDefaultQari: (qari: string) => void
}

export const useUserSettingsStore = create<UserSettingsState>()(
  persist(
    (set) => ({
      arabicFontSize: 24,
      arabicFontFamily: 'LPMQ Isep Misbah',
      showTranslation: true,
      showTransliteration: false,
      isTahfizhMode: false,
      defaultQari: '01', // Default qari id for EQuran

      setArabicFontSize: (size) => set({ arabicFontSize: size }),
      setArabicFontFamily: (font) => set({ arabicFontFamily: font }),
      setShowTranslation: (show) => set({ showTranslation: show }),
      setShowTransliteration: (show) => set({ showTransliteration: show }),
      setIsTahfizhMode: (show) => set({ isTahfizhMode: show }),
      setDefaultQari: (qari) => set({ defaultQari: qari }),
    }),
    {
      name: 'quran-user-settings', // name of the item in the storage (must be unique)
    }
  )
)
