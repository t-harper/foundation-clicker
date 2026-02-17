import type { ClientMessage, ServerMessage, ResourceKey } from '@foundation/shared';
import { WS_SAVE_INTERVAL } from '@foundation/shared';
import { useGameStore } from '../store';
import { ACHIEVEMENT_DEFINITIONS } from '@foundation/shared';
import { formatNumber } from '../utils/format';

type PendingRequest = {
  resolve: (data: unknown) => void;
  reject: (err: Error) => void;
  timer: ReturnType<typeof setTimeout>;
};

const REQUEST_TIMEOUT = 10000;
const SYNC_POLL_INTERVAL = 5000;
const EVENTS_POLL_INTERVAL = 20000;
const EFFECTS_POLL_INTERVAL = 5000;
const KEEPALIVE_INTERVAL = 5 * 60 * 1000; // 5 min
const MAX_RECONNECT_FAILURES = 5;

class WebSocketManager {
  private ws: WebSocket | null = null;
  private pending = new Map<string, PendingRequest>();
  private saveInterval: ReturnType<typeof setInterval> | null = null;
  private syncInterval: ReturnType<typeof setInterval> | null = null;
  private eventsInterval: ReturnType<typeof setInterval> | null = null;
  private effectsInterval: ReturnType<typeof setInterval> | null = null;
  private keepaliveInterval: ReturnType<typeof setInterval> | null = null;
  private requestCounter = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private backoff = 1000;
  private disposed = false;
  private consecutiveFailures = 0;

  connect(): void {
    this.disposed = false;
    const token = localStorage.getItem('foundation_token');
    if (!token) return;

    let wsUrl: string;
    const configuredWsUrl = import.meta.env.VITE_WS_URL;
    if (configuredWsUrl) {
      // Production: use configured WebSocket API Gateway URL
      wsUrl = `${configuredWsUrl}?token=${encodeURIComponent(token)}`;
    } else {
      // Local dev: relative URL through Vite proxy
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      wsUrl = `${protocol}//${window.location.host}/ws?token=${encodeURIComponent(token)}`;
    }

    const ws = new WebSocket(wsUrl);
    this.ws = ws;

    ws.onopen = () => {
      console.log('[WS] Connected');
      this.backoff = 1000;
      this.consecutiveFailures = 0;
      this.startSaveInterval();
      this.startPollingIntervals();
    };

    ws.onmessage = (event) => {
      this.handleMessage(event);
    };

    ws.onclose = () => {
      this.ws = null;
      this.stopSaveInterval();
      this.stopPollingIntervals();

      if (this.disposed) return;

      this.consecutiveFailures++;

      if (this.consecutiveFailures >= MAX_RECONNECT_FAILURES) {
        console.warn('[WS] Too many reconnect failures, redirecting to login');
        localStorage.removeItem('foundation_token');
        window.location.href = '/login';
        return;
      }

      console.log('[WS] Disconnected, reconnecting in', this.backoff, 'ms');
      const delay = this.backoff;
      this.backoff = Math.min(delay * 2, 10000);
      this.reconnectTimer = setTimeout(() => this.connect(), delay);
    };

    ws.onerror = () => {
      // onclose will fire after onerror
    };
  }

  disconnect(): void {
    this.disposed = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.stopSaveInterval();
    this.stopPollingIntervals();

    // Reject all pending requests
    for (const [id, pending] of this.pending) {
      clearTimeout(pending.timer);
      pending.reject(new Error('WebSocket disconnected'));
    }
    this.pending.clear();

    if (this.ws) {
      this.ws.onclose = null;
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  /** Send a request/response message. Returns a promise that resolves with the server response data. */
  send<T>(msg: { type: string; [key: string]: unknown }): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error('WebSocket not connected'));
        return;
      }

      const requestId = String(++this.requestCounter);
      const timer = setTimeout(() => {
        this.pending.delete(requestId);
        reject(new Error('Request timed out'));
      }, REQUEST_TIMEOUT);

      this.pending.set(requestId, {
        resolve: resolve as (data: unknown) => void,
        reject,
        timer,
      });

      this.ws.send(JSON.stringify({ ...msg, requestId }));
    });
  }

  /** Fire-and-forget a message (no response expected). */
  fire(msg: ClientMessage): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  private handleMessage(event: MessageEvent): void {
    let msg: ServerMessage;
    try {
      msg = JSON.parse(event.data as string);
    } catch {
      return;
    }

    switch (msg.type) {
      case 'result': {
        const pending = this.pending.get(msg.requestId);
        if (pending) {
          clearTimeout(pending.timer);
          this.pending.delete(msg.requestId);
          pending.resolve(msg.data);
        }
        break;
      }

      case 'error': {
        const pending = this.pending.get(msg.requestId);
        if (pending) {
          clearTimeout(pending.timer);
          this.pending.delete(msg.requestId);
          pending.reject(new Error(msg.message));
        }
        break;
      }

      case 'sync': {
        const state = useGameStore.getState();
        if (msg.buildings) state.setBuildings(msg.buildings);
        if (msg.upgrades) state.setUpgrades(msg.upgrades);
        if (msg.ships) state.setShips(msg.ships);
        break;
      }

      case 'achievementUnlocked': {
        const state = useGameStore.getState();
        for (const achievement of msg.achievements) {
          state.unlockAchievement(achievement.achievementKey);
          const def = ACHIEVEMENT_DEFINITIONS[achievement.achievementKey];
          const name = def?.name ?? achievement.achievementKey;
          useGameStore.getState().addNotification({
            message: `Achievement unlocked: ${name}`,
            type: 'success',
          });
        }
        break;
      }

      case 'eventTriggered': {
        const state = useGameStore.getState();
        if (!state.showEventModal) {
          state.showEvent(msg.eventKey);
        }
        break;
      }

      case 'effectsUpdate': {
        useGameStore.getState().setActiveEffects(msg.activeEffects);
        break;
      }

      case 'fullState': {
        useGameStore.getState().setGameState(msg.gameState);
        break;
      }

      case 'pong': {
        // Keepalive acknowledged, nothing to do
        break;
      }
    }
  }

  private startSaveInterval(): void {
    this.stopSaveInterval();
    this.saveInterval = setInterval(() => {
      const state = useGameStore.getState();
      if (!state.isLoaded) return;

      this.fire({
        type: 'saveState',
        resources: state.resources,
        lastTickAt: state.lastTickAt,
        totalPlayTime: state.totalPlayTime,
        totalClicks: state.totalClicks,
        lifetimeCredits: state.lifetimeCredits,
      });
    }, WS_SAVE_INTERVAL);
  }

  private stopSaveInterval(): void {
    if (this.saveInterval) {
      clearInterval(this.saveInterval);
      this.saveInterval = null;
    }
  }

  private startPollingIntervals(): void {
    this.stopPollingIntervals();

    // Sync polling (buildings, upgrades, ships, trade rewards)
    this.syncInterval = setInterval(() => {
      this.send<any>({ type: 'requestSync' }).then((data) => {
        if (data && data.type === 'sync') {
          const state = useGameStore.getState();
          if (data.buildings) state.setBuildings(data.buildings);
          if (data.upgrades) state.setUpgrades(data.upgrades);
          if (data.ships) state.setShips(data.ships);

          // Apply trade route rewards collected by the server
          if (data.tradeRewards) {
            for (const key of Object.keys(data.tradeRewards) as ResourceKey[]) {
              const amount = data.tradeRewards[key];
              if (amount) {
                state.updateResource(key, amount);
              }
            }
            const creditReward = data.tradeRewards.credits;
            const rewardText = creditReward
              ? `+${formatNumber(creditReward, 'short')} credits`
              : 'Resources collected';
            const shipCount = data.shipsCollected ?? 1;
            state.addNotification({
              message: `Trade route completed! ${shipCount > 1 ? `(${shipCount} ships) ` : ''}${rewardText}`,
              type: 'success',
            });
          }
        }
      }).catch(() => { /* ignore poll failures */ });
    }, SYNC_POLL_INTERVAL);

    // Event polling
    this.eventsInterval = setInterval(() => {
      this.send<any>({ type: 'checkEvents' }).then((data) => {
        if (data && data.type === 'eventTriggered') {
          const state = useGameStore.getState();
          if (!state.showEventModal) {
            state.showEvent(data.eventKey);
          }
        }
      }).catch(() => { /* ignore poll failures */ });
    }, EVENTS_POLL_INTERVAL);

    // Effects polling
    this.effectsInterval = setInterval(() => {
      this.send<any>({ type: 'checkEffects' }).then((data) => {
        if (data && data.type === 'effectsUpdate') {
          useGameStore.getState().setActiveEffects(data.activeEffects);
        }
      }).catch(() => { /* ignore poll failures */ });
    }, EFFECTS_POLL_INTERVAL);

    // Keepalive ping (API Gateway has 10-min idle timeout)
    this.keepaliveInterval = setInterval(() => {
      this.fire({ type: 'ping' } as any);
    }, KEEPALIVE_INTERVAL);
  }

  private stopPollingIntervals(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    if (this.eventsInterval) {
      clearInterval(this.eventsInterval);
      this.eventsInterval = null;
    }
    if (this.effectsInterval) {
      clearInterval(this.effectsInterval);
      this.effectsInterval = null;
    }
    if (this.keepaliveInterval) {
      clearInterval(this.keepaliveInterval);
      this.keepaliveInterval = null;
    }
  }
}

export const wsManager = new WebSocketManager();
