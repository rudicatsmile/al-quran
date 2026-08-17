import { useQuery } from '@tanstack/react-query'
import { equranApi, type SurahDetail } from '@/lib/api/equran'
import { db } from '@/lib/db'

export function useSurahDetail(nomor: number) {
  return useQuery({
    queryKey: ['surah', 'detail', nomor],
    queryFn: async () => {
      try {
        const data = await equranApi.getSurahDetail(nomor);
        // Save to indexedDB for offline cache
        await db.surahCache.put({
          surahNumber: nomor,
          data: data,
          cachedAt: new Date().toISOString()
        });
        return data;
      } catch (error) {
        // If fetch fails (offline), try to read from cache
        const cached = await db.surahCache.get(nomor);
        if (cached) {
          return cached.data as SurahDetail;
        }
        throw error; // If no cache, throw
      }
    },
  })
}
