import type { BuyBuildingResponse } from '@foundation/shared';
import { wsManager } from '../ws';

export async function buyBuilding(buildingKey: string, amount: number): Promise<BuyBuildingResponse> {
  return wsManager.send<BuyBuildingResponse>({ type: 'buyBuilding', buildingKey, amount });
}

export async function sellBuilding(buildingKey: string, amount: number): Promise<BuyBuildingResponse> {
  return wsManager.send<BuyBuildingResponse>({ type: 'sellBuilding', buildingKey, amount });
}
