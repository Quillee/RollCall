// Shared shape of the JSON the Go backend (`server/`) returns, consumed by
// the frontend (`apps/web`). Keep this in sync with the Go structs in
// `server/internal/domain` — there is no codegen wiring it up yet.

export type HealthResponse = {
  status: "ok"
}

/** Mirrors BGG's wishlistpriority collection field. 5 = "Don't buy this". */
export type WishlistPriority = 1 | 2 | 3 | 4 | 5

export type PriceOffer = {
  store: string
  price: number
  currency: string
  inStock: boolean
  url: string
}

export type WishlistItem = {
  bggId: number
  name: string
  wishlistPriority: WishlistPriority
  offers: PriceOffer[]
  bestOffer: PriceOffer | null
}

export type WishlistPricesResponse = {
  username: string
  items: WishlistItem[]
}
