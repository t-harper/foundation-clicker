import type {
  PrestigePreview,
  PrestigeResponse,
  PrestigeHistoryEntry,
} from '@foundation/shared';
import { apiClient } from './client.js';

export async function previewPrestige(): Promise<PrestigePreview> {
  return apiClient.get<PrestigePreview>('/prestige/preview');
}

export async function triggerPrestige(): Promise<PrestigeResponse> {
  return apiClient.post<PrestigeResponse>('/prestige/trigger');
}

export async function getPrestigeHistory(): Promise<PrestigeHistoryEntry[]> {
  return apiClient.get<PrestigeHistoryEntry[]>('/prestige/history');
}
