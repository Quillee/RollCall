// Package domain holds the core types shared across the backend, mirroring
// the shape defined in packages/api-contract on the frontend side.
package domain

// WishlistPriority mirrors BGG's wishlistpriority collection field.
// 5 means "Don't buy this" and is filtered out before it reaches the API.
type WishlistPriority int

const (
	PriorityMustHave    WishlistPriority = 1
	PriorityLoveToHave  WishlistPriority = 2
	PriorityLikeToHave  WishlistPriority = 3
	PriorityNotSure     WishlistPriority = 4
	PriorityDontBuyThis WishlistPriority = 5
)

type PriceOffer struct {
	Store    string  `json:"store"`
	Price    float64 `json:"price"`
	Currency string  `json:"currency"`
	InStock  bool    `json:"inStock"`
	URL      string  `json:"url"`
}

type WishlistItem struct {
	BGGID            int              `json:"bggId"`
	Name             string           `json:"name"`
	WishlistPriority WishlistPriority `json:"wishlistPriority"`
	Offers           []PriceOffer     `json:"offers"`
	BestOffer        *PriceOffer      `json:"bestOffer"`
}

type WishlistPricesResponse struct {
	Username string         `json:"username"`
	Items    []WishlistItem `json:"items"`
}
