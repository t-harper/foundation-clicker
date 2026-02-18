import type {
  PrestigePreview,
  PrestigeResponse,
  PrestigeHistoryEntry,
  ReplayEraResponse,
  GameState,
} from '@foundation/shared';
import { wsManager } from '../ws';

export async function previewPrestige(): Promise<PrestigePreview> {
  return wsManager.send<PrestigePreview>({ type: 'getPrestigePreview' });
}

export async function triggerPrestige(): Promise<PrestigeResponse & { gameState: GameState }> {
  return wsManager.send<PrestigeResponse & { gameState: GameState }>({ type: 'triggerPrestige' });
}

export async function getPrestigeHistory(): Promise<PrestigeHistoryEntry[]> {
  return wsManager.send<PrestigeHistoryEntry[]>({ type: 'getPrestigeHistory' });
}

export async function replayEra(era: number): Promise<ReplayEraResponse & { gameState: GameState }> {
  return wsManager.send<ReplayEraResponse & { gameState: GameState }>({ type: 'replayEra', era });
}
