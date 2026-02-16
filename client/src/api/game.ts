import type {
  LoadGameResponse,
  SaveGameRequest,
  ClickResponse,
  GameStats,
} from '@foundation/shared';
import { apiClient } from './client.js';

export async function loadGame(): Promise<LoadGameResponse> {
  return apiClient.get<LoadGameResponse>('/game/load');
}

export async function saveGame(data: SaveGameRequest): Promise<void> {
  await apiClient.post<void>('/game/save', data);
}

export async function click(clicks: number): Promise<ClickResponse> {
  return apiClient.post<ClickResponse>('/game/click', { clicks });
}

export async function resetGame(): Promise<void> {
  await apiClient.post<void>('/game/reset');
}

export async function getStats(): Promise<GameStats> {
  return apiClient.get<GameStats>('/game/stats');
}
