import React, { useEffect, useRef, useCallback } from 'react';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface NotificationAreaProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const typeStyles: Record<Notification['type'], { bg: string; border: string; icon: string }> = {
  success: {
    bg: 'bg-green-900/80',
    border: 'border-green-500/50',
    icon: 'text-green-400',
  },
  info: {
    bg: 'bg-blue-900/80',
    border: 'border-blue-500/50',
    icon: 'text-blue-400',
  },
  warning: {
    bg: 'bg-amber-900/80',
    border: 'border-amber-500/50',
    icon: 'text-amber-400',
  },
  error: {
    bg: 'bg-red-900/80',
    border: 'border-red-500/50',
    icon: 'text-red-400',
  },
};

const typeIcons: Record<Notification['type'], React.ReactNode> = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
};

function NotificationItem({
  notification,
  onDismiss,
}: {
  notification: Notification;
  onDismiss: (id: string) => void;
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const style = typeStyles[notification.type];

  const dismiss = useCallback(() => {
    onDismiss(notification.id);
  }, [notification.id, onDismiss]);

  useEffect(() => {
    timerRef.current = setTimeout(dismiss, 3000);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [dismiss]);

  return (
    <div
      className={[
        'flex items-start gap-2.5 px-4 py-3 rounded-md border shadow-lg backdrop-blur-sm',
        'animate-slide-in min-w-[280px] max-w-[380px]',
        style.bg,
        style.border,
      ].join(' ')}
      role="alert"
    >
      <span className={`shrink-0 mt-0.5 ${style.icon}`}>
        {typeIcons[notification.type]}
      </span>
      <p className="text-sm text-[var(--era-text)] flex-1 leading-snug">
        {notification.message}
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 text-[var(--era-text)]/40 hover:text-[var(--era-text)] transition-colors -mt-0.5 -mr-1"
        aria-label="Dismiss notification"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}

export function NotificationArea({ notifications, onDismiss }: NotificationAreaProps) {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}
