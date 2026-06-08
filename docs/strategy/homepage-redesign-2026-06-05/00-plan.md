# Homepage 10-Round Optimization — Plan

> **Language:** English | [中文](00-plan.zh.md)
>
> Linlin is about to publish + promote the homepage (high-stakes job-hunt asset,
> target audience: ML Research Scientist recruiters). After the launch-prep point
> fixes (navbar, teaser, blog TOC, postcard, Howler, footer — shipped 2026-06-05
> V1/V2), this is a deep 10-round optimization pass over the live homepage.

## Master TOC

- [Method](#method)
- [Targets and constraints](#targets-and-constraints)
- [The 10 rounds (lenses)](#the-10-rounds-lenses)
- [Per-round loop](#per-round-loop)
- [Validation gates](#validation-gates)
- [Out of scope](#out-of-scope)

## Method

This is **in-place iterative optimization of the real homepage**, not greenfield
HTML mocks. The homepage (`index_en.html` EN + `index_en_clear.html` zh/fr/de) is
a long, content-rich, already-shipped page; re-mocking the whole thing 10× would
be wasteful and would drift from the live content. So each round:

- targets the **live files** (`index_en.html`, `index_en_clear.html`, shared
  `css/main.css`, `css/parchment-overrides.css`, `css/blog.css`, `js/main.js`),
- is anchored to **one lens** (one theme of improvement), not a grab-bag,
- is **screenshot-verified** in the browser (desktop 1280–1440 + phone 390) and
  **committed** on its own, with a short note appended to `round-notes.md`.

Design-plugin rule (project `CLAUDE.md`): rounds that touch colour / type /
motion / layout invoke the matching `impeccable` sub-command first, not hand CSS.

## Targets and constraints

- **Audience:** ML Research Scientist recruiters (Isomorphic Labs, DeepMind-adjacent).
  In < 10 seconds they must see: who she is, that she is strong, and where the
  proof (publications, projects, grants) is.
- **Aesthetic:** parchment / handwritten manuscript. Keep it — but never let the
  handwriting fonts cost legibility or credibility.
- **Hard bans (impeccable + project):** no gradient text, no glassmorphism as
  default, no emoji in UI chrome copy, no em dashes in user copy, no side-stripe
  accents, no hero-metric template, no identical card grids, no AI-slop.
- **Must not break:** 4 themes (ai-generated / academic / industrial / fancy),
  4 locales (en/zh/fr/de) key parity, JSON validity, CSP, a11y, the welcome
  postcard exact-match just locked in V2.

## The 10 rounds (lenses)

| R | Lens | Attacks |
|---|------|---------|
| 1 | **Above-the-fold / first impression** | hero name + title + "open to work" signal + instant credibility line; the first screen recruiters judge in 3s. |
| 2 | **Information hierarchy & scannability** | section order, headings, visual weight; can a recruiter reach Publications / Projects / Experience in one glance. |
| 3 | **Typography system** (`impeccable typeset`) | handwriting vs readability; body legibility, ≥1.25 scale steps, 65–75ch line length, CJK fallbacks. |
| 4 | **Colour & contrast** (`impeccable colorize` / `critique`) | ink palette discipline, WCAG AA on parchment, accent (cinnabar/maroon/gilt) ≤ its budget. |
| 5 | **Spacing, rhythm & density** (`impeccable layout`) | section padding rhythm, whitespace, de-clutter, vertical rhythm. |
| 6 | **Credibility surfaces** | Publications + Projects + Awards + Grants — the recruiter core: figures, citations, links, sort defaults. |
| 7 | **Motion & micro-interactions** (`impeccable animate`) | purposeful hover/scroll motion, kill gratuitous animation, reduced-motion parity. |
| 8 | **Mobile experience (holistic)** | end-to-end phone pass beyond today's point fixes: tap targets, overflow, nav, reading order. |
| 9 | **Performance & technical polish** | image lazy-load/decoding, font payload, console cleanliness, CSP, CLS. |
| 10 | **Final QA & cross-cutting** (`impeccable polish` / `audit`) | 4 themes × 4 locales sweep, a11y, copy proofread, AI-slop test, consistency. |

Each round names, in `round-notes.md`, the 5–7 concrete items it changed vs the
previous state, plus a self-critique and the screenshots taken.

## Per-round loop

1. Diagnose the lens on the current live page (read + screenshot baseline).
2. (If design lens) invoke the matching `impeccable` sub-command for direction.
3. Apply focused edits to the live files.
4. Verify in browser: desktop + phone screenshots, 0 console errors.
5. Append a dated note to `round-notes.md` (items changed, critique, handoff).
6. Commit the round (`feat(home): rNN <lens> …`), local only.

## Validation gates (every round)

- Screenshot at 1280–1440 desktop and 390 phone; 0 console errors / warnings.
- i18n parity (`scripts/check_i18n_parity.py`) if any `data-i18n` added.
- `jq .` on any touched JSON.
- Hard-ban scan (gradient text / glass / emoji-chrome / em-dash / side-stripe).
- Spot-check the 4 themes when CSS is theme-wide.

## Out of scope

- The blog subsystem (separate from the homepage; its own backlog in PLAN.md H3.M3.2).
- The 3D room (`personal.html`, deferred — navbar shows the teaser).
- New content/claims (content source of truth stays the CV + `extra_info_work.md`).
- Pushing/deploying (local commits only until Linlin authorises a push).
