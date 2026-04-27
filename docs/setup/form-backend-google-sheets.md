# Welcome-form backend — Google Sheets via Apps Script

> **Language:** English | [中文](form-backend-google-sheets.zh.md)

The postcard form on `index_en.html` submits to a Google Apps Script (GAS) Web App
that appends one row per submission to a Google Sheet you own. Zero servers, free
tier is effectively unlimited for a personal site, and the data lives in your
Google Drive (exportable / scriptable).

**Time to set up: ~10 minutes.**

## Master TOC

- [1. Create the backing Sheet](#1-create-the-backing-sheet)
- [2. Open the bound Apps Script project](#2-open-the-bound-apps-script-project)
- [3. Deploy as a Web App](#3-deploy-as-a-web-app)
- [4. Paste the URL into the site](#4-paste-the-url-into-the-site)
- [5. Smoke-test](#5-smoke-test)
- [Payload fields](#payload-fields)
- [Re-deploying after you edit the script](#re-deploying-after-you-edit-the-script)
- [Security & privacy](#security--privacy)
    - [Why the endpoint URL is public by design](#why-the-endpoint-url-is-public-by-design)
    - [Public identifiers vs real secrets](#public-identifiers-vs-real-secrets)
    - [Data collected from visitors](#data-collected-from-visitors)
    - [Compliance upgrade path](#compliance-upgrade-path)
- [Troubleshooting](#troubleshooting)
- [Spam mitigation options (if needed later)](#spam-mitigation-options-if-needed-later)

PLAN.md cross-ref: `H2.M1.G1` (manual one-time setup). Spam mitigation: `H2.M2.G4`.

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

Open `js/main.js` (around line 282) and find:

```js
const WELCOME_FORM_ENDPOINT = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
```

Replace the placeholder string with the Web app URL from step 3.6. Commit.

> The constant used to live inline in `index_en.html`; it moved when the
> inline `<script>` block was extracted to `js/main.js` (task `#46`).

## 5. Smoke-test

1. Load the site locally (`python3 -m http.server 8000` → `/index_en.html`).
2. If you've already dismissed the welcome popup in this browser, open DevTools →
   Application → Local Storage → remove `hasVisitedBefore`, reload.
3. Fill in the postcard, submit. You should see confetti + the "Thank You" card.
4. Open the Google Sheet → tab `welcome-submissions`. A new row should be there
   within a few seconds. Columns:
   `timestamp_iso | name | profession | message | theme | locale | user_agent | referrer`

## Payload fields

The browser POSTs a JSON body with these keys (`js/main.js:287-295`):

| Field (JSON) | Source | Sanitized server-side? |
|---|---|---|
| `name` | `#visitorName` input (user-typed) | Yes — `sanitize_()` |
| `profession` | `#visitorProfession` select | Yes |
| `message` | `#visitorMessage` textarea | Yes |
| `theme` | `document.body[data-theme]` | Yes |
| `locale` | `currentLang` (JS i18n state) | Yes |
| `userAgent` | `navigator.userAgent` | Yes |
| `referrer` | `document.referrer` | Yes |

The GAS `doPost` handler adds `timestamp_iso` itself
(`new Date().toISOString()`), then appends one row to the Sheet. Header row
(written on first run) is **snake_case** for human readability:

```
timestamp_iso | name | profession | message | theme | locale | user_agent | referrer
```

The camelCase-to-snake_case mapping is hardcoded in `getOrCreateSheet_()` — if
you add a field, update both the `js/main.js` payload **and** the GAS header
array, or the new column will stay un-labelled.

## Re-deploying after you edit the script

Apps Script treats every edit as a new version. To apply changes to the live URL:

- **Deploy → Manage deployments → pencil icon → Version: New version → Deploy.**

Using "Manage deployments" (not "New deployment") keeps the URL stable, so you
don't need to update `index_en.html`.

## Security & privacy

### Why the endpoint URL is public by design

The Apps Script Web App URL (`WELCOME_FORM_ENDPOINT`) is **not a secret**.
It ships as plaintext in `js/main.js` — and therefore in this repo on
GitHub — because any static-site form must expose its backend URL to the
client, or the browser can't POST to it. Same model as:

- Stripe publishable keys (`pk_live_...`) embedded in client JS.
- `<form action="https://...">` attributes on traditional HTML forms.
- Google Analytics / Microsoft Clarity tracking IDs.

"Who has access: Anyone" on the Apps Script deployment is what makes the
POST reachable from an unauthenticated browser. Locking it down to a Google
account would force every visitor to sign in — unacceptable for a public
site.

There's no way to "hide" the URL on a pure static site. Even if you fetched
it from an env var at build time, the compiled JS has to ship it to the
browser, where DevTools → Network exposes it on the first click. The only
real hiding option is a server-side proxy in front (e.g. Cloudflare Workers
/ Netlify Functions with origin-Referer checks + rate-limits) — overkill
for a personal site.

**What's the real risk?**

- **Spam POSTs to the Sheet.** Anyone can script a loop against the
  endpoint. `sanitize_()` neutralises formula injection (`=…`, `+…`) but
  doesn't stop volume. Watch the Sheet occasionally; filter garbage rows
  by sorting on `timestamp_iso`.
- **GAS quota exhaustion.** Free Apps Script quota is roughly 90 min/day
  of execution time. A sustained flood could hit the limit and drop
  legitimate submissions.
- **What an attacker CAN'T do:** read the Sheet (the script only
  implements `doPost`; `doGet` returns a static hint), delete rows,
  access your Google account, or escalate to other scopes (the script
  requests `spreadsheets.currentonly`, which binds to this one Sheet).

### Public identifiers vs real secrets

Reference table for future integrations:

| Token | Where it lives | Secret? |
|---|---|---|
| `WELCOME_FORM_ENDPOINT` (GAS URL) | `js/main.js` (plaintext, committed) | **No** — public endpoint by design |
| `CLARITY_PROJECT_ID` (e.g. `"wfp3nak9zq"`) | `index_en.html` inline `<script>` | **No** — public tracking ID |
| `CLARITY_API_TOKEN` | GitHub Actions secret, read by `backup-analytics.yml` | **Yes** — rotate if leaked |
| Future server-side credentials | GitHub Secrets or env vars, **never** client JS | **Yes** |

Rule of thumb: if the token ends up in any `<script>` tag the browser
executes, it's public. Treat those as *identifiers*, not *keys*.

### Data collected from visitors

Every welcome-form submission stores the following in your Google Drive:

- **User-typed:** `name`, `profession`, `message`. `message` is free text
  and may include emails / phone numbers if the visitor types them.
- **Browser-derived:** `userAgent`, `referrer`, `locale`, `theme`,
  `timestamp_iso`.

Retention: **indefinite**, unless you manually delete rows from the Sheet.

This triggers privacy-law obligations if your audience includes:

- **EU visitors → GDPR** — lawful basis (usually consent or a
  legitimate-interest notice), privacy policy disclosing purpose, erasure
  requests honoured.
- **California visitors → CCPA / CPRA** — disclosure of collection + opt-out.
- **Mainland China visitors → PIPL** — separate consent for cross-border
  transfer (data sits in Google Drive, outside mainland China).

For a low-traffic personal academic site enforcement risk is near-zero, but
appearing privacy-conscious matters to ML-research recruiters — especially
labs focused on responsible AI. The site already mitigates this:

- A one-line privacy note renders directly under the postcard's Send
  button (`welcome.privacy_note` key, all four locales).
- The footer privacy paragraph (`footer.privacy`) mentions the
  welcome-form data destination alongside Clarity.

### Compliance upgrade path

If you later need tighter compliance (e.g. you're linked from an EU
institution's site), progressive hardening:

1. **Standalone privacy page** (`privacy.html`) with full data inventory +
   controller contact + erasure request procedure. Link from the footer.
2. **Gate submission on an explicit checkbox** ("I agree …"). Prevents
   "accidental" submissions from counting as consent.
3. **Shorten retention.** Scheduled Apps Script trigger that deletes rows
   older than N days.
4. **Drop IP / User-Agent if not needed.** Remove the `userAgent` /
   `referrer` fields from the payload and the Sheet header.
5. **Move to a compliant backend** (e.g. Cloudflare D1 + Workers, Fastmail
   webform) if Google Drive storage conflicts with an institutional policy.

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
