# Analytics backup — automated to GitHub

A weekly GitHub Actions cron pulls Microsoft Clarity aggregate data and commits
snapshots to `data/analytics/clarity-YYYY-MM-DD.json` in this repo. This
protects against Clarity ever going away (unlikely) or changing its free tier
without notice, and gives you version-controlled history you can diff.

**This backup intentionally does NOT include welcome-form submissions.**
Those rows live in a private Google Sheet and may contain visitor names /
messages. This repo is public, so committing them would leak personal data.
See "Submissions backup" below for the recommended approach.

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
