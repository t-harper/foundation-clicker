import React from 'react';
import { ITEM_DEFINITIONS } from '@foundation/shared';
import { Modal } from '../common';
import { Button } from '../common';
import { formatItemEffect } from '../../utils/items';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityName: string;
  rewards: { itemKey: string; quantity: number }[];
}

export function RewardModal({ isOpen, onClose, activityName, rewards }: RewardModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={activityName} size="sm">
      <div className="space-y-3">
        {rewards.map((reward) => {
          const def = ITEM_DEFINITIONS[reward.itemKey];
          if (!def) return null;

          const isConsumable = def.category === 'consumable';

          return (
            <div
              key={reward.itemKey}
              className={[
                'p-3 rounded-lg border',
                isConsumable
                  ? 'border-orange-500/20 bg-[var(--era-surface)]/30'
                  : 'border-purple-500/20 bg-[var(--era-surface)]/30',
              ].join(' ')}
            >
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-semibold text-[var(--era-text)]">
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
                  x{reward.quantity}
                </span>
              </div>
              <p className="text-[11px] text-[var(--era-text)]/50">{def.description}</p>
              <p className="text-[11px] text-[var(--era-accent)] mt-1">
                {formatItemEffect(def)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="primary" size="sm" onClick={onClose}>
          Nice!
        </Button>
      </div>
    </Modal>
  );
}
