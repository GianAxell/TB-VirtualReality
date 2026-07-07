import { getBuildingType } from "./building-types";

export const CitySimComponent = {
  init() {
    this.state = {
      money: 1000,
      population: 0,
      maxPopulation: 0,
      happiness: 100,
      incomeRate: 0,
      expenseRate: 0,
      buildingCount: 0,
      buildings: [],
      tickCount: 0,
      won: false,
      gameOver: false,
    };
    this.nextId = 0;
    this.tickInterval = null;
    this.started = false;
  },

  startGame() {
    if (this.started) return;
    this.started = true;
    this.tickInterval = setInterval(() => this.gameTick(), 1000);
  },

  remove() {
    if (this.tickInterval) clearInterval(this.tickInterval);
  },

  gameTick() {
    const s = this.state;
    if (s.won || s.gameOver) return;

    let income = 0;
    let happinessMod = 50;
    let maxPop = 0;

    for (const b of s.buildings) {
      const bt = getBuildingType(b.category, b.typeId);
      if (!bt) continue;
      const mult = b.level;

      if (b.category === "residential") {
        maxPop += (bt.pop || 0) * mult;
        income += (bt.income || 0) * mult;
      } else if (b.category === "commercial") {
        income += (bt.income || 0) * mult;
      } else if (b.category === "industrial") {
        income += (bt.income || 0) * mult;
        happinessMod += (bt.pollution || 0) * mult;
      } else if (b.category === "parks") {
        happinessMod += (bt.happiness || 0) * mult;
      }
    }

    const popIncome = s.population * 0.05;
    const expenses = s.buildings.length * 0.5;

    s.incomeRate = income + popIncome;
    s.expenseRate = expenses;
    s.maxPopulation = maxPop;
    s.happiness = Math.max(0, Math.min(100, happinessMod));
    s.money += Math.max(0, Math.round(s.incomeRate - s.expenseRate));

    const growthRate = 0.02 + (s.happiness / 100) * 0.08;
    if (maxPop > 0 && s.population < maxPop) {
      const growth = Math.max(
        1,
        Math.ceil((maxPop - s.population) * growthRate),
      );
      s.population = Math.min(maxPop, s.population + growth);
    }

    s.tickCount++;

    if (s.population >= 2000 && s.money >= 10000) {
      s.won = true;
      this.el.sceneEl.emit("game-won");
    }
    if (s.money <= 0 && s.buildings.length === 0 && s.tickCount > 3) {
      s.gameOver = true;
      this.el.sceneEl.emit("game-lost");
    }
  },

  canAfford(cost) {
    return this.state.money >= cost;
  },

  placeBuilding(category, typeId, position) {
    const s = this.state;
    const bt = getBuildingType(category, typeId);
    if (!bt || s.money < bt.cost) return null;

    s.money -= bt.cost;
    const id = this.nextId++;
    const building = {
      id,
      typeId,
      category,
      position: { ...position },
      rotation: 0,
      level: 1,
      entity: null,
    };
    s.buildings.push(building);
    s.buildingCount++;
    return building;
  },

  getUpgradeCost(buildingId) {
    const b = this.state.buildings.find((x) => x.id === buildingId);
    if (!b) return Infinity;
    const bt = getBuildingType(b.category, b.typeId);
    if (!bt || b.level >= 3) return Infinity;
    return Math.round(bt.cost * 0.6 * b.level);
  },

  upgradeBuilding(buildingId) {
    const b = this.state.buildings.find((x) => x.id === buildingId);
    if (!b) return false;
    const cost = this.getUpgradeCost(buildingId);
    if (cost === Infinity || this.state.money < cost) return false;
    this.state.money -= cost;
    b.level++;
    if (b.entity) {
      const scale = 1 + (b.level - 1) * 0.15;
      b.entity.setAttribute("animation", {
        property: "scale",
        to: `${scale} ${scale} ${scale}`,
        easing: "easeOutElastic",
        dur: 500,
      });
    }
    return true;
  },

  rotateBuilding(buildingId, angle) {
    const b = this.state.buildings.find((x) => x.id === buildingId);
    if (!b) return false;
    b.rotation = ((b.rotation + angle) % 360 + 360) % 360;
    if (b.entity) {
      const rotStr = `0 ${b.rotation} 0`;
      b.entity.setAttribute("animation", {
        property: "rotation",
        to: rotStr,
        easing: "easeOutElastic",
        dur: 400,
      });
    }
    return true;
  },

  moveBuilding(buildingId, newPosition) {
    const b = this.state.buildings.find((x) => x.id === buildingId);
    if (!b) return false;
    b.position = { ...newPosition };
    if (b.entity) {
      const posStr = `${newPosition.x} ${newPosition.y} ${newPosition.z}`;
      b.entity.setAttribute("animation", {
        property: "position",
        to: posStr,
        easing: "easeOutCubic",
        dur: 300,
      });
    }
    return true;
  },

  getRefundValue(buildingId) {
    const b = this.state.buildings.find((x) => x.id === buildingId);
    if (!b) return 0;
    const bt = getBuildingType(b.category, b.typeId);
    if (!bt) return 0;
    let invested = bt.cost;
    for (let i = 1; i < b.level; i++) {
      invested += Math.round(bt.cost * 0.6 * i);
    }
    return Math.round(invested * 0.5);
  },

  removeBuilding(buildingId) {
    const idx = this.state.buildings.findIndex((x) => x.id === buildingId);
    if (idx === -1) return 0;
    const b = this.state.buildings[idx];
    const refund = this.getRefundValue(buildingId);
    this.state.money += refund;
    if (b.entity) {
      b.entity.parentNode?.removeChild(b.entity);
    }
    this.state.buildings.splice(idx, 1);
    this.state.buildingCount--;
    return refund;
  },

  getState() {
    const s = this.state;
    return {
      money: s.money,
      population: s.population,
      maxPopulation: s.maxPopulation,
      happiness: s.happiness,
      incomeRate: s.incomeRate,
      expenseRate: s.expenseRate,
      buildingCount: s.buildingCount,
      tickCount: s.tickCount,
      won: s.won,
      gameOver: s.gameOver,
      buildings: s.buildings,
    };
  },
};
