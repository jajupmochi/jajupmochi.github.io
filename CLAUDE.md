# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal academic website for Linlin Jia, hosted on GitHub Pages (`jajupmochi/jajupmochi.github.io`). Pure static HTML/CSS/JS — no build system, no bundler. Target audience: ML Research Scientist recruiters.

## Main files

- `index_en.html` — the deployed English site. This is what visitors see.
- `index_zh.html` — legacy Chinese page (much older, separate style).
- `locales/{en,zh,fr,de}.json` — i18n translations loaded by `index_en.html`.
- `data/citations.json` — Google Scholar citation data (manually maintained; no official API).
- `res/cv/CV_Linlin_Jia_{en,zh}.pdf` — CVs linked from the site.
- `new_web_test.html` — D3.js force-graph design reference, kept for inspiration.
- `blog/` and `docs/` — separate Jekyll projects (Hux Blog boilerplate, minima theme). Older, do not conflate with the main site.

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
