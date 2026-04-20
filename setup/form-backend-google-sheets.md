# Welcome-form backend — Google Sheets via Apps Script

The postcard form on `index_en.html` submits to a Google Apps Script (GAS) Web App
that appends one row per submission to a Google Sheet you own. Zero servers, free
tier is effectively unlimited for a personal site, and the data lives in your
Google Drive (exportable / scriptable).

**Time to set up: ~10 minutes.**

## 1. Create the backing Sheet

1. Go to <https://sheets.google.com> → **Blank**.
2. Rename the spreadsheet to something clear, e.g. `linlin-site-submissions`.
3. Keep the default tab — the script creates its own tab called
   `welcome-submissions` on first run.

## 2. Open the bound Apps Script project

1. From the Sheet, menu: **Extensions → Apps Script**.
   (This opens a Script project already bound to the spreadsheet, which is
   what `SpreadsheetApp.getActiveSpreadsheet()` relies on.)
2. Rename the project: top-left title → `welcome-form-backend`.
3. Delete the placeholder `function myFunction() {}` from the editor.
4. Paste the entire contents of `scripts/welcome-form-backend.gs` (this repo)
   into the `Code.gs` file. Save (⌘S / Ctrl+S).

## 3. Deploy as a Web App

1. Top-right: **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Fill in:
   - **Description**: `welcome-form backend v1`
   - **Execute as**: *Me (your-address@gmail.com)*
   - **Who has access**: **Anyone** — required so the public site can POST.
     (The script runs as you but the endpoint itself is public. We only accept
     `doPost` and sanitize all input before appending, so the risk is limited to
     spam rows, which you can filter out in the Sheet.)
4. Click **Deploy**.
5. Google prompts for permission to access your Sheet — click **Authorize access**,
   pick your account, and on the "Google hasn't verified this app" screen click
   **Advanced → Go to welcome-form-backend (unsafe)**. This is your own script;
   the warning is because Google only auto-verifies published add-ons.
6. Copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 4. Paste the URL into the site

Open `index_en.html` and find:

```js
const WELCOME_FORM_ENDPOINT = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
```

Replace the placeholder string with the Web app URL from step 3.6. Commit.

## 5. Smoke-test

1. Load the site locally (`python3 -m http.server 8000` → `/index_en.html`).
2. If you've already dismissed the welcome popup in this browser, open DevTools →
   Application → Local Storage → remove `hasVisitedBefore`, reload.
3. Fill in the postcard, submit. You should see confetti + the "Thank You" card.
4. Open the Google Sheet → tab `welcome-submissions`. A new row should be there
   within a few seconds. Columns:
   `timestamp_iso | name | profession | message | theme | locale | user_agent | referrer`

## Re-deploying after you edit the script

Apps Script treats every edit as a new version. To apply changes to the live URL:

- **Deploy → Manage deployments → pencil icon → Version: New version → Deploy.**

Using "Manage deployments" (not "New deployment") keeps the URL stable, so you
don't need to update `index_en.html`.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Form submits, no row in Sheet | Old deployment cached | Manage deployments → New version |
| Console shows CORS error | Using `application/json` content-type | Code uses `text/plain`; verify you didn't edit it |
| "Authorization required" on submit | Deployment set to "Only me" | Manage deployments → change access to **Anyone** |
| Rows have formulas injected | Input starts with `=` or `+` | Already handled by `sanitize_()` — prefixes `'` |

## Spam mitigation options (if needed later)

The endpoint is public, so bots can spam. Low-effort mitigations:

1. **Cloudflare Turnstile** — invisible CAPTCHA, add before submit. Free.
2. **Honeypot field** — hidden `<input>` that real users don't fill; reject if filled.
3. **Per-IP rate limit in GAS** — stash IP in PropertiesService, reject > N/min.

Skip these until spam actually appears — one-page personal site rarely gets hit.
