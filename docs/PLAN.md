# PLAN — Master roadmap

> **Language:** English | [中文](PLAN.zh.md)
>
> Single source of truth for **what we are doing, what we plan to do, and what
> is intentionally on hold** for `jajupmochi.github.io`. Compatible with the
> Claude Code plan / mem harness — every item carries a stable ID and a status
> marker so an AI agent can locate, read, and act on it without re-deriving
> context.
>
> **How to use:** scan the [Master TOC](#master-toc) → drill into the Horizon
> → find the Goal → execute the Tasks. When an item changes status or new work
> arrives, update this file in the same edit batch as the code change and add a
> matching `UPDATES.md` entry.

## Status legend

| Marker | Meaning | When to use |
|--------|---------|-------------|
| `[✓]` | Done | Work is shipped, verified, and reflected in the codebase. |
| `[~]` | In progress | Actively being worked on this session. |
| `[ ]` | Pending | Queued, no blocker, ready to pick up. |
| `[!]` | Blocked | Cannot proceed until a dependency / external answer arrives. |
| `[?]` | Awaiting user input | Needs Linlin's manual decision or one-time external action. |
| `[x]` | Cancelled | Decided not to do; kept for history. |

Aggregate status of a parent item is the most-incomplete child:
`[ ]` → `[~]` → `[!]` → `[?]` → `[✓]` (left wins).

## ID system

`H<n>.M<n>.G<n>.T<n>` — Horizon → Milestone → Goal → Task.

- IDs are **assigned in creation order, never re-numbered**. If `T7` is
  cancelled, the next new task is `T8`, not a re-used `T7`.
- Renaming an item is fine; its ID is permanent. Cross-references stay valid.
- An ID like `H1.M2.G3.T4` is globally unique and grep-able.
- Top-level Horizons have prose names (e.g. "H1 — Site as a Job-Hunt Asset")
  for human readability, but the ID `H1` is what AI agents key on.

## Hierarchy convention

| Layer | Marker | Scope | Typical lifetime |
|-------|--------|-------|------------------|
| **Horizon** | `H<n>` | Strategic theme — answers "why does this exist?" | Months → years |
| **Milestone** | `M<n>` | Concrete deliverable inside the Horizon — has an end-state | Weeks → months |
| **Goal** | `G<n>` | A coherent piece of the Milestone — testable when done | Days → weeks |
| **Task** | `T<n>` | An atomic action — a single PR / one edit batch | Minutes → hours |

If a Task is too big for one edit batch, split it into multiple Tasks under the
same Goal rather than nesting deeper. Sub-tasks are an anti-pattern here — they
get hard to track. Prefer flat lists of small `T`s.

## Master TOC

- **[H1 — Site as a Job-Hunt Asset](#h1--site-as-a-job-hunt-asset)** `[~]`
    - [M1.1 — Content fidelity vs. CV / extra_info](#m11--content-fidelity-vs-cv--extra_info) `[~]`
        - [G1 — Publications](#g1--publications) `[✓]`
        - [G2 — Projects](#g2--projects) `[~]`
        - [G3 — News](#g3--news) `[ ]`
        - [G4 — Skills](#g4--skills) `[ ]`
        - [G5 — Stats](#g5--stats) `[ ]`
        - [G6 — Partners / collaborators surface](#g6--partners--collaborators-surface) `[~]`
        - [G7 — Ph.D. thesis integration (timeline + Publications)](#g7--phd-thesis-integration-timeline--publications) `[✓]`
    - [M1.2 — SEO + AI-search visibility](#m12--seo--ai-search-visibility) `[~]`
        - [G1 — Schema.org coverage](#g1--schemaorg-coverage) `[✓]`
        - [G2 — Multilingual crawlability](#g2--multilingual-crawlability) `[✓]`
        - [G3 — AI-search optimization](#g3--ai-search-optimization) `[ ]`
        - [G4 — Head hygiene (non-schema cleanup)](#g4--head-hygiene-non-schema-cleanup) `[ ]`
        - [G5 — Round-2 audit P0 cleanup (link hygiene + description trim)](#g5--round-2-audit-p0-cleanup-link-hygiene--description-trim) `[✓]`
    - [M1.3 — Mobile / a11y / performance](#m13--mobile--a11y--performance) `[ ]`
        - [G1 — Lighthouse all-green](#g1--lighthouse-all-green) `[✓]`
        - [G2 — Touch targets](#g2--touch-targets) `[✓]`
        - [G3 — LCP / CLS / INP](#g3--lcp--cls--inp) `[✓]`
        - [G4 — Performance polish (post-vibe-audit gaps)](#g4--performance-polish-post-vibe-audit-gaps) `[ ]`
        - [G5 — Figure lightbox (click-to-enlarge)](#g5--figure-lightbox-click-to-enlarge) `[~]`
    - [M1.4 — Unique differentiators for recruiter memorability](#m14--unique-differentiators-for-recruiter-memorability) `[ ]`
        - [G1 — Live Citation Graph](#g1--live-citation-graph) `[ ]`
        - [G2 — Redox prediction interactive demo](#g2--redox-prediction-interactive-demo) `[ ]`
        - [G3 — "/now" page](#g3--now-page) `[ ]`
        - [G4 — Default theme → academic](#g4--default-theme--academic) `[ ]`
- **[H2 — Site Operations & Maintenance](#h2--site-operations--maintenance)** `[?]`
    - [M2.1 — Manual one-time setup](#m21--manual-one-time-setup) `[?]`
        - [G1 — Welcome form backend](#g1--welcome-form-backend) `[?]`
        - [G2 — Microsoft Clarity](#g2--microsoft-clarity) `[?]`
        - [G3 — Pre-commit hook](#g3--pre-commit-hook) `[?]`
        - [G4 — Clarity weekly backup secrets](#g4--clarity-weekly-backup-secrets) `[?]`
    - [M2.2 — Automation](#m22--automation) `[ ]`
    - [M2.3 — Backup & resilience](#m23--backup--resilience) `[ ]`
- **[H3 — Site Content Expansion](#h3--site-content-expansion)** `[ ]`
    - [M3.1 — Project deep-dive sub-pages](#m31--project-deep-dive-sub-pages) `[ ]`
    - [M3.2 — Blog / writing](#m32--blog--writing) `[ ]`
    - [M3.3 — Multi-language fidelity](#m33--multi-language-fidelity) `[ ]`
    - [M3.4 — Theme expansion](#m34--theme-expansion) `[ ]`
- **[H4 — Documentation & AI-Collaboration Infrastructure](#h4--documentation--ai-collaboration-infrastructure)** `[ ]`
    - [M4.1 — Master Plan + Master TOC + bilingual convention](#m41--master-plan--master-toc--bilingual-convention) `[✓]`
    - [M4.2 — Reader-segmented documentation](#m42--reader-segmented-documentation) `[ ]`
    - [M4.3 — Skills + hooks expansion](#m43--skills--hooks-expansion) `[ ]`
- **[H5 — Career Outreach Surface](#h5--career-outreach-surface)** `[ ]`
    - [M5.1 — Cross-promotion](#m51--cross-promotion) `[ ]`
    - [M5.2 — Talks & events](#m52--talks--events) `[ ]`
    - [M5.3 — Recruiter outreach](#m53--recruiter-outreach) `[ ]`

---

## H1 — Site as a Job-Hunt Asset

**Why:** This site is Linlin's primary public-facing job-hunt asset for ML
Research Scientist roles (Isomorphic Labs, DeepMind-adjacent labs, etc.). Every
content / SEO / a11y decision is judged on whether it improves the recruiter
journey from first impression to CV download / contact.

### M1.1 — Content fidelity vs. CV / extra_info

**End-state:** Every claim on the site is traceable to `res/cv/CV_Linlin_Jia_en.pdf`
or `extra_info_work.md`. No hallucinations, no outdated affiliations.

#### G1 — Publications
- `[✓]` H1.M1.G1.T1 — Replaced 3 hallucinated entries with real CV pubs (J24/C23/J23/J22b/J22a/J21/W21b/W21a/P16) + ICPR 2026.
- `[✓]` H1.M1.G1.T2 — Embedded 3 SVG figures in matching pub cards.

#### G2 — Projects
- `[~]` H1.M1.G2.T1 — Verify every project card against `extra_info_work.md` (task #47).
- `[ ]` H1.M1.G2.T2 — Add **LIULIAN platform** card (top-of-list; key personal infra). Source: extra_info_work.md §LIULIAN.
- `[ ]` H1.M1.G2.T3 — Add **PLANALYSER** card (2024-2025 Innosuisse). Note NDA.
- `[ ]` H1.M1.G2.T4 — Add **Local Confidential Translator** card (personal MVP).
- `[ ]` H1.M1.G2.T5 — Refresh **N-Banker** description with neutral wording ("key AI advisor" / "key AI contributor", not CTO / CAIO).
- `[ ]` H1.M1.G2.T6 — Refresh **OCTOPUSSY** + **Virtual Bodmer** copy from extra_info_work.md.
- `[✓]` H1.M1.G2.T7 — Add **GraphInk** card with figure (done 2026-04-21 V2).
- `[✓]` H1.M1.G2.T8 — Add **Graph Matching Algorithms (SNSF 2023-2024)** card with figure (done 2026-04-21 V2).

#### G3 — News
- `[ ]` H1.M1.G3.T1 — Add 2025 entries (GraphInk launch, LIULIAN early prototype).
- `[ ]` H1.M1.G3.T2 — Add 2024 entries (GraphInk SNSF kick-off, Bodmer SNSF accepted).
- `[ ]` H1.M1.G3.T3 — Add 2026 entry (N-Banker chatbot demo at InnoEx 2026 HK).

#### G4 — Skills
- `[ ]` H1.M1.G4.T1 — Add **agent-skills** tags (`python-backend-creator`, `project-adaptor`).
- `[ ]` H1.M1.G4.T2 — Add **vibe-coding tooling** tags (Claude Code, Codex, Antigravity, OpenCode, GitHub Copilot).
- `[ ]` H1.M1.G4.T3 — Add **agent / LLM systems** tags (CrewAI, Ollama, vLLM, RAG, GRPO, LoRA).

#### G5 — Stats
- `[ ]` H1.M1.G5.T1 — Update publication count from 9 → 10 (ICPR 2026 + corrected pubs).
- `[ ]` H1.M1.G5.T2 — Auto-pull citations from Google Scholar (currently manual; see H2.M2.G2).

#### G6 — Partners / collaborators surface
> Added 2026-04-21 V5 per Linlin directive #5. Tactic changed in V6 (2026-04-21): the all-in-one `about.p5` paragraph was reverted on Linlin's feedback "合作者不要加到 About Me，加到 projects 和 papers 对应部分". Surviving intent: surface collaborators at the card level so each relationship lives next to its concrete artifact.
- `[x]` H1.M1.G6.T1 — (cancelled in V6) `about.p5` collaborators paragraph (University of Basel, ETH Zürich, HES-SO Fribourg, University of Zürich, Inselspital Bern, AWS, N-Banker, China Pharmaceutical University). Why cancelled: paragraph-level surface competed with About Me's bio focus; card-level is the preferred tactic — superseded by T3 below.
- `[✓]` H1.M1.G6.T2 — Virtual Bodmer project partners (Université de Genève, Fondation Martin Bodmer, Archaeo-Scientific Lab) mentioned in Scientific Collaborator timeline description rather than About — project-specific artifact, not a long-term collaboration.
- `[ ]` H1.M1.G6.T3 — Surface collaborators on project / publication cards: N-Banker (AWS + FinTech partners), OCTOPUSSY (Arkema + industrial polymer team), EpidNN (University of Basel + Inselspital Bern), GraphInk (Université de Genève + Fondation Bodmer). Scheduled for Batch B alongside news-external links and pub preprint/video/slides metadata.

#### G7 — Ph.D. thesis integration (timeline + Publications)
> Added 2026-04-21 V7. Rationale: dissertation was listed in the CV but invisible on-site — recruiters had to dig into the CV PDF to see the ~260-page artifact, and the Publications section opened straight on a 2026 paper while the foundational work sat offstage. Dual surface (timeline action row + Publications highlight card) so both "I'm browsing Experience chronologically" and "I'm scanning Publications" readers arrive at the thesis.
- `[✓]` H1.M1.G7.T1 — PhD timeline `.timeline-links` action row (`index_en.html:888`) with Thesis PDF + Defense slides buttons reusing the existing `.pub-link` style so theme hover tint carries over.
- `[✓]` H1.M1.G7.T2 — `.thesis-highlight` featured card at top of Publications section (`index_en.html:1031`), placed above filter controls so it stays visible across every filter / sort combination.
- `[✓]` H1.M1.G7.T3 — 6 new `thesis.*` i18n keys (`badge` / `title` / `institution` / `subtitle` / `download` / `slides`) × 4 locales. Parity now 119 keys. Thesis title kept as English in all 4 locales per academic convention.
- `[✓]` H1.M1.G7.T4 — `.thesis-highlight*` + `.timeline-links` CSS (`css/main.css`). Cross-theme visual verify via chrome-devtools on `ai-generated` / `industrial` / `fancy`.

### M1.2 — SEO + AI-search visibility

**End-state:** Site is indexed correctly across Google, ranks for `Linlin Jia`
+ `graph machine learning` queries, and is cited by ChatGPT / Perplexity / Claude
when asked about graph ML researchers.

#### G1 — Schema.org coverage
- `[✓]` H1.M2.G1.T1 — Person schema with `knowsAbout` + `affiliation`.
- `[✓]` H1.M2.G1.T2 — ScholarlyArticle JSON-LD (10 entries).
- `[✓]` H1.M2.G1.T3 — SoftwareSourceCode JSON-LD (graphkit-learn, etc.).
- `[✓]` H1.M2.G1.T4 — WebSite + FAQPage + BreadcrumbList JSON-LD (done 2026-04-21 V2).

#### G2 — Multilingual crawlability
- `[✓]` H1.M2.G2.T1 — hreflang `?lang=` URL variants.
- `[✓]` H1.M2.G2.T2 — sitemap.xml expanded 3 → 13 URLs with `xhtml:link` alternates.

#### G3 — AI-search optimization
- `[ ]` H1.M2.G3.T1 — Add `llms.txt` once the convention stabilizes (currently nascent draft spec).
- `[ ]` H1.M2.G3.T2 — Quarterly check: is the site cited by ChatGPT / Perplexity / Claude when asked "tell me about graph ML researchers"?
- `[ ]` H1.M2.G3.T3 — Consider Mastodon / Bluesky verification for AI grounding signals.

#### G4 — Head hygiene (non-schema cleanup)
> Source: 2026-04-20 vibe audit §三 SEO / 可发现性.
- `[ ]` H1.M2.G4.T1 — Remove obsolete `<meta name="keywords">` tag (`index_en.html:8`). Modern search engines ignore it; keeping it adds noise.

#### G5 — Round-2 audit P0 cleanup (link hygiene + description trim)
> Added 2026-04-21 V6. Source: the second SEO audit run on 2026-04-21 (scored 92/100 — "excellent foundation"). Four `href="#"` dead links and one overlong meta description were flagged as P0. All shipped in the same edit batch; no layout or schema changes.
- `[✓]` H1.M2.G5.T1 — Meta description trim 210 → 156 chars (`index_en.html:6`). Leads with keyword-dense role + research areas.
- `[✓]` H1.M2.G5.T2 — ACPR 2023 PDF button → Google Scholar citation URL (`index_en.html:1106`). No public preprint; Scholar page is the crawlable fallback. Icon `fa-file-pdf` → `ai-google-scholar`, label "PDF" → "Scholar".
- `[✓]` H1.M2.G5.T3 — N-Banker (`:936`) + OCTOPUSSY (`:989`) project cards: `href="#"` → `href="#projects"` (self-anchor no-op pattern, matching GraphInk card at `:954`).
- `[✓]` H1.M2.G5.T4 — RSS Feed dead link removed (`:1521`). Blog page is still "coming soon" — no feed to point to.

### M1.3 — Mobile / a11y / performance

#### G1 — Lighthouse all-green
- `[✓]` H1.M3.G1.T1 — All Lighthouse categories ≥90.

#### G2 — Touch targets
- `[✓]` H1.M3.G2.T1 — Min 44×44 px for all interactive elements.

#### G3 — LCP / CLS / INP
- `[✓]` H1.M3.G3.T1 — LCP < 2.5 s with AVIF hero + preconnect + fetchpriority.
- `[✓]` H1.M3.G3.T2 — CLS < 0.1 (explicit width/height on all `<img>`).
- `[✓]` H1.M3.G3.T3 — INP within budget after JS extraction.

#### G4 — Performance polish (post-vibe-audit gaps)
> Source: 2026-04-20 vibe audit §二 性能与依赖臃肿 + §四 设计与独特性 / 4.3 chatbot `alert()`. Lighthouse ≥90 does not cover these — they are dependency-weight / UX-polish gaps a recruiter will feel on first paint.
- `[ ]` H1.M3.G4.T1 — Font family trim. Keep Inter (body) + JetBrains Mono (code). Drop Playfair Display (fancy only) + Orbitron (industrial only) → swap to system fonts for those two themes. Saves ~200-400 KB and one DNS / TLS round-trip.
- `[ ]` H1.M3.G4.T2 — `canvas-confetti` → dynamic import, only loaded when the celebration trigger fires (ICPR-accepted etc.). Currently always loaded on page load.
- `[ ]` H1.M3.G4.T3 — Add `@media (prefers-reduced-motion: reduce)` CSS rule. ~70 `@keyframes` / transitions currently ignore the OS preference.
- `[ ]` H1.M3.G4.T4 — Dedup map stack. Leaflet (JS) and Google Maps iframe both coexist; keep one. Google Maps iframe is also an a11y fail (`frame-title` missing).
- `[ ]` H1.M3.G4.T5 — `openChatbot()` → replace native `alert()` with a toast component or direct `mailto:`. Native alert breaks chrome-devtools automation and is a UX anti-pattern.

#### G5 — Figure lightbox (click-to-enlarge)
> Added 2026-04-21 V5 per Linlin directive #6. Rationale: project and publication cards have small (~120×80 px) thumbnails; recruiters need to see the SVG detail (graph-kernel architecture, GNN message-passing, redox demo) to understand the research. Lightbox preserves full-resolution SVG fidelity without committing to a per-figure dedicated page.
- `[~]` H1.M3.G5.T1 — CSS + JS + a11y (role=dialog, aria-modal, ESC / backdrop close, focus restore) + 4-theme CSS variable parity. `ai-generated` verified; academic / industrial / fancy cross-theme verification pending.

### M1.4 — Unique differentiators for recruiter memorability

> Source: 2026-04-20 vibe audit §五 (独特性建议) + §七 (立刻做的 3 件事). Goal: give a recruiter one concrete "wow" element they will remember and describe to colleagues — something that sets this site apart from the Karpathy / Olah / Beyer reference set. Default theme & `/now` are lower-lift items in the same Milestone.

#### G1 — Live Citation Graph
- `[ ]` H1.M4.G1.T1 — D3.js force-graph in the publications section. Nodes = papers, edges = shared co-authors. Data source: `data/citations.json` + inline author lists. Skeleton reference: `new_web_test.html` (already a working prototype).
- `[ ]` H1.M4.G1.T2 — Click a node → smooth-scroll to matching publication card.
- `[ ]` H1.M4.G1.T3 — Lazy-init the graph with IntersectionObserver so it doesn't cost LCP budget on initial load.

#### G2 — Redox prediction interactive demo
- `[ ]` H1.M4.G2.T1 — Small interactive demo on the RedoxPrediction project card: SMILES input → render molecular graph → visualize GNN message-passing forward pass. Pre-compute 3-5 known molecules so recruiters can click-through without typing.
- `[ ]` H1.M4.G2.T2 — Static fallback image / animation for `prefers-reduced-motion` users and browsers without canvas.
- `[ ]` H1.M4.G2.T3 — Link the demo prominently from hero "Research" keywords and the RedoxPrediction project card — it is the 3-second elevator pitch for a graph-ML drug-discovery scientist.

#### G3 — "/now" page
- `[ ]` H1.M4.G3.T1 — Add `now.html` in the spirit of <https://nownownow.com/>: a single short paragraph on current focus (N-Banker LLM agent + SNSF Bodmer project + job-hunt status). Refreshed monthly.
- `[ ]` H1.M4.G3.T2 — Link from navbar ("Now" slot) and from the footer of `index_en.html`.

#### G4 — Default theme → academic
- `[ ]` H1.M4.G4.T1 — Switch default theme from `ai-generated` to `academic` in `js/main.js` theme bootstrap. Any existing `localStorage` preference is respected. Theme / language switcher position stays unchanged (vibe-audit "move to footer" recommendation declined by Linlin).

---

## H2 — Site Operations & Maintenance

**Why:** The site uses several free third-party services (Google Sheets, Microsoft
Clarity, GitHub Actions). Each requires a one-time setup outside this repo, plus
periodic checks. This Horizon tracks both.

### M2.1 — Manual one-time setup

> All `[?]` items below need Linlin to do something **outside this repo** —
> a dashboard click, a copy-paste of a token, a one-line shell command. Until
> done, the corresponding feature silently no-ops on the live site.

#### G1 — Welcome form backend
**Detail:** [setup/form-backend-google-sheets.md](setup/form-backend-google-sheets.md)
- `[?]` H2.M1.G1.T1 — Create Google Sheet + Apps Script Web App.
- `[?]` H2.M1.G1.T2 — Replace `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` in `index_en.html`.
- `[?]` H2.M1.G1.T3 — Smoke-test: submit postcard → row appears in Sheet.

#### G2 — Microsoft Clarity
**Detail:** [setup/analytics-clarity.md](setup/analytics-clarity.md)
- `[?]` H2.M1.G2.T1 — Create Clarity project at <https://clarity.microsoft.com/>.
- `[?]` H2.M1.G2.T2 — Replace `PASTE_CLARITY_PROJECT_ID` in `index_en.html`.
- `[?]` H2.M1.G2.T3 — Enable cookie-less mode in dashboard (Settings → Setup → Cookies).
- `[?]` H2.M1.G2.T4 — Add a privacy-policy line to footer (Clarity disclosure).

#### G3 — Pre-commit hook
- `[?]` H2.M1.G3.T1 — Run **once per clone**: `git config core.hooksPath .githooks`.

#### G4 — Clarity weekly backup secrets
**Detail:** [setup/analytics-backup.md](setup/analytics-backup.md)
- `[?]` H2.M1.G4.T1 — Generate Clarity API token (Settings → Data Export).
- `[?]` H2.M1.G4.T2 — Add as repo secret `CLARITY_API_TOKEN` in GitHub Settings.
- `[?]` H2.M1.G4.T3 — Enable "Read and write permissions" in Settings → Actions → General.
- `[?]` H2.M1.G4.T4 — Trigger first manual run (Actions → backup-analytics → Run workflow).

### M2.2 — Automation

#### G1 — CV refresh
- `[ ]` H2.M2.G1.T1 — Auto-update CV PDFs in `res/cv/` from a build script (currently fully manual).
- `[ ]` H2.M2.G1.T2 — Add a "CV last updated" line to the site.

#### G2 — Citations refresh
- `[ ]` H2.M2.G2.T1 — Scheduled scrape (GH Actions weekly cron) to refresh `data/citations.json` from Google Scholar.
- `[!]` H2.M2.G2.T2 — Blocked: Scholar has no official API; need a robust scraper or alternative (Semantic Scholar API).

#### G3 — OG card rotation (optional)
- `[ ]` H2.M2.G3.T1 — Enable `.github/workflows/rotate-og-card.yml` Mondays cron.
- `[x]` H2.M2.G3.T2 — Per-request randomization — cancelled (impossible on pure GH Pages, would need edge worker).

#### G4 — Spam mitigation (welcome form)
- `[ ]` H2.M2.G4.T1 — Cloudflare Turnstile (low-effort, free) — only if spam appears.
- `[ ]` H2.M2.G4.T2 — Honeypot field (zero deps).
- `[ ]` H2.M2.G4.T3 — Per-IP rate limit in Apps Script (PropertiesService).

### M2.3 — Backup & resilience

#### G1 — Clarity weekly backup
- `[~]` H2.M3.G1.T1 — Workflow exists; activation depends on H2.M1.G4.

#### G2 — Welcome submissions backup
- `[ ]` H2.M3.G2.T1 — Set up private repo `linlin-site-submissions-backup` with weekly published-CSV mirror.

#### G3 — Source-of-truth snapshot
- `[ ]` H2.M3.G3.T1 — Quarterly tarball of the repo + Sheet → Drive (in case GH-Pages or Sheets ever goes away).

---

## H3 — Site Content Expansion

**Why:** Once H1 is complete, recruiter visitors need depth. Sub-pages and
writing demonstrate technical communication ability beyond the homepage scroll.

### M3.1 — Project deep-dive sub-pages

#### G1 — LIULIAN platform sub-page
- `[ ]` H3.M1.G1.T1 — `/projects/liulian/` page (planned vs. implemented modules; figures from extra_info_work.md §LIULIAN).
- `[ ]` H3.M1.G1.T2 — Embed live demo iframe once MVP1 ships.

#### G2 — GraphInk demo
- `[ ]` H3.M1.G2.T1 — `/projects/graphink/` page with the framework SVG + paper link.

#### G3 — Local Confidential Translator
- `[ ]` H3.M1.G3.T1 — `/projects/translator/` page with screencast.

### M3.2 — Blog / writing

#### G1 — Blog reactivation
- `[ ]` H3.M2.G1.T1 — Decide: keep the existing `blog/` Hux-Blog Jekyll setup OR move to Substack-style external (lower friction).
- `[ ]` H3.M2.G1.T2 — Link blog from main nav once a post exists.

#### G2 — Launch posts (3)
- `[ ]` H3.M2.G2.T1 — "Graph ML for non-graph people" — primer.
- `[ ]` H3.M2.G2.T2 — "Vibe-coding workflow for solo researchers" — using Claude Code / Codex.
- `[ ]` H3.M2.G2.T3 — "Job-hunt journal — switching from postdoc to industry" (optional, may stay private).

### M3.3 — Multi-language fidelity

#### G1 — Translation completeness
- `[ ]` H3.M3.G1.T1 — Translate any newly-added keys from H1.M1 work to fr/de.
- `[~]` H3.M3.G1.T2 — Run `/i18n-sync` after every locale change (skill exists; behavioural).

#### G2 — Locale-specific copy
- `[ ]` H3.M3.G2.T1 — Identify any English idioms in en.json that don't translate cleanly; rewrite source for translatability.

### M3.4 — Theme expansion

- `[ ]` H3.M4.G1.T1 — `industrial` theme: polish Orbitron font fallback for slow connections.
- `[ ]` H3.M4.G2.T1 — `fancy` theme: tune animation easing on mobile (currently slightly janky).
- `[ ]` H3.M4.G3.T1 — Optional: `print` theme for clean PDF export of the page.

---

## H4 — Documentation & AI-Collaboration Infrastructure

**Why:** This site has grown enough that an AI agent (Claude Code) joining
mid-stream needs a clear map. Without it, every new session re-derives context
from scratch and contradicts prior decisions.

### M4.1 — Master Plan + Master TOC + bilingual convention

#### G1 — Create PLAN.md
- `[✓]` H4.M1.G1.T1 — This file (created 2026-04-21 V3).

#### G2 — Update CLAUDE.md
- `[✓]` H4.M1.G2.T1 — Add hard rule: every doc must carry a Master TOC at the top with hierarchy markers.
- `[✓]` H4.M1.G2.T2 — Add hard rule: PLAN.md is the single source of truth for roadmap; tasks gated on user/external action use `[?]`.
- `[✓]` H4.M1.G2.T3 — Add hard rule: when work matches an existing PLAN.md item, update its status in the same edit batch.

#### G3 — Add Master TOC to existing docs
- `[✓]` H4.M1.G3.T1 — README.md.
- `[✓]` H4.M1.G3.T2 — setup/README.md.
- `[✓]` H4.M1.G3.T3 — Each `setup/*.md` (form-backend, analytics-clarity, analytics-backup, security-headers).

#### G4 — Bilingual docs (NAME.md + NAME.zh.md)
- `[✓]` H4.M1.G4.T1 — Add CLAUDE.md hard rule for mandatory dual-file bilingual docs (English canonical + Chinese mirror, code/IDs preserved in both).
- `[✓]` H4.M1.G4.T2 — Add language banner (`> **Language:** English | [中文](NAME.zh.md)`) at the top of every canonical doc.
- `[✓]` H4.M1.G4.T3 — Create Chinese mirrors for all 9 repo-level docs: `CLAUDE.zh.md`, `README.zh.md`, `PLAN.zh.md`, `UPDATES.zh.md`, `setup/README.zh.md`, `setup/form-backend-google-sheets.zh.md`, `setup/analytics-clarity.zh.md`, `setup/analytics-backup.zh.md`, `setup/security-headers.zh.md`.
- `[ ]` H4.M1.G4.T4 — Pre-commit parity check: fail commit if a canonical `NAME.md` is modified without a corresponding `NAME.zh.md` update (scripts/check_bilingual_parity.py). Out of scope for today; queued.

### M4.2 — Reader-segmented documentation

**End-state:** A first-time visitor — whether a recruiter, Linlin's future self,
or an AI agent — finds an entry point sized for them within 30 seconds.

#### G1 — README.md sections
- `[✓]` H4.M2.G1.T1 — Add "For visitors / For maintainer / For AI agents" sections.
- `[✓]` H4.M2.G1.T2 — Index every `setup/*.md` with a one-line description.
- `[✓]` H4.M2.G1.T3 — Surface every manual-action item from H2.M1 in a flat checklist near the top.

#### G2 — Maintenance how-tos (gaps identified in 2026-04-21 audit)
- `[ ]` H4.M2.G2.T1 — `setup/add-project-card.md` — how to add a new project card with SVG figure (mapping to publications).
- `[ ]` H4.M2.G2.T2 — `setup/add-locale.md` — how to add a 5th language (e.g. ja, es).
- `[ ]` H4.M2.G2.T3 — `setup/extend-csp.md` — how to extend CSP for a new CDN (currently spread across security-headers.md + form-backend.md).

### M4.3 — Skills + hooks expansion

#### G1 — New project skills
- `[ ]` H4.M3.G1.T1 — `/audit-docs` skill — runs the doc-audit pipeline this Horizon was built from.
- `[ ]` H4.M3.G1.T2 — `/sync-cv` skill — diffs site content vs. `res/cv/CV_Linlin_Jia_en.pdf` + `extra_info_work.md`, surfaces drift.
- `[ ]` H4.M3.G1.T3 — `/plan-status` skill — prints aggregate status of all Horizons / Milestones / Goals from PLAN.md.

#### G2 — Hooks
- `[ ]` H4.M3.G2.T1 — PostToolUse hook: warn if a code edit lands without a matching UPDATES.md change in the same edit batch.
- `[ ]` H4.M3.G2.T2 — PostToolUse hook: warn if PLAN.md has stale `[~]` items older than N days.

---

## H5 — Career Outreach Surface

**Why:** The site is one channel; cross-promotion makes it discoverable.

### M5.1 — Cross-promotion
- `[ ]` H5.M1.G1.T1 — LinkedIn profile sync (headline + featured links).
- `[ ]` H5.M1.G2.T1 — Google Scholar profile fields match site (ORCID, affiliation, areas).
- `[ ]` H5.M1.G3.T1 — Twitter / X / Bluesky bio link to site.

### M5.2 — Talks & events
- `[ ]` H5.M2.G1.T1 — Add "Talks" section once the next talk is scheduled.

### M5.3 — Recruiter outreach
- `[ ]` H5.M3.G1.T1 — Add "Hire me" CTA card variant for direct recruiter sharing.
- `[ ]` H5.M3.G2.T1 — A/B test: photo vs. illustration in the hero.

---

## Maintenance protocol for this file

- When you complete a Task: change `[ ]` / `[~]` → `[✓]` and add the date in the
  matching `UPDATES.md` entry. Do **not** delete completed Tasks — they are the
  history a future Linlin / AI agent reads to understand decisions.
- When you cancel a Task: change to `[x]` and add a one-line **Why cancelled:** note.
- When you add a new Task: pick the next free `T<n>` under the appropriate Goal.
  Never reuse an old number even if its slot is empty.
- When a Task needs splitting: leave the original as a brief umbrella, add new
  Tasks under the same Goal with new Ts, link the new Ts in the original.
- When the **status of an item rolls up** (all child Ts done → Goal done →
  Milestone done): update the parent marker too, and update the Master TOC
  bullet at the top.
