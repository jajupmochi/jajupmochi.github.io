# jajupmochi.github.io

> **Language:** English | [中文](README.zh.md)

Personal academic homepage for **Linlin Jia, Ph.D.** — Machine Learning Research Scientist / Advanced Postdoc at the University of Bern. Hosted on GitHub Pages.

Live site: <https://jajupmochi.github.io/index_en.html>

## Master TOC

- [For visitors (recruiters, collaborators)](#for-visitors-recruiters-collaborators)
- [For the maintainer (Linlin / future me)](#for-the-maintainer-linlin--future-me)
    - [Quick actions](#quick-actions)
    - [Manual one-time setup checklist](#manual-one-time-setup-checklist)
    - [Repository layout](#repository-layout)
    - [Where each feature is documented](#where-each-feature-is-documented)
    - [How to …](#how-to-)
- [For AI agents (Claude Code, etc.)](#for-ai-agents-claude-code-etc)
    - [Entry-point files](#entry-point-files)
    - [Roadmap + change log](#roadmap--change-log)
    - [Project skills](#project-skills)
- [Open Graph social card](#open-graph-social-card)
- [Themes](#themes)
- [Deploy](#deploy)
- [Notes for contributors / future me](#notes-for-contributors--future-me)

---

## For visitors (recruiters, collaborators)

You probably landed here from the live site. The authoritative entry point is:

- **Homepage:** <https://jajupmochi.github.io/index_en.html>
- **CV (English):** [`res/cv/CV_Linlin_Jia_en.pdf`](res/cv/CV_Linlin_Jia_en.pdf)
- **Contact:** email on the homepage hero; [Google Scholar](https://scholar.google.com/citations?user=RBjUTooAAAAJ).

Nothing else in this repository is meant for visitor consumption — everything below is engineering / maintenance.

---

## For the maintainer (Linlin / future me)

### Quick actions

| Want to… | Do this |
|----------|---------|
| Preview the site locally | `python3 -m http.server 8000` → <http://localhost:8000/index_en.html> |
| Small copy / CSS edit | Edit `index_en.html` / `css/main.css` directly, commit. |
| Big redesign | `/new-round` → iterate on `index_en_v{N}_round{M}.html` → `/deploy-round` |
| Verify a UI change in a real browser | `/verify-visual` (uses chrome-devtools MCP) |
| Check i18n key parity | `/i18n-sync` |
| See what's on the roadmap | [`docs/PLAN.md`](docs/PLAN.md) |
| Check what changed recently | [`docs/UPDATES.md`](docs/UPDATES.md) |

### Manual one-time setup checklist

These steps live **outside this repo** (dashboards, tokens). Until done, the matching feature silently no-ops on the live site. Detailed instructions are in `docs/setup/`.

- [ ] **Welcome form backend** → `docs/setup/form-backend-google-sheets.md` — create Google Sheet + Apps Script; replace `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` in `index_en.html`. *(PLAN: `H2.M1.G1`)*
- [ ] **Microsoft Clarity analytics** → `docs/setup/analytics-clarity.md` — create Clarity project; replace `PASTE_CLARITY_PROJECT_ID` in `index_en.html`; enable cookie-less mode. *(PLAN: `H2.M1.G2`)*
- [ ] **Pre-commit hook** → run **once per clone**: `git config core.hooksPath .githooks`. *(PLAN: `H2.M1.G3`)*
- [ ] **Clarity weekly backup** → `docs/setup/analytics-backup.md` — generate Clarity API token, add as repo secret `CLARITY_API_TOKEN`, enable GH Actions write permissions. *(PLAN: `H2.M1.G4`)*

Check off each item and update the matching `docs/PLAN.md` entry (`[?]` → `[✓]`).

### Repository layout

| Path | Purpose |
|------|---------|
| `index_en.html` | Deployed English site (source of truth for visitors). |
| `index_zh.html` | Legacy Chinese page (older, separate style). |
| `css/main.css`, `js/main.js` | Extracted stylesheet + JS (loaded by `index_en.html`). |
| `locales/{en,zh,fr,de}.json` | i18n translations. All four must share identical key trees. |
| `data/citations.json` | Google Scholar citation data (manually maintained). |
| `data/analytics/` | Weekly Clarity snapshots committed by the cron workflow. |
| `res/cv/CV_Linlin_Jia_{en,zh}.pdf` | Downloadable CV PDFs linked from the site. |
| `res/figures/` | Research diagrams (SVG + PNG fallback) embedded in project + publication cards. |
| `images/` | Photos, favicon, Open Graph social cards, hero photo in AVIF / WebP / JPEG. |
| `scripts/` | Local utilities — OG card generation, i18n parity check, Clarity fetch, Apps Script template. |
| `docs/` | Project documentation home — `PLAN.md`, `UPDATES.md`, `setup/` one-time guides, `vibe/` audit notes, `_archive-jekyll-minima/`. See `docs/README.md`. |
| `sitemap.xml`, `robots.txt` | SEO crawl control. |
| `blog/` | Legacy Jekyll subproject (Hux Blog boilerplate). Older, unrelated to the main site. |
| `archive/` | Old redesign rounds that have been superseded. |
| `index_en_v{N}_round{M}.html` | In-flight redesign rounds; `v{N}_round3` is the approved version for that generation. Don't delete. |
| `index_en_backup.html` | Pre-redesign snapshot. Don't touch. |
| `extra_info_work.md` | Linlin's extended professional info — content source of truth alongside the CV PDF. |

### Where each feature is documented

| Feature | Doc | Reader |
|---------|-----|--------|
| Overall maintenance workflow | [`CLAUDE.md`](CLAUDE.md) (hard rules, skills, hooks) | maintainer + AI |
| Roadmap / pending work | [`docs/PLAN.md`](docs/PLAN.md) (Horizon / Milestone / Goal / Task) | maintainer + AI |
| Per-change audit log | [`docs/UPDATES.md`](docs/UPDATES.md) (daily, V1/V2/… sub-headings) | maintainer + AI |
| Welcome-form backend (Google Sheets + Apps Script) | [`docs/setup/form-backend-google-sheets.md`](docs/setup/form-backend-google-sheets.md) | maintainer (one-time) |
| Microsoft Clarity analytics (cookie-less) | [`docs/setup/analytics-clarity.md`](docs/setup/analytics-clarity.md) | maintainer (one-time) |
| Clarity weekly backup (GitHub Actions cron) | [`docs/setup/analytics-backup.md`](docs/setup/analytics-backup.md) | maintainer (one-time) |
| CSP / Referrer-Policy / X-Content-Type meta | [`docs/setup/security-headers.md`](docs/setup/security-headers.md) | maintainer (when adding a new CDN) |
| Deployment checklist index | [`docs/setup/README.md`](docs/setup/README.md) | maintainer |
| OG card regeneration | This file, [Open Graph social card](#open-graph-social-card) | maintainer (when copy changes) |
| i18n key parity | [`CLAUDE.md`](CLAUDE.md#hard-rules) + `/i18n-sync` skill | maintainer + AI |
| Redesign workflow | [`CLAUDE.md`](CLAUDE.md#iterative-workflow-mixed-mode) + `/new-round`, `/deploy-round` skills | maintainer + AI |
| Pre-commit hook (i18n parity check) | `.githooks/pre-commit` + [`docs/setup/README.md`](docs/setup/README.md) | maintainer (one-time) |
| PostToolUse JSON validation hook | `.claude/settings.json` + [`CLAUDE.md`](CLAUDE.md#subagents--skills--hooks) | AI |
| Content source of truth | `res/cv/CV_Linlin_Jia_en.pdf` + `extra_info_work.md` | maintainer + AI |

### How to …

- **Add a new project card:** edit the `#projectsTrack` carousel in `index_en.html`. If the project has a research figure, drop an SVG + PNG in `res/figures/` and embed via `<object type="image/svg+xml">` with the PNG as `<img>` fallback. Update the Person → SoftwareSourceCode JSON-LD if the project has a public repo. (TODO: extract this into a dedicated `docs/setup/add-project-card.md` — see `docs/PLAN.md` `H4.M2.G2.T1`.)
- **Add a new publication:** edit the publications section in `index_en.html` AND add the ScholarlyArticle JSON-LD block in `<head>`. Bump the stats counter.
- **Add a new locale (e.g. ja):** duplicate `locales/en.json` → `locales/ja.json`, translate values, keep the key tree identical. Add `ja` to the language list in `js/main.js`. Add a new `?lang=ja` entry to `sitemap.xml`. Run `/i18n-sync`. (TODO: extract into `docs/setup/add-locale.md` — `docs/PLAN.md` `H4.M2.G2.T2`.)
- **Extend CSP for a new third-party CDN:** edit the `<meta http-equiv="Content-Security-Policy">` tag in `index_en.html`. Add the origin to both `script-src` and `connect-src`. Verify in DevTools Console — any CSP error starts with `Refused to …`. Details in [`docs/setup/security-headers.md`](docs/setup/security-headers.md).

---

## For AI agents (Claude Code, etc.)

### Entry-point files

1. [`CLAUDE.md`](CLAUDE.md) — hard rules, conventions, skills.
2. [`docs/PLAN.md`](docs/PLAN.md) — full roadmap with Horizon / Milestone / Goal / Task IDs and status markers.
3. [`docs/UPDATES.md`](docs/UPDATES.md) — chronological change log; tail the top of file for recent context.
4. [`extra_info_work.md`](extra_info_work.md) — Linlin's extended professional info (content source of truth alongside the CV PDF).

### Roadmap + change log

The Horizon / Milestone / Goal / Task hierarchy in `docs/PLAN.md` uses stable numeric IDs (`H1.M2.G3.T4`). Before starting work, locate the matching Task ID. After finishing, update the status marker (`[ ]`→`[~]`→`[✓]`) and add a matching bullet to `docs/UPDATES.md` in the same edit batch. See [`CLAUDE.md#documentation-conventions`](CLAUDE.md#documentation-conventions).

### Project skills

Located in `.claude/skills/`. Each has its own SKILL.md.

| Skill | Purpose |
|-------|---------|
| `/preview` | Start `python3 -m http.server 8000` in the background. |
| `/verify-visual` | Drive chrome-devtools MCP to verify a UI change. |
| `/new-round` | Create the next `index_en_v{N}_round{M}.html` working file. |
| `/deploy-round` | Promote a finalized round file to `index_en.html`. |
| `/i18n-sync` | Check locale key parity across `en/zh/fr/de`. |

---

## Open Graph social card

When somebody shares the site URL in Slack, LinkedIn, X, WhatsApp, etc., the scrape-preview uses `images/og-card.jpg`. That image is **pre-rendered, not generated at request time** — GitHub Pages has no build step. Regeneration is a **manual one-shot** whenever the identity / role / research copy changes.

**Files produced:**

| File | Role |
|------|------|
| `images/og-card.jpg` | **Default** — white background, referenced by `<meta property="og:image">`. |
| `images/og-card-blue.jpg` | Alternate deep-blue gradient variant (kept for optional rotation). |
| `images/og-card_purple.jpg` | AI-generated / v7 variant. |

**Regenerate:**

```bash
bash scripts/generate-og-card.sh
```

Requires ImageMagick v6 (`sudo apt install imagemagick` on Debian/Ubuntu). The script takes `images/photo.jpg` as the source portrait, masks it into a circle, and composites name / role / affiliation / research keywords / "Open to …" pill / site+email over the chosen background. Edit the top of the script to change copy or layout.

**Rotate between variants (optional):**

```bash
bash scripts/rotate-og-card.sh
```

Overwrites `og-card.jpg` with a random pick. Nothing invokes this automatically — run by hand, or enable the weekly cron in `.github/workflows/rotate-og-card.yml` (see `docs/PLAN.md` `H2.M2.G3.T1`).

---

## Themes

A navbar control cycles through four themes, persisted to `localStorage`:

- `ai-generated` (default) — purple / indigo
- `academic` — light, minimal blue
- `industrial` — dark slate with Orbitron display font
- `fancy` — Wonderland pink with animations

Theme state lives as `data-theme="…"` on `<body>`. When editing CSS, verify all four — a change that looks right in `ai-generated` may break `fancy`.

---

## Deploy

Pushing to `master` deploys automatically via GitHub Pages. No build step.

Before pushing, walk through the checklist in [`docs/setup/README.md`](docs/setup/README.md) — it covers the PASTE_ placeholder replacement, CSP directives, and a smoke test.

---

## Notes for contributors / future me

- `locales/*.json` and `data/*.json` must stay valid JSON — a syntax error breaks the deployed site. Run `jq . <file>` after edits.
- `locales/{en,zh,fr,de}.json` must share identical key trees; missing keys surface as visible English defaults.
- Redesign workflow (`index_en_v{N}_round{M}.html`) and other project conventions live in [`CLAUDE.md`](CLAUDE.md).
- The roadmap lives in [`docs/PLAN.md`](docs/PLAN.md). Every change should also land as a bullet in [`docs/UPDATES.md`](docs/UPDATES.md) on the current date.
