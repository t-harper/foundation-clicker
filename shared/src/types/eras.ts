export enum Era {
  ReligiousDominance = 0,
  TradingExpansion = 1,
  PsychologicalInfluence = 2,
  GalacticReunification = 3,
}

export interface EraDefinition {
  era: Era;
  name: string;
  description: string;
  unlockCondition: string;
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    surface: string;
    text: string;
  };
}
