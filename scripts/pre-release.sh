#!/bin/bash

set -e

rm -rf dist

pnpm pnpm oxfmt --check --no-error-on-unmatched-pattern .
pnpm pnpm oxlint --type-aware
pnpm pnpm knip
pnpm pnpm cspell lint --no-progress --gitignore --show-context ./**/*
pnpm type-check
pnpm lint
pnpm build
