# App Gallery → full-screen deck — research (2026-05-30)

> Research for redesigning the App Gallery as a full-screen, one-app-at-a-time
> "web PowerPoint" deck that still feels like part of the parchment site (a big
> book, not slides on a black stage). Standalone prototype first; merge later.
> **Status: research → feeds 00-plan.md.**

## Master TOC

- [1. The brief, decomposed](#1-the-brief-decomposed)
- [2. Deck engine: Swiper.js (chosen)](#2-deck-engine-swiperjs-chosen)
- [3. Mobile force-landscape: the honest constraints](#3-mobile-force-landscape-the-honest-constraints)
- [4. Content animation](#4-content-animation)
- [5. The "big book, not PowerPoint" aesthetic](#5-the-big-book-not-powerpoint-aesthetic)
- [6. Reuse & DRY](#6-reuse--dry)
- [7. Tools / plugins / resources to use](#7-tools--plugins--resources-to-use)
- [8. Risks & open questions](#8-risks--open-questions)

## 1. The brief, decomposed

From Linlin's spec, the must-haves:

1. **One app per screen**, full-viewport, like a slide deck / web PowerPoint.
2. **Auto-advance** left/right + **manual** swipe/drag + (implied) keyboard.
3. **Controls hidden by default**; reveal on mouse-move or at screen edges
   (search, tag filter, prev/next, slide index). Otherwise: a clean full slide.
4. **Per-slide fullscreen** (browser fullscreen for a single app) — design-forward.
5. **Each slide fully designed** (editorial, not a template card blown up).
6. **Images in a slide are still click-to-zoom** (lightbox).
7. **Slide content can animate / be dynamic.**
8. **Fits the parchment site** — feels like a big book / continuous manuscript,
   NOT a traditional PPT (no floating cards on a dark stage).
9. **Mobile**: force a wide/landscape view (portrait → turn the phone), to
   showcase the design; fullscreen there too.
10. **App selection + tags persist** (pick any app; filter by tag).
11. Standalone page first, for review; decide on merge later.

## 2. Deck engine: Swiper.js (chosen)

Compared the realistic options:

| Engine | Fit | Notes |
|---|---|---|
| **Swiper.js** ✅ | **best** | 3.0M weekly downloads, active (v12.2.0, 2026-05-27). Mobile-first touch slider, fully themeable. Native modules cover almost the whole brief: **Autoplay**, **Keyboard**, **Mousewheel**, **Zoom** (click/double-tap/pinch image zoom → req #6), **Parallax** (per-slide content motion → #7), **Pagination/Navigation**, **A11y**, **EffectFade/Creative/Cube/Cards** (book-ish transitions → #8), **HashNavigation** (deep-link a slide). Vanilla JS, CDN on jsDelivr (already CSP-allowed). |
| reveal.js | poor | The literal "web PowerPoint", but heavily opinionated theme/markup; fighting it to get a parchment-book look costs more than it saves. Lower adoption (38k wk). |
| fullPage.js | poor | Specialized for full-page **vertical** scroll sections; commercial license; less suited to horizontal app slides. |
| vanilla scroll-snap | ok-but | CSS scroll-snap + transforms works, but re-implements touch physics, keyboard, autoplay, image-zoom, effects that Swiper gives free. |

**Decision: Swiper.js.** It directly satisfies auto + manual + keyboard + touch +
image-zoom + content-parallax + deep-link, and is themeable enough to become a
parchment book. Load `swiper-bundle.min.js` + `swiper-bundle.min.css` from
jsDelivr. We override its CSS variables + structure for the parchment look (same
tactic as the giscus theme).

Key Swiper modules to enable: `Autoplay` (pauseOnMouseEnter, disableOnInteraction:false),
`Keyboard`, `Mousewheel` (forceToAxis), `Zoom` (maxRatio, click-to-zoom),
`Parallax`, `Pagination` (custom parchment bullets), `Navigation`, `A11y`,
`HashNavigation` (slug in URL), `EffectCreative` (a gentle page-turn/slide).

## 3. Mobile force-landscape: the honest constraints

This is the one requirement the web cannot fully grant, so it must be designed
honestly:

- `screen.orientation.lock('landscape')` **requires fullscreen + a user gesture,
  and only works on some browsers (Android Chrome). iOS Safari does not support
  programmatic orientation lock at all.** So we cannot truly rotate the device
  on iPhone.
- **Reliable cross-browser approach** (what we'll do):
  1. Detect portrait via `@media (orientation: portrait)` / `matchMedia`.
  2. **CSS-rotate the deck 90°** to render it landscape-in-portrait, so the user
     simply turns the phone to read it the right way up — this *forces a
     wide/landscape composition immediately* without any API, on every browser.
  3. Show a brief, tasteful "turn your phone" hint (auto-dismiss on rotate).
  4. On fullscreen (a tap), *attempt* `screen.orientation.lock('landscape')` —
     succeeds on Android, silently no-ops on iOS (the CSS-rotate already covers
     it).
- Net: portrait phone users get a true landscape composition (via CSS rotate +
  prompt), and where the OS allows, a real orientation lock. This is the honest
  best the platform allows; documented in DELIVERY.md.

## 4. Content animation

- **Swiper Parallax** moves per-slide layers at different speeds as slides
  change (`data-swiper-parallax="-300"`), giving the "dynamic" feel with zero
  extra JS.
- **Swiper EffectCreative** customises the slide transition itself (a soft
  page-turn / drift, not a hard cut) → reinforces "book".
- For richer entrance reveals (ink-bloom, fade-up of title/tags), **GSAP** (have
  the `gsap-core` / `gsap-timeline` skills; in the cross-project resource bank)
  on each slide's `slideChangeTransitionStart`. Optional; CSS keyframes can do a
  lighter version. `prefers-reduced-motion` disables all of it.
- `canvas-confetti` is already bundled on the site (a fun accent we could reuse
  sparingly, e.g. on opening a live demo).

## 5. The "big book, not PowerPoint" aesthetic

The differentiator. Principles for each slide:

- **Continuous parchment**, not cards on a stage: the slide background IS the
  paper; the screenshot sits in a hand-cut frame like a plate pasted into a
  manuscript, captioned in the margin.
- **Editorial spread layout**, varied per app (not one template): big
  screenshot on one side, a "page" of title + role + tags + a hand-set
  description + action links on the other, with marginalia (the washi "Featured"
  tape, an ink rule, a folio number like a book page "iv / xii").
- **Page-turn transition** (EffectCreative) so moving between apps reads like
  turning a leaf of one big book.
- **Type**: the blog/site stack (Patrick Hand display, Spectral / LXGW WenKai
  body, JetBrains Mono meta), parchment palette from `css/blog.css` /
  `parchment-overrides.css`.
- **Controls as marginalia**: the hover/edge controls appear like pencil notes /
  a ribbon bookmark, not a SaaS toolbar.

## 6. Reuse & DRY

- **Data**: read `window.PROJECTS` from `js/projects-data.js` (12 projects, the
  same source the gallery + homepage already use). The deck is a third *view* of
  the one data source — no new content store. (Per the DRY rule established in
  the gallery refactor.)
- **Lightbox**: the gallery's lightbox pattern exists; Swiper's Zoom module is
  simpler for in-slide images, so the deck uses Swiper Zoom (pinch + click) and
  optionally a full lightbox for the "expand" affordance.
- **Palette / fonts / parchment**: reuse `css/main.css`, `parchment-overrides.css`,
  blog tokens.

## 7. Tools / plugins / resources to use

- **Design plugins** (per CLAUDE.md design-task rule, and Linlin's ask to use
  them): `impeccable` (overall direction + `critique` for the audit),
  `minimalist-ui` + `high-end-visual-design` (taste compliance), `gsap-core` /
  `gsap-timeline` (if GSAP animation), `frontend-design`.
- **Critique / quality**: `impeccable critique`; the 4 UI_AUDIT standard tests
  (AI-slop / category-reflex / project-copy / cross-check-with-baseline) applied
  manually (no UI_AUDIT file in repo); hard-fail gradient text, glassmorphism,
  hero-metric template, emoji in copy, em-dash in copy, generic SaaS clichés.
- **Libraries** (all CDN, jsDelivr — already CSP-allowed): Swiper.js bundle;
  optional GSAP. Fonts already loaded site-wide.
- **Render/verify**: chrome-devtools (1440×980 desktop + a mobile portrait
  viewport to prove the landscape-rotate), screenshots per round.
- **Resource bank**: anime.js, three.js, GSAP, useanimations, math-curve-loaders
  (a loading spinner), svgl/lucide/yesicon for any icons — from the CLAUDE.md
  frontend bank.

## 8. Risks & open questions

- **iOS orientation**: cannot truly lock; mitigated by CSS-rotate + prompt
  (above). Flag in DELIVERY.
- **Swiper weight**: the full bundle is ~150KB gzipped-ish; acceptable for a
  dedicated, opt-in showcase page (not the homepage). Could tree-shake to only
  needed modules later if merged.
- **Fullscreen + autoplay**: autoplay should pause on hover/focus and respect
  reduced-motion; fullscreen is a user gesture (a button).
- **Per-slide bespoke design vs scale**: 12 apps. Full bespoke art per slide is
  a lot; the plan uses a small set of editorial *layout variants* (e.g. 3–4)
  assigned by app type, so each feels designed without 12 one-off builds.
- **Merge question** (deferred to Linlin): standalone `apps-deck.html` now; if
  liked, it becomes a third view toggle (`Cards | Detailed | Deck`) on the
  merged gallery, reading the same data.
