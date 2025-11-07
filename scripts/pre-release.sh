#!/bin/bash

rm -rf dist

pnpm pnpm oxfmt --check --no-error-on-unmatched-pattern .
pnpm pnpm oxlint --type-aware
pnpm pnpm knip --cache --cache-location
pnpm pnpm cspell lint --no-progress --gitignore --show-context ./**/*
pnpm type-check
pnpm lint
pnpm build
