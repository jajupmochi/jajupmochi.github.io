# docs/ — Project Documentation

> **Language:** English | [中文](README.zh.md)
>
> Index for everything under `docs/`. This is the documentation home for
> `jajupmochi.github.io` — roadmap, change log, one-time setup guides, audit
> notes, and archived sub-projects. Root-level files (`CLAUDE.md`, `README.md`)
> stay at repo root because tooling / Claude Code auto-loads them from there.

## Master TOC

- [What lives here](#what-lives-here)
    - [Roadmap & change log](#roadmap--change-log)
    - [`setup/` — one-time configuration guides](#setup--one-time-configuration-guides)
    - [`vibe/` — audit & research notes](#vibe--audit--research-notes)
    - [`_archive-jekyll-minima/`](#_archive-jekyll-minima)
- [What is NOT here (intentionally)](#what-is-not-here-intentionally)
- [Bilingual convention](#bilingual-convention)

## What lives here

### Roadmap & change log

| File | Purpose |
|------|---------|
| [`PLAN.md`](PLAN.md) / [`PLAN.zh.md`](PLAN.zh.md) | Master roadmap. Horizon / Milestone / Goal / Task hierarchy with stable IDs (`H1.M2.G3.T4`) and status markers (`[ ]` / `[~]` / `[✓]` / `[!]` / `[?]` / `[x]`). Single source of truth for long- and mid-term planning. |
| [`UPDATES.md`](UPDATES.md) / [`UPDATES.zh.md`](UPDATES.zh.md) | Chronological change log. Newest day on top; within a day, highest `V<n>` on top. Every PR / commit MUST add a bullet here (see `CLAUDE.md` hard rules). |

### `setup/` — one-time configuration guides

External-service wiring that must be done once per clone or once per deployment. Until each guide's steps are executed, the matching feature silently no-ops on the live site.

| Guide | PLAN ID | What it covers |
|-------|---------|----------------|
| [`setup/README.md`](setup/README.md) / [`.zh.md`](setup/README.zh.md) | — | Index + deployment checklist. |
| [`setup/form-backend-google-sheets.md`](setup/form-backend-google-sheets.md) / [`.zh.md`](setup/form-backend-google-sheets.zh.md) | `H2.M1.G1` | Welcome postcard → Google Sheets via Apps Script. |
| [`setup/analytics-clarity.md`](setup/analytics-clarity.md) / [`.zh.md`](setup/analytics-clarity.zh.md) | `H2.M1.G2` | Microsoft Clarity analytics (cookie-less mode). |
| [`setup/analytics-backup.md`](setup/analytics-backup.md) / [`.zh.md`](setup/analytics-backup.zh.md) | `H2.M1.G4`, `H2.M3.G1` | GitHub Actions weekly Clarity API backup. |
| [`setup/security-headers.md`](setup/security-headers.md) / [`.zh.md`](setup/security-headers.zh.md) | `H1.M2`, `H2.M1.G1/G2` | CSP / Referrer-Policy / X-Content-Type meta hardening. |

### `vibe/` — audit & research notes

Deeper-dive analyses and third-party audit reports. These are *context*, not authoritative — feed into `PLAN.md` as Horizon / Milestone / Goal / Task entries rather than being acted on directly.

Current contents:

- `网站深度分析报告_claude_code_2026.04.20.md` — 2026-04-20 site audit run (SEO, performance, a11y, recruiter-memorability). Integrated into `PLAN.md` as `H1.M2.G1.T5` + new `H1.M3.G4` + new `H1.M4` Milestone.

### `_archive-jekyll-minima/`

Superseded Jekyll subproject (minima theme `_config.yml`, `Gemfile`, `_posts/…`). Kept for historical reference; no longer built or deployed. The active site is pure static HTML/CSS/JS from `index_en.html`.

## What is NOT here (intentionally)

- `CLAUDE.md` / `CLAUDE.zh.md` — stay at repo root because Claude Code auto-loads `./CLAUDE.md` from the project root.
- `README.md` / `README.zh.md` — stay at repo root so GitHub renders them as the repo landing page.
- `CLAUDE.local.md` — private, gitignored personal preferences.
- `extra_info_work.md` — Linlin's raw professional content source; kept at root for quick access alongside the CV PDFs.

## Bilingual convention

Every doc here ships in two files: `NAME.md` (English, canonical) + `NAME.zh.md` (Chinese mirror). Code, identifiers, filenames, and Horizon/Milestone/Goal/Task IDs stay in English in both versions — only prose is translated. See `CLAUDE.md` hard rules for the full convention.
