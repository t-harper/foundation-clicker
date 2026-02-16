import type { UpgradeState, BuyUpgradeResponse } from '@foundation/shared';
import { apiClient } from './client.js';

export async function getUpgrades(): Promise<UpgradeState[]> {
  return apiClient.get<UpgradeState[]>('/upgrades');
}

export async function buyUpgrade(upgradeKey: string): Promise<BuyUpgradeResponse> {
  return apiClient.post<BuyUpgradeResponse>('/upgrades/buy', {
    upgradeKey,
  });
}
