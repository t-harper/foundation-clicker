import { useEffect } from 'react';
import { useGameStore } from '../store/index.js';
import type { ActiveTab, BuyAmount } from '../store/ui-slice.js';

const TAB_SHORTCUTS: Record<string, ActiveTab> = {
  b: 'buildings',
  u: 'upgrades',
  s: 'ships',
  a: 'achievements',
  p: 'prestige',
  e: 'encyclopedia',
};

const AMOUNT_SHORTCUTS: Record<string, BuyAmount> = {
  '1': 1,
  '2': 10,
  '3': 50,
  '4': 100,
};

/**
 * Global keyboard shortcut handler.
 * Binds tab switching, buy-amount changes, and modal dismiss keys.
 * Ignores events when the user is typing in an input or textarea.
 */
export function useKeyboard(): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Ignore when typing in form fields
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      // Escape -> close settings modal
      if (key === 'escape') {
        const state = useGameStore.getState();
        if (state.showSettings) {
          state.toggleSettings();
        }
        return;
      }

      // Tab shortcuts
      const tab = TAB_SHORTCUTS[key];
      if (tab) {
        useGameStore.getState().setActiveTab(tab);
        return;
      }

      // Buy amount shortcuts
      const amount = AMOUNT_SHORTCUTS[key];
      if (amount !== undefined) {
        useGameStore.getState().setBuyAmount(amount);
        return;
      }

      // 'm' -> max buy amount
      if (key === 'm') {
        useGameStore.getState().setBuyAmount('max');
        return;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
