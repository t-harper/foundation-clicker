import type { GetInventoryResponse, UseConsumableResponse } from '@foundation/shared';
import { apiClient } from './client';

export async function getInventory(): Promise<GetInventoryResponse> {
  return apiClient.get<GetInventoryResponse>('/inventory');
}

export async function useConsumable(itemKey: string): Promise<UseConsumableResponse> {
  return apiClient.post<UseConsumableResponse>('/inventory/use', { itemKey });
}
