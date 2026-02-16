# CLAUDE.md - Foundation Game

## Project Overview

An incremental/idle game themed around Isaac Asimov's Foundation series. Players build up the Foundation on Terminus, progressing through four eras (Religious Dominance, Trading Expansion, Psychological Influence, Galactic Reunification) by constructing buildings, purchasing upgrades, building ships, running trade routes, and prestiging through Seldon Crises. Resources are credits, knowledge, influence, nuclear tech, and raw materials.

## Tech Stack

- **Monorepo**: npm workspaces (`shared`, `server`, `client`)
- **Frontend**: React 18, TypeScript, Vite 5, Tailwind CSS 3, Zustand 5, React Router 6
- **Backend**: Node.js, Express 4, better-sqlite3, JWT auth (jsonwebtoken), bcrypt
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
        buildings.ts        # BuildingKey union, BuildingDefinition, BuildingState
        upgrades.ts         # UpgradeEffect discriminated union, UpgradeDefinition, UpgradeState
        ships.ts            # ShipType, ShipStatus, ShipDefinition, ShipState, TradeRoute types
        achievements.ts     # AchievementDefinition, AchievementState
        eras.ts             # Era enum (0-3), EraDefinition with theme colors
        prestige.ts         # PrestigeState, PrestigePreview, PrestigeHistoryEntry
        api.ts              # API request/response types
      constants/
        buildings.ts        # BUILDING_DEFINITIONS -- 14 buildings across 4 eras
        upgrades.ts         # UPGRADE_DEFINITIONS -- 18 upgrades with effects/prerequisites
        ships.ts            # SHIP_DEFINITIONS (4 types), TRADE_ROUTE_DEFINITIONS (7 routes)
        achievements.ts     # ACHIEVEMENT_DEFINITIONS -- ~20 achievements (milestones/clicks/eras)
        eras.ts             # ERA_DEFINITIONS with theme colors, ERA_UNLOCK_THRESHOLDS
        formulas.ts         # Cost scaling, Seldon Points, prestige multiplier, offline calc
      engine/
        tick.ts             # tick(), applyClick(), processTradeShips()
        calculator.ts       # calcProductionRates(), calcClickValue(), canAfford(), etc.
        offline.ts          # calculateOfflineEarnings(), applyOfflineEarnings()
  server/
    src/
      db/
        connection.ts       # better-sqlite3 singleton (WAL mode, FK enforcement)
        migrate.ts          # Migration runner
        migrations/
          001_initial_schema.ts
        queries/             # Raw SQL query functions per entity
          user-queries.ts
          game-state-queries.ts
          building-queries.ts
          upgrade-queries.ts
          ship-queries.ts
          trade-route-queries.ts
          achievement-queries.ts
          prestige-queries.ts
      middleware/
        auth.ts             # JWT Bearer token extraction and verification
        error-handler.ts    # Express error middleware
      routes/               # Express route handlers (thin -- delegate to services)
        auth.ts
        game.ts
        buildings.ts
        upgrades.ts
        ships.ts
        trade.ts
        prestige.ts
        achievements.ts
      services/             # Business logic layer
        auth.ts
        game-state.ts
        building.ts
        upgrade.ts
        ship.ts
        trade.ts
        prestige.ts
        achievement.ts
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
      assets/svg/
        buildings/          # 14 building art SVG components (NuclearPlantArt, etc.)
        ships/              # 4 ship art SVG components
        icons/              # UI icon SVG components (resources, tabs, actions)
        backgrounds/        # GalaxyMap, StarField, TerminusSkyline
      components/
        buildings/          # BuildingCard, BuildingPanel, BuyAmountSelector
        upgrades/           # UpgradeCard, UpgradePanel
        ships/              # ShipCard, ShipPanel, TradeRouteManager
        achievements/       # AchievementCard, AchievementPanel
        prestige/           # PrestigePanel
        resources/          # ClickTarget, ResourceBar
        encyclopedia/       # EncyclopediaPanel
        layout/             # GameLayout, Header, Sidebar
        common/             # Button, Modal, NotificationArea, NumberDisplay, ProgressBar, TabGroup, Tooltip
        settings/           # SettingsModal
      hooks/
        useGameEngine.ts    # RAF loop -- runs shared tick() each frame
        useAutoSave.ts      # Interval-based save to server (30s default)
        useAchievementChecker.ts
        useKeyboard.ts
        useNotifications.ts
      pages/
        GamePage.tsx
        LoginPage.tsx
      store/                # Zustand store with slice pattern
        index.ts            # Combined store creation, type exports, selector re-exports
        game-slice.ts       # Resources, era, click value, play time, lifetime stats
        building-slice.ts   # Building state array + buy/sell actions
        upgrade-slice.ts    # Upgrade state array + purchase actions
        ship-slice.ts       # Ship state array + build/send/recall actions
        achievement-slice.ts
        prestige-slice.ts   # Seldon points, prestige count/multiplier
        ui-slice.ts         # Active tab, buy amount, settings modal, notifications, save state
        selectors.ts        # selectGameState(), selectProductionRates(), selectClickValue(), etc.
      styles/               # Tailwind config / global CSS
      utils/                # Utility functions
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

## Architecture

### Client-Server Split

- **Client-authoritative ticking**: The RAF loop (`useGameEngine`) runs the shared `tick()` function every frame on the client, applying production rates * deltaTime to resources. This gives smooth, responsive resource counters.
- **Server-authoritative mutations**: All state-changing actions (buy building, purchase upgrade, build ship, prestige) go through REST API calls. The server validates affordability, applies the mutation to the DB, and returns updated state.
- **Shared engine**: `@foundation/shared` contains all game logic (production calculations, cost formulas, unlock checks) used identically by client and server. No game balance data lives outside `shared/`.

### Data Flow

1. On login, client calls `GET /api/game/load` to hydrate the Zustand store.
2. The RAF loop ticks resources locally using shared engine math.
3. Mutations (buy, sell, prestige) are POST requests; server validates and returns new state.
4. Auto-save (`useAutoSave`) sends resource snapshots to the server every 30 seconds.
5. On reconnect, the server calculates offline earnings using `calculateOfflineEarnings()`.

### Game Data Philosophy

All game content (buildings, upgrades, ships, trade routes, achievements, eras) is defined as TypeScript constants in `shared/src/constants/`. The database only stores player-specific state (counts, purchase flags, timestamps). There are no content tables in the DB.

## Key Files

| File | Purpose |
|------|---------|
| `shared/src/constants/formulas.ts` | Cost scaling (1.15^n), Seldon Point formula, prestige multiplier, offline caps |
| `shared/src/engine/calculator.ts` | Core engine: production rates, click value, affordability, unlock checks |
| `shared/src/engine/tick.ts` | Per-frame tick function, click application, trade ship processing |
| `shared/src/engine/offline.ts` | Offline earnings calculation (capped at 24h, 50% multiplier) |
| `shared/src/constants/buildings.ts` | All 14 building definitions with costs, production, unlock requirements |
| `shared/src/constants/upgrades.ts` | All 18 upgrade definitions with effects and prerequisites |
| `shared/src/constants/ships.ts` | Ship types + trade route definitions |
| `shared/src/types/game-state.ts` | `GameState` interface -- the canonical shape of all player state |
| `server/src/db/migrations/001_initial_schema.ts` | Full DB schema |
| `server/src/middleware/auth.ts` | JWT verification middleware |
| `client/src/store/index.ts` | Zustand store assembly from all slices |
| `client/src/store/selectors.ts` | Derived state: `selectGameState()` assembles slices into a `GameState` |
| `client/src/hooks/useGameEngine.ts` | RAF loop driving the client-side tick |
| `client/src/hooks/useAutoSave.ts` | 30-second auto-save interval |
| `client/src/api/client.ts` | `ApiClient` class handling auth tokens and error redirects |

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

## API Endpoints

All endpoints except auth require a `Bearer` token in the `Authorization` header.

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Create account (username, password) |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/me` | Get current user info |

### Game State
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/game/load` | Load full game state (with offline earnings) |
| POST | `/api/game/save` | Save resource snapshot |
| POST | `/api/game/click` | Register clicks (body: `{ clicks }`) |
| POST | `/api/game/reset` | Hard reset game state |
| GET | `/api/game/stats` | Get game statistics |

### Buildings
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/buildings` | List user buildings |
| POST | `/api/buildings/buy` | Buy building(s) (body: `{ buildingKey, amount }`) |
| POST | `/api/buildings/sell` | Sell building(s) (body: `{ buildingKey, amount }`) |

### Upgrades
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/upgrades` | List user upgrades |
| POST | `/api/upgrades/buy` | Purchase upgrade (body: `{ upgradeKey }`) |

### Ships
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/ships` | List user ships |
| POST | `/api/ships/build` | Build a ship (body: `{ shipType, name }`) |
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

## Game Engine

### Tick System

The client runs `useGameEngine`, a React hook that starts a `requestAnimationFrame` loop once the game state is loaded. Each frame:

1. Compute `deltaSeconds` from the last frame timestamp.
2. Call `tick(gameState, deltaSeconds)` from `@foundation/shared`.
3. `tick()` calls `calcProductionRates()` to get per-second rates, then multiplies by delta.
4. Update the Zustand store with new resources and increment play time.

### Production Rate Calculation (`calcProductionRates`)

For each building owned, sum `count * baseProduction` per resource. Then apply:
1. **Building multipliers** from purchased upgrades (per-building)
2. **Resource multipliers** from upgrades (per-resource-type, e.g. all credits +50%)
3. **Achievement multipliers** (global or per-resource)
4. **Prestige multiplier** (`1 + totalSeldonPoints * 0.02`)
5. **Global multiplier** from upgrades (e.g. "Second Foundation Revealed" = 2x all)

Final rate = `baseRate * buildingMult * resourceMult * achievementMult * prestigeMult * globalMult`

### Cost Formulas (`formulas.ts`)

- **Building cost**: `floor(baseCost * 1.15^owned)` -- standard exponential scaling
- **Bulk cost**: geometric series formula for buying N buildings at once
- **Max affordable**: inverse of bulk cost formula to find max purchasable count
- **Seldon Points**: `floor(150 * sqrt(lifetimeCredits / 1e9))` -- requires 1B credits minimum
- **Prestige multiplier**: `1 + totalSeldonPoints * 0.02` -- 2% per SP

### Offline Earnings (`offline.ts`)

When a player returns after being away:
- Production rates are calculated from current state.
- Earnings = `rates * min(elapsed, 86400) * 0.5` (50% of normal, capped at 24 hours).
- Trade ships that completed their routes during offline time have their rewards collected.
- The server computes this on `GET /api/game/load`.

### Click System

- Base click value = 1 credit.
- Modified by click multiplier upgrades and achievements.
- Further multiplied by prestige multiplier.
- Formula: `BASE_CLICK_VALUE * clickMult * prestigeMultiplier`

## State Management

### Zustand Store Structure

The store uses the **slice pattern** -- each domain has its own `StateCreator` function that defines state + actions, all merged into a single store via `create()`.

| Slice | State | Key Actions |
|-------|-------|-------------|
| `game-slice` | resources, clickValue, currentEra, lastTickAt, totalPlayTime, totalClicks, lifetimeCredits, isLoaded | setResources, addClick, setGameState, incrementPlayTime |
| `building-slice` | buildings (BuildingState[]) | setBuildings, buyBuilding, sellBuilding |
| `upgrade-slice` | upgrades (UpgradeState[]) | setUpgrades, buyUpgrade |
| `ship-slice` | ships (ShipState[]), tradeRoutes (TradeRouteState[]) | setShips, buildShip, sendShip, recallShip |
| `achievement-slice` | achievements (AchievementState[]) | setAchievements, unlockAchievement |
| `prestige-slice` | seldonPoints, totalSeldonPoints, prestigeCount, prestigeMultiplier | setPrestigeState, triggerPrestige |
| `ui-slice` | activeTab, buyAmount, showSettings, notifications, offlineEarnings, isSaving | setActiveTab, setBuyAmount, toggleSettings, addNotification |

### Selectors (`selectors.ts`)

- `selectGameState(state)`: Assembles all slices into a canonical `GameState` object for engine functions.
- `selectProductionRates(state)`: Calls shared `calcProductionRates()` on assembled state.
- `selectClickValue(state)`: Calls shared `calcClickValue()` on assembled state.
- `selectTotalBuildings(state)`: Sum of all building counts.
- `selectGameStats(state)`: Summary stats object for display.

## SVG Components

### Conventions

All SVG art is in `client/src/assets/svg/` organized by category (`buildings/`, `ships/`, `icons/`, `backgrounds/`). Each is a React functional component with barrel exports via `index.ts`.

**Building/Ship Art Props**:
```ts
interface BuildingArtProps {
  className?: string;   // For Tailwind styling
  size?: number;        // Width/height in px (default 64)
  level?: 1 | 2 | 3;   // Visual detail level (conditional SVG elements)
}
```

**Conventions**:
- ViewBox is `0 0 64 64` for buildings, varies for ships/icons.
- Use `currentColor` for fills and strokes (inherits text color from parent).
- Use `opacity` values for depth (0.1-0.6 for fills, 0.3-0.7 for accents).
- `level` prop gates visual complexity: level 1 = base, level 2 = extra structures, level 3 = energy effects/particles.
- Always include `role="img"` and `aria-label` for accessibility.

**Icon components** are simpler -- typically just `className` and `size` props, no level gating.

## Adding New Content

### Adding a New Building

1. **Type**: Add the key to the `BuildingKey` union in `shared/src/types/buildings.ts`.
2. **Definition**: Add an entry to `BUILDING_DEFINITIONS` in `shared/src/constants/buildings.ts` with key, name, description, era, baseCost, production rates, costMultiplier (1.15), and unlockRequirement.
3. **SVG Art**: Create `client/src/assets/svg/buildings/YourBuildingArt.tsx` following the existing pattern (64x64 viewBox, currentColor, level prop). Export from the barrel `index.ts`.
4. **No DB changes needed** -- building state rows are created dynamically per building_key.

### Adding a New Upgrade

1. **Definition**: Add an entry to `UPGRADE_DEFINITIONS` in `shared/src/constants/upgrades.ts` with key, name, description, era, cost, effects array, and optionally prerequisites/requiredBuilding.
2. **Effect types**: `clickMultiplier`, `buildingMultiplier`, `resourceMultiplier`, `globalMultiplier`, `unlockFeature`.
3. **No other changes needed** -- the calculator iterates all purchased upgrades dynamically.

### Adding a New Ship Type

1. **Type**: Add to `ShipType` union in `shared/src/types/ships.ts`.
2. **Definition**: Add to `SHIP_DEFINITIONS` in `shared/src/constants/ships.ts`.
3. **SVG Art**: Create `client/src/assets/svg/ships/YourShipArt.tsx`, export from barrel.

### Adding a New Trade Route

1. **Definition**: Add to `TRADE_ROUTE_DEFINITIONS` in `shared/src/constants/ships.ts` with key, name, description, era, duration (seconds), reward, unlockCost, and requiredShipType.

### Adding a New Achievement

1. **Definition**: Add to `ACHIEVEMENT_DEFINITIONS` in `shared/src/constants/achievements.ts`.
2. **Condition types**: `resourceTotal`, `totalClicks`, `totalBuildings`, `prestigeCount`, `eraReached`, `shipCount`, `playTime`.
3. **Reward types** (optional): `clickMultiplier`, `globalMultiplier`, `resourceMultiplier`.
4. **Icon**: Reference an existing icon key or add a new one.

### Adding a New Era

This is a larger change:
1. Add value to `Era` enum in `shared/src/types/eras.ts`.
2. Add definition to `ERA_DEFINITIONS` and threshold to `ERA_UNLOCK_THRESHOLDS` in `shared/src/constants/eras.ts` (include theme colors).
3. Update `calcCurrentEra()` in `shared/src/engine/calculator.ts`.
4. Add buildings, upgrades, ships, and trade routes for the new era.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `JWT_SECRET` | `foundation-dev-secret-key` | Secret for signing JWTs |
| `DB_PATH` | `./foundation.db` | Path to SQLite database file |

## Conventions

- All packages use ESM (`"type": "module"`) with `.js` extensions in imports.
- TypeScript strict mode everywhere; target ES2022.
- Server uses `tsx watch` for development (auto-restart on changes).
- API responses follow `{ success: boolean, data: T }` envelope pattern.
- Auth token stored in `localStorage` under key `foundation_token`.
- `ApiClient` auto-redirects to `/login` on 401 responses.
- Auto-save interval is 30 seconds (`AUTO_SAVE_INTERVAL` in formulas.ts).
