export interface PrestigeState {
  seldonPoints: number;
  totalSeldonPoints: number;
  prestigeCount: number;
  prestigeMultiplier: number;
}

export interface PrestigePreview {
  seldonPointsEarned: number;
  newTotal: number;
  newMultiplier: number;
  currentCredits: number;
}

export interface PrestigeHistoryEntry {
  prestigeNumber: number;
  creditsAtReset: number;
  seldonPointsEarned: number;
  eraAtReset: number;
  triggeredAt: number;
}
