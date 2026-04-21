# Deployment checklist

Before pushing `master` to GitHub Pages, complete the items below **in order**.
Each section links to a detailed guide. The placeholder constants in
`index_en.html` flagged with `PASTE_...` **must be replaced** or the feature
silently no-ops.

## Order of operations

| # | Task | Time | Blocks | Detail |
|---|------|------|--------|--------|
| 1 | Create Google Sheet + Apps Script Web App, paste URL | ~10 min | welcome form | [form-backend-google-sheets.md](form-backend-google-sheets.md) |
| 2 | Create Clarity project, paste project id, enable cookie-less mode | ~5 min | analytics | [analytics-clarity.md](analytics-clarity.md) |
| 3 | Enable `.githooks/pre-commit` (once per clone) | 10 s | i18n safety | `git config core.hooksPath .githooks` (see CLAUDE.md) |
| 4 | Add `CLARITY_API_TOKEN` repo secret + enable Actions write perms | ~5 min | weekly backup | [analytics-backup.md](analytics-backup.md) |
| 5 | Skim CSP directives; add new CDN origins if you embed new services later | — | any new 3rd-party | [security-headers.md](security-headers.md) |

## Placeholders to replace in `index_en.html`

Search the file for each literal string:

| Placeholder | Replace with | From |
|-------------|--------------|------|
| `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` | GAS Web App URL (looks like `https://script.google.com/macros/s/.../exec`) | Step 1 |
| `PASTE_CLARITY_PROJECT_ID` | 10-char Clarity project id | Step 2 |

Optional (only if using the weekly backup workflow):

- GitHub repo → **Settings → Secrets and variables → Actions** → add
  `CLARITY_API_TOKEN` from the Clarity dashboard.

## Smoke test (recommended — do once after every deploy)

1. Load the live site, open DevTools **Console** — no `Refused to …` CSP errors,
   no 400s from Clarity (if step 2 done).
2. Clear `localStorage.hasVisitedBefore` → reload → fill the postcard → submit
   → within a few seconds your Google Sheet has a new row.
3. Resize to 375 px width → hamburger icon appears → tap opens the drawer.
4. Cycle all 4 themes (AI / Academic / Industrial / Fancy) — welcome postcard
   adapts to each.
5. Switch language (EN/中/FR/DE) — all strings update, no visible English
   stragglers in non-English locales.

## Repo-local hooks & scripts

| File | Purpose |
|------|---------|
| `.githooks/pre-commit` | Runs `scripts/check_i18n_parity.py` if any `locales/*.json` is staged; blocks commit on key divergence. |
| `scripts/check_i18n_parity.py` | EN is the baseline; zh/fr/de must have the same key tree. |
| `scripts/welcome-form-backend.gs` | Apps Script template (paste into Sheets → Extensions → Apps Script). |
| `scripts/fetch_clarity.py` | Called by the weekly GH Actions workflow — no manual run needed. |
| `.github/workflows/backup-analytics.yml` | Weekly cron that commits Clarity snapshots to `data/analytics/`. |

## If something breaks

- **Form submits but no row in Sheet** → Apps Script deployment cached; go to
  **Deploy → Manage deployments → New version**.
- **CSP error in console** → add the offending origin to the matching directive
  in the `<meta http-equiv="Content-Security-Policy">` tag at the top of
  `index_en.html`. See [security-headers.md](security-headers.md).
- **`git push` fails** → you probably skipped `core.hooksPath .githooks` once,
  so the pre-commit hook didn't fire on an earlier commit; re-enable it with
  `git config core.hooksPath .githooks`.

## Contact for this checklist

If any step above stops matching the actual dashboards (Clarity, Apps Script,
GitHub UI) — those services reshuffle UI every few months — just update the
relevant file in `setup/` and commit.
