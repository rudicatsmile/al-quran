import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

interface AladhanResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimes;
    date: {
      readable: string;
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string; ar: string };
        month: { number: number; en: string; ar: string };
        year: string;
        designation: { abbreviated: string; expanded: string };
      }
    }
  }
}

// Default to Jakarta
const DEFAULT_LAT = -6.200000;
const DEFAULT_LNG = 106.816666;

export function usePrayerTimes() {
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.warn("Geolocation error, falling back to Jakarta", error)
          setLocationError("Akses lokasi ditolak. Menggunakan lokasi default (Jakarta).")
          setCoords({ lat: DEFAULT_LAT, lng: DEFAULT_LNG })
        },
        { timeout: 10000 }
      )
    } else {
      setCoords({ lat: DEFAULT_LAT, lng: DEFAULT_LNG })
    }
  }, [])

  const query = useQuery({
    queryKey: ['prayerTimes', coords?.lat, coords?.lng],
    queryFn: async () => {
      if (!coords) throw new Error("Coords not ready")
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      
      // method 11 is Majelis Ulama Indonesia
      const res = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${coords.lat}&longitude=${coords.lng}&method=11`);
      const json: AladhanResponse = await res.json();
      
      if (json.code !== 200) throw new Error(json.status);
      return json.data;
    },
    enabled: !!coords,
    staleTime: 1000 * 60 * 60, // 1 hour cache
  })

  return {
    ...query,
    locationError,
  }
}
