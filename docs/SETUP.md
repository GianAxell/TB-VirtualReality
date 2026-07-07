# Setup Lokal

## Prasyarat

- Node.js >= 18
- Git LFS (`git lfs install`)
- npm

## Instalasi

```bash
# Clone repo
git clone <repo-url>
cd aframe-world-effects-example

# Pull asset files via Git LFS
git lfs pull

# Install dependencies
npm install
```

## Development

```bash
npm run serve
```

Server dev akan berjalan di `http://localhost:8080` dengan hot-reload.

## Build

```bash
npm run build
```

Output: folder `dist/`.

## Struktur Direktori

```
.
├── config/
│   ├── webpack.config.js    Konfigurasi webpack
│   └── asset-loader.js      Loader untuk asset path
├── docs/                    Dokumentasi
├── external/
│   └── scripts/
│       └── 8frame-1.5.0.min.js   8th Wall A-Frame runtime
├── src/
│   ├── app.js               Entry point
│   ├── index.html           Scene + UI markup
│   ├── index.css            Global styles
│   ├── building-types.js    Definisi building
│   ├── building-placer.js   A-Frame component: placement
│   ├── city-sim.js          A-Frame component: simulation
│   ├── ui.js                DOM rendering
│   └── assets/              GLB models, textures, icons (via Git LFS)
├── vercel.json              Konfigurasi Vercel
├── package.json
└── tsconfig.json
```

## Catatan

- File asset (`.glb`, `.jpg`, `.png`) disimpan via **Git LFS**. Wajib `git lfs pull` setelah clone.
- Build menggunakan **Webpack 5** dengan `babel-loader` untuk JS, `ts-loader` untuk TypeScript, `sass-loader` untuk SCSS, dan custom `asset-loader` untuk file di `src/assets/`.
