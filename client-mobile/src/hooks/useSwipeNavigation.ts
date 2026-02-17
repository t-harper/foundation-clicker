import { useRef, useCallback } from 'react';
import { useGameStore } from '@desktop/store';
import type { ActiveTab } from '@desktop/store';

const TAB_ORDER: ActiveTab[] = ['buildings', 'upgrades', 'vault' as ActiveTab, 'research'];

export function useSwipeNavigation() {
  const setActiveTab = useGameStore((s) => s.setActiveTab);
  const startX = useRef(0);
  const startY = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - startX.current;
    const deltaY = endY - startY.current;

    // Must be primarily horizontal (< 30 degrees) and > 60px
    if (Math.abs(deltaX) < 60) return;
    if (Math.abs(deltaY) / Math.abs(deltaX) > 0.577) return; // tan(30°)

    const activeTab = useGameStore.getState().activeTab;
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    if (currentIndex === -1) return;

    if (deltaX < 0 && currentIndex < TAB_ORDER.length - 1) {
      // Swipe left → next tab
      setActiveTab(TAB_ORDER[currentIndex + 1]);
    } else if (deltaX > 0 && currentIndex > 0) {
      // Swipe right → previous tab
      setActiveTab(TAB_ORDER[currentIndex - 1]);
    }
  }, [setActiveTab]);

  return { onTouchStart, onTouchEnd };
}
