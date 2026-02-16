import { useCallback, useEffect, useRef } from 'react';
import { useGameStore } from '../store/index.js';
import type { Notification } from '../store/ui-slice.js';

const AUTO_DISMISS_MS = 3000; // 3 seconds

/**
 * Notification management hook.
 * Wraps the store's notification actions with auto-dismiss behavior
 * that removes each notification after 3 seconds.
 */
export function useNotifications(): {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
} {
  const notifications = useGameStore((s) => s.notifications);
  const storeAddNotification = useGameStore((s) => s.addNotification);
  const storeRemoveNotification = useGameStore((s) => s.removeNotification);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Clean up all pending timers on unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      for (const timer of timers.values()) {
        clearTimeout(timer);
      }
      timers.clear();
    };
  }, []);

  // Watch for new notifications and set auto-dismiss timers
  useEffect(() => {
    for (const notification of notifications) {
      if (!timersRef.current.has(notification.id)) {
        const timer = setTimeout(() => {
          timersRef.current.delete(notification.id);
          storeRemoveNotification(notification.id);
        }, AUTO_DISMISS_MS);
        timersRef.current.set(notification.id, timer);
      }
    }
  }, [notifications, storeRemoveNotification]);

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id'>) => {
      storeAddNotification(notification);
    },
    [storeAddNotification],
  );

  const removeNotification = useCallback(
    (id: string) => {
      // Clear the auto-dismiss timer if we're removing early
      const timer = timersRef.current.get(id);
      if (timer) {
        clearTimeout(timer);
        timersRef.current.delete(id);
      }
      storeRemoveNotification(id);
    },
    [storeRemoveNotification],
  );

  return { notifications, addNotification, removeNotification };
}
