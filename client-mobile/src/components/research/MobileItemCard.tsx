import React, { useState, useCallback } from 'react';
import type { InventoryItem, ActiveConsumable } from '@foundation/shared';
import { ITEM_DEFINITIONS } from '@foundation/shared';
import { useGameStore } from '@desktop/store';
import { useConsumable } from '@desktop/api/inventory';
import { Button } from '@desktop/components/common';
import { formatItemEffect } from '@desktop/utils/items';

interface MobileItemCardProps {
  item: InventoryItem;
  activeConsumable: ActiveConsumable | null;
}

export function MobileItemCard({ item, activeConsumable }: MobileItemCardProps) {
  const def = ITEM_DEFINITIONS[item.itemKey];
  const addNotification = useGameStore((s) => s.addNotification);
  const setInventory = useGameStore((s) => s.setInventory);
  const setActiveConsumable = useGameStore((s) => s.setActiveConsumable);
  const [loading, setLoading] = useState(false);

  if (!def) return null;

  const isConsumable = def.category === 'consumable';
  const hasActiveConsumable = activeConsumable !== null;

  const handleUse = useCallback(async () => {
    if (loading || hasActiveConsumable) return;
    setLoading(true);
    try {
      const result = await useConsumable(item.itemKey);
      setActiveConsumable(result.activeConsumable);
      setInventory(result.inventory);
      addNotification({
        message: `Activated ${def.name}!`,
        type: 'success',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to use item';
      addNotification({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [loading, hasActiveConsumable, item.itemKey, def.name, addNotification, setActiveConsumable, setInventory]);

  return (
    <div className={[
      'w-full p-3 rounded-lg border transition-colors',
      isConsumable
        ? 'border-orange-500/20 bg-[var(--era-surface)]/30'
        : 'border-[var(--era-primary)]/20 bg-[var(--era-surface)]/30',
    ].join(' ')}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {/* Name + category badge + quantity */}
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-[var(--era-text)] truncate">
              {def.name}
            </h4>
            <span className={[
              'shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase',
              isConsumable
                ? 'bg-orange-500/20 text-orange-400'
                : 'bg-purple-500/20 text-purple-400',
            ].join(' ')}>
              {def.category}
            </span>
            <span className="text-xs text-[var(--era-text)]/40 tabular-nums">
              x{item.quantity}
            </span>
          </div>

          {/* Description */}
          <p className="text-[11px] text-[var(--era-text)]/50 mt-1">{def.description}</p>

          {/* Effect */}
          <p className="text-[11px] text-[var(--era-accent)] mt-1">
            {formatItemEffect(def)}
          </p>
        </div>

        {/* Use button for consumables */}
        {isConsumable && item.quantity > 0 && (
          <Button
            variant="primary"
            size="sm"
            disabled={hasActiveConsumable}
            loading={loading}
            onClick={handleUse}
            className="shrink-0"
          >
            Use
          </Button>
        )}
      </div>
    </div>
  );
}
