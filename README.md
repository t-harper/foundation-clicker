# Foundation

An incremental/idle game inspired by Isaac Asimov's *Foundation* series. Build up the Foundation on Terminus, progress through four eras of galactic history, and guide humanity through the Seldon Plan.

## Quick Start

```bash
# Install dependencies
npm install

# Start development servers (run in separate terminals)
npm run dev:server        # Express API on port 3001
npm run dev:client        # Vite dev server on port 5173
```

Navigate to `http://localhost:5173`, register an account, and start clicking.

## What Is This?

You start with nothing on the planet Terminus. Click to earn credits. Build structures that produce resources automatically. Purchase upgrades that multiply your output. Build ships and send them on trade routes. When you've accumulated enough, trigger a **Seldon Crisis** to prestige -- resetting your progress but earning Seldon Points that permanently boost production and unlock new eras of content.

### Resources

| Resource | Role |
|----------|------|
| Credits | Primary currency, used for most purchases |
| Knowledge | Research and advanced buildings |
| Influence | Diplomatic and psychological structures |
| Nuclear Tech | Energy and weapons infrastructure |
| Raw Materials | Construction and manufacturing |

### Eras

| Era | Theme | Unlock |
|-----|-------|--------|
| Religious Dominance | Establishing the Foundation through scientific religion | Start |
| Trading Expansion | Economic power and merchant princes | First prestige |
| Psychological Influence | Second Foundation and mentalics | 100 Seldon Points |
| Galactic Reunification | Galaxia and the final plan | 10,000 Seldon Points |

Each era adds 14 buildings, ~42 upgrades, new ship types, and new trade routes. The entire UI re-themes with era-specific colors.

### Content Scale

- 56 buildings with custom SVG art
- 178 upgrades across 8 effect types
- 4 ship types and 7 trade routes
- 19 achievements
- Colony map with pan/zoom visualization
- In-game encyclopedia with Foundation lore

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Zustand 5, Vite 5, Tailwind CSS 3, React Router 6 |
| Backend | Node.js, Express 4, better-sqlite3, JWT, bcrypt |
| Shared | Pure TypeScript game engine (types, constants, formulas, tick logic) |
| Language | TypeScript 5.6, strict mode, ES2022 |

### Monorepo Structure

```
foundation-game/
  shared/     # Game engine -- types, constants, formulas, tick logic (no runtime deps)
  server/     # Express API + SQLite + WebSocket sync
  client/     # React SPA with RAF game loop
```

All three packages are connected via npm workspaces. The `shared` package contains every piece of game logic and balance data, used identically by client and server.

## Architecture

**Client-authoritative ticking** -- A `requestAnimationFrame` loop runs the shared `tick()` function every frame on the client for smooth, responsive resource counters.

**Server-authoritative mutations** -- All purchases, builds, and prestige actions go through REST API calls. The server validates affordability against projected resources (fast-forwarded from last save) and persists to SQLite.

**Shared engine** -- Production calculations, cost formulas, unlock checks, and all game balance constants live in `@foundation/shared`. No game data exists outside this package.

**Offline earnings** -- When you return after being away, the server calculates what you would have earned (50% rate, capped at 24 hours) and shows a welcome-back modal.

**WebSocket sync** -- The server pushes building/upgrade state to connected clients at 2 Hz for real-time multi-tab consistency.

## Development

### Commands

```bash
npm run dev:client        # Vite dev server (port 5173, proxies /api to 3001)
npm run dev:server        # Express with tsx watch (port 3001, auto-restart)
npm run build             # Build all: shared -> server -> client
npm run build:shared      # Build shared only (must run first for type-checking)
npm run typecheck         # Type-check all packages
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `JWT_SECRET` | `foundation-dev-secret-key` | JWT signing secret |
| `PORT` | `3001` | Server port |
| `DB_PATH` | `./foundation.db` | SQLite database path |

Copy `.env.example` to `server/.env` and customize as needed.

### Project Conventions

- ESM throughout with `.js` import extensions on server (Vite handles client)
- TypeScript strict mode, target ES2022
- DB columns use snake_case; TypeScript types use camelCase
- All game content defined as constants in `shared/src/constants/`
- Database stores only player state (counts, flags, timestamps) -- no content tables
- SVG art uses `currentColor` for automatic era theming
- API responses return data directly (no wrapper envelope)

## Game Mechanics Reference

### Production

Each building produces resources per second. Production is multiplied through a 5-layer chain: building upgrades, resource upgrades, achievement bonuses, prestige multiplier (2% per Seldon Point), and global multipliers.

### Costs

Building costs scale exponentially: `baseCost * 1.15^owned`. Bulk purchases use a geometric series formula. Selling refunds 50% at current price.

### Clicking

Base value is 1 credit per click. Upgrades can add flat multipliers, per-building bonuses, building-scaling multipliers, and bonus resource yields. All modified by prestige multiplier.

### Prestige

Once you've earned 1 billion lifetime credits, you can trigger a Seldon Crisis. This resets your buildings, upgrades, ships, and trade routes, but you earn Seldon Points (`150 * sqrt(lifetimeCredits / 1e9)`) that permanently boost all production. Achievements are preserved across prestiges.

## License

Private project. All rights reserved.
