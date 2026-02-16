import React from 'react';
import { useGameStore } from '../../store';
import type { BuyAmount } from '../../store';

const BUY_AMOUNTS: BuyAmount[] = [1, 10, 50, 100, 'max'];

export function BuyAmountSelector() {
  const buyAmount = useGameStore((s) => s.buyAmount);
  const setBuyAmount = useGameStore((s) => s.setBuyAmount);

  return (
    <div className="flex items-center gap-1">
      <span className="text-xs text-[var(--era-text)]/50 mr-2">Buy:</span>
      {BUY_AMOUNTS.map((amount) => {
        const isActive = buyAmount === amount;
        const label = amount === 'max' ? 'Max' : String(amount);
        return (
          <button
            key={String(amount)}
            type="button"
            onClick={() => setBuyAmount(amount)}
            className={[
              'px-3 py-1 text-xs font-medium rounded-md transition-all duration-150',
              'focus:outline-none focus:ring-1 focus:ring-[var(--era-accent)]',
              isActive
                ? 'bg-[var(--era-accent)] text-[var(--era-bg)] font-semibold'
                : 'bg-[var(--era-surface)]/50 text-[var(--era-text)]/60 hover:text-[var(--era-text)] hover:bg-[var(--era-surface)]',
            ].join(' ')}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
