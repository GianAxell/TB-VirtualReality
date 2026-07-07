# Deployment — Vercel

## Prasyarat

- Repo GitHub terhubung dengan Vercel
- Git LFS diaktifkan (lihat `.gitattributes`)

## Konfigurasi

Proyek sudah memiliki `vercel.json` di root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": null,
  "git": {
    "lfs": true
  }
}
```

| Field | Nilai | Keterangan |
|-------|-------|------------|
| `buildCommand` | `npm run build` | Webpack build via script npm |
| `outputDirectory` | `dist` | Output webpack |
| `framework` | `null` | Proyek static/webpack, bukan framework SPA |
| `git.lfs` | `true` | Wajib untuk file GLB, JPG, PNG via Git LFS |

## Langkah Deploy

### Via Vercel Dashboard

1. Buka [vercel.com](https://vercel.com) → **Add New Project**
2. Import repo GitHub (`M0zziee/TB-VirtualReality`)
3. Settings akan otomatis terbaca dari `vercel.json`
4. Klik **Deploy**

### Via Vercel CLI

```bash
npx vercel --prod
```

## Catatan

- **Node.js version**: >= 18 (diatur di `package.json` → `engines`)
- **Asset besar**: File GLB (>2MB) memicu warning asset size limit — aman diabaikan untuk project 3D
- **8th Wall / XR**: Script `8frame-1.5.0.min.js` di-copy dari `external/` ke `dist/external/` via `CopyWebpackPlugin`. CDN scripts (`xrextras`, `landing-page`, `engine-binary`) tetap dari jsdelivr

## Troubleshooting

| Error | Penyebab | Solusi |
|-------|----------|--------|
| `ERROR in external/scripts/8frame-1.5.0.min.js` | html-loader memproses `<script src>` sebagai dependency webpack | Pastikan `'src'` tidak ada di `ATTRIBUTES_TO_EXPAND` di `webpack.config.js` |
| Build gagal, file GLB tidak ditemukan | Git LFS tidak aktif di Vercel | Verifikasi `"git": {"lfs": true}` ada di `vercel.json` |
| Build timeout | Asset terlalu besar diproses webpack | Normal untuk ~23MB GLB — build lokal ~10 detik, Vercel mungkin lebih lambat |
