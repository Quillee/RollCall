# Task List

## Phase 0 — Environment ✅ (scaffolded)

- [x] Yarn 4 workspace monorepo (`apps/*`, `packages/*`)
- [x] SolidJS + Vite frontend skeleton with `/api` dev proxy
- [x] Shared TypeScript API contract package (`@rollc/api-contract`)
- [x] Go module skeleton (`server/`, module `rollc`): `net/http` server,
      `GET /api/health`
- [x] Verify everything runs: frontend builds/typechecks; backend responds
      on `localhost:8080/api/health`

## Phase 1 — BGG wishlist fetching (Go)

- [ ] Implement `bgg.FetchWishlist` with `net/http`: call
      `xmlapi2/collection?username=…&wishlist=1&stats=1`
- [ ] Handle BGG's `202 Accepted` queueing (retry with backoff)
- [ ] Parse the XML with `encoding/xml` into `domain.WishlistItem`
- [ ] Filter out `wishlistpriority=5` ("Don't buy this")
- [ ] Cache wishlist responses (TTL ~1h) to respect BGG rate limits
- [ ] Wire into `GET /api/wishlist/:username/prices` returning items with
      empty offers; confirm the frontend table renders them

## Phase 2 — Price lookup

- [ ] Verify BoardGamePrices API details & terms of use (endpoint,
      params, attribution requirements)
- [ ] Implement `prices.Lookup` — one batched request per wishlist
- [ ] Map offers into the response; compute `bestOffer` (cheapest in-stock)
- [ ] Cache price responses (TTL ~6h)
- [ ] Frontend: show best price + link to store, loading/error states

## Phase 3 — Price history & sale detection

- [ ] Set up SQLite (`modernc.org/sqlite`, no cgo) via `database/sql`;
      migration for `price_points` table (indexed on
      `bgg_id, store, recorded_at`)
- [ ] `store.RecordPrices` — append snapshot on every successful lookup
- [ ] Background refresh job (`time.Ticker` + goroutine) re-pricing all
      tracked games daily
- [ ] `store.DetectSales` — latest vs. previous price per (game, store);
      define "meaningful" drop (e.g. ≥10% or ≥$5)
- [ ] `GET /api/alerts` endpoint + alerts view in the frontend
- [ ] Choose & implement a notification channel (email / ntfy / RSS)

## Phase 4 — Game night hub

- [ ] **Leaderboard**: schema for `players` and `game_results`
      (game, players, winner, played_at); `GET/POST /api/results`;
      standings view per game and overall
- [ ] **Collection browser**: schema for the group's owned games
      (distinct from the BGG wishlist); `GET /api/collection`
- [ ] **Anonymous reviews**: schema for `reviews` (game_id, rating,
      comment) with no author attribution surfaced;
      `POST /api/collection/:id/reviews`; basic abuse/spam guardrails
      since it's anonymous
- [ ] **Game night scheduling**: schema for `sessions` (date, host,
      location, RSVPs); `GET/POST /api/sessions`; "next game night"
      banner on the homepage

## Phase 5 — Polish

- [ ] Price history sparkline per game in the UI
- [ ] Sort/filter table by priority, price, discount
- [ ] Persist last-used username (localStorage)
- [ ] Structured error responses from the backend; friendly errors in UI
- [ ] Rate limiting on the public API

## Phase 6 — Deployment

- [ ] Multi-stage Dockerfile: node build (frontend) + Go build (backend)
      → slim runtime (distroless/scratch) serving static files + API
- [ ] SQLite on a persistent volume; backup story
- [ ] Pick a host (Fly.io / Hetzner / home server) and deploy
- [ ] HTTPS via the platform or a reverse proxy (Caddy)
- [ ] Minimal CI: typecheck + `go build`/`go vet`/`go test` on push
