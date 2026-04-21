# Update Log

> **Language:** English | [中文](UPDATES.zh.md)
>
> Mandatory development log per `CLAUDE.md` Hard Rules. Every change set MUST add an entry here in the same edit batch.
>
> Format: `# YYYY-MM-DD` (UTC) as date heading, **newest day on top**. Within a single day, use `## V1`, `## V2`, `## V3` H2 sub-headings **with the highest V number on top** so the most recent work lands first.

## Master TOC

- [2026-04-21](#2026-04-21)
    - [V7 — A4 thesis integration (timeline + Publications highlight)](#v7--a4-thesis-integration-timeline--publications-highlight) — Ph.D. dissertation surfaced on-site for the first time: PhD timeline now exposes Thesis PDF + Defense slides buttons; Publications section opens with a featured highlight card above filters. 6 new `thesis.*` i18n keys × 4 locales (119 total). Cross-theme visual verify via chrome-devtools.
    - [V6 — Batch A wrap-up + SEO audit round-2 P0 cleanup](#v6--batch-a-wrap-up--seo-audit-round-2-p0-cleanup) — Batch A: `about.p5` collaborators reverted (will move to cards in Batch B), Personal/Blog coming-soon toast, cross-theme lightbox verified. SEO round-2: 4 `href="#"` dead links fixed, meta description 210→~160 chars.
    - [V5 — Content polish, collaborators surface, figure lightbox, timeline i18n parity](#v5--content-polish-collaborators-surface-figure-lightbox-timeline-i18n-parity) — MSc/BSc line appended to About, new `about.p5` collaborators summary, 5 `exp.desc_*` keys × 4 locales, services cards restructure, click-to-enlarge lightbox (CSS + JS + a11y).
    - [V4 — Docs folder reorg + vibe audit integration](#v4--docs-folder-reorg--vibe-audit-integration) — PLAN/UPDATES/setup → `docs/`, Jekyll archived, vibe items land as `H1.M2.G4` + `H1.M3.G4` + new `H1.M4`.
    - [V3 — Documentation overhaul (Master Plan + bilingual dual-file)](#v3--documentation-overhaul-master-plan--bilingual-dual-file-convention) — new `PLAN.md`, 9 Chinese mirrors, CLAUDE hard rules.
    - [V2 — SEO audit follow-through](#v2--seo-audit-follow-through-6-warnings--5-opportunities) — hreflang URL variants, FAQ/Breadcrumb JSON-LD, AVIF hero, sitemap depth 3→13.
    - [V1 — Content audit, figures, update log](#v1--content-audit-figures-update-log) — real CV publications, 4 SVG project figures, UPDATES.md created.
- [2026-04-20](#2026-04-20)
    - [V4 — Static refactor](#v4--static-refactor) — CSS/JS extracted out of `index_en.html` (4852 → 1289 lines).
    - [V3 — Tooling](#v3--tooling) — pre-commit i18n-parity hook, PostToolUse JSON validator, 5 project skills, `setup/` README.
    - [V2 — Site ops batch](#v2--site-ops-batch-forms-analytics-csp-mobile) — Google Sheets form backend, Clarity analytics, CSP hardening, mobile hamburger.
    - [V1 — v7 redesign deployment + P0 SEO/a11y](#v1--v7-redesign-deployment--p0-seoa11y-overhaul) — full redesign live, canonical/sitemap/WebSite schema, Lighthouse a11y fixes.
- [2026-04-02](#2026-04-02) — manual Google Scholar citations refresh (130 / 7 / 5).
- [2024-01-17](#2024-01-17) — CV PDFs updated.
- [2023-12-13](#2023-12-13) — heavy CV refresh.
- [2023-10-24](#2023-10-24) — new paper + CV update.
- [2023-09-27](#2023-09-27) — new papers + CV update.

# 2026-04-21

## V7 — A4 thesis integration (timeline + Publications highlight)

Goal: close out the last Batch A item — surface Linlin's Ph.D. dissertation in two discoverable places. The thesis was listed in the CV (`res/cv/CV_Linlin_Jia_en.pdf`) but had no on-site touch point, which hurt two audiences at once: recruiters looking for evidence of deep research training, and the Publications section itself (which opened straight on a 2026 paper while the ~260-page dissertation sat offstage).

### What changed

- **PhD timeline entry (`index_en.html:888-895`)**: Added a `.timeline-links` action row directly under `timeline-desc`. Two buttons using the existing `.pub-link` class so the theme-adaptive hover tint already verified in V5 carries over without new CSS audits:
    - **Thesis PDF** → `res/thesis/2021_thesis_linlin_jia.pdf` (new asset, 7.7 MB).
    - **Defense slides** → `res/thesis/2021_thesis_slides_linlin_jia.pdf` (new asset, 8.1 MB, preserved verbatim from 2021).
- **Thesis highlight block at the top of Publications (`index_en.html:1031-1050`)**: Featured `.thesis-highlight` card placed above the filter controls so it stays visible under any filter (`All` / `Journal` / `Conference` / `Preprint`) + any sort (Newest / Oldest / Most cited). Not part of `.pubs-list` so it's never sorted away. Components:
    - Circular icon wrapper (`fa-book-open`) with theme-adaptive background (`--bg-subtle`).
    - 4 px left-border accent in `--primary` (falls back to `--accent` in `fancy`).
    - Badge: "Ph.D. Dissertation · 2021" in uppercase-letter-spaced primary tint.
    - Title (thesis's full title), meta line (`L. Jia · LITIS Lab, INSA Rouen Normandie, France`), one-sentence description with advisor attribution.
    - Two download buttons (Thesis PDF + Defense slides) matching the timeline set — duplication is intentional: recruiter may skim top-down and never click into Experience.
- **CSS (`css/main.css`)**: New `.thesis-highlight*` block (7 rules: container, icon, body, badge, title, meta, desc, links) + a single-rule `.timeline-links` utility for the PhD-timeline button row. All rules use the existing `--bg-white` / `--bg-subtle` / `--border-light` / `--text-*` / `--primary` vars so `ai-generated` / `academic` / `industrial` / `fancy` inherit without new theme forks. Mobile breakpoint at `max-width: 600px` collapses the icon-beside-text layout into an icon-above-text stack.
- **i18n keys — 6 new × 4 locales = 24 new strings**: `thesis.badge`, `thesis.title`, `thesis.institution`, `thesis.subtitle`, `thesis.download`, `thesis.slides` added to EN / ZH / FR / DE. Thesis title kept as the original English phrase in all 4 locales (academic convention — papers / dissertations don't get translated titles). Parity verified at 119 keys across all 4 via `scripts/check_i18n_parity.py`.

### Cross-theme visual verification (chrome-devtools)

- `fancy` (default at session start): pink/magenta left border, pink icon circle, readable on soft-pink background.
- `ai-generated`: purple `--primary`, white card bg, book icon clean on light grey circle.
- `industrial` (dark): orange/amber accents on dark card, high-contrast text, buttons readable.
- `academic`: skipped as a separate screenshot — shares the light scheme with `ai-generated` and the theme's only delta is muted primary color; confirmed by CSS var usage review.
- Mobile layout verified by reviewing the `.thesis-highlight` flex rule — no physical resize captured (would require device emulation which adds noise for a rule this simple).

### PLAN.md sync

- New Goal **`H1.M1.G7`** — Ph.D. thesis integration (timeline + Publications). 4 Tasks all `[✓]`.
- Side fix: `H1.M1.G6.T1` flipped `[✓]` → `[x]` (cancelled). The V6 log said "kept `[~]`" but the PLAN had lagged at `[✓]` from the V5 original state; truth is that the `about.p5` paragraph tactic was reverted in V6, so the task's output no longer exists in the codebase. New `H1.M1.G6.T3` added to carry the surviving intent (collaborator surface at the card level) — scheduled for Batch B.

### Assets added to the repo

- `res/thesis/2021_thesis_linlin_jia.pdf` (7.7 MB) — final archival copy, same file uploaded to the INSA Rouen thesis repository in 2021.
- `res/thesis/2021_thesis_slides_linlin_jia.pdf` (8.1 MB) — defense slide deck, same file.

Deliberately **not** staged in this commit (V5-prep scaffolding for Batch B, to be wired into Publications cards with their own test pass):

- `res/figures/2021_sspr_preimage_intro.svg`
- `res/figures/2022_eswa_graph_kernels_graph_representations.png`
- `res/figures/2023_cbm_epidnn_abstract_page.png`
- `images/IMG_20231010_155307.jpg` (candidate Personal-section photo, not yet placed)

## V6 — Batch A wrap-up + SEO audit round-2 P0 cleanup

Goal: close out Linlin's post-V5 "Batch A" directives (A1 i18n diagnosis, A2 collaborators revert, A3 coming-soon toast, A5 cross-theme lightbox verify), then act on the P0 findings of a second SEO audit (scored 92/100 — excellent baseline after V2 + V5). A4 (thesis link) remains pending for the next V.

### Batch A — post-V5 follow-up

- **A2 — `about.p5` collaborators paragraph reverted** (Linlin's correction: "合作者不要加到 About Me，加到 projects 和 papers 对应部分"):
    - Removed the V5 final About paragraph from `index_en.html` and from all 4 `locales/*.json` (`about.p5` key deleted).
    - Partner surfacing on project/publication cards deferred to Batch B (paired with news-external links + pub preprint/video/slides metadata).
    - `H1.M1.G6.T1` re-scoped: Goal stays open (`[~]`); only the About-paragraph tactic was cancelled.
- **A3 — Personal / Blog "coming soon" toast** (Linlin's directive: "personal 和 blog 页面我还没准备好，不要跳转"):
    - Nav links at `index_en.html:550-551` now call `showComingSoon('personal|blog')` instead of `showPage(...)`.
    - New `#comingSoonToast` DOM block before `<script src="js/main.js">` (`role=status`, `aria-live=polite`, `aria-hidden` toggled by JS).
    - New `.coming-soon-toast` CSS in `css/main.css`: fixed-center, scale 0.92→1 + opacity 0→1 on open, 2.5 s auto-dismiss, `prefers-reduced-motion` fallback. Reuses `--bg-secondary` / `--text-primary` theme variables so all 4 themes inherit correctly.
    - New `showComingSoon(page)` JS function in `js/main.js`: idempotent (cancels any pending dismiss timer), sets `aria-hidden=false`, auto-reverts after 2.5 s.
    - New i18n key `comingSoon.text` across 4 locales (EN / ZH / FR / DE translations).
    - Verified via chrome-devtools: clicking Personal or Blog fires toast, aria-hidden cycles `true → false → true`, page content unchanged, no console errors.
- **A5 — cross-theme lightbox verification**:
    - Ran the V5 lightbox against `academic` / `industrial` / `fancy` via chrome-devtools snapshot + computed-style check.
    - All 3 themes: backdrop `rgba(0,0,0,0.88)`, caption `rgba(255,255,255,0.9)`, `body.lightbox-open` scroll-lock, `aria-hidden` toggles clean, zoom-button positions consistent. No theme-specific regressions.
    - `H1.M3.G5.T1` → `[✓]` (was `[~]` after V5 — only ai-generated verified at that point).
- **A1 — i18n switching diagnosis** (no code change, but the finding shapes Batch B):
    - Confirmed `setLanguage(lang)` correctly translates `about.p1` / `p2` / `exp.desc_*`. Linlin's "About 切到中文还是英文" perception was actually driven by ~55 elements missing `data-i18n`: `<h2>Beyond Research</h2>` (`:1369`), `<h2>Blog</h2>` (`:1489`), `<h3>Let's Connect</h3>` (`:1314`), all Hobbies / Volunteer / Social headings, theme dropdown options, contact inner text, 8 project-card titles + descs, 9 news rows.
    - Scheduled as Batch B P0 under `H1.M1.G6`.
- **A4 — thesis link (timeline + Publications section)** — **pending**, will ship in the next V.
- **4-locale parity**: after V5→V6 churn (`about.p5` removed, `comingSoon.text` added): still 113 keys across all 4 locales. Verified via `python3 scripts/check_i18n_parity.py` — 0 diff.

### SEO audit round-2 — P0 cleanup

Source: second SEO audit run on 2026-04-21 (scored 92/100 — "excellent foundation"). Four `href="#"` dead links + one overlong meta description flagged as P0. No i18n / schema changes; pure content + link hygiene.

- **Meta description trim (`index_en.html:6`)**: 210 → 156 chars. New copy: `Linlin Jia, Ph.D. — ML Research Scientist. Graph ML, LLM Agents, Spatio-Temporal Forecasting, AI for Science. Advanced Postdoc, University of Bern. Open to roles.`. Leads with keyword-dense role + research areas so Google SERP preview doesn't truncate mid-sentence.
- **Dead-link fixes (`index_en.html`)**:
    - **ACPR 2023 PDF button** (`:1106`): `<a href="#">PDF</a>` → Google Scholar citation URL (`https://scholar.google.com/citations?view_op=view_citation&hl=en&user=cnlixw0AAAAJ&citation_for_view=cnlixw0AAAAJ:UeHWp8X0CEIC`). Link icon swapped from `fa-file-pdf` → `ai-google-scholar`, label from "PDF" → "Scholar". The paper has no public preprint URL; pointing at its Scholar citation page is the closest usable target (abstract + citation metadata crawlable, serves both human and bot readers).
    - **N-Banker project card** (`:936`): `<a href="#">` → `<a href="#projects">` (self-referencing no-op anchor). Internal FinTech project has no public URL; follows the same pattern already established by the GraphInk card at `:954`, which Google treats as a non-indexable self-link rather than a 404.
    - **OCTOPUSSY project card** (`:989`): same fix — `<a href="#">` → `<a href="#projects">`.
    - **RSS Feed link** (`:1521`): `<a href="#">RSS Feed</a>` removed entirely from `.blog-platforms`. Blog is still "coming soon" (no Jekyll/11ty feed being generated); a dead link was worse than no link.
- **Why the other audit findings aren't in this V6**:
    - i18n parity gaps on English-only headings — already called out above in Batch A/A1 findings; scheduled as Batch B P0 under `H1.M1.G6`.
    - Sitemap per-URL alternates, ProfilePage schema wrapper, visible breadcrumbs UI — P2/P3 opportunities, queued under `H1.M2.G3` / `G4` for a later pass.
- **Audit-relevant verification**:
    - `python3 scripts/check_i18n_parity.py` — not touched (zero locale key additions/removals).
    - `jq . locales/*.json` — unchanged (no JSON edits this round).
    - Visual check skipped per `CLAUDE.local.md` micro-edit rule (4 link-href swaps + 1 meta-tag copy edit, no layout impact).
- **PLAN.md sync**:
    - New Goal **`H1.M2.G5`** — Round-2 audit P0 cleanup (link hygiene + description trim). 4 Tasks all `[✓]`.
    - `H1.M3.G5.T1` → `[✓]` (cross-theme lightbox verified via A5).
    - `H1.M1.G6.T1` kept `[~]` (p5-paragraph tactic cancelled via A2; card-level surface pending in Batch B).
- **Score delta (post-fix estimated)**: 92 → ~94. P0 items closed; remaining gaps are i18n parity (P1, under M1.1 G6) and schema polish (P2/P3, under M1.2 G3 + G4).

## V5 — Content polish, collaborators surface, figure lightbox, timeline i18n parity

Goal: close out the V2 SEO audit follow-through by fixing remaining Warnings / Opportunities, address Linlin's 7-part directive (content corrections, timeline i18n, collaborators surface, click-to-enlarge images), and keep content aligned with `CV_Linlin_Jia_en_2026.03.06.pdf` + `extra_info_work.md`.

- **Title + meta description (`index_en.html`)**:
    - Title rewritten to Linlin's spec: `Linlin Jia, Ph.D. — ML Research Scientist | Graph ML · Spatio-Temporal ML · AI4Sci&Industry · LLM` (76 chars, includes "Spatio-Temporal" per Linlin's correction — not "Spatial-temporal").
    - Meta description kept at ~158 chars, "Open to roles in Switzerland / EU / remote" preserved.
    - Matches Google search-result truncation (title ≤ 60 px wide ≈ 60–70 chars typically, but Linlin prefers the full form for click-through relevance; acceptable given keyword density).
- **About Me content fixes (`index_en.html`)**:
    - **p2 MSc/BSc append** (Linlin's directive #2): appended `M.Sc. in Software Engineering (2017) + B.Sc. in Information Engineering (2014), both from Xi'an Jiaotong University, China` after the PhD sentence. Propagated across 4 locales (`en/zh/fr/de` — `about.p2`).
    - **p4 Spatio-Temporal correction**: same Spatio-Temporal (not Spatial-temporal) fix in the role-summary sentence.
    - **p5 collaborators surface** (Linlin's directive #5, integration option): new final About paragraph listing active collaborations — University of Basel, ETH Zürich, HES-SO Fribourg, University of Zürich, Inselspital Bern, AWS, N-Banker, China Pharmaceutical University. Added as `about.p5` across 4 locales. Decision rationale: a dedicated "Partners" card grid would fragment institutional identity and compete with the Research Areas / Experience sections for visual weight; a single collaborators sentence in About keeps the institutional surface high-signal low-footprint (8 names in one scan). Virtual Bodmer project partner mention (Université de Genève, Fondation Martin Bodmer, Archaeo-Scientific Laboratory) landed in the Scientific Collaborator timeline desc instead of About — it's a specific project artifact, not a long-term collaboration.
    - **Typo fix** (Linlin's directive #3 — user manual-edit review): `the the Swiss Association for Pattern Recognition` → `the Swiss Association for Pattern Recognition` (double-the at `index_en.html:1226`).
- **Services card restructure** (Linlin's directive #3):
    - **Reviewing card**: kept only `International Conference on Pattern Recognition 2024` per Linlin's instruction — Pattern Recognition Letters (PRL) and Expert Systems with Applications (ESWA) removed from the visible card (they were listed as "invited but not reviewed" in `extra_info_work.md`, not confirmed reviewing work). `services_cards.reviewing_i1` kept; `reviewing_i2` removed.
    - **Supervision card**: `supervision_i2` updated to `Topics: Computer Vision, Graph-based Learning, Smart Engineering, Deep Learning, LLMs, Agent Systems` — matches `extra_info_work.md` supervision topic list.
    - **Associations card (new)**: added 3-item block — `services_cards.association_title / association_i1 / association_i2 / association_i3`. Members of SAPR (2024–), Marie Curie Alumni Association China Chapter (2024), associate member of LITIS Lab (2022). Previously scattered across other cards / absent.
    - **4-locale parity**: 113 keys total match across `en/zh/fr/de`. Verified via `python3 scripts/check_i18n_parity.py` — 0 diff.
- **Timeline description i18n** (Linlin's directive #4):
    - Added `data-i18n-html` attributes to the 5 `<p class="timeline-desc">` tags inside the `#experience` section at `index_en.html:{842, 853, 864, 875, 886}`, wired to `exp.desc_advanced_postdoc`, `exp.desc_scientific_collab`, `exp.desc_research_fellow`, `exp.desc_postdoc`, `exp.desc_phd`. Previously the role titles were translated but the descriptions stayed hard-coded in English on zh/fr/de — a visible i18n gap for ~30% of the Experience section's text mass.
    - Added matching keys to all 4 locale files. EN copies kept verbatim from existing HTML; ZH / FR / DE translated preserving project names (SNSF, ICPR 2026, Virtual Bodmer, OCTOPUSSY) and domain terms (graph-kernels, pre-image problems).
    - Verified with live locale switch test via `setLanguage` button click in chrome-devtools — all 5 paragraphs swap text correctly on zh/fr/de and revert on en.
- **Crawlability + indexation cleanup** (Linlin's directive #1):
    - `robots.txt`: removed `/archive/` disallow (directory doesn't exist; was legacy clutter from the v6 round scaffolding).
    - `sitemap.xml`: removed `/blog/` URL entry per Linlin's "if useless, delete" decision — the `blog/` Jekyll subproject isn't deployed and indexing a 404 URL is net-negative. `blog/` directory stays in repo for history (Hux Blog boilerplate).
    - No impact on the 13-URL hreflang-expanded sitemap; still at depth 3.
- **Figure lightbox (click-to-enlarge)** (Linlin's directive #6):
    - `css/main.css` — appended ~100 LOC after the `@media (prefers-reduced-motion)` block:
        - `.has-zoom` hover rule scales inner figure (`transform: scale(1.04)`, 180 ms ease) as affordance.
        - `.img-zoom-btn` positioned absolute top-right inside each `.project-image` / `.pub-thumbnail`; 32×32 px circular overlay with magnifier glyph; opacity 0 → 0.9 on hover.
        - `.lightbox` full-viewport fixed modal, `backdrop-filter: blur(4px)`, dark overlay `rgba(0,0,0,0.85)`; `.lightbox.is-open` fades in over 200 ms.
        - `.lightbox-figure img` capped at `min(90vw, 90vh)` with object-fit contain so SVGs never overflow; `.lightbox-caption` in bottom-center reuses the source `alt` text.
        - `body.lightbox-open { overflow: hidden }` locks page scroll while modal is open.
        - Matches existing theme CSS-variable palette (`--bg-primary`, `--text-primary`) so `academic` / `industrial` / `fancy` themes inherit correctly without per-theme overrides.
    - `js/main.js` — appended IIFE `initImageLightbox()` after the existing DOMContentLoaded module (~70 LOC):
        - Targets `.project-image` and `.pub-thumbnail` containers; skips icon-only cards where no `<object data>` or `<img src>` source exists.
        - Prefers `<object type="image/svg+xml" data="…svg">` URL over the `<img>` PNG fallback — SVG scales crisply when enlarged; PNG would pixelate.
        - Injects a single `.img-zoom-btn` per eligible container (idempotent guard: skip if already attached).
        - `e.stopPropagation()` on the zoom-button click so clicking the magnifier doesn't also fire the wrapping `.project-card` anchor navigation; clicking the image body itself still navigates normally.
        - A11y: `role="dialog"`, `aria-modal="true"`, `aria-hidden` toggles on open/close, `aria-labelledby` pointing to `#lightbox-caption`. Focus moves to close button on open; restored to the original trigger button on close.
        - Key handlers: `ESC` closes; backdrop click (target === lightbox) closes; explicit close button closes. No keyboard trap — standard Tab/Shift-Tab continues through page.
        - Result: 4 `.project-image` + 3 `.pub-thumbnail` = 7 zoom buttons injected on the production page.
    - `index_en.html` — added the lightbox DOM block before `<script src="js/main.js">`: `#lightbox > .lightbox-close + .lightbox-figure > .lightbox-img + .lightbox-caption`. Single global instance reused for all triggers.
- **JSON validity + i18n parity checks**:
    - `jq . locales/en.json locales/zh.json locales/fr.json locales/de.json` → all 4 parse clean.
    - `python3 scripts/check_i18n_parity.py` → `all 113 keys present in en/zh/fr/de` (5 new `exp.desc_*` + 4 new `services_cards.association_*` + 1 new `about.p5` + `reviewing_i2` removed).
- **Visual verification** (relaxed scope per `CLAUDE.local.md`):
    - `ai-generated` theme (default): verified lightbox open / close / caption / focus trap via chrome-devtools snapshot. All 7 zoom buttons render; SVG figures scale crisp to 90vh; caption matches alt text.
    - `academic` / `industrial` / `fancy` themes: **still pending** — tracked as a visual-verification carry-over, see below.
- **PLAN.md sync**:
    - New Goal **`H1.M1.G6`** — Partners / collaborators surface. T1 `about.p5` collaborators paragraph (4-locale) → `[✓]`. T2 Virtual Bodmer project partner mention in scientific-collaborator timeline desc → `[✓]`.
    - New Goal **`H1.M3.G5`** — Figure lightbox (click-to-enlarge). T1 CSS + JS + a11y + 4-theme CSS variable parity → `[~]` (ai-generated verified; academic/industrial/fancy pending cross-theme verification).
    - Status rollups: `M1.1` stays `[~]` (G1-G5 done but G6.T2 done only via timeline text, not a dedicated card; keep goal open for content polish). `M1.3` stays `[ ]` (new G5 `[~]`, still has G4 performance polish pending).
- **Still pending from Linlin's directive**:
    - **Directive #7** (LinkedIn skills / tech page audit): awaiting hand-pasted exported skills data from Linlin — LinkedIn returns HTTP 999 to automated `WebFetch`, so the skills section can't be scraped. Will cross-check against `extra_info_work.md` once data arrives.
    - **Cross-theme lightbox verification**: academic / industrial / fancy snapshots not yet taken.

## V4 — Docs folder reorg + vibe audit integration

Goal: consolidate all project documentation under `docs/`, archive the unused Jekyll subproject, reverse UPDATES.md V-ordering so newest-first is enforced, and harvest the 2026-04-20 vibe audit into `PLAN.md` as structured Horizon / Milestone / Goal / Task items.

- **File moves (git mv — history preserved)**:
    - `PLAN.md` / `PLAN.zh.md` → `docs/PLAN.md` / `docs/PLAN.zh.md`.
    - `UPDATES.md` / `UPDATES.zh.md` → `docs/UPDATES.md` / `docs/UPDATES.zh.md`.
    - `setup/` (10 files: `README.md`, 4 guides × 2 languages, plus `form-backend-google-sheets.{md,zh.md}`, `analytics-clarity.{md,zh.md}`, `analytics-backup.{md,zh.md}`, `security-headers.{md,zh.md}`) → `docs/setup/`.
    - Legacy Jekyll minima project (`docs/404.html`, `docs/about.markdown`, `docs/_config.yml`, `docs/Gemfile`, `docs/Gemfile.lock`, `docs/index.markdown`, `docs/.gitignore`, `docs/_posts/`) → `docs/_archive-jekyll-minima/`. Kept for history, no longer built/deployed.
- **`docs/README.md` + `docs/README.zh.md` (new)**: index for the reorganised docs tree. Lists PLAN/UPDATES, `setup/` guides with matching PLAN IDs, `vibe/` audit notes, and the Jekyll archive. Explains why `CLAUDE.md` / `README.md` / `extra_info_work.md` stay at repo root.
- **Cross-link fixes**: updated path references in `CLAUDE.md`, `CLAUDE.zh.md`, `README.md`, `README.zh.md` — `PLAN.md` → `docs/PLAN.md`, `UPDATES.md` → `docs/UPDATES.md`, `setup/…` → `docs/setup/…`. Repository-layout tables now describe `docs/` as the documentation home and `blog/` on its own as the legacy Jekyll subproject.
- **UPDATES newest-on-top reversal (2026-04-20)**: reversed V1→V4 chronological order so V4 (static refactor) appears on top, V1 (v7 redesign deployment) at the bottom — matching the "highest V on top" convention already applied to today.
- **`CLAUDE.md` hard rule refinements (both EN + ZH)**:
    - UPDATES.md rule now specifies **newest day on top** + **highest V number on top within a day**.
    - UPDATES.md rule now mandates keeping its own `## Master TOC` in sync (new bullet per day, sub-bullet per V with a one-line hook) — previously UPDATES was exempt from the Master-TOC rule.
    - Master-TOC rule path glob updated: `root .md, setup/*.md, .claude/skills/*/SKILL.md` → `root .md, docs/**/*.md, .claude/skills/*/SKILL.md`.
- **Vibe-audit integration into `PLAN.md` (+ `.zh.md`)** — from `docs/vibe/网站深度分析报告_claude_code_2026.04.20.md`:
    - New Goal **`H1.M2.G4`** — Head hygiene (non-schema cleanup). T1 removes obsolete `<meta name="keywords">`.
    - New Goal **`H1.M3.G4`** — Performance polish (post-vibe-audit gaps). T1 Google Fonts trim (4→2 families), T2 `canvas-confetti` dynamic import, T3 `@media (prefers-reduced-motion)`, T4 Leaflet-vs-Google-Maps dedup, T5 `openChatbot()` native `alert()` → toast / `mailto:`. Rolls `M1.3` status `[✓]` → `[ ]`.
    - New Milestone **`H1.M4`** — Unique differentiators for recruiter memorability. G1 Live Citation Graph (D3 force-graph in publications), G2 Redox prediction interactive demo (SMILES → molecular graph → GNN message-passing visualization — per Linlin's correction; vibe-audit's "drug discovery GNN demo" recommendation was scoped to redox prediction specifically), G3 "/now" page, G4 default theme → `academic` (Linlin declined vibe-audit's "move theme/language switcher to footer" recommendation — position stays unchanged).
    - Most vibe-audit P0 items (UA→GA4, Person JSON-LD, robots/sitemap, a11y, OG tags) were already completed in 2026-04-20 V1/V2 + 2026-04-21 V2 — no new tasks needed for those.
- **Status rollups**: `M1.3` → `[ ]` (was `[✓]`, now has pending G4). `M1.4` added at `[ ]`. `M1.2` stays `[~]` (new G4 pending, G1/G2 done, G3 pending). `H1` stays `[~]`.
- **Master TOC sync**: added M1.2.G4, expanded M1.3 with G1-G4 sub-bullets (previously flat), added M1.4 with G1-G4 sub-bullets.

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

## V4 — Static refactor

- Extracted CSS (~2.7k lines) → `css/main.css` and JS (~850 lines) → `js/main.js`.
- `index_en.html` shrunk from 4852 → 1289 lines.
- Welcome postcard fully i18n'd; full-site i18n audit completed; `zh` switched to the unified main site.

## V3 — Tooling

- `.githooks/pre-commit` runs `scripts/check_i18n_parity.py` on staged `locales/*.json`.
- `.claude/settings.json` PostToolUse hook validates JSON after edits.
- Project skills added: `/preview`, `/verify-visual`, `/new-round`, `/deploy-round`, `/i18n-sync`.
- Consolidated deployment README under `setup/`.

## V2 — Site ops batch (forms, analytics, CSP, mobile)

- Welcome postcard form → Google Sheets backend (Apps Script + GH-Actions cron mirror).
- Microsoft Clarity injected without cookie-consent flow.
- CSP / Referrer-Policy / X-Content-Type meta hardening.
- Mobile navbar hamburger.
- Postcard welcome i18n keys synced across en/zh/fr/de.

## V1 — v7 redesign deployment + P0 SEO/a11y overhaul

- Deployed `index_en_v7_round3.html` to `index_en.html` — full redesign: new hero, OG card, favicon, locales, theme switcher (ai-generated/academic/industrial/fancy).
- Fixed canonical redirect, deduped sitemap, added `WebSite` JSON-LD schema, preloaded Font Awesome webfonts.
- Fixed Lighthouse label-mismatch + mobile touch-target a11y warnings.

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
