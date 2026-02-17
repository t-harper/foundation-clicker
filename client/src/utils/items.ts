import { ITEM_DEFINITIONS } from '@foundation/shared';
import { formatDuration } from './format';

/**
 * Formats an item's effect as a human-readable string.
 */
export function formatItemEffect(def: typeof ITEM_DEFINITIONS[string]): string {
  const effect = def.effect;
  switch (effect.type) {
    case 'resourceMultiplier':
      return `${effect.resource} production x${effect.multiplier}`;
    case 'globalMultiplier':
      return `All production x${effect.multiplier}`;
    case 'clickMultiplier':
      return `Click value x${effect.multiplier}`;
    case 'productionBuff':
      return `${effect.resource} production x${effect.multiplier} for ${formatDuration(effect.durationSeconds)}`;
    case 'globalProductionBuff':
      return `All production x${effect.multiplier} for ${formatDuration(effect.durationSeconds)}`;
    case 'clickBuff':
      return `Click value x${effect.multiplier} for ${formatDuration(effect.durationSeconds)}`;
  }
}
