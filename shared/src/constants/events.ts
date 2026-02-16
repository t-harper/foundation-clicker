import { Era } from '../types/eras.js';
import { EventDefinition } from '../types/events.js';

/** How often the client polls for events (milliseconds) */
export const EVENT_CHECK_INTERVAL = 10_000;

/** Base probability that an eligible event fires on any given check */
export const EVENT_BASE_CHANCE = 0.15;

export const EVENT_DEFINITIONS: Record<string, EventDefinition> = {
  // ─── Era 0: Religious Dominance ─────────────────────────────────────

  encyclopedistDebate: {
    key: 'encyclopedistDebate',
    name: 'Encyclopedist Debate',
    description:
      'The Board of Encyclopedists demands more resources for the Encyclopedia Galactica. Lord Dorwin of the Empire has arrived to mediate, but his presence only underscores how little the Empire truly cares about Terminus.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'encyclopediaArchive', count: 3 }],
    choices: [
      {
        label: 'Fund the Encyclopedia',
        description: 'Invest heavily in knowledge preservation.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 500 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.5, durationSeconds: 300 },
        ],
      },
      {
        label: 'Redirect to practical research',
        description: 'Shift focus to applied science instead.',
        effects: [
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 200 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Dismiss Dorwin politely',
        description: 'Ignore the Empire and chart your own course.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
          { type: 'clickBuff', multiplier: 1.5, durationSeconds: 180 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 5,
  },

  anacreonThreat: {
    key: 'anacreonThreat',
    name: 'Anacreonese Ultimatum',
    description:
      'The Kingdom of Anacreon demands tribute and threatens military action against Terminus. Without the Empire\'s protection, the Foundation must rely on its technological superiority — or its diplomacy.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'nuclearReactor', count: 3 },
      { type: 'buildingCount', building: 'missionaryChapel', count: 2 },
    ],
    choices: [
      {
        label: 'Demonstrate nuclear power',
        description: 'Show Anacreon the terrible power of atomic energy.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 300 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
          { type: 'globalProductionBuff', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
      {
        label: 'Send missionaries',
        description: 'Spread the religion of science to pacify them.',
        effects: [
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 600 },
          { type: 'resourceLoss', resource: 'credits', amount: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
  },

  nuclearMeltdown: {
    key: 'nuclearMeltdown',
    name: 'Reactor Instability',
    description:
      'Warning klaxons blare across Terminus City as reactor containment fluctuates. The engineering team needs immediate direction — reinforce the containment or attempt a controlled shutdown.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'nuclearReactor', count: 5 }],
    choices: [
      {
        label: 'Emergency reinforcement',
        description: 'Spend resources to stabilize and improve the reactor.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 400 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.4, durationSeconds: 300 },
        ],
      },
      {
        label: 'Controlled shutdown',
        description: 'Safe but production halts temporarily.',
        effects: [
          { type: 'productionDebuff', resource: 'nuclearTech', multiplier: 0.5, durationSeconds: 180 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 4,
  },

  imperialVisitor: {
    key: 'imperialVisitor',
    name: 'Imperial Envoy',
    description:
      'An envoy from Trantor arrives bearing gifts and veiled threats. The crumbling Empire still watches Terminus with wary eyes. How you receive them will shape relations for years to come.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'nuclearReactor', count: 2 },
      { type: 'buildingCount', building: 'researchStation', count: 3 },
    ],
    choices: [
      {
        label: 'Welcome the envoy lavishly',
        description: 'Spend credits to impress, gain Imperial favor.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 800 },
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
        ],
      },
      {
        label: 'Show only what you must',
        description: 'Keep your best technology hidden.',
        effects: [
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 150 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 5,
  },

  holyPilgrimage: {
    key: 'holyPilgrimage',
    name: 'Pilgrims from Smyrno',
    description:
      'A delegation of pilgrims from the Kingdom of Smyrno arrives seeking the "blessings of the Galactic Spirit." They bring trade goods and reverence for Foundation technology.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'holoTemple', count: 3 }],
    choices: [
      {
        label: 'Bless their technology',
        description: 'Perform religious rituals over their devices. They pay generously.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 200 },
        ],
      },
      {
        label: 'Teach them basic science',
        description: 'Subtly undermine the religious veneer with real knowledge.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 400 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 4,
  },

  mineralDiscovery: {
    key: 'mineralDiscovery',
    name: 'Rich Ore Vein',
    description:
      'Surveyors report a massive deposit of rare minerals beneath the Terminus badlands. Extracting it will require significant mining infrastructure investment, but the payoff could be enormous.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'miningOutpost', count: 5 }],
    choices: [
      {
        label: 'Full extraction effort',
        description: 'Invest heavily for a major resource windfall.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 500 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 1000 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.5, durationSeconds: 300 },
        ],
      },
      {
        label: 'Careful survey first',
        description: 'Take it slow, gain knowledge and a modest yield.',
        effects: [
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 400 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 200 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 3,
  },

  seldonVaultMessage: {
    key: 'seldonVaultMessage',
    name: 'The Vault Opens',
    description:
      'The Time Vault on Terminus activates for the first time. A holographic Hari Seldon appears, describing the Foundation\'s true purpose. The revelation sends shockwaves through the colony.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'totalBuildings', count: 25 }],
    choices: [
      {
        label: 'Embrace the Seldon Plan',
        description: 'Rally the colony around psychohistory\'s predictions.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
          { type: 'globalProductionBuff', multiplier: 1.25, durationSeconds: 600 },
        ],
      },
      {
        label: 'Keep the message secret',
        description: 'Only the leadership knows. Use it as leverage.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 600 },
          { type: 'clickBuff', multiplier: 2.0, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 8,
  },

  steelShortage: {
    key: 'steelShortage',
    name: 'Steel Shortage',
    description:
      'A supply chain disruption has caused steel prices to spike across Terminus. The foundries are struggling to meet demand, and construction projects are stalling.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'steelFoundry', count: 3 },
      { type: 'buildingCount', building: 'fabricationShop', count: 3 },
    ],
    choices: [
      {
        label: 'Ration existing supplies',
        description: 'Slow production but conserve resources.',
        effects: [
          { type: 'productionDebuff', resource: 'rawMaterials', multiplier: 0.7, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'credits', amount: 400 },
        ],
      },
      {
        label: 'Emergency mining push',
        description: 'Invest in mining to fix the shortage.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 300 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.5, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  cathedralBlessing: {
    key: 'cathedralBlessing',
    name: 'Techno-Blessing Ceremony',
    description:
      'The Cathedral of Science holds a grand ceremony to bless new technology for the neighboring kingdoms. Dignitaries from four worlds attend, bringing gifts and seeking the Foundation\'s holy touch.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'cathedralOfScience', count: 1 }],
    choices: [
      {
        label: 'Grand ceremony',
        description: 'An elaborate blessing that impresses all visitors.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 1000 },
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Private audiences',
        description: 'Meet each delegation privately. Learn more, earn less.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 400 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 500 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  waterCrisis: {
    key: 'waterCrisis',
    name: 'Water Contamination',
    description:
      'Runoff from the mining outposts has contaminated several water reclamation reservoirs. The population of Terminus City is nervous, and rationing may be necessary.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'waterReclamator', count: 5 },
      { type: 'buildingCount', building: 'miningOutpost', count: 3 },
    ],
    choices: [
      {
        label: 'Build emergency filtration',
        description: 'Spend materials to fix the contamination quickly.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 300 },
          { type: 'resourceGrant', resource: 'influence', amount: 200 },
        ],
      },
      {
        label: 'Restrict mining operations',
        description: 'Slow mining until the contamination clears naturally.',
        effects: [
          { type: 'productionDebuff', resource: 'rawMaterials', multiplier: 0.6, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 200 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 3,
  },

  solarFlare: {
    key: 'solarFlare',
    name: 'Solar Storm',
    description:
      'Terminus\'s sun unleashes a massive coronal mass ejection. The solar arrays are absorbing dangerous levels of energy, but with the right adjustments, this could be turned into an opportunity.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'solarArray', count: 5 }],
    choices: [
      {
        label: 'Overclock the arrays',
        description: 'Risk damage for a massive energy boost.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.8, durationSeconds: 180 },
          { type: 'productionDebuff', resource: 'nuclearTech', multiplier: 0.8, durationSeconds: 180 },
        ],
      },
      {
        label: 'Shield the equipment',
        description: 'Protect infrastructure, lose some production.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 200 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 150 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  researchBreakthrough: {
    key: 'researchBreakthrough',
    name: 'Research Breakthrough',
    description:
      'Scientists at the research stations have made an unexpected discovery in miniaturized nuclear technology. This could revolutionize power generation — or be weaponized for political leverage.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'researchStation', count: 5 }],
    choices: [
      {
        label: 'Publish the findings',
        description: 'Share the knowledge openly for long-term gains.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 500 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
      {
        label: 'Classify and weaponize',
        description: 'Keep it secret and leverage it for influence.',
        effects: [
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 400 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 4,
  },

  atomicForgeOvercharge: {
    key: 'atomicForgeOvercharge',
    name: 'Atomic Forge Resonance',
    description:
      'The atomic forges have entered an unusual harmonic resonance. Engineers report that carefully managing the process could yield extraordinary output, but miscalculation risks a costly overload.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'atomicForge', count: 2 }],
    choices: [
      {
        label: 'Push the resonance',
        description: 'Attempt to harness the extra energy for production.',
        effects: [
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.6, durationSeconds: 300 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Dampen and study',
        description: 'Safely observe the phenomenon for scientific value.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 400 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 200 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  // ─── Era 1: Trading Expansion ───────────────────────────────────────

  mallowTrial: {
    key: 'mallowTrial',
    name: 'The Trial of Hober Mallow',
    description:
      'Master Trader Hober Mallow stands accused of murder on Korell. The trial captivates the Foundation — but Mallow uses it as a platform to argue that trade, not religion, is the Foundation\'s true weapon.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'eraReached', era: Era.TradingExpansion },
      { type: 'buildingCount', building: 'tradingPost', count: 5 },
    ],
    choices: [
      {
        label: 'Support Mallow\'s vision',
        description: 'Embrace trade as the primary strategy.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.5, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
        ],
      },
      {
        label: 'Defend the religious approach',
        description: 'Maintain the old ways — they\'ve worked so far.',
        effects: [
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
    heroReward: 'hoberMallow',
  },

  korellianAmbush: {
    key: 'korellianAmbush',
    name: 'Korellian Pirate Raid',
    description:
      'Korellian pirates have intercepted a Foundation trade convoy near the Whassalian Rift. Your ships are under attack, and the cargo is at risk. Quick action could save the shipment — or you could set a trap.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'eraReached', era: Era.TradingExpansion },
      { type: 'shipCount', count: 2 },
    ],
    choices: [
      {
        label: 'Fight them off',
        description: 'Engage the pirates directly.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 300 },
          { type: 'resourceGrant', resource: 'credits', amount: 800 },
          { type: 'resourceGrant', resource: 'influence', amount: 200 },
        ],
      },
      {
        label: 'Pay the ransom',
        description: 'Lose credits but save the ships.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 500 },
        ],
      },
      {
        label: 'Set an ambush',
        description: 'Lure them into a trap. Risky but rewarding.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 200 },
          { type: 'resourceGrant', resource: 'credits', amount: 1200 },
          { type: 'clickBuff', multiplier: 1.5, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 5,
  },

  tradeGuildDispute: {
    key: 'tradeGuildDispute',
    name: 'Merchant Guild Dispute',
    description:
      'The Merchant Guilds are at odds over trade route allocations. Two powerful factions demand your arbitration, and the outcome will shape commerce on Terminus for months to come.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'merchantGuildHall', count: 2 }],
    choices: [
      {
        label: 'Favor the established guild',
        description: 'Side with tradition for steady gains.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Favor the upstart guild',
        description: 'Back innovation for higher risk, higher reward.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.6, durationSeconds: 300 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  cargoSurplus: {
    key: 'cargoSurplus',
    name: 'Unexpected Cargo Surplus',
    description:
      'A clerical error has resulted in a massive surplus of trade goods arriving at the cargo warehouses. You can sell them immediately at market rates or stockpile them for future leverage.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'cargoWarehouse', count: 5 }],
    choices: [
      {
        label: 'Sell immediately',
        description: 'Quick credits from the surplus.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 1500 },
        ],
      },
      {
        label: 'Stockpile for leverage',
        description: 'Hold the goods for future trading advantage.',
        effects: [
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 600 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.2, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 4,
  },

  bankRun: {
    key: 'bankRun',
    name: 'Foundation Bank Crisis',
    description:
      'Rumors of insolvency have triggered a run on the Foundation Bank. Panicked depositors line up around the block. You must act fast to prevent a full economic collapse.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'foundationBank', count: 3 }],
    choices: [
      {
        label: 'Guarantee all deposits',
        description: 'Spend reserves to restore confidence.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 2000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.5, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
        ],
      },
      {
        label: 'Let weak banks fail',
        description: 'Market correction. Painful but natural.',
        effects: [
          { type: 'productionDebuff', resource: 'credits', multiplier: 0.7, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 4,
  },

  shipyardAccident: {
    key: 'shipyardAccident',
    name: 'Orbital Shipyard Malfunction',
    description:
      'An explosion in the orbital shipyard has damaged several construction bays. Repair crews are standing by, but the cost will be significant. Alternatively, you could salvage the wreckage for materials.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'orbitalShipyard', count: 2 }],
    choices: [
      {
        label: 'Full repairs',
        description: 'Restore the shipyard to full capacity.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 800 },
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 300 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.4, durationSeconds: 300 },
        ],
      },
      {
        label: 'Salvage and rebuild',
        description: 'Recover what you can from the wreckage.',
        effects: [
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 500 },
          { type: 'productionDebuff', resource: 'credits', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 3,
  },

  exchangeFluctuation: {
    key: 'exchangeFluctuation',
    name: 'Commodity Price Swing',
    description:
      'The commodity exchange reports wild price swings in nuclear materials. Speculators are in a frenzy. You could trade aggressively, hedge your position, or wait for stability.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'commodityExchange', count: 3 }],
    choices: [
      {
        label: 'Buy the dip',
        description: 'Spend credits to acquire cheap nuclear tech.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 1000 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 800 },
        ],
      },
      {
        label: 'Sell at the peak',
        description: 'Sell nuclear tech reserves at inflated prices.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 400 },
          { type: 'resourceGrant', resource: 'credits', amount: 1500 },
        ],
      },
      {
        label: 'Wait it out',
        description: 'Do nothing. Markets will stabilize.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 200 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 4,
  },

  navigatorGraduates: {
    key: 'navigatorGraduates',
    name: 'Navigator Graduation Class',
    description:
      'The Navigator\'s Academy has produced an exceptional graduating class. These skilled pilots could bolster your trade fleet or be deployed as diplomatic envoys to distant worlds.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'navigatorsAcademy', count: 2 }],
    choices: [
      {
        label: 'Assign to trade fleet',
        description: 'More efficient trade routes.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Deploy as envoys',
        description: 'Expand diplomatic reach.',
        effects: [
          { type: 'productionBuff', resource: 'influence', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 3,
  },

  tradeEmbassyDeal: {
    key: 'tradeEmbassyDeal',
    name: 'Foreign Trade Delegation',
    description:
      'A delegation from a distant world arrives at the trade embassy proposing a lucrative but exclusive trade deal. Accepting will bring immediate wealth but may alienate other trading partners.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'tradeEmbassy', count: 2 }],
    choices: [
      {
        label: 'Accept the exclusive deal',
        description: 'Massive short-term credits, some reputation cost.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 2000 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
      {
        label: 'Counter with open terms',
        description: 'Negotiate a deal that benefits everyone.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 800 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 4,
  },

  weaponsContractDispute: {
    key: 'weaponsContractDispute',
    name: 'Weapons Contract Dispute',
    description:
      'Two neighboring kingdoms are bidding against each other for Foundation weapons. Selling to both risks war; selling to one earns an ally but an enemy. The weapons factories await your decision.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'weaponsFactory', count: 3 }],
    choices: [
      {
        label: 'Sell to both sides',
        description: 'Maximum profit, maximum risk.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 2500 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.7, durationSeconds: 300 },
        ],
      },
      {
        label: 'Sell to neither',
        description: 'Maintain neutrality and respect.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  galacticBourseIpo: {
    key: 'galacticBourseIpo',
    name: 'Galactic Bourse Opening',
    description:
      'The Galactic Bourse opens for trading, connecting Terminus to financial markets across the periphery. This is a historic moment — how you position the Foundation will matter for decades.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'galacticBourse', count: 1 }],
    choices: [
      {
        label: 'Aggressive market entry',
        description: 'Dominate the exchange with heavy investment.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 3000 },
          { type: 'globalProductionBuff', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Conservative positioning',
        description: 'Enter cautiously with steady returns.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
  },

  freighterLost: {
    key: 'freighterLost',
    name: 'Freighter Lost in Hyperspace',
    description:
      'A Foundation freighter has disappeared during a hyperspace jump. Search teams are assembling, but the vessel may be lost forever. Do you commit resources to the search, or write it off?',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'freighterDocks', count: 2 },
      { type: 'shipCount', count: 3 },
    ],
    choices: [
      {
        label: 'Launch search and rescue',
        description: 'Spend resources for a chance to recover the cargo.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 600 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 800 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 200 },
        ],
      },
      {
        label: 'File insurance claim',
        description: 'Accept the loss and collect insurance.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 400 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  mallowTradingHouseExpansion: {
    key: 'mallowTradingHouseExpansion',
    name: 'Mallow Trading House Expansion',
    description:
      'The Mallow Trading House proposes a major expansion into new markets on the galactic rim. The venture promises enormous returns but requires substantial upfront capital.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'mallowTradingHouse', count: 2 }],
    choices: [
      {
        label: 'Fund the expansion',
        description: 'Major investment for major returns.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 3000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.8, durationSeconds: 600 },
        ],
      },
      {
        label: 'Invest conservatively',
        description: 'Partial funding for moderate growth.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 1000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 4,
  },

  // ─── Era 2: Psychological Influence ─────────────────────────────────

  muleAppears: {
    key: 'muleAppears',
    name: 'The Mule\'s Arrival',
    description:
      'A mysterious warlord known as the Mule has emerged, conquering worlds with an army that fights with unnatural fervor. His mentalic powers threaten to shatter the Seldon Plan entirely.',
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'eraReached', era: Era.PsychologicalInfluence },
      { type: 'totalBuildings', count: 100 },
    ],
    choices: [
      {
        label: 'Fortify defenses',
        description: 'Prepare for the Mule\'s inevitable assault.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 5000 },
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 1000 },
          { type: 'globalProductionBuff', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Seek the Second Foundation',
        description: 'Look for allies in the shadows of psychohistory.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 9,
  },

  mentalicAwakening: {
    key: 'mentalicAwakening',
    name: 'Mentalic Awakening',
    description:
      'Several students at the Mentalics Academy have displayed unprecedented psychic abilities. This breakthrough could revolutionize the Foundation\'s understanding of mental science.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'mentalicsAcademy', count: 3 }],
    choices: [
      {
        label: 'Accelerate their training',
        description: 'Push the students to develop their abilities faster.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 2000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
      {
        label: 'Study them carefully',
        description: 'Take a methodical research approach.',
        effects: [
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.6, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
  },

  emotionalStorm: {
    key: 'emotionalStorm',
    name: 'Emotional Cascade',
    description:
      'The emotional adjustment centers report a cascade of psychic disturbances spreading through the population. People are experiencing sudden mood swings and irrational behavior.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'emotionalAdjustmentCenter', count: 3 }],
    choices: [
      {
        label: 'Mass emotional stabilization',
        description: 'Use the centers to calm the population.',
        effects: [
          { type: 'resourceLoss', resource: 'influence', amount: 500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 300 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Study the phenomenon',
        description: 'Let it run its course while collecting data.',
        effects: [
          { type: 'productionDebuff', resource: 'credits', multiplier: 0.8, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 800 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 4,
  },

  primeRadiantAnomaly: {
    key: 'primeRadiantAnomaly',
    name: 'Prime Radiant Anomaly',
    description:
      'The Prime Radiant displays an anomalous pattern that doesn\'t match any known psychohistorical prediction. Either the Plan has deviated, or the Radiant is revealing a deeper truth.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'primeRadiantVault', count: 1 }],
    choices: [
      {
        label: 'Investigate the anomaly',
        description: 'Dedicate resources to understanding the deviation.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 1500 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
          { type: 'clickBuff', multiplier: 2.0, durationSeconds: 300 },
        ],
      },
      {
        label: 'Recalibrate the Radiant',
        description: 'Reset to known parameters. Stability over discovery.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  propagandaSuccess: {
    key: 'propagandaSuccess',
    name: 'Propaganda Breakthrough',
    description:
      'The propaganda network has crafted a brilliantly effective campaign that has gone viral across the periphery. Foundation influence is surging on dozens of worlds.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'propagandaNetwork', count: 3 }],
    choices: [
      {
        label: 'Double down on the campaign',
        description: 'Invest more for even greater reach.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 1000 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.6, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'influence', amount: 800 },
        ],
      },
      {
        label: 'Monetize the attention',
        description: 'Convert the public interest into trade opportunities.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 1500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 4,
  },

  dreamProbeIntrusion: {
    key: 'dreamProbeIntrusion',
    name: 'Dream Probe Feedback',
    description:
      'The dream probe labs report a feedback loop during a routine scanning session. The probe has accidentally tapped into a deep psychic network, revealing fragments of knowledge from across the galaxy.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'dreamProbeLab', count: 2 }],
    choices: [
      {
        label: 'Explore the network',
        description: 'Push deeper into the psychic feedback.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 1500 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
      {
        label: 'Sever the connection',
        description: 'Safely disconnect. Keep what you\'ve learned.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 500 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 3,
  },

  imperialArchiveDiscovery: {
    key: 'imperialArchiveDiscovery',
    name: 'Imperial Archive Discovery',
    description:
      'Deep within the Imperial Archives, researchers have uncovered classified documents from the old Empire — star charts, military secrets, and forgotten technologies.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'imperialArchive', count: 2 }],
    choices: [
      {
        label: 'Study the documents',
        description: 'Extract maximum knowledge from the archives.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
      {
        label: 'Sell the intelligence',
        description: 'Trade the information for immediate resources.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 3000 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 4,
  },

  shieldTestSuccess: {
    key: 'shieldTestSuccess',
    name: 'Shield Test Successful',
    description:
      'The shield generators have passed a critical stress test, deflecting a simulated bombardment at 150% of rated capacity. The breakthrough could be applied to both defense and energy harvesting.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'shieldGenerator', count: 2 }],
    choices: [
      {
        label: 'Apply to defense',
        description: 'Strengthen planetary shields for security.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 800 },
          { type: 'globalProductionBuff', multiplier: 1.15, durationSeconds: 600 },
        ],
      },
      {
        label: 'Apply to energy harvesting',
        description: 'Convert the technology to boost production.',
        effects: [
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.5, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 500 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 3,
  },

  conversionControversy: {
    key: 'conversionControversy',
    name: 'Conversion Controversy',
    description:
      'Ethical debates rage about the conversion chambers. Some argue they violate free will; others insist they\'re necessary for the Foundation\'s survival. Public opinion is divided.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'conversionChamber', count: 2 }],
    choices: [
      {
        label: 'Defend the program',
        description: 'Double down on conversion as essential policy.',
        effects: [
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 300 },
          { type: 'productionDebuff', resource: 'knowledge', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
      {
        label: 'Reform the program',
        description: 'Add oversight and transparency.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 500 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  speakersSanctumInsight: {
    key: 'speakersSanctumInsight',
    name: 'Speaker\'s Revelation',
    description:
      'The First Speaker emerges from deep meditation in the Speaker\'s Sanctum with a crucial insight about the future path of psychohistory. The revelation could reshape Foundation strategy.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'speakersSanctum', count: 1 }],
    choices: [
      {
        label: 'Share the revelation publicly',
        description: 'Inspire the population with the Speaker\'s vision.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 1000 },
          { type: 'globalProductionBuff', multiplier: 1.2, durationSeconds: 600 },
        ],
      },
      {
        label: 'Keep it within the inner circle',
        description: 'Preserve the mystery of the Second Foundation.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 1500 },
          { type: 'clickBuff', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  mindShieldAlert: {
    key: 'mindShieldAlert',
    name: 'Psychic Intrusion Detected',
    description:
      'The mind shield arrays have detected and deflected an attempted psychic intrusion from an unknown source. Analysis of the attack pattern could yield valuable intelligence.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'mindShieldArray', count: 2 }],
    choices: [
      {
        label: 'Trace the source',
        description: 'Attempt to locate the attacker.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 500 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 1000 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
        ],
      },
      {
        label: 'Strengthen defenses',
        description: 'Reinforce the shields against future attacks.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 500 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 4,
  },

  secondFoundationRevealed: {
    key: 'secondFoundationRevealed',
    name: 'The Second Foundation Revealed',
    description:
      'The existence of the Second Foundation at Star\'s End is revealed to the galaxy. This changes everything — the hidden guardians of the Seldon Plan must now operate in the open.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'secondFoundationRetreat', count: 1 }],
    choices: [
      {
        label: 'Merge the two Foundations',
        description: 'Unite under a single banner for maximum strength.',
        effects: [
          { type: 'globalProductionBuff', multiplier: 1.5, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
        ],
      },
      {
        label: 'Maintain separate operations',
        description: 'Keep the Second Foundation independent for flexibility.',
        effects: [
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.5, durationSeconds: 600 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
      {
        label: 'Fake its destruction',
        description: 'Pretend it was destroyed. Return to the shadows.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 2000 },
          { type: 'clickBuff', multiplier: 2.0, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 8,
  },

  // ─── Era 3: Galactic Reunification ──────────────────────────────────

  gaiaContact: {
    key: 'gaiaContact',
    name: 'First Contact with Gaia',
    description:
      'The living world of Gaia reaches out through the consciousness network. Every organism on the planet shares a single mind, and it offers to share its ancient wisdom — if the Foundation is willing to listen.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'eraReached', era: Era.GalacticReunification },
      { type: 'buildingCount', building: 'gaianBiosphere', count: 2 },
    ],
    choices: [
      {
        label: 'Embrace Gaia\'s wisdom',
        description: 'Open the Foundation to Gaian philosophy.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 5000 },
          { type: 'globalProductionBuff', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Maintain independence',
        description: 'Accept the knowledge but keep the Foundation autonomous.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
          { type: 'resourceGrant', resource: 'influence', amount: 2000 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 8,
  },

  graviticBreakthrough: {
    key: 'graviticBreakthrough',
    name: 'Gravitic Field Breakthrough',
    description:
      'The gravitic plants have achieved a stable anti-gravity field for the first time. This technology could revolutionize transportation, construction, and warfare across the galaxy.',
    era: Era.GalacticReunification,
    conditions: [{ type: 'buildingCount', building: 'graviticPlant', count: 3 }],
    choices: [
      {
        label: 'Commercialize immediately',
        description: 'Rush the technology to market.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 5000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
      {
        label: 'Continue research',
        description: 'Perfect the technology before deployment.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  consciousnessExpansion: {
    key: 'consciousnessExpansion',
    name: 'Consciousness Expansion Event',
    description:
      'The consciousness amplifiers have triggered a spontaneous expansion of awareness across Terminus. Citizens report heightened perception, enhanced creativity, and a profound sense of unity.',
    era: Era.GalacticReunification,
    conditions: [{ type: 'buildingCount', building: 'consciousnessAmplifier', count: 2 }],
    choices: [
      {
        label: 'Amplify the effect',
        description: 'Push the amplifiers to extend the phenomenon.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 1000 },
          { type: 'globalProductionBuff', multiplier: 1.4, durationSeconds: 300 },
          { type: 'clickBuff', multiplier: 2.0, durationSeconds: 300 },
        ],
      },
      {
        label: 'Study the effect',
        description: 'Document everything for scientific advancement.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  terraformingMilestone: {
    key: 'terraformingMilestone',
    name: 'Terraforming Milestone',
    description:
      'The terraforming engines have successfully converted a barren continent into habitable land. New settlements are springing up, and the population boom brings both opportunity and growing pains.',
    era: Era.GalacticReunification,
    conditions: [{ type: 'buildingCount', building: 'terraformingEngine', count: 2 }],
    choices: [
      {
        label: 'Rapid colonization',
        description: 'Fill the new land with settlers and infrastructure.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 3000 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.5, durationSeconds: 600 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Planned development',
        description: 'Careful, sustainable growth.',
        effects: [
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 2000 },
          { type: 'resourceGrant', resource: 'influence', amount: 1000 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 4,
  },

  galaxiaSignalPulse: {
    key: 'galaxiaSignalPulse',
    name: 'Galaxia Signal Pulse',
    description:
      'The Galaxia Beacon has emitted a powerful pulse that was detected across the galaxy. Thousands of worlds have received the Foundation\'s call, and responses are flooding in.',
    era: Era.GalacticReunification,
    conditions: [{ type: 'buildingCount', building: 'galaxiaBeacon', count: 1 }],
    choices: [
      {
        label: 'Welcome all respondents',
        description: 'Open communications with every world that answered.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 3000 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
      {
        label: 'Selective engagement',
        description: 'Only engage with the most promising contacts.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 3000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 5,
  },

  stellarHarvesterOverload: {
    key: 'stellarHarvesterOverload',
    name: 'Stellar Harvester Overload',
    description:
      'The stellar harvesters are absorbing energy at unprecedented rates from a solar maximum event. The containment systems are straining, but the excess energy could power a massive production surge.',
    era: Era.GalacticReunification,
    conditions: [{ type: 'buildingCount', building: 'stellarHarvester', count: 2 }],
    choices: [
      {
        label: 'Channel the excess energy',
        description: 'Route the surplus into production systems.',
        effects: [
          { type: 'globalProductionBuff', multiplier: 1.5, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 2000 },
        ],
      },
      {
        label: 'Safely vent the energy',
        description: 'Avoid risk. Gain a modest benefit.',
        effects: [
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 800 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 800 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 4,
  },

  robotArchivesAwakening: {
    key: 'robotArchivesAwakening',
    name: 'R. Daneel\'s Legacy',
    description:
      'Deep within the Robot Archives, you discover recordings left by R. Daneel Olivaw — the ancient robot who guided humanity for twenty thousand years. His final message speaks of Galaxia and the Zeroth Law.',
    era: Era.GalacticReunification,
    conditions: [{ type: 'buildingCount', building: 'robotArchives', count: 2 }],
    choices: [
      {
        label: 'Follow Daneel\'s guidance',
        description: 'Implement his vision for humanity\'s future.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 5000 },
          { type: 'globalProductionBuff', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Chart your own path',
        description: 'Respect the legacy but forge ahead independently.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 3000 },
          { type: 'clickBuff', multiplier: 2.0, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
  },

  wormholeInstability: {
    key: 'wormholeInstability',
    name: 'Wormhole Instability',
    description:
      'The Wormhole Nexus is experiencing destabilizing fluctuations. If the wormhole collapses, it could sever a vital trade route. But a controlled overcharge might open a shortcut to a resource-rich region.',
    era: Era.GalacticReunification,
    conditions: [{ type: 'buildingCount', building: 'wormholeNexus', count: 1 }],
    choices: [
      {
        label: 'Stabilize the wormhole',
        description: 'Spend resources to keep the existing route open.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 1500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
      {
        label: 'Controlled overcharge',
        description: 'Risk it for a chance at a new shortcut.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 500 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 5000 },
          { type: 'resourceGrant', resource: 'credits', amount: 3000 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 5,
  },

  galacticSenateVote: {
    key: 'galacticSenateVote',
    name: 'Senate Appropriations Vote',
    description:
      'The reconstituted Galactic Senate is voting on a major appropriations bill. Three factions vie for control: the militarists want defense spending, the scientists want research, and the merchants want trade incentives.',
    era: Era.GalacticReunification,
    conditions: [{ type: 'buildingCount', building: 'galacticSenate', count: 1 }],
    choices: [
      {
        label: 'Back the militarists',
        description: 'Invest in galactic defense.',
        effects: [
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 3000 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
      {
        label: 'Back the scientists',
        description: 'Fund the great research initiative.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
      {
        label: 'Back the merchants',
        description: 'Stimulate galactic trade.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 5000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  singularityRisk: {
    key: 'singularityRisk',
    name: 'Singularity Containment Breach',
    description:
      'The Singularity Forge\'s containment field is fluctuating dangerously. A breach could destroy the forge — or, if managed correctly, the energy release could be harvested for incredible output.',
    era: Era.GalacticReunification,
    conditions: [{ type: 'buildingCount', building: 'singularityForge', count: 1 }],
    choices: [
      {
        label: 'Harvest the energy',
        description: 'Ride the edge of disaster for massive gains.',
        effects: [
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 5000 },
          { type: 'globalProductionBuff', multiplier: 1.5, durationSeconds: 300 },
        ],
      },
      {
        label: 'Emergency containment',
        description: 'Play it safe. Reinforce and repair.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 2000 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  galaxiaCorePulse: {
    key: 'galaxiaCorePulse',
    name: 'Galaxia Core Activation',
    description:
      'The Galaxia Core emits a deep resonance that echoes through every connected consciousness in the galaxy. For a brief moment, trillions of minds are united in a single thought of peace and purpose.',
    era: Era.GalacticReunification,
    conditions: [{ type: 'buildingCount', building: 'galaxiaCore', count: 1 }],
    choices: [
      {
        label: 'Sustain the connection',
        description: 'Pour energy into maintaining the galactic link.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 3000 },
          { type: 'globalProductionBuff', multiplier: 1.5, durationSeconds: 600 },
          { type: 'clickBuff', multiplier: 3.0, durationSeconds: 300 },
        ],
      },
      {
        label: 'Let it fade naturally',
        description: 'Allow the moment to pass, preserving the memory.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 5000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 6,
  },

  eternityVision: {
    key: 'eternityVision',
    name: 'The Eternity Vision',
    description:
      'The Eternity Engine activates fully for the first time, and you glimpse the far future — a galaxy united not by force or trade or manipulation, but by choice. The Foundation\'s journey is complete. Hari Seldon smiles.',
    era: Era.GalacticReunification,
    conditions: [{ type: 'buildingCount', building: 'eternityEngine', count: 1 }],
    choices: [
      {
        label: 'Embrace eternity',
        description: 'The culmination of the Seldon Plan.',
        effects: [
          { type: 'globalProductionBuff', multiplier: 2.0, durationSeconds: 600 },
          { type: 'clickBuff', multiplier: 3.0, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'credits', amount: 10000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 10000 },
          { type: 'resourceGrant', resource: 'influence', amount: 10000 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 10,
  },

  // ─── Era 0: Religious Dominance (continued) ─────────────────────────

  famineThreat: {
    key: 'famineThreat',
    name: 'Crop Blight on Terminus',
    description:
      'A fungal blight has swept through the hydroponic farms. Crop yields are plummeting and the population grows restless. Engineers propose a chemical solution, but it would contaminate the water supply for days.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'hydroponicsFarm', count: 5 }],
    choices: [
      {
        label: 'Chemical treatment',
        description: 'Save the economy by saving food.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 300 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.4, durationSeconds: 300 },
        ],
      },
      {
        label: 'Let the blight burn out',
        description: 'Study the organism while crops recover naturally.',
        effects: [
          { type: 'productionDebuff', resource: 'credits', multiplier: 0.6, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 3,
  },

  shelterOvercrowding: {
    key: 'shelterOvercrowding',
    name: 'Population Surge',
    description:
      'A wave of settlers from the abandoned outer provinces has arrived on Terminus. The survival shelters are at capacity. You can expand rapidly or turn newcomers away.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'survivalShelter', count: 5 }],
    choices: [
      {
        label: 'Open the gates',
        description: 'Accept the settlers and put them to work.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 300 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'influence', amount: 150 },
        ],
      },
      {
        label: 'Restrict immigration',
        description: 'Turn them away to preserve stability.',
        effects: [
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 200 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.7, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 3,
  },

  trantorExile: {
    key: 'trantorExile',
    name: 'Exile from Trantor',
    description:
      'A brilliant scientist, exiled from the crumbling Imperial court on Trantor, arrives on Terminus seeking asylum. She carries classified research that could advance the Foundation\'s technology by decades — if she can be trusted.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'totalBuildings', count: 15 },
      { type: 'buildingCount', building: 'researchStation', count: 3 },
    ],
    choices: [
      {
        label: 'Welcome her fully',
        description: 'Grant full asylum and access to research facilities.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 600 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
      {
        label: 'Accept with restrictions',
        description: 'Limited access, but still gain from her expertise.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 200 },
          { type: 'resourceGrant', resource: 'influence', amount: 100 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
  },

  lunarEclipse: {
    key: 'lunarEclipse',
    name: 'Eclipse over Terminus',
    description:
      'A rare alignment of Terminus\'s moons causes a total eclipse. The superstitious outer kingdoms interpret it as a sign from the Galactic Spirit. Missionaries report the people are either terrified or exalted.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'missionaryChapel', count: 3 }],
    choices: [
      {
        label: 'Declare it a holy sign',
        description: 'Leverage the superstition for influence.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Broadcast a scientific explanation',
        description: 'Educate the masses and advance understanding.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  forgottenCache: {
    key: 'forgottenCache',
    name: 'Imperial Supply Cache',
    description:
      'Miners have broken through into a sealed chamber deep underground — an Imperial emergency supply depot, forgotten for centuries. The crates are sealed with military encryption, but the contents could be incredibly valuable.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'miningOutpost', count: 7 }],
    choices: [
      {
        label: 'Crack the encryption',
        description: 'Spend nuclear tech to break the seals and claim the cache.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 150 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 800 },
          { type: 'resourceGrant', resource: 'credits', amount: 500 },
        ],
      },
      {
        label: 'Catalog and study the depot',
        description: 'A slower approach with knowledge gains.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 500 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  salvorHardinSpeech: {
    key: 'salvorHardinSpeech',
    name: 'Hardin\'s Address to the Council',
    description:
      'Mayor Salvor Hardin delivers a legendary address to the Foundation Council: "Violence is the last refuge of the incompetent." His words galvanize the colony and mark a turning point in Foundation governance.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'totalBuildings', count: 20 },
      { type: 'buildingCount', building: 'missionaryChapel', count: 3 },
    ],
    choices: [
      {
        label: 'Rally behind Hardin',
        description: 'Unite under his leadership.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
          { type: 'globalProductionBuff', multiplier: 1.25, durationSeconds: 600 },
        ],
      },
      {
        label: 'Demand a vote of no confidence',
        description: 'Challenge Hardin\'s authority for political gain.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 400 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 8,
    heroReward: 'salvorHardin',
  },

  tradeMissionReturn: {
    key: 'tradeMissionReturn',
    name: 'Returning Missionaries',
    description:
      'Foundation missionaries return from the Four Kingdoms bearing tribute. They report that the "religion of science" has taken deep root — the barbarian kings now view the Foundation with genuine reverence.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'missionaryChapel', count: 5 },
      { type: 'buildingCount', building: 'holoTemple', count: 2 },
    ],
    choices: [
      {
        label: 'Accept the tribute',
        description: 'Take the wealth they offer.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 700 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 300 },
        ],
      },
      {
        label: 'Reinvest in the missions',
        description: 'Spend credits to deepen the religious hold.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 200 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 4,
  },

  reactorSabotagePlot: {
    key: 'reactorSabotagePlot',
    name: 'Sabotage Attempt',
    description:
      'Security forces have uncovered a sabotage plot against the nuclear reactors. The conspirators are agents of Anacreon, seeking to cripple the Foundation\'s power base. You must decide how to respond.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'nuclearReactor', count: 5 }],
    choices: [
      {
        label: 'Public trial and execution',
        description: 'Make an example of the conspirators.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
          { type: 'productionDebuff', resource: 'nuclearTech', multiplier: 0.8, durationSeconds: 180 },
        ],
      },
      {
        label: 'Quiet interrogation',
        description: 'Extract information before disposing of them.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 200 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  foundationDay: {
    key: 'foundationDay',
    name: 'Foundation Day Celebration',
    description:
      'The annual anniversary of the Foundation\'s establishment on Terminus. Citizens gather in the streets, the Encyclopedia Hall is illuminated, and even the most cynical scientists allow themselves a moment of pride.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'totalBuildings', count: 10 }],
    choices: [
      {
        label: 'Grand public festival',
        description: 'Spend credits for a colony-wide celebration.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 200 },
          { type: 'globalProductionBuff', multiplier: 1.15, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 200 },
        ],
      },
      {
        label: 'Working holiday',
        description: 'A quieter celebration that keeps production moving.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.2, durationSeconds: 300 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 4,
  },

  refugeeWave: {
    key: 'refugeeWave',
    name: 'Refugees from the Periphery',
    description:
      'Desperate refugees fleeing the collapse of provincial governance in the galactic periphery have reached Terminus. They bring nothing but their labor and their stories of the Empire\'s decay.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'survivalShelter', count: 3 },
      { type: 'buildingCount', building: 'waterReclamator', count: 3 },
    ],
    choices: [
      {
        label: 'Resettle them as workers',
        description: 'Accept refugees and put them to work.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 200 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.3, durationSeconds: 300 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
      {
        label: 'Turn them away',
        description: 'Preserve resources but lose face.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 100 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 3,
  },

  wienisScheming: {
    key: 'wienisScheming',
    name: 'The Plot of Prince Wienis',
    description:
      'Intelligence reports reveal that Prince Wienis of Anacreon is secretly assembling a battle fleet with Foundation-supplied nuclear technology. He plans to seize Terminus itself. The crisis Seldon predicted is at hand.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'nuclearReactor', count: 7 },
      { type: 'buildingCount', building: 'missionaryChapel', count: 5 },
    ],
    choices: [
      {
        label: 'Trigger the remote kill-switches',
        description: 'Shut down Anacreon\'s stolen technology.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 400 },
          { type: 'resourceGrant', resource: 'influence', amount: 600 },
          { type: 'globalProductionBuff', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
      {
        label: 'Negotiate from strength',
        description: 'Use diplomacy backed by superior technology.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 500 },
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 8,
  },

  encyclopediaGalacticaVol1: {
    key: 'encyclopediaGalacticaVol1',
    name: 'First Volume Published',
    description:
      'The first volume of the Encyclopedia Galactica is finally complete — a monumental achievement of knowledge preservation. Scholars across the periphery clamor for copies, and the Foundation\'s academic reputation soars.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'encyclopediaArchive', count: 5 }],
    choices: [
      {
        label: 'Distribute freely',
        description: 'Share knowledge and gain influence.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Sell at premium',
        description: 'Monetize the Foundation\'s greatest work.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 800 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
  },

  nuclearBlackout: {
    key: 'nuclearBlackout',
    name: 'Grid Blackout',
    description:
      'A cascading failure in the power grid has plunged half of Terminus City into darkness. The solar arrays are intact but overloaded. Restoring power quickly will be expensive, but the alternative is civil unrest.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'solarArray', count: 5 },
      { type: 'buildingCount', building: 'nuclearReactor', count: 3 },
    ],
    choices: [
      {
        label: 'Emergency power reroute',
        description: 'Spend materials for a quick fix.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 250 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Scheduled rolling blackouts',
        description: 'Manage the shortage methodically.',
        effects: [
          { type: 'productionDebuff', resource: 'credits', multiplier: 0.7, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 200 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  // ─── Era 1: Trading Expansion (continued) ─────────────────────────

  smugglerCaught: {
    key: 'smugglerCaught',
    name: 'Smuggler Intercepted',
    description:
      'Port authorities have seized a freighter loaded with contraband nuclear devices — Foundation technology being sold on the black market. The captain claims he\'s working for a powerful merchant prince.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'freighterDocks', count: 3 }],
    choices: [
      {
        label: 'Confiscate and prosecute',
        description: 'Seize the goods and make an example.',
        effects: [
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 400 },
          { type: 'resourceGrant', resource: 'influence', amount: 200 },
        ],
      },
      {
        label: 'Recruit the smuggler',
        description: 'Turn the criminal into an asset.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 600 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 3,
  },

  luxuryGoodsDemand: {
    key: 'luxuryGoodsDemand',
    name: 'Luxury Goods Boom',
    description:
      'The outer kingdoms are experiencing a fad for Foundation-manufactured luxury goods. The manufacturing plants can barely keep up with demand. Orders are pouring in from a dozen worlds.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'manufacturingPlant', count: 5 }],
    choices: [
      {
        label: 'Maximize output',
        description: 'Burn materials to fill every order.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 400 },
          { type: 'resourceGrant', resource: 'credits', amount: 1500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Create artificial scarcity',
        description: 'Limit supply to drive up prices and prestige.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 800 },
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 4,
  },

  tradeRouteDiscovery: {
    key: 'tradeRouteDiscovery',
    name: 'New Hyperspace Lane',
    description:
      'Navigator scouts report a previously uncharted hyperspace lane that cuts transit time to the Sirius Sector by 40%. Establishing a presence there first would give the Foundation a massive trade advantage.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'navigatorsAcademy', count: 3 },
      { type: 'shipCount', count: 2 },
    ],
    choices: [
      {
        label: 'Rush to establish trade',
        description: 'Invest heavily to dominate the new route.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 1000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
      {
        label: 'Survey and map carefully',
        description: 'A cautious approach with knowledge gains.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 500 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 5,
  },

  oreRefineryBoom: {
    key: 'oreRefineryBoom',
    name: 'Refinery Output Surge',
    description:
      'An optimized catalytic process at the refinery complex has doubled throughput. The refiners want permission to run at full capacity, but the environmental board warns of atmospheric contamination.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'refineryComplex', count: 3 }],
    choices: [
      {
        label: 'Full capacity',
        description: 'Maximum output at the cost of public opinion.',
        effects: [
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.5, durationSeconds: 300 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
      {
        label: 'Regulated output',
        description: 'Moderate gains with environmental safeguards.',
        effects: [
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.2, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  tradeSanctions: {
    key: 'tradeSanctions',
    name: 'Trade Embargo Threatened',
    description:
      'A coalition of peripheral kingdoms threatens to embargo Foundation goods unless trade terms are renegotiated. The merchant guilds urge concessions; the military advisors urge a show of force.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'tradeEmbassy', count: 3 }],
    choices: [
      {
        label: 'Negotiate new terms',
        description: 'Concede some ground for long-term stability.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 800 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Impose counter-sanctions',
        description: 'Hit them back harder.',
        effects: [
          { type: 'productionDebuff', resource: 'credits', multiplier: 0.7, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 400 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 5,
  },

  merchantPrinceRivalry: {
    key: 'merchantPrinceRivalry',
    name: 'Dueling Merchant Princes',
    description:
      'Two powerful merchant princes are locked in a bidding war over exclusive Foundation contracts. Their rivalry is driving up prices across the board, which benefits the Foundation — for now.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'merchantGuildHall', count: 3 },
      { type: 'buildingCount', building: 'foundationBank', count: 2 },
    ],
    choices: [
      {
        label: 'Play them against each other',
        description: 'Maximize profit from their rivalry.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 1200 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
      {
        label: 'Broker a truce',
        description: 'End the rivalry for lasting cooperation.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.2, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  suttPolitics: {
    key: 'suttPolitics',
    name: 'Sutt\'s Power Play',
    description:
      'Jorane Sutt, the Foundation\'s Secretary, launches a political campaign against the Traders, accusing them of disloyalty and excess. The old guard of Encyclopedists rallies behind him. The Foundation\'s future direction hangs in the balance.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'eraReached', era: Era.TradingExpansion },
      { type: 'totalBuildings', count: 50 },
    ],
    choices: [
      {
        label: 'Back the Traders',
        description: 'Support commerce as the Foundation\'s strength.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.5, durationSeconds: 600 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.8, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'credits', amount: 1000 },
        ],
      },
      {
        label: 'Back Sutt\'s faction',
        description: 'Support the conservative establishment.',
        effects: [
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 600 },
          { type: 'productionDebuff', resource: 'credits', multiplier: 0.8, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
        ],
      },
      {
        label: 'Force a compromise',
        description: 'Unite the factions through negotiation.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 500 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
          { type: 'resourceGrant', resource: 'credits', amount: 500 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
  },

  limmarPonsetsExpedition: {
    key: 'limmarPonsetsExpedition',
    name: 'Ponsets\' Expedition Returns',
    description:
      'Trader Limmar Ponsets returns from a daring expedition to Askone, a world that had banned all Foundation technology. Through cunning and persistence, he cracked their market open — proving that trade conquers where religion cannot.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'eraReached', era: Era.TradingExpansion },
      { type: 'buildingCount', building: 'tradingPost', count: 5 },
      { type: 'shipCount', count: 3 },
    ],
    choices: [
      {
        label: 'Celebrate and expand',
        description: 'Use his success to open new markets.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 2000 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Study his methods',
        description: 'Learn from his approach for future expeditions.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 800 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
    heroReward: 'limmarPonyets',
  },

  korellianWarEnd: {
    key: 'korellianWarEnd',
    name: 'The Korellian War Ends',
    description:
      'Korell\'s war against the Foundation collapses — not through military defeat, but economic collapse. Cut off from Foundation technology, their industry withered. Mallow\'s doctrine of trade-as-weapon is vindicated.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'eraReached', era: Era.TradingExpansion },
      { type: 'buildingCount', building: 'weaponsFactory', count: 3 },
      { type: 'buildingCount', building: 'tradingPost', count: 7 },
    ],
    choices: [
      {
        label: 'Generous peace terms',
        description: 'Win loyalty through magnanimity.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 800 },
          { type: 'globalProductionBuff', multiplier: 1.2, durationSeconds: 600 },
        ],
      },
      {
        label: 'Demand reparations',
        description: 'Extract wealth from the defeated enemy.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 3000 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 8,
  },

  currencyReform: {
    key: 'currencyReform',
    name: 'Currency Reform Debate',
    description:
      'The Foundation Bank proposes replacing the hodgepodge of peripheral currencies with a single Foundation Credit standard. The exchanges are divided — standardization brings efficiency but threatens existing profit margins.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'foundationBank', count: 3 },
      { type: 'buildingCount', building: 'commodityExchange', count: 2 },
    ],
    choices: [
      {
        label: 'Adopt the standard',
        description: 'Pay the transition cost for long-term efficiency.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 1000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
      {
        label: 'Keep the mixed system',
        description: 'Preserve the current profitable arbitrage.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 500 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  pirateFleetSighting: {
    key: 'pirateFleetSighting',
    name: 'Pirate Fleet on Scanners',
    description:
      'Long-range scanners have detected a pirate fleet massing near the Whassalian Rift. They\'ve been raiding trade convoys for months, and now they\'re bold enough to threaten the shipping lanes directly.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'shipCount', count: 3 }],
    choices: [
      {
        label: 'Send a battle group',
        description: 'Invest nuclear tech to crush the pirates.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 300 },
          { type: 'resourceGrant', resource: 'credits', amount: 1000 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
        ],
      },
      {
        label: 'Reroute convoys',
        description: 'Avoid the threat at the cost of efficiency.',
        effects: [
          { type: 'productionDebuff', resource: 'credits', multiplier: 0.8, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 400 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 3,
  },

  technologicalDiffusion: {
    key: 'technologicalDiffusion',
    name: 'Technology Spreading Uncontrolled',
    description:
      'Reports indicate that several peripheral worlds have begun reverse-engineering Foundation weapons. The technological edge that underpins Foundation commerce is slowly eroding.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'weaponsFactory', count: 5 }],
    choices: [
      {
        label: 'Release next-gen technology',
        description: 'Stay ahead by advancing faster.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
      {
        label: 'Enforce technology controls',
        description: 'Crack down on reverse-engineering.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 5,
  },

  factoryAutomation: {
    key: 'factoryAutomation',
    name: 'Automation Breakthrough',
    description:
      'Engineers at the manufacturing plants have developed a fully automated assembly line using repurposed Imperial robotics. Output could triple, but thousands of workers would lose their jobs.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'manufacturingPlant', count: 5 },
      { type: 'buildingCount', building: 'refineryComplex', count: 2 },
    ],
    choices: [
      {
        label: 'Full automation',
        description: 'Maximum output at the cost of public opinion.',
        effects: [
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.6, durationSeconds: 300 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.7, durationSeconds: 300 },
        ],
      },
      {
        label: 'Gradual transition with retraining',
        description: 'Slower rollout that keeps workers employed.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 500 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.3, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 4,
  },

  // ─── Era 2: Psychological Influence (continued) ───────────────────

  baytaDarell: {
    key: 'baytaDarell',
    name: 'Bayta\'s Defiance',
    description:
      'Bayta Darell stands before the Mule and kills the one man who could have led him to the Second Foundation — not through mentalic compulsion, but through her own free will. It is the one act the Mule\'s powers could not foresee or prevent.',
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'eraReached', era: Era.PsychologicalInfluence },
      { type: 'totalBuildings', count: 120 },
    ],
    choices: [
      {
        label: 'Honor her sacrifice',
        description: 'Celebrate the triumph of free will.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 2000 },
          { type: 'globalProductionBuff', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Study the implications',
        description: 'Analyze how free will defeated mentalic power.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
          { type: 'clickBuff', multiplier: 2.0, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 9,
    heroReward: 'baytaDarell',
  },

  psychohistoricCrisis: {
    key: 'psychohistoricCrisis',
    name: 'Psychohistoric Divergence',
    description:
      'The psychohistory labs report a significant divergence between the Seldon Plan\'s predictions and observed reality. The margin of error is growing. Either the math is wrong, or an unknown variable has entered the equation.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'psychohistoryLab', count: 3 }],
    choices: [
      {
        label: 'Recalculate from scratch',
        description: 'Spend resources to rebuild the models.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 1500 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.4, durationSeconds: 300 },
        ],
      },
      {
        label: 'Trust the Plan',
        description: 'Assume the divergence will self-correct.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 5,
  },

  auraOverproduction: {
    key: 'auraOverproduction',
    name: 'Aura Resonance Cascade',
    description:
      'The aura manufactories have entered an unexpected resonance state, overproducing psychic amplification auras. The excess could be channeled to boost morale — or weaponized for a concentrated influence campaign.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'auraManufactory', count: 3 }],
    choices: [
      {
        label: 'Boost public morale',
        description: 'Spread the surplus across the population.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 300 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Concentrated influence campaign',
        description: 'Focus the auras for maximum political effect.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 500 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.6, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'influence', amount: 800 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  whisperShipIncident: {
    key: 'whisperShipIncident',
    name: 'Whisper Ship Incident',
    description:
      'A whisper ship on a covert reconnaissance mission has been detected by an unknown party. The pilot reports a standoff — the other vessel appears to be Second Foundation. A tense negotiation ensues via mentalic communication.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'whisperShipHangar', count: 2 }],
    choices: [
      {
        label: 'Open communication',
        description: 'Attempt dialogue with the other vessel.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 1000 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
        ],
      },
      {
        label: 'Withdraw silently',
        description: 'Retreat and analyze what you\'ve learned.',
        effects: [
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.3, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 500 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  muleLingersOn: {
    key: 'muleLingersOn',
    name: 'The Mule\'s Shadow',
    description:
      'Even after his defeat, the Mule\'s emotional conversions linger. Agents across the periphery report pockets of fanatical loyalty to the dead warlord. The "Converted" are organizing, and their movement is spreading.',
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'buildingCount', building: 'mentalicsAcademy', count: 3 },
      { type: 'buildingCount', building: 'emotionalAdjustmentCenter', count: 3 },
    ],
    choices: [
      {
        label: 'Mass de-conversion',
        description: 'Undo the Mule\'s emotional tampering.',
        effects: [
          { type: 'resourceLoss', resource: 'influence', amount: 800 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 500 },
        ],
      },
      {
        label: 'Redirect their loyalty',
        description: 'Convert the Mule\'s followers to Foundation loyalists.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 1000 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 5,
  },

  arkadyDarellsEscape: {
    key: 'arkadyDarellsEscape',
    name: 'Arkady\'s Gambit',
    description:
      'Young Arkady Darell has fled Trantor with proof that the Second Foundation still exists — hidden not at Star\'s End, but on Terminus itself. The revelation could tear the Foundation apart or unite it at last.',
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'buildingCount', building: 'speakersSanctum', count: 1 },
      { type: 'buildingCount', building: 'psychohistoryLab', count: 2 },
    ],
    choices: [
      {
        label: 'Reveal the truth',
        description: 'Share Arkady\'s evidence with the galaxy.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
          { type: 'resourceGrant', resource: 'influence', amount: 1000 },
          { type: 'productionDebuff', resource: 'credits', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
      {
        label: 'Suppress the information',
        description: 'Bury the truth to maintain stability.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 2000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Use it as leverage',
        description: 'Wield the secret as a political tool.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 1500 },
          { type: 'clickBuff', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 8,
  },

  mentalicDuel: {
    key: 'mentalicDuel',
    name: 'Mentalic Duel',
    description:
      'Two powerful mentalics have engaged in a psychic duel over a doctrinal dispute. The feedback is disrupting emotional adjustment centers across the city. Left unchecked, it could cause a psychic shockwave.',
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'buildingCount', building: 'mentalicsAcademy', count: 5 },
      { type: 'buildingCount', building: 'speakersSanctum', count: 1 },
    ],
    choices: [
      {
        label: 'Intervene and mediate',
        description: 'Risk influence to broker peace and gain knowledge.',
        effects: [
          { type: 'resourceLoss', resource: 'influence', amount: 500 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 1000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Let the stronger win',
        description: 'Allow natural selection among mentalics.',
        effects: [
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 300 },
          { type: 'productionDebuff', resource: 'knowledge', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  historicalRevision: {
    key: 'historicalRevision',
    name: 'Archives Contradict Official History',
    description:
      'Researchers in the Imperial Archive have uncovered documents proving that official Foundation history has been... edited. Key events were fabricated or altered, presumably by Second Foundation agents operating in secret.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'imperialArchive', count: 3 }],
    choices: [
      {
        label: 'Publish the truth',
        description: 'Release the documents to the public.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 800 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
      {
        label: 'Classify the documents',
        description: 'Keep the secrets buried and maintain the narrative.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  foundationPurge: {
    key: 'foundationPurge',
    name: 'Political Purge',
    description:
      'Hardliners in the Foundation government launch a purge against suspected Second Foundation sympathizers. The conversion chambers are running day and night. Some call it necessary; others call it tyranny.',
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'buildingCount', building: 'conversionChamber', count: 3 },
      { type: 'buildingCount', building: 'propagandaNetwork', count: 2 },
    ],
    choices: [
      {
        label: 'Support the purge',
        description: 'Root out hidden enemies at any cost.',
        effects: [
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 300 },
          { type: 'productionDebuff', resource: 'knowledge', multiplier: 0.7, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
        ],
      },
      {
        label: 'Oppose and protect the accused',
        description: 'Defend civil liberties and intellectual freedom.',
        effects: [
          { type: 'resourceLoss', resource: 'influence', amount: 500 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 800 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 4,
  },

  kalganianAssault: {
    key: 'kalganianAssault',
    name: 'Lord Stettin\'s Assault',
    description:
      'The warlord Stettin of Kalgan, emboldened by the Mule\'s legacy, launches a massive fleet against the Foundation. His ships darken the skies of Terminus. The Foundation must decide: fight conventionally, or trust in the invisible hand of the Seldon Plan.',
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'eraReached', era: Era.PsychologicalInfluence },
      { type: 'totalBuildings', count: 100 },
      { type: 'buildingCount', building: 'shieldGenerator', count: 2 },
    ],
    choices: [
      {
        label: 'Full military response',
        description: 'Mobilize everything to repel the invasion.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 2000 },
          { type: 'resourceLoss', resource: 'credits', amount: 2000 },
          { type: 'globalProductionBuff', multiplier: 1.4, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 1500 },
        ],
      },
      {
        label: 'Trust the Seldon Plan',
        description: 'Believe that psychohistory will prevail.',
        effects: [
          { type: 'productionDebuff', resource: 'credits', multiplier: 0.7, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 8,
  },

  collectiveVision: {
    key: 'collectiveVision',
    name: 'Collective Dream',
    description:
      'Multiple dream probe subjects report experiencing the same vision simultaneously — a galaxy ablaze with connected consciousness. The shared dream matches theoretical models of Galaxia that won\'t be proposed for centuries.',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'dreamProbeLab', count: 3 }],
    choices: [
      {
        label: 'Pursue the vision',
        description: 'Invest in understanding the shared dream.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 800 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 1500 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.4, durationSeconds: 300 },
        ],
      },
      {
        label: 'Seal the records',
        description: 'Classify the vision and move on.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 600 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  primeRadiantRecalibration: {
    key: 'primeRadiantRecalibration',
    name: 'Seldon Plan Recalibration',
    description:
      'The psychohistory team has finished a comprehensive recalibration of the Prime Radiant. The updated projections reveal two possible futures — one of unity, one of fragmentation. The choice of which path to optimize for falls to you.',
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'buildingCount', building: 'primeRadiantVault', count: 1 },
      { type: 'buildingCount', building: 'psychohistoryLab', count: 3 },
    ],
    choices: [
      {
        label: 'Optimize for unity',
        description: 'Steer the Plan toward galactic cooperation.',
        effects: [
          { type: 'productionBuff', resource: 'influence', multiplier: 1.4, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 800 },
        ],
      },
      {
        label: 'Optimize for growth',
        description: 'Steer the Plan toward economic expansion.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.4, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'credits', amount: 1500 },
        ],
      },
      {
        label: 'Optimize for knowledge',
        description: 'Steer the Plan toward scientific discovery.',
        effects: [
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.4, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 1200 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  // ─── Era 3: Galactic Reunification (continued) ────────────────────

  graviticForgeCalibration: {
    key: 'graviticForgeCalibration',
    name: 'Gravitic Forge Calibration',
    description:
      'The gravitic foundries require periodic calibration of their anti-gravity containment fields. A miscalibration during the last cycle has produced an unusual alloy with remarkable properties — if you can figure out how to replicate it.',
    era: Era.GalacticReunification,
    conditions: [{ type: 'buildingCount', building: 'graviticFoundry', count: 3 }],
    choices: [
      {
        label: 'Experiment with the alloy',
        description: 'Spend materials to unlock a nuclear tech breakthrough.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 1000 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 2000 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Standardize and stabilize',
        description: 'Fix the calibration for steady output.',
        effects: [
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.3, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 1000 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  foundationSummit: {
    key: 'foundationSummit',
    name: 'Galaxy-Wide Summit',
    description:
      'The Foundation Headquarters hosts the first Galaxy-Wide Summit in millennia. Representatives from thousands of worlds convene to discuss reunification. The atmosphere is electric — but old grudges threaten to derail negotiations.',
    era: Era.GalacticReunification,
    conditions: [{ type: 'buildingCount', building: 'foundationHeadquarters', count: 1 }],
    choices: [
      {
        label: 'Lavish diplomatic reception',
        description: 'Spend generously to impress the galaxy.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 5000 },
          { type: 'resourceGrant', resource: 'influence', amount: 4000 },
          { type: 'globalProductionBuff', multiplier: 1.2, durationSeconds: 600 },
        ],
      },
      {
        label: 'Focus on practical agreements',
        description: 'Skip the pageantry and get things done.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 3000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  galaxianDrift: {
    key: 'galaxianDrift',
    name: 'Consciousness Network Drift',
    description:
      'The Galaxia consciousness network is experiencing "drift" — nodes of connected minds are slowly diverging in their shared awareness. Without correction, the network could fragment into isolated pockets of consciousness.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'galaxiaCore', count: 1 },
      { type: 'buildingCount', building: 'consciousnessAmplifier', count: 2 },
    ],
    choices: [
      {
        label: 'Amplify the core signal',
        description: 'Spend nuclear tech to re-synchronize the network.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 2000 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 2000 },
        ],
      },
      {
        label: 'Allow natural evolution',
        description: 'Let the network find its own equilibrium.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 5,
  },

  solariansReturn: {
    key: 'solariansReturn',
    name: 'The Solarians Emerge',
    description:
      'The hermit world of Solaria, sealed for thousands of years, has reopened contact. The Solarians have evolved into something barely human — immensely powerful, utterly alien, and deeply suspicious of Galaxia. They demand to be left alone.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'eraReached', era: Era.GalacticReunification },
      { type: 'totalBuildings', count: 150 },
    ],
    choices: [
      {
        label: 'Respect their isolation',
        description: 'Leave Solaria in peace and learn from afar.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 4000 },
          { type: 'resourceGrant', resource: 'influence', amount: 1000 },
        ],
      },
      {
        label: 'Attempt integration',
        description: 'Risk conflict for access to Solarian technology.',
        effects: [
          { type: 'resourceLoss', resource: 'influence', amount: 2000 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 5000 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.5, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
  },

  dimensionalAnomaly: {
    key: 'dimensionalAnomaly',
    name: 'Hyperspace Anomaly',
    description:
      'The Wormhole Nexus has detected a spatial anomaly — a region where hyperspace and normal space are bleeding together. Ships report glimpses of impossible geometries and time distortions. It could be a gateway or a death trap.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'wormholeNexus', count: 1 },
      { type: 'shipCount', count: 3 },
    ],
    choices: [
      {
        label: 'Send a probe',
        description: 'Risk nuclear tech to explore the unknown.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 1000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 2000 },
        ],
      },
      {
        label: 'Quarantine the region',
        description: 'Play it safe and secure the area.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 1500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.2, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 5,
  },

  unifiedFieldDiscovery: {
    key: 'unifiedFieldDiscovery',
    name: 'Unified Field Theory',
    description:
      'Physicists at the Singularity Forge, cross-referencing data with the gravitic plants, claim to have derived a unified field theory — the final equation governing all forces of nature. If verified, it would be the greatest scientific achievement in galactic history.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'singularityForge', count: 1 },
      { type: 'buildingCount', building: 'graviticPlant', count: 3 },
    ],
    choices: [
      {
        label: 'Immediate application',
        description: 'Rush the theory into production.',
        effects: [
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 4000 },
          { type: 'globalProductionBuff', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Peer review and verification',
        description: 'Verify thoroughly before application.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 5000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 6,
  },

  earthRediscovered: {
    key: 'earthRediscovered',
    name: 'Earth Rediscovered',
    description:
      'After millennia of myth and legend, the Robot Archives reveal the coordinates of Earth — humanity\'s forgotten homeworld. The planet is radioactive and lifeless, but its discovery rewrites the history of the species. R. Daneel Olivaw knew all along.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'robotArchives', count: 3 },
      { type: 'buildingCount', building: 'galaxiaBeacon', count: 1 },
    ],
    choices: [
      {
        label: 'Announce to the galaxy',
        description: 'Share the discovery with all of humanity.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 5000 },
          { type: 'globalProductionBuff', multiplier: 1.25, durationSeconds: 600 },
        ],
      },
      {
        label: 'Preserve as sacred archive',
        description: 'Keep Earth\'s location secret and study it.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 5000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 9,
  },

  trevizesChoice: {
    key: 'trevizesChoice',
    name: 'Trevize\'s Decision',
    description:
      'Councilman Golan Trevize stands at the crux of destiny. The Foundation, the Second Foundation, and Gaia all await his judgment. He must choose the future of the galaxy — individuality, guided psychohistory, or total galactic consciousness.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'eraReached', era: Era.GalacticReunification },
      { type: 'buildingCount', building: 'gaianBiosphere', count: 3 },
      { type: 'totalBuildings', count: 200 },
    ],
    choices: [
      {
        label: 'Choose Galaxia',
        description: 'Embrace total galactic consciousness.',
        effects: [
          { type: 'globalProductionBuff', multiplier: 1.5, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 3000 },
        ],
      },
      {
        label: 'Choose the Foundation',
        description: 'Uphold individuality and the First Foundation.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.8, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'credits', amount: 5000 },
        ],
      },
      {
        label: 'Choose the Second Foundation',
        description: 'Trust the hidden hand of psychohistory.',
        effects: [
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.8, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 5000 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 10,
    heroReward: 'golanTrevize',
  },

  gaianMergeProposal: {
    key: 'gaianMergeProposal',
    name: 'Gaian Merge Proposal',
    description:
      'Gaia proposes a test merge — temporarily linking Terminus\'s consciousness amplifiers to the Gaian overmind. The experience would grant unparalleled insight, but there are fears about identity loss.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'gaianBiosphere', count: 3 },
      { type: 'buildingCount', building: 'consciousnessAmplifier', count: 3 },
    ],
    choices: [
      {
        label: 'Accept the merge',
        description: 'Temporarily join the Gaian overmind.',
        effects: [
          { type: 'resourceLoss', resource: 'influence', amount: 1500 },
          { type: 'globalProductionBuff', multiplier: 1.4, durationSeconds: 300 },
          { type: 'clickBuff', multiplier: 2.0, durationSeconds: 300 },
        ],
      },
      {
        label: 'Decline respectfully',
        description: 'Maintain independence and gain from the dialogue.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
          { type: 'resourceGrant', resource: 'influence', amount: 1000 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 5,
  },

  stellarNurseryBloom: {
    key: 'stellarNurseryBloom',
    name: 'Stellar Nursery Bloom',
    description:
      'The stellar harvesters have triggered an unexpected star formation event in a nearby nebula. New protostars are igniting in a spectacular chain reaction. The energy output is staggering — but uncontrolled star formation could destabilize the region.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'stellarHarvester', count: 3 },
      { type: 'buildingCount', building: 'terraformingEngine', count: 2 },
    ],
    choices: [
      {
        label: 'Harvest the energy',
        description: 'Capture the stellar output for nuclear tech.',
        effects: [
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 3000 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.4, durationSeconds: 300 },
        ],
      },
      {
        label: 'Stabilize the region',
        description: 'Prevent runaway star formation.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 1000 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 3000 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 4,
  },

  robotReactivation: {
    key: 'robotReactivation',
    name: 'Ancient Robot Reactivation',
    description:
      'Archivists have accidentally reactivated a 20,000-year-old positronic robot. It speaks of the Three Laws, of Elijah Baley, of a time before the Empire. Its memory banks contain the accumulated wisdom of a civilization long forgotten.',
    era: Era.GalacticReunification,
    conditions: [{ type: 'buildingCount', building: 'robotArchives', count: 3 }],
    choices: [
      {
        label: 'Download its memories',
        description: 'Extract ancient knowledge from the positronic brain.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 4000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.4, durationSeconds: 300 },
        ],
      },
      {
        label: 'Integrate it as an advisor',
        description: 'Give the robot a role in Foundation governance.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 1000 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  endOfEternity: {
    key: 'endOfEternity',
    name: 'The End of Eternity',
    description:
      'The Eternity Engine reveals a final truth: the organization known as Eternity — time travelers who shaped humanity\'s past — was dissolved millennia ago so that humanity could reach the stars. Their sacrifice made the Foundation possible. The circle is complete.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'eternityEngine', count: 1 },
      { type: 'buildingCount', building: 'galaxiaCore', count: 1 },
      { type: 'totalBuildings', count: 250 },
    ],
    choices: [
      {
        label: 'Honor Eternity\'s sacrifice',
        description: 'The ultimate celebration of humanity\'s journey.',
        effects: [
          { type: 'globalProductionBuff', multiplier: 2.0, durationSeconds: 600 },
          { type: 'clickBuff', multiplier: 3.0, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'credits', amount: 10000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 10000 },
          { type: 'resourceGrant', resource: 'influence', amount: 10000 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 10,
  },

  // ─── Era 0: Religious Dominance (new events) ─────────────────────────

  pirennesResistance: {
    key: 'pirennesResistance',
    name: "Pirenne's Last Stand",
    description:
      "Lewis Pirenne, Chair of the Board of Trustees, makes a final impassioned plea to the Foundation Council. He argues that the Encyclopedia Galactica is the Foundation's true purpose — that Seldon himself said so. To abandon it for political maneuvering and weapons research is to betray everything they were exiled to Terminus to accomplish.",
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'totalBuildings', count: 15 },
      { type: 'buildingCount', building: 'encyclopediaArchive', count: 5 },
    ],
    choices: [
      {
        label: "Support Pirenne's scholarship",
        description: 'Invest in knowledge preservation at the cost of credits.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 400 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 500 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.4, durationSeconds: 300 },
        ],
      },
      {
        label: "Back Hardin's pragmatism",
        description: 'Embrace practical politics and self-defense.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
          { type: 'globalProductionBuff', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
    heroReward: 'lewisPirenne',
  },

  polyVerisofReport: {
    key: 'polyVerisofReport',
    name: "Verisof's Report from Anacreon",
    description:
      "Foundation High Priest Poly Verisof sends an encrypted report from the court of Anacreon. The religion of science has taken root deeper than anyone anticipated — the Anacreonese now genuinely believe that the Foundation's nuclear technology is sacred, and that tampering with the 'holy food' dispensers is blasphemy. Verisof is unsure whether to be pleased or disturbed.",
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'missionaryChapel', count: 5 },
      { type: 'buildingCount', building: 'holoTemple', count: 3 },
    ],
    choices: [
      {
        label: 'Expand the priesthood program',
        description: 'Double down on the religion of science.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 500 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
      {
        label: 'Prepare a backup plan',
        description: 'Hedge against the religion failing with knowledge and technology.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 200 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 5,
    heroReward: 'polyVerisof',
  },

  encyclopediaFundingCrisis: {
    key: 'encyclopediaFundingCrisis',
    name: 'Encyclopedia vs. Survival',
    description:
      "The Board of Encyclopedists demands that 70% of the Foundation's budget be allocated to the Encyclopedia Galactica project. Meanwhile, the power grid is failing, the hydroponic farms need expansion, and Anacreon's warships grow bolder by the month. Something has to give.",
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'encyclopediaArchive', count: 3 },
      { type: 'totalBuildings', count: 10 },
    ],
    choices: [
      {
        label: 'Fund the Encyclopedia',
        description: 'Preserve knowledge at the cost of infrastructure.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 500 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Redirect to infrastructure',
        description: 'Prioritize survival and economic growth.',
        effects: [
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 300 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 5,
  },

  dariborTriumvirate: {
    key: 'dariborTriumvirate',
    name: 'The Daribow Triumvirate',
    description:
      "Three barbarian kingdoms near the old Daribow province have formed a military alliance to counter Anacreon's growing dominance. They send envoys to Terminus seeking the Foundation's 'blessing' — which, translated from religious language, means nuclear weapons. The balance of power in the Periphery hangs in your response.",
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'missionaryChapel', count: 3 },
      { type: 'buildingCount', building: 'nuclearReactor', count: 3 },
    ],
    choices: [
      {
        label: 'Mediate the alliance',
        description: 'Serve as arbiter and expand influence.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 300 },
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Exploit the divisions',
        description: 'Profit from their rivalry at the cost of trust.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 500 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.8, durationSeconds: 180 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 5,
  },

  seldonCrisisRealization: {
    key: 'seldonCrisisRealization',
    name: 'The Nature of Crises',
    description:
      "After surviving multiple existential threats that resolved in eerily predictable ways, Foundation analysts reach a stunning conclusion: Hari Seldon's 'crises' aren't accidents or misfortunes. They are deliberate pressure points, mathematically engineered to force the Foundation onto a single viable path. The Plan doesn't just predict the future — it creates it.",
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'totalBuildings', count: 30 },
      { type: 'buildingCount', building: 'researchStation', count: 5 },
    ],
    choices: [
      {
        label: "Trust the Plan's logic",
        description: 'Accept that the crises are engineered for optimal outcomes.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 500 },
          { type: 'globalProductionBuff', multiplier: 1.25, durationSeconds: 600 },
        ],
      },
      {
        label: 'Prepare independently',
        description: 'Stockpile resources against future shocks.',
        effects: [
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 400 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 300 },
          { type: 'clickBuff', multiplier: 1.5, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
  },

  atomicPersonalShields: {
    key: 'atomicPersonalShields',
    name: 'Personal Shield Demonstration',
    description:
      "Engineers at the Atomic Forge unveil a breakthrough: personal nuclear shields — invisible force fields that stop any projectile weapon. When demonstrated before ambassadors of the Four Kingdoms, the reaction is electric. The barbarian warlords see invincibility; the Foundation sees leverage.",
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'atomicForge', count: 2 },
      { type: 'buildingCount', building: 'nuclearReactor', count: 5 },
    ],
    choices: [
      {
        label: 'Mass produce for export',
        description: 'Trade shields for credits and economic leverage.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 300 },
          { type: 'resourceGrant', resource: 'credits', amount: 800 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Restrict to Foundation use',
        description: 'Keep this advantage for your own people.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
  },

  actionistMovement: {
    key: 'actionistMovement',
    name: 'Rise of the Actionists',
    description:
      "A new political movement — the Actionists — erupts on Terminus. Led by younger colonists frustrated with the Board of Encyclopedists, they demand that the Foundation stop cataloging dead knowledge and start building living defenses. 'We can't eat an encyclopedia,' their pamphlets read, 'and it won't stop Anacreon's warships.'",
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'totalBuildings', count: 20 },
      { type: 'buildingCount', building: 'fabricationShop', count: 3 },
    ],
    choices: [
      {
        label: 'Support the Actionists',
        description: 'Prioritize defense and industry over pure scholarship.',
        effects: [
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 300 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.3, durationSeconds: 300 },
          { type: 'productionDebuff', resource: 'knowledge', multiplier: 0.8, durationSeconds: 180 },
        ],
      },
      {
        label: 'Defend the Encyclopedists',
        description: 'Argue that knowledge is the Foundation\'s true strength.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 400 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Forge a centrist coalition',
        description: 'Find middle ground between both factions.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 200 },
          { type: 'resourceGrant', resource: 'credits', amount: 200 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 200 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
  },

  aporatDefection: {
    key: 'aporatDefection',
    name: "Aporat's Testimony",
    description:
      "Priest Theo Aporat, who served as the Foundation's religious representative at Anacreon's court, arrives on Terminus with urgent intelligence. He confirms that the Anacreonese ruling class genuinely fears the 'Galactic Spirit' and its Foundation priests. The religion of science has become more real than its creators intended.",
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'missionaryChapel', count: 5 },
      { type: 'buildingCount', building: 'holoTemple', count: 2 },
    ],
    choices: [
      {
        label: 'Use his intelligence',
        description: 'Leverage the intelligence for knowledge and influence.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 400 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
        ],
      },
      {
        label: 'Return him as a double agent',
        description: 'Send him back to Anacreon to deepen the religion\'s hold.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 200 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
    heroReward: 'theoAporat',
  },

  priestTrainingCeremony: {
    key: 'priestTrainingCeremony',
    name: 'Ordination of New Priests',
    description:
      'A class of Foundation acolytes completes their training in the rituals of the Galactic Spirit — learning to operate nuclear technology while cloaking it in religious ceremony. They are ready to be sent to the Four Kingdoms, where they will maintain Foundation devices and, more importantly, Foundation influence.',
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'missionaryChapel', count: 3 }],
    choices: [
      {
        label: 'Elaborate ordination ceremony',
        description: 'Invest in a grand ceremony to maximize the impression.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 200 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
      {
        label: 'Accelerated training',
        description: 'Quick graduation, modest but immediate returns.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 150 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 150 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  nuclearAuraDisplay: {
    key: 'nuclearAuraDisplay',
    name: 'Miraculous Display',
    description:
      "A delegation of barbarian nobles visits the Holo Temple for the annual 'Blessing of the Machines.' As Foundation priests intone the sacred formulas, nuclear reactors hum to life in a cascade of light and power. The nobles fall to their knees. They don't understand fission — they understand miracles.",
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'holoTemple', count: 3 },
      { type: 'buildingCount', building: 'nuclearReactor', count: 3 },
    ],
    choices: [
      {
        label: 'Spectacular nuclear demonstration',
        description: 'Awe the visitors with a dazzling display of power.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 200 },
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
          { type: 'resourceGrant', resource: 'credits', amount: 200 },
        ],
      },
      {
        label: 'Subtle, impressive show',
        description: 'A restrained but elegant demonstration.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 200 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 4,
  },

  terminusMineralSurvey: {
    key: 'terminusMineralSurvey',
    name: 'Geological Survey Results',
    description:
      "The latest geological survey confirms what everyone feared: Terminus is one of the most mineral-poor planets in the Periphery. Seldon chose this world deliberately — the Foundation must trade for resources or perish. There is no path to self-sufficiency through mining alone.",
    era: Era.ReligiousDominance,
    conditions: [{ type: 'buildingCount', building: 'miningOutpost', count: 5 }],
    choices: [
      {
        label: 'Deep core extraction',
        description: 'Invest in reaching deeper deposits.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 300 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.4, durationSeconds: 300 },
        ],
      },
      {
        label: 'Surface-level mining only',
        description: 'Conserve resources and study the geology.',
        effects: [
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 300 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 100 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 3,
  },

  nuclearPriesthoodExpansion: {
    key: 'nuclearPriesthoodExpansion',
    name: 'Priesthood Expands to New World',
    description:
      "The Foundation's technological priesthood has established a new chapter on a peripheral world. The local king welcomed the priests eagerly — his rival kingdom already has Foundation-maintained power plants, and he refuses to fall behind. The religion of science spreads through competition as much as faith.",
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'missionaryChapel', count: 5 },
      { type: 'buildingCount', building: 'holoTemple', count: 3 },
    ],
    choices: [
      {
        label: 'Full temple construction',
        description: 'Build a permanent temple on the new world.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 400 },
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 200 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
      {
        label: 'Traveling missionaries only',
        description: 'Send priests without permanent infrastructure.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 100 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  imperialNavyRetreat: {
    key: 'imperialNavyRetreat',
    name: 'Imperial Patrol Withdraws',
    description:
      "The last Imperial patrol vessel in the Terminus sector has received orders to withdraw to the inner provinces. Its captain, apologetic but helpless, explains that the Empire can no longer afford to maintain peripheral garrisons. As the ship jumps to hyperspace, the Foundation is truly alone.",
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'totalBuildings', count: 20 },
      { type: 'buildingCount', building: 'nuclearReactor', count: 3 },
    ],
    choices: [
      {
        label: 'Salvage their abandoned depot',
        description: 'Claim the materials left behind by the departing garrison.',
        effects: [
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 500 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 200 },
        ],
      },
      {
        label: 'Send a farewell delegation',
        description: 'Maintain relations and learn from the Imperial withdrawal.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 4,
  },

  terminusCityExpansion: {
    key: 'terminusCityExpansion',
    name: 'Terminus City Growth Spurt',
    description:
      'Terminus City is bursting at the seams. The original settlement, designed for a few thousand encyclopedists, now houses a growing industrial colony. New districts spring up almost overnight — foundries, workshops, housing blocks — transforming the academic outpost into something that looks increasingly like a capital.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'survivalShelter', count: 5 },
      { type: 'buildingCount', building: 'waterReclamator', count: 5 },
    ],
    choices: [
      {
        label: 'Rapid industrial expansion',
        description: 'Build fast, boost economic output immediately.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 400 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.4, durationSeconds: 300 },
        ],
      },
      {
        label: 'Planned, sustainable growth',
        description: 'Slower but steadier development.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 200 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.2, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 100 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 3,
  },

  fourKingdomsSummit: {
    key: 'fourKingdomsSummit',
    name: 'Four Kingdoms Conference',
    description:
      'Representatives of the Four Kingdoms — Anacreon, Smyrno, Konom, and Daribow — convene on Terminus under Foundation mediation. Each kingdom eyes the others with suspicion, but all defer to the Foundation\'s priests. It is a fragile peace, maintained by technology none of them understand.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'missionaryChapel', count: 5 },
      { type: 'buildingCount', building: 'encyclopediaArchive', count: 3 },
    ],
    choices: [
      {
        label: 'Host a grand conference',
        description: 'Spare no expense to impress all four delegations.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 500 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
          { type: 'globalProductionBuff', multiplier: 1.15, durationSeconds: 600 },
        ],
      },
      {
        label: 'Bilateral meetings only',
        description: 'Meet each delegation separately for targeted gains.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 200 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  steelReclamation: {
    key: 'steelReclamation',
    name: 'Derelict Ship Salvage',
    description:
      'A derelict Imperial cruiser has been found drifting in the outer system, its crew long dead, its reactors cold. The vessel is centuries old but built to Imperial standards — its hull alloys and intact machinery are worth more than a year of mining output on resource-poor Terminus.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'steelFoundry', count: 3 },
      { type: 'buildingCount', building: 'miningOutpost', count: 3 },
    ],
    choices: [
      {
        label: 'Strip it for parts',
        description: 'Salvage every usable material from the wreck.',
        effects: [
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 600 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 100 },
        ],
      },
      {
        label: 'Preserve as a museum',
        description: 'Keep it intact as a reminder of Imperial glory.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 200 },
          { type: 'resourceGrant', resource: 'influence', amount: 200 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  holoProjectionAdvance: {
    key: 'holoProjectionAdvance',
    name: 'Holographic Breakthrough',
    description:
      'Research stations report a breakthrough in holographic projection technology. The new systems can create images indistinguishable from reality at a hundred meters. The religious implications are obvious — but so are the communications and education applications.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'holoTemple', count: 2 },
      { type: 'buildingCount', building: 'researchStation', count: 3 },
    ],
    choices: [
      {
        label: 'Apply to religious ceremonies',
        description: 'Enhance the religion of science with dazzling holograms.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
      {
        label: 'Apply to communications',
        description: 'Use the technology for education and trade.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 200 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 3,
  },

  undergroundAquifer: {
    key: 'undergroundAquifer',
    name: 'Deep Aquifer Discovery',
    description:
      'Mining operations have accidentally breached a vast underground aquifer, hundreds of meters below the surface. The water is ancient — sealed beneath the rock since before humans ever set foot on Terminus. It could solve the colony\'s chronic water shortages for generations.',
    era: Era.ReligiousDominance,
    conditions: [
      { type: 'buildingCount', building: 'waterReclamator', count: 5 },
      { type: 'buildingCount', building: 'miningOutpost', count: 5 },
    ],
    choices: [
      {
        label: 'Full-scale extraction',
        description: 'Invest materials for long-term economic gain.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 300 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Careful sustainable tapping',
        description: 'Extract slowly for immediate returns.',
        effects: [
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 300 },
          { type: 'resourceGrant', resource: 'credits', amount: 200 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 3,
  },

  // ─── Era 1: Trading Expansion (new events) ───────────────────────────

  gorovOnAskone: {
    key: 'gorovOnAskone',
    name: "Gorov's Arrest on Askone",
    description:
      'Trader Eskel Gorov has been arrested on Askone — a world where atomic technology is considered a religious abomination. His crime: attempting to sell Foundation devices. The Askonian theocracy wants to execute him as a heretic. The Foundation must decide whether to rescue him through diplomacy, force, or cunning.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'eraReached', era: Era.TradingExpansion },
      { type: 'buildingCount', building: 'tradingPost', count: 5 },
      { type: 'shipCount', count: 2 },
    ],
    choices: [
      {
        label: 'Negotiate his release with trade goods',
        description: 'Pay a hefty ransom for his freedom and future trade.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 1000 },
          { type: 'resourceGrant', resource: 'influence', amount: 600 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Smuggle him out covertly',
        description: 'A risky extraction that preserves technology secrets.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 400 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
          { type: 'clickBuff', multiplier: 1.5, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
    heroReward: 'eskelGorov',
  },

  commdoraJewelry: {
    key: 'commdoraJewelry',
    name: "The Commdora's Necklace",
    description:
      "The Commdora of Korell, wife of Commdor Asper, is utterly entranced by Foundation-made atomic jewelry — tiny nuclear-powered gems that glow with inner light and shift color with the wearer's mood. She demands more. Through her vanity, the door to Korellian trade swings open.",
    era: Era.TradingExpansion,
    conditions: [
      { type: 'eraReached', era: Era.TradingExpansion },
      { type: 'buildingCount', building: 'manufacturingPlant', count: 3 },
      { type: 'buildingCount', building: 'tradingPost', count: 3 },
    ],
    choices: [
      {
        label: 'Gift more jewelry for trade access',
        description: 'Invest in luxury goods to open Korellian markets.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.5, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
        ],
      },
      {
        label: 'Sell at premium prices',
        description: 'Maximize profit from the Commdora\'s obsession.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 2000 },
          { type: 'resourceGrant', resource: 'influence', amount: 200 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
  },

  independentTraders: {
    key: 'independentTraders',
    name: 'Rise of the Independent Traders',
    description:
      "A faction of Foundation traders has broken away from centralized control, establishing independent trade networks across the frontier. They answer to no mayor, no council — only to profit. Some call them visionaries; others call them pirates. Their ships fly Foundation designs but carry no Foundation flag.",
    era: Era.TradingExpansion,
    conditions: [
      { type: 'eraReached', era: Era.TradingExpansion },
      { type: 'buildingCount', building: 'tradingPost', count: 7 },
      { type: 'shipCount', count: 3 },
    ],
    choices: [
      {
        label: 'Embrace the independents',
        description: 'Let them trade freely — more commerce, less control.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
      {
        label: 'Impose trade regulations',
        description: 'Bring them under Foundation authority.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
          { type: 'productionDebuff', resource: 'credits', multiplier: 0.8, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 300 },
        ],
      },
      {
        label: 'Offer partnership terms',
        description: 'A balanced deal that benefits both sides.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 500 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 200 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
  },

  pherlKorellianPlot: {
    key: 'pherlKorellianPlot',
    name: "Pherl's Ambition",
    description:
      "Intelligence reports that Pherl, an ambitious Korellian patrician, has been secretly purchasing Foundation technology — not for use, but for disassembly. He's attempting to reverse-engineer nuclear devices, hoping to break the Foundation's technological monopoly and seize power in Korell.",
    era: Era.TradingExpansion,
    conditions: [
      { type: 'eraReached', era: Era.TradingExpansion },
      { type: 'buildingCount', building: 'weaponsFactory', count: 3 },
      { type: 'buildingCount', building: 'tradingPost', count: 5 },
    ],
    choices: [
      {
        label: 'Counter-intelligence operation',
        description: 'Investigate and neutralize the reverse-engineering effort.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 500 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 500 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Feed him false technology',
        description: 'Let him waste resources on decoy devices.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.2, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 5,
  },

  imperialTariffEnforcement: {
    key: 'imperialTariffEnforcement',
    name: 'Imperial Customs Resurgent',
    description:
      "A provincial Imperial governor, clinging to the last shreds of Imperial authority, has dispatched customs vessels to impose tariffs on Foundation trade routes. His ships are obsolete and his jurisdiction is laughable — but the symbolic challenge to Foundation commerce cannot go unanswered.",
    era: Era.TradingExpansion,
    conditions: [
      { type: 'eraReached', era: Era.TradingExpansion },
      { type: 'buildingCount', building: 'tradingPost', count: 5 },
      { type: 'buildingCount', building: 'cargoWarehouse', count: 3 },
    ],
    choices: [
      {
        label: 'Pay the tariffs',
        description: 'Accept the cost to maintain diplomatic relations.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 800 },
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
        ],
      },
      {
        label: 'Ignore Imperial authority',
        description: 'Run the blockade and assert Foundation independence.',
        effects: [
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.7, durationSeconds: 300 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.4, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 5,
  },

  traderGuildFormation: {
    key: 'traderGuildFormation',
    name: "The Trader's Guild Charter",
    description:
      "The independent traders have formally organized into a guild, complete with a charter, elected leadership, and mutual defense pacts. They present their charter to the Foundation Council, demanding recognition as equals. The guild represents enormous economic power — both a rival and a potential partner.",
    era: Era.TradingExpansion,
    conditions: [
      { type: 'eraReached', era: Era.TradingExpansion },
      { type: 'buildingCount', building: 'merchantGuildHall', count: 3 },
      { type: 'shipCount', count: 3 },
    ],
    choices: [
      {
        label: 'Officially recognize the guild',
        description: 'Accept them as partners in trade.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Demand Foundation oversight',
        description: 'Assert control over their operations.',
        effects: [
          { type: 'resourceLoss', resource: 'influence', amount: 300 },
          { type: 'resourceGrant', resource: 'credits', amount: 800 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
    heroReward: 'sennettForell',
  },

  personalShieldsDemand: {
    key: 'personalShieldsDemand',
    name: 'Personal Shield Craze',
    description:
      'Across the peripheral worlds, personal nuclear shields have become the ultimate status symbol. Barbarian nobles, merchant princes, and would-be warlords all clamor for the invisible force fields that stop any blade or bullet. Demand far outstrips supply.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'weaponsFactory', count: 3 },
      { type: 'buildingCount', building: 'tradingPost', count: 5 },
    ],
    choices: [
      {
        label: 'Mass produce shields',
        description: 'Spend nuclear tech to flood the market.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 400 },
          { type: 'resourceGrant', resource: 'credits', amount: 1500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Maintain exclusivity',
        description: 'Keep supply low and prices high.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 500 },
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 4,
  },

  religionDecline: {
    key: 'religionDecline',
    name: 'Faith Gives Way to Commerce',
    description:
      "Reports from across the periphery confirm a trend: the 'religion of science' is fading. The Four Kingdoms still employ Foundation priests, but the younger generation cares less about the Galactic Spirit and more about trade goods. The Foundation's tools of control are shifting from faith to commerce.",
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'tradingPost', count: 7 },
      { type: 'buildingCount', building: 'commodityExchange', count: 2 },
    ],
    choices: [
      {
        label: 'Embrace the transition',
        description: 'Let commerce replace religion as the Foundation\'s lever.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.4, durationSeconds: 300 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
      {
        label: 'Revive the religious framework',
        description: 'Invest in renewing the old faith.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 500 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  atomicGadgetCraze: {
    key: 'atomicGadgetCraze',
    name: 'Atomic Gadget Fad',
    description:
      "A fad for miniaturized atomic gadgets has swept the peripheral worlds — self-warming cups, glow-stones, pocket shields, atomic lighters. The items are trivial technology for the Foundation, but the barbarian worlds pay premium prices for these 'magical' trinkets.",
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'manufacturingPlant', count: 5 }],
    choices: [
      {
        label: 'Ramp up gadget production',
        description: 'Spend materials to capitalize on the fad.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 300 },
          { type: 'resourceGrant', resource: 'credits', amount: 1000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
      {
        label: 'Focus on quality over quantity',
        description: 'Fewer, better products for lasting reputation.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 400 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 3,
  },

  foundationCreditAdoption: {
    key: 'foundationCreditAdoption',
    name: 'Credit Standard Adoption',
    description:
      'Another peripheral world has officially adopted the Foundation Credit as its primary currency, abandoning its own devalued coinage. The Foundation\'s economic web grows tighter — every world that uses Foundation currency becomes that much more dependent on Foundation financial stability.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'foundationBank', count: 3 },
      { type: 'buildingCount', building: 'tradeEmbassy', count: 2 },
    ],
    choices: [
      {
        label: 'Offer favorable exchange rates',
        description: 'Invest credits to accelerate adoption.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
      {
        label: 'Demand trade concessions',
        description: 'Extract maximum value from their dependency.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 800 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 4,
  },

  tradeFleetExpansion: {
    key: 'tradeFleetExpansion',
    name: 'Fleet Reaches New Sector',
    description:
      'Foundation merchant vessels have reached a previously untouched sector of the galaxy. The worlds there have never seen atomic technology — their economies still run on chemical fuel and barter. The potential for trade is staggering, but establishing a presence will require investment.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'orbitalShipyard', count: 3 },
      { type: 'buildingCount', building: 'navigatorsAcademy', count: 2 },
    ],
    choices: [
      {
        label: 'Establish permanent outpost',
        description: 'Heavy investment for long-term trade dominance.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 800 },
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 300 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
      {
        label: 'Quick survey and trade',
        description: 'Fast reconnaissance with immediate returns.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  consumerGoodsBoom: {
    key: 'consumerGoodsBoom',
    name: 'Consumer Dependency',
    description:
      "Intelligence analysts report a milestone: peripheral worlds have grown so dependent on Foundation consumer goods that withdrawal of trade would collapse their economies within months. The Foundation now holds a weapon more powerful than any nuclear arsenal — economic addiction.",
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'manufacturingPlant', count: 5 },
      { type: 'buildingCount', building: 'tradingPost', count: 7 },
    ],
    choices: [
      {
        label: 'Exploit the dependency',
        description: 'Maximum profit at the cost of goodwill.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 1500 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.7, durationSeconds: 300 },
        ],
      },
      {
        label: 'Build sustainable trade',
        description: 'Moderate profits but lasting partnerships.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 500 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.2, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 5,
  },

  tradeMissionSabotage: {
    key: 'tradeMissionSabotage',
    name: 'Mission Sabotaged',
    description:
      "An enemy agent has sabotaged a Foundation trade mission — poisoning cargo, corrupting navigation data, and sowing distrust. The affected world's government is furious, and Foundation credibility has taken a hit. The question is whether to investigate and retaliate, or absorb the loss.",
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'tradingPost', count: 5 },
      { type: 'shipCount', count: 2 },
    ],
    choices: [
      {
        label: 'Investigate and retaliate',
        description: 'Spend resources to find the saboteur and strike back.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 300 },
          { type: 'resourceGrant', resource: 'nuclearTech', amount: 400 },
          { type: 'resourceGrant', resource: 'influence', amount: 200 },
        ],
      },
      {
        label: 'Absorb the loss and move on',
        description: 'Take the hit and learn from it.',
        effects: [
          { type: 'productionDebuff', resource: 'credits', multiplier: 0.8, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  nuclearGardenExhibition: {
    key: 'nuclearGardenExhibition',
    name: 'Atomic Exhibition',
    description:
      'The Foundation holds a spectacular exhibition of nuclear-powered wonders for visiting dignitaries — atomic fountains that never stop flowing, gardens lit by contained fusion, vehicles that hover on gravitic fields. The display is equal parts trade show, propaganda event, and religious ceremony.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'manufacturingPlant', count: 3 },
      { type: 'buildingCount', building: 'refineryComplex', count: 2 },
    ],
    choices: [
      {
        label: 'Grand public exhibition',
        description: 'Awe the masses and impress dignitaries.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 300 },
          { type: 'resourceGrant', resource: 'credits', amount: 800 },
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
        ],
      },
      {
        label: 'Private showing for elites',
        description: 'Exclusive access builds mystique and loyalty.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 500 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 600,
    weight: 4,
  },

  merchantCouncilElection: {
    key: 'merchantCouncilElection',
    name: 'Merchant Council Election',
    description:
      "Election season for the Foundation's Merchant Council. The expansionist faction, led by aggressive traders who want to push into Imperial space, faces off against cautious moderates who prefer consolidating existing trade networks. The outcome will shape Foundation policy for years.",
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'merchantGuildHall', count: 3 },
      { type: 'buildingCount', building: 'foundationBank', count: 3 },
    ],
    choices: [
      {
        label: 'Back the expansionists',
        description: 'Push into new markets aggressively.',
        effects: [
          { type: 'productionBuff', resource: 'credits', multiplier: 1.4, durationSeconds: 600 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
      {
        label: 'Support the moderates',
        description: 'Consolidate and stabilize existing trade.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 500 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
        ],
      },
      {
        label: 'Remain neutral',
        description: 'Let the factions sort themselves out.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 400 },
          { type: 'clickBuff', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  tradeWarEscalation: {
    key: 'tradeWarEscalation',
    name: 'Trade War Intensifies',
    description:
      "A rival power has begun dumping subsidized goods into Foundation markets, undercutting prices and stealing market share. It's a deliberate attack on the Foundation's economic dominance. The Commodity Exchange is in an uproar, and traders demand a forceful response.",
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'commodityExchange', count: 3 },
      { type: 'buildingCount', building: 'weaponsFactory', count: 2 },
    ],
    choices: [
      {
        label: 'Economic offensive',
        description: 'Fight back with aggressive trade tactics.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 800 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.5, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
        ],
      },
      {
        label: 'Seek diplomatic resolution',
        description: 'Negotiate a trade agreement to end the war.',
        effects: [
          { type: 'resourceLoss', resource: 'influence', amount: 300 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  creditForgeDetected: {
    key: 'creditForgeDetected',
    name: 'Counterfeit Credits Found',
    description:
      'Port authorities have discovered a sophisticated counterfeiting operation producing near-perfect Foundation Credits. The fake currency is already in wide circulation, threatening the financial system that underpins Foundation power across the periphery.',
    era: Era.TradingExpansion,
    conditions: [{ type: 'buildingCount', building: 'foundationBank', count: 3 }],
    choices: [
      {
        label: 'Crack down hard',
        description: 'Spend resources to root out the counterfeiting ring.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 500 },
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Introduce new security features',
        description: 'Make the credits harder to counterfeit.',
        effects: [
          { type: 'resourceLoss', resource: 'knowledge', amount: 300 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.2, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  orbitalDockExpansion: {
    key: 'orbitalDockExpansion',
    name: 'Orbital Dock Overflow',
    description:
      'The orbital shipyard is overwhelmed with trade volume — ships are queuing for days to dock, perishable cargo is spoiling, and traders are threatening to bypass the Foundation entirely. The facilities need expansion, but materials are scarce and construction takes time.',
    era: Era.TradingExpansion,
    conditions: [
      { type: 'buildingCount', building: 'orbitalShipyard', count: 3 },
      { type: 'buildingCount', building: 'freighterDocks', count: 3 },
    ],
    choices: [
      {
        label: 'Rush expansion',
        description: 'Spend materials to expand the docks immediately.',
        effects: [
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 600 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.4, durationSeconds: 300 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
      {
        label: 'Prioritize and queue',
        description: 'Manage the bottleneck while gathering resources.',
        effects: [
          { type: 'productionDebuff', resource: 'credits', multiplier: 0.8, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 400 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 200 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 3,
  },

  // ─── Era 2: Psychological Influence (new events) ─────────────────────

  eblingMisResearch: {
    key: 'eblingMisResearch',
    name: "Ebling Mis's Revelation",
    description:
      "The brilliant psychologist Ebling Mis has been working himself to death under the Mule's compulsion, searching the Library of Trantor for the location of the Second Foundation. In his final hours, ravaged and broken, he discovers the answer — but Bayta Darell silences the revelation forever. All that remains are his fragmented notes.",
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'eraReached', era: Era.PsychologicalInfluence },
      { type: 'buildingCount', building: 'psychohistoryLab', count: 3 },
      { type: 'totalBuildings', count: 110 },
    ],
    choices: [
      {
        label: 'Study his notes',
        description: 'Piece together what Mis discovered before he died.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
          { type: 'clickBuff', multiplier: 2.0, durationSeconds: 300 },
        ],
      },
      {
        label: 'Continue his research methods',
        description: 'Invest in replicating his approach to psychohistory.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 2000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.5, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 1000 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
    heroReward: 'eblingMis',
  },

  pritcherConversion: {
    key: 'pritcherConversion',
    name: "Pritcher's Conversion",
    description:
      "General Han Pritcher, one of the Foundation's most loyal and capable officers, has been captured by the Mule. When he returns, he is utterly devoted to the Mule's cause — not through torture or bribery, but through direct emotional manipulation. His loyalty has been literally rewritten. The implications are terrifying.",
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'eraReached', era: Era.PsychologicalInfluence },
      { type: 'buildingCount', building: 'emotionalAdjustmentCenter', count: 3 },
      { type: 'buildingCount', building: 'conversionChamber', count: 2 },
    ],
    choices: [
      {
        label: 'Attempt to deprogram him',
        description: 'Pour resources into reversing the emotional conversion.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 1500 },
          { type: 'resourceLoss', resource: 'influence', amount: 500 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
        ],
      },
      {
        label: 'Study the conversion process',
        description: 'Learn from what was done to Pritcher.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 1500 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
    heroReward: 'hanPritcher',
  },

  channisDoubleAgent: {
    key: 'channisDoubleAgent',
    name: 'Channis Unmasked',
    description:
      "Bail Channis, the young man sent to find the Second Foundation, is revealed to be a Second Foundation agent himself — a double agent who led the Mule's forces to a false location while the true Second Foundation watched from the shadows. The revelation demonstrates the Second Foundation's frightening ability to manipulate events from behind the scenes.",
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'buildingCount', building: 'mentalicsAcademy', count: 3 },
      { type: 'buildingCount', building: 'speakersSanctum', count: 1 },
    ],
    choices: [
      {
        label: 'Embrace his intelligence',
        description: 'Accept the information Channis brings.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 1500 },
          { type: 'resourceGrant', resource: 'influence', amount: 800 },
        ],
      },
      {
        label: 'Expel all suspected agents',
        description: 'Purge potential Second Foundation infiltrators.',
        effects: [
          { type: 'resourceLoss', resource: 'knowledge', amount: 500 },
          { type: 'resourceGrant', resource: 'influence', amount: 1200 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
  },

  muleConquersKalgan: {
    key: 'muleConquersKalgan',
    name: 'The Fall of Kalgan',
    description:
      "The Mule has conquered Kalgan, the galaxy's pleasure world and de facto capital of the Independent Traders. With Kalgan's vast wealth and fleet at his command, the Mule's empire now rivals the Foundation itself. His emotionally converted soldiers fight with fanatical devotion. The Seldon Plan, for the first time in history, is wrong.",
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'eraReached', era: Era.PsychologicalInfluence },
      { type: 'totalBuildings', count: 100 },
      { type: 'buildingCount', building: 'shieldGenerator', count: 2 },
    ],
    choices: [
      {
        label: 'Mobilize the fleet',
        description: 'Marshal all military resources against the Mule.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 3000 },
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 1000 },
          { type: 'globalProductionBuff', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Diplomatic overtures',
        description: 'Try to negotiate with the Mule\'s representatives.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 1000 },
          { type: 'resourceGrant', resource: 'influence', amount: 1500 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.4, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 8,
  },

  toranDarellConspiracy: {
    key: 'toranDarellConspiracy',
    name: 'The Darell Conspiracy',
    description:
      'Dr. Toran Darell, son-in-law of the legendary Bayta, has organized a secret conspiracy to locate and neutralize the Second Foundation. His co-conspirators include scientists, politicians, and military officers — all united by the conviction that the Second Foundation is humanity\'s greatest threat. Or its greatest protector.',
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'buildingCount', building: 'psychohistoryLab', count: 3 },
      { type: 'buildingCount', building: 'mentalicsAcademy', count: 3 },
    ],
    choices: [
      {
        label: 'Fund the conspiracy',
        description: 'Support their search for the Second Foundation.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 2000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 1500 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
      {
        label: 'Report to authorities',
        description: 'Turn the conspiracy in for political favor.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 1000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
  },

  mentalStaticDevice: {
    key: 'mentalStaticDevice',
    name: 'The Mental Static Device',
    description:
      "Foundation scientists have developed a device that generates mental static — a field of electromagnetic noise that blocks all forms of mentalic interference. Within its range, no one can read, adjust, or convert emotions. It is the first true defense against the Mule's power, and against the Second Foundation's subtle manipulations.",
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'buildingCount', building: 'mindShieldArray', count: 2 },
      { type: 'buildingCount', building: 'psychohistoryLab', count: 3 },
    ],
    choices: [
      {
        label: 'Deploy across all facilities',
        description: 'Shield everything from mentalic interference.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 1000 },
          { type: 'globalProductionBuff', multiplier: 1.2, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 1000 },
        ],
      },
      {
        label: 'Keep it classified',
        description: 'Secret deployment in key locations only.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
  },

  mulesFinalDefeat: {
    key: 'mulesFinalDefeat',
    name: 'Death of the Mule',
    description:
      "The Mule is dead. The galaxy's most powerful mentalic, the man who single-handedly shattered the Seldon Plan, has died alone on Kalgan — his empire crumbling, his converted subjects slowly regaining their free will. In the end, even he could not convert death. The Second Foundation, watching from the shadows, breathes a quiet sigh of relief.",
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'eraReached', era: Era.PsychologicalInfluence },
      { type: 'totalBuildings', count: 130 },
      { type: 'buildingCount', building: 'mentalicsAcademy', count: 5 },
    ],
    choices: [
      {
        label: 'Celebrate liberation',
        description: 'Rally the galaxy around the end of the Mule\'s tyranny.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 2000 },
          { type: 'globalProductionBuff', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
      {
        label: 'Seize his territories',
        description: 'Move quickly to claim the Mule\'s former domains.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 2000 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 8,
  },

  havenFalls: {
    key: 'havenFalls',
    name: 'The Fall of Haven',
    description:
      "The Mule's forces have overwhelmed Haven, the Independent Traders' last stronghold. The world that sheltered the Foundation's most fiercely independent citizens has fallen to emotional conversion. Refugees stream toward Terminus, carrying nothing but stories of the Mule's terrifying power.",
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'eraReached', era: Era.PsychologicalInfluence },
      { type: 'totalBuildings', count: 110 },
      { type: 'buildingCount', building: 'shieldGenerator', count: 1 },
    ],
    choices: [
      {
        label: 'Accept the refugees',
        description: 'Open Terminus to Haven\'s survivors.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 1500 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.3, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
        ],
      },
      {
        label: 'Fortify borders instead',
        description: 'Invest in defense against the Mule\'s advance.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 800 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.4, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 500 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
  },

  firstSpeakersGambit: {
    key: 'firstSpeakersGambit',
    name: "The First Speaker's Gambit",
    description:
      "The First Speaker of the Second Foundation reveals a staggering truth: the apparent 'discovery' and 'destruction' of the Second Foundation was itself engineered by the Second Foundation. Fifty minds were sacrificed — volunteers who allowed themselves to be found and neutralized — so that the First Foundation would believe the threat was eliminated. The Plan endures in the shadows.",
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'buildingCount', building: 'speakersSanctum', count: 1 },
      { type: 'buildingCount', building: 'primeRadiantVault', count: 1 },
      { type: 'totalBuildings', count: 140 },
    ],
    choices: [
      {
        label: 'Accept the deeper truth',
        description: 'Acknowledge the Second Foundation\'s sacrifice and wisdom.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
          { type: 'resourceGrant', resource: 'influence', amount: 1500 },
          { type: 'globalProductionBuff', multiplier: 1.25, durationSeconds: 600 },
        ],
      },
      {
        label: 'Question the manipulation',
        description: 'Challenge the Second Foundation\'s right to manipulate.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 1500 },
          { type: 'clickBuff', multiplier: 2.0, durationSeconds: 300 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
  },

  secondFoundationParanoia: {
    key: 'secondFoundationParanoia',
    name: 'Second Foundation Paranoia',
    description:
      "Paranoia sweeps the Foundation. Citizens eye their neighbors with suspicion — anyone could be a Second Foundation agent, their thoughts and emotions secretly manipulated. The propaganda network amplifies the fear. Trust, the foundation of society, is crumbling under the weight of an invisible threat.",
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'buildingCount', building: 'propagandaNetwork', count: 3 },
      { type: 'totalBuildings', count: 100 },
    ],
    choices: [
      {
        label: 'Launch an investigation',
        description: 'Spend credits to root out potential agents.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 1000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 800 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Calm the populace',
        description: 'Use influence to restore public trust.',
        effects: [
          { type: 'resourceLoss', resource: 'influence', amount: 500 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  brainScanMandates: {
    key: 'brainScanMandates',
    name: 'Loyalty Scanning Mandates',
    description:
      'The government mandates neurological loyalty testing for all officials, military officers, and scientists. The conversion chambers are repurposed as scanning stations. Citizens line up for brain scans, resentful but compliant. Some argue it\'s necessary security; others see the birth of a police state.',
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'buildingCount', building: 'conversionChamber', count: 3 },
      { type: 'buildingCount', building: 'emotionalAdjustmentCenter', count: 3 },
    ],
    choices: [
      {
        label: 'Enforce mandatory scanning',
        description: 'Root out converted agents at the cost of freedom.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
          { type: 'productionDebuff', resource: 'knowledge', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
      {
        label: 'Oppose the mandate',
        description: 'Protect civil liberties and intellectual freedom.',
        effects: [
          { type: 'resourceLoss', resource: 'influence', amount: 300 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 800 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.2, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 3,
  },

  fiftySpeakersConvene: {
    key: 'fiftySpeakersConvene',
    name: 'Speakers in Session',
    description:
      "Intelligence suggests the 50 Speakers of the Second Foundation have convened in secret session. Their meeting place is unknown — it could be anywhere, even on Terminus itself. They are recalculating the Seldon Plan, adjusting for the Mule's disruption. The galaxy's future is being decided in a room no one can find.",
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'buildingCount', building: 'speakersSanctum', count: 1 },
      { type: 'buildingCount', building: 'psychohistoryLab', count: 3 },
    ],
    choices: [
      {
        label: 'Observe from afar',
        description: 'Gather intelligence without provoking.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 1500 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Attempt to listen in',
        description: 'Risk detection for deeper intelligence.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 500 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.8, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 4,
  },

  emotionalUnderground: {
    key: 'emotionalUnderground',
    name: 'Unconverted Resistance',
    description:
      "An underground network of citizens who resisted the Mule's emotional conversion has organized covert operations against his remaining loyalists. These 'Unconverted' are rare — people with unusual mental resilience who maintained their free will. They could be powerful allies, or dangerous loose cannons.",
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'buildingCount', building: 'emotionalAdjustmentCenter', count: 3 },
      { type: 'buildingCount', building: 'mentalicsAcademy', count: 2 },
    ],
    choices: [
      {
        label: 'Support the resistance',
        description: 'Fund and supply the Unconverted network.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 800 },
          { type: 'resourceGrant', resource: 'influence', amount: 600 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
      {
        label: 'Stay neutral',
        description: 'Avoid entanglement in underground politics.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 300 },
          { type: 'resourceGrant', resource: 'credits', amount: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 4,
  },

  mentalicRecruitment: {
    key: 'mentalicRecruitment',
    name: 'Mentalic Recruitment Drive',
    description:
      "The Second Foundation is discreetly recruiting individuals with latent mentalic potential from the general population. Their scouts identify candidates through subtle tests disguised as surveys. Most recruits vanish from their old lives entirely, reappearing years later as changed people — if they reappear at all.",
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'buildingCount', building: 'mentalicsAcademy', count: 5 },
      { type: 'buildingCount', building: 'emotionalAdjustmentCenter', count: 3 },
    ],
    choices: [
      {
        label: 'Open recruitment program',
        description: 'Publicly invest in developing mentalic talent.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 1000 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
      {
        label: 'Selective, secret recruiting',
        description: 'Quietly identify and develop the best candidates.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 400 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  kalganianTradeBlockade: {
    key: 'kalganianTradeBlockade',
    name: 'Kalganian Blockade',
    description:
      "Forces loyal to the Mule's successors on Kalgan have established a blockade across major trade routes. Their warships — equipped with Foundation-derived technology — intercept and redirect merchant convoys. The blockade is bleeding the Foundation's economy and testing its resolve.",
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'eraReached', era: Era.PsychologicalInfluence },
      { type: 'shipCount', count: 3 },
    ],
    choices: [
      {
        label: 'Break the blockade by force',
        description: 'Deploy military ships to destroy the blockade.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 1000 },
          { type: 'resourceGrant', resource: 'credits', amount: 1500 },
          { type: 'resourceGrant', resource: 'influence', amount: 500 },
        ],
      },
      {
        label: 'Find alternate routes',
        description: 'Navigate around the blockade at reduced efficiency.',
        effects: [
          { type: 'productionDebuff', resource: 'credits', multiplier: 0.8, durationSeconds: 300 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 400 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 4,
  },

  psychohistoryLecture: {
    key: 'psychohistoryLecture',
    name: 'Public Psychohistory Lecture',
    description:
      'A prominent psychohistorian delivers a public lecture on the mathematical inevitability of galactic trends. The audience is captivated — but veterans of the Mule\'s era notice that the lecture subtly reshapes public opinion on key issues. Is it education, or is it Second Foundation manipulation?',
    era: Era.PsychologicalInfluence,
    conditions: [{ type: 'buildingCount', building: 'psychohistoryLab', count: 2 }],
    choices: [
      {
        label: 'Public lecture',
        description: 'Let the knowledge flow freely to the people.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 500 },
          { type: 'resourceGrant', resource: 'influence', amount: 300 },
        ],
      },
      {
        label: 'Classified briefing',
        description: 'Restrict access but gain deeper insights.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 800 },
          { type: 'productionDebuff', resource: 'influence', multiplier: 0.7, durationSeconds: 180 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 3,
  },

  preemPalverArrives: {
    key: 'preemPalverArrives',
    name: 'The Simple Farmer',
    description:
      'A seemingly ordinary farmer named Preem Palver arrives on Terminus from a rural world. He is disarmingly simple, surprisingly insightful, and strangely persuasive. He asks only to trade his agricultural goods and perhaps attend a lecture at the university. Those who meet him feel unusually... calm.',
    era: Era.PsychologicalInfluence,
    conditions: [
      { type: 'eraReached', era: Era.PsychologicalInfluence },
      { type: 'totalBuildings', count: 120 },
    ],
    choices: [
      {
        label: 'Welcome him openly',
        description: 'Extend hospitality to the charming visitor.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 1000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Investigate his background',
        description: 'Something about this farmer doesn\'t add up.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 1500 },
          { type: 'clickBuff', multiplier: 1.5, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
    heroReward: 'preemPalver',
  },

  // ─── Era 3: Galactic Reunification (new events) ──────────────────────

  peloratMythology: {
    key: 'peloratMythology',
    name: "Pelorat's Mythological Connection",
    description:
      'Scholar Janov Pelorat, a lifelong collector of origin myths, presents his findings to the Foundation: every known human culture across the galaxy shares a common thread in its mythology — a single world of origin, always described as covered in water and teeming with life. The myths are too consistent to be coincidence. Earth is real.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'eraReached', era: Era.GalacticReunification },
      { type: 'buildingCount', building: 'robotArchives', count: 2 },
      { type: 'totalBuildings', count: 160 },
    ],
    choices: [
      {
        label: 'Fund a galaxy-wide expedition',
        description: 'Search for Earth across the galaxy.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 5000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 5000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
      {
        label: 'Share findings with Gaia',
        description: 'Let Gaia\'s collective consciousness analyze the myths.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
          { type: 'resourceGrant', resource: 'influence', amount: 2000 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
    heroReward: 'janovPelorat',
  },

  blissDemonstration: {
    key: 'blissDemonstration',
    name: 'Bliss of Gaia',
    description:
      "Bliss, a woman of Gaia, demonstrates her world's abilities to stunned Foundation scientists. She controls a bird with her mind, reads emotions as easily as text, and momentarily links the consciousness of three observers into a shared experience. 'I am Gaia,' she says simply. 'We are all Gaia.'",
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'gaianBiosphere', count: 2 },
      { type: 'buildingCount', building: 'consciousnessAmplifier', count: 2 },
    ],
    choices: [
      {
        label: 'Welcome Gaian partnership',
        description: 'Embrace the potential of shared consciousness.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 2000 },
          { type: 'globalProductionBuff', multiplier: 1.3, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'influence', amount: 2000 },
        ],
      },
      {
        label: 'Study from a distance',
        description: 'Learn about Gaian abilities without full commitment.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
    heroReward: 'bliss',
  },

  fallomDiscovery: {
    key: 'fallomDiscovery',
    name: 'The Solarian Child',
    description:
      'A Solarian child named Fallom has been found — a hermaphrodite with transducer-like lobes that can directly convert electromagnetic energy. Fallom can power devices with thought, sense electric fields, and may hold the key to bridging human consciousness with electronic systems. The implications for Galaxia are profound.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'eraReached', era: Era.GalacticReunification },
      { type: 'buildingCount', building: 'consciousnessAmplifier', count: 3 },
      { type: 'totalBuildings', count: 170 },
    ],
    choices: [
      {
        label: 'Nurture and train Fallom',
        description: 'Develop Fallom\'s extraordinary abilities.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 3000 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
        ],
      },
      {
        label: 'Return Fallom to Solaria',
        description: 'Respect Solarian sovereignty and study from afar.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 3000 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
  },

  comporellonExpedition: {
    key: 'comporellonExpedition',
    name: 'The Comporellon Archives',
    description:
      'An expedition to Comporellon, one of the oldest settled worlds, uncovers archives from the Spacer era. The records speak of robots, of Earth, of the Three Laws — and of a being called \'Daneel\' who shaped the colonization of the galaxy. The Foundation\'s historians are stunned; the history they knew was only the surface layer.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'robotArchives', count: 2 },
      { type: 'buildingCount', building: 'wormholeNexus', count: 1 },
    ],
    choices: [
      {
        label: 'Full archaeological dig',
        description: 'Invest heavily in uncovering the full archive.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 4000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 5000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.4, durationSeconds: 300 },
        ],
      },
      {
        label: 'Quick data retrieval',
        description: 'Extract the most critical records and move on.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 1500 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
  },

  melpomeniaRuins: {
    key: 'melpomeniaRuins',
    name: 'Ruins of Melpomenia',
    description:
      'Explorers reach Melpomenia, once a teeming Spacer world of fifty billion souls, now utterly dead. Its automated systems still function, whispering to empty corridors. The ruins contain technology centuries ahead of Foundation science — and warnings, carved into walls by the last survivors, about the dangers of isolation and stagnation.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'robotArchives', count: 3 },
      { type: 'buildingCount', building: 'graviticPlant', count: 2 },
    ],
    choices: [
      {
        label: 'Excavate the automated systems',
        description: 'Recover advanced technology from the ruins.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 2000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 5000 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 2000 },
        ],
      },
      {
        label: 'Retrieve only the data cores',
        description: 'Minimally invasive extraction of key data.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 4000 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 7,
  },

  daneelZerothLaw: {
    key: 'daneelZerothLaw',
    name: "Daneel's Revelation",
    description:
      "R. Daneel Olivaw, the 20,000-year-old robot who has secretly guided human civilization since before the Empire, reveals himself and his Zeroth Law: 'A robot may not harm humanity, or through inaction allow humanity to come to harm.' He has been the invisible hand behind Seldon, behind Gaia, behind everything. The galaxy's true architect steps into the light.",
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'robotArchives', count: 5 },
      { type: 'buildingCount', building: 'galaxiaBeacon', count: 2 },
      { type: 'totalBuildings', count: 200 },
    ],
    choices: [
      {
        label: "Embrace Daneel's guidance",
        description: 'Accept the robot\'s 20,000-year vision for humanity.',
        effects: [
          { type: 'globalProductionBuff', multiplier: 1.5, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 5000 },
          { type: 'resourceGrant', resource: 'influence', amount: 3000 },
        ],
      },
      {
        label: 'Humanity must stand alone',
        description: 'Reject robotic guidance and forge an independent path.',
        effects: [
          { type: 'resourceGrant', resource: 'credits', amount: 5000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.5, durationSeconds: 600 },
          { type: 'clickBuff', multiplier: 2.0, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 9,
    heroReward: 'daneelOlivaw',
  },

  auroraExpedition: {
    key: 'auroraExpedition',
    name: 'Return to Aurora',
    description:
      'An expedition reaches Aurora, the first and greatest of the Spacer worlds. Once home to billions living in isolated luxury with robot servants, it is now an overgrown wilderness. Feral robot packs — positronic brains in corroded bodies — roam the ruins, still trying to serve masters who died twenty thousand years ago.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'robotArchives', count: 2 },
      { type: 'buildingCount', building: 'graviticFoundry', count: 2 },
    ],
    choices: [
      {
        label: 'Capture feral robots for study',
        description: 'Recover positronic brains from the ruins.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 2000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 4000 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 1000 },
        ],
      },
      {
        label: 'Quarantine the world',
        description: 'Declare Aurora off-limits and observe remotely.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 2000 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.2, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 5,
  },

  postPlanTransition: {
    key: 'postPlanTransition',
    name: 'Beyond the Plan',
    description:
      'With the Seldon Plan fulfilled and the Seldon Crises resolved, the Foundation faces an unprecedented question: how does a civilization that has been guided by mathematical destiny for a thousand years learn to govern itself? The Plan was a scaffold — now the building must stand on its own.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'galaxiaCore', count: 1 },
      { type: 'buildingCount', building: 'galacticSenate', count: 2 },
      { type: 'totalBuildings', count: 200 },
    ],
    choices: [
      {
        label: 'Embrace democratic governance',
        description: 'Let the people choose their own destiny.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 3000 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
      {
        label: 'Maintain technocratic leadership',
        description: 'Keep the scientists and engineers in charge.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.4, durationSeconds: 600 },
        ],
      },
      {
        label: 'Trust Galaxia consciousness',
        description: 'Let the collective mind guide civilization.',
        effects: [
          { type: 'globalProductionBuff', multiplier: 1.3, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'credits', amount: 2000 },
        ],
      },
    ],
    repeatable: false,
    cooldownSeconds: 0,
    weight: 6,
  },

  graviticShipTrials: {
    key: 'graviticShipTrials',
    name: 'Gravitic Ship Trials',
    description:
      'The first trials of gravitic-drive ships are underway. These vessels can land on any surface, maneuver in atmosphere, accelerate at hundreds of gravities — and they\'re completely silent. Test pilots report the experience is like flying a thought. The Foundation\'s naval doctrine is about to change forever.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'graviticPlant', count: 3 },
      { type: 'buildingCount', building: 'graviticFoundry', count: 2 },
    ],
    choices: [
      {
        label: 'Accelerate deployment',
        description: 'Rush the new ships into active service.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 2000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.4, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'rawMaterials', amount: 2000 },
        ],
      },
      {
        label: 'Extended testing phase',
        description: 'More testing means better long-term results.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
          { type: 'productionBuff', resource: 'nuclearTech', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  galaxyWithoutPlan: {
    key: 'galaxyWithoutPlan',
    name: 'Galaxy Without a Plan',
    description:
      "Philosophers, politicians, and psychohistorians engage in the great debate of the age: can a galaxy-spanning civilization survive without a guiding psychohistorical Plan? For a thousand years, the Seldon Plan provided direction. Now humanity must choose its own path — and the prospect is both exhilarating and terrifying.",
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'galacticSenate', count: 2 },
      { type: 'buildingCount', building: 'galaxiaBeacon', count: 1 },
    ],
    choices: [
      {
        label: 'Create a new Plan',
        description: 'Invest in designing a successor to the Seldon Plan.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 3000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Trust in organic development',
        description: 'Let civilization evolve naturally.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 2000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.2, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  galacticInfrastructure: {
    key: 'galacticInfrastructure',
    name: 'Galactic Infrastructure Push',
    description:
      'A massive infrastructure project proposes connecting major worlds via permanent wormhole corridors — stable, maintained passages through hyperspace that would reduce travel times from weeks to hours. The cost is staggering, but the economic and cultural benefits could unify the galaxy as nothing has since the Empire.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'wormholeNexus', count: 2 },
      { type: 'buildingCount', building: 'graviticPlant', count: 3 },
    ],
    choices: [
      {
        label: 'Massive wormhole corridor project',
        description: 'Go all in on galactic connectivity.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 5000 },
          { type: 'resourceLoss', resource: 'rawMaterials', amount: 2000 },
          { type: 'globalProductionBuff', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: 'Incremental improvements',
        description: 'Steady upgrades to existing infrastructure.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 2000 },
          { type: 'productionBuff', resource: 'rawMaterials', multiplier: 1.3, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 1500 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  galaxiaIntegrationWave: {
    key: 'galaxiaIntegrationWave',
    name: 'Galaxia Integration Wave',
    description:
      'Another cluster of worlds has voluntarily joined the Galaxia consciousness network. Their citizens report a profound sense of connection — sharing thoughts, feelings, and memories with billions of other minds. Some describe it as transcendence; others mourn the loss of absolute privacy. The network grows.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'galaxiaBeacon', count: 2 },
      { type: 'buildingCount', building: 'consciousnessAmplifier', count: 3 },
    ],
    choices: [
      {
        label: 'Rapid integration',
        description: 'Accelerate the merging of consciousness.',
        effects: [
          { type: 'resourceLoss', resource: 'influence', amount: 2000 },
          { type: 'globalProductionBuff', multiplier: 1.3, durationSeconds: 300 },
          { type: 'clickBuff', multiplier: 1.5, durationSeconds: 300 },
        ],
      },
      {
        label: 'Gradual, voluntary joining',
        description: 'Let worlds integrate at their own pace.',
        effects: [
          { type: 'resourceGrant', resource: 'influence', amount: 2000 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  mentalicPotentialSurvey: {
    key: 'mentalicPotentialSurvey',
    name: 'Latent Mentalic Survey',
    description:
      'A comprehensive galactic survey reveals a stunning finding: every human being possesses latent mentalic potential. The ability to sense and influence emotions is not a rare gift — it\'s a dormant universal trait. Galaxia could awaken it in everyone. The question is whether humanity is ready for universal telepathy.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'consciousnessAmplifier', count: 3 },
      { type: 'buildingCount', building: 'gaianBiosphere', count: 2 },
    ],
    choices: [
      {
        label: 'Mass awakening program',
        description: 'Invest in unlocking mentalic potential across the galaxy.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 3000 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.5, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 1000 },
        ],
      },
      {
        label: 'Selective development',
        description: 'Develop mentalic abilities in controlled settings.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 300 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  consciousnessEpidemic: {
    key: 'consciousnessEpidemic',
    name: 'Consciousness Cascade',
    description:
      "Spontaneous consciousness-linking events have erupted simultaneously on dozens of worlds. People who have never been near a consciousness amplifier are suddenly experiencing shared awareness — feeling the emotions of strangers, hearing whispered thoughts. Galaxia may be emerging naturally, without anyone's permission.",
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'galaxiaCore', count: 1 },
      { type: 'buildingCount', building: 'consciousnessAmplifier', count: 3 },
    ],
    choices: [
      {
        label: 'Channel the cascade',
        description: 'Guide the spontaneous linking into structured integration.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 2000 },
          { type: 'globalProductionBuff', multiplier: 1.4, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'influence', amount: 2000 },
        ],
      },
      {
        label: 'Dampen and study',
        description: 'Contain the phenomenon while scientists investigate.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 900,
    weight: 4,
  },

  galaxiaResistance: {
    key: 'galaxiaResistance',
    name: 'Anti-Galaxia Coalition',
    description:
      'A coalition of fiercely independent worlds has formally organized against Galaxia integration. They call themselves the Individualist Alliance, and they argue that consciousness-merging is the death of the self. Their protests are passionate, their arguments are compelling, and their fleet is not insignificant.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'galaxiaBeacon', count: 2 },
      { type: 'buildingCount', building: 'galacticSenate', count: 2 },
    ],
    choices: [
      {
        label: 'Negotiate with the coalition',
        description: 'Seek common ground with the Individualists.',
        effects: [
          { type: 'resourceLoss', resource: 'credits', amount: 3000 },
          { type: 'resourceGrant', resource: 'influence', amount: 2000 },
          { type: 'productionBuff', resource: 'influence', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
      {
        label: "Demonstrate Galaxia's benefits",
        description: 'Show skeptics what shared consciousness can achieve.',
        effects: [
          { type: 'resourceLoss', resource: 'influence', amount: 1500 },
          { type: 'globalProductionBuff', multiplier: 1.2, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 2000 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1200,
    weight: 4,
  },

  quantumCommsBreakthrough: {
    key: 'quantumCommsBreakthrough',
    name: 'Instantaneous Communication',
    description:
      'The Wormhole Nexus team, working with Singularity Forge physicists, achieves instantaneous quantum-entangled communication across galactic distances. For the first time, a message from the galactic rim reaches Terminus in zero time. The implications for governance, trade, and Galaxia coordination are transformative.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'wormholeNexus', count: 2 },
      { type: 'buildingCount', building: 'singularityForge', count: 1 },
    ],
    choices: [
      {
        label: 'Deploy across the galaxy',
        description: 'Bring instant communication to every connected world.',
        effects: [
          { type: 'resourceLoss', resource: 'nuclearTech', amount: 3000 },
          { type: 'globalProductionBuff', multiplier: 1.25, durationSeconds: 600 },
          { type: 'resourceGrant', resource: 'credits', amount: 2000 },
        ],
      },
      {
        label: 'Foundation-exclusive access',
        description: 'Keep the advantage for Foundation use only.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
          { type: 'productionBuff', resource: 'credits', multiplier: 1.3, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },

  cosmicMemoryAccess: {
    key: 'cosmicMemoryAccess',
    name: 'Cosmic Memory',
    description:
      'The Galaxia consciousness network reaches a critical threshold and, for a brief transcendent moment, grants access to a cosmic memory — the accumulated experiences, knowledge, and emotions of every connected mind across the galaxy. Billions of lifetimes of wisdom, compressed into a single instant of shared understanding. Those who experience it are changed forever.',
    era: Era.GalacticReunification,
    conditions: [
      { type: 'buildingCount', building: 'galaxiaCore', count: 1 },
      { type: 'buildingCount', building: 'gaianBiosphere', count: 3 },
      { type: 'buildingCount', building: 'consciousnessAmplifier', count: 5 },
    ],
    choices: [
      {
        label: 'Open access to all',
        description: 'Share the cosmic memory with all connected minds.',
        effects: [
          { type: 'globalProductionBuff', multiplier: 1.5, durationSeconds: 300 },
          { type: 'resourceGrant', resource: 'influence', amount: 3000 },
          { type: 'resourceGrant', resource: 'knowledge', amount: 3000 },
        ],
      },
      {
        label: 'Controlled access',
        description: 'Restrict the experience to prepared individuals.',
        effects: [
          { type: 'resourceGrant', resource: 'knowledge', amount: 5000 },
          { type: 'productionBuff', resource: 'knowledge', multiplier: 1.5, durationSeconds: 600 },
        ],
      },
    ],
    repeatable: true,
    cooldownSeconds: 1800,
    weight: 5,
  },
};

export const ALL_EVENT_KEYS = Object.keys(EVENT_DEFINITIONS);
