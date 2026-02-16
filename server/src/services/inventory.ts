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

async function buildInventory(userId: number): Promise<InventoryItem[]> {
  const rows = await getUserInventory(userId);
  return rows.map((r) => ({
    itemKey: r.item_key,
    quantity: r.quantity,
  }));
}

async function buildActiveConsumable(userId: number): Promise<ActiveConsumable | null> {
  const row = await getActiveConsumable(userId);
  if (!row) return null;

  const now = Math.floor(Date.now() / 1000);
  if (now >= row.expires_at) {
    await clearActiveConsumable(userId);
    return null;
  }

  const def = ITEM_DEFINITIONS[row.item_key];
  if (!def || def.category !== 'consumable') {
    await clearActiveConsumable(userId);
    return null;
  }

  return {
    itemKey: row.item_key,
    startedAt: row.started_at,
    expiresAt: row.expires_at,
    effect: def.effect as ConsumableEffect,
  };
}

export async function getInventory(userId: number): Promise<GetInventoryResponse> {
  return {
    inventory: await buildInventory(userId),
    activeConsumable: await buildActiveConsumable(userId),
  };
}

export async function useConsumable(userId: number, itemKey: string): Promise<UseConsumableResponse> {
  const def = ITEM_DEFINITIONS[itemKey];
  if (!def) {
    throw new NotFoundError(`Item not found: ${itemKey}`);
  }

  if (def.category !== 'consumable') {
    throw new ValidationError(`Item ${itemKey} is not a consumable`);
  }

  const quantity = await getItemQuantity(userId, itemKey);
  if (quantity <= 0) {
    throw new ValidationError(`You don't have any ${def.name}`);
  }

  const existing = await buildActiveConsumable(userId);
  if (existing) {
    throw new ValidationError('A consumable is already active. Wait for it to expire.');
  }

  const removed = await removeItem(userId, itemKey, 1);
  if (!removed) {
    throw new ValidationError(`Failed to consume ${def.name}`);
  }

  const now = Math.floor(Date.now() / 1000);
  const effect = def.effect as ConsumableEffect;
  const expiresAt = now + effect.durationSeconds;

  await setActiveConsumable(userId, itemKey, now, expiresAt);

  return {
    activeConsumable: {
      itemKey,
      startedAt: now,
      expiresAt,
      effect,
    },
    inventory: await buildInventory(userId),
  };
}
