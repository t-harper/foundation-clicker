import { Era } from '../types/eras.js';
import { ItemDefinition } from '../types/items.js';

export const ITEM_DEFINITIONS: Record<string, ItemDefinition> = {
  // ─── Era 0 Artifacts (from Research Projects) ────────────────────────

  seldonsPrimer: {
    key: 'seldonsPrimer',
    name: "Seldon's Primer",
    description: 'A foundational text on psychohistory that improves knowledge generation across the colony.',
    era: Era.ReligiousDominance,
    category: 'artifact',
    effect: { type: 'resourceMultiplier', resource: 'knowledge', multiplier: 1.05 },
  },
  holoProjectorBlueprints: {
    key: 'holoProjectorBlueprints',
    name: 'Holo-Projector Blueprints',
    description: 'Advanced holographic designs from the old Empire that enhance nuclear research capabilities.',
    era: Era.ReligiousDominance,
    category: 'artifact',
    effect: { type: 'resourceMultiplier', resource: 'nuclearTech', multiplier: 1.05 },
  },
  encyclopediaVolume: {
    key: 'encyclopediaVolume',
    name: 'Encyclopedia Volume',
    description: 'A completed volume of the Encyclopedia Galactica that broadly improves all Foundation output.',
    era: Era.ReligiousDominance,
    category: 'artifact',
    effect: { type: 'globalMultiplier', multiplier: 1.02 },
  },
  ancientDataCrystal: {
    key: 'ancientDataCrystal',
    name: 'Ancient Data Crystal',
    description: 'A pre-Empire data crystal containing fragments of lost knowledge that improve click effectiveness.',
    era: Era.ReligiousDominance,
    category: 'artifact',
    effect: { type: 'clickMultiplier', multiplier: 1.05 },
  },
  sacredTextAnnotations: {
    key: 'sacredTextAnnotations',
    name: 'Sacred Text Annotations',
    description: 'Annotations to the scientific religion texts that strengthen the Foundation\'s influence abroad.',
    era: Era.ReligiousDominance,
    category: 'artifact',
    effect: { type: 'resourceMultiplier', resource: 'influence', multiplier: 1.05 },
  },

  // ─── Era 0 Consumables (from Missions) ──────────────────────────────

  crisisCatalyst: {
    key: 'crisisCatalyst',
    name: 'Crisis Catalyst',
    description: 'A surge of desperate innovation triggered by an approaching Seldon Crisis.',
    era: Era.ReligiousDominance,
    category: 'consumable',
    effect: { type: 'clickBuff', multiplier: 2.0, durationSeconds: 300 },
  },
  diplomaticPouch: {
    key: 'diplomaticPouch',
    name: 'Diplomatic Pouch',
    description: 'A sealed diplomatic package that temporarily boosts influence generation.',
    era: Era.ReligiousDominance,
    category: 'consumable',
    effect: { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 600 },
  },
  reactorOvercharge: {
    key: 'reactorOvercharge',
    name: 'Reactor Overcharge',
    description: 'Push the nuclear reactors beyond safe limits for a burst of production.',
    era: Era.ReligiousDominance,
    category: 'consumable',
    effect: { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.5, durationSeconds: 600 },
  },
  missionaryZeal: {
    key: 'missionaryZeal',
    name: 'Missionary Zeal',
    description: 'A wave of religious fervor that temporarily boosts all production.',
    era: Era.ReligiousDominance,
    category: 'consumable',
    effect: { type: 'globalProductionBuff', multiplier: 1.3, durationSeconds: 300 },
  },
  emergencyReserves: {
    key: 'emergencyReserves',
    name: 'Emergency Reserves',
    description: 'Hidden material stockpiles that boost raw material gathering.',
    era: Era.ReligiousDominance,
    category: 'consumable',
    effect: { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.5, durationSeconds: 600 },
  },

  // ─── Era 1 Artifacts (from Research Projects) ────────────────────────

  tradersLedger: {
    key: 'tradersLedger',
    name: "Trader's Ledger",
    description: 'A master trader\'s accounting methods that optimize credit generation.',
    era: Era.TradingExpansion,
    category: 'artifact',
    effect: { type: 'resourceMultiplier', resource: 'credits', multiplier: 1.05 },
  },
  hyperdriveCalibrator: {
    key: 'hyperdriveCalibrator',
    name: 'Hyperdrive Calibrator',
    description: 'Precision instruments that improve the efficiency of all Foundation technology.',
    era: Era.TradingExpansion,
    category: 'artifact',
    effect: { type: 'resourceMultiplier', resource: 'nuclearTech', multiplier: 1.05 },
  },
  tradeRouteAtlas: {
    key: 'tradeRouteAtlas',
    name: 'Trade Route Atlas',
    description: 'Comprehensive maps of profitable routes that provide a broad production bonus.',
    era: Era.TradingExpansion,
    category: 'artifact',
    effect: { type: 'globalMultiplier', multiplier: 1.02 },
  },
  korellianSmithingManual: {
    key: 'korellianSmithingManual',
    name: 'Korellian Smithing Manual',
    description: 'Manufacturing techniques from Korell that improve raw material processing.',
    era: Era.TradingExpansion,
    category: 'artifact',
    effect: { type: 'resourceMultiplier', resource: 'rawMaterials', multiplier: 1.05 },
  },
  merchantGuildCharter: {
    key: 'merchantGuildCharter',
    name: 'Merchant Guild Charter',
    description: 'Official trading guild documents that enhance the Foundation\'s commercial click value.',
    era: Era.TradingExpansion,
    category: 'artifact',
    effect: { type: 'clickMultiplier', multiplier: 1.05 },
  },

  // ─── Era 1 Consumables (from Missions) ──────────────────────────────

  tradeWinds: {
    key: 'tradeWinds',
    name: 'Trade Winds',
    description: 'Favorable market conditions that temporarily double credit production.',
    era: Era.TradingExpansion,
    category: 'consumable',
    effect: { type: 'productionBuff', resource: 'credits', multiplier: 2.0, durationSeconds: 600 },
  },
  smugglersCache: {
    key: 'smugglersCache',
    name: "Smuggler's Cache",
    description: 'A hidden stockpile of rare materials acquired through back channels.',
    era: Era.TradingExpansion,
    category: 'consumable',
    effect: { type: 'productionBuff', resource: 'rawMaterials', multiplier: 2.0, durationSeconds: 600 },
  },
  marketManipulation: {
    key: 'marketManipulation',
    name: 'Market Manipulation',
    description: 'Aggressive trading tactics that temporarily boost all production.',
    era: Era.TradingExpansion,
    category: 'consumable',
    effect: { type: 'globalProductionBuff', multiplier: 1.4, durationSeconds: 300 },
  },
  technologicalSample: {
    key: 'technologicalSample',
    name: 'Technological Sample',
    description: 'Cutting-edge Foundation gadgets used as trade goods that boost click value.',
    era: Era.TradingExpansion,
    category: 'consumable',
    effect: { type: 'clickBuff', multiplier: 2.5, durationSeconds: 300 },
  },
  diplomaticLeverage: {
    key: 'diplomaticLeverage',
    name: 'Diplomatic Leverage',
    description: 'Political leverage gained through trade dependencies.',
    era: Era.TradingExpansion,
    category: 'consumable',
    effect: { type: 'productionBuff', resource: 'influence', multiplier: 2.0, durationSeconds: 600 },
  },

  // ─── Era 2 Artifacts (from Research Projects) ────────────────────────

  mentalicsTrainingGuide: {
    key: 'mentalicsTrainingGuide',
    name: 'Mentalics Training Guide',
    description: 'A Second Foundation primer on mental manipulation that dramatically boosts influence.',
    era: Era.PsychologicalInfluence,
    category: 'artifact',
    effect: { type: 'resourceMultiplier', resource: 'influence', multiplier: 1.08 },
  },
  psychohistoryRefinement: {
    key: 'psychohistoryRefinement',
    name: 'Psychohistory Refinement',
    description: 'Advanced mathematical models that improve knowledge generation.',
    era: Era.PsychologicalInfluence,
    category: 'artifact',
    effect: { type: 'resourceMultiplier', resource: 'knowledge', multiplier: 1.08 },
  },
  secondFoundationArchives: {
    key: 'secondFoundationArchives',
    name: 'Second Foundation Archives',
    description: 'Secret archives containing centuries of psychological research. Boosts all production.',
    era: Era.PsychologicalInfluence,
    category: 'artifact',
    effect: { type: 'globalMultiplier', multiplier: 1.03 },
  },
  emotionalControlDevice: {
    key: 'emotionalControlDevice',
    name: 'Emotional Control Device',
    description: 'A device derived from the Mule\'s abilities that enhances leadership effectiveness.',
    era: Era.PsychologicalInfluence,
    category: 'artifact',
    effect: { type: 'clickMultiplier', multiplier: 1.08 },
  },
  convergenceLens: {
    key: 'convergenceLens',
    name: 'Convergence Lens',
    description: 'A mentalic focusing device that improves the yield of raw material extraction.',
    era: Era.PsychologicalInfluence,
    category: 'artifact',
    effect: { type: 'resourceMultiplier', resource: 'rawMaterials', multiplier: 1.08 },
  },

  // ─── Era 2 Consumables (from Missions) ──────────────────────────────

  mentalShield: {
    key: 'mentalShield',
    name: 'Mental Shield',
    description: 'Psychic shielding that protects the colony and temporarily boosts all production.',
    era: Era.PsychologicalInfluence,
    category: 'consumable',
    effect: { type: 'globalProductionBuff', multiplier: 1.5, durationSeconds: 600 },
  },
  muleSEcho: {
    key: 'muleSEcho',
    name: "Mule's Echo",
    description: 'A faint psychic resonance that massively amplifies clicking for a short time.',
    era: Era.PsychologicalInfluence,
    category: 'consumable',
    effect: { type: 'clickBuff', multiplier: 3.0, durationSeconds: 300 },
  },
  subliminalBroadcast: {
    key: 'subliminalBroadcast',
    name: 'Subliminal Broadcast',
    description: 'Mentalic broadcasts that dramatically increase influence generation.',
    era: Era.PsychologicalInfluence,
    category: 'consumable',
    effect: { type: 'productionBuff', resource: 'influence', multiplier: 2.5, durationSeconds: 600 },
  },
  psychicResonance: {
    key: 'psychicResonance',
    name: 'Psychic Resonance',
    description: 'A wave of collective consciousness that enhances knowledge production.',
    era: Era.PsychologicalInfluence,
    category: 'consumable',
    effect: { type: 'productionBuff', resource: 'knowledge', multiplier: 2.5, durationSeconds: 600 },
  },
  foundationPropaganda: {
    key: 'foundationPropaganda',
    name: 'Foundation Propaganda',
    description: 'A coordinated propaganda campaign that boosts credit generation.',
    era: Era.PsychologicalInfluence,
    category: 'consumable',
    effect: { type: 'productionBuff', resource: 'credits', multiplier: 2.5, durationSeconds: 600 },
  },

  // ─── Era 3 Artifacts (from Research Projects) ────────────────────────

  gaianHarmonyManual: {
    key: 'gaianHarmonyManual',
    name: 'Gaian Harmony Manual',
    description: 'Teachings from Gaia on planetary consciousness that provide a broad production bonus.',
    era: Era.GalacticReunification,
    category: 'artifact',
    effect: { type: 'globalMultiplier', multiplier: 1.05 },
  },
  earthsLegacy: {
    key: 'earthsLegacy',
    name: "Earth's Legacy",
    description: 'Knowledge recovered from humanity\'s birth world that improves credit generation.',
    era: Era.GalacticReunification,
    category: 'artifact',
    effect: { type: 'resourceMultiplier', resource: 'credits', multiplier: 1.10 },
  },
  zerothLawCodex: {
    key: 'zerothLawCodex',
    name: 'Zeroth Law Codex',
    description: 'Daneel\'s philosophical framework for protecting all of humanity. Enhances click value.',
    era: Era.GalacticReunification,
    category: 'artifact',
    effect: { type: 'clickMultiplier', multiplier: 1.10 },
  },
  galaxiaBlueprint: {
    key: 'galaxiaBlueprint',
    name: 'Galaxia Blueprint',
    description: 'The master plan for unifying all galactic consciousness. Boosts knowledge production.',
    era: Era.GalacticReunification,
    category: 'artifact',
    effect: { type: 'resourceMultiplier', resource: 'knowledge', multiplier: 1.10 },
  },
  graviticConverterSpecs: {
    key: 'graviticConverterSpecs',
    name: 'Gravitic Converter Specs',
    description: 'Advanced gravitic technology schematics that improve nuclear technology output.',
    era: Era.GalacticReunification,
    category: 'artifact',
    effect: { type: 'resourceMultiplier', resource: 'nuclearTech', multiplier: 1.10 },
  },

  // ─── Era 3 Consumables (from Missions) ──────────────────────────────

  galaxiaWave: {
    key: 'galaxiaWave',
    name: 'Galaxia Wave',
    description: 'A pulse of unified consciousness that massively boosts all production.',
    era: Era.GalacticReunification,
    category: 'consumable',
    effect: { type: 'globalProductionBuff', multiplier: 2.0, durationSeconds: 600 },
  },
  graviticSurge: {
    key: 'graviticSurge',
    name: 'Gravitic Surge',
    description: 'Gravitic technology manipulation that enormously amplifies clicking.',
    era: Era.GalacticReunification,
    category: 'consumable',
    effect: { type: 'clickBuff', multiplier: 5.0, durationSeconds: 300 },
  },
  temporalAccelerator: {
    key: 'temporalAccelerator',
    name: 'Temporal Accelerator',
    description: 'A device that accelerates nuclear technology research temporarily.',
    era: Era.GalacticReunification,
    category: 'consumable',
    effect: { type: 'productionBuff', resource: 'nuclearTech', multiplier: 3.0, durationSeconds: 900 },
  },
  planetaryMeld: {
    key: 'planetaryMeld',
    name: 'Planetary Meld',
    description: 'A deep connection with Gaia that boosts raw material extraction.',
    era: Era.GalacticReunification,
    category: 'consumable',
    effect: { type: 'productionBuff', resource: 'rawMaterials', multiplier: 3.0, durationSeconds: 900 },
  },
  unificationDecree: {
    key: 'unificationDecree',
    name: 'Unification Decree',
    description: 'An official decree of galactic unity that boosts influence generation.',
    era: Era.GalacticReunification,
    category: 'consumable',
    effect: { type: 'productionBuff', resource: 'influence', multiplier: 3.0, durationSeconds: 900 },
  },
};

export const ALL_ITEM_KEYS = Object.keys(ITEM_DEFINITIONS);
