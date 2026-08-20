<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Aturan Sinkronisasi Web & Mobile (Capacitor)

Proyek ini adalah aplikasi *hybrid* yang berjalan di Web (Next.js) dan Mobile (Capacitor Android). Anda **WAJIB** mengikuti dua aturan berikut dalam setiap percakapan:

1. **Otomatisasi Build & Sync Mobile**
   Setiap kali Anda selesai memodifikasi kode antarmuka, fitur, atau logika pada aplikasi Web, Anda harus selalu menjalankan perintah terminal berikut secara otomatis tanpa perlu diminta pengguna:
   ```bash
   npm run build:mobile && npx cap sync android
   ```
   Tujuannya agar folder `android/` selalu selaras dengan kode terbaru dari Web.

2. **Keamanan Lintas Platform (Cross-Platform Safety)**
   Mengingat kode Web dan Mobile adalah satu sumber yang sama, setiap kali Anda menambahkan atau memodifikasi fitur yang berinteraksi dengan API Native/Perangkat Keras (seperti kamera, getaran, penyimpanan native), Anda wajib menggunakan metode dari Capacitor dan menambahkan pengecekan *platform*:
   - Gunakan `Capacitor.isNativePlatform()` atau pengecekan serupa sebelum memanggil API Native.
   - Sediakan mekanisme alternatif (fallback) untuk pengguna Web agar aplikasi tidak *crash* jika fitur tersebut tidak tersedia di *browser*.
