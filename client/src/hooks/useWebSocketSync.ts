import { useEffect, useRef } from 'react';
import { useGameStore } from '../store';

export function useWebSocketSync(): void {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backoffRef = useRef(1000);
  const disposedRef = useRef(false);
  const isLoaded = useGameStore((s) => s.isLoaded);

  useEffect(() => {
    // Don't connect until game state is loaded
    if (!isLoaded) return;

    disposedRef.current = false;

    function closeCleanly() {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
        wsRef.current = null;
      }
    }

    function connect() {
      if (disposedRef.current) return;

      const token = localStorage.getItem('foundation_token');
      if (!token) return;

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const ws = new WebSocket(
        `${protocol}//${window.location.host}/ws?token=${encodeURIComponent(token)}`
      );
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('[WS] Connected');
        backoffRef.current = 1000;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data as string);
          if (data.type === 'sync') {
            const state = useGameStore.getState();
            state.setBuildings(data.buildings);
            state.setUpgrades(data.upgrades);
          }
        } catch {
          // Ignore malformed messages
        }
      };

      ws.onclose = (event) => {
        wsRef.current = null;
        if (disposedRef.current) return;
        if (event.code === 4001) {
          console.warn('[WS] Auth rejected, not reconnecting:', event.reason);
          return;
        }
        console.log('[WS] Disconnected, reconnecting in', backoffRef.current, 'ms');
        const delay = backoffRef.current;
        backoffRef.current = Math.min(delay * 2, 10000);
        reconnectTimerRef.current = setTimeout(connect, delay);
      };

      ws.onerror = () => {
        // onclose will fire after onerror, handling reconnect
      };
    }

    // Close cleanly before the browser tears the page down on refresh/navigate
    window.addEventListener('beforeunload', closeCleanly);

    connect();

    return () => {
      disposedRef.current = true;
      window.removeEventListener('beforeunload', closeCleanly);
      closeCleanly();
    };
  }, [isLoaded]);
}
