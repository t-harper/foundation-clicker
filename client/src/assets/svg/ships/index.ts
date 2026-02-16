import React from 'react';
import type { ShipType } from '@foundation/shared';
import { FreeTraderArt } from './FreeTraderArt';
import { ScoutShipArt } from './ScoutShipArt';
import { ArmedMerchantArt } from './ArmedMerchantArt';
import { WhisperShipArt } from './WhisperShipArt';
import { FoundationCruiserArt } from './FoundationCruiserArt';
import { GraviticShipArt } from './GraviticShipArt';
import { SolarianYachtArt } from './SolarianYachtArt';

export { FreeTraderArt } from './FreeTraderArt';
export { ScoutShipArt } from './ScoutShipArt';
export { ArmedMerchantArt } from './ArmedMerchantArt';
export { WhisperShipArt } from './WhisperShipArt';
export { FoundationCruiserArt } from './FoundationCruiserArt';
export { GraviticShipArt } from './GraviticShipArt';
export { SolarianYachtArt } from './SolarianYachtArt';

export const SHIP_ART_MAP: Record<ShipType, React.FC<{ className?: string; size?: number }>> = {
  freeTrader: FreeTraderArt,
  scoutShip: ScoutShipArt,
  armedMerchant: ArmedMerchantArt,
  whisperShip: WhisperShipArt,
  foundationCruiser: FoundationCruiserArt,
  graviticShip: GraviticShipArt,
  solarianYacht: SolarianYachtArt,
};
