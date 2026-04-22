# Analytics backup — automated to GitHub

> **Language:** English | [中文](analytics-backup.zh.md)

A weekly GitHub Actions cron pulls Microsoft Clarity aggregate data and commits
snapshots to `data/analytics/clarity-YYYY-MM-DD.json` in this repo. This
protects against Clarity ever going away (unlikely) or changing its free tier
without notice, and gives you version-controlled history you can diff.

**This backup intentionally does NOT include welcome-form submissions.**
Those rows live in a private Google Sheet and may contain visitor names /
messages. This repo is public, so committing them would leak personal data.
See "Submissions backup" below for the recommended approach.

> ⚠️ **`CLARITY_API_TOKEN` ≠ `CLARITY_PROJECT_ID`.**
>
> The **project id** (10-char public string) lives in `index_en.html` and powers
> the in-browser Clarity tracking snippet — set up in
> [analytics-clarity.md](analytics-clarity.md). The **API token** (this file) is
> a private, password-grade credential that lives only in GitHub repo secrets
> and lets the weekly backup workflow call Clarity's Data Export API.
>
> Both must be configured for the homepage **Visit Map** block to populate
> (PLAN.md `H1.M4.G6`): without PROJECT_ID, Clarity collects nothing; without
> API_TOKEN, the workflow can't pull what was collected back into
> `data/analytics/clarity-*.json`.

## Master TOC

- [What gets backed up](#what-gets-backed-up)
- [1. Create a Clarity API token](#1-create-a-clarity-api-token)
- [2. Add the token as a GitHub repository secret](#2-add-the-token-as-a-github-repository-secret)
- [3. Enable GitHub Actions write access (one-time)](#3-enable-github-actions-write-access-one-time)
- [4. First run](#4-first-run)
- [Retention / pruning](#retention--pruning)
- [Submissions backup (recommended approach)](#submissions-backup-recommended-approach)
- [Troubleshooting](#troubleshooting)

PLAN.md cross-ref: `H2.M1.G4` (secrets setup), `H2.M3.G1` (backup pipeline), `H2.M3.G2` (submissions backup).

## What gets backed up

Only **aggregate** Clarity metrics — browser breakdown, country breakdown, and
the default "project live insights" counters. Trailing 3-day window per snapshot
gives overlap across weekly runs so you don't lose data if one run fails.

## 1. Create a Clarity API token

1. Sign in to <https://clarity.microsoft.com/> → your project dashboard.
2. **Settings → Data Export → Generate new API token**.
3. Copy the token (it's shown once — treat it like a password).

## 2. Add the token as a GitHub repository secret

1. On GitHub, go to the repo: <https://github.com/jajupmochi/jajupmochi.github.io>.
2. **Settings → Secrets and variables → Actions → New repository secret**.
3. Name: `CLARITY_API_TOKEN`. Value: paste the token.

## 3. Enable GitHub Actions write access (one-time)

The workflow commits snapshots back to the repo, so it needs write permission:

1. Repo **Settings → Actions → General**.
2. Under **Workflow permissions**: choose **Read and write permissions**.
3. Save.

## 4. First run

- **Automatic**: workflow fires at `04:17 UTC every Sunday` per the cron in
  `.github/workflows/backup-analytics.yml`.
- **Manual**: go to the repo → **Actions → backup-analytics → Run workflow**
  (uses `workflow_dispatch`).

After the first successful run you'll see `data/analytics/clarity-<date>.json`
committed by `github-actions[bot]`.

## Retention / pruning

Files accumulate ~52/year × ~10 KB each ≈ 0.5 MB/year. No pruning needed for
many years. If you ever want to prune, delete old files manually or add a
cleanup step to the workflow.

## Submissions backup (recommended approach)

Since this repo is public, the safer pattern for the welcome-form submissions is:

1. **Trust the Google Sheet as authoritative.** It's already a backup.
2. **Sync to a private backup**: either
   - Manual monthly: Sheet menu → **File → Download → CSV**, save to your private
     Dropbox/Drive/local.
   - Automated: create a *private* repo (e.g. `linlin-site-submissions-backup`),
     add a GH Actions workflow there that fetches the published-CSV URL of the
     Sheet, commits weekly. The workflow would be nearly identical to this one
     but use a different secret (`SUBMISSIONS_SHEET_CSV_URL`) and target the
     private repo.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Workflow fails with 401 | Token expired / wrong | Regenerate, update secret |
| Workflow fails with 429 | Hit daily API quota | Rerun next day; cron is weekly, shouldn't hit normally |
| `git push` fails in workflow | Write permission not enabled | Redo step 3 |
| Response shape changed | Clarity updated API | Adjust `scripts/fetch_clarity.py` accordingly |
| No snapshot after first run | Low traffic → empty response | Expected for brand-new projects |
| Snapshot lands but every `information: []` | Clarity hasn't yet aggregated past-3-day traffic with `Browser` / `Country` dimensions (fresh projects can lag up to ~24h after the first visit) | Visit the live site once or twice in a non-incognito session, wait, then re-trigger the workflow manually |
| Visit Map block on the live site stays hidden | Either no snapshot file under `data/analytics/clarity-*.json` (workflow hasn't run yet) **or** the snapshot's `data[*].information[*]` arrays are empty (no Country dimension yet) | First check `data/analytics/` on `master`; if missing, trigger workflow. If present but empty, see row above. |
