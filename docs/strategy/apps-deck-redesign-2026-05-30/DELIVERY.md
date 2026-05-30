# App Codex deck — delivery (2026-05-30)

> One-page summary of the standalone full-screen "App Codex" deck prototype.
> **Standalone, NOT merged.** For Linlin's review → then decide on merge.

## What was built

A new standalone page, **`apps-deck.html`**: the App Gallery reimagined as a
full-screen, one-app-per-page **codex** (web-PowerPoint that reads like a book).

- **One app per screen**, full viewport, on the site's real parchment background.
- **Swiper.js** engine: auto-leaf (7s, pauses on hover, off under reduced-motion)
  + manual swipe/drag + keyboard + mousewheel + deep-link (`#slug`).
- **Marginalia controls, hidden by default** (clean full plate); revealed on
  mouse-move / at the top:
  - top **ribbon** = search, tag filter, app index (jump to any app), autoplay
    play/pause, fullscreen, link back to the grid view;
  - bottom **gilt page-slider** (folio ticks);
  - left/right **page-turn** chevrons near the edges.
- **3 bespoke layout variants** by app type: **Plate** (matted screenshot + margin
  column, side alternates), **Specimen** (centered diagram + museum caption),
  **Sealed** (wax seal + why-note for NDA / no-link apps).
- **Per-slide motion**: Swiper Parallax (title/plate/margin move at different
  speeds) + a staggered entrance reveal; reduced-motion safe.
- **Image zoom**: click-to-zoom on the plate (Swiper Zoom) + an "enlarge"
  lightbox.
- **Fullscreen**: a control puts the current plate full-screen.
- **Mobile**: portrait phones get a "turn your phone" hint and the deck
  **force-rotates to landscape** so it reads wide.
- **DRY**: reads the same `window.PROJECTS` (`js/projects-data.js`) as the gallery
  + homepage. No new content store.

## How to view

- Local: `python3 -m http.server 8001` → `http://localhost:8001/apps-deck.html`.
- Live (after this commit deploys): `https://jajupmochi.github.io/apps-deck.html`.
- Keys: arrow keys leaf; move the mouse to the top for the ribbon; click a plate
  to zoom; the ribbon has fullscreen + autoplay toggle. On a phone, hold portrait
  to see the rotate prompt.

## Design basis

- Aesthetic lane (named via `impeccable`, brand register): **a naturalist's codex
  of inventions** — each app a hand-mounted plate, gilt folio, page-turn. Not a
  black-stage PowerPoint, not generic SaaS.
- Direction + tokens in [00-plan.md](./00-plan.md); engine/library/mobile research
  in [00-research.md](./00-research.md); critique + screenshots in
  [round-1-notes.md](./round-1-notes.md) + `round-*.png`.
- Passed the 4 UI_AUDIT tests + impeccable absolute bans (no gradient text, glass,
  side-stripe, hero-metric, identical-grid; no em-dash/emoji in new copy). 0
  console errors.

## Known gaps / honest limits

- **iOS cannot truly lock orientation.** The CSS force-rotate covers iOS; the
  `screen.orientation.lock('landscape')` attempt covers Android in fullscreen.
- **Touch-swipe direction on the rotated mobile deck** needs a small remap if we
  go past prototype (keyboard / autoplay / tap-nav already work).
- **`why` (NDA) copy contains an em-dash** inherited from `projects-data.js` (a
  data-level cleanup; also present in the gallery).
- **3 variants, not 9 bespoke** per-app art — deliberate, to keep it maintainable;
  fully bespoke per app is a larger pass if wanted.
- **Swiper bundle weight** (~150KB) is fine for a dedicated opt-in page; tree-shake
  if merged.

## Merge options (deferred to Linlin)

1. **Keep standalone** as a "cinematic" view, linked from the gallery.
2. **Third toggle** on the merged gallery: `Cards | Detailed | Deck`, all reading
   the one data source (cleanest; fits the existing view-toggle).
3. **Make it the default** apps view, gallery as the fallback.

Recommendation: option 2 if liked — it reuses the data + the existing toggle
pattern and keeps every view DRY.

## Files

- `apps-deck.html` (new, standalone) — the prototype.
- `docs/strategy/apps-deck-redesign-2026-05-30/` — 00-research, 00-plan,
  round-1-notes, screenshots, this DELIVERY.
- Untouched: `apps-gallery.html`, `js/projects-render.js`, the homepage.
