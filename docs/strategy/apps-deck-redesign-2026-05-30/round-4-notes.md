# Round 4 — review pass 3 (cube default, loop, per-project layout, manuscript pagination)

> Linlin's third review. All points fixed + every project visually verified.
> Screenshots: `round-5-*.png`, `round-6-graphink.png`.

## Fixed

1. **Default = 3D Cube**, and **loop** so last↔first wraps in one smooth turn (not
   a rewind through everything). The built-in Swiper cube overlapped the first
   slide onto the last at the loop boundary, so "3D Cube" is implemented as a
   loop-clean **creative rotateY** effect (same from-inside-the-screen look).
2. **Arrow focus box** — arrows `.blur()` after click, so a mouse-click no longer
   leaves a focus ring that shows when you then use the keyboard.
3. **Per-project layout / centering** — redesigned the grid so image + text both
   **hug the centre gutter** (equal `1fr` columns, `justify-self` toward centre,
   side alternates). The gap is now consistent regardless of image aspect, fixing
   LIULIAN-too-close / N-Banker-too-far, and the composition is centred.
4. **Images bigger** — larger `max-width`, specimen diagrams use a `3/2` box (the
   redox / gklearn / swissriver diagrams read much larger now).
5. **White background shows the parchment through** — `mix-blend-mode:multiply` on
   the screenshots, so a white-UI shot reads as printed on the page, not a pasted
   rectangle. (Linlin asked to try this.)
6. **No text cut off** — the rotated-mobile and short-landscape content is tightened
   (smaller title/desc, less padding) so it fits; PLANALYSER etc. show fully.
7. **NDA seal responsive** — sizes via a `clamp()` CSS var (smaller on mobile),
   text stays centred on it.
8. **Mobile controls unified + no overflow** — the rotor uses `dvh/dvw` so the
   rotated frame fits the visible viewport (browser chrome included); filter-tags
   are a single horizontal-scroll row (no 2-row crowding / edge overflow).
9. **Manuscript pagination** — the plain dots became **ink tally-strokes rising
   from a gilt rule** (active = a tall cinnabar stroke), like marks down a
   manuscript's page edge.
10. **Overlap bug at the loop wrap** — the entrance reveal used `animation … forwards`,
    whose fill left the first slide's text at ~0.92 opacity, so the 3D side face
    showed readable text over the active page (visible on GraphInk, adjacent to
    the wrap). Replaced with a deterministic `:not(.swiper-slide-active)` rule:
    non-active text margins are opacity 0 (the image may peek for the 3D turn).

## Per-project visual verification (1440×980, + mobile spot-checks)

LIULIAN · N-Banker · graphkit-learn · Swiss River · Linlin's homepage · Local
Confidential Translator · OCTOPUSSY/RedoxPrediction · PLANALYSER · GraphInk —
all checked: centred, balanced gap, image well-sized + embedded (multiply), text
complete, seal scaled, no overlap. Loop wraps cleanly; 0 console errors.

## Honest notes

- "3D Cube" is a creative rotateY (looks cube-like, loops cleanly); the literal
  Swiper cube can't loop without the wrap overlap. Flip / Slide / Page-drift are
  the other picker options.
- iOS still can't force-lock orientation (CSS rotate covers it).
