import { CATEGORIES, BUILDING_TYPES, getBuildingType } from "./building-types";
import { createOverlay, removeOverlay, fmt, levelStars } from "./ui-helpers";

/* ── State ── */

const _ = {
  selectedCategory: "residential",
  selectedType: null,
  citySimRef: null,
  sceneEl: null,
  isMuted: false,
};

/* ── Public API ── */

export function initUI(citySim) {
  _.citySimRef = citySim;
  _.sceneEl = citySim.el.sceneEl;
  renderHUD();
  renderCategories();
  renderBuildings();
  selectCategory("residential");
}

export function selectCategory(categoryId) {
  _.selectedCategory = categoryId;
  _.selectedType = BUILDING_TYPES[categoryId]?.[0]?.id || null;
  renderCategories();
  renderBuildings();
  emitSelection();
}

export function selectType(typeId) {
  _.selectedType = typeId;
  renderBuildings();
  emitSelection();
}

export function getSelectedBuilding() {
  if (!_.selectedCategory || !_.selectedType) return null;
  return BUILDING_TYPES[_.selectedCategory]?.find(
    (t) => t.id === _.selectedType,
  );
}

export function updateHUD(state) {
  const hud = document.getElementById("hud");
  if (!hud) return;
  hud.innerHTML = hudHTML(state);
  renderBuildings();
}

export function showBuildingModal(building) {
  const bt = getBuildingType(building.category, building.typeId);
  if (!bt) return;

  const upgradeCost = _.citySimRef?.getUpgradeCost(building.id);
  const refundValue = _.citySimRef?.getRefundValue(building.id);
  const canUpgrade =
    upgradeCost > 0 &&
    upgradeCost < Infinity &&
    _.citySimRef?.canAfford(upgradeCost);

  createOverlay(
    "building-modal",
    "modal-overlay",
    buildingModalHTML(building, bt, upgradeCost, refundValue, canUpgrade),
    [
      [".modal-close", "click", () => removeOverlay("building-modal")],
      [
        ".upgrade-btn",
        "click",
        () => {
          if (_.citySimRef?.upgradeBuilding(building.id)) {
            removeOverlay("building-modal");
            _.sceneEl?.emit("building-upgraded", { buildingId: building.id });
          }
        },
      ],
      [
        ".rotate-btn",
        "click",
        () => {
          if (_.citySimRef?.rotateBuilding(building.id, 90)) {
            removeOverlay("building-modal");
            _.sceneEl?.emit("building-rotated", { buildingId: building.id });
          }
        },
      ],
      [
        ".move-btn",
        "click",
        () => {
          removeOverlay("building-modal");
          _.sceneEl?.emit("building-move-start", { buildingId: building.id });
        },
      ],
      [
        ".remove-btn",
        "click",
        () => {
          _.citySimRef?.removeBuilding(building.id);
          removeOverlay("building-modal");
          _.sceneEl?.emit("building-removed", { buildingId: building.id });
        },
      ],
    ],
  );
}

export function showResultOverlay(type) {
  const isWin = type === "win";
  createOverlay("result-overlay", "modal-overlay", resultOverlayHTML(isWin), [
    [".result-btn", "click", () => location.reload()],
  ]);
}

export function showMainMenu(onPlay) {
  createOverlay("main-menu", "main-menu", menuHTML(), [
    [
      ".play-btn",
      "click",
      () => {
        removeOverlay("main-menu");
        if (onPlay) onPlay();
      },
    ],
    [".settings-btn", "click", showSettings],
    [".exit-btn", "click", showGoodbye],
  ]);
}

export function showMuteButton() {
  if (document.getElementById("mute-btn")) return;
  const btn = document.createElement("button");
  btn.id = "mute-btn";
  btn.className = "mute-btn";
  btn.textContent = "\u266A";
  btn.addEventListener("click", toggleMute);
  document.body.appendChild(btn);
}

export function isMuted() {
  return _.isMuted;
}

export function toggleMute() {
  _.isMuted = !_.isMuted;
  const btn = document.getElementById("mute-btn");
  if (btn) btn.textContent = _.isMuted ? "\u2715" : "\u266A";
}

export function openSettings() {
  showSettings();
}

export function openGoodbye() {
  showGoodbye();
}

export function showGameButtons() {
  if (document.getElementById("game-controls")) return;
  const container = document.createElement("div");
  container.id = "game-controls";
  container.className = "game-controls";
  container.innerHTML = `
    <button class="game-btn" id="game-settings-btn" title="Settings">&#x2699;</button>
    <button class="game-btn" id="game-exit-btn" title="Exit">&#x2715;</button>
  `;
  document.body.appendChild(container);

  container
    .querySelector("#game-settings-btn")
    .addEventListener("click", showSettings);
  container
    .querySelector("#game-exit-btn")
    .addEventListener("click", showGoodbye);
}

export function hideGameButtons() {
  const el = document.getElementById("game-controls");
  if (el) el.parentNode?.removeChild(el);
}

/* ── Internal: Screens ── */

function showSettings() {
  createOverlay("settings-modal", "modal-overlay", settingsHTML(), [
    [".modal-close", "click", () => removeOverlay("settings-modal")],
    [".settings-back-btn", "click", () => removeOverlay("settings-modal")],
  ]);
}

function showGoodbye() {
  createOverlay("goodbye-modal", "modal-overlay", goodbyeHTML(), [
    [".result-btn", "click", () => location.reload()],
  ]);
}

/* ── Templates ── */

function hudHTML(state) {
  const popStr = `${state.population}/${state.maxPopulation}`;
  return `
    <div class="hud-stat">
      <span class="hud-label">MONEY</span>
      <span class="hud-value hud-money"><img class="hud-icon" src="assets/icons/dollar-sign.svg">${fmt(state.money)}</span>
    </div>
    <div class="hud-stat">
      <span class="hud-label">POP</span>
      <span class="hud-value hud-pop"><img class="hud-icon" src="assets/icons/users.svg">${popStr}</span>
    </div>
    <div class="hud-stat">
      <span class="hud-label">HAPPY</span>
      <span class="hud-value hud-happy"><img class="hud-icon" src="assets/icons/smile.svg">${state.happiness}%</span>
    </div>
    <div class="hud-stat">
      <span class="hud-label">RATE</span>
      <span class="hud-value hud-income">+${fmt(state.incomeRate)}/s</span>
    </div>
  `;
}

function buildingModalHTML(building, bt, upgradeCost, refundValue, canUpgrade) {
  return `
    <div class="modal-box">
      <button class="modal-close">✕</button>
      <div class="modal-title">${bt.name}</div>
      <div class="modal-level">${levelStars(building.level)}</div>
      <div class="modal-stats">
        <span><span class="stat-label">Cost</span><span class="stat-value">$${bt.cost}</span></span>
        ${building.category === "residential" ? `<span><span class="stat-label">Population</span><span class="stat-value">+${bt.pop * building.level}</span></span>` : ""}
        ${bt.income ? `<span><span class="stat-label">Income</span><span class="stat-value">+${fmt(bt.income * building.level)}/s</span></span>` : ""}
        <span><span class="stat-label">Refund</span><span class="stat-value">+$${fmt(refundValue)}</span></span>
      </div>
      <div class="modal-actions">
        ${upgradeCost < Infinity ? `<button class="modal-btn upgrade-btn" ${canUpgrade ? "" : "disabled"}>UPGRADE $${fmt(upgradeCost)}</button>` : ""}
        <button class="modal-btn rotate-btn">ROTATE</button>
        <button class="modal-btn move-btn">MOVE</button>
        <button class="modal-btn remove-btn">REMOVE</button>
      </div>
    </div>
  `;
}

function menuHTML() {
  return `
    <div class="menu-box">
      <div class="menu-title">CITY BUILDER GAME</div>
      <div class="menu-sub">Build &amp; Manage Your Dream City</div>
      <div class="menu-buttons">
        <button class="menu-btn play-btn">PLAY</button>
        <button class="menu-btn settings-btn">SETTINGS</button>
        <button class="menu-btn exit-btn">EXIT</button>
      </div>
    </div>
  `;
}

function settingsHTML() {
  return `
    <div class="modal-box">
      <button class="modal-close">✕</button>
      <div class="modal-title">SETTINGS</div>
      <div class="settings-content">
        <div class="settings-item">
          <span>Music Volume</span>
          <input type="range" min="0" max="100" value="50" disabled>
        </div>
        <div class="settings-item">
          <span>Sound FX</span>
          <input type="range" min="0" max="100" value="50" disabled>
        </div>
        <div class="settings-item settings-note">More settings coming soon</div>
      </div>
      <button class="modal-btn settings-back-btn">BACK</button>
    </div>
  `;
}

function goodbyeHTML() {
  return `
    <div class="modal-box result-box">
      <div class="result-title goodbye-title">GOODBYE!</div>
      <div class="result-sub">See you next time, Mayor.</div>
      <button class="modal-btn result-btn">OK</button>
    </div>
  `;
}

function resultOverlayHTML(isWin) {
  return `
    <div class="modal-box result-box">
      <img class="result-icon" src="assets/icons/${isWin ? "party-popper" : "skull"}.svg">
      <div class="result-title">${isWin ? "City Thriving!" : "City Abandoned!"}</div>
      <div class="result-sub">${isWin ? "You built a thriving metropolis!" : "Your city ran out of funds."}</div>
      <button class="modal-btn result-btn">Play Again</button>
    </div>
  `;
}

/* ── Renderers ── */

function renderHUD() {
  if (!document.getElementById("hud")) {
    const el = document.createElement("div");
    el.id = "hud";
    document.body.appendChild(el);
  }
}

function renderCategories() {
  let container = document.getElementById("categories");
  if (!container) {
    container = document.createElement("div");
    container.id = "categories";
    document.body.appendChild(container);
  }
  container.innerHTML = CATEGORIES.map(
    (c) => `
    <button class="cat-btn ${_.selectedCategory === c.id ? "active" : ""}"
            data-cat="${c.id}" style="--cat:${c.color}">
      <img class="cat-icon" src="${c.icon}">
      <span class="cat-label">${c.label}</span>
    </button>
  `,
  ).join("");
  container.querySelectorAll(".cat-btn").forEach((btn) => {
    btn.addEventListener("click", () => selectCategory(btn.dataset.cat));
  });
}

function renderBuildings() {
  let container = document.getElementById("buildings");
  if (!container) {
    container = document.createElement("div");
    container.id = "buildings";
    document.body.appendChild(container);
  }
  const types = BUILDING_TYPES[_.selectedCategory] || [];
  const state = _.citySimRef?.getState();
  container.innerHTML = types
    .map((t) => {
      const affordable = state ? state.money >= t.cost : false;
      const active = _.selectedType === t.id;
      const stars = levelStars(t.tier || 1, 3);
      return `<button class="bld-btn ${active ? "active" : ""} ${affordable ? "" : "locked"}"
            data-type="${t.id}" ${affordable ? "" : "disabled"}>
      <span class="bld-name">${t.name}</span>
      <span class="bld-cost">$${t.cost}</span>
      <span class="bld-tier">${stars}</span>
    </button>`;
    })
    .join("");
  container.querySelectorAll(".bld-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.disabled) selectType(btn.dataset.type);
    });
  });
}

/* ── Helpers ── */

function emitSelection() {
  _.sceneEl?.emit("building-selected", {
    category: _.selectedCategory,
    typeId: _.selectedType,
  });
}
