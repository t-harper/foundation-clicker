import { ITEM_DEFINITIONS } from '@foundation/shared';
import type { ConsumableEffect, InventoryItem, ActiveConsumable } from '@foundation/shared';
import type { GetInventoryResponse, UseConsumableResponse } from '@foundation/shared';
import {
  getUserInventory,
  getItemQuantity,
  removeItem,
  getActiveConsumable,
  setActiveConsumable,
  clearActiveConsumable,
} from '../db/queries/inventory-queries.js';
import {
  ValidationError,
  NotFoundError,
} from '../middleware/error-handler.js';

function buildInventory(userId: number): InventoryItem[] {
  const rows = getUserInventory(userId);
  return rows.map((r) => ({
    itemKey: r.item_key,
    quantity: r.quantity,
  }));
}

function buildActiveConsumable(userId: number): ActiveConsumable | null {
  const row = getActiveConsumable(userId);
  if (!row) return null;

  const now = Math.floor(Date.now() / 1000);
  if (now >= row.expires_at) {
    // Expired, clean it up
    clearActiveConsumable(userId);
    return null;
  }

  const def = ITEM_DEFINITIONS[row.item_key];
  if (!def || def.category !== 'consumable') {
    clearActiveConsumable(userId);
    return null;
  }

  return {
    itemKey: row.item_key,
    startedAt: row.started_at,
    expiresAt: row.expires_at,
    effect: def.effect as ConsumableEffect,
  };
}

export function getInventory(userId: number): GetInventoryResponse {
  return {
    inventory: buildInventory(userId),
    activeConsumable: buildActiveConsumable(userId),
  };
}

export function useConsumable(userId: number, itemKey: string): UseConsumableResponse {
  const def = ITEM_DEFINITIONS[itemKey];
  if (!def) {
    throw new NotFoundError(`Item not found: ${itemKey}`);
  }

  if (def.category !== 'consumable') {
    throw new ValidationError(`Item ${itemKey} is not a consumable`);
  }

  // Check quantity
  const quantity = getItemQuantity(userId, itemKey);
  if (quantity <= 0) {
    throw new ValidationError(`You don't have any ${def.name}`);
  }

  // Check for already-active consumable
  const existing = buildActiveConsumable(userId);
  if (existing) {
    throw new ValidationError('A consumable is already active. Wait for it to expire.');
  }

  // Deduct item and activate
  const removed = removeItem(userId, itemKey, 1);
  if (!removed) {
    throw new ValidationError(`Failed to consume ${def.name}`);
  }

  const now = Math.floor(Date.now() / 1000);
  const effect = def.effect as ConsumableEffect;
  const expiresAt = now + effect.durationSeconds;

  setActiveConsumable(userId, itemKey, now, expiresAt);

  return {
    activeConsumable: {
      itemKey,
      startedAt: now,
      expiresAt,
      effect,
    },
    inventory: buildInventory(userId),
  };
}
