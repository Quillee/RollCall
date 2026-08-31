SHELL := /usr/bin/env bash

.DEFAULT_GOAL := dev

.PHONY: install dev dev-web dev-server build typecheck test fmt vet clean

install:
	yarn install

## Run frontend + backend together; Ctrl+C stops both.
dev:
	@trap 'kill 0' EXIT INT TERM; \
	yarn workspace web dev & \
	(cd server && air) & \
	wait

dev-web:
	yarn workspace web dev

## Rebuilds and restarts the server on save; see server/.air.toml.
dev-server:
	cd server && air

build:
	yarn build
	go -C server build -o bin/server ./cmd/server

typecheck:
	yarn typecheck

test:
	go -C server test ./...

fmt:
	go -C server fmt ./...

vet:
	go -C server vet ./...

clean:
	rm -rf bin apps/web/dist
