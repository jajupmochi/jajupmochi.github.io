# Homepage 10-Round Optimization — Round Notes

> **Language:** English | [中文](round-notes.zh.md)
>
> One section per round. Each names its lens, the concrete items it changed vs the
> previous state, a self-critique, screenshots taken, and the handoff to the next
> round. See [`00-plan.md`](00-plan.md) for the lens plan.

## Master TOC

- [Round 1 — Above-the-fold / first impression](#round-1--above-the-fold--first-impression)
- [Round 2 — Information hierarchy & scannability](#round-2--information-hierarchy--scannability)
- [Round 3 — Typography system](#round-3--typography-system)
- [Round 4 — Colour & contrast](#round-4--colour--contrast)
- [Round 5 — Spacing, rhythm & density](#round-5--spacing-rhythm--density)
- [Round 6 — Credibility surfaces](#round-6--credibility-surfaces)
- [Round 7 — Motion & micro-interactions](#round-7--motion--micro-interactions)
- [Round 8 — Mobile experience (holistic)](#round-8--mobile-experience-holistic)
- [Round 9 — Performance & technical polish](#round-9--performance--technical-polish)
- [Round 10 — Final QA & cross-cutting](#round-10--final-qa--cross-cutting)

## Round 1 — Above-the-fold / first impression

Lens: the first screen a recruiter judges in ~3s. Applying impeccable's design laws
(hierarchy via scale + weight, clear value/credibility, copy discipline, no AI-slop).

Baseline: `r1-baseline-desktop.png` (1440×980). The notebook hero is EN-only
(`index_en.html`; its 103 `.hn-*` rules live in `parchment-overrides.css`). The
zh/fr/de page (`index_en_clear.html`) has a different hero, so these rounds target
`index_en.html`, the canonical deployed page.

**Done (verified desktop 1440 + mobile 390, `r1-after-{desktop,mobile}.png`):**
- **Credibility line strengthened.** `hn-fact-4` "9 papers published" →
  "9 papers · 130+ citations". Citations are a far stronger signal than paper count
  for top-lab recruiters; 130 is verified from `data/citations.json`
  (`total_citations: 130`, `h_index: 7`, as of 2026-04-21).
- **CV path added.** New `.hn-cv-link` "read my CV ↗" in the identity block, under
  the role → `res/cv/CV_Linlin_Jia_en.pdf` (new tab). The recruiter now has an
  obvious next step above the fold. Styled as parchment ink (inherits the global
  maroon link colour; hero handwriting face + a small hover nudge), not a SaaS
  button — respects the notebook aesthetic and impeccable's "button as first
  thought is laziness".

**Decisions:**
- Left "opened — Apr 2026" as-is: it reads as the notebook's open date (launch
  history), not staleness; a living notebook keeps its opening date.

Handoff to R2 (hierarchy & scannability): confirm a recruiter can reach
Publications / Projects / Experience in one glance; check section order + heading
weight from the hero down.

## Round 2 — Information hierarchy & scannability

Lens: can a recruiter reach the proof (Publications / Projects / Experience) at a
glance. Audit finding: hierarchy is already strong — 11 sections, all H2 32px,
recruiter-first order (open-to-work → about → publications → projects → research →
experience → skills → awards → services → news → contact), a fixed parchment navbar
(57px, 9 maroon links) with a working scroll-spy active state. So this is a light
round: one genuine bug fixed, no churn on an already-sound structure.

**Done (verified, `r2-anchor-jump-fixed.png`):**
- **Anchor-jump occlusion fixed.** Sections had `scroll-margin-top: 0` under a 57px
  fixed navbar, and the nav links are native anchor jumps (`href="#…"` +
  `closeMobileNav()` only), so clicking a nav link jammed the target heading right
  under the navbar. Added `html { scroll-padding-top: 72px }` (`css/main.css`).
  Verified: jumping to #publications lands "Selected Publications" 115px clear of
  the navbar instead of behind it.

Considered, not done (deliberately, to avoid churn): renaming "Projects" →
"Selected Projects" (parallel to "Selected Publications / Awards") would touch
`sections.projects` across all 4 locale files for a marginal gain.

Handoff to R3 (typography): audit the parchment handwriting faces (Reenie Beanie /
Caveat / Patrick Hand) for body legibility, hierarchy steps (≥1.25), line length,
and CJK fallbacks.

## Round 3 — Typography system

Lens: handwriting vs readability. Audit (computed fonts): the type system is
**deliberate** — Reenie Beanie (name, 75px), Indie Flower (EN body, chosen as
"№6 Storyteller, friendly reading", parchment-overrides.css:430), Patrick Hand
(About rows), Caveat (postcard). Sizes/line-heights are reasonable (body ~1.55–1.7,
about prose ~60ch, within the 65–75ch cap). So fonts were NOT swapped — that would
undo a conscious design choice.

**Done (verified, `r3-pub-titles.png`):**
- **Publication titles** (the #1 credibility scan-target) were inheriting the body
  at ~17.5px / weight 600. Bumped `.pub-title` to `font-size: 1.18rem` + `font-weight:
  700` (`css/main.css`) so titles read with more gravitas in the handwriting face,
  without changing the face or breaking card layout.

**FLAG for Linlin (judgment call, not changed — your aesthetic to own):** Indie
Flower is a friendly but *bubbly* hand. On dense credibility content (research
outline, publication titles) seen by top-lab recruiters it trades a little
"serious researcher" for "charm". If you want to lean more credible without losing
the manuscript feel, the lowest-risk move is to use the *neater* Patrick Hand (or a
legible serif) for long-form CONTENT while keeping Reenie/Indie for the name,
headings, and accents. Left as-is pending your call.

Handoff to R4 (colour & contrast): audit WCAG AA of the maroon/ink handwriting on
parchment (thin handwriting faces + light ink can fail contrast); accent budget.

## Round 4 — Colour & contrast

Lens: WCAG AA + accent discipline. Contrast audit (computed luminance ratios vs the
effective background): all content text measures ~18:1 — far above AA (4.5 body /
3.0 large). The ink-on-parchment palette is a genuine a11y STRENGTH; no contrast fix
needed. (The lone apparent "fail" — nav-link 1.11 — was a measurement artifact: the
navbar bg is `oklch`, which my sRGB ratio fn misread; the link is dark ink on light
parchment and clearly passes.)

**Done (verified via computed style, `r4-focus-ring.png`):**
- **Parchment focus ring.** No global focus-outline removal exists, so browser
  default rings still work — but they are blue, which clashes with parchment. Added
  an on-brand maroon `:focus-visible` ring (2.5px, `oklch(0.50 0.17 32)`) for
  a / button / [tabindex] / nav-link / filter-tag / project-card / inputs
  (`parchment-overrides.css`). Keeps WCAG 2.4.7 keyboard a11y while matching the
  manuscript ink; element-specific focus styles still layer on top. Verified:
  nav-link focus shows the maroon outline (`outline: 3px solid oklab(0.45 …)`).

Handoff to R5 (spacing/rhythm): audit section padding rhythm + density. The hero is
visually busy — check whitespace and vertical rhythm without flattening the design.

## Round 5 — Spacing, rhythm & density

Lens: section rhythm + density. Audit (computed): vertical rhythm is consistent and
deliberate — every content section is 36px top/bottom (`#about.section ~ .section`
= 2.25rem, css/main.css:1426), with `section-alt` background alternation for
separation, and a uniform 24px heading→content gap. open-to-work (32/0) and news
(40/40) differ slightly but intentionally. No jank, no defect.

This is an honest audit-confirmation round: the spacing is well-executed, so I did
**not** force a page-wide padding change (that would be churn / a subjective call on
a tuned design). Density in the hero is the deliberate notebook aesthetic, not a bug.

**FLAG for Linlin (optional, not changed):** if you want a slightly more "premium"
breathing feel, the single clean lever is `#about.section ~ .section` padding
`2.25rem → ~2.6rem` (36→42px). One line, reversible. Left as-is pending your call.

Handoff to R6 (credibility surfaces): the recruiter core — Publications / Projects /
Awards / Grants. Check figures, citation cues, links, and sort defaults land the
strongest proof first.

## Round 6 — Credibility surfaces

Lens: the recruiter core. Audit:
- **No broken figures** — 32 `<img>` all load; the lone "empty" one is the reusable
  `.lightbox-img` placeholder (fills on open), not a missing figure. (Matters for a
  launch: a broken figure on a job-hunt site is costly.)
- **Strongest proof leads** — homepage projects sort by priority desc
  (`projects-render.js` `mountHome`) so LIULIAN (flagship) leads; publications use a
  "featured" curation that opens with the recent ICPR 2026 acceptance, with
  citations / newest sorts available.

**Done (verified, accurate):**
- **H-index 6 → 7** on both `index_en.html` and `index_en_clear.html`. The stat card
  hardcoded 6, but the maintained `data/citations.json` says `h_index: 7` (130
  citations, i10 5). Corrected to the verified value — accurate and a stronger impact
  signal for recruiters.

Handoff to R7 (motion): audit hover / scroll animation + `prefers-reduced-motion`
compliance; kill any gratuitous or layout-animating motion.

## Round 7 — Motion & micro-interactions

Lens: hover/scroll motion + reduced-motion. Audit: 79 `@keyframes` / 96 `animation`
usages, but motion a11y is SOUND — a global `*, *::before, *::after`
`prefers-reduced-motion` catch-all (`css/main.css:3399`, durations → near-zero,
iteration-count 1) plus scoped fallbacks for content-critical motion (hero ticker
`animation: none`, carousels, howler). So PLAN H1.M3.G4.T3 ("~70 animations ignore
the OS preference") was actually already resolved — marked `[✓]`.

Micro-interaction note: `howl-float` animates `margin-top` (an impeccable "don't
animate layout" flag), but it's a deliberate workaround — the howler composes two
motions (shake via `transform` + float), and two transform animations can't run on
one element, so float uses margin. A 4px wiggle on one tiny element; negligible.
Left as-is.

Surfaced for R9 (perf): PLAN already lists real wins — font-family trim (drop
Playfair / Orbitron, ~200–400 KB), `canvas-confetti` dynamic import, dedup
Leaflet + Google-Maps map stack.

Handoff to R8 (mobile): holistic phone pass — tap targets, overflow, nav, reading
order, beyond the launch-prep point fixes.

## Round 8 — Mobile experience (holistic)

Lens: full phone pass (390) beyond the launch-prep point fixes. Audit:
- **No horizontal overflow** — `scrollWidth == clientWidth` (390); nothing bleeds
  past the edge. The #1 mobile bug class is absent.
- **Cards stack cleanly** — publications/projects collapse to a single column,
  figure-over-text, no clipping (`r8-mobile-publications.png`).
- **Tap targets** — a naive `<36px` scan flagged 159, but almost all are inline text
  links (exempt from WCAG 2.5.8 target-size) or the hidden postcard inputs. The one
  genuine item was the R1 CV link at 23px tall.

**Done (verified, `r8-mobile-publications.png`):**
- **CV-link tap target.** Added `padding: 3px 2px` to `.hn-cv-link`; touch height is
  now 29px (was 23px), clearing the WCAG AA 24px minimum (2.5.8).

Handoff to R9 (perf): act on the PLAN wins — font trim (Playfair / Orbitron),
`canvas-confetti` dynamic import, dedup Leaflet + Google-Maps.

## Round 9 — Performance & technical polish

Lens: loading / payload. Audit: PLAN T1 (drop Playfair/Orbitron) and T2 (confetti
lazy) are already done (index_en.html:461, 477) — marked `[✓]`. The real remaining
issue was font loading.

**Done (verified, `r9-fonts-merged.png` + `document.fonts.ready`):**
- **EN page: 2 Google Fonts requests → 1.** The Latin (D6.3) request and the
  parchment-handwriting request were separate and BOTH pulled Ma Shan Zheng +
  JetBrains Mono (duplicate downloads). Merged into one request (JetBrains Mono
  weights unioned to @400;500;600;700), removed the duplicate preconnects. One fewer
  round-trip, no duplicate font files. Verified: exactly 1 request, all Latin fonts
  load, hero renders identically (no FOUT).
- **Dropped ZCOOL XiaoWei** (0 uses across css + both index files) on
  `index_en.html` and `index_en_clear.html`.

**FLAG for Linlin (not changed):**
- `index_en_clear.html` (zh/fr/de) never loads the parchment handwriting fonts
  (Reenie Beanie / Indie Flower / Patrick Hand), so its Latin text falls back to
  system cursive/serif. Pre-existing; out of a perf round's scope. Follow-up if you
  want the zh page's Latin to match the EN handwriting.
- PLAN H1.M3.G4.T4 (dedup Leaflet + Google-Maps in the visit map) still open — a real
  win, but it touches map functionality, so left for a focused pass around launch.

Handoff to R10 (final QA): 4 themes × 4 locales sweep, a11y, copy proofread,
AI-slop / impeccable absolute-bans test, consistency.

## Round 10 — Final QA & cross-cutting

Lens: pre-launch gates. Results:
- **i18n parity**: in sync (zh/fr/de match en) — `scripts/check_i18n_parity.py` passes
  (no keys added this session).
- **JSON validity**: all 5 (4 locales + `citations.json`) valid (`jq`).
- **impeccable absolute bans**: no gradient text (`background-clip:text`), no em-dash
  in copy added this session (CV link uses ↗, credibility line uses ·), no emoji in
  chrome copy.

**Done (verified):**
- **Clarity analytics un-blocked.** The CSP `script-src` allowed `www.clarity.ms` /
  `c.clarity.ms`, but Clarity now loads from `scripts.clarity.ms`, so the advertised
  analytics was CSP-blocked (console violation). Aligned `script-src` to the
  `*.clarity.ms` wildcard already used in `connect-src`, on both index files.
  Verified: the CSP-violation error is gone after the fix.

**FLAG for Linlin:**
- An opaque `404 (×5)` remains in the console. It is NOT a missing local asset (all
  referenced images/fonts exist) and is cross-origin (no URL exposed), pre-existing —
  likely a third-party analytics/API endpoint or a localhost-only artifact. Worth a
  glance in the deployed-site console; not blocking.

Cross-cutting: this session's CSS (pub-title, focus ring, CV link, scroll-padding,
font merge) is theme-agnostic or parchment-scoped — no theme-specific logic touched.
