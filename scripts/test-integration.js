#!/usr/bin/env node

/**
 * Integration test: exercises all API and WebSocket endpoints,
 * checks that no NumberValue objects ({value}) leak into responses.
 *
 * Usage:
 *   node scripts/test-integration.js                     # create new user, run tests
 *   node scripts/test-integration.js --user blck --pass test  # test existing user
 *   node scripts/test-integration.js --base http://localhost:3001  # custom server URL
 */

const { WebSocket } = require('ws');

// --- CLI args ---
const args = process.argv.slice(2);
function arg(name) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : null;
}

const BASE = arg('base') || 'http://localhost:3001';
const EXISTING_USER = arg('user');
const EXISTING_PASS = arg('pass') || 'test';
const headers = { 'Content-Type': 'application/json' };

// --- Helpers ---

async function api(method, path, body, token) {
  const opts = { method, headers: { ...headers } };
  if (token) opts.headers['Authorization'] = `Bearer ${token}`;
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${path}: ${JSON.stringify(data)}`);
  return data;
}

function checkNoObjects(obj, path = '') {
  if (obj === null || obj === undefined) return [];
  if (typeof obj === 'object' && !Array.isArray(obj) && 'value' in obj && Object.keys(obj).length <= 2) {
    return [`LEAK at ${path}: ${JSON.stringify(obj)}`];
  }
  const issues = [];
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => issues.push(...checkNoObjects(v, `${path}[${i}]`)));
  } else if (typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) issues.push(...checkNoObjects(v, `${path}.${k}`));
  }
  return issues;
}

let failures = 0;
function validate(label, data) {
  const issues = checkNoObjects(data, label);
  if (issues.length) {
    console.log(`FAIL ${label}:`);
    issues.forEach((i) => console.log(`  ${i}`));
    failures++;
  } else {
    console.log(`OK   ${label}`);
  }
  return data;
}

function wsRequest(ws, msg) {
  return new Promise((resolve, reject) => {
    const rid = msg.requestId || Math.random().toString(36).slice(2);
    msg.requestId = rid;
    const handler = (raw) => {
      const data = JSON.parse(raw.toString());
      if (data.requestId === rid) {
        ws.removeListener('message', handler);
        if (data.type === 'error') reject(new Error(data.message));
        else resolve(data.data || data);
      }
    };
    ws.on('message', handler);
    ws.send(JSON.stringify(msg));
    setTimeout(() => {
      ws.removeListener('message', handler);
      reject(new Error(`Timeout: ${msg.type}`));
    }, 5000);
  });
}

function wsSend(ws, msg) {
  ws.send(JSON.stringify(msg));
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// --- Test phases ---

async function authenticate() {
  if (EXISTING_USER) {
    console.log(`Logging in as '${EXISTING_USER}'...\n`);
    const login = await api('POST', '/api/auth/login', {
      username: EXISTING_USER,
      password: EXISTING_PASS,
    });
    validate('login', login);
    return login.token;
  }

  const username = `test${Date.now().toString(36)}`;
  console.log(`Registering new user '${username}'...\n`);
  const reg = await api('POST', '/api/auth/register', {
    username,
    password: 'test123456',
  });
  validate('register', reg);
  return reg.token;
}

async function testLoadGame(token) {
  const load = await api('GET', '/api/game/load', null, token);
  validate('loadGame', load);
  const gs = load.gameState;
  console.log(`  userId: ${gs.userId} (${typeof gs.userId})`);
  console.log(`  era: ${gs.currentEra}, lifetimeCredits: ${gs.lifetimeCredits} (${typeof gs.lifetimeCredits})`);
  console.log(`  prestigeCount: ${gs.prestige.prestigeCount}, totalSP: ${gs.prestige.totalSeldonPoints}`);
  console.log(`  buildings: ${gs.buildings.filter((b) => b.count > 0).length}, upgrades: ${gs.upgrades.filter((u) => u.isPurchased).length}`);
  console.log(`  achievements: ${gs.achievements.filter((a) => a.unlockedAt).length}, heroes: ${gs.heroes.filter((h) => h.unlockedAt).length}`);
  console.log(`  ships: ${gs.ships.length}, events: ${gs.eventHistory.length}`);
  if (load.offlineEarnings) validate('offlineEarnings', load.offlineEarnings);
  return gs;
}

async function testBasicOperations(ws) {
  // Click
  const click = await wsRequest(ws, { type: 'click', clicks: 50 });
  validate('click(50)', click);

  // Buy first building
  const buy = await wsRequest(ws, { type: 'buyBuilding', buildingKey: 'survivalShelter', amount: 1 });
  validate('buyBuilding(survivalShelter x1)', buy);

  // Click more to build up credits
  for (let i = 0; i < 10; i++) {
    await wsRequest(ws, { type: 'click', clicks: 100 });
  }
  console.log('OK   click(100) x10');

  // Buy more of the same building
  const buy5 = await wsRequest(ws, { type: 'buyBuilding', buildingKey: 'survivalShelter', amount: 5 });
  validate('buyBuilding(survivalShelter x5)', buy5);
}

async function testEra0Buildup(ws) {
  // Inject resources
  wsSend(ws, {
    type: 'saveState',
    resources: { credits: 1e8, knowledge: 1e8, influence: 1e8, nuclearTech: 1e8, rawMaterials: 1e8 },
    lastTickAt: Math.floor(Date.now() / 1000),
    totalPlayTime: 500,
    totalClicks: 1500,
    lifetimeCredits: 1e8,
  });
  await sleep(500);

  // Buy era 0 buildings
  const era0Buildings = [
    'survivalShelter', 'waterReclamator', 'hydroponicsFarm', 'miningOutpost',
  ];
  for (const key of era0Buildings) {
    try {
      const r = await wsRequest(ws, { type: 'buyBuilding', buildingKey: key, amount: 10 });
      validate(`buyBuilding(${key} x10)`, r);
    } catch (e) {
      console.log(`SKIP buyBuilding(${key}): ${e.message}`);
    }
  }

  // Buy an upgrade
  try {
    const r = await wsRequest(ws, { type: 'buyUpgrade', upgradeKey: 'efficientFarming' });
    validate('buyUpgrade(efficientFarming)', r);
  } catch (e) {
    console.log(`SKIP buyUpgrade(efficientFarming): ${e.message}`);
  }

  // Sell a building
  validate(
    'sellBuilding(survivalShelter x2)',
    await wsRequest(ws, { type: 'sellBuilding', buildingKey: 'survivalShelter', amount: 2 })
  );
}

async function testPrestige(ws) {
  // Inject 2B lifetime credits for prestige
  wsSend(ws, {
    type: 'saveState',
    resources: { credits: 2e9, knowledge: 1e8, influence: 1e8, nuclearTech: 1e8, rawMaterials: 1e8 },
    lastTickAt: Math.floor(Date.now() / 1000),
    totalPlayTime: 1000,
    totalClicks: 2000,
    lifetimeCredits: 2e9,
  });
  await sleep(500);

  // Preview
  const preview = await wsRequest(ws, { type: 'getPrestigePreview' });
  validate('getPrestigePreview', preview);
  console.log(`  SP earned: ${preview.seldonPointsEarned}, newTotal: ${preview.newTotal}, multiplier: ${preview.newMultiplier}`);

  // Trigger prestige
  const prestige = await wsRequest(ws, { type: 'triggerPrestige' });
  validate('triggerPrestige', prestige);
  console.log(`  SP earned: ${prestige.seldonPointsEarned}, newEra: ${prestige.newEra}`);

  if (prestige.newEra !== 1) {
    console.log(`FAIL expected era 1, got ${prestige.newEra}`);
    failures++;
  } else {
    console.log('OK   era advanced to 1 (Trading Expansion)');
  }

  if (prestige.gameState) validate('prestige.gameState', prestige.gameState);

  // History
  const history = await wsRequest(ws, { type: 'getPrestigeHistory' });
  validate('getPrestigeHistory', history);
  if (Array.isArray(history)) {
    for (const e of history) {
      console.log(`  prestige #${e.prestigeNumber}: credits=${e.creditsAtReset} (${typeof e.creditsAtReset}), SP=${e.seldonPointsEarned}`);
    }
  }
}

async function testEra1(ws, token) {
  // Verify era persisted
  const load = await api('GET', '/api/game/load', null, token);
  validate('loadGame (era 1)', load);
  console.log(`  currentEra: ${load.gameState.currentEra}, prestigeCount: ${load.gameState.prestige.prestigeCount}`);

  // Inject resources for era 1 buildings
  wsSend(ws, {
    type: 'saveState',
    resources: { credits: 1e9, knowledge: 1e9, influence: 1e9, nuclearTech: 1e9, rawMaterials: 1e9 },
    lastTickAt: Math.floor(Date.now() / 1000),
    totalPlayTime: 2000,
    totalClicks: 3000,
    lifetimeCredits: 1e9,
  });
  await sleep(500);

  // Buy era 1 buildings
  const era1Buildings = ['tradingPost', 'manufacturingPlant', 'cargoWarehouse'];
  for (const key of era1Buildings) {
    try {
      const r = await wsRequest(ws, { type: 'buyBuilding', buildingKey: key, amount: 3 });
      validate(`buyBuilding(${key} x3)`, r);
    } catch (e) {
      console.log(`SKIP buyBuilding(${key}): ${e.message}`);
    }
  }

  // Era 0 buildings still work in era 1
  validate(
    'buyBuilding(survivalShelter x10 in era1)',
    await wsRequest(ws, { type: 'buyBuilding', buildingKey: 'survivalShelter', amount: 10 })
  );
}

async function testWebSocketQueries(ws) {
  validate('requestSync', await wsRequest(ws, { type: 'requestSync' }));
  validate('getPrestigePreview', await wsRequest(ws, { type: 'getPrestigePreview' }));
  validate('getPrestigeHistory', await wsRequest(ws, { type: 'getPrestigeHistory' }));
  validate('getStats', await wsRequest(ws, { type: 'getStats' }));
  validate('getActiveEffects', await wsRequest(ws, { type: 'getActiveEffects' }));
  validate('getEventHistory', await wsRequest(ws, { type: 'getEventHistory' }));
  validate('getEventHistoryPage', await wsRequest(ws, { type: 'getEventHistoryPage', limit: 10 }));
  validate('checkEffects', await wsRequest(ws, { type: 'checkEffects' }));

  const evCheck = await wsRequest(ws, { type: 'checkEvents' });
  validate('checkEvents', evCheck);
  if (evCheck && evCheck.eventKey) {
    const choice = await wsRequest(ws, { type: 'chooseEvent', eventKey: evCheck.eventKey, choiceIndex: 0 });
    validate(`chooseEvent(${evCheck.eventKey})`, choice);
  }
}

async function testRestEndpoints(token) {
  validate('getHeroes', await api('GET', '/api/heroes', null, token));
  validate('getActivities', await api('GET', '/api/activities', null, token));
  validate('getInventory', await api('GET', '/api/inventory', null, token));
  validate('getMe', await api('GET', '/api/auth/me', null, token));
}

// --- Main ---

(async () => {
  console.log('=== Phase 1: Authenticate ===\n');
  const token = await authenticate();

  console.log('\n=== Phase 2: Load Game ===\n');
  const gs = await testLoadGame(token);

  // Connect WebSocket
  const ws = new WebSocket(`ws://localhost:3001/ws?token=${token}`);
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  await sleep(500);

  if (EXISTING_USER) {
    // Existing user: just test all read paths + click
    console.log('\n=== Phase 3: WebSocket Queries ===\n');
    validate('click(10)', await wsRequest(ws, { type: 'click', clicks: 10 }));
    await testWebSocketQueries(ws);

    console.log('\n=== Phase 4: REST Endpoints ===\n');
    await testRestEndpoints(token);

    console.log('\n=== Phase 5: Final Reload ===\n');
    validate('finalLoad', await api('GET', '/api/game/load', null, token));
  } else {
    // New user: full lifecycle through prestige and era change
    console.log('\n=== Phase 3: Basic Operations ===\n');
    await testBasicOperations(ws);

    console.log('\n=== Phase 4: Era 0 Buildup ===\n');
    await testEra0Buildup(ws);

    console.log('\n=== Phase 5: Prestige ===\n');
    await testPrestige(ws);

    console.log('\n=== Phase 6: Era 1 ===\n');
    await testEra1(ws, token);

    console.log('\n=== Phase 7: WebSocket Queries ===\n');
    await testWebSocketQueries(ws);

    console.log('\n=== Phase 8: REST Endpoints ===\n');
    await testRestEndpoints(token);

    console.log('\n=== Phase 9: Final Verification ===\n');
    const final = await api('GET', '/api/game/load', null, token);
    validate('finalLoad', final);
    const fgs = final.gameState;
    console.log(`  era: ${fgs.currentEra}, prestigeCount: ${fgs.prestige.prestigeCount}`);
    console.log(`  buildings: ${fgs.buildings.filter((b) => b.count > 0).map((b) => `${b.buildingKey}(${b.count})`).join(', ')}`);
    console.log(`  upgrades: ${fgs.upgrades.filter((u) => u.isPurchased).map((u) => u.upgradeKey).join(', ') || 'none'}`);
  }

  ws.close();

  console.log('');
  if (failures > 0) {
    console.log(`${failures} FAILURE(S)`);
    process.exit(1);
  } else {
    console.log('All tests passed!');
  }
})().catch((e) => {
  console.error('FATAL:', e.message);
  process.exit(1);
});
