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

### R1 correction (Linlin, mid-R5)

Linlin: readability up, **but the reading face must still look handwritten** (notebook
theme). Reworked: reading tier = **Patrick Hand** (the neatest loaded handwriting
family) instead of Spectral — home prose 18.4px/1.66 (was Indie Flower 21px/600), blog
body back to Patrick Hand with tuned tokens 17.3px/1.7, excerpts/gallery/pub-meta in
Patrick Hand. Verified on home + blog (`r1b-*.png`). If even more legibility is ever
wanted: propose a *legible-handwriting* font (Shantell Sans / Kalam) — never plain serif.

## Round 2 — Theme coherence

Lens: 主题. The secondary pages now speak the homepage's language and the four-page web
is fully connected.

**Changed:**
- `blog_v8`: navbar + footer gain Apps · Personal (full site set: Home·Apps·Personal·Blog
  ·GitHub·RSS); nav extras hidden ≤640px (`blog-polish.css` R2).
- `apps-gallery_v8`: nav + footer gain Personal; the page title now carries the homepage's
  illuminated drop-cap treatment (`section-title` + an inert `data-i18n` span as the CSS
  hook — no i18n loader on this page, documented inline).
- Deck + personal pages intentionally keep their immersive minimal chrome (by design);
  zh clear page stays within its own system.

**Verified:** blog nav/footer link sets via DOM; gallery drop-cap + nav via screenshot
(`r2-gallery-head2.png`).

## Round 3 — Personality

Lens: 个性. Tactile micro-details per the 2026 hand-made trend: gilt-highlighter
`::selection`; parchment-ink page scrollbars (thin dowel, cream border); blog posts
sign off "— Linlin" with 旺财's ink paw print (SVG data-URI); stat-card pinned-note
wiggle + skill-tag ink-dip hovers; gallery Personal link wears the paw icon.
Verified: sign-off + paw render (`r3-signoff.png`); hover transitions live.

## Round 4 — Visitor flow (interviewers)

Lens: 面试官 30-second rule. CV is now ONE click from every chrome surface: blog navbar
(dashed CV pill) + footer signpost ("Hiring? Read my CV · browse the publications · or
come pat 旺财."), gallery navbar CV link + footer line ("All of these are real, running
systems — hiring? read my CV."). Homepage already carries (my cv) in About + footer set.
Verified: `r4-blog-footer.png`.

## Pending locale edits (apply at swap)

- `blog.nav_apps` / `blog.nav_personal` (+ zh/fr/de) if Linlin wants the new blog nav
  links translated (currently plain English text without data-i18n).
