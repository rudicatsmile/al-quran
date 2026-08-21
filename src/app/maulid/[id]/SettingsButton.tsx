"use client"

import { Settings2 } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export function SettingsButton() {
  const openBottomsheet = useAppStore(state => state.openBottomsheet)
  
  return (
    <button onClick={() => openBottomsheet('settings')} className="p-2 text-muted-foreground hover:text-primary transition-colors">
      <Settings2 className="w-5 h-5" />
    </button>
  )
}
