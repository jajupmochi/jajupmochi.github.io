# Update Log

> **Language:** English | [中文](UPDATES.zh.md)
>
> Mandatory development log per `CLAUDE.md` Hard Rules. Every change set MUST add an entry here in the same edit batch.
>
> Format: `# YYYY-MM-DD` (UTC) as date heading. If a single day has multiple distinct change-sets, group each under `## V1`, `## V2`, `## V3` H2 sub-headings under the date. Bullet list items: short `- <what changed>` lines, optionally with a `<file>:<line>` pointer.

# 2026-04-21

## V3 — Documentation overhaul (Master Plan + bilingual dual-file convention)

Goal: give every reader (visitor / maintainer / AI agent) an entry point sized for them, and keep the roadmap + changelog in sync. Rolls out the H/M/G/T hierarchy across all project docs. All new docs are bilingual (`NAME.md` + `NAME.zh.md`). Resolves `H4.M1.G1..G4` and `H4.M2.G1` in `PLAN.md`.

- **`PLAN.md` (new)** — Master roadmap with status legend, ID system (`H<n>.M<n>.G<n>.T<n>`, never re-numbered), hierarchy convention (Horizon → Milestone → Goal → Task), Master TOC, and 5 populated Horizons: H1 (job-hunt asset), H2 (ops & maintenance, all `[?]` items surfaced), H3 (content expansion), H4 (docs / AI infra), H5 (career outreach). Maintenance protocol at the bottom.
- **`PLAN.zh.md` (new)** — full Chinese mirror, preserving all H/M/G/T IDs in English, translating only prose.
- **`CLAUDE.md`** — added 4 new hard rules: mandatory `UPDATES.md` daily log (pre-existing from V1, re-stated); mandatory `PLAN.md` sync in same edit batch when status changes; mandatory Master TOC on every markdown doc; mandatory bilingual dual-file rule (`NAME.md` canonical + `NAME.zh.md` mirror, language banner at top, code/IDs English in both). New "Documentation conventions" section explaining Master TOC / PLAN.md / UPDATES.md / hierarchy + status markers / bilingual rule.
- **`CLAUDE.zh.md` (new)** — full Chinese mirror of CLAUDE.md.
- **`README.md`** — rewrote with reader-segmented sections: "For visitors (recruiters, collaborators)" (homepage / CV / contact), "For the maintainer (Linlin / future me)" (quick actions table, manual one-time setup checklist with 4 items mapped to PLAN.md IDs, repo layout, where each feature is documented, how-to recipes), "For AI agents (Claude Code, etc.)" (entry-point files, roadmap + changelog, project skills). Open Graph card section, themes, deploy notes preserved.
- **`README.zh.md` (new)** — full Chinese mirror.
- **`UPDATES.md`** — added language banner + this V3 entry.
- **`UPDATES.zh.md` (new)** — full Chinese mirror.
- **`setup/README.md`** — added language banner + Master TOC with cross-refs to PLAN.md (`H2.M1` roadmap) + per-file detailed guide links.
- **`setup/README.zh.md` (new)** — full Chinese mirror.
- **`setup/form-backend-google-sheets.md`** — added language banner + Master TOC + PLAN.md cross-ref (`H2.M1.G1`, `H2.M2.G4`).
- **`setup/form-backend-google-sheets.zh.md` (new)** — full Chinese mirror.
- **`setup/analytics-clarity.md`** — added language banner + Master TOC + PLAN.md cross-ref (`H2.M1.G2`, `H2.M1.G4`).
- **`setup/analytics-clarity.zh.md` (new)** — full Chinese mirror.
- **`setup/analytics-backup.md`** — added language banner + Master TOC + PLAN.md cross-ref (`H2.M1.G4`, `H2.M3.G1`, `H2.M3.G2`).
- **`setup/analytics-backup.zh.md` (new)** — full Chinese mirror.
- **`setup/security-headers.md`** — added language banner + Master TOC + PLAN.md cross-ref (`H1.M2` SEO schema deps, `H2.M1.G1/G2` Sheets / Clarity origins).
- **`setup/security-headers.zh.md` (new)** — full Chinese mirror.
- **Status rollups (both `PLAN.md` + `PLAN.zh.md`)**: `H4.M1.G2.T1..T3` → `[✓]`; `H4.M1.G3.T1..T3` → `[✓]`; `H4.M2.G1.T1..T3` → `[✓]`. Added new `H4.M1.G4` Goal (Bilingual docs) with T1/T2/T3 `[✓]` + T4 `[ ]` (future pre-commit parity check). `M4.1` → `[✓]` (all goals done); `M4.2` → `[ ]` (G1 done, G2 how-tos pending); H4 aggregate → `[ ]` (M4.2/M4.3 still have pending work).

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
