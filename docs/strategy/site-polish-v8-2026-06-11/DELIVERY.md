# Site Polish v8 — Delivery (awaiting approval)

> One-sentence purpose: what the 5-round full-site optimization built, how to preview it, and how the approval swap works. **Originals untouched.**

## Master TOC

- [How to preview](#how-to-preview)
- [What changed per round](#what-changed-per-round)
- [Files](#files)
- [Approval swap](#approval-swap)

## How to preview

```
python3 -m http.server 8000
```
- Home: `http://localhost:8000/index_en_v8.html?lang=en`
- Blog list: `…/blog_v8.html?lang=en` · post: `…/blog_v8.html?post=how-i-built-this-blog&lang=en`
- Gallery: `…/apps-gallery_v8.html?view=cards` · Deck: `…/apps-deck_v8.html`
- Personal: `…/personal_v8.html` · zh home: `…/index_en_clear_v8.html?lang=zh`

(Links inside v8 pages point at the ORIGINAL filenames so they are drop-in correct at swap; navigating away from a v8 page during preview lands on the live originals — expected.)

## What changed per round

1. **R1 可读性** — reading tier = **Patrick Hand** (neatest handwriting; Linlin's correction: stay handwritten, no serif) at ≥17px / lh 1.66–1.7 / ≤72ch for all sustained prose (blog body+excerpts, home research/news/timeline/projects/pub-meta, gallery descs). Voice tier (Reenie/Indie/Caveat) keeps headings/labels/hero.
2. **R2 主题** — blog + gallery join the site nav language (Home·Apps·Personal·Blog·GitHub·CV); gallery title gets the illuminated drop-cap; four-page web fully connected. Deck/personal stay immersive by design; zh page polished within its own clean system.
3. **R3 个性** — gilt `::selection`; parchment-ink page scrollbars; blog posts sign off "— Linlin" + 旺财 ink paw; stat-card wiggle + skill-tag ink-dip hovers; paw icon for Personal in the gallery.
4. **R4 面试官动线** — CV literally one click from every chrome surface (blog CV pill + footer signpost; gallery nav + footer hire line), per the 30-second hiring-manager rule.
5. **R5 QA** — mobile pass all pages; **fixed a pre-existing live bug** (zh navbar forced 458px page width on phones); theme spot-check; 0 console errors.

## Files

- New pages: `index_en_v8.html`, `index_en_clear_v8.html`, `blog_v8.html`, `apps-deck_v8.html`, `apps-gallery_v8.html`, `personal_v8.html`
- New stylesheets (version-neutral names; swap needs no renames): `css/polish.css`, `css/blog-polish.css`, `css/clear-polish.css`
- Unchanged: all originals, `js/*`, `locales/*`, `data/*`

## Approval swap

1. `cp <page>_v8.html <page>.html` for each approved page.
2. Apply pending locale edits (see round-notes) + parity check.
3. Re-verify originals in browser; UPDATES/PLAN entries; commit + push.
