import React from 'react';
import type { ShipType } from '@foundation/shared';
import { FreeTraderArt } from './FreeTraderArt';
import { ScoutShipArt } from './ScoutShipArt';
import { WhisperShipArt } from './WhisperShipArt';
import { GraviticShipArt } from './GraviticShipArt';

export { FreeTraderArt } from './FreeTraderArt';
export { ScoutShipArt } from './ScoutShipArt';
export { WhisperShipArt } from './WhisperShipArt';
export { GraviticShipArt } from './GraviticShipArt';

export const SHIP_ART_MAP: Record<ShipType, React.FC<{ className?: string; size?: number }>> = {
  freeTrader: FreeTraderArt,
  scoutShip: ScoutShipArt,
  whisperShip: WhisperShipArt,
  graviticShip: GraviticShipArt,
};
