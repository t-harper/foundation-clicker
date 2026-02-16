export { apiClient } from './client.js';

export { register, login, getMe } from './auth.js';

export { loadGame, saveGame, click, resetGame, getStats } from './game.js';

export { getBuildings, buyBuilding, sellBuilding } from './buildings.js';

export { getUpgrades, buyUpgrade } from './upgrades.js';

export {
  getShips,
  buildShip,
  sendShip,
  recallShip,
  getTradeRoutes,
  unlockTradeRoute,
} from './ships.js';

export { getAchievements, checkAchievements } from './achievements.js';

export { previewPrestige, triggerPrestige, getPrestigeHistory } from './prestige.js';
