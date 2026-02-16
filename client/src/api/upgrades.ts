import type { BuyUpgradeResponse } from '@foundation/shared';
import { wsManager } from '../ws';

export async function buyUpgrade(upgradeKey: string): Promise<BuyUpgradeResponse> {
  return wsManager.send<BuyUpgradeResponse>({ type: 'buyUpgrade', upgradeKey });
}
