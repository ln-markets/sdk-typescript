#!/bin/bash

set -e

rm -rf dist

# Guard: ensure no leftover references to the legacy src/v3/ or dist/v3/ paths.
if git ls-files src/ dist/ 2>/dev/null | grep -E '^(src|dist)/v3/' | grep -q .; then
  echo "ERROR: tracked files under src/v3/ or dist/v3/ — should be src/rest-v3/ / dist/rest-v3/" >&2
  exit 1
fi
if git grep -lE "(src/v3/|dist/v3/|@ln-markets/sdk/v3['\"])" -- '*.ts' '*.json' '*.md' | grep -q .; then
  echo "ERROR: tracked sources still reference legacy v3 paths — should use rest-v3" >&2
  git grep -lE "(src/v3/|dist/v3/|@ln-markets/sdk/v3['\"])" -- '*.ts' '*.json' '*.md' >&2
  exit 1
fi

pnpm pnpm oxfmt --check --no-error-on-unmatched-pattern .
pnpm pnpm oxlint --type-aware
pnpm pnpm knip
pnpm pnpm cspell lint --no-progress --gitignore --show-context ./**/*
pnpm type-check
pnpm lint
pnpm build
