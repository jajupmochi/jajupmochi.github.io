#!/usr/bin/env bash
# Rotate images/og-card.jpg between the white and blue variants.
#
# Run manually, e.g.  bash scripts/rotate-og-card.sh
# Or wire into a GitHub Actions cron for weekly automatic rotation - see
# README.md > "OG social card".

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
IMG_DIR="$ROOT/images"

variants=(og-card-blue.jpg og-card-white-src.jpg)

# Keep a persistent white-source copy so og-card.jpg can always be rebuilt.
if [[ ! -f "$IMG_DIR/og-card-white-src.jpg" ]]; then
    cp "$IMG_DIR/og-card.jpg" "$IMG_DIR/og-card-white-src.jpg"
fi

pick=${variants[$((RANDOM % ${#variants[@]}))]}
cp "$IMG_DIR/$pick" "$IMG_DIR/og-card.jpg"
echo "og-card.jpg  <-  $pick"
