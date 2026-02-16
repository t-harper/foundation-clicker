export { apiClient } from './client';

export { register, login, getMe } from './auth';

export { loadGame, click, saveGame, resetGame, getStats } from './game';

export { buyBuilding, sellBuilding } from './buildings';

export { buyUpgrade } from './upgrades';

export {
  buildShip,
  sendShip,
  recallShip,
  unlockTradeRoute,
} from './ships';

export { checkAchievements } from './achievements';

export { previewPrestige, triggerPrestige, getPrestigeHistory } from './prestige';

export { chooseEvent, getActiveEffects, getEventHistory } from './events';
