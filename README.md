# A-Frame City Builder

**City Builder** adalah game simulasi kota berbasis WebAR/3D yang berjalan di browser — desktop, mobile AR, dan VR. Game ini dibangun di atas platform **8th Wall** dan framework **A-Frame**.

Player membangun kota dengan menempatkan bangunan 3D low-poly di atas ground plane, mengelola ekonomi (income/expense), populasi, dan kebahagiaan warga secara real-time.

---

## Fitur

- **4 Kategori Bangunan:** Residential, Commercial, Industrial, Parks — masing-masing dengan efek berbeda
- **14 Tipe Bangunan:** Dari rumah sederhana hingga power plant, masing-masing dengan 3 level upgrade
- **Simulasi Ekonomi:** Tick tiap 1 detik — hitung income, expense, populasi growth, happiness
- **Upgrade:** Setiap bangunan bisa di-upgrade (max 3 level) dengan animasi scale
- **Rotate:** Putar bangunan 90° per klik dengan animasi elastic
- **Move:** Pindahkan bangunan ke posisi grid lain dengan ghost preview biru (gratis)
- **Remove:** Hapus bangunan dengan refund 50%
- **Main Menu:** Layar utama dengan Play, Settings (placeholder), dan Exit (Goodbye overlay)
- **Mute Button:** Tombol toggle mute (♪ / ✕) di pojok kiri atas (placeholder BGM)
- **Win/Lose Condition:** Menang jika populasi ≥ 2000 & uang ≥ $10.000; kalah jika bangkrut tanpa bangunan
- **UI Classic Game:** Tampilan dark solid dengan border, Courier New, warna bold — SimCity 2000 vibe
- **Multi-platform:** Desktop (mouse), Mobile AR (touch), VR (gaze/controller)

---

## Cara Bermain

1. **Main Menu:** Klik **PLAY** untuk memulai game
2. Pilih kategori bangunan dari **bottom bar** (Homes, Shops, Indus, Parks)
3. Pilih tipe bangunan dari **scrollable card row**
4. Klik/tap **ground plane** untuk menempatkan bangunan (ada ghost preview hijau/merah)
5. Klik/tap **bangunan yang sudah ada** untuk membuka modal:
   - **UPGRADE** — naikkan level (max 3), scale +15% per level
   - **ROTATE 90°** — putar bangunan 90° searah jarum jam
   - **MOVE** — pindahkan bangunan ke posisi lain (ghost biru)
   - **REMOVE** — hapus bangunan, refund 50%
6. Pantau **HUD** di atas untuk uang, populasi, happiness, dan income rate
7. Capai **populasi 2000 + uang $10.000** untuk menang!

---

## Instalasi & Penggunaan

```bash
# Install dependencies
npm install

# Development server
npm run serve

# Production build
npm run build
```

Hasil build production ada di folder `dist/`.

---

## Struktur Proyek

```
src/
├── app.js                  Entry point — register A-Frame components, init main menu
├── index.html              Scene 3D (A-Frame) dengan asset GLB & lighting
├── index.css               Semua styling — UI classic game dark theme
├── city-sim.js             Engine simulasi — game tick, ekonomi, state, rotate/move
├── building-placer.js      Penempatan bangunan — grid snap, ghost preview, move mode
├── building-types.js       Data bangunan — nama, model, cost, stats
├── ui.js                   UI rendering — main menu, HUD, toolbar, modal, mute button
└── assets/
    ├── Skybox/             GLB skybox model
    ├── Terrain/            Ground textures
    ├── icons/              SVG icons (white, stroke-based)
    └── *.glb               Low-poly building models
```

---

## Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| **8th Wall** | WebAR engine — SLAM tracking, multi-platform |
| **A-Frame** | WebVR framework — scene, entities, components |
| **Webpack** | Build tool — bundling, asset loader |
| **GLB Models** | Low-poly 3D assets (Quaternius) |

---

## Deployment

Repo ini sudah termasuk GitHub Actions workflow untuk deploy ke **GitHub Pages** (push ke `main`). Alternatif: build dengan `npm run build`, lalu upload folder `dist/` ke static hosting manapun.

---

## Kredit

- **8th Wall** — WebAR platform ([8thwall.com](https://8thwall.com))
- **A-Frame** — Web framework for 3D/AR/VR ([aframe.io](https://aframe.io))
- **Quaternius** — Low-poly 3D models ([quaternius.com](https://quaternius.com))
# TB-VirtualReality
