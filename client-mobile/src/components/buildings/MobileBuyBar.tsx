import React from 'react';
import { useGameStore } from '@desktop/store';
import type { BuyAmount } from '@desktop/store';

const BUY_AMOUNTS: BuyAmount[] = [1, 10, 50, 100, 'max'];

export function MobileBuyBar() {
  const buyAmount = useGameStore((s) => s.buyAmount);
  const setBuyAmount = useGameStore((s) => s.setBuyAmount);

  return (
    <div className="sticky top-0 z-20 flex items-center h-9 bg-[var(--era-bg)]/95 backdrop-blur-sm border-b border-[var(--era-surface)]">
      {BUY_AMOUNTS.map((amount) => {
        const isActive = buyAmount === amount;
        const label = amount === 'max' ? 'Max' : String(amount);
        return (
          <button
            key={String(amount)}
            type="button"
            onClick={() => setBuyAmount(amount)}
            className={[
              'flex-1 min-w-[44px] min-h-[44px] flex items-center justify-center',
              'text-xs font-semibold tracking-wide',
              'touch-action-manipulation select-none',
              'transition-colors duration-100',
              isActive
                ? 'bg-[var(--era-accent)] text-[var(--era-bg)]'
                : 'text-[var(--era-text)]/60 active:bg-[var(--era-surface)]/60',
              // Segment borders between buttons
              'border-r border-[var(--era-surface)] last:border-r-0',
            ].join(' ')}
            aria-pressed={isActive}
            aria-label={`Buy ${label}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
