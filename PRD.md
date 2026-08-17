# Product Requirements Document (PRD)
## Aplikasi Web Al-Quran Mobile-First

---

## 1. Metadata Dokumen

| Field | Value |
|---|---|
| Nama Produk | Quran Web App |
| Versi Dokumen | 1.0 |
| Tanggal | 2026-08-17 |
| Tipe Aplikasi | Web App (Mobile-First, PWA) |
| Status | Draft — siap untuk implementasi |
| Target Konsumen Dokumen | AI Coding Agent / Development Team |

---

## 2. Ringkasan Produk

### 2.1 Deskripsi
Aplikasi web untuk membaca Al-Quran (surah, ayat, terjemahan, tafsir, dan audio murottal) dengan pendekatan **mobile-first**. Referensi utama: `https://quran.nu.or.id`. Aplikasi menggunakan navigasi berbasis **drawer** (side navigation) dan **bottomsheet** (aksi kontekstual, pengaturan, player).

### 2.2 Tujuan Produk
1. Menyediakan pengalaman membaca Al-Quran yang cepat, ringan, dan nyaman di perangkat mobile.
2. Mendukung mode offline (baca tanpa koneksi internet setelah data di-cache).
3. Menyediakan audio murottal dengan kontrol yang terintegrasi dengan sistem OS (lock screen/notification).
4. Memudahkan pencarian surah/ayat dan navigasi cepat antar juz/surah.

### 2.3 Target Pengguna
- Muslim yang ingin membaca/mendengarkan Al-Quran sehari-hari melalui browser mobile.
- Pengguna yang membutuhkan aplikasi ringan tanpa harus install dari App Store/Play Store (namun tetap bisa "Add to Home Screen" via PWA).

### 2.4 Non-Goals (Di Luar Cakupan v1)
- Tidak membuat native mobile app (iOS/Android) di fase ini.
- Tidak menyediakan fitur sosial (komentar, share progress ke publik).
- Tidak menyediakan fitur hafalan/quiz di v1 (dapat menjadi fase 2).

---

## 3. Tech Stack

```yaml
framework: Next.js (App Router)
data_fetching_and_cache: TanStack Query
list_virtualization: TanStack Virtual
client_state: Zustand
ui_primitives: Radix UI
bottomsheet_drawer: Vaul
styling: Tailwind CSS
animation: Framer Motion
offline_pwa: Serwist
local_db: Dexie.js (IndexedDB)
font_arabic: next/font/local (LPMQ Isep Misbah / KFGQPC Uthman Taha / Amiri Quran)
audio: HTML5 Audio API + Media Session API
search: Fuse.js (client-side fuzzy search)
theme: next-themes
monitoring: Sentry, Vercel Analytics
testing_unit: Vitest
testing_e2e: Playwright
data_source_primary: EQuran.id API (terjemahan Kemenag, tafsir, audio per surah)
data_source_alternative: Quran.com API v4 (audio per-ayat dengan timestamp)
```

---

## 4. Arsitektur Informasi & Navigasi

### 4.1 Struktur Navigasi Utama

```
[Bottom Navigation Bar] (mobile, fixed)
 ├── Beranda
 ├── Al-Quran (daftar surah)
 ├── Bookmark / Terakhir Dibaca
 ├── Pencarian
 └── Lainnya (buka Drawer)

[Drawer] (side navigation, dibuka dari ikon hamburger atau tombol "Lainnya")
 ├── Profil/Pengaturan Akun (opsional v1)
 ├── Daftar Surah (114)
 ├── Daftar Juz (30)
 ├── Bookmark
 ├── Riwayat Terakhir Dibaca
 ├── Pengaturan (tema, font, terjemahan, qari)
 └── Tentang Aplikasi

[Bottomsheet] (dipicu kontekstual)
 ├── Sheet: Pengaturan Ayat (tampilkan/sembunyikan terjemahan, tafsir, ukuran font)
 ├── Sheet: Pilih Qari (audio murottal)
 ├── Sheet: Aksi Ayat (bookmark, salin, bagikan, tafsir)
 └── Sheet: Player Audio (mini-player yang bisa di-expand)
```

### 4.2 Routing

| Route | Deskripsi | Rendering |
|---|---|---|
| `/` | Beranda: lanjutkan baca terakhir, akses cepat juz/surah | SSG/ISR |
| `/surah` | Daftar 114 surah | SSG |
| `/surah/[nomor]` | Detail surah + daftar ayat | SSG + ISR (revalidate berkala) |
| `/surah/[nomor]/[ayat]` | Deep link ke ayat tertentu (scroll otomatis) | SSG + ISR |
| `/juz/[nomor]` | Daftar ayat dalam 1 juz | SSG + ISR |
| `/tafsir/[surah]/[ayat]` | Detail tafsir ayat tertentu | SSG + ISR |
| `/cari` | Halaman pencarian surah/ayat | CSR |
| `/bookmark` | Daftar ayat yang di-bookmark (data lokal) | CSR |
| `/pengaturan` | Preferensi aplikasi | CSR |

---

## 5. Fitur & Requirement Fungsional

### 5.1 Daftar Surah (Home/List)
- **FR-1.1**: Menampilkan 114 surah dengan nama Arab, nama latin, arti, jumlah ayat, dan tempat turun (Makkiyah/Madaniyah).
- **FR-1.2**: List di-virtualisasi menggunakan TanStack Virtual untuk performa scroll.
- **FR-1.3**: Tap pada surah membuka `/surah/[nomor]`.
- **FR-1.4**: Menampilkan indikator surah yang terakhir dibaca (progress).

### 5.2 Halaman Detail Surah
- **FR-2.1**: Menampilkan teks Arab (mushaf font), transliterasi (opsional, toggle), dan terjemahan Bahasa Indonesia per ayat.
- **FR-2.2**: Ayat panjang (>100 ayat) di-virtualisasi (TanStack Virtual) agar tetap smooth di perangkat low-end.
- **FR-2.3**: Setiap ayat memiliki nomor ayat yang bisa di-tap untuk membuka bottomsheet aksi (bookmark, salin teks, buka tafsir, bagikan, putar audio dari ayat ini).
- **FR-2.4**: Auto-scroll dan highlight ayat mengikuti audio yang sedang diputar (butuh data timestamp per-ayat).
- **FR-2.5**: Navigasi antar surah (next/prev) melalui swipe atau tombol.

### 5.3 Audio Murottal
- **FR-3.1**: Streaming audio per surah dan per ayat.
- **FR-3.2**: Mini-player persisten muncul di atas bottom navigation ketika audio sedang diputar, tetap aktif walau user berpindah halaman.
- **FR-3.3**: Terintegrasi dengan Media Session API (kontrol muncul di lock screen/notification HP).
- **FR-3.4**: User dapat memilih qari melalui bottomsheet "Pilih Qari".
- **FR-3.5**: Kontrol dasar: play/pause, next/prev ayat, seek, kecepatan putar, repeat ayat/surah.

### 5.4 Pencarian
- **FR-4.1**: Pencarian nama surah (Arab/Latin/terjemahan) secara fuzzy (client-side, Fuse.js).
- **FR-4.2**: Pencarian ayat berdasarkan kata kunci dalam terjemahan.
- **FR-4.3**: Hasil pencarian menampilkan cuplikan (snippet) dengan highlight kata kunci.

### 5.5 Bookmark & Riwayat
- **FR-5.1**: User dapat bookmark ayat tertentu, disimpan di IndexedDB (Dexie.js).
- **FR-5.2**: Aplikasi otomatis menyimpan posisi ayat terakhir dibaca (last read position).
- **FR-5.3**: Halaman "Beranda" menampilkan tombol "Lanjutkan Membaca" berdasarkan riwayat terakhir.

### 5.6 Tafsir
- **FR-6.1**: Setiap ayat dapat menampilkan tafsir (Kemenag/Ibnu Katsir, tergantung sumber data) melalui bottomsheet atau halaman terpisah.

### 5.7 Pengaturan (Settings)
- **FR-7.1**: Toggle tema (terang/gelap/sistem) menggunakan `next-themes`.
- **FR-7.2**: Pengaturan ukuran font Arab (accessibility).
- **FR-7.3**: Toggle tampilkan/sembunyikan terjemahan dan transliterasi.
- **FR-7.4**: Pilihan qari default.
- **FR-7.5**: Semua preferensi disimpan lokal (persist via Zustand middleware + localStorage/IndexedDB).

### 5.8 Mode Offline (PWA)
- **FR-8.1**: Aplikasi dapat di-*install* ke home screen (manifest.json, service worker via Serwist).
- **FR-8.2**: Surah yang sudah pernah dibuka otomatis tersedia offline (cache-first strategy).
- **FR-8.3**: User dapat men-*download* surah/juz tertentu secara manual untuk dibaca offline.

---

## 6. Requirement Non-Fungsional

| Kategori | Requirement |
|---|---|
| Performa | First Contentful Paint < 1.5s pada koneksi 3G, Time to Interactive < 3s |
| Skalabilitas Rendering | List ayat/surah wajib virtualisasi (TanStack Virtual) untuk menghindari jank |
| Aksesibilitas | Kontras warna WCAG AA, dukungan ukuran font dinamis, navigasi keyboard untuk drawer/bottomsheet (Radix UI sudah accessible by default) |
| Offline Support | Aplikasi tetap fungsional (baca surah yang sudah di-cache) tanpa koneksi internet |
| Responsif | Mobile-first (breakpoint utama: 360px–428px), tetap optimal di tablet/desktop sebagai progressive enhancement |
| SEO | Halaman surah/ayat harus SSR/SSG agar dapat diindeks mesin pencari (metadata dinamis per surah) |
| Keamanan | Tidak ada data sensitif pengguna disimpan di server tanpa autentikasi (v1 tanpa akun, semua data lokal) |
| Browser Support | Chrome, Safari (iOS), Firefox, Edge — 2 versi terakhir |

---

## 7. Data Model (Client-Side / IndexedDB via Dexie.js)

```typescript
// Bookmark
interface Bookmark {
  id: string;            // uuid
  surahNumber: number;
  ayatNumber: number;
  createdAt: string;     // ISO date
  note?: string;
}

// Riwayat Terakhir Dibaca
interface ReadingHistory {
  id: string;             // selalu 1 entry aktif, atau bisa multiple untuk history
  surahNumber: number;
  ayatNumber: number;
  updatedAt: string;
}

// Pengaturan User
interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  arabicFontSize: number;      // dalam px atau rem
  showTranslation: boolean;
  showTransliteration: boolean;
  defaultQari: string;         // id qari
  playbackSpeed: number;       // 0.5 - 2.0
}

// Cache Surah (untuk offline)
interface CachedSurah {
  surahNumber: number;
  data: SurahDetail;      // hasil fetch dari API, disimpan utuh
  cachedAt: string;
}
```

### 7.1 Data Model dari API (contoh struktur, sesuaikan dengan sumber data aktual)

```typescript
interface Surah {
  number: number;
  nameArabic: string;
  nameLatin: string;
  translation: string;      // arti nama surah
  numberOfAyat: number;
  revelationPlace: 'Makkiyah' | 'Madaniyah';
  description?: string;
}

interface Ayat {
  surahNumber: number;
  ayatNumber: number;
  textArabic: string;
  textTranslation: string;
  textTransliteration?: string;
  tafsir?: string;
  audioUrl?: string;
  audioTimestamp?: { start: number; end: number }; // untuk highlight sync
}
```

---

## 8. State Management

### 8.1 TanStack Query (Server State)
- `useSurahList()` — daftar 114 surah, cache lama (jarang berubah).
- `useSurahDetail(surahNumber)` — detail surah + ayat.
- `useTafsir(surahNumber, ayatNumber)` — tafsir per ayat (lazy load saat bottomsheet dibuka).
- Query key convention: `['surah', 'list']`, `['surah', 'detail', surahNumber]`, `['tafsir', surahNumber, ayatNumber]`.
- Gunakan `staleTime` panjang (misal 24 jam) karena data Al-Quran statis.
- Persist cache dengan `@tanstack/query-sync-storage-persister` ke localStorage/IndexedDB untuk mendukung offline-first.

### 8.2 Zustand (Client State)
```typescript
interface AppStore {
  // UI State
  isDrawerOpen: boolean;
  activeBottomsheet: 'none' | 'settings' | 'qari' | 'ayatActions' | 'player';

  // Audio Player State
  currentAudio: { surahNumber: number; ayatNumber?: number } | null;
  isPlaying: boolean;
  playbackSpeed: number;

  // Reading State
  lastRead: { surahNumber: number; ayatNumber: number } | null;

  // Actions
  openDrawer: () => void;
  closeDrawer: () => void;
  openBottomsheet: (type: string) => void;
  closeBottomsheet: () => void;
  setLastRead: (surahNumber: number, ayatNumber: number) => void;
}
```

---

## 9. Struktur Folder yang Direkomendasikan

```
src/
├── app/
│   ├── (main)/
│   │   ├── page.tsx                    # Beranda
│   │   ├── surah/
│   │   │   ├── page.tsx                # Daftar surah
│   │   │   └── [nomor]/
│   │   │       ├── page.tsx            # Detail surah
│   │   │       └── [ayat]/page.tsx     # Deep link ayat
│   │   ├── juz/[nomor]/page.tsx
│   │   ├── cari/page.tsx
│   │   ├── bookmark/page.tsx
│   │   └── pengaturan/page.tsx
│   ├── layout.tsx                      # Root layout (drawer + bottom nav wrapper)
│   └── manifest.ts                     # PWA manifest
├── components/
│   ├── navigation/
│   │   ├── BottomNav.tsx
│   │   ├── Drawer.tsx
│   │   └── Bottomsheet/
│   │       ├── SettingsSheet.tsx
│   │       ├── QariSheet.tsx
│   │       ├── AyatActionsSheet.tsx
│   │       └── PlayerSheet.tsx
│   ├── surah/
│   │   ├── SurahList.tsx               # menggunakan TanStack Virtual
│   │   ├── SurahCard.tsx
│   │   ├── AyatList.tsx                # menggunakan TanStack Virtual
│   │   └── AyatCard.tsx
│   ├── audio/
│   │   ├── MiniPlayer.tsx
│   │   └── AudioProvider.tsx           # context untuk Media Session API
│   └── ui/                             # shadcn/Radix wrapped components
├── hooks/
│   ├── useSurahList.ts
│   ├── useSurahDetail.ts
│   ├── useAudioPlayer.ts
│   ├── useBookmark.ts
│   └── useReadingHistory.ts
├── lib/
│   ├── api/                            # fetcher untuk EQuran.id / Quran.com API
│   ├── db/                             # Dexie.js schema & instance
│   ├── store/                          # Zustand store
│   └── utils/
├── styles/
└── public/
    ├── fonts/                          # font Arab lokal
    └── icons/                          # PWA icons
```

---

## 10. Integrasi API (Contoh Kontrak)

### 10.1 GET Daftar Surah
```
GET https://equran.id/api/v2/surat
Response:
{
  "code": 200,
  "data": [
    {
      "nomor": 1,
      "nama": "الفاتحة",
      "namaLatin": "Al-Fatihah",
      "jumlahAyat": 7,
      "tempatTurun": "Mekah",
      "arti": "Pembukaan",
      "audioFull": { "01": "https://..." }
    }
  ]
}
```

### 10.2 GET Detail Surah
```
GET https://equran.id/api/v2/surat/{nomor}
Response:
{
  "code": 200,
  "data": {
    "nomor": 1,
    "nama": "الفاتحة",
    "ayat": [
      {
        "nomorAyat": 1,
        "teksArab": "بِسْمِ اللَّهِ...",
        "teksLatin": "Bismillahi...",
        "teksIndonesia": "Dengan nama Allah...",
        "audio": { "01": "https://..." }
      }
    ]
  }
}
```

> Catatan untuk AI Agent: sesuaikan field mapping ke `Surah`/`Ayat` interface pada bagian 7.1 saat implementasi service layer (`lib/api/`). Tambahkan transformer/adapter agar komponen tidak bergantung langsung pada struktur mentah API pihak ketiga (memudahkan penggantian sumber data di masa depan).

---

## 11. Kriteria Penerimaan (Acceptance Criteria) — Contoh Fitur Kunci

### AC untuk FR-2.2 (Virtualisasi Ayat)
- [ ] Surah dengan >200 ayat (misal Al-Baqarah) scroll tetap di atas 50fps di perangkat mid-range.
- [ ] Hanya ayat yang berada dalam viewport (+ buffer) yang di-render ke DOM.

### AC untuk FR-3.2 (Mini Player Persisten)
- [ ] Audio tetap berjalan ketika user berpindah dari `/surah/1` ke `/bookmark`.
- [ ] Mini-player tidak hilang saat navigasi antar route (persisted di root layout, bukan di dalam page).

### AC untuk FR-8.2 (Offline Cache)
- [ ] Surah yang sudah dibuka sekali dapat dibuka kembali tanpa koneksi internet.
- [ ] Indikator visual menunjukkan status "tersimpan offline" pada surah yang sudah di-cache.

---

## 12. Milestone Pengembangan (Rekomendasi)

| Fase | Cakupan |
|---|---|
| **Fase 1 — Fondasi** | Setup Next.js + TanStack Query + Zustand, layout dasar (Drawer + Bottom Nav), integrasi API daftar & detail surah |
| **Fase 2 — Reading Experience** | Virtualisasi ayat, halaman detail surah, bottomsheet aksi ayat, tafsir |
| **Fase 3 — Audio** | Audio player, Media Session API, mini-player persisten, pilih qari |
| **Fase 4 — Personalisasi** | Bookmark, riwayat baca, pengaturan (tema, font) |
| **Fase 5 — Offline & PWA** | Serwist setup, Dexie.js caching, manifest & install prompt |
| **Fase 6 — Polish** | Pencarian (Fuse.js), animasi (Framer Motion), testing (Vitest/Playwright), monitoring (Sentry) |

---

## 13. Catatan untuk AI Coding Agent

1. Prioritaskan **mobile viewport (375px)** sebagai basis desain sebelum scaling ke tablet/desktop.
2. Semua komponen navigasi (`Drawer`, `Bottomsheet`) harus dibangun di atas **Vaul** dan **Radix UI** — jangan reinvent gesture handling dari nol.
3. Gunakan **TanStack Virtual** untuk *setiap* list yang berpotensi panjang (daftar surah, daftar ayat, hasil pencarian).
4. Pisahkan logic audio player ke dalam **AudioProvider** (React Context + Zustand) agar state tidak hilang saat navigasi antar page (App Router root layout).
5. Selalu buat **adapter/transformer layer** antara API eksternal dan model data internal aplikasi (lihat bagian 10) — jangan langsung bind raw API response ke UI.
6. Implementasikan **ISR** (`revalidate`) pada halaman surah, bukan `force-dynamic`, karena data Al-Quran nyaris tidak berubah.
7. Font Arab wajib di-load via `next/font/local` dengan subsetting, karena ukuran file font mushaf umumnya besar.