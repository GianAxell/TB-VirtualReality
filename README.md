# 🏙️ City Builder — A-Frame

**City Builder** adalah game simulasi kota berbasis WebAR/3D yang berjalan di browser — desktop, mobile AR, dan VR. Bangun metropolis impianmu di atas ground plane 3D, kelola ekonomi real-time, dan jadikan kotamu yang terbaik!

Dibangun di atas **8th Wall** + **A-Frame** dengan aset low-poly dari **Quaternius**.

---

## 🎬 Trailer Cepat

```
 MAIN MENU           GAMEPLAY              BUILDING MODAL
┌──────────────┐   ┌──────────────────┐   ┌──────────────┐
│              │   │ 🔊 $1,250 ♥78%   │   │   HOUSE      │
│ CITY BUILDER │   │                  │   │   ★★☆        │
│              │   │    🏠  🏪  🏭    │   │ Cost   $100  │
│ [ PLAY ]     │   │                  │   │ Pop    +8    │
│ [ SETTINGS ] │   │    [🏠][🏪][🏭]  │   │ Income +2/s  │
│ [ EXIT ]     │   │                  │   │ Refund  $90  │
│              │   │                  │   ├──────────────┤
│  🔊          │   │  ⚙ ✕            │   │⬆️ UPGRADE $60 │
└──────────────┘   └──────────────────┘   │↻ ROTATE 90°  │
                                          │↕ MOVE        │
                                          │🗑️ REMOVE     │
                                          └──────────────┘
```

---

## ✨ Fitur Lengkap

### 🎮 Gameplay
| Fitur | Detail |
|-------|--------|
| **🏠 4 Kategori** | Residential 👨‍👩‍👧‍👦, Commercial 🏪, Industrial 🏭, Parks 🌳 |
| **🏗️ 14 Tipe Bangunan** | Dari rumah mungil ($100) sampai power plant ($3,000) |
| **⬆️ Upgrade 3 Level** | Scale +15% per level, stats × level |
| **↻ Rotate 90°** | Putar bangunan searah jarum jam dengan animasi elastic |
| **↕ Move** | Pindahkan bangunan — ghost preview biru, gratis! |
| **🗑️ Remove** | Hapus dengan refund 50% dari total investasi |
| **💻 Multi-platform** | Desktop (mouse) · Mobile AR (touch) · VR (gaze) |

### 📊 Simulasi Ekonomi
| Mekanik | Detail |
|---------|--------|
| **⏱️ Tick** | Real-time setiap 1 detik |
| **💰 Income** | Dari komersial + populasi × 0.05 |
| **📉 Expense** | Dari polusi industri + jumlah bangunan × 0.5 |
| **📈 Growth** | 2%–10% populasi per tick tergantung happiness |
| **😊 Happiness** | 0–100%, dipengaruhi taman & polusi |

### 🎨 UI & Audio
| Fitur | Detail |
|-------|--------|
| **🎵 BGM** | Background music — mute/unmute toggle (♪) di top-left |
| **⚙️ Settings** | Volume slider untuk BGM, bisa diakses dari menu & gameplay |
| **📊 HUD** | Money, Population, Happiness, Income — update real-time |
| **🎯 Modal** | Info lengkap setiap bangunan + action buttons |
| **🎨 Dark Theme** | Monospace font, border solid, SimCity 2000 vibe |
| **📱 Responsive** | Optimal di desktop & mobile |

### 🏆 Kondisi Game
| Kondisi | Syarat |
|---------|--------|
| **🏆 Menang** | Populasi ≥ 2.000 **dan** uang ≥ $10.000 |
| **💀 Kalah** | Uang ≤ 0 **dan** tidak ada satupun bangunan |

---

## 📖 Panduan Bermain (Step-by-Step)

### 🚀 Mulai Game
```
1. Buka game di browser
2. Klik PLAY di Main Menu
3. BGM mulai diputar otomatis 🎵
4. Siap membangun kota! 🏗️
```

### 🏗️ Membangun
```
1. Pilih kategori dari bottom bar:
   ┌──────────┬──────────┬──────────┬──────────┐
   │  🏠 Homes │  🏪 Shops │  🏭 Indus │  🌳 Parks │
   └──────────┴──────────┴──────────┴──────────┘

2. Pilih tipe bangunan dari card row di atasnya
   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
   │House │ │S.Apt │ │Block │ │Mans. │  → scroll
   │$100  │ │$300  │ │$1000 │ │$3000 │
   │★     │ │★     │ │★★    │ │★★★   │
   └──────┘ └──────┘ └──────┘ └──────┘

   ★ = tier (semakin banyak ★, semakin bagus)

3. Gerakkan cursor di atas ground — ghost preview muncul:
   🟢 Hijau = valid (bisa ditempatkan)
   🔴 Merah = tidak valid (terhalang / tidak cukup uang)

4. Klik/tap ground untuk membangun!
   🎉 Animasi pop-in elastic (0 → 1 scale)
```

### ⬆️ Mengelola Bangunan
```
Klik/tap bangunan yang sudah ada → muncul modal:

┌──────────────────┐
│      HOUSE      │  ← Nama bangunan
│      ★★☆        │  ← Level (3 = max)
│                  │
│ Cost      $100   │
│ Pop      +8      │  ← Hanya untuk residential
│ Income  +2/s     │
│ Refund   $90     │
│                  │
│ ⬆️ UPGRADE $60  │  ← Naikkan level (scale + animasi)
│ ↻ ROTATE 90°   │  ← Putar bangunan
│ ↕ MOVE          │  ← Pindahkan (ghost biru)
│ 🗑️ REMOVE       │  ← Hapus (refund 50%)
└──────────────────┘
```

### 💡 Tips & Strategi

| 🆕 Pemula | 🏆 Mahir |
|-----------|----------|
| Mulai dengan **House** ($100) | Kombinasikan **residential** + **commercial** |
| Jangan lupa **Parks** untuk happiness | Industrial dekat residential? Siap-siap happiness turun! |
| **Upgrade** lebih murah daripada bangun baru | 1 building upgraded = 3x lipat stats |
| Pantau **HUD** di atas | Target: 2000 populasi + $10.000 |
| Prioritaskan **income** dulu | Expand perlahan, jangan boros |

### 🏆 Menang / 💀 Kalah
```
🏆 MENANG — "City Thriving!"
   🎉 Populasi 2.000+ & uang $10.000+
   → Klik "Play Again" untuk main lagi

💀 KALAH — "City Abandoned!"
   😵 Bangkrut tanpa bangunan tersisa
   → Klik "Play Again" untuk coba lagi
```

### 🎛️ Kontrol & Tombol
```
┌──────────────────────────────────────────────────┐
│ 🔊                          HUD            ⚙ ✕  │
│  Mute button              Game controls          │
│  (top-left)               (top-right)            │
│    ♪ = BGM ON             ⚙ = Settings           │
│    ✕ = BGM OFF            ✕ = Exit (Goodbye)     │
├──────────────────────────────────────────────────┤
│                                                  │
│               🎮 3D SCENE 🎮                     │
│                                                  │
├──────────────────────────────────────────────────┤
│          [Building Cards - scrollable]           │
├──────────────────────────────────────────────────┤
│   [Homes]    [Shops]    [Indus]    [Parks]       │
└──────────────────────────────────────────────────┘
```

---

## 🛠️ Instalasi & Penggunaan

```bash
# Clone repo
git clone <repo-url>
cd aframe-world-effects-example

# Install dependencies
npm install

# Development server (hot reload)
npm run serve

# Production build
npm run build
```

Hasil build ada di folder `dist/` — bisa di-deploy ke hosting static manapun.

---

## 📁 Struktur Proyek

```
src/
├── app.js                  Entry point — register A-Frame components, init flow
├── index.html              Scene 3D (A-Frame) — asset GLB, lighting, camera
├── index.css               Semua styling — CSS variables, dark theme
├── audio.js                BGM system — play, pause, volume control
├── city-sim.js             Simulation engine — game tick, economy, state
├── building-placer.js      Placement system — grid snap, ghost preview, move mode
├── building-types.js       Building data — 14 types, cost, stats, models
├── ui-helpers.js           UI utilities — createOverlay, format, stars
├── ui.js                   UI — main menu, HUD, toolbar, modal, mute button
└── assets/
    ├── audio/              BGM music files (*.mp3)
    ├── Skybox/             GLB skybox model
    ├── Terrain/            Ground textures (grass, sand, road)
    ├── Icons/              SVG icons (white stroke-based)
    └── *.glb               Low-poly 3D building models
```

---

## ⚙️ Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| [**8th Wall**](https://8thwall.com) | WebAR engine — SLAM tracking, multi-platform |
| [**A-Frame**](https://aframe.io) | WebVR framework — scene, entities, components |
| [**Webpack 5**](https://webpack.js.org) | Build tool — bundling, asset loader, dev server |
| [**GLB Models**](https://quaternius.com) | Low-poly 3D assets by Quaternius |

---

## 🚀 Deployment

Repo sudah termasuk **GitHub Actions** workflow untuk auto-deploy ke **GitHub Pages** (push ke `main`).

Alternatif manual:
```bash
npm run build
# Upload folder dist/ ke Vercel, Netlify, Firebase, dll.
```

---

## 🙏 Kredit

- **[8th Wall](https://8thwall.com)** — WebAR platform
- **[A-Frame](https://aframe.io)** — Web framework for 3D/AR/VR
- **[Quaternius](https://quaternius.com)** — Low-poly 3D models (Creative Commons)
- **[FontAwesome](https://fontawesome.com)** — SVG icon inspirations

---

<p align="center">
  <b>City Builder</b> — Bangun, Kelola, Menangkan! 🏙️
</p>

update
