# Arsitektur

## Stack

| Layer | Teknologi |
|-------|-----------|
| 3D Engine | A-Frame (via 8th Wall) |
| Build Tool | Webpack 5 |
| Bahasa | JavaScript + TypeScript |
| Styling | CSS + SCSS |
| Deployment | Vercel (static) |

## Alur Data

```
[Main Menu] → Play → Game Start
  ├── city-sim.startGame() mulai tick loop 1s
  ├── initUI() render HUD, kategori, building cards
  └── building-placer aktif: ground click, ghost preview

User tap ground (placement mode)
  → building-placer (A-Frame component)
    → cek affordability via city-sim.getState()
    → kurangi cost
    → spawn entity dengan GLB model di grid position
    → daftarkan entity ke city-sim registry (dengan rotation: 0)
    → ui.js re-render HUD

User tap building (existing)
  → building-placer tangkap event click via class="building"
  → showBuildingModal() tampilkan modal dengan:
    UPGRADE | ROTATE 90° | MOVE | REMOVE

[Rotate 90°]
  → city-sim.rotateBuilding(id, 90)
  → update building.rotation
  → animasi entity rotation (easeOutElastic, 400ms)

[Move]
  → building-placer masuk move mode
  → ghost biru mengikuti cursor di grid
  → tap ground valid → city-sim.moveBuilding(id, pos)
  → animasi entity position (easeOutCubic, 300ms)

Simulation tick (1s)
  → city-sim iterasi building registry
  → hitung income, expenses, happiness, population
  → update state
  → ui.js baca state → update DOM
```

## A-Frame Components

### `city-sim` (di `<a-scene>`)
- Global game state
- Tick loop 1 detik (dimulai via `startGame()`)
- Ekonomi: income, expense, population, happiness
- Method: `placeBuilding`, `upgradeBuilding`, `rotateBuilding`, `moveBuilding`, `removeBuilding`

### `building-placer` (di `<a-scene>`)
- Grid snapping (1m x 1m)
- Place / rotate / move / upgrade / remove building
- Ghost preview (hijau = valid place, merah = invalid, biru = move mode)
- Move mode dengan tracking posisi cursor

## File Map

| File | Tanggung Jawab |
|------|----------------|
| `src/index.html` | Scene markup + asset preloading + UI shell |
| `src/index.css` | Semua styling (HUD, toolbar, modal, main menu, settings) |
| `src/app.js` | Register komponen A-Frame, init main menu, deferred game start |
| `src/building-types.js` | Data building (model, cost, stats, tier) |
| `src/city-sim.js` | State global + simulation tick + rotate/move logic |
| `src/building-placer.js` | Input handling + spawning entities + move mode |
| `src/ui.js` | Render DOM: main menu, settings, toolbar, HUD, overlay, mute button |

## Alur Startup

```
Page Load
  → A-Frame scene init (city-sim, building-placer terdaftar)
  → city-bootstrap.init():
    1. showMuteButton() — top-left mute toggle
    2. showMainMenu(onPlay) — overlay menu
    3. User klik PLAY:
       - hideMainMenu()
       - initUI(citySim) — render HUD, kategori, cards
       - citySim.startGame() — mulai tick loop
       - Register game event listeners
```

## Ekonomi

Setiap tick (1s):

```
incomeRate  = sum(commercial.revenue) + (population * 0.05)
expenseRate = sum(industrial.pollution_effect) + (totalBuildings * 0.5)
money      += max(0, incomeRate - abs(expenseRate))

happiness   = clamp(50 + parkHappiness + industrialPollution, 0, 100)

growthRate  = 0.02 + (happiness / 100) * 0.08
population  = min(maxPopulation, population + ceil(maxPopulation * growthRate))
```

## Building Data Structure

```js
{
  id: number,
  typeId: string,
  category: string,
  position: { x, y, z },
  rotation: number,    // degrees (y-axis)
  level: number,       // 1-3
  entity: Element|null // A-Frame entity reference
}
```

## Events

| Event | Trigger | Diterima Oleh |
|-------|---------|---------------|
| `building-selected` | User pilih building type | building-placer (update ghost) |
| `building-placed` | Building berhasil ditempatkan | city-bootstrap (refresh HUD) |
| `building-upgraded` | Building di-upgrade | city-bootstrap (refresh HUD) |
| `building-rotated` | Building di-rotate 90° | city-bootstrap (refresh HUD) |
| `building-move-start` | User klik "Move" di modal | building-placer (aktifkan move mode) |
| `building-moved` | Building selesai dipindah | city-bootstrap (refresh HUD) |
| `building-removed` | Building dihapus | city-bootstrap (refresh HUD) |
| `game-won` | Populasi ≥ 2000 & uang ≥ $10.000 | city-bootstrap (show win overlay) |
| `game-lost` | Uang ≤ 0 & tidak ada building | city-bootstrap (show lose overlay) |

## Webpack Config

- **Entry**: `src/app.js`
- **Output**: `dist/` (bundle.js + index.html + copied assets)
- **Loaders**:
  - `babel-loader` — JS transpile
  - `ts-loader` — TypeScript
  - `style-loader` + `css-loader` — CSS
  - `sass-loader` — SCSS
  - `asset-loader` — Ekspor path relatif untuk file di `src/assets/`
  - `html-loader` — Ekstrak source dari HTML (img src, a-asset-item src, dll)
- **Plugins**:
  - `HtmlWebpackPlugin` — Generate index.html
  - `CopyWebpackPlugin` — Copy `external/`, `src/assets/`, dan `image-targets/` ke dist
