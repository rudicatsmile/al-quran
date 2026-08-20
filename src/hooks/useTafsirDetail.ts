import { useQuery } from '@tanstack/react-query'
import { equranApi, type TafsirDetail } from '@/lib/api/equran'

export function useTafsirDetail(nomor: number, enabled: boolean = true) {
  return useQuery({
    queryKey: ['tafsir', 'detail', nomor],
    queryFn: async () => {
      return await equranApi.getTafsir(nomor);
    },
    enabled: enabled,
  })
}
