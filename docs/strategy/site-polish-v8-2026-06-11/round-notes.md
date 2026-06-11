# Site Polish v8 — Round Notes

> One-sentence purpose: per-round log of the 5 full-site optimization rounds (all changes in v8 files + polish stylesheets; originals untouched).

## Master TOC

- [Round 1 — Readability](#round-1--readability)
- [Pending locale edits (apply at swap)](#pending-locale-edits-apply-at-swap)

## Round 1 — Readability

Lens: 可读性. The two-tier type system — **voice tier** (handwriting: Reenie/Indie/Patrick)
keeps headings, names, labels, chips, hero; **reading tier** (Spectral serif, ≥16px,
lh≈1.6, ≤72ch) takes every surface a visitor reads for more than a glance. Grounded in
research (USWDS/Toptal/Harvard: ≥16px, lh 1.5, 45–90ch; ≤2 content faces).

**Changed (css/polish.css R1 block):**
- Homepage prose → serif: research-outline paragraphs (was Indie Flower 21px/600),
  news content, timeline/experience descriptions, project-card descriptions,
  pub authors/venue (15.2px meta), open-to-work note, footer legal. Voice tier
  verified intact (about rows Patrick Hand, section titles Indie Flower).
- Gallery card hover-descriptions → serif 15.2px.

**Changed (css/blog-polish.css R1 block):**
- Post body (`.markdown-body`/`#blogPostBody`) → Spectral 17px/1.68 via the existing
  `--blog-fs/--blog-lh` tokens (reading-size widget still works; comfort mode intact).
  Headings/code/links untouched (handwriting + mono + crisp maroon).
- List: excerpts → serif 15.5px; titles bumped 1.15→1.32rem (hierarchy).

**Verified:** computed fonts/sizes on home (research/news/pub-meta/timeline serif;
about-rows/section-titles handwriting), blog post (Spectral 16.96px/1.68), blog list,
gallery. Screenshots: `r1-blog-post.png`, `r1-home-research.png`, `r1-blog-list.png`.
Deck already used Spectral for prose (no change); personal page has no prose surfaces.

Critique → next: blog list still lacks site-navbar coherence; gallery header plain;
footers inconsistent — that's R2 (theme coherence).

## Pending locale edits (apply at swap)

(none yet)
