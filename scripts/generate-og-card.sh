#!/usr/bin/env bash
# Generate Open Graph social card images for jajupmochi.github.io.
#
# Generation is NOT automated on deploy. Run this script manually whenever
# identity, role, or research-keyword copy changes.
#
# Produces:
#   images/og-card.jpg        (white background - DEFAULT, referenced by og:image)
#   images/og-card-blue.jpg   (deep-blue gradient, alternate)
#
# Dependencies:
#   - ImageMagick v6 (convert). Tested with 6.9.12.
#     On Debian/Ubuntu:  sudo apt install imagemagick
#   - Lato font family (picked for a warmer, less mechanical look than Helvetica).
#     On Debian/Ubuntu:  sudo apt install fonts-lato
#
# Usage:
#   bash scripts/generate-og-card.sh
#
# Rotation (optional, for variety in scraper previews):
#   bash scripts/rotate-og-card.sh

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
IMG_DIR="$ROOT/images"
PHOTO_SRC="$IMG_DIR/photo.jpg"

[[ -f "$PHOTO_SRC" ]] || { echo "missing $PHOTO_SRC" >&2; exit 1; }

# ---- Content (edit when role / bio changes) ---------------------------------
NAME="Linlin Jia, Ph.D."
ROLE="Machine Learning Research Scientist"
AFFIL="Advanced Postdoc  \u00B7  University of Bern"
RESEARCH="Graph ML \u00B7 Spatio-Temporal Learning \u00B7 AI for Science \u00B7 LLM Agents"
BADGE="OPEN TO ML RESEARCH SCIENTIST / ENGINEER"
SITE="jajupmochi.github.io"
EMAIL="linlin.jia@unibe.ch"

AFFIL="$(printf '%b' "$AFFIL")"
RESEARCH="$(printf '%b' "$RESEARCH")"

# ---- Typography -------------------------------------------------------------
# Lato: Black / Bold / Semibold / Medium / Regular — warmer geometric humanist
# feel than Helvetica. Fall back to Helvetica-Bold if Lato is missing.
if convert -list font 2>/dev/null | grep -q 'Font: Lato-Black'; then
    F_NAME="Lato-Black"
    F_ROLE="Lato-Bold"
    F_AFFIL="Lato-Regular"
    F_RES="Lato-Semibold"
    F_BADGE="Lato-Black"
    F_BOTTOM="Lato-Semibold"
else
    F_NAME="Helvetica-Bold";   F_ROLE="Helvetica-Bold"
    F_AFFIL="Helvetica";       F_RES="Helvetica-Bold"
    F_BADGE="Helvetica-Bold";  F_BOTTOM="Helvetica-Bold"
fi

# ---- Canvas + layout --------------------------------------------------------
W=1200; H=630
PHOTO_SIZE=380
PHOTO_X=95
PHOTO_Y=125              # center y = 315 (canvas midline)
TEXT_X=520

# Text baselines (per iterative user feedback):
#   * Name -> Role gap is TIGHT (hero title sits close under the name).
#   * Research line is PADDED top and bottom (breathing room).
#   * Gap BELOW the badge is generous (separates promo pill from contact line).
#   * Total text height is flush with the 380px photo so the two blocks align.
Y_NAME=178    # top of 66pt cap-height ≈ 128 (matches PHOTO_Y=125)
Y_ROLE=236    # +58   tight name -> role
Y_AFFIL=268   # +32   role -> affil
Y_RES=338     # +70   generous above research
BADGE_TOP=370 # +32 from Y_RES   generous below research
BADGE_H=50
BADGE_W=555
Y_BADGE=$((BADGE_TOP + 33))
Y_SITE=492    # BADGE_BOT(420) + 72   generous gap below badge

TMP=/tmp/og-card
mkdir -p "$TMP"

# ---- 1. Circular-masked photo ----------------------------------------------
convert -size ${PHOTO_SIZE}x${PHOTO_SIZE} xc:none \
    -fill white -draw "circle $((PHOTO_SIZE/2)),$((PHOTO_SIZE/2)) $((PHOTO_SIZE/2)),1" \
    "$TMP/mask.png"

convert "$PHOTO_SRC" -resize ${PHOTO_SIZE}x${PHOTO_SIZE}^ \
    -gravity center -extent ${PHOTO_SIZE}x${PHOTO_SIZE} \
    "$TMP/mask.png" -alpha set -compose dst-in -composite \
    "png32:$TMP/photo_circle.png"

# ---- 2. Tiny icons (globe, envelope) for the site+email line ---------------
# Drawn as vector primitives rather than emojis so they render identically
# regardless of installed emoji fonts.
make_globe() {
    local COLOR="$1"; local OUT="$2"
    convert -size 20x20 xc:none \
        -fill none -stroke "$COLOR" -strokewidth 1.6 \
        -draw "circle 10,10 10,1" \
        -draw "line 0,10 20,10" \
        -draw "ellipse 10,10 5,10 0,360" \
        "$OUT"
}
make_envelope() {
    local COLOR="$1"; local OUT="$2"
    convert -size 24x17 xc:none \
        -fill none -stroke "$COLOR" -strokewidth 1.6 \
        -draw "roundrectangle 0,0 23,16 2,2" \
        -draw "polyline 0.5,0.5 11.5,9 22.5,0.5" \
        "$OUT"
}

make_globe    '#dbeafe' "$TMP/globe_blue.png"
make_envelope '#dbeafe' "$TMP/env_blue.png"
make_globe    '#1e293b' "$TMP/globe_white.png"
make_envelope '#1e293b' "$TMP/env_white.png"

# icon vertical centre relative to site-line text
ICON_Y=$((Y_SITE - 14))     # globe is 20 tall, baseline-to-centre adj
ENV_Y=$((Y_SITE - 12))      # envelope 17 tall

# x-offsets for bottom line
X_GLOBE=$TEXT_X
X_SITE=$((TEXT_X + 28))
X_ENV=$((X_SITE + 230))
X_EMAIL=$((X_ENV + 32))

# ---- 3. Render blue variant -------------------------------------------------
convert -size ${W}x${H} gradient:'#1e3a8a-#1d4ed8' "$TMP/bg_blue.png"
convert "$TMP/bg_blue.png" \
    "$TMP/photo_circle.png" -geometry +${PHOTO_X}+${PHOTO_Y} -composite \
    "$TMP/globe_blue.png" -geometry +${X_GLOBE}+${ICON_Y} -composite \
    "$TMP/env_blue.png"   -geometry +${X_ENV}+${ENV_Y}   -composite \
    -alpha remove -alpha off -stroke none -strokewidth 0 \
    -fill '#ffffff'  -font "$F_NAME"   -pointsize 66 -kerning -2 -annotate +${TEXT_X}+${Y_NAME}  "$NAME" \
    -fill '#e0e7ff'  -font "$F_ROLE"   -pointsize 30 -kerning 0  -annotate +${TEXT_X}+${Y_ROLE}  "$ROLE" \
    -fill '#bfdbfe'  -font "$F_AFFIL"  -pointsize 22 -kerning 0  -annotate +${TEXT_X}+${Y_AFFIL} "$AFFIL" \
    -fill '#dbeafe'  -font "$F_RES"    -pointsize 19 -kerning 0  -annotate +${TEXT_X}+${Y_RES}   "$RESEARCH" \
    -fill '#fef3c7'  -draw "roundrectangle ${TEXT_X},${BADGE_TOP} $((TEXT_X+BADGE_W)),$((BADGE_TOP+BADGE_H)) 25,25" \
    -fill '#92400e'  -font "$F_BADGE"  -pointsize 20 -kerning 0.5 -annotate +$((TEXT_X+24))+${Y_BADGE} "$BADGE" \
    -fill '#dbeafe'  -font "$F_BOTTOM" -pointsize 18 -kerning 0  -annotate +${X_SITE}+${Y_SITE}  "$SITE" \
    -fill '#dbeafe'  -font "$F_BOTTOM" -pointsize 18 -kerning 0  -annotate +${X_EMAIL}+${Y_SITE} "$EMAIL" \
    -quality 92 "$IMG_DIR/og-card-blue.jpg"

# ---- 4. Render white variant (DEFAULT) --------------------------------------
convert -size ${W}x${H} xc:'#ffffff' \
    -fill none -stroke '#cbd5e1' -strokewidth 3 \
    -draw "circle $((PHOTO_X+PHOTO_SIZE/2)),$((PHOTO_Y+PHOTO_SIZE/2)) $((PHOTO_X+PHOTO_SIZE/2)),$((PHOTO_Y+1))" \
    "$TMP/bg_white_ring.png"

convert "$TMP/bg_white_ring.png" \
    "$TMP/photo_circle.png"  -geometry +${PHOTO_X}+${PHOTO_Y} -composite \
    "$TMP/globe_white.png"   -geometry +${X_GLOBE}+${ICON_Y} -composite \
    "$TMP/env_white.png"     -geometry +${X_ENV}+${ENV_Y}   -composite \
    -alpha remove -alpha off -stroke none -strokewidth 0 \
    -fill '#1e3a8a'  -font "$F_NAME"   -pointsize 66 -kerning -2 -annotate +${TEXT_X}+${Y_NAME}  "$NAME" \
    -fill '#0f172a'  -font "$F_ROLE"   -pointsize 30 -kerning 0  -annotate +${TEXT_X}+${Y_ROLE}  "$ROLE" \
    -fill '#475569'  -font "$F_AFFIL"  -pointsize 22 -kerning 0  -annotate +${TEXT_X}+${Y_AFFIL} "$AFFIL" \
    -fill '#1e40af'  -font "$F_RES"    -pointsize 19 -kerning 0  -annotate +${TEXT_X}+${Y_RES}   "$RESEARCH" \
    -fill '#fef3c7'  -draw "roundrectangle ${TEXT_X},${BADGE_TOP} $((TEXT_X+BADGE_W)),$((BADGE_TOP+BADGE_H)) 25,25" \
    -fill '#92400e'  -font "$F_BADGE"  -pointsize 20 -kerning 0.5 -annotate +$((TEXT_X+24))+${Y_BADGE} "$BADGE" \
    -fill '#1e293b'  -font "$F_BOTTOM" -pointsize 18 -kerning 0  -annotate +${X_SITE}+${Y_SITE}  "$SITE" \
    -fill '#1e293b'  -font "$F_BOTTOM" -pointsize 18 -kerning 0  -annotate +${X_EMAIL}+${Y_SITE} "$EMAIL" \
    -quality 92 "$IMG_DIR/og-card.jpg"

rm -rf "$TMP"

echo
echo "Generated:"
ls -la "$IMG_DIR"/og-card*.jpg
