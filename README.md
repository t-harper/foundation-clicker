# Foundation

An incremental/idle game inspired by Isaac Asimov's *Foundation* series. Build up the Foundation on Terminus, progress through four eras of galactic history, and guide humanity through the Seldon Plan.

## Quick Start

```bash
# Install dependencies
npm install

# Start DynamoDB Local (requires Podman)
npm run dev:db

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

Each era adds 14 buildings, ~42 upgrades, new ship types, new trade routes, 4 heroes, 10 activities, and 10 items. The entire UI re-themes with era-specific colors.

### Content Scale

- 56 buildings with custom SVG art
- 178 upgrades across 8 effect types
- 4 ship types and 7 trade routes
- 16 heroes (Foundation characters unlocked through story events)
- 40 activities (20 research projects + 20 missions)
- 40 items (20 permanent artifacts + 20 timed consumables)
- 19 achievements
- Colony map with pan/zoom visualization
- In-game encyclopedia with Foundation lore

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Zustand 5, Vite 5, Tailwind CSS 3, React Router 6 |
| Backend | Node.js, Express 4, AWS Lambda, API Gateway (HTTP + WebSocket), DynamoDB, JWT, bcrypt |
| Database | DynamoDB (single-table design), DynamoDB Local via Podman for dev |
| Infrastructure | Terraform, S3 + CloudFront, Route53, ACM |
| CI/CD | GitHub Actions with OIDC authentication |
| Shared | Pure TypeScript game engine (types, constants, formulas, tick logic) |
| Language | TypeScript 5.6, strict mode, ES2022 |

### Monorepo Structure

```
foundation-game/
  shared/     # Game engine -- types, constants, formulas, tick logic (no runtime deps)
  server/     # Express API + Lambda handlers + DynamoDB + WebSocket
  client/     # React SPA with RAF game loop
  infra/      # Terraform (Lambda, API Gateway, DynamoDB, S3/CloudFront, DNS)
  scripts/    # Deployment and bootstrapping scripts
```

All three packages are connected via npm workspaces. The `shared` package contains every piece of game logic and balance data, used identically by client and server.

## Architecture

**Client-authoritative ticking** -- A `requestAnimationFrame` loop runs the shared `tick()` function every frame on the client for smooth, responsive resource counters.

**Server-authoritative mutations** -- All purchases, builds, and prestige actions go through the WebSocket connection (or REST API). The server validates affordability against projected resources (fast-forwarded from last save) and persists to DynamoDB.

**Single-table DynamoDB** -- All player data lives in one DynamoDB table using a composite key design (`PK=USER#<id>`, `SK=ENTITY#<key>`). A sparse model means items only exist when state changes -- no bulk initialization of hundreds of rows on registration or prestige.

**Shared engine** -- Production calculations, cost formulas, unlock checks, and all game balance constants live in `@foundation/shared`. No game data exists outside this package.

**Offline earnings** -- When you return after being away, the server calculates what you would have earned (50% rate, capped at 24 hours) and shows a welcome-back modal.

**WebSocket sync** -- The server pushes building/upgrade state to connected clients at 2 Hz for real-time multi-tab consistency. All game mutations (buy, sell, click, prestige, events) also go through the WebSocket for low-latency interaction.

## Development

### Prerequisites

- Node.js 18+
- Podman and podman-compose (for DynamoDB Local)

### Commands

```bash
# Database
npm run dev:db              # Start DynamoDB Local container
npm run dev:db:stop         # Stop DynamoDB Local
npm run dev:db:reset        # Reset database (destroy all data + restart)

# Application
npm run dev:client          # Vite dev server (port 5173, proxies /api to 3001)
npm run dev:server          # Express with tsx watch (port 3001, auto-restart)
npm run build               # Build all: shared -> server -> client
npm run build:shared        # Build shared only (must run first for type-checking)
npm run typecheck           # Type-check all packages
```

### Environment Variables

Configured in `server/.env`:

| Variable | Default | Description |
|----------|---------|-------------|
| `JWT_SECRET` | `foundation-dev-secret-key` | JWT signing secret |
| `PORT` | `3001` | Server port |
| `DYNAMODB_ENDPOINT` | *(AWS default)* | Set to `http://localhost:8000` for local dev |
| `DYNAMODB_TABLE` | `FoundationGame` | DynamoDB table name |
| `AWS_REGION` | `us-east-1` | AWS region |
| `AWS_ACCESS_KEY_ID` | *(none)* | Set to `local` for DynamoDB Local |
| `AWS_SECRET_ACCESS_KEY` | *(none)* | Set to `local` for DynamoDB Local |

### Project Conventions

- ESM throughout with `.js` import extensions on server (Vite handles client)
- TypeScript strict mode, target ES2022
- DynamoDB attributes use snake_case; TypeScript types use camelCase
- All game content defined as constants in `shared/src/constants/`
- Database stores only player state (counts, flags, timestamps) -- no content tables
- Sparse data model: DynamoDB items created on demand, not pre-populated
- All server query and service functions are async
- SVG art uses `currentColor` for automatic era theming
- API responses return data directly (no wrapper envelope)

## Deployment

### Production

Production deploys automatically on push to `master` via GitHub Actions (`.github/workflows/deploy.yml`).

The pipeline builds shared + Lambda bundles, runs `terraform apply`, builds the client with production URLs, syncs to S3, and invalidates CloudFront. Authentication uses GitHub OIDC -- no long-lived AWS credentials stored in GitHub.

| URL | Service |
|-----|---------|
| https://app.foundation-clicker.com | Client SPA |
| https://api.foundation-clicker.com | REST API (Lambda) |
| wss://ws.foundation-clicker.com | WebSocket API (Lambda) |

### Manual Deployment

```bash
# Set required env vars, then:
bash scripts/deploy.sh
```

### Infrastructure

All AWS resources are managed by Terraform in `infra/`. State is stored in S3 (`foundation-game-tfstate-831473839640`) with DynamoDB locking.

To bootstrap a fresh environment:

```bash
bash scripts/bootstrap-tf-backend.sh   # Create S3 bucket + lock table (one-time)
cd infra && terraform init              # Initialize Terraform
terraform apply                         # Create all resources
```

## Game Mechanics Reference

### Production

Each building produces resources per second. Production is multiplied through a 7-layer chain: building upgrades, resource upgrades, achievement bonuses, prestige multiplier (2% per Seldon Point), global multipliers, artifact bonuses (permanent), and active consumable boosts (timed).

### Costs

Building costs scale exponentially: `baseCost * 1.15^owned`. Bulk purchases use a geometric series formula. Selling refunds 50% at current price.

### Clicking

Base value is 1 credit per click. Upgrades can add flat multipliers, per-building bonuses, building-scaling multipliers, and bonus resource yields. All modified by prestige multiplier.

### Heroes & Research

Heroes are Foundation characters (Salvor Hardin, Hober Mallow, Bayta Darell, Golan Trevize, etc.) unlocked through story events. Each hero can be assigned to one research project or mission at a time, spending non-credit resources (knowledge, influence, rawMaterials, nuclearTech) and returning inventory items after a timer completes.

- **Research projects** produce **artifacts** -- permanent passive bonuses (e.g. +5% knowledge production, +3% global multiplier)
- **Missions** produce **consumables** -- timed boosts you activate manually (e.g. 2x click value for 5 min, +50% credits for 10 min)
- Heroes with matching specialization (research hero on research project) get a 15% duration reduction
- Only one consumable can be active at a time; artifacts stack by quantity

### Prestige

Once you've earned 1 billion lifetime credits, you can trigger a Seldon Crisis. This resets your buildings, upgrades, ships, trade routes, heroes, activities, and inventory, but you earn Seldon Points (`150 * sqrt(lifetimeCredits / 1e9)`) that permanently boost all production. Achievements are preserved across prestiges.

## License

Private project. All rights reserved.
