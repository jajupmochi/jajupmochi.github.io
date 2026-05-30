# App Gallery → full-screen deck — design plan (2026-05-30)

> The design system + build plan for the standalone deck prototype. Direction set
> with the `impeccable` plugin (brand register) + the research in
> [00-research.md](./00-research.md). **Standalone first; merge decision later.**

## Master TOC

- [1. Aesthetic lane (named)](#1-aesthetic-lane-named)
- [2. Design tokens](#2-design-tokens)
- [3. Layout variants (3, by app type)](#3-layout-variants-3-by-app-type)
- [4. The marginalia control surface](#4-the-marginalia-control-surface)
- [5. Motion](#5-motion)
- [6. Mobile / landscape](#6-mobile--landscape)
- [7. Fullscreen + image zoom](#7-fullscreen--image-zoom)
- [8. Engine wiring (Swiper)](#8-engine-wiring-swiper)
- [9. Anti-patterns to refuse](#9-anti-patterns-to-refuse)
- [10. Build sequence + file map](#10-build-sequence--file-map)
- [11. Evaluation gates](#11-evaluation-gates)

## 1. Aesthetic lane (named)

**A naturalist's codex of inventions.** The deck is one large hand-bound book;
each app is a plate mounted on the page, captioned in the margin, numbered with a
gilt folio. Turning between apps reads like leafing a codex, not clicking through
PowerPoint. This is the brand's existing parchment/notebook voice pushed to
full-bleed, museum-plate scale. Reference points: an illuminated manuscript, a
Renaissance pattern-book, a botanist's specimen folio. (Per impeccable: named lane,
distinctive, a POV; not editorial-magazine-by-default, not SaaS.)

One sentence of scene (the theme test): *a recruiter or collaborator leafing,
unhurried, through a beautifully kept book of one researcher's built works, in
warm daylight.* → light, warm, parchment. Not dark.

## 2. Design tokens

Reuse the site's parchment system; concrete values for the deck (OKLCH, tinted
neutrals, no pure #000/#fff):

- **Surface (drench)**: parchment cream `oklch(0.955 0.015 85)` with the existing
  paper texture continuous across all slides (no per-slide cards on a stage).
- **Ink**: `oklch(0.26 0.04 45)` body; `oklch(0.42 0.04 42)` muted.
- **Accent — cinnabar**: `oklch(0.50 0.18 30)` for the one accent letter/word in a
  plate title + primary action.
- **Gilt**: `oklch(0.74 0.11 80)` / deep `oklch(0.62 0.12 72)` for the folio
  number, the featured tape, hairline rules, the page-slider.
- **Qing** (rare second accent): `oklch(0.45 0.12 175)` for a "live demo" pip.
- **Type**:
  - Plate title (app name): **Patrick Hand**, `clamp(2.6rem, 6.5vw, 5.6rem)`,
    one accent letter in cinnabar. Oversize, book-plate.
  - Role / subtitle: **Spectral italic**, `clamp(1.05rem, 1.6vw, 1.5rem)`.
  - Description: **Spectral / LXGW WenKai**, `clamp(0.95rem, 1.15vw, 1.15rem)`,
    measure capped ~46ch in the margin column.
  - Tags / folio / meta: **JetBrains Mono**, `0.72–0.85rem`, wide tracking.
  - Scale ratio ≥1.25 between steps (impeccable).

## 3. Layout variants (3, by app type)

Bespoke feel without 12 one-off builds. Assigned from `window.PROJECTS` fields:

- **V1 · Plate** (apps with a real screenshot: liulian, neobanker, homepage,
  planalyser, translator). Asymmetric: a large framed screenshot **plate**
  (hand-cut mat, soft cast shadow, a strip of washi tape at one corner) occupying
  ~60% on one side (alternates left/right by index for rhythm); the other side is
  a **margin column**: huge Patrick Hand title, Spectral role line, a short hand-set
  description, JetBrains-Mono tag chips, action links set like catalogue entries,
  and a gilt folio number `iv / xii`.
- **V2 · Specimen** (diagram/library apps: gklearn, swissriver, graphink,
  octopussy, gmatch, api, sdn). The plate is the SVG diagram presented as a
  scientific specimen centered on the paper, with a hairline frame and a
  **museum caption** beneath (title + one-line + a "specimen label" of stats:
  `128★ · PyPI · since 2020`). Title set as a margin headline, rotated very
  slightly like a handwritten label.
- **V3 · Sealed** (overlay, not a separate layout, for NDA/no-link apps:
  neobanker, planalyser, graphink): a wax-seal mark + a margin note explaining
  *why* there is no public link (the existing `why` copy), the plate softly
  embossed rather than bright.

Each variant alternates plate side and varies spacing (impeccable: vary rhythm,
asymmetric, no centered-stack, no identical grid).

## 4. The marginalia control surface

Hidden by default → the slide is a pure full-bleed plate. Revealed by intent,
styled as parts of a book, never a SaaS toolbar:

- **Bottom · gilt page-edge slider** = Swiper pagination rendered as a thin gilt
  rule with folio ticks; the current app is a brighter tick. Appears on
  mouse-move, idle-fades after ~2.5s.
- **Left/right · page-turn** = wide invisible hover zones near each edge; nearing
  one fades in a faint hand-drawn `‹` / `›` like a thumb ready to turn the leaf.
  Click / swipe / arrow keys turn.
- **Top · the ribbon** = on mouse-to-top, a slim cloth **bookmark ribbon** drops,
  carrying: a search field, tag-filter chips, an **app index** (jump to any app),
  a play/pause for autoplay, and a fullscreen toggle. Set in JetBrains Mono +
  Patrick Hand, on a ribbon shape (not a bar), tucked back up on leave.
- **Idle state**: everything gone; just the plate + a faint folio number.

## 5. Motion

- **Between apps**: Swiper `EffectCreative` tuned to a soft lateral drift with a
  few degrees of rotate + slight scale, like a leaf turning. No cube, no flip
  gimmick. Ease-out-expo.
- **Within a slide**: Swiper `Parallax` — title slow, plate medium, margin text
  fast, so depth reveals as you move. On `slideChangeTransitionStart`, a staggered
  reveal: folio number draws in, title ink-blooms (opacity + 6px rise), tags
  fade-up 40ms apart. CSS keyframes by default; GSAP timeline if richer
  orchestration is wanted (skill available). `prefers-reduced-motion` → all
  instant, autoplay off.
- **Autoplay**: ~7s/app, pauses on hover/focus, off under reduced-motion.

## 6. Mobile / landscape

- Portrait phone → **CSS-rotate the deck 90deg** so it renders as a true
  landscape composition the user reads by turning the phone; a one-time
  hand-drawn "turn the book" hint (rotating-phone glyph) auto-dismisses on
  rotate. On entering fullscreen, *attempt* `screen.orientation.lock('landscape')`
  (works on Android Chrome; iOS Safari ignores it — the CSS-rotate already
  covers iOS). Honest constraint, documented in DELIVERY.
- Landscape phone / tablet → the desktop spread, scaled.

## 7. Fullscreen + image zoom

- **Deck fullscreen**: a brass "expand" control in the ribbon → `requestFullscreen`
  on the deck container; ESC exits. The current plate fills the screen.
- **Image zoom**: Swiper `Zoom` on each plate (click / double-click / pinch) for
  an in-place magnify; an explicit "enlarge" affordance opens the full image. (A
  modal lightbox here is the right affordance, not lazy-modal — exempt from the
  modal ban.)

## 8. Engine wiring (Swiper)

- Load `swiper-bundle.min.{css,js}` from jsDelivr (CSP already allows it).
- Modules: Autoplay, Keyboard, Mousewheel(forceToAxis), Zoom, Parallax,
  Pagination(custom render), Navigation(custom), A11y, HashNavigation(slug),
  EffectCreative.
- Build slides from `window.PROJECTS` (filter `show.gallery`), one `swiper-slide`
  per app, variant chosen by data. Tag filter / search / app-index re-filter the
  slide set (rebuild + `swiper.update()`).
- Reuse `js/projects-data.js` (DRY — third view of the one source).

## 9. Anti-patterns to refuse

From impeccable absolute + brand bans, enforced in review:

- No gradient text, no glassmorphism, no side-stripe borders, no hero-metric
  template, no identical card grid (the deck is bespoke spreads), no
  rounded-icon-above-heading, no modal-first (zoom lightbox exempt).
- No em dashes, no emoji in copy. Mono only for genuine meta/code, never as
  "technical" costume.
- Not a black-stage PowerPoint; not centered-stack; not beige-timid (the cream is
  committed, load-bearing).
- Category-reflex check: "portfolio deck" must NOT reflex to dark + neon or
  glassy cards; the parchment-codex lane is the deliberate answer.

## 10. Build sequence + file map

- **New**: `apps-deck.html` (standalone; self-contained `<style>` + a small
  inline script; loads Swiper + `js/projects-data.js`). Optional
  `js/apps-deck.js` if the script grows.
- **Untouched**: `apps-gallery.html`, `js/projects-render.js`, the homepage.
- Build order: (1) shell + Swiper + data→slides + V1 Plate; (2) V2 Specimen + V3
  Sealed + folio/marginalia; (3) controls (ribbon, page-slider, edge-turns) +
  fullscreen + zoom; (4) motion (parallax + reveals) ; (5) mobile rotate.

## 11. Evaluation gates

Each render round (Phase 3):

- `impeccable critique` heuristics + the 4 UI_AUDIT tests (AI-slop /
  category-reflex / project-copy / cross-check-vs-parchment-baseline).
- `minimalist-ui` + `high-end-visual-design` taste spot-check.
- chrome-devtools render at 1440×980 + a mobile portrait viewport (prove the
  landscape rotate). Screenshot per round → `round-N.png` + `round-N-notes.md`.
- Hard-fail any banned pattern; 0 console errors.
