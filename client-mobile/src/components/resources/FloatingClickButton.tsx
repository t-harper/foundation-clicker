import React, { useState, useCallback } from 'react';
import type { ResourceKey } from '@foundation/shared';
import { useGameStore, selectClickValue, selectClickResourceYields } from '@desktop/store';
import { click } from '@desktop/api';
import { ClickIcon } from '@desktop/assets/svg/icons';
import { formatNumber } from '@desktop/utils/format';
import { useShallow } from 'zustand/react/shallow';

export function FloatingClickButton() {
  const addClick = useGameStore((s) => s.addClick);
  const setResources = useGameStore((s) => s.setResources);
  const clickValue = useGameStore(selectClickValue);
  const bonusYields = useGameStore(useShallow(selectClickResourceYields));
  const addNotification = useGameStore((s) => s.addNotification);
  const [isPulsing, setIsPulsing] = useState(false);

  const handleClick = useCallback(async () => {
    const hasBonusYields = Object.keys(bonusYields).length > 0;
    addClick(clickValue, hasBonusYields ? bonusYields : undefined);

    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 200);

    try {
      const result = await click(1);
      const currentResources = { ...useGameStore.getState().resources };
      currentResources.credits = result.newCredits;
      if (result.bonusResources) {
        for (const [resource, amount] of Object.entries(result.bonusResources)) {
          if (amount !== undefined) {
            currentResources[resource as ResourceKey] = Math.max(
              currentResources[resource as ResourceKey],
              amount
            );
          }
        }
      }
      setResources(currentResources);
    } catch {
      addNotification({
        message: 'Click sync failed.',
        type: 'warning',
      });
    }
  }, [addClick, clickValue, bonusYields, setResources, addNotification]);

  return (
    <button
      type="button"
      data-tutorial="click-target"
      onClick={handleClick}
      className={[
        'fixed z-30 w-14 h-14 rounded-full',
        'bg-gradient-to-br from-[var(--era-accent)] via-[var(--era-primary)] to-[var(--era-accent)]',
        'border-2 border-[var(--era-accent)]/60',
        'shadow-[0_0_12px_color-mix(in_srgb,var(--era-accent)_30%,transparent)]',
        'flex items-center justify-center',
        'touch-action-manipulation',
        'active:scale-90 transition-transform duration-150',
        isPulsing ? 'fab-pulse' : '',
      ].join(' ')}
      style={{
        bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',
        right: '16px',
      }}
      aria-label={`Click for ${formatNumber(clickValue, 'short')} credits`}
    >
      <div className="flex flex-col items-center">
        <ClickIcon className="w-5 h-5 text-[var(--era-bg)]" />
        <span className="text-[9px] font-bold text-[var(--era-bg)] tabular-nums leading-none mt-0.5">
          +{formatNumber(clickValue, 'short')}
        </span>
      </div>
    </button>
  );
}
