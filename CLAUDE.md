# CLAUDE.md

> **Language:** English | [中文](CLAUDE.zh.md)

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Master TOC

- [Project](#project)
- [Main files](#main-files)
- [Iterative workflow (mixed mode)](#iterative-workflow-mixed-mode)
- [Hard rules](#hard-rules)
- [Documentation conventions](#documentation-conventions)
    - [Master TOC requirement](#master-toc-requirement)
    - [PLAN.md — roadmap source of truth](#planmd--roadmap-source-of-truth)
    - [UPDATES.md — per-change log](#updatesmd--per-change-log)
    - [Hierarchy + status marker system](#hierarchy--status-marker-system)
- [Preview](#preview)
- [Themes](#themes)
- [Git / deploy](#git--deploy)
- [Subagents / skills / hooks](#subagents--skills--hooks)

## Project

Personal academic website for Linlin Jia, hosted on GitHub Pages (`jajupmochi/jajupmochi.github.io`). Pure static HTML/CSS/JS — no build system, no bundler. Target audience: ML Research Scientist recruiters.

## Main files

- `index_en.html` — the deployed English site. This is what visitors see.
- `index_zh.html` — legacy Chinese page (much older, separate style).
- `locales/{en,zh,fr,de}.json` — i18n translations loaded by `index_en.html`.
- `data/citations.json` — Google Scholar citation data (manually maintained; no official API).
- `res/cv/CV_Linlin_Jia_{en,zh}.pdf` — CVs linked from the site.
- `new_web_test.html` — D3.js force-graph design reference, kept for inspiration.
- `docs/` — project documentation home. Contains `PLAN.md`, `UPDATES.md`, `setup/` (one-time setup guides), `vibe/` (audit / research notes), and `_archive-jekyll-minima/` (archived Jekyll subproject). Index: `docs/README.md`.
- `blog/` — legacy Jekyll subproject (Hux Blog boilerplate). Separate from the main site; kept for history.

## Iterative workflow (mixed mode)

- **Small edits** (copy tweak, one style fix, typo): edit `index_en.html` directly.
- **Large edits** (new section, redesign, feature): create `index_en_v{N}_round{N}.html` as a working copy. Three rounds per version — round1 core change, round2 refinement, round3 polish. When round3 is approved, copy its contents to `index_en.html`.
- The next version number `N` is one greater than the highest existing `index_en_v{N}_round*.html`.
- Old `v{N}_round{N}.html` files are intentionally kept for reference — do not delete them without asking.
- `index_en_backup.html` is the pre-redesign snapshot; do not touch.

## Hard rules

- **Visual verification is required.** Every UI-affecting change must be verified in a real browser via the chrome-devtools MCP plugin (navigate, snapshot, inspect) before the task is considered done. Passing code review or a successful edit alone is not enough.
- **JSON validity.** `locales/*.json` and `data/*.json` must stay valid JSON — a syntax error breaks the deployed site. Run `jq . <file>` after edits.
- **i18n key parity.** The 4 files `locales/{en,zh,fr,de}.json` must have identical key trees. If you add a key to one, add it to all four (the loader falls back to inline defaults but missing keys surface as visible English text).
- **Content source of truth.** When updating professional content (bio, publications, projects, experience), the authoritative sources are `res/cv/CV_Linlin_Jia_en_*.pdf` and `extra_info_work.md`. If the site disagrees with these, fix the site, not the sources.
- **Mandatory `docs/UPDATES.md` log.** EVERY change to this repo (content, code, asset, copy, config) MUST add an entry to `docs/UPDATES.md` in the same edit batch. Format: today's date as `# YYYY-MM-DD` H1 (UTC, use `currentDate` from environment or run `date -u +%F`), **newest day on top**. If multiple distinct change-sets land on the same day, group each under `## V1`, `## V2`, `## V3` H2 sub-headings **with the highest V number on top** (most recent work first). Each entry is a short bullet list — what changed and why. Keep the `## Master TOC` at the file's top in sync in the same edit — add a bullet for every new day, and a sub-bullet for every new V with a one-line hook. **A PR / commit without a corresponding `docs/UPDATES.md` entry (and TOC update) is incomplete.** Backfill if missed.
- **Mandatory `docs/PLAN.md` sync.** If a change matches an existing `docs/PLAN.md` item, update its status marker (`[ ]`→`[~]`→`[✓]`) in the same edit batch. If it introduces new planned work (not shipping today), add the new Horizon / Milestone / Goal / Task entries with fresh IDs. A PR that changes roadmap-relevant behavior without touching `docs/PLAN.md` is incomplete.
- **Mandatory Master TOC on every doc.** Every markdown file in this repo (root `.md`, `docs/**/*.md`, `.claude/skills/*/SKILL.md`) MUST start with a `## Master TOC` (or equivalent "Table of contents" section) listing every `##` section as a bullet, using the hierarchy conventions below. `docs/UPDATES.md` also carries a Master TOC — nested bullets by date → `V<n>` with a one-line hook each. Keep it in sync when appending entries.
- **Bilingual docs — two files per doc.** Every repo-level doc MUST ship in both English and Chinese as **two separate files**. Convention: `NAME.md` (English, canonical) + `NAME.zh.md` (Chinese mirror) sitting side-by-side. The top of each file MUST include a one-line language switcher: `> **Language:** English | [中文](NAME.zh.md)` (or the mirror). Code, identifiers, filenames, Horizon/Milestone/Goal/Task IDs, and JSON/YAML inside code blocks stay in English in both versions — only prose is translated. Exceptions: `extra_info_work.md` (Linlin's content source), `CLAUDE.local.md` (private file), `.claude/skills/*/SKILL.md` (consumed by Claude, must stay in English — Chinese mirror optional).

## Documentation conventions

### Master TOC requirement

The first major section of every markdown doc in this repo is its TOC. Format:

```markdown
# Title

> One-sentence purpose.

## Master TOC

- [Section 1](#section-1)
- [Section 2](#section-2)
    - [Subsection 2.1](#subsection-21)
```

Use multi-level bullets (at least 3 levels where the content warrants it). An AI agent scanning the file should be able to orient itself from the TOC alone.

### PLAN.md — roadmap source of truth

`docs/PLAN.md` is the **only** place the long-term / mid-term / current roadmap lives. Do not duplicate roadmap info in README, CLAUDE.md, or inline comments — link to the relevant `docs/PLAN.md` ID instead.

### UPDATES.md — per-change log

`docs/UPDATES.md` is the chronological audit log. Every change lands here as a short bullet under today's date. See `## Hard rules` above.

### Hierarchy + status marker system

Applied in `PLAN.md` and (where useful) in any doc with structured TODOs:

**Hierarchy:**

| Layer | ID | Scope |
|-------|----|----|
| **Horizon** | `H<n>` | Strategic theme. Months → years. |
| **Milestone** | `M<n>` | Concrete deliverable. Weeks → months. |
| **Goal** | `G<n>` | Testable piece of a Milestone. Days → weeks. |
| **Task** | `T<n>` | Atomic action, one edit batch. Minutes → hours. |

IDs are assigned in creation order and **never re-numbered**. Full path: `H1.M2.G3.T4`.

**Status markers:**

| Marker | Meaning |
|--------|---------|
| `[✓]` | Done — shipped, verified, in the codebase. |
| `[~]` | In progress — actively being worked on this session. |
| `[ ]` | Pending — queued, ready to pick up. |
| `[!]` | Blocked — waiting on dependency / external answer. |
| `[?]` | Awaiting user input — needs Linlin's manual / external action. |
| `[x]` | Cancelled — kept for history with a one-line "Why cancelled:" note. |

Parent status rolls up to the most-incomplete child.

## Preview

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/index_en.html`. File-system `file://` access breaks `fetch('locales/*.json')` (CORS) — use the server. The code has an inline-translation fallback for that case, but visual verification must use the server.

## Themes

Four themes switch via a navbar control: `ai-generated` (default purple/blue), `academic` (light minimal), `industrial` (dark, Orbitron font), `fancy` (Wonderland pink with animations). Theme state is in `body.className` and `localStorage`. When editing CSS, verify all four themes — a change that looks right in `ai-generated` may break `fancy`.

## Git / deploy

- Remote: `git@github.com:jajupmochi/jajupmochi.github.io.git`
- Branch: `master` (deploys automatically via GitHub Pages — no CI config needed).
- Before committing: run `git status` and `git diff` so the user can review. Do not commit unless explicitly asked.

## Subagents / skills / hooks

- `.claude/skills/` contains project skills: `/preview`, `/verify-visual`, `/new-round`, `/deploy-round`, `/i18n-sync`. See each SKILL.md for details.
- `.claude/settings.json` runs a PostToolUse hook that validates JSON files after edits.
- `.githooks/pre-commit` runs `scripts/check_i18n_parity.py` when any `locales/*.json` is staged — fails the commit if `zh/fr/de` diverge from the `en.json` key tree. **Enable once per clone:** `git config core.hooksPath .githooks`.
