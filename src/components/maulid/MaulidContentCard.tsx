"use client"

import { useUserSettingsStore } from '@/lib/store'

export interface MaulidItem {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
}

export function MaulidContentCard({ item }: { item: MaulidItem }) {
  const { showTranslation, showTransliteration, arabicFontSize, arabicFontFamily } = useUserSettingsStore()
  
  return (
    <div className="flex flex-col p-4 border-b border-border/50 gap-4 transition-colors hover:bg-accent/5">
      <div className="flex justify-between items-center bg-accent/30 p-2 rounded-md">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
          {item.id}
        </div>
        <div className="font-medium text-sm text-primary">
          {item.title}
        </div>
      </div>
      
      <div className="text-right mt-2" dir="rtl">
        <p className="font-arabic leading-relaxed text-foreground" style={{ fontSize: `${arabicFontSize}px`, fontFamily: arabicFontFamily, lineHeight: '2.5' }}>
          {item.arabic}
        </p>
      </div>
      
      {(showTransliteration || showTranslation) && (
        <div className="flex flex-col gap-1 mt-2">
          {showTransliteration && <p className="text-sm text-primary font-medium">{item.transliteration}</p>}
          {showTranslation && <p className="text-sm text-muted-foreground">{item.translation}</p>}
        </div>
      )}
    </div>
  )
}
