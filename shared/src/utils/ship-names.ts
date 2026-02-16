const ADJECTIVES = [
  'Swift', 'Golden', 'Silent', 'Bold', 'Crimson',
  'Iron', 'Silver', 'Bright', 'Dark', 'Stellar',
  'Lone', 'Valiant', 'Distant', 'Burning', 'Frozen',
  'Ancient', 'Noble', 'Wandering', 'Endless', 'Hidden',
  'Radiant', 'Fearless', 'Serene', 'Resolute', 'Vigilant',
  'Phantom', 'Celestial', 'Imperial', 'Rogue', 'Defiant',
  'Eternal', 'Lucky', 'Daring', 'Faithful', 'Soaring',
  'Proud', 'Relentless', 'Blazing', 'Quiet', 'Restless',
  'Steadfast', 'Nimble', 'Mighty', 'Cunning', 'Tempest',
  'Sapphire', 'Emerald', 'Obsidian', 'Amber', 'Ivory',
];

const NOUNS = [
  'Nebula', 'Terminus', 'Horizon', 'Comet', 'Vanguard',
  'Pioneer', 'Meridian', 'Destiny', 'Voyager', 'Sentinel',
  'Aurora', 'Eclipse', 'Phoenix', 'Tempest', 'Zenith',
  'Catalyst', 'Nomad', 'Corsair', 'Venture', 'Beacon',
  'Frontier', 'Odyssey', 'Pulsar', 'Spectre', 'Herald',
  'Titan', 'Warden', 'Pilgrim', 'Oracle', 'Mariner',
  'Pathfinder', 'Seeker', 'Arrow', 'Spire', 'Stardust',
  'Condor', 'Raptor', 'Citadel', 'Forge', 'Haven',
  'Solaris', 'Drifter', 'Summit', 'Talon', 'Crest',
  'Trantor', 'Gaia', 'Seldon', 'Hardin', 'Arkady',
];

/**
 * Generate a random Foundation-themed ship name.
 * Format: "[Adjective] [Noun] [Number]"
 * 50 * 50 * 50 = 125,000 possible combinations.
 */
export function generateShipName(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(Math.random() * 50) + 1;
  return `${adj} ${noun} ${num}`;
}
