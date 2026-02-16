import React from 'react';
import type { InventoryItem, ActiveConsumable } from '@foundation/shared';
import { ITEM_DEFINITIONS } from '@foundation/shared';
import { ItemCard } from './ItemCard';
import { formatCountdown } from '../../utils/time';

interface InventoryPanelProps {
  inventory: InventoryItem[];
  activeConsumable: ActiveConsumable | null;
}

export function InventoryPanel({ inventory, activeConsumable }: InventoryPanelProps) {
  const artifacts = inventory.filter((i) => {
    const def = ITEM_DEFINITIONS[i.itemKey];
    return def?.category === 'artifact';
  });

  const consumables = inventory.filter((i) => {
    const def = ITEM_DEFINITIONS[i.itemKey];
    return def?.category === 'consumable';
  });

  const now = Math.floor(Date.now() / 1000);
  const consumableRemaining = activeConsumable
    ? Math.max(0, activeConsumable.expiresAt - now)
    : 0;

  return (
    <div className="space-y-6">
      {/* Active consumable */}
      {activeConsumable && (
        <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-amber-400">Active Boost</h4>
              <p className="text-xs text-[var(--era-text)]/60 mt-0.5">
                {ITEM_DEFINITIONS[activeConsumable.itemKey]?.name ?? activeConsumable.itemKey}
              </p>
            </div>
            <span className="text-sm font-mono text-amber-400">
              {formatCountdown(consumableRemaining)}
            </span>
          </div>
        </div>
      )}

      {/* Artifacts */}
      <section>
        <h3 className="text-sm font-semibold text-[var(--era-primary)] uppercase tracking-wide mb-3">
          Artifacts ({artifacts.length})
        </h3>
        {artifacts.length === 0 ? (
          <p className="text-xs text-[var(--era-text)]/30 italic">
            No artifacts yet. Complete research projects to earn them.
          </p>
        ) : (
          <div className="grid gap-2">
            {artifacts.map((item) => (
              <ItemCard
                key={item.itemKey}
                item={item}
                activeConsumable={activeConsumable}
              />
            ))}
          </div>
        )}
      </section>

      {/* Consumables */}
      <section>
        <h3 className="text-sm font-semibold text-[var(--era-primary)] uppercase tracking-wide mb-3">
          Consumables ({consumables.length})
        </h3>
        {consumables.length === 0 ? (
          <p className="text-xs text-[var(--era-text)]/30 italic">
            No consumables yet. Complete missions to earn them.
          </p>
        ) : (
          <div className="grid gap-2">
            {consumables.map((item) => (
              <ItemCard
                key={item.itemKey}
                item={item}
                activeConsumable={activeConsumable}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
