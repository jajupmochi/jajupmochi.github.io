# Update Log

> Mandatory development log per `CLAUDE.md` Hard Rules. Every change set MUST add an entry here in the same edit batch.
>
> Format: `# YYYY-MM-DD` (UTC) as date heading. If a single day has multiple distinct change-sets, group each under `## V1`, `## V2`, `## V3` H2 sub-headings under the date. Bullet list items: short `- <what changed>` lines, optionally with a `<file>:<line>` pointer.

# 2026-04-21

## V2 — SEO audit follow-through (6 warnings + 5 opportunities)

- **Title + meta description (`index_en.html`)**: Rewrote title to ~77 chars including `Ph.D. | ML Research Scientist · Graph ML / GNN / LLM · Postdoc @ Bern`; expanded description to ~158 chars including "Open to roles in Switzerland / EU / remote".
- **hreflang → `?lang=` URL variants (`index_en.html:34-38` + `sitemap.xml` + `js/main.js`)**: Each locale now has a distinct crawlable entry point (`?lang=en|zh|fr|de`). `main.js` reads URL param first (> localStorage > navigator) and persists it back into localStorage so navigation stays sticky.
- **FAQPage JSON-LD (`index_en.html`)**: Added 5 Q&A entries covering research area, availability, graph ML definition, open-source libs, contact — optimizes for ChatGPT/Perplexity/Claude citation + Google SGE.
- **BreadcrumbList JSON-LD (`index_en.html`)**: 6 breadcrumbs (Home → About → Research → Projects → Publications → Contact) for richer SERP display.
- **`rel="noopener noreferrer"` pass (`index_en.html`)**: Added to 23 external `target="_blank"` anchors (project-card ×4, pub-link ×13, social-link-personal ×4, hero CV download, Google Scholar text link, Zhihu footer link). Closes window.opener leak and modest SEO benefit.
- **Publications pub-thumbnail `width`/`height` attrs (`index_en.html`)**: ICPR / JCC / ACPR `<img>` fallbacks now have explicit `180×140` for pre-CSS CLS protection.
- **Projects → SVG figure embeds (`index_en.html:916-970`)**: Replaced FontAwesome-on-gradient placeholder for Spatio-Temporal GNN + RedoxPrediction cards with `<object type="image/svg+xml">` (PNG fallback). Added two new project cards — **GraphInk** (handwriting recognition, SNSF 2024-, HES-SO + TU Dortmund) and **Graph Matching Algorithms** (SNSF 2023-2024, PRG Bern) — each embedding its matching research figure. All 4 SVG pairs now live in both project AND publication cards per the one-to-many mapping from Task #48.
- **Welcome popup heading (`index_en.html:438`)**: Changed `<h2>Welcome</h2>` → `<p class="welcome-heading" role="heading" aria-level="2">Welcome</p>` so the sole page H2-before-H1 (in DOM order, inside modal) no longer leaks into Googlebot's heading-hierarchy analysis. CSS updated to style both selectors.
- **AVIF hero photo (`images/photo.avif` new + `index_en.html:556`)**: Generated 28 KB AVIF via `ffmpeg libaom-av1` (vs 59 KB WebP, 145 KB JPEG). `<picture>` now has AVIF → WebP → JPEG source order for best-case LCP on modern browsers.
- **Sitemap depth (`sitemap.xml`)**: Expanded from 3 → 13 URLs. Added 4 `?lang=` variants, `/blog/`, and all 4 research figure SVGs. Declared hreflang alternates via `xhtml:link` on the canonical homepage entry.
- **CSS welcome-heading rule (`css/main.css:956`)**: Mirrors `.postcard-header h2` styles onto `.postcard-header .welcome-heading` so the `<p>` swap is pixel-identical. Negated `.postcard-header p:not(.welcome-heading)` to keep subtitle styling intact.

## V1 — Content audit, figures, update log

- **CLAUDE.md**: Added new mandatory hard rule — every change must update `UPDATES.md`.
- **UPDATES.md** (new): Created the development log with backfill of 2026-04-20 work.
- **Publications (`index_en.html` + `data/citations.json` + JSON-LD)**: Replaced 3 hallucinated entries (WL-Kernel/PR 2021, Pre-image/ICML 2020, GED Review/TCBB 2019) with the real CV publications [J24, C23, J23, J22b, J22a, J21, W21b, W21a, P16] + ICPR 2026 accepted paper. Fixed wrong author lists for [J24] and [C23].
- **Projects (`index_en.html`)**: Added Graph Matching Algorithms (2023-2024 SNSF), GraphInk Handwriting (2024-, SNSF), LIULIAN platform (key personal infra), PLANALYSER (2024-2025 Innosuisse), Local Confidential Translator (personal MVP). Refreshed copy of N-Banker, Spatio-Temporal GNN, OCTOPUSSY, Virtual Bodmer to match `extra_info_work.md`.
- **Figures (`res/figures/`)**: Inserted four SVG-with-PNG-fallback figure pairs into matching project + publication cards using `<object type="image/svg+xml">` (so search engines can index SVG XML content for SEO). Mappings: `2023_acpr_gecl` → C23 + Graph Matching project; `2025_graphink` → GraphInk project; `2026_icpr_swissriver` → Spatio-Temporal GNN project + ICPR 2026 pub; `jcc2023_redox` → J24 pub + RedoxPrediction project.
- **CSP (`index_en.html`)**: Relaxed `object-src 'none'` → `object-src 'self'` to allow inline SVG embedding from same origin.
- **News (`index_en.html`)**: Added 2025 / 2024 entries reflecting GraphInk + LIULIAN + N-Banker chatbot demo at InnoEx 2026 HK.
- **Skills (`index_en.html`)**: Added agent-skills (`python-backend-creator`, `project-adaptor`) and vibe-coding tooling (Claude Code, Codex, etc.) tags.
- **Stats (`index_en.html`)**: Updated publication count from 9 → 10 to reflect ICPR 2026 + corrected pubs.
- **i18n (`locales/{en,zh,fr,de}.json`)**: No new translation keys required; HTML changes use existing keys + raw English/Chinese for technical project names.
- **CSS (`css/main.css`)**: Added `.project-image object`, `.pub-thumbnail object` rules so embedded SVG fills its container with `object-fit: cover`.

# 2026-04-20

## V1 — v7 redesign deployment + P0 SEO/a11y overhaul

- Deployed `index_en_v7_round3.html` to `index_en.html` — full redesign: new hero, OG card, favicon, locales, theme switcher (ai-generated/academic/industrial/fancy).
- Fixed canonical redirect, deduped sitemap, added `WebSite` JSON-LD schema, preloaded Font Awesome webfonts.
- Fixed Lighthouse label-mismatch + mobile touch-target a11y warnings.

## V2 — Site ops batch (forms, analytics, CSP, mobile)

- Welcome postcard form → Google Sheets backend (Apps Script + GH-Actions cron mirror).
- Microsoft Clarity injected without cookie-consent flow.
- CSP / Referrer-Policy / X-Content-Type meta hardening.
- Mobile navbar hamburger.
- Postcard welcome i18n keys synced across en/zh/fr/de.

## V3 — Tooling

- `.githooks/pre-commit` runs `scripts/check_i18n_parity.py` on staged `locales/*.json`.
- `.claude/settings.json` PostToolUse hook validates JSON after edits.
- Project skills added: `/preview`, `/verify-visual`, `/new-round`, `/deploy-round`, `/i18n-sync`.
- Consolidated deployment README under `setup/`.

## V4 — Static refactor

- Extracted CSS (~2.7k lines) → `css/main.css` and JS (~850 lines) → `js/main.js`.
- `index_en.html` shrunk from 4852 → 1289 lines.
- Welcome postcard fully i18n'd; full-site i18n audit completed; `zh` switched to the unified main site.

# 2026-04-02

- Manually refreshed `data/citations.json` with current Google Scholar metrics (`total_citations: 130`, `h_index: 7`, `i10_index: 5`).

# 2024-01-17

- `f64a27a` — Updated CV PDFs (`res/cv/CV_Linlin_Jia_{en,zh}.pdf`).

# 2023-12-13

- `c9b8cd0` — Heavy CV refresh.

# 2023-10-24

- `5329c74` — Added a paper + CV update.

# 2023-09-27

- `3383a4d` — Added new papers + CV update.
