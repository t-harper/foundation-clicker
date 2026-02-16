import { useEffect } from 'react';
import { useGameStore } from '../store';
import { wsManager } from '../ws';

export function useWebSocketSync(): void {
  const isLoaded = useGameStore((s) => s.isLoaded);

  useEffect(() => {
    if (!isLoaded) return;

    wsManager.connect();

    const handleBeforeUnload = () => {
      wsManager.disconnect();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      wsManager.disconnect();
    };
  }, [isLoaded]);
}
