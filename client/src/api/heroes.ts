import type { GetHeroesResponse } from '@foundation/shared';
import { apiClient } from './client';

export async function getHeroes(): Promise<GetHeroesResponse> {
  return apiClient.get<GetHeroesResponse>('/heroes');
}
