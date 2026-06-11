# Personal 3D Room v2 — Round Notes

> One-sentence purpose: per-round build/critique log for the paper pop-up-book redesign of `personal.html` (NOT committed; awaiting Linlin's review).

## Master TOC

- [Round 0 — baseline diagnosis](#round-0--baseline-diagnosis)
- [Round 1 — pop-up book build](#round-1--pop-up-book-build)
- [Round 2 — proportion & artifact fixes](#round-2--proportion--artifact-fixes)
- [Round 3 — grounding & desk dressing](#round-3--grounding--desk-dressing)
- [Round 4 — framing, copy, functional click-through](#round-4--framing-copy-functional-click-through)
- [Final state & known gaps](#final-state--known-gaps)

## Round 0 — baseline diagnosis

`r0-baseline.png`. Saturated orange floor + grey walls + harsh point light + generic furniture boxes; desk→Apps and bookshelf→Publications hotspots (professional content); zero shared language with the parchment site. Verdict: rebuild, don't patch. See `00-research.md`.

## Round 1 — pop-up book build

`r1-popup-book.png`. Replaced the room with the diorama: open hardcover (maroon) + ruled cream pages + handwritten margins; 4 personal corners (Travel suitcase/route/flags · Hiking paper mountains/pines · Dancing record player/notes · Photos garland) + gutter decor (tea, plant, cat); MeshToonMaterial 3-step gradient + EdgesGeometry ink lines + jitter; warm Hemi+Dir lights; free 360° orbit; staggered scaleY pop-up entrance (reduced-motion safe). Critique: bookmark ribbon floated over the desk; suitcase oversized/saturated; teapot spout detached; route dashes illegible; desk bare.

## Round 2 — proportion & artifact fixes

`r2-fixes.png`. Suitcase −20%; ribbon relocated onto the page; route dashes thicker + rotated along the path; garland posts shorter, cards larger; teapot spout tucked. Critique: book floats in undifferentiated cream (desk reads as void); gutter seam invisible; new desk props sat too far from the book.

## Round 3 — grounding & desk dressing

`r3-grounded.png`. Two offset hand-drawn ink rings ground the book on the desk (wobbly pen-stroke look); crisp gutter seam lines; pencil/ink-pot/loose-postcards clustered around the book.

## Round 4 — framing, copy, functional click-through

`r4-home-view.png`, `r4-travel-panel.png`. HOME camera tightened (6.9, 5.3, 8.5); "back to the room" → "back to the book"; mobile hides the ribbon hint ≤640px. Added a tiny `window.__room` dev hook (camera/hotspot driving for tests). Functional sweep, all PASS:
- 4/4 hotspots: panel opens, title + story + postcards fill (3/3/2/6 valid data-URLs)
- lightbox: opens from postcard, next/prev, ESC closes; second ESC closes panel
- explore menu lists exactly the 4 personal corners
- 0 console errors/warnings on desktop 1440×980 AND mobile 390×844; WebGL fallback untouched (cards now personal-only)

## Final state & known gaps

Final shots: `FINAL-home-desktop.png`, `FINAL-hiking-panel.png`, `FINAL-mobile.png`.

- **Not committed** (per Linlin's instruction); review pending.
- Homepage teaser image `res/portfolio/img/personal-room.png` still shows the OLD room — re-shoot + replace when this ships (it is live on the deployed teaser).
- Postcards are hand-inked canvas placeholders by design; real photos drop into `photoTex`/`canvasURL` call sites later.
- Page stays EN-only (as v1 was).

## v3 — the paper HOME + diegetic interactions (Linlin's 5-point review, 2026-06-11)

Linlin approved the pop-up book; asked for: ① indoor home (door to outside for future
expansion) ② sane proportions ③ finer, more object-like detail ④ skeuomorphic, game-like
interactions instead of the ordinary right panel ⑤ full-screen initial view. Snapshot of
v2 kept at `personal-v2-r4-snapshot.html`; v3 is a full rewrite of the scene + interaction
layer (~700 lines), same infra (fallback / explore / lightbox / reduced-motion).

**Build (v3-r1):** dollhouse-cutaway home on the book — plank floor (canvas wood texture),
two walls + gilt wainscot + skirting, window w/ curtains + 4 panes + sill pot, hinged door
(ajar) in the left wall, suitcase w/ latches + wheels + stickers, wall map, sideboard w/
drawers/knobs/feet + record player (plinth/platter/label/tonearm) + vinyl crate + sleeve,
photo wall (5 framed prints + washi tape), sofa (arms/cushions/throw pillow/feet), round
coffee table + teapot set (spout/handle/lid) + cup, floor lamp w/ glow, plant, cat w/
ears + tail + mat, rug. Outside the door: pocket trail world (paper mountains + pines +
stepping path + trail sign + sun on a wire) on the left page = the future-expansion area.

**Diegetic interactions (replaces the sidebar entirely):**
- Travel → camera to the wall map; pins pop; the story is hand-written ON the map.
- Hiking → the door swings open; outside world framed in the doorway; story on the trail sign.
- Dancing → vinyl + label spin, tonearm swings on, ♪ notes float up and fade; story on the
  record sleeve leaning next to the player.
- Photos → the album on the coffee table opens (propped cover), page-flip animation with
  corner tabs (‹ ›), click a photo → existing lightbox. Handwritten first/last pages.
- aria-live `#story` keeps the text accessible; explore chips + ESC + click-empty-to-return.

**Fix rounds:** r2 — wainscot/skirting crossed the door + window openings (split into
segments); hiking camera recomposed. r3 — outside objects floated (used indoor floor
height; dropped onto the page); map sat behind the rail (z-order). r4 — album cover
opened flat THROUGH the teapot → propped-open cover (more album-like anyway); arrows off
captions; teapot nudged; HOMEDIR re-aimed so the door is visible from HOME; aspect-aware
HOME distance (fills desktop AND portrait).

**Verification:** all 4 modes + direct-switch (exitMode) + flip fwd/back + ESC chain pass
programmatically; 0 console errors/warnings desktop 1440×980 + mobile 390×844. Finals:
`V3-FINAL-home.png`, `V3-FINAL-mobile.png`, `v3-r3-door.png`, `v3-r3-map.png`,
`v3-r3-vinyl.png`, `v3-r4-album-flipped.png`. Still **not committed**.
