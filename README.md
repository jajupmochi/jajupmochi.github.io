# jajupmochi.github.io

Personal academic homepage for **Linlin Jia, Ph.D.** — Machine Learning Research Scientist / Advanced Postdoc at the University of Bern. Hosted on GitHub Pages.

Live site: <https://jajupmochi.github.io/index_en.html>

## Repository layout

| Path | Purpose |
|------|---------|
| `index_en.html` | Deployed English site (source of truth for visitors). |
| `index_zh.html` | Legacy Chinese page (older, separate style). |
| `locales/{en,zh,fr,de}.json` | i18n translations loaded by `index_en.html`. |
| `data/citations.json` | Manually maintained Google Scholar citation data. |
| `res/cv/CV_Linlin_Jia_{en,zh}.pdf` | Downloadable CV PDFs linked from the site. |
| `images/` | Photos, favicon, Open Graph social cards. |
| `scripts/` | Local utilities (e.g. OG-card generation) — not run on deploy. |
| `blog/`, `docs/` | Separate Jekyll subprojects (Hux Blog / minima). |
| `index_en_v{N}_round{N}.html` | Redesign working copies; `v{N}_round3` is the approved version for that generation. |

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000/index_en.html
```

Opening the HTML via `file://` breaks `fetch('locales/*.json')` (CORS). Use the server.

## Open Graph social card

When somebody shares the site URL in Slack, LinkedIn, X, WhatsApp, etc., the scrape-preview uses `images/og-card.jpg`. That image is **pre-rendered, not generated at request time** — GitHub Pages has no build step and nothing runs on deploy. Regeneration is a **manual one-shot** whenever the identity / role / research copy changes.

**Files produced:**

| File | Role |
|------|------|
| `images/og-card.jpg` | **Default** — white background, referenced by `<meta property="og:image">`. |
| `images/og-card-blue.jpg` | Alternate deep-blue gradient variant (kept for optional rotation). |

**Regenerate:**

```bash
bash scripts/generate-og-card.sh
```

Requires ImageMagick v6 (`sudo apt install imagemagick` on Debian/Ubuntu). The script takes `images/photo.jpg` as the source portrait, masks it into a circle, and composites the name / role / affiliation / research keywords / "Open to …" pill / site+email line over the chosen background. Edit the top of the script to change copy or layout.

**Rotate between variants (optional):**

```bash
bash scripts/rotate-og-card.sh
```

Overwrites `og-card.jpg` with a random pick from {white, blue}, letting scraper previews vary over time. Nothing invokes this automatically — run it by hand, or wire it into a GitHub Actions cron if you want a scheduled shuffle:

```yaml
# .github/workflows/rotate-og-card.yml
name: Rotate OG card
on:
  schedule:
    - cron: '0 8 * * 1'   # Mondays 08:00 UTC
  workflow_dispatch:
jobs:
  rotate:
    runs-on: ubuntu-latest
    permissions: { contents: write }
    steps:
      - uses: actions/checkout@v4
      - run: bash scripts/rotate-og-card.sh
      - run: |
          git config user.name  github-actions
          git config user.email github-actions@github.com
          git add images/og-card.jpg
          git diff --cached --quiet || git commit -m "chore(og): rotate social card"
          git push
```

Not enabled by default — commits to `master` every week, which some may prefer to avoid.

**True per-request randomisation** would need a server or CDN edge worker; it's not possible on pure GitHub Pages because crawlers do not execute JavaScript.

## Themes

A navbar control cycles through four themes, persisted to `localStorage`:

- `ai-generated` (default) — purple / indigo
- `academic` — light, minimal blue
- `industrial` — dark slate with Orbitron display font
- `fancy` — Wonderland pink with animations

Theme state lives as `data-theme="…"` on `<body>`. When editing CSS, verify all four — a change that looks right in `ai-generated` may break `fancy`.

## Deploy

Pushing to `master` deploys automatically via GitHub Pages. No build step.

## Notes for contributors / future me

- `locales/*.json` and `data/*.json` must stay valid JSON (a syntax error breaks the site). `jq . <file>` after edits.
- `locales/{en,zh,fr,de}.json` must share identical key trees; missing keys surface as visible English defaults.
- Redesign workflow (`index_en_v{N}_round{N}.html`) and project conventions live in `CLAUDE.md`.
