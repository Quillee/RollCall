# RollCall

The homepage for our board game nights: track wishlist prices, browse the
group's collection, see who's winning, and know when the next session is
happening.

- **Frontend:** SolidJS + Vite (`apps/web`)
- **Backend:** Go (`server/`), module `rollc`
- **Shared types:** `packages/api-contract` (`@rollc/api-contract`)
- **Docs:** [Task list](TASKS.md)

## Monorepo layout

```
apps/web/              SolidJS + Vite frontend
packages/api-contract/ Shared TS types for the JSON API
server/                Go backend (module: rollc)
  cmd/server/           entrypoint
  internal/httpapi/     HTTP routes & handlers
  internal/domain/      core types (mirrors packages/api-contract)
```

## Getting started

```sh
# JS side
yarn install
yarn dev                # frontend on :3000, proxies /api to :8080

# Go side
yarn server:dev         # backend on :8080 (go run ./cmd/server)

# checks
yarn typecheck           # tsc --noEmit across all TS workspaces
yarn server:test         # go test ./... in server/
```

## Features

### Shipped

- `GET /api/health` — backend liveness check

### In progress

- BGG wishlist fetching & price tracking (see [TASKS.md](TASKS.md))

### Planned

- **Leaderboard** — record wins/losses per game per player, standings over
  time, maybe an Elo/points system per game
- **Collection browser** — the group's full board game collection, with
  anonymous reviews/ratings so people can be honest about *Monopoly*
- **Game night scheduling** — see when the next session is, who's hosting,
  RSVP / propose new dates
