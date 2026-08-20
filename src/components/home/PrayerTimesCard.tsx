"use client"

import { usePrayerTimes } from '@/hooks/usePrayerTimes'
import { Clock, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

export function PrayerTimesCard() {
  const { data, isLoading, locationError } = usePrayerTimes()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="px-4 py-2">
        <div className="h-32 rounded-2xl bg-card animate-pulse border border-border/50"></div>
      </div>
    )
  }

  if (!data) return null;

  const timings = data.timings
  
  // Format current time as HH:mm
  const currentStr = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`
  
  // Calculate next prayer
  const schedule = [
    { name: 'Subuh', time: timings.Fajr },
    { name: 'Terbit', time: timings.Sunrise },
    { name: 'Dzuhur', time: timings.Dhuhr },
    { name: 'Ashar', time: timings.Asr },
    { name: 'Maghrib', time: timings.Maghrib },
    { name: 'Isya', time: timings.Isha },
  ]
  
  let nextPrayer = schedule.find(s => s.time > currentStr)
  if (!nextPrayer) {
    nextPrayer = { name: 'Subuh (Esok)', time: timings.Fajr }
  }

  const hijri = data.date.hijri

  return (
    <div className="px-4 py-2">
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border/60 p-4 shadow-sm">
        
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>{locationError ? 'Jakarta (Default)' : 'Lokasi Anda'}</span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              {hijri.day} {hijri.month.en} {hijri.year} H
            </span>
          </div>
          <div className="text-right">
            <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Waktu Berikutnya
            </div>
            <div className="text-lg font-bold text-foreground mt-1">
              {nextPrayer.name} <span className="text-muted-foreground font-normal">{nextPrayer.time}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 pt-3 border-t border-border/50">
          <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${nextPrayer.name === 'Subuh' || nextPrayer.name === 'Subuh (Esok)' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
            <span className="text-[10px] font-semibold uppercase tracking-wider mb-1">Subuh</span>
            <span className="text-sm font-bold">{timings.Fajr}</span>
          </div>
          <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${nextPrayer.name === 'Dzuhur' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
            <span className="text-[10px] font-semibold uppercase tracking-wider mb-1">Dzuhur</span>
            <span className="text-sm font-bold">{timings.Dhuhr}</span>
          </div>
          <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${nextPrayer.name === 'Ashar' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
            <span className="text-[10px] font-semibold uppercase tracking-wider mb-1">Ashar</span>
            <span className="text-sm font-bold">{timings.Asr}</span>
          </div>
          <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${nextPrayer.name === 'Maghrib' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
            <span className="text-[10px] font-semibold uppercase tracking-wider mb-1">Maghrib</span>
            <span className="text-sm font-bold">{timings.Maghrib}</span>
          </div>
          <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${nextPrayer.name === 'Isya' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
            <span className="text-[10px] font-semibold uppercase tracking-wider mb-1">Isya</span>
            <span className="text-sm font-bold">{timings.Isha}</span>
          </div>
        </div>

      </div>
    </div>
  )
}
