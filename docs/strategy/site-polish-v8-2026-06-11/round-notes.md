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

## Round 5 — QA lock

Lens: cross-cutting QA on the whole v8 set.

- **Mobile 390×844**: blog (no overflow; nav extras hide, CV pill forced visible —
  blog.css hides `.blog-nav-home` on phones and the pill inherited it, fixed),
  gallery (no overflow, full nav set), EN home (no overflow), personal + deck load clean.
- **Found + fixed a PRE-EXISTING live bug**: the zh page's navbar link row forced the
  page to 458px on phones (horizontal scroll on the whole site for zh mobile users).
  Contained the navbar; the link row scrolls inside itself (`clear-polish.css` R5).
- **Theme spot-check**: `academic` theme keeps the Patrick-Hand reading tier; no breakage.
- **Console**: 0 errors/warnings across all six v8 pages.

## Review fixes (Linlin, 2026-06-11)

1. **Timeline truncation** — the R1 72ch measure cap pinned timeline/news text to the
   left ~60% of their wide cards (read as truncation). Cap removed; paragraphs span
   their designed card width again (956px of 1004px verified).
2. **No CV on blog/gallery** — CV pill + nav links + both hire-line CV mentions removed;
   the friendly signposts stay (publications · pat 旺财 / "built with care (and one
   paper cat)").
3. **Gallery defaults to deck** — confirmed intact in v8 (bare URL redirects to the
   deck; the grid only shows with ?view=, the preview link had used ?view=cards).
4. **R3 made VISIBLE** — Linlin couldn't see the personality round (it was all
   micro/hover-level). Added two always-visible signatures: a hand-drawn cinnabar
   ink swash under every homepage section title, and 旺财's fading paw trail at the
   very end of the home + gallery footers (first placement hid behind the legal text —
   probe-debugged, moved to .footer-legal::after). Demo shots: title swash
   (`fix1-experience.png`), paw trail (`fix4-paws-final.png`), gilt selection
   (`fix4-selection-demo.png`); the sign-off paw was already in `r3-signoff.png`.

## Review fixes round 2 (Linlin, 2026-06-11)

1. **Title swash removed** — the hand-drawn wavy underline under homepage section titles
   is gone (`.section-title::after` deleted from polish.css).
2. **index_en_clear → index_zh_clear** — history confirmed (commit 38117b6): the clear
   page is the pre-parchment OLD EN homepage, kept to serve zh/fr/de via i18n (its inline
   content is English; the loader renders zh — hence "打开是中文"). No lost English
   version exists to restore. Renamed in v8: `index_zh_clear_v8.html` (self-refs fixed),
   `index_en_v8.html` hreflangs now point at `index_zh_clear.html`. Shared-file edits
   (js/main.js router ×2, sitemap.xml ×3) + an `index_en_clear.html` redirect stub are
   in the swap checklist below.
3. **Fluff lines deleted** — gallery "All of these are real, running systems…" and blog
   "More of me: …" footer lines removed (plus their CSS); swept other pages — no other
   added filler remains (pre-existing original copy untouched).
4. **Gallery title + spacing reverted** — back to the original plain `pf-title`
   (drop-cap/section-title treatment removed, head spacing back to compact).

## Pending locale edits (apply at swap)

- `blog.nav_apps` / `blog.nav_personal` (+ zh/fr/de) if Linlin wants the new blog nav
  links translated (currently plain English text without data-i18n).

## Swap checklist additions (shared files, apply at swap)

- `js/main.js` lines ~604 + ~938: `'index_en_clear.html'` → `'index_zh_clear.html'`.
- `sitemap.xml`: 3 hreflang URLs + comment → `index_zh_clear.html`.
- Keep a redirect stub at `index_en_clear.html` (meta refresh → `index_zh_clear.html`)
  so old indexed/bookmarked URLs survive.
- `cp index_zh_clear_v8.html index_zh_clear.html` (new file) instead of overwriting the
  old name.
