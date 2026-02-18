export { apiClient } from './client';

export { register, login, getMe, setNickname } from './auth';

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

export { previewPrestige, triggerPrestige, getPrestigeHistory, replayEra } from './prestige';

export { chooseEvent, getActiveEffects, getEventHistory } from './events';

export { getHeroes } from './heroes';
export { getActivities, startActivity, collectActivity } from './activities';
export { getInventory, useConsumable } from './inventory';

export { getLeaderboard } from './leaderboard';

export * from './admin';
