import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type BottomsheetType = 'none' | 'settings' | 'qari' | 'ayatActions' | 'player'

interface AppState {
  // UI State
  isDrawerOpen: boolean
  activeBottomsheet: BottomsheetType

  // Audio Player State
  currentAudio: { surahNumber: number; ayatNumber?: number } | null
  isPlaying: boolean
  playbackSpeed: number

  // Actions
  openDrawer: () => void
  closeDrawer: () => void
  openBottomsheet: (type: BottomsheetType) => void
  closeBottomsheet: () => void
  setCurrentAudio: (audio: { surahNumber: number; ayatNumber?: number } | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  setPlaybackSpeed: (speed: number) => void
}

export const useAppStore = create<AppState>((set) => ({
  isDrawerOpen: false,
  activeBottomsheet: 'none',

  currentAudio: null,
  isPlaying: false,
  playbackSpeed: 1.0,

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  openBottomsheet: (type) => set({ activeBottomsheet: type }),
  closeBottomsheet: () => set({ activeBottomsheet: 'none' }),
  setCurrentAudio: (audio) => set({ currentAudio: audio }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
}))

interface UserSettingsState {
  arabicFontSize: number
  showTranslation: boolean
  showTransliteration: boolean
  defaultQari: string

  setArabicFontSize: (size: number) => void
  setShowTranslation: (show: boolean) => void
  setShowTransliteration: (show: boolean) => void
  setDefaultQari: (qari: string) => void
}

export const useUserSettingsStore = create<UserSettingsState>()(
  persist(
    (set) => ({
      arabicFontSize: 24,
      showTranslation: true,
      showTransliteration: false,
      defaultQari: '01', // Default qari id for EQuran

      setArabicFontSize: (size) => set({ arabicFontSize: size }),
      setShowTranslation: (show) => set({ showTranslation: show }),
      setShowTransliteration: (show) => set({ showTransliteration: show }),
      setDefaultQari: (qari) => set({ defaultQari: qari }),
    }),
    {
      name: 'quran-user-settings', // name of the item in the storage (must be unique)
    }
  )
)
