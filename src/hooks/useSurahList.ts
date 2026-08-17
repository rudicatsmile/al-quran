import { useQuery } from '@tanstack/react-query'
import { equranApi } from '@/lib/api/equran'

export function useSurahList() {
  return useQuery({
    queryKey: ['surah', 'list'],
    queryFn: equranApi.getSurahList,
  })
}
