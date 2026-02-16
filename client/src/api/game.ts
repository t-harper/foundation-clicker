import type {
  LoadGameResponse,
  ClickResponse,
  GameState,
  GameStats,
} from '@foundation/shared';
import { apiClient } from './client';
import { wsManager } from '../ws';

export async function loadGame(): Promise<LoadGameResponse> {
  return apiClient.get<LoadGameResponse>('/game/load');
}

export async function click(clicks: number): Promise<ClickResponse> {
  return wsManager.send<ClickResponse>({ type: 'click', clicks });
}

export async function saveGame(): Promise<void> {
  // Saving is now handled automatically by the WebSocket save interval.
  // This is a no-op kept for API surface compatibility.
}

export async function resetGame(): Promise<{ gameState: GameState }> {
  return wsManager.send<{ gameState: GameState }>({ type: 'resetGame' });
}

export async function getStats(): Promise<GameStats> {
  return wsManager.send<GameStats>({ type: 'getStats' });
}
