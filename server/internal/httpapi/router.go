// Package httpapi wires HTTP routes to handlers using the standard library
// net/http mux (Go 1.22+ pattern matching, no external router needed yet).
package httpapi

import "net/http"

func NewRouter() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/health", handleHealth)

	return mux
}
