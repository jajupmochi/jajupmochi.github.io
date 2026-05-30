# Round 1 + 2 — critique notes (apps-deck prototype)

> Self-critique of the standalone `apps-deck.html` prototype, against the
> impeccable laws + the 4 UI_AUDIT tests. Screenshots in this folder.

## Screens captured

- `round-1-plate.png` — LIULIAN, **Plate** variant, controls revealed (ribbon +
  app index + folio slider). The hero layout.
- `round-1.png` — Swiss River, **Specimen** variant (idle, no controls).
- `round-1-sealed.png` — N-Banker, **Sealed** (wax seal + NDA why-note).
- `round-1-mobile.png` — portrait phone, "turn your phone" hint.
- `round-2-mobile-rotated.png` — portrait phone, deck force-rotated to landscape
  (after the center-rotate fix).

## 4-axis read

- **Color** — parchment-cream drench (the real `wm-02-pergament-aged.jpg` the
  site uses), warm ink, one cinnabar accent letter per title, maroon links, a
  qing pip for live demos, gilt folio + page-slider. Committed, on-brand. No
  gradient text, no glass.
- **Typography** — oversize Patrick Hand plate-titles (up to 5.6rem), Spectral
  body, JetBrains Mono meta/folio. Strong hierarchy (>1.25). Reads as book
  plates, not slides.
- **Spacing** — asymmetric two-column plate spread (side alternates by index);
  specimen centers the diagram with a caption-under. Varied rhythm, no
  centered-stack template.
- **Ornamentation** — washi-tape "Featured", hand-cut mat + cast shadow + slight
  rotation on plates, wax seal for NDA, gilt page-edge slider, ribbon-as-bookmark
  controls. Marginalia, not a SaaS toolbar.

## UI_AUDIT (4 tests)

1. **AI-slop** — pass. Distinctive parchment-codex; nobody reads this as a
   generic AI deck.
2. **Category-reflex** — pass. "Portfolio deck" did not reflex to dark/neon/glass
   cards; the warm book is the deliberate answer.
3. **Project-copy** — pass. All copy is real `window.PROJECTS` data (blurb, tags,
   badge, why); no lorem, no invented metrics.
4. **Cross-check vs parchment baseline** — pass. Same background image, fonts,
   palette as the site; the deck reads as the same book.

Absolute-ban sweep: no gradient text, no glassmorphism, no side-stripe borders,
no hero-metric template, no identical card grid, no modal-first (the enlarge
lightbox is the right affordance). Clean.

## Changed in round 2

- **Mobile force-landscape** — the first recipe (`top-left` origin +
  `translateY(-100vw)`) positioned the rotated deck slightly off. Switched to the
  robust **center-rotate** (`top/left:50%; translate(-50%,-50%) rotate(90deg)`
  with swapped `100vh/100vw` sizing). Now the portrait phone renders a correct
  full landscape plate.
- Fixed a Swiper init closure bug (`syncIndex` ran before the `swiper` var was
  assigned) → 0 console errors.

## Known considerations (for DELIVERY / a merge pass)

- **Swiper touch-axis after rotation** — on a CSS-rotated mobile deck, physical
  horizontal swipe maps to the deck's vertical; keyboard / autoplay / tap-nav are
  unaffected, but touch-swipe direction needs a small remap if we go beyond
  prototype. Documented.
- **iOS orientation lock** — cannot be forced; the CSS-rotate covers iOS, the
  `screen.orientation.lock` attempt covers Android in fullscreen. Honest limit.
- **Em-dash in `why` copy** — the NDA strings in `projects-data.js` contain an
  em-dash (a standing site rule says avoid them in copy). Pre-existing in the
  data (also shown in the gallery); a data-level cleanup, out of scope for the
  prototype.
- **Bespoke vs variants** — 3 variants (Plate / Specimen / Sealed) keep all 9
  apps feeling designed without 9 one-off builds; if Linlin wants truly bespoke
  art per app, that is a larger pass.

Verdict: the prototype meets the brief and the design bars. Ready for Linlin's
review; merge decision deferred.
