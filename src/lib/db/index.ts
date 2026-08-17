import Dexie, { type EntityTable } from 'dexie';

interface Bookmark {
  id: string;            // uuid
  surahNumber: number;
  ayatNumber: number;
  createdAt: string;     // ISO date
  note?: string;
}

interface ReadingHistory {
  id: string;             // selalu 1 entry aktif, atau bisa multiple
  surahNumber: number;
  ayatNumber: number;
  updatedAt: string;
}

interface CachedSurah {
  surahNumber: number;
  data: any; // API response payload
  cachedAt: string;
}

interface SearchIndex {
  surahNumber: number;
  ayatNumber: number;
  textTranslation: string;
}

const db = new Dexie('QuranDB') as Dexie & {
  bookmarks: EntityTable<Bookmark, 'id'>;
  history: EntityTable<ReadingHistory, 'id'>;
  surahCache: EntityTable<CachedSurah, 'surahNumber'>;
  searchIndex: EntityTable<SearchIndex, 'surahNumber, ayatNumber'>; // composite primary key
};

// Schema declaration
db.version(1).stores({
  bookmarks: 'id, surahNumber, createdAt', // Indexed fields
  history: 'id, updatedAt',
  surahCache: 'surahNumber, cachedAt',
  searchIndex: '[surahNumber+ayatNumber]', // Compound index for search
});

export { db };
export type { Bookmark, ReadingHistory, CachedSurah, SearchIndex };
