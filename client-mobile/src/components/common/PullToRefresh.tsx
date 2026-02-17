import React, { useRef, useState, useCallback } from 'react';
import { useGameStore } from '@desktop/store';
import { saveGame } from '@desktop/api';
import { SaveIcon } from '@desktop/assets/svg/icons';

interface PullToRefreshProps {
  children: React.ReactNode;
}

export function PullToRefresh({ children }: PullToRefreshProps) {
  const addNotification = useGameStore((s) => s.addNotification);
  const setIsSaving = useGameStore((s) => s.setIsSaving);
  const [pullDistance, setPullDistance] = useState(0);
  const [isSaving, setIsSavingLocal] = useState(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const target = e.currentTarget;
    scrollTop.current = target.scrollTop;
    if (scrollTop.current <= 0) {
      startY.current = e.touches[0].clientY;
    } else {
      startY.current = 0;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (startY.current === 0) return;
    const delta = e.touches[0].clientY - startY.current;
    if (delta > 0) {
      setPullDistance(Math.min(delta * 0.5, 80));
    }
  }, []);

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance >= 60 && !isSaving) {
      setIsSavingLocal(true);
      setIsSaving(true);
      try {
        await saveGame();
        addNotification({ message: 'Saved!', type: 'success' });
      } catch {
        addNotification({ message: 'Save failed.', type: 'error' });
      } finally {
        setIsSavingLocal(false);
        setIsSaving(false);
      }
    }
    setPullDistance(0);
    startY.current = 0;
  }, [pullDistance, isSaving, setIsSaving, addNotification]);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* Pull indicator */}
      {pullDistance > 0 && (
        <div
          className="flex items-center justify-center transition-transform"
          style={{ height: pullDistance }}
        >
          <SaveIcon
            className={`w-5 h-5 text-[var(--era-primary)] transition-transform ${
              isSaving ? 'animate-spin' : ''
            } ${pullDistance >= 60 ? 'scale-110' : ''}`}
          />
        </div>
      )}
      {children}
    </div>
  );
}
