#!/usr/bin/env bash

set -euo pipefail

pnpm run format:fix
pnpm run markdownlint
pnpm run spell-check
pnpm run lint
pnpm run type-check
pnpm run build
pnpm run knip
pnpm run test
