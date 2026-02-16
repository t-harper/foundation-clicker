import type { BuildingState, BuyBuildingResponse } from '@foundation/shared';
import { apiClient } from './client.js';

export async function getBuildings(): Promise<BuildingState[]> {
  return apiClient.get<BuildingState[]>('/buildings');
}

export async function buyBuilding(buildingKey: string, amount: number): Promise<BuyBuildingResponse> {
  return apiClient.post<BuyBuildingResponse>('/buildings/buy', {
    buildingKey,
    amount,
  });
}

export async function sellBuilding(buildingKey: string, amount: number): Promise<BuyBuildingResponse> {
  return apiClient.post<BuyBuildingResponse>('/buildings/sell', {
    buildingKey,
    amount,
  });
}
