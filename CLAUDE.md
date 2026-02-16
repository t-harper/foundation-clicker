# CLAUDE.md - Foundation Game

## Project Overview

An incremental/idle game themed around Isaac Asimov's Foundation series. Players build up the Foundation on Terminus, progressing through four eras (Religious Dominance, Trading Expansion, Psychological Influence, Galactic Reunification) by constructing buildings, purchasing upgrades, building ships, running trade routes, and prestiging through Seldon Crises. Resources are credits, knowledge, influence, nuclear tech, and raw materials.

## Tech Stack

- **Monorepo**: npm workspaces (`shared`, `server`, `client`)
- **Frontend**: React 18, TypeScript, Vite 5, Tailwind CSS 3, Zustand 5, React Router 6
- **Backend**: Node.js, Express 4, better-sqlite3, JWT auth (jsonwebtoken), bcrypt, ws (WebSocket)
- **Shared**: Pure TypeScript game engine (types, constants, formulas, tick logic) -- no runtime deps
- **Dev tooling**: tsx (server watch), Vite (client HMR), TypeScript 5.6 strict mode

## Directory Structure

```
foundation-game/
  package.json              # Root workspace config
  tsconfig.base.json        # Shared TS compiler options (ES2022, strict, bundler resolution)
  shared/
    src/
      index.ts              # Re-exports all types, constants, engine
      types/
        game-state.ts       # GameState, GameStats interfaces
        resources.ts        # ResourceKey union, Resources interface, EMPTY_RESOURCES
        buildings.ts        # BuildingKey union (56 keys), BuildingDefinition, BuildingState
        upgrades.ts         # UpgradeEffect discriminated union (8 types), UpgradeDefinition, UpgradeState
        ships.ts            # ShipType, ShipStatus, ShipDefinition, ShipState, TradeRoute types
        achievements.ts     # AchievementCondition (8 types), AchievementDefinition, AchievementState
        eras.ts             # Era enum (0-3), EraDefinition with theme colors
        prestige.ts         # PrestigeState, PrestigePreview, PrestigeHistoryEntry
        heroes.ts           # HeroKey, HeroSpecialization, HeroDefinition, HeroState
        activities.ts       # ActivityKey, ActivityType, ActivityDefinition, ActiveActivity, ActivityState
        items.ts            # ItemKey, ItemCategory, ArtifactEffect, ConsumableEffect, ItemDefinition, InventoryItem, ActiveConsumable
        events.ts           # EventDefinition (with heroReward), EventCondition, EventEffect, ActiveEffect
        api.ts              # API request/response types (~20 interfaces)
      constants/
        buildings.ts        # BUILDING_DEFINITIONS -- 56 buildings across 4 eras (14 per era)
        upgrades.ts         # UPGRADE_DEFINITIONS -- 178 upgrades with effects/prerequisites
        ships.ts            # SHIP_DEFINITIONS (4 types), TRADE_ROUTE_DEFINITIONS (7 routes)
        achievements.ts     # ACHIEVEMENT_DEFINITIONS -- 19 achievements (milestones/clicks/eras)
        eras.ts             # ERA_DEFINITIONS with theme colors, ERA_UNLOCK_THRESHOLDS
        heroes.ts           # HERO_DEFINITIONS -- 16 heroes across 4 eras (4 per era)
        activities.ts       # ACTIVITY_DEFINITIONS -- 40 activities (5 research + 5 missions per era)
        items.ts            # ITEM_DEFINITIONS -- 40 items (20 artifacts + 20 consumables)
        formulas.ts         # Cost scaling, Seldon Points, prestige multiplier, offline calc
      engine/
        tick.ts             # tick(), applyClick(), processTradeShips()
        calculator.ts       # calcProductionRates(), calcClickValue(), canAfford(), etc. + artifact/consumable bonuses
        offline.ts          # calculateOfflineEarnings(), applyOfflineEarnings()
  server/
    src/
      app.ts                # Express app setup, CORS, route mounting, error handler
      index.ts              # Entry point: runs migrations, creates HTTP server, attaches WS
      db/
        connection.ts       # better-sqlite3 singleton (WAL mode, FK enforcement)
        migrate.ts          # Migration runner (manual registration pattern)
        migrations/
          001_initial_schema.ts
          002_events.ts
          003_pending_event.ts
          004_heroes_activities_inventory.ts
        queries/             # Raw SQL query functions per entity
          user-queries.ts
          game-state-queries.ts
          building-queries.ts
          upgrade-queries.ts
          ship-queries.ts
          trade-route-queries.ts
          achievement-queries.ts
          prestige-queries.ts
          event-queries.ts
          hero-queries.ts
          activity-queries.ts
          inventory-queries.ts
      middleware/
        auth.ts             # JWT Bearer token extraction and verification
        error-handler.ts    # Express error middleware (ValidationError, AuthenticationError, NotFoundError)
      routes/               # Express route handlers (thin -- delegate to services)
        auth.ts
        game.ts
        buildings.ts
        upgrades.ts
        ships.ts
        trade.ts
        prestige.ts
        achievements.ts
        heroes.ts           # GET /api/heroes
        activities.ts       # GET, POST start, POST collect
        inventory.ts        # GET, POST use consumable
      services/             # Business logic layer
        auth.ts             # register (bcrypt 10 rounds), login, JWT (7-day expiry)
        game-state.ts       # buildGameState, loadGameState, saveGameState, handleClick, projectResources
        building.ts         # buyBuilding (with resource projection), sellBuilding (50% refund)
        upgrade.ts          # buyUpgrade (prerequisite + affordability validation)
        ship.ts             # buildShip, sendShip, recallShip
        trade.ts            # unlockTradeRoute (with affordability check)
        prestige.ts         # previewPrestige, triggerPrestige, getPrestigeHistory
        achievement.ts      # checkAchievements (evaluates all condition types)
        hero.ts             # getHeroes, unlockHero
        activity.ts         # getActivities, startActivity, collectActivity
        inventory.ts        # getInventory, useConsumable
      ws/
        sync.ts             # WebSocket server -- pushes buildings/upgrades at 2 Hz
  client/
    src/
      api/                  # Typed fetch wrappers per domain
        client.ts           # ApiClient class (token from localStorage, auto-redirect on 401)
        auth.ts
        game.ts
        buildings.ts
        upgrades.ts
        ships.ts
        prestige.ts
        achievements.ts
        heroes.ts           # getHeroes
        activities.ts       # getActivities, startActivity, collectActivity
        inventory.ts        # getInventory, useConsumable
      assets/svg/
        buildings/          # 56 building art SVG components + GenericBuildingArt fallback
        ships/              # 4 ship art SVG components
        icons/              # 20 UI icon SVG components (resources, tabs, actions)
        backgrounds/        # GalaxyMap, StarField, TerminusSkyline, SeldonHologram
      components/
        buildings/          # BuildingCard, BuildingPanel, BuyAmountSelector
        upgrades/           # UpgradeCard, UpgradePanel
        ships/              # ShipCard, ShipPanel, TradeRouteManager
        achievements/       # AchievementCard, AchievementPanel
        prestige/           # PrestigePanel (preview, two-stage confirm, history)
        resources/          # ClickTarget, ResourceBar, OfflineEarningsModal
        encyclopedia/       # EncyclopediaPanel (About, Eras, Buildings, Figures tabs)
        colony-map/         # ColonyMapPanel (pan/zoom SVG), MapBuildingSlot, SeldonVaultCenter
        layout/             # GameLayout, Header, Sidebar, EraTransition
        common/             # Button, Modal, NotificationArea, NumberDisplay, ProgressBar, TabGroup, Tooltip
        research/           # ResearchPanel, ActivityCard, HeroCard, InventoryPanel, ItemCard
        settings/           # SettingsModal (stats, export/import save, hard reset)
      hooks/
        useGameEngine.ts    # RAF loop -- runs shared tick() each frame
        useAutoSave.ts      # Interval-based save to server (30s default)
        useAchievementChecker.ts  # Polls /achievements/check every 5s
        useKeyboard.ts      # Tab shortcuts (b/u/s/a/p/e/r), buy amounts (1/2/3/4/m), Esc
        useNotifications.ts # Auto-dismiss (3s) notification wrapper
        useWebSocketSync.ts # WebSocket sync with exponential backoff reconnection
      pages/
        GamePage.tsx        # Initializes hooks, loads game state, offline modal
        LoginPage.tsx       # Dual-mode (login/register) form
      store/                # Zustand store with slice pattern
        index.ts            # Combined store creation, type exports, selector re-exports
        game-slice.ts       # Resources, era, click value, play time, lifetime stats
        building-slice.ts   # Building state array + buy/sell actions
        upgrade-slice.ts    # Upgrade state array + purchase actions
        ship-slice.ts       # Ship state array + build/send/recall actions
        achievement-slice.ts
        prestige-slice.ts   # Seldon points, prestige count/multiplier
        hero-slice.ts       # Hero state array + setHeroes, unlockHero
        activity-slice.ts   # Activity state/active arrays + start/collect actions
        inventory-slice.ts  # Inventory items, active consumable + use/clear actions
        ui-slice.ts         # Active tab, buy amount, settings modal, notifications, save state
        selectors.ts        # selectGameState(), selectProductionRates(), selectClickValue(), etc.
      styles/
        index.css           # Tailwind base + era theming CSS vars + animations (506 lines)
      utils/                # Utility functions (number formatting, etc.)
```

## Development Commands

```bash
npm run dev:client        # Start Vite dev server (port 5173)
npm run dev:server        # Start Express server with tsx watch (port 3001)
npm run build             # Build all packages (shared -> server -> client)
npm run build:shared      # Build only shared
npm run build:server      # Build only server
npm run build:client      # Build only client
npm run typecheck         # Type-check all packages sequentially
```

**Important**: Shared must be built first (`npm run build:shared`) before server/client can type-check, because `shared/tsconfig.json` has `"composite": true` for project references.

## Architecture

### Client-Server Split

- **Client-authoritative ticking**: The RAF loop (`useGameEngine`) runs the shared `tick()` function every frame on the client, applying production rates * deltaTime to resources. This gives smooth, responsive resource counters.
- **Server-authoritative mutations**: All state-changing actions (buy building, purchase upgrade, build ship, prestige) go through REST API calls. The server validates affordability, applies the mutation to the DB, and returns updated state.
- **Resource projection**: Before validating any mutation, the server calls `projectResources()` to fast-forward resources from `last_tick_at` to the current time using shared engine math. This closes the gap between the 30-second auto-save interval and real-time state.
- **Shared engine**: `@foundation/shared` contains all game logic (production calculations, cost formulas, unlock checks) used identically by client and server. No game balance data lives outside `shared/`.

### Data Flow

1. On login, client calls `GET /api/game/load` to hydrate the Zustand store.
2. The RAF loop ticks resources locally using shared engine math.
3. Mutations (buy, sell, prestige) are POST requests; server validates against projected resources and returns new state.
4. Auto-save (`useAutoSave`) sends resource snapshots to the server every 30 seconds.
5. On reconnect, the server calculates offline earnings using `calculateOfflineEarnings()`.
6. WebSocket sync pushes building/upgrade state from server to client at 2 Hz.

### Game Data Philosophy

All game content (buildings, upgrades, ships, trade routes, achievements, eras, heroes, activities, items) is defined as TypeScript constants in `shared/src/constants/`. The database only stores player-specific state (counts, purchase flags, timestamps). There are no content tables in the DB.

## Key Files

| File | Purpose |
|------|---------|
| `shared/src/constants/formulas.ts` | Cost scaling (1.15^n), Seldon Point formula, prestige multiplier, offline caps |
| `shared/src/engine/calculator.ts` | Core engine: production rates, click value, affordability, unlock checks, efficiency analysis |
| `shared/src/engine/tick.ts` | Per-frame tick function, click application, trade ship processing |
| `shared/src/engine/offline.ts` | Offline earnings calculation (capped at 24h, 50% multiplier) |
| `shared/src/constants/buildings.ts` | All 56 building definitions with costs, production, unlock requirements |
| `shared/src/constants/upgrades.ts` | All 178 upgrade definitions with effects and prerequisites |
| `shared/src/constants/ships.ts` | Ship types + trade route definitions |
| `shared/src/types/game-state.ts` | `GameState` interface -- the canonical shape of all player state |
| `server/src/db/migrations/001_initial_schema.ts` | Full DB schema |
| `server/src/services/game-state.ts` | Server game logic: load, save, click, reset, resource projection |
| `server/src/middleware/auth.ts` | JWT verification middleware |
| `server/src/ws/sync.ts` | WebSocket server for real-time state push |
| `shared/src/constants/heroes.ts` | 16 hero definitions (4 per era) with specialization and duration bonuses |
| `shared/src/constants/activities.ts` | 40 activity definitions (5 research + 5 missions per era) |
| `shared/src/constants/items.ts` | 40 item definitions (20 artifacts + 20 consumables) |
| `server/src/services/activity.ts` | Activity start/collect logic with hero assignment, cost deduction, timer validation |
| `client/src/store/index.ts` | Zustand store assembly from all 10 slices |
| `client/src/store/selectors.ts` | Derived state: `selectGameState()`, production rates, click value, ROI analysis |
| `client/src/hooks/useGameEngine.ts` | RAF loop driving the client-side tick |
| `client/src/hooks/useAutoSave.ts` | 30-second auto-save interval |
| `client/src/api/client.ts` | `ApiClient` class handling auth tokens and error redirects |
| `client/src/styles/index.css` | Era theming CSS variables, animations, background effects |

## Database

SQLite via better-sqlite3. File at `./foundation.db` (configurable via `DB_PATH` env var). Uses WAL journal mode and enforces foreign keys.

### Tables

| Table | Purpose |
|-------|---------|
| `users` | `id`, `username`, `password_hash`, `created_at` |
| `game_state` | Per-user resource totals, click value, era, prestige state, timestamps, lifetime stats. PK = `user_id`. |
| `buildings` | Per-user building ownership. Composite PK `(user_id, building_key)`. Stores `count` and `is_unlocked`. |
| `upgrades` | Per-user upgrade purchase state. Composite PK `(user_id, upgrade_key)`. Stores `is_purchased`. |
| `ships` | Per-user ships. PK = `id` (UUID). Stores type, name, status, trade route assignment, departure/return times. |
| `trade_routes` | Per-user unlocked trade routes. Composite PK `(user_id, route_key)`. |
| `achievements` | Per-user unlocked achievements. Composite PK `(user_id, achievement_key)`. Stores `unlocked_at`. |
| `prestige_history` | Audit log of prestige events with credits/SP/era at reset time. |
| `events` | Per-user event state. Composite PK `(user_id, event_key)`. Stores `times_seen`, `last_choice`. |
| `heroes` | Per-user hero unlocks. Composite PK `(user_id, hero_key)`. Stores `unlocked_at`. |
| `activities` | Per-user activity completion counts. Composite PK `(user_id, activity_key)`. Stores `times_completed`. |
| `active_activities` | Currently running hero assignments. Composite PK `(user_id, activity_key)`. Stores hero, start/complete times. |
| `inventory` | Per-user item quantities. Composite PK `(user_id, item_key)`. Stores `quantity`. |
| `active_consumable` | At most one active consumable per user. PK = `user_id`. Stores item key, start/expire times. |

### Conventions

- DB queries use **snake_case** column names; TypeScript types use **camelCase**
- `game_state.last_tick_at` stores seconds (Unix timestamp)
- Ship `departed_at` / `returns_at` store milliseconds (`Date.now()`)

## API Endpoints

All endpoints except auth require a `Bearer` token in the `Authorization` header. Responses return data directly (not wrapped in an envelope).

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Create account (username 3-20 alphanumeric, password 6+ chars) |
| POST | `/api/auth/login` | Login, returns JWT (7-day expiry) |
| GET | `/api/auth/me` | Get current user info |

### Game State
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/game/load` | Load full game state (with offline earnings) |
| POST | `/api/game/save` | Save resource snapshot (returns 204) |
| POST | `/api/game/click` | Register clicks (body: `{ clicks }`, max 100) |
| POST | `/api/game/reset` | Hard reset game state (returns 204) |
| GET | `/api/game/stats` | Get game statistics |

### Buildings
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/buildings` | List user buildings |
| POST | `/api/buildings/buy` | Buy building(s) (body: `{ buildingKey, amount }`) |
| POST | `/api/buildings/sell` | Sell building(s) (body: `{ buildingKey, amount }`, 50% refund) |

### Upgrades
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/upgrades` | List user upgrades |
| POST | `/api/upgrades/buy` | Purchase upgrade (body: `{ upgradeKey }`) |

### Ships
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/ships` | List user ships |
| POST | `/api/ships/build` | Build a ship (body: `{ shipType, name }`, name max 50 chars) |
| POST | `/api/ships/send` | Send ship on trade route (body: `{ shipId, tradeRouteKey }`) |
| POST | `/api/ships/recall` | Recall a trading ship (body: `{ shipId }`) |

### Trade Routes
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/trade-routes` | List user trade routes |
| POST | `/api/trade-routes/unlock` | Unlock a trade route (body: `{ routeKey }`) |

### Prestige
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/prestige/preview` | Preview Seldon Point earnings |
| POST | `/api/prestige/trigger` | Trigger a Seldon Crisis (prestige reset) |
| GET | `/api/prestige/history` | Get prestige history log |

### Achievements
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/achievements` | List user achievements |
| POST | `/api/achievements/check` | Check and unlock new achievements |

### Heroes
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/heroes` | List user heroes (with unlock state) |

### Activities
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/activities` | List activity states + active activities |
| POST | `/api/activities/start` | Start activity (body: `{ activityKey, heroKey }`) |
| POST | `/api/activities/collect` | Collect completed activity (body: `{ activityKey }`) |

### Inventory
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/inventory` | List inventory items + active consumable |
| POST | `/api/inventory/use` | Use a consumable (body: `{ itemKey }`) |

### WebSocket
| Path | Description |
|------|-------------|
| `/ws?token=<jwt>` | Server-push sync of buildings/upgrades at 2 Hz |

## Game Engine

### Tick System

The client runs `useGameEngine`, a React hook that starts a `requestAnimationFrame` loop once the game state is loaded. Each frame:

1. Compute `deltaSeconds` from the last frame timestamp.
2. Call `tick(gameState, deltaSeconds)` from `@foundation/shared`.
3. `tick()` calls `calcProductionRates()` to get per-second rates, then multiplies by delta.
4. Update the Zustand store with new resources and increment play time.

### Production Rate Calculation (`calcProductionRates`)

For each building owned, sum `count * baseProduction` per resource. Then apply a 7-layer multiplier chain:
1. **Building multipliers** from purchased upgrades (per-building, e.g. "Efficient Farming" doubles hydroponicsFarm output)
2. **Resource multipliers** from upgrades (per-resource-type, e.g. all credits +50%)
3. **Achievement multipliers** (global or per-resource)
4. **Prestige multiplier** (`1 + totalSeldonPoints * 0.02`)
5. **Global multiplier** from upgrades (e.g. "Second Foundation Revealed" = 2x all)
6. **Artifact bonuses** from inventory items (permanent per-resource or global multipliers, stacking by quantity)
7. **Active consumable** timed buffs (per-resource or global production boosts with expiry)

Final rate = `baseRate * buildingMult * resourceMult * achievementMult * prestigeMult * globalMult * artifactMult * consumableMult`

### Cost Formulas (`formulas.ts`)

- **Building cost**: `floor(baseCost * 1.15^owned)` -- standard exponential scaling
- **Bulk cost**: geometric series formula for buying N buildings at once
- **Max affordable**: inverse of bulk cost formula to find max purchasable count
- **Seldon Points**: `floor(150 * sqrt(lifetimeCredits / 1e9))` -- requires 1B credits minimum
- **Prestige multiplier**: `1 + totalSeldonPoints * 0.02` -- 2% per SP

### Click System

Base click value = 1 credit, modified by 4 upgrade effect types:
1. **`clickMultiplier`**: Flat multiplier on click value
2. **`clickPerBuilding`**: Fixed credits added per building owned
3. **`clickBuildingScale`**: Multiplier that scales with a specific building's count
4. **`clickTotalBuildingScale`**: Multiplier that scales with total building count

Additionally, `clickResourceYield` upgrades grant bonus non-credit resources per click (as a fraction of the credit click value). All click values are further multiplied by the prestige multiplier, achievement click multipliers, artifact `clickMultiplier` bonuses, and active consumable `clickBuff` effects.

### Upgrade Effect Types

The 8 discriminated union types in `UpgradeEffect`:
- `clickMultiplier` -- flat multiplier on click value
- `clickPerBuilding` -- fixed credits per building owned
- `clickBuildingScale` -- scales with specific building count
- `clickTotalBuildingScale` -- scales with total buildings
- `clickResourceYield` -- bonus resources from clicking
- `buildingMultiplier` -- per-building production multiplier
- `resourceMultiplier` -- per-resource production multiplier
- `globalMultiplier` -- universal production multiplier
- `unlockFeature` -- feature gate (for future use)

### Offline Earnings (`offline.ts`)

When a player returns after being away:
- Production rates are calculated from current state.
- Earnings = `rates * min(elapsed, 86400) * 0.5` (50% of normal, capped at 24 hours).
- Trade ships that completed their routes during offline time are docked.
- The server computes this on `GET /api/game/load`.

### Era Progression

- **Era 0 (Religious Dominance)**: Always available
- **Era 1 (Trading Expansion)**: Requires first prestige (`prestigeCount >= 1`)
- **Era 2 (Psychological Influence)**: Requires 100 Seldon Points
- **Era 3 (Galactic Reunification)**: Requires 10,000 Seldon Points

## State Management

### Zustand Store Structure

The store uses the **slice pattern** -- each domain has its own `StateCreator` function that defines state + actions, all merged into a single store via `create()`.

| Slice | State | Key Actions |
|-------|-------|-------------|
| `game-slice` | resources, clickValue, currentEra, lastTickAt, totalPlayTime, totalClicks, lifetimeCredits, isLoaded | setResources, updateResource, addClick, setGameState, incrementPlayTime, setLastTickAt |
| `building-slice` | buildings (BuildingState[]) | setBuildings, updateBuilding, unlockBuilding |
| `upgrade-slice` | upgrades (UpgradeState[]) | setUpgrades, purchaseUpgrade |
| `ship-slice` | ships (ShipState[]), tradeRoutes (TradeRouteState[]) | setShips, addShip, updateShip, removeShip, setTradeRoutes, unlockTradeRoute |
| `achievement-slice` | achievements (AchievementState[]) | setAchievements, unlockAchievement |
| `prestige-slice` | seldonPoints, totalSeldonPoints, prestigeCount, prestigeMultiplier | setPrestige, applyPrestige |
| `ui-slice` | activeTab, buyAmount, showSettings, showOfflineModal, offlineEarnings, notifications, isSaving | setActiveTab, setBuyAmount, toggleSettings, showOfflineEarnings, addNotification, setIsSaving |
| `hero-slice` | heroes (HeroState[]) | setHeroes, unlockHero |
| `activity-slice` | activities (ActivityState[]), activeActivities (ActiveActivity[]) | setActivities, setActiveActivities, addActiveActivity, removeActiveActivity, updateActivityCompletion |
| `inventory-slice` | inventory (InventoryItem[]), activeConsumable (ActiveConsumable \| null) | setInventory, setActiveConsumable, clearExpiredConsumable |

### Selectors (`selectors.ts`)

- `selectGameState(state)`: Assembles all slices into a canonical `GameState` object for engine functions.
- `selectProductionRates(state)`: Calls shared `calcProductionRates()` on assembled state.
- `selectClickValue(state)`: Calls shared `calcClickValue()` on assembled state.
- `selectClickResourceYields(state)`: Bonus resource yields from clicking.
- `selectTotalBuildings(state)`: Sum of all building counts.
- `selectGameStats(state)`: Summary stats object for display.
- `selectBestCreditROIBuilding(state)`: Most cost-efficient building for credits.
- `selectBestCreditROIUpgrade(state)`: Most cost-efficient unpurchased upgrade for credits.

## SVG Components

### Conventions

All SVG art is in `client/src/assets/svg/` organized by category (`buildings/`, `ships/`, `icons/`, `backgrounds/`). Each is a React functional component with barrel exports via `index.ts`. Art maps (`BUILDING_ART_MAP`, `SHIP_ART_MAP`) map game keys to components.

**Building/Ship Art Props**:
```ts
interface BuildingArtProps {
  className?: string;   // For Tailwind styling
  size?: number;        // Width/height in px (default 64)
  level?: 1 | 2 | 3;   // Visual detail level (conditional SVG elements)
}
```

**Conventions**:
- ViewBox is `0 0 64 64` for buildings and ships, `0 0 24 24` for icons.
- Use `currentColor` for fills and strokes (inherits text color from parent for era theming).
- Use `opacity` values for depth (0.08-0.25 for fills, 0.2-0.7 for strokes).
- `level` prop gates visual complexity: level 1 = base, level 2 = extra structures, level 3 = energy effects/particles.
- Building level is derived from count: 1-9 = Lv1, 10-49 = Lv2, 50+ = Lv3.
- Always include `role="img"` and `aria-label` for accessibility.
- Icon components are simpler -- typically just `className` and `size` props, no level gating.
- Background components use variable viewBoxes and may include embedded CSS animations (e.g. SeldonHologram).

### Asset Inventory

| Category | Count | Notes |
|----------|-------|-------|
| Building art | 56 + 1 fallback + 2 legacy | All 56 BuildingKeys have custom art |
| Ship art | 4 | All 4 ShipTypes have custom art |
| Icons | 20 | 5 resource, 9 navigation, 6 utility |
| Backgrounds | 4 | StarField, TerminusSkyline, GalaxyMap, SeldonHologram |

## Era Theming

Era-specific colors are applied via CSS custom properties set on `GameLayout`:
- `--era-primary`, `--era-secondary`, `--era-accent`, `--era-bg`, `--era-surface`, `--era-text`
- Defined per era via `[data-era="N"]` selectors in `client/src/styles/index.css`
- All SVGs inherit colors via `currentColor`, so era changes cascade automatically
- Background effects (starfield parallax, tech-grid, scanlines) are layered behind content

| Era | Palette |
|-----|---------|
| 0 - Religious Dominance | Warm gold / cream / dark brown |
| 1 - Trading Expansion | Teal / cyan / dark teal-grey |
| 2 - Psychological Influence | Purple / lavender / dark purple |
| 3 - Galactic Reunification | Cyan / ice-blue / dark cyan-grey |

## Adding New Content

### Adding a New Building

1. **Type**: Add the key to the `BuildingKey` union in `shared/src/types/buildings.ts`.
2. **Definition**: Add an entry to `BUILDING_DEFINITIONS` in `shared/src/constants/buildings.ts` with key, name, description, era, baseCost, production rates, costMultiplier (1.15), and unlockRequirement.
3. **SVG Art**: Create `client/src/assets/svg/buildings/YourBuildingArt.tsx` following the existing pattern (64x64 viewBox, currentColor, level prop). Export from the barrel `index.ts` and add to `BUILDING_ART_MAP`.
4. **No DB changes needed** -- building state rows are created dynamically per building_key.

### Adding a New Upgrade

1. **Definition**: Add an entry to `UPGRADE_DEFINITIONS` in `shared/src/constants/upgrades.ts` with key, name, description, era, cost, effects array, and optionally prerequisites/requiredBuilding.
2. **Effect types**: `clickMultiplier`, `clickPerBuilding`, `clickBuildingScale`, `clickTotalBuildingScale`, `clickResourceYield`, `buildingMultiplier`, `resourceMultiplier`, `globalMultiplier`, `unlockFeature`.
3. **No other changes needed** -- the calculator iterates all purchased upgrades dynamically.

### Adding a New Ship Type

1. **Type**: Add to `ShipType` union in `shared/src/types/ships.ts`.
2. **Definition**: Add to `SHIP_DEFINITIONS` in `shared/src/constants/ships.ts`.
3. **SVG Art**: Create `client/src/assets/svg/ships/YourShipArt.tsx`, export from barrel, add to `SHIP_ART_MAP`.

### Adding a New Trade Route

1. **Definition**: Add to `TRADE_ROUTE_DEFINITIONS` in `shared/src/constants/ships.ts` with key, name, description, era, duration (seconds), reward, unlockCost, and requiredShipType.

### Adding a New Achievement

1. **Definition**: Add to `ACHIEVEMENT_DEFINITIONS` in `shared/src/constants/achievements.ts`.
2. **Condition types**: `resourceTotal`, `buildingCount`, `totalBuildings`, `totalClicks`, `prestigeCount`, `eraReached`, `shipCount`, `playTime`.
3. **Reward types** (optional): `clickMultiplier`, `globalMultiplier`, `resourceMultiplier`.
4. **Icon**: Reference an existing icon key or add a new one.

### Adding a New Hero

1. **Definition**: Add an entry to `HERO_DEFINITIONS` in `shared/src/constants/heroes.ts` with key, name, title, description, era, specialization (`research` | `mission`), and durationBonus (e.g. 0.85 = 15% faster).
2. **Event link**: Add `heroReward: 'yourHeroKey'` to the triggering event in `shared/src/constants/events.ts`. The hero unlocks when the player makes their choice in that event.
3. **No DB changes needed** -- hero rows are created via `unlockHero()` when the event fires.

### Adding a New Activity

1. **Definition**: Add an entry to `ACTIVITY_DEFINITIONS` in `shared/src/constants/activities.ts` with key, name, description, era, type (`research` | `mission`), cost (`Partial<Resources>`), durationSeconds, rewards (`ItemReward[]`), repeatable, and maxCompletions.
2. **Item rewards**: Reference item keys from `ITEM_DEFINITIONS`. Each reward has `{ itemKey, quantity }`.
3. **No other changes needed** -- the Research panel displays all activities dynamically.

### Adding a New Item

1. **Definition**: Add an entry to `ITEM_DEFINITIONS` in `shared/src/constants/items.ts` with key, name, description, era, category (`artifact` | `consumable`), and effect.
2. **Artifact effects**: `resourceMultiplier` (per-resource), `globalMultiplier`, `clickMultiplier` -- permanent, stacking by quantity.
3. **Consumable effects**: `productionBuff` (per-resource), `globalProductionBuff`, `clickBuff` -- timed, with `durationSeconds`.
4. **No other changes needed** -- calculator.ts iterates all inventory items dynamically.

### Adding a New Era

This is a larger change:
1. Add value to `Era` enum in `shared/src/types/eras.ts`.
2. Add definition to `ERA_DEFINITIONS` and threshold to `ERA_UNLOCK_THRESHOLDS` in `shared/src/constants/eras.ts` (include theme colors).
3. Update `calcCurrentEra()` in `shared/src/engine/calculator.ts`.
4. Add buildings, upgrades, ships, trade routes, heroes, activities, and items for the new era.
5. Add era CSS variables in `client/src/styles/index.css` under a new `[data-era="N"]` selector.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `JWT_SECRET` | `foundation-dev-secret-key` | Secret for signing JWTs |
| `PORT` | `3001` | Server port |
| `DB_PATH` | `./foundation.db` | Path to SQLite database file |

## Conventions

- All packages use ESM (`"type": "module"`) with `.js` extensions in server imports (Vite handles client imports without extensions).
- TypeScript strict mode everywhere; target ES2022.
- Server uses `tsx watch` for development (auto-restart on changes).
- API responses return data directly (no envelope wrapper).
- Auth token stored in `localStorage` under key `foundation_token`.
- `ApiClient` auto-redirects to `/login` on 401 responses.
- Auto-save interval is 30 seconds (`AUTO_SAVE_INTERVAL` in formulas.ts).
- `Resources` type has no index signature -- use `resources[key as ResourceKey]` for dynamic access.
- DB queries use snake_case column names; TypeScript types use camelCase.
- Routes define their full paths (e.g. `/api/auth/login`) and are mounted at root in `app.ts`.

## Known Issues

- **Prestige multiplier mismatch**: `shared/formulas.ts` uses `0.02` per SP but `server/prestige-queries.ts` SQL uses `0.01` per SP in the reset calculation.
- **Trade route rewards not collected**: Ships dock when their route completes, but the reward resources defined in `TRADE_ROUTE_DEFINITIONS` are never applied to the player's account.
- **Ship timestamp units**: Ship `departed_at`/`returns_at` use milliseconds (`Date.now()`) while `game_state.last_tick_at` uses seconds, requiring care when comparing.
- **Legacy SVG components**: `VaultOfKnowledgeArt` and `HyperspaceRelayArt` exist in the buildings directory but are not in `BUILDING_ART_MAP` (dead code).
