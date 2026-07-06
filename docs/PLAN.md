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
        - [G2 — Projects](#g2--projects) `[✓]`
        - [G3 — News](#g3--news) `[ ]`
        - [G4 — Skills](#g4--skills) `[✓]`
        - [G5 — Stats](#g5--stats) `[ ]`
        - [G6 — Partners / collaborators surface](#g6--partners--collaborators-surface) `[✓]`
        - [G7 — Ph.D. thesis integration (timeline + Publications)](#g7--phd-thesis-integration-timeline--publications) `[✓]`
        - [G8 — UX polish (V9 Linlin flags)](#g8--ux-polish-v9-linlin-flags) `[✓]`
        - [G9 — Above-the-fold signal density (hero signature, About bullets, drug-discovery reframe, Experience MSc/BS, Featured projects)](#g9--above-the-fold-signal-density) `[✓]`
        - [G10 — Credibility surfaces (Publications Most Cited, H-index / Grants stats, YOLO reclass, graphkit-learn live pills)](#g10--credibility-surfaces) `[✓]`
        - [G11 — Authority blocks (Invited Talks service card + Selected Awards / Grants section)](#g11--authority-blocks) `[✓]`
        - [G12 — Recruiter-first page flow (full-page section reorder)](#g12--recruiter-first-page-flow) `[✓]`
    - [M1.2 — SEO + AI-search visibility](#m12--seo--ai-search-visibility) `[~]`
        - [G1 — Schema.org coverage](#g1--schemaorg-coverage) `[✓]`
        - [G2 — Multilingual crawlability](#g2--multilingual-crawlability) `[✓]`
        - [G3 — AI-search optimization](#g3--ai-search-optimization) `[ ]`
        - [G4 — Head hygiene (non-schema cleanup)](#g4--head-hygiene-non-schema-cleanup) `[~]`
        - [G5 — Round-2 audit P0 cleanup (link hygiene + description trim)](#g5--round-2-audit-p0-cleanup-link-hygiene--description-trim) `[✓]`
    - [M1.3 — Mobile / a11y / performance](#m13--mobile--a11y--performance) `[ ]`
        - [G1 — Lighthouse all-green](#g1--lighthouse-all-green) `[✓]`
        - [G2 — Touch targets](#g2--touch-targets) `[✓]`
        - [G3 — LCP / CLS / INP](#g3--lcp--cls--inp) `[✓]`
        - [G4 — Performance polish (post-vibe-audit gaps)](#g4--performance-polish-post-vibe-audit-gaps) `[ ]`
        - [G5 — Figure lightbox (click-to-enlarge)](#g5--figure-lightbox-click-to-enlarge) `[~]`
    - [M1.4 — Unique differentiators for recruiter memorability](#m14--unique-differentiators-for-recruiter-memorability) `[~]`
        - [G1 — Live Citation Graph](#g1--live-citation-graph) `[ ]`
        - [G2 — Redox prediction interactive demo](#g2--redox-prediction-interactive-demo) `[ ]`
        - [G3 — "/now" page](#g3--now-page) `[ ]`
        - [G4 — Default theme → academic](#g4--default-theme--academic) `[ ]`
        - [G5 — Cmd+K command palette search](#g5--cmdk-command-palette-search) `[✓]`
        - [G6 — Visit Map (visitor-country choropleth)](#g6--visit-map-visitor-country-choropleth) `[?]`
        - [G7 — Hero news ticker (always-visible scrolling latest)](#g7--hero-news-ticker) `[✓]`
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
    - [M3.5 — Personal-space 3D environment (three.js)](#m35--personal-space-3d-environment-threejs) `[~]`
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
- `[✓]` H1.M1.G1.T3 — (2026-04-21 V8) Rename figure filenames to `YYYY_venue_*` convention (`icpr2026_swissriver_diagram.{svg,png}` → `2026_icpr_swissriver_diagram.{svg,png}`; `jcc2023_redox_framework.{svg,png}` → `2023_jcc_redox_framework.{svg,png}`) and attach 6 new real figures to pub cards whose thumbnails were still Font Awesome icons: J23 (CompBioMed EpidNN abstract), J22b (Electronics GED stability results), J22a (ESWA graph-kernel representations), J21 (PRL graphkit-learn accuracy), W21b (SSPR pre-image intro), W21a (SSPR GED learning framework). All verified via chrome-devtools — 6 images load with `naturalWidth > 0`.

#### G2 — Projects
- `[✓]` H1.M1.G2.T1 — Verify every project card against `extra_info_work.md` + CV (done 2026-04-21 V9 via 9-card CV-aligned refactor; every card title now matches CV verbatim).
- `[✓]` H1.M1.G2.T2 — (2026-04-22 V1, V10 backfill) Added **LIULIAN platform** card at top of project grid. Personal-infra badge, `data-tags="industry,llm,agents,software"`, footer links to platform homepage + GitHub org. Source extracted from `extra_info_work.md §LIULIAN`.
- `[✓]` H1.M1.G2.T3 — Add **PLANALYSER — Automated HVAC-Concept Audit and Optimisation using AI** card (done 2026-04-21 V9). INNOSUISSE 2024-2025 with iCoSys + WATTELSE AG partners. Footer links: ARAMIS grant page + WATTELSE startup page. Industry badge, data-tags `academia,industry` so it appears in both filters.
- `[✓]` H1.M1.G2.T4 — (2026-04-22 V1, V10 backfill) Added **Local Confidential Translator** card. Personal-MVP badge, `data-tags="software,llm,fun"`, footer links to GitHub repo. Highlights local-LLM + privacy positioning so the card is differentiated from N-Banker / OCTOPUSSY.
- `[✓]` H1.M1.G2.T5 — Refresh **N-Banker** description with formal CV title "1st Global Neobank Research Center" (done 2026-04-21 V9). Neutral wording; no CTO / CAIO labels. Footer: platform homepage + PolyU partner page.
- `[x]` H1.M1.G2.T6 — Refresh **OCTOPUSSY** + **Virtual Bodmer** copy from extra_info_work.md. Why cancelled: approach changed in V9 — Virtual Bodmer deleted entirely (Linlin decision; HES-SO link weak, scope unmaterialized), OCTOPUSSY merged with RedoxPrediction into a single CV-named card. Superseded by T9 + T10 + T11.
- `[✓]` H1.M1.G2.T7 — Add **GraphInk** card with figure (done 2026-04-21 V2).
- `[✓]` H1.M1.G2.T8 — Add **Graph Matching Algorithms (SNSF 2023-2024)** card with figure (done 2026-04-21 V2).
- `[✓]` H1.M1.G2.T9 — (2026-04-21 V9) Delete **Virtual Bodmer** project card entirely. Linlin decision: scope didn't materialize; HES-SO partner link was weak. Removed from `index_en.html`; no i18n-key side effects (project card copy was never i18n'd).
- `[✓]` H1.M1.G2.T10 — (2026-04-21 V9) Merge **OCTOPUSSY** + **RedoxPrediction** into a single card titled **"OCTOPUSSY — Optimization of Polymers Using Sustainable SYnthesis"** (formal CV title). Rationale: RedoxPrediction was the implementation deliverable of OCTOPUSSY, two separate cards was confusing. Merged card carries the `2023_jcc_redox_framework.svg` figure + footer links to GitHub `RedoxPrediction` + JCC 2024 DOI.
- `[✓]` H1.M1.G2.T11 — (2026-04-21 V9) Add 2 missing CV cards: **APi — Apprivoiser la Pré-image** (2018-2021, ANR, thesis grant) with `2021_sspr_preimage_intro.svg` figure + footer links ANR grant + LITIS project page + "Papers" anchor. **Service-oriented Programmable Control and Scheduling for Software Defined Network** (2014-2017, M.Sc. research at XJTU) with `2016_patent_elm_google_patent_page.png` figure + Google Patents footer link for CN106376041B.
- `[✓]` H1.M1.G2.T12 — (2026-04-21 V9) Structural refactor — all 9 project cards: `<a class="project-card">` → `<div class="project-card" data-primary-href="…" role="link" tabindex="0">`. Reason: nested `<a>` (required for the new per-card footer link strip) is invalid HTML inside an outer `<a>`. Delegated JS click handler in `js/main.js:611-640` (`document.addEventListener('click', …)`) navigates to `data-primary-href` on card-body click (new tab for external); footer-link clicks bubble to their own `<a>`; cmd/ctrl/middle-click opens new tab; keyboard Enter/Space works for a11y.
- `[✓]` H1.M1.G2.T13 — (2026-04-21 V9) `.project-links` footer widget (`css/main.css:1588-1625`): dashed top border, flex-wrap pill style mirroring `.pub-link`. Icons: `fa-file-signature` (funding/grant pages), `fa-globe` (platform / project homepages), `fa-handshake` (partner pages), `fab fa-github` (code repos), `fa-file-lines` (linked papers), `fa-certificate` (patent). Per-card `data-primary-href`: ST-GCN → SNSF 206352; N-Banker → platform homepage; GraphInk → SNSF 217594; graphkit-learn → GitHub repo; PLANALYSER → ARAMIS grant; Graph Matching → SNSF 188496; OCTOPUSSY → RedoxPrediction GitHub; APi → LITIS project page; SDN → Google Patents. Per-card link counts: 3, 2, 1, 2, 2, 3, 2, 3, 1.

#### G3 — News
- `[ ]` H1.M1.G3.T1 — Add 2025 entries (GraphInk launch, LIULIAN early prototype).
- `[ ]` H1.M1.G3.T2 — Add 2024 entries (GraphInk SNSF kick-off, Bodmer SNSF accepted).
- `[ ]` H1.M1.G3.T3 — Add 2026 entry (N-Banker chatbot demo at InnoEx 2026 HK).

#### G4 — Skills
- `[✓]` H1.M1.G4.T1 — (2026-04-22 V1) Added **agent-skills** tags (`python-backend-creator`, `project-adaptor`) under the new `ai_tools` skills category.
- `[✓]` H1.M1.G4.T2 — (2026-04-22 V1) Added **vibe-coding tooling** tags (Claude Code, Codex, Antigravity, OpenCode, GitHub Copilot) under `ai_tools`.
- `[✓]` H1.M1.G4.T3 — (2026-04-22 V1) Added **agent / LLM systems** tags (CrewAI, Ollama, vLLM, RAG, GRPO, LoRA) under the `ml_ai` category alongside graph-ML / GNN tags.
- `[✓]` H1.M1.G4.T4 — (2026-04-22 V1) 6-category Skills restructure: `programming` / `ml_ai` / `tools` / `domain` / `languages` / `ai_tools`. New `skills_cats.ai_tools` i18n key added across all 4 locales. Patent + ELM (Extreme Learning Machine) reclassified into `domain` so they live next to chemoinformatics / hydrology rather than inflating the `ml_ai` chip count.

#### G5 — Stats
- `[ ]` H1.M1.G5.T1 — Update publication count from 9 → 10 (ICPR 2026 + corrected pubs).
- `[ ]` H1.M1.G5.T2 — Auto-pull citations from Google Scholar (currently manual; see H2.M2.G2).

#### G6 — Partners / collaborators surface
> Added 2026-04-21 V5 per Linlin directive #5. Tactic changed in V6 (2026-04-21): the all-in-one `about.p5` paragraph was reverted on Linlin's feedback "合作者不要加到 About Me，加到 projects 和 papers 对应部分". Surviving intent: surface collaborators at the card level so each relationship lives next to its concrete artifact.
- `[x]` H1.M1.G6.T1 — (cancelled in V6) `about.p5` collaborators paragraph (University of Basel, ETH Zürich, HES-SO Fribourg, University of Zürich, Inselspital Bern, AWS, N-Banker, China Pharmaceutical University). Why cancelled: paragraph-level surface competed with About Me's bio focus; card-level is the preferred tactic — superseded by T3 below.
- `[✓]` H1.M1.G6.T2 — Virtual Bodmer project partners (Université de Genève, Fondation Martin Bodmer, Archaeo-Scientific Lab) mentioned in Scientific Collaborator timeline description rather than About — project-specific artifact, not a long-term collaboration.
- `[✓]` H1.M1.G6.T3 — (2026-04-21 V9) Surface collaborators on project cards as part of the 9-card CV-aligned refactor. Each card's description now names its institutional collaborators (e.g. PLANALYSER → iCoSys + WATTELSE AG, N-Banker → Digital Financial Services Research Center / PolyU, ST-GCN → ETH + U. Basel, Graph Matching → ETH Zürich, OCTOPUSSY → Arkema + industrial polymer team), and the `.project-links` footer widget surfaces the actual partner / institution URLs (e.g. `fa-handshake` link to PolyU KTEO page from N-Banker, to WATTELSE startup.ch page from PLANALYSER). Card-level surface replaces the cancelled V6 `about.p5` paragraph tactic — partner shows up next to its concrete artifact.

#### G7 — Ph.D. thesis integration (timeline + Publications)
> Added 2026-04-21 V7. Rationale: dissertation was listed in the CV but invisible on-site — recruiters had to dig into the CV PDF to see the ~260-page artifact, and the Publications section opened straight on a 2026 paper while the foundational work sat offstage. Dual surface (timeline action row + Publications highlight card) so both "I'm browsing Experience chronologically" and "I'm scanning Publications" readers arrive at the thesis.
- `[✓]` H1.M1.G7.T1 — PhD timeline `.timeline-links` action row (`index_en.html:888`) with Thesis PDF + Defense slides buttons reusing the existing `.pub-link` style so theme hover tint carries over.
- `[✓]` H1.M1.G7.T2 — `.thesis-highlight` featured card at top of Publications section (`index_en.html:1031`), placed above filter controls so it stays visible across every filter / sort combination.
- `[✓]` H1.M1.G7.T3 — 6 new `thesis.*` i18n keys (`badge` / `title` / `institution` / `subtitle` / `download` / `slides`) × 4 locales. Parity now 119 keys. Thesis title kept as English in all 4 locales per academic convention.
- `[✓]` H1.M1.G7.T4 — `.thesis-highlight*` + `.timeline-links` CSS (`css/main.css`). Cross-theme visual verify via chrome-devtools on `ai-generated` / `industrial` / `fancy`.
- `[✓]` H1.M1.G7.T5 — (2026-04-21 V8) Relocate `.thesis-highlight` block from the top of Publications (above filter controls) to the **bottom** of the section (after `#pubsList` close, before the section container close). Rationale: the V7 top-placement pushed the 2026 ICPR accepted announcement below-the-fold; moving the thesis to the bottom keeps "what I'm shipping now" as the opening card while the foundational dissertation acts as a closing summary. Position verified via chrome-devtools `compareDocumentPosition` → `isAfterPubsList: true`. Card + both download buttons render unchanged.

#### G8 — UX polish (V9 Linlin flags)
> Added 2026-04-21 V9. Three standalone UX fixes Linlin flagged after V8 shipped: the coming-soon toast looked cheap, the publication thumbnails were too small for recruiters to see the figure at a glance, and the thesis highlight butted against the last pub card with no breathing room. Each fix is small but each was a user-reported annoyance; batching them keeps the V9 change-set self-contained.
- `[✓]` H1.M1.G8.T1 — (2026-04-21 V9) Coming-soon toast glass-morphism rewrite (`index_en.html:1609` + `css/main.css:~2935`). Centered card 280-420 px (viewport-clamped), 18 px backdrop blur + 160% saturation, 44×44 icon badge with `fa-screwdriver-wrench`, two-line title + subtitle, soft drop shadow + primary-tinted 1 px ring, `scale(0.92) → 1.0` cubic-bezier entrance. Theme overrides: industrial → dark card + neon-green icon, fancy → pink gradient. New i18n keys `comingSoon.title` + `comingSoon.sub` replace single-line `comingSoon.text`. Cross-theme verified via chrome-devtools. Reason for rewrite: Linlin's direct feedback "太丑" (too ugly) on the V6 pill-style toast.
- `[✓]` H1.M1.G8.T2 — (2026-04-21 V9) Publication thumbnail enlargement + padding halved (`index_en.html` 10 `<img>` dims + `css/main.css:~1841, ~1857`). Directive verbatim: "图片放大，左/上 padding 减半，下 padding 等于上 padding". Card padding `1.5rem` → `0.75rem 1.5rem 0.75rem 0.75rem` (halved on top + left, bottom = top). Grid `180px 1fr` → `220px 1fr`, gap `1.5rem` → `1.25rem`. `.pub-thumbnail` max-width 180→220 px, height 140→172 px (preserved 5:4 aspect ratio). All 10 pub-card `<img>` elements updated via `replace_all` with the unique string `" loading=\"lazy\" width=\"180\" height=\"140\">"` — project-card images (400×180) untouched.
- `[✓]` H1.M1.G8.T3 — (2026-04-21 V9) Thesis highlight `margin-top: 2rem` (`css/main.css:~1767`). Without spacing, the thesis card butted directly against the last pub card in the carousel, visually flattening the Ph.D. capstone into the list. Added breathing room so the thesis reads as a closing statement rather than another list item. CSS-only change; no HTML or i18n impact.

#### G9 — Above-the-fold signal density
> Added 2026-04-23 V2. Rationale: V9's content is truthful but visually *dense* — a recruiter's first 10 seconds land on a generic hero bio, then a 4-paragraph About wall. V2's job-hunt push replaces that with (a) a single signature line that stacks the 4 loudest credibility signals in one sentence, (b) About rewritten as 6 scannable emoji bullets, (c) academic history surfaced where it belongs (Experience timeline, not Projects), and (d) a "Featured" sort that puts graphkit-learn at the top of Projects so the open-source artifact greets the scroller. The drug-discovery reframe is a separate honesty pass — the work is upstream of discovery, not discovery itself.
- `[✓]` H1.M1.G9.T1 — (2026-04-23 V2) New `.hero-signature` paragraph under hero tagline (`index_en.html:~630`). `data-i18n-html="hero.signature"` renders "Author of `graphkit-learn` · **SNSF** + **Innosuisse**-funded · **ICPR 2026** paper · **Marie Skłodowska-Curie** Alumni". 4 credibility signals packed into one line at the top of the first screen.
- `[✓]` H1.M1.G9.T2 — (2026-04-23 V2) About restructure — 4 paragraphs replaced with `.about-headline` + `.about-bullets` `<ul>` × 6 `<li>` (📍🛠🧪🤖🎓🎯). New keys `about.headline` + `about.b1..b6`. Information density ≈ 3× at the same vertical footprint.
- `[✓]` H1.M1.G9.T3 — (2026-04-23 V2) Drug-discovery reframe across hero / About / outline / project copy: "drug discovery" → "**molecular property prediction (foundations for drug discovery — redox potentials, polymer optimization)**". Honest positioning — upstream of discovery, not discovery itself. Per Linlin directive "未完成的 discovery 就先不提了".
- `[✓]` H1.M1.G9.T4 — (2026-04-23 V2) Experience timeline gains **M.Sc. 2014-2017 @ Xi'an Jiaotong University** + **B.S. 2010-2014 @ Xi'an Jiaotong University** `.timeline-item`s (after Ph.D. card). M.Sc. card calls out CN patent CN106376041B. 6 new `exp.*_msc` / `*_bs` keys. Gives the patent an academic home in addition to the Projects surface.
- `[✓]` H1.M1.G9.T5 — (2026-04-23 V2) Projects `data-priority` × 11 cards (graphkit-learn=10, Swiss River=9, PLANALYSER=8, OCTOPUSSY=7, LIULIAN=7, GraphInk=6, N-Banker=6, Graph Matching=5, APi=5, SDN=3, Confidential Translator=2). Drives the new "Featured" sort.
- `[✓]` H1.M1.G9.T6 — (2026-04-23 V2) Projects sort `<select>`: new `<option value="featured" data-i18n="common.featured">` prepended + marked `selected`. `js/main.js:833` `sortCards()` gets a `featured` branch (priority desc, year tie-break). Also added init-on-load `sortCards(sortSelect.value)` so the default actually applies without a manual change event. Same init added to the Publications sort block. graphkit-learn now greets the recruiter at the top of Projects.

#### G10 — Credibility surfaces
> Added 2026-04-23 V2. Rationale: citations / GitHub stars / PyPI downloads / grants are exactly the signals Isomorphic Labs / DeepMind-adjacent recruiters trust. They were present in the codebase but scattered — default pub sort was reverse-chrono, graphkit-learn had no live stats shown, H-index and grants count weren't in the stats grid. B2 pulls them onto the scan path.
- `[✓]` H1.M1.G10.T1 — (2026-04-23 V2) Publications sort `<select>`: `Most Cited` option moved to first position + marked `selected`. Opens the section on J24 (9 cites), CBM (61), ESWA (25), PRL (14) instead of reverse-chrono preprints. Init-on-load for sort select added (shared with G9.T6).
- `[✓]` H1.M1.G10.T2 — (2026-04-23 V2) Stats grid gains 2 new `.stat-card`s: `h-index` (value **6**, `stats.h_index`) and `grants` (value **5+**, `stats.grants`). Grid is now 8 cards wide, filling the row on common laptop resolutions without pushing below the fold.
- `[✓]` H1.M1.G10.T3 — (2026-04-23 V2) YOLO chip relocation: `skills_cats.domain` → `skills_cats.ml_ai`. YOLO is a CV detection model family, not a domain; moved to sit next to GNN / transformers / RAG.
- `[✓]` H1.M1.G10.T4 — (2026-04-23 V2) graphkit-learn `.project-stats` live pills inside the card body: (a) GitHub **128 ⭐** (`github.com/jajupmochi/graphkit-learn/stargazers`), (b) PyPI **~300 / mo** (`pepy.tech/project/graphkit-learn`). New key `proj.gklearn.per_month` for the "/ mo" suffix. Pill styling via new `.project-stat-pill` CSS (pill shape, subtle border, hover → theme primary tint). Trades the "popular library" hand-wave for hard numbers.

#### G11 — Authority blocks
> Added 2026-04-23 V2. Rationale: talks and awards are credibility signals that don't belong in Publications or Projects but absolutely belong on the page. V1 didn't have them at all. B3 introduces two new surfaces: an Invited Talks service card (reusing the existing Services section) and a brand-new Awards & Grants section between Skills and Services.
- `[✓]` H1.M1.G11.T1 — (2026-04-23 V2) Services gains an **Invited Talks** card (`.service-card` with `fa-microphone-lines` icon). 3 `<li>`: GRAPHADON Summer School 2024 (Rouen) · ACPR 2023 (Kyoto) invited poster · Ph.D. defence 2023 (LITIS). Keys: `services_cards.talks_title` + `talks_i1..i3`.
- `[✓]` H1.M1.G11.T2 — (2026-04-23 V2) New `#awards` section — **Selected Awards & Grants** — between `#skills` and `#services`. `<h2>` uses `fa-trophy` icon + `sections.awards` key. `.awards-grid` layout with 4 `.award-card`s covering SNSF Postdoc.Mobility + SNSF Bodmer + Innosuisse PLANALYSER + ANR APi + MCAA (6 awards surfaced across the 4 cards). New keys: `sections.awards` + 4 subtrees × 3 properties = 12 `awards.*` keys.
- `[✓]` H1.M1.G11.T3 — (2026-04-23 V2) CSS for the awards block — `.awards-grid`, `.award-card` (left-border accent in theme primary), `.award-icon` (circular badge), `.award-body`, `.award-title`, `.award-meta` (grant ID / org / years), `.award-desc`. Theme parity verified across the 4 themes.
- `[✓]` H1.M1.G11.T4 — (2026-06-24 V1) **Invited Talks promoted from the Services card to a dedicated `#talks` section** — `Invited Talks & Presentations`, after `#experience`, in the Experience-style `.timeline` (date pulled to the front), with a navbar `Talks` link (`nav.talks`). Added the two 2026 invited talks (CSSABern Bern · Swiss-Sino Science Club Zurich) with self-hosted slide PDFs in `res/slides/`, corrected the S+SSPR 2020 flag 🇫🇷 → 🇮🇹 (Venice). i18n moved into a `talks.*` group (title / org / labels per talk); the old `services_cards.talks_*` keys removed; 4 locales in parity.

#### G12 — Recruiter-first page flow
> Added 2026-04-23 V2. Rationale: the original section order was a chronological accumulation (Research → Experience → Projects → Skills → Publications → Services → News → Contact). B4 reorders to prioritize what recruiters actually want to see first on a research-scientist site: Publications → Projects → Research (outline). Credibility proof first, then shipping proof, then context. Experience / Skills / Awards follow to give vetting detail. Services / News / Contact close.
- `[✓]` H1.M1.G12.T1 — (2026-04-23 V2) Full-page section reorder via Python regex (non-greedy `<section id="…">…</section>` extraction + reinsertion). Final order: `hero` → `.hero-ticker` → `#open-to-work` → `#about` → `#publications` → `#projects` → `#research` → `#experience` → `#skills` → `#awards` → `#services` → `#news` → `#contact`.
- `[✓]` H1.M1.G12.T2 — (2026-04-23 V2) i18n parity re-verified after the reorder — no key drift since the reorder only moved nodes, didn't edit them. 430 keys × 4 locales (up from 388 pre-V2 due to hero signature + About bullets + MSc/BS + Featured + stats + awards + talks + ticker key additions).
- `[✓]` H1.M1.G12.T3 — (2026-04-23 V2) Snapshot of pre-edit `index_en.html` saved as `index_en_v7_round1.html` before the B1-B4 batch, per the repo's round-file convention (big edits land as `v{N}_round{N}` working copies).

### M1.2 — SEO + AI-search visibility

**End-state:** Site is indexed correctly across Google, ranks for `Linlin Jia`
+ `graph machine learning` queries, and is cited by ChatGPT / Perplexity / Claude
when asked about graph ML researchers.

#### G1 — Schema.org coverage
- `[✓]` H1.M2.G1.T1 — Person schema with `knowsAbout` + `affiliation`.
- `[✓]` H1.M2.G1.T2 — ScholarlyArticle JSON-LD (10 entries).
- `[✓]` H1.M2.G1.T3 — SoftwareSourceCode JSON-LD (graphkit-learn, etc.).
- `[✓]` H1.M2.G1.T4 — WebSite + FAQPage + BreadcrumbList JSON-LD (done 2026-04-21 V2).
- `[✓]` H1.M2.G1.T5 — (2026-04-21 V9, SEO audit round-3 P5) Inject citation counts into Person + all 8 ScholarlyArticle schemas via `interactionStatistic` with `@type: InteractionCounter`, `interactionType: https://schema.org/CiteAction`, `userInteractionCount: <N>`. Person carries the total from `data/citations.json` (130); each paper gets its own count: J24=9, ACPR=1, CBM=61, Electronics=2, ESWA=25, PRL=14, W21b=9, W21a=7. Machine-readable peer-validation signal for Google / Scholar / LLM rerankers; avoids forcing them to scrape the page's visible `.citation-count` spans.

#### G2 — Multilingual crawlability
- `[✓]` H1.M2.G2.T1 — hreflang `?lang=` URL variants.
- `[✓]` H1.M2.G2.T2 — sitemap.xml expanded 3 → 13 URLs with `xhtml:link` alternates.
- `[✓]` H1.M2.G2.T3 — (2026-04-21 V8) Per-locale patent-link swap via new `data-i18n-href-map` attribute handled in `applyTranslations` (`js/main.js`). Chinese visitors now land on the Chinese-language Google Patents page (`/patent/CN106376041B`), while en / fr / de visitors land on the English version (`/patent/CN106376041B/en`). Rationale: Chinese readers reading a CN patent benefit from Google's native CN rendering; other-language readers get the English-translated abstract. Generic enough to support other locale-differentiated external URLs in the future (video mirrors, regional press coverage).
- `[✓]` H1.M2.G2.T4 — (2026-04-22 V1) Per-locale image `src` swap via new `data-i18n-src-map` attribute handled in `applyTranslations` (`js/main.js`). Sister to T3 but for `<img>` rather than `<a>` — used so the contact-section static map screenshot can render in the visitor's chosen language (en/zh/fr/de Google Maps tiles). Loader treats missing locale entry as a no-op (keeps the default `src`).

#### G3 — AI-search optimization
- `[ ]` H1.M2.G3.T1 — Add `llms.txt` once the convention stabilizes (currently nascent draft spec).
- `[ ]` H1.M2.G3.T2 — Quarterly check: is the site cited by ChatGPT / Perplexity / Claude when asked "tell me about graph ML researchers"?
- `[ ]` H1.M2.G3.T3 — Consider Mastodon / Bluesky verification for AI grounding signals.

#### G4 — Head hygiene (non-schema cleanup)
> Source: 2026-04-20 vibe audit §三 SEO / 可发现性. Extended 2026-04-21 V9 with SEO audit round-3 P0–P3 follow-through (sitemap hygiene + i18n attr parity on section headings + title/description keyword tightening).
- `[ ]` H1.M2.G4.T1 — Remove obsolete `<meta name="keywords">` tag (`index_en.html:8`). Modern search engines ignore it; keeping it adds noise.
- `[✓]` H1.M2.G4.T2 — (2026-04-21 V8) Association card icon `fa-edit` → `fa-id-badge` (`index_en.html:1252`). `fa-edit` semantically fits "Reviewing" (editorial work) but not "Associations" (membership / affiliation) — swapped to `fa-id-badge` so the icon matches the member-card semantic. Reviewing card keeps `fa-edit` as appropriate.
- `[✓]` H1.M2.G4.T3 — (2026-04-21 V9, SEO audit round-3 P0) `sitemap.xml` broken URLs fixed + 6 new figure URLs added (`sitemap.xml:54-78`). Two `<image:loc>` entries pointed at filenames renamed in V8 (`icpr2026_*` → `2026_icpr_*`, `jcc2023_*` → `2023_jcc_*`); both would 404 on Google Images crawl. Patched. Added 6 new `<image:loc>` for V8's pub-card figures (EpidNN abstract, Electronics stability, ESWA kernels, PRL accuracy, SSPR pre-image, SSPR GED metric) so the indexer discovers them without having to render the page.
- `[✓]` H1.M2.G4.T4 — (2026-04-21 V9, SEO audit round-3 P1) Beyond Research + Blog `<h2>` i18n attrs (`index_en.html:1423, 1543` + 4 locales). Both headings were static English under a `data-i18n` parent section but the `<h2>` itself had no attr — zh/fr/de visitors got mixed-language headings. Added `sections.beyond`, `sections.blog`, `beyond.subtitle`, `blog.label` keys to EN/ZH/FR/DE. Parity verified at 124 keys/locale.
- `[✓]` H1.M2.G4.T5 — (2026-04-21 V9, SEO audit round-3 P2) Title keyword tightening (`index_en.html:5`). New: `Linlin Jia, Ph.D. — ML Research Scientist | Graph ML · LLM` (60 chars, on the Google SERP cutoff line). Trades the vaguer "AI Research" for the higher-intent "LLM" keyword Linlin is targeting this job search.
- `[✓]` H1.M2.G4.T6 — (2026-04-21 V9, SEO audit round-3 P3) Meta description trimmed to 148 chars (`index_en.html:6`). Previous 160+ char description (from V6 G5.T1) was getting ellipsized on Google SERPs. New: "Linlin Jia, Ph.D. — Graph ML, LLM Agents, Spatio-Temporal Forecasting, AI for Science. Postdoc at U. Bern. Open to ML Research Scientist roles." Keeps the 4 target keywords + role + availability signal. Supersedes the V6 trim (210 → 156) with a further tightening.

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
- `[✓]` H1.M3.G4.T1 — (done; verified 2026-06-05 R9) Font family trimmed — Playfair Display + Orbitron + Inter + Noto Sans SC removed (index_en.html:461 comment), Spectral is the single Latin family. R9 also merged the EN page's 2 Google Fonts requests → 1, deduped Ma Shan Zheng / JetBrains Mono, and dropped ZCOOL XiaoWei (0 uses) on both index files.
- `[✓]` H1.M3.G4.T2 — (done; verified 2026-06-05 R9) `canvas-confetti` is loaded lazily on first use via `loadConfetti()` (index_en.html:477), not on page load.
- `[✓]` H1.M3.G4.T3 — (verified 2026-06-05, homepage redesign R7) Comprehensive `@media (prefers-reduced-motion: reduce)` IS in place: a global `*, *::before, *::after` catch-all (`css/main.css:3399` — `animation-duration/iteration-count/transition-duration` → near-zero) plus scoped fallbacks for content-critical motion (hero ticker `animation: none`, carousels, howler). Audit found motion a11y sound; item was stale-open.
- `[ ]` H1.M3.G4.T4 — Dedup map stack. Leaflet (JS) and Google Maps iframe both coexist; keep one. Google Maps iframe is also an a11y fail (`frame-title` missing).
- `[✓]` H1.M3.G4.T5 — (2026-04-23 V1) `openChatbot()` now uses `showToast()` + full i18n via `chatbot.toast_title` / `chatbot.toast_html` × 4 locales (en / zh / fr / de). `js/main.js:388-395`.
- `[✓]` H1.M3.G4.T6 — (2026-04-23 V1) Decouple chatbot button from welcome-overlay lifecycle. `.chatbot-trigger` now `display: flex` unconditionally (always visible at `bottom: 20px`); `.celebration-trigger` moved to `bottom: 100px` (stacks above). `closeWelcomeWithBottle(submitted)` only sets `hasVisitedBefore` on submit — skip path keeps 🎁 for next try. Fixes first-visit confusion where 🎁 was mistaken for a chatbot icon. `css/main.css` + `js/main.js`.

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

#### G5 — Cmd+K command palette search
> Added 2026-04-22 V1 (V11 backfill). Rationale: site has grown to 9 project cards + 10 publications + 4 themes + 4 locales — recruiters lose time scrolling. Cmd+K (or "/") opens a Mac-style palette indexing every section / project / publication / skill, with fuzzy match, keyboard nav, and ESC close. One concrete "wow" element on the H1.M4 list.
- `[✓]` H1.M4.G5.T1 — (2026-04-22 V1) Palette HTML in `index_en.html` (focus-trap, role=dialog, aria-modal, ESC + backdrop close, focus restore). Indexes section anchors + project / publication titles + skill chips into a single in-memory list, scored on substring match with token-prefix weighting.
- `[✓]` H1.M4.G5.T2 — (2026-04-22 V1) Cmd+K (macOS) / Ctrl+K (Win/Linux) / "/" (anywhere outside a text input) global keybinds. Shortcut hint badge inside the palette + tooltip on the navbar magnifier icon.
- `[✓]` H1.M4.G5.T3 — (2026-04-22 V1) i18n parity: 4 new `search.*` keys (`placeholder`, `aria`, `empty`, `no_results`) + 3 `common.search_*` placeholders (search, search_projects, search_publications) across en / zh / fr / de.
- `[✓]` H1.M4.G5.T4 — (2026-04-22 V1) Cross-theme verified via chrome-devtools on `ai-generated` / `academic` / `industrial` / `fancy` — palette card + ring color follow `--primary` per theme.

#### G6 — Visit Map (visitor-country choropleth)
> Added 2026-04-22 V1 (Phase 4). Rationale: turn the existing Microsoft Clarity weekly backup pipeline into a visible artifact at the bottom of the Contact section so recruiters see organic global reach without leaving the page. Self-built / no extra third-party tracker; reuses the snapshot JSON already committed under `data/analytics/`.
- `[✓]` H1.M4.G6.T1 — (2026-04-22 V1) `.visit-map-block` markup at the bottom of the Contact section in `index_en.html`. Stays `hidden` until JS verifies a snapshot exists; graceful no-op when no data is present.
- `[✓]` H1.M4.G6.T2 — (2026-04-22 V1) `initVisitMap` IIFE in `js/main.js`: `findLatestSnapshotPath` HEAD-probes back 90 days, `extractCountryCounts` walks Clarity's `data[*].information[*]` fields with `COUNTRY_ALIAS` ISO-2 → world-atlas English-name normalization, lazy-loads D3 v7.9.0 + topojson-client v3.1.0 from jsDelivr (script-src already allow-listed), renders `geoNaturalEarth1` projection with `scaleSequential` from `rgba(120,144,180,0.18)` → `--primary`. Renders Top-Countries `<ol>` + total / countries / window stats.
- `[✓]` H1.M4.G6.T3 — (2026-04-22 V1) Bundled `data/world-atlas/countries-110m.json` (~108 KB) locally instead of widening CSP `connect-src` to jsDelivr. Trade-off: one-time 108 KB cost vs. tighter CSP.
- `[✓]` H1.M4.G6.T4 — (2026-04-22 V1) i18n parity: 7 new `visitMap.*` keys (`title`, `totalVisits`, `countries`, `window`, `source`, `topCountries`, `svgTitle`) across en / zh / fr / de. Locale parity verified at 141 keys.
- `[✓]` H1.M4.G6.T5 — (2026-07-06 V1) Upgraded from single-latest-snapshot to **multi-snapshot aggregation + time-window selector** (past month / past year / all time, default all). New self-maintained `data/analytics/index.json` manifest (written by `scripts/fetch_clarity.py`) replaces the 90-day daily HEAD probe; `initVisitMap` caches per-snapshot region counts and re-sums per window. Relabels: "Top Countries" → "Top Regions", `countries` stat → `regions`, "Taiwan" → "Taiwan (China)" (list + tooltip, via `countries.Taiwan` override); `show all (N)` toggle for >5 regions. Choropleth colour fix: theme `--primary` became `oklch()` (unparseable by d3 v7 → faint map) → normalized via canvas + `scaleSequentialSqrt`. Mirrored on `index_zh_clear.html`; selector CSS moved to shared `css/main.css`. `visitMap.window` removed, `win_month/win_year/win_all/showAll/showLess` added; parity kept.
- `[✓]` H1.M4.G6.T5 — (2026-04-22 V1) Theme parity verified via chrome-devtools on `ai-generated` / `industrial` / `fancy` (with mock fixture; deleted before commit). Known v1 limitation: choropleth color is captured from `--primary` at first render — a runtime theme switch requires page reload to recolor (acceptable; future fix could `MutationObserver` `[data-theme]`).
- `[?]` H1.M4.G6.T6 — Production data fill: blocked on H2.M1.G4.T2 (`CLARITY_API_TOKEN` repo secret). Once Linlin sets the secret + re-triggers the workflow, the first real `data/analytics/clarity-YYYY-MM-DD.json` lands and the block self-activates on next page load.

#### G7 — Hero news ticker
> Added 2026-04-23 V2. Rationale: news matters most when it's recent ("ICPR 2026 just accepted"), but the News section sits near the bottom of the page — recruiters scrolling past Publications / Projects might never reach it. The hero ticker is a small always-visible banner under the fold-line that scrolls 5 latest news items in a CSS marquee. Doesn't compete with the hero photo for attention; doesn't push anything below-the-fold.
- `[✓]` H1.M4.G7.T1 — (2026-04-23 V2) `<aside class="hero-ticker">` block inserted between the hero block and OTW (`index_en.html:666-693`). Structure: small `.hero-ticker-label` ("📢 Latest") + `.hero-ticker-track` with two identical `.hero-ticker-content` divs (the second `aria-hidden="true"` for the seamless loop). Contents: 5 ticker items — 🆕 ICPR 2026 / 🚀 Neobanker live at InnoEX / 🎓 GRAPHADON invited / 💰 SNSF Virtual Bodmer / ⭐ graphkit-learn 128⭐ + ~300 PyPI / mo. Each item is a `data-i18n-html` span so embedded `<a>` / `<strong>` / `<code>` markup carries through the translation loader.
- `[✓]` H1.M4.G7.T2 — (2026-04-23 V2) `@keyframes tickerScroll { from { transform: translate3d(0,0,0); } to { transform: translate3d(-100%,0,0); } }` on `.hero-ticker-track` at 40 s linear infinite. Pauses on hover (`.hero-ticker:hover .hero-ticker-track` → `animation-play-state: paused`). Mobile `@media (max-width: 768px)` shrinks font + padding so the ticker doesn't dominate small screens.
- `[✓]` H1.M4.G7.T3 — (2026-04-23 V2) `prefers-reduced-motion: reduce` media query disables the animation entirely and pins the track at `translate3d(0,0,0)` — motion-sensitive visitors see a static "Latest" banner instead of a marquee. Honors the OS-level a11y preference.
- `[✓]` H1.M4.G7.T4 — (2026-04-23 V2) i18n parity: 6 new `ticker.*` keys (`label`, `t1`..`t5`) × 4 locales. Total locale parity: 430 keys.

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
- `[~]` H2.M1.G4.T4 — (2026-04-22 V1) Workflow now live on `master`; first manual run triggered (run id 24780197033) but **failed with `error: CLARITY_API_TOKEN env var not set`** — blocked on T1 + T2. Re-trigger after the secret lands.

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
- `[✓]` H2.M2.G3.T3 — (2026-06-16 V1) Homepage `index_en.html` social preview switched from the rotating `og-card.jpg` to a static `images/og-hero.jpg` (a 1200×630 capture of the live parchment notebook hero). Effect on T1: the rotation cron would now only matter for pages still on `og-card.jpg` (the zh/fr/de `index_zh_clear.html`) — reconsider whether weekly rotation is still wanted, or retire G3.

#### G4 — Spam mitigation (welcome form)
- `[ ]` H2.M2.G4.T1 — Cloudflare Turnstile (low-effort, free) — only if spam appears.
- `[✓]` H2.M2.G4.T2 — (2026-04-23 V1) Honeypot field — hidden `<input name="_gotcha">` in the welcome form; Apps Script rejects submissions with non-empty value. Zero false-positives, zero deps.
- `[ ]` H2.M2.G4.T3 — Per-IP rate limit in Apps Script (PropertiesService).
- `[✓]` H2.M2.G4.T4 — (2026-04-23 V1) Origin allowlist — Apps Script validates incoming `Origin` header against `['https://jajupmochi.github.io', 'http://localhost:8000']`; anything else → 403.
- `[✓]` H2.M2.G4.T5 — (2026-04-23 V1) Dwell time — `MIN_DWELL_MS = 2000`. Client stamps `t_open` when welcome modal opens; Apps Script rejects submissions arriving < 2 s later. Catches automated bots that don't simulate read-time.

### M2.3 — Backup & resilience

#### G1 — Clarity weekly backup
- `[~]` H2.M3.G1.T1 — (2026-04-22 V1) Workflow file `.github/workflows/backup-analytics.yml` pushed to `origin/master` (commit range `f64a27a..3ddd46a`); cron `'17 4 * * 0'` armed for next Sunday 04:17 UTC and `workflow_dispatch` available. First manual trigger executed; activation still depends on H2.M1.G4 (secret).

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

#### G3 — Blog reading-UX modules (foldable footer) `[✓]`
- `[✓]` H3.M2.G3.T1 — (2026-06-02) Shared `.blog-fold` collapsible (summary + ▾ chevron); applied to **Edit history** and **Cite this post** (both collapsed by default, click to expand). See `docs/UPDATES.md` 2026-06-02 V1/V2.

#### G4 — Code-block scrollbar (skeuomorphic) `[?]`
- `[?]` H3.M2.G4.T1 — Pick one of 4 skeuomorphic parchment scrollbar styles (1 卷轴木轴 wooden rod · 2 黄铜 brass · 3 皮革缝线 stitched leather · 4 竹简 bamboo) and apply to `.markdown-body pre` in `css/blog.css`. Options demo: `docs/strategy/blog-scrollbar-skeuomorphic-2026-06-02.html`. Awaiting Linlin's pick.

#### G5 — Blog engagement features `[ ]`
> Full build plan + tradeoffs: `docs/strategy/blog-features-implementation-plan-2026-06-02.md` + `blog-features-research-2026-06-02.md`. All client-only except the Like's count store. New `.blog-actions` bar under the title + `js/blog-actions.js`.
- `[ ]` H3.M2.G5.T1 — **Share**: `navigator.share` + intent fallbacks (Weibo / X / LinkedIn / email / copy) + WeChat QR.
- `[ ]` H3.M2.G5.T2 — **Related posts**: top-3 by tag-overlap from the registry, at the post foot.
- `[ ]` H3.M2.G5.T3 — **Bookmark / 收藏**: `localStorage` slug list + a "Saved" filter on the list.
- `[ ]` H3.M2.G5.T4 — **Like (dedicated button)**: D1 giscus-backed count + scroll-to-react (no new infra) OR D2 Cloudflare-Worker one-click. Linlin to choose D1/D2.
- `[ ]` H3.M2.G5.T5 — **Extras** (later): per-post OG/share image, in-post image lightbox, footnotes/callouts, post series, donate/赞赏 (incl. WeChat QR), TTS, webmentions, back-to-top, print stylesheet.

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

### M3.5 — Personal-space 3D environment (three.js)

> The site's `personal` section becomes an interactive three.js skeuomorphic home (living room / study) surfacing Linlin's hobbies + photos. Research + resources + 10-round design + spec under `docs/strategy/personal-3d-room-2026-06-02/`.

#### G1 — Research, design, build `[✓]`
- `[✓]` H3.M5.G1.T1 — (2026-06-03) Research + resource doc: `docs/strategy/personal-3d-room-2026-06-02/00-research.md` (decision: three.js primitives over downloaded models for robustness/China-access; CC0 kits noted as fallback).
- `[✓]` H3.M5.G1.T2 — (2026-06-03) Design: `00-plan.md` — elements → skeuomorphic form → content (desk→Apps, shelf→Publications, photo board→album, hiking, dancing, travel) + the 10-round lens plan.
- `[✓]` H3.M5.G1.T3 — (2026-06-03) Built `personal.html` over the 10 lenses (`round-notes.md`; screenshots round-5/7/8). Orbit + 6 clickable hotspots → parchment panels + album lightbox; a11y Explore menu; reduced-motion; no-WebGL fallback. 0 console errors.
- `[✓]` H3.M5.G1.T4 — (2026-06-03) Wired homepage navbar **Personal** → `personal.html` (both index files), replacing the coming-soon toast. Photos/copy are placeholders for Linlin to personalize.

#### G2 — Paper pop-up home redesign (v2 + v3) `[✓]`
- `[✓]` H3.M5.G2.T1 — (2026-06-11) v2: rebuilt the room as a **paper pop-up book diorama** (Linlin: v1 ugly + style-mismatched; personal content only). MeshToon + EdgesGeometry ink lines, parchment palette, 4 personal corners, pop-up entrance. `docs/strategy/personal-room-v2-2026-06-11/`.
- `[✓]` H3.M5.G2.T2 — (2026-06-11) v3 per Linlin's 5-point review: indoor **paper home** (dollhouse cutaway; hinged door to a pocket trail world = future-expansion area), sane proportions, multi-part detailed objects, **diegetic interactions** (wall map / door swings open / vinyl spins + notes / album opens + page-flip + lightbox — right sidebar removed), aspect-adaptive full-screen HOME view. Verified: all modes + ESC chain, 0 console errors desktop + mobile.
- `[✓]` H3.M5.G2.T3 — (2026-06-11) Entrance opened: navbar **Personal** → `personal.html` directly on both index files; the temporary coming-soon teaser (markup + `.ptz-*` CSS + `showPersonalTeaser` JS) removed; `res/portfolio/img/personal-room.png` re-shot from the v3 home (also feeds the no-WebGL fallback).
- `[✓]` H3.M5.G2.T5 — (2026-06-11) 狸花猫 inhabitant: procedural Li Hua tabby (striped canvas fur, white bib/belly/paws, tabby-M head, ringed tail, whiskers, toon outline) with a behaviour state machine — sit+look / walk (waypoint graph, collision-free) / sleep (breathing) / stretch / groom, random transitions with smooth pose blending; reduced-motion = asleep. **v2 refinement (same day, Linlin's 4 points):** lathed organic body + haunches/scruff/cheeks; tail properly rooted (was floating); layered amber eyes w/ slit pupils + random blinking; cinnabar collar + gilt 旺财 tag. **v3 (same day):** click-to-focus + camera-follow, pat interaction w/ 3 random reactions (bliss+hearts / flop / storm-off), wheel-out exit; eyes redesigned cuter (Dragon-Li ref: golden almond, round pupil, 2 glints); collar seated ⊥ neck axis + tag chained via gilt link.
- `[✓]` H3.M5.G2.T6 — (2026-06-16) **Living-room TV** with real video playback: a slim wall-mounted 4K panel whose screen is a real `<iframe>` in a `CSS3DRenderer` layer, revealed through a depth-only WebGL hole (`colorWrite:false` + `renderOrder:-1`) so occlusion is correct (the cat passes in front). 19 of Linlin's own videos as **shuffled** channels (Bilibili + YouTube; non-embeddable 小红书 / 微信视频号 = `type:'ext'` → colour-bar test card + "watch on site" link). Paper remote: power / channel ± / volume ± (YouTube via postMessage) / brightness (CSS filter) / watch-on-site; keyboard ←→↑↓. Old-set tune transition (snow → black → snow → picture) + channel OSD; reduced-motion skips the snow; narrow / portrait viewports auto-pull the camera back to fit the set. Future video links get shuffled in, not appended.
- `[✓]` H3.M5.G2.T7 — (2026-06-16) TV review follow-ups: muted-by-default with remote-driven sound (YouTube iframe API + `origin`; Bilibili via its own control, reachable through the overscan reveal), player-chrome overscan that auto-hides on mouse-leave and reveals on hover (CSS `:hover` over the iframe), and cover-art slates for the non-embeddable 小红书/微信 channels (covers self-hosted in `images/tv-ext/`).
- `[ ]` H3.M5.G2.T4 — Replace canvas postcard placeholders with Linlin's real photos (`photoTex`/`photoURL` call sites); optionally expand the outdoor world beyond the door.

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
