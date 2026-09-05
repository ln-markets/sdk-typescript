#!/usr/bin/env bash

set -euo pipefail

actionlint
zizmor --offline --min-severity medium .github/workflows
gitleaks dir . --no-banner
osv-scanner scan source --recursive .
