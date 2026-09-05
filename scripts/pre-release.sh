#!/usr/bin/env bash

set -euo pipefail

rm -rf dist

pnpm run format
pnpm run check
pnpm run check:security
