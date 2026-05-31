# Round 3 — second review pass (apps-deck + cross-page tag fix)

> Linlin's second review of the deck. All points fixed + a cross-page tag-contrast
> bug. One commit. Screenshots: `round-4-*.png`.

## Reported issues — all fixed

1. **Mobile: controls were still portrait** while content was landscape. Moved
   ALL controls (ribbon, arrows, folio, progress, lightbox, live region) INSIDE
   `.deck-rotor`, so on a portrait phone the whole UI rotates to landscape as one
   unit. The "turn your phone" hint stays outside (upright). Verified: ribbon +
   arrows are inside the transformed rotor on mobile.
2. **Some slides were vertical (image over text)** → overflow / clipped images.
   Unified every slide to a **horizontal two-column spread** (side alternates by
   index); removed the centered "specimen" vertical layout. No more vertical
   stacking.
3. **Multi-image: hover rotate arrows on the image.** Added `‹ ›` buttons on the
   image's left/right edges (visible on plate hover) that rotate the in-plate
   images (distinct from the deck's page arrows).
4. **Images embedded into the paper, no frame.** Removed the matted border +
   drop-shadow + cream card background; screenshots now sit directly on the
   parchment with a faint `sepia(0.06)` (matching the homepage `.project-image`
   treatment) so the page reads as one manuscript, not floating UI cards. The big
   page arrows were likewise restyled as **ink marks** (no button chrome).
5. **Tag highlight contrast (cross-page: homepage / blog / gallery / deck).**
   Root cause: `parchment-overrides.css` `button[class*="filter"].active` forced
   **red text** `oklch(0.40 0.22 27)` on the maroon-filled active chip (red on
   maroon = illegible), at higher specificity than the intended light-text rule.
   Fixed by excluding `.filter-tag` from that red-ink rule (`:not(.filter-tag)`),
   so active filter-tags keep maroon fill + **bright cream text** + weight 700.
   Also hardened `.blog-filterchip.active`. Verified: homepage active tag is now
   `oklch(0.985 0.012 85)` cream on maroon.
6. **Transition options to preview.** Added a "Turn:" picker in the ribbon with
   four effects, switchable live (Swiper re-inits): **Slide** (default),
   **Page drift** (creative), **3D Cube** (rotates in from inside the screen),
   **3D Flip**. Verified switching to cube/flip keeps slides + autoplay, 0 errors.
7. **(supplement) Text-image gap too large** → tightened the grid `gap` and
   column ratio; reduced slide padding.
8. **(supplement) NDA seal misaligned** → the `NDA` text now sits at the same
   `right:-18px; bottom:-18px` as the wax-seal `::after`, centered on the seal.

## Verified (chrome-devtools 1440×980 + 390×844)

- 9 slides all two-column; plate-frame border 0 / shadow none (embedded); 6
  in-image arrows; transition picker (slide/pageturn/cube/flip) switches without
  error; autoplay runs; controls inside rotor on mobile; hint outside.
- NDA seal text right/bottom -18px (aligned). Homepage active tag cream-on-maroon.
- 0 console errors across states.

## Honest notes

- White-background screenshots still read as light rectangles on the parchment
  (same as the homepage); the frame removal + sepia is the "embed like homepage"
  the brief asked for. A stronger blend (`mix-blend-mode`) is possible if wanted.
- `coverflow` was dropped from the transition options (it needs a multi-slide
  viewport; awkward full-screen). The 3D options are Cube + Flip.
- iOS orientation still can't be force-locked (CSS-rotate covers it).
