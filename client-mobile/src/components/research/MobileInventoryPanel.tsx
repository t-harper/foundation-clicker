import React, { useState, useEffect } from 'react';
import type { InventoryItem, ActiveConsumable } from '@foundation/shared';
import { ITEM_DEFINITIONS } from '@foundation/shared';
import { MobileItemCard } from './MobileItemCard';
import { formatCountdown } from '@desktop/utils/time';

type ItemFilter = 'all' | 'artifact' | 'consumable';

interface MobileInventoryPanelProps {
  inventory: InventoryItem[];
  activeConsumable: ActiveConsumable | null;
}

export function MobileInventoryPanel({ inventory, activeConsumable }: MobileInventoryPanelProps) {
  const [filter, setFilter] = useState<ItemFilter>('all');
  const [consumableRemaining, setConsumableRemaining] = useState(0);

  // Update active consumable countdown
  useEffect(() => {
    if (!activeConsumable) {
      setConsumableRemaining(0);
      return;
    }

    function tick() {
      const now = Math.floor(Date.now() / 1000);
      setConsumableRemaining(Math.max(0, activeConsumable!.expiresAt - now));
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [activeConsumable]);

  const filteredItems = inventory.filter((i) => {
    if (filter === 'all') return true;
    const def = ITEM_DEFINITIONS[i.itemKey];
    return def?.category === filter;
  });

  const artifactCount = inventory.filter((i) => ITEM_DEFINITIONS[i.itemKey]?.category === 'artifact').length;
  const consumableCount = inventory.filter((i) => ITEM_DEFINITIONS[i.itemKey]?.category === 'consumable').length;

  const FILTERS: { key: ItemFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: inventory.length },
    { key: 'artifact', label: 'Artifacts', count: artifactCount },
    { key: 'consumable', label: 'Consumables', count: consumableCount },
  ];

  return (
    <div className="space-y-3">
      {/* Active consumable at top */}
      {activeConsumable && (
        <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-amber-400">Active Boost</h4>
              <p className="text-xs text-[var(--era-text)]/60 mt-0.5 truncate">
                {ITEM_DEFINITIONS[activeConsumable.itemKey]?.name ?? activeConsumable.itemKey}
              </p>
            </div>
            <span className="text-sm font-mono text-amber-400 shrink-0 ml-2">
              {formatCountdown(consumableRemaining)}
            </span>
          </div>
        </div>
      )}

      {/* Tab filter row */}
      <div className="flex gap-1 overflow-x-auto scrollbar-none">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={[
              'shrink-0 px-3 py-1.5 text-xs font-medium rounded-full transition-colors touch-action-manipulation',
              filter === f.key
                ? 'bg-[var(--era-accent)]/15 text-[var(--era-accent)] border border-[var(--era-accent)]/30'
                : 'bg-[var(--era-surface)]/30 text-[var(--era-text)]/50 border border-transparent',
            ].join(' ')}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Item list */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-10 text-[var(--era-text)]/30">
          <p className="text-sm">
            {filter === 'all'
              ? 'No items yet. Complete activities to earn them.'
              : filter === 'artifact'
                ? 'No artifacts yet. Complete research projects to earn them.'
                : 'No consumables yet. Complete missions to earn them.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <MobileItemCard
              key={item.itemKey}
              item={item}
              activeConsumable={activeConsumable}
            />
          ))}
        </div>
      )}
    </div>
  );
}
