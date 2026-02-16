import { Era } from '../types/eras.js';
import { HeroDefinition } from '../types/heroes.js';

export const HERO_DEFINITIONS: Record<string, HeroDefinition> = {
  // ─── Era 0: Religious Dominance ──────────────────────────────────────

  salvorHardin: {
    key: 'salvorHardin',
    name: 'Salvor Hardin',
    title: 'Mayor of Terminus',
    description: 'The first Mayor of Terminus City. A master politician who saved the Foundation through cunning diplomacy and the strategic use of technological religion.',
    era: Era.ReligiousDominance,
    specialization: 'mission',
    durationBonus: 0.85,
  },
  polyVerisof: {
    key: 'polyVerisof',
    name: 'Poly Verisof',
    title: 'High Priest of Science',
    description: 'Chief missionary to Anacreon and leader of the technological religion. His reports on the Outer Kingdoms proved invaluable to Foundation strategy.',
    era: Era.ReligiousDominance,
    specialization: 'research',
    durationBonus: 0.85,
  },
  lewisPirenne: {
    key: 'lewisPirenne',
    name: 'Lewis Pirenne',
    title: 'Chairman of the Board',
    description: 'Head of the Board of Encyclopedists. Though his devotion to the Encyclopedia blinded him to political realities, his scholarly rigor advanced Foundation knowledge.',
    era: Era.ReligiousDominance,
    specialization: 'research',
    durationBonus: 0.85,
  },
  theoAporat: {
    key: 'theoAporat',
    name: 'Theo Aporat',
    title: 'Defecting Priest',
    description: 'An Anacreonese priest who saw through the religious facade and defected to the Foundation, bringing vital intelligence about the Outer Kingdoms.',
    era: Era.ReligiousDominance,
    specialization: 'mission',
    durationBonus: 0.85,
  },

  // ─── Era 1: Trading Expansion ────────────────────────────────────────

  hoberMallow: {
    key: 'hoberMallow',
    name: 'Hober Mallow',
    title: 'Master Trader',
    description: 'The first of the Foundation Merchant Princes. His trial and subsequent trade mission to Korell transformed Foundation foreign policy from religion to commerce.',
    era: Era.TradingExpansion,
    specialization: 'mission',
    durationBonus: 0.85,
  },
  limmarPonyets: {
    key: 'limmarPonyets',
    name: 'Limmar Ponyets',
    title: 'Rogue Trader',
    description: 'A resourceful trader who opened commerce with Askone through creative dealing and a touch of scientific showmanship.',
    era: Era.TradingExpansion,
    specialization: 'mission',
    durationBonus: 0.85,
  },
  sennettForell: {
    key: 'sennettForell',
    name: 'Sennett Forell',
    title: 'Trade Guild Founder',
    description: 'Wealthy merchant and political power broker who helped organize the Trader faction and establish the commercial foundations of expansion.',
    era: Era.TradingExpansion,
    specialization: 'research',
    durationBonus: 0.85,
  },
  eskelGorov: {
    key: 'eskelGorov',
    name: 'Eskel Gorov',
    title: 'Foundation Agent',
    description: 'A Foundation agent captured on Askone whose imprisonment catalyzed Limmar Ponyets\' trading expedition and opened a new market.',
    era: Era.TradingExpansion,
    specialization: 'research',
    durationBonus: 0.85,
  },

  // ─── Era 2: Psychological Influence ──────────────────────────────────

  baytaDarell: {
    key: 'baytaDarell',
    name: 'Bayta Darell',
    title: 'Mule\'s Defeater',
    description: 'The woman who single-handedly prevented the Mule from discovering the Second Foundation, altering the course of galactic history through a single act of desperate courage.',
    era: Era.PsychologicalInfluence,
    specialization: 'mission',
    durationBonus: 0.85,
  },
  eblingMis: {
    key: 'eblingMis',
    name: 'Ebling Mis',
    title: 'Psychohistorian',
    description: 'A brilliant psychologist and researcher who nearly located the Second Foundation. His work on psychohistorical mathematics pushed the boundaries of the field.',
    era: Era.PsychologicalInfluence,
    specialization: 'research',
    durationBonus: 0.85,
  },
  hanPritcher: {
    key: 'hanPritcher',
    name: 'Han Pritcher',
    title: 'Converted Captain',
    description: 'A Foundation intelligence officer converted by the Mule. His knowledge of Foundation defenses and strategies made him a formidable operative.',
    era: Era.PsychologicalInfluence,
    specialization: 'mission',
    durationBonus: 0.85,
  },
  preemPalver: {
    key: 'preemPalver',
    name: 'Preem Palver',
    title: 'First Speaker',
    description: 'First Speaker of the Second Foundation and master of mentalic manipulation. He guided galactic events from the shadows to restore the Seldon Plan.',
    era: Era.PsychologicalInfluence,
    specialization: 'research',
    durationBonus: 0.85,
  },

  // ─── Era 3: Galactic Reunification ───────────────────────────────────

  golanTrevize: {
    key: 'golanTrevize',
    name: 'Golan Trevize',
    title: 'Foundation Councilman',
    description: 'The man chosen by destiny to make the ultimate decision for humanity\'s future. His intuition guided him to choose Galaxia over the Seldon Plan.',
    era: Era.GalacticReunification,
    specialization: 'mission',
    durationBonus: 0.85,
  },
  janovPelorat: {
    key: 'janovPelorat',
    name: 'Janov Pelorat',
    title: 'Mythologist',
    description: 'A scholar of ancient myths and legends whose lifelong research into humanity\'s origins proved essential to locating Earth and understanding Galaxia.',
    era: Era.GalacticReunification,
    specialization: 'research',
    durationBonus: 0.85,
  },
  bliss: {
    key: 'bliss',
    name: 'Bliss',
    title: 'Gaian Ambassador',
    description: 'A component of the planetary consciousness Gaia, sent to accompany Trevize on his journey. Her mentalic abilities and alien perspective shaped the quest.',
    era: Era.GalacticReunification,
    specialization: 'mission',
    durationBonus: 0.85,
  },
  daneelOlivaw: {
    key: 'daneelOlivaw',
    name: 'R. Daneel Olivaw',
    title: 'Guardian of Humanity',
    description: 'The ancient robot who has guided humanity for twenty thousand years. Creator of Gaia, architect of psychohistory, and the hidden hand behind the Seldon Plan.',
    era: Era.GalacticReunification,
    specialization: 'research',
    durationBonus: 0.85,
  },
};

export const ALL_HERO_KEYS = Object.keys(HERO_DEFINITIONS);
