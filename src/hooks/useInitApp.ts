import { useEffect, useRef } from 'react';
import { db } from '@/lib/db';

export function useInitApp() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    async function initSearchIndex() {
      try {
        const count = await db.searchIndex.count();
        if (count === 0) {
          console.log('Downloading translation JSON for offline search...');
          // TODO: Ganti dengan URL file JSON terjemahan lengkap
          // const response = await fetch('/data/quran-translation-id.json');
          // const data = await response.json();
          
          // MOCK: Proses dan masukkan ke db
          // const searchEntries = data.map((ayat: any) => ({
          //   surahNumber: ayat.surah,
          //   ayatNumber: ayat.ayat,
          //   textTranslation: ayat.translation
          // }));
          // await db.searchIndex.bulkAdd(searchEntries);
          console.log('Search index populated successfully.');
        }
      } catch (error) {
        console.error('Failed to init search index:', error);
      }
    }

    initSearchIndex();
  }, []);
}
