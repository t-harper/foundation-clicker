import type { ClientMessage, ServerMessage } from '@foundation/shared';
import { WS_SAVE_INTERVAL } from '@foundation/shared';
import { useGameStore } from '../store';
import { ACHIEVEMENT_DEFINITIONS } from '@foundation/shared';

type PendingRequest = {
  resolve: (data: unknown) => void;
  reject: (err: Error) => void;
  timer: ReturnType<typeof setTimeout>;
};

const REQUEST_TIMEOUT = 10000;

class WebSocketManager {
  private ws: WebSocket | null = null;
  private pending = new Map<string, PendingRequest>();
  private saveInterval: ReturnType<typeof setInterval> | null = null;
  private requestCounter = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private backoff = 1000;
  private disposed = false;

  connect(): void {
    this.disposed = false;
    const token = localStorage.getItem('foundation_token');
    if (!token) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(
      `${protocol}//${window.location.host}/ws?token=${encodeURIComponent(token)}`
    );
    this.ws = ws;

    ws.onopen = () => {
      console.log('[WS] Connected');
      this.backoff = 1000;
      this.startSaveInterval();
    };

    ws.onmessage = (event) => {
      this.handleMessage(event);
    };

    ws.onclose = (event) => {
      this.ws = null;
      this.stopSaveInterval();

      if (this.disposed) return;

      if (event.code === 4001) {
        console.warn('[WS] Auth rejected, redirecting to login');
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
}

export const wsManager = new WebSocketManager();
