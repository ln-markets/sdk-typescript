#!/bin/bash

set -e

rm -rf dist

pnpm oxfmt --check --no-error-on-unmatched-pattern .
pnpm oxlint --type-aware
pnpm knip
pnpm cspell lint --no-progress --gitignore --show-context ./**/*
pnpm type-check
pnpm lint
pnpm build
