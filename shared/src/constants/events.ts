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
};

export const ALL_EVENT_KEYS = Object.keys(EVENT_DEFINITIONS);
