# Round 2 — fixes + improvement passes (apps-deck)

> Addresses Linlin's review feedback + web-researched carousel UX best practices.
> One iteration, many passes; committed as a single change (per the clean-history
> rule). Screenshots: `round-3-*.png`, `round-final-desktop.png`.

## Linlin's reported issues — all fixed

1. **Multi-image projects now auto-rotate** in-plate (crossfade every 3.8s + dots
   + pause on hover). LIULIAN / N-Banker / homepage cycle their two screenshots.
2. **Deck auto-advances between projects** on widescreen. Root cause:
   `pauseOnMouseEnter` (known-buggy) on a full-viewport deck = the mouse is
   always "over" it, so autoplay stayed paused forever. Removed it; autoplay runs
   (6s) with an explicit pause button + a progress bar.
3. **"codex" removed** everywhere (title, brand, hint). Page is now "Apps".
4. **Image zoom** = hover shows a `zoom-in` cursor + a magnifier cue; click the
   image opens a full lightbox (prev/next for multi-image, Esc + arrow keys). The
   tiny corner button is gone.
5. **Controls reuse the gallery design** verbatim: linked `css/main.css` +
   `parchment-overrides.css` and used `.section-controls` / `.filter-tag` /
   `.search-box` / `.sort-select`. No bespoke control styling.
6. **Big left/right arrows** (circular parchment buttons) appear on mouse-move so
   it's obvious you can leaf.
7. **First-load teaching hint** every open: the arrows pulse left-right + an
   onboard toast ("Swipe, or use the arrows to leaf through") fades in/out.
8. **Mobile swipe works**: in the rotated (portrait→landscape) mode, Swiper's own
   touch is disabled and a custom handler maps a physical vertical swipe to
   prev/next (verified: synthetic up-swipe advanced the slide).

## Web-research-driven improvements (Baymard / Mailchimp / atomica11y)

- **Autoplay UX**: 6s, explicit pause control, **progress bar** to next slide,
  **disabled on mobile** (best practice: never auto-rotate on small screens),
  off under `prefers-reduced-motion`. Pauses while the lightbox is open.
- **Navigation affordance**: swipe + big arrows + folio dots together; "more than
  one slide" is always signalled.
- **Accessibility**: `aria-live` region announces "App i of n: Title" on change;
  keyboard shortcuts (arrows leaf, `/` focus search, `f` fullscreen, space
  play/pause, Esc/←/→ in lightbox); `aria-label`s + `aria-roledescription=slide`;
  focus-visible outlines.
- **Edge cases**: 0 results → empty message, arrows/folio hidden; 1 result →
  arrows/folio hidden (nothing to leaf to).
- **Perf**: first two slides eager, rest lazy; `decoding=async`.

## Other fixes found in review

- **Mixed aspect ratios** (landscape desktop + portrait mobile screenshots in one
  rotator) cropped badly with `object-fit:cover`. Switched the plate to a
  fixed-aspect box with `object-fit:contain` on a cream mat, so every screenshot
  shows whole (a desktop shot and a phone shot both read as mounted plates).
- **Swiper init crash** (`rotorTimers` used in the `init` callback before its
  `var` ran) → hoisted the declaration; 0 console errors.

## Verified (chrome-devtools, 1440×980 + 390×844)

- Autoplay advances 4→5 over 6.8s; homepage plate rotated to its 2nd image.
- Sort featured/newest/oldest reorder; tag filter (industry→3); search empty
  state; reset → 9.
- Lightbox: click opens current image, autoplay pauses, arrow keys + Esc work.
- Mobile: rotates to landscape, custom swipe advances, hint shows.
- 0 console errors across states.

## Still honest about

- **iOS orientation** still cannot be programmatically locked; the CSS-rotate +
  prompt cover it (Android also gets `orientation.lock` in fullscreen).
- **Em-dash in NDA `why` copy** is data-level (shared with the gallery); not
  introduced here.
- **Not merged** — standalone for review.
