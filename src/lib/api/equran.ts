export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: Record<string, string>;
}

export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: Record<string, string>;
}

export interface SurahDetail extends Surah {
  ayat: Ayat[];
}

export interface Tafsir {
  ayat: number;
  teks: string;
}

export interface TafsirDetail extends Surah {
  tafsir: Tafsir[];
}

export const equranApi = {
  getSurahList: async (): Promise<Surah[]> => {
    const res = await fetch('https://equran.id/api/v2/surat');
    const json = await res.json();
    if (json.code !== 200) throw new Error(json.message);
    return json.data;
  },
  
  getSurahDetail: async (nomor: number): Promise<SurahDetail> => {
    const res = await fetch(`https://equran.id/api/v2/surat/${nomor}`);
    const json = await res.json();
    if (json.code !== 200) throw new Error(json.message);
    return json.data;
  },
  
  getTafsir: async (nomor: number): Promise<TafsirDetail> => {
    const res = await fetch(`https://equran.id/api/v2/tafsir/${nomor}`);
    const json = await res.json();
    if (json.code !== 200) throw new Error(json.message);
    return json.data;
  }
}
