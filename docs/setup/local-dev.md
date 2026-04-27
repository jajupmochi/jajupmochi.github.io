# Local development — run the site on your machine

> **Language:** English | [中文](local-dev.zh.md)

The site is pure static HTML/CSS/JS. No build step, no bundler. But opening
`index_en.html` by **double-clicking** (the `file://` protocol) breaks
JSON-based translation loading — this guide explains why and how to run it
correctly.

**Time to set up: ~1 minute.**

## Master TOC

- [Why `file://` doesn't work](#why-file-doesnt-work)
    - [What you actually see when it breaks](#what-you-actually-see-when-it-breaks)
- [Run the site locally](#run-the-site-locally)
    - [Option A: Python (zero install — recommended)](#option-a-python-zero-install--recommended)
    - [Option B: Node-based servers](#option-b-node-based-servers)
    - [Option C: IDE plugins](#option-c-ide-plugins)
- [Switching locales](#switching-locales)
    - [Precedence order](#precedence-order)
    - [Example URLs](#example-urls)
- [Debugging the welcome popup](#debugging-the-welcome-popup)
- [Visit map in local mode](#visit-map-in-local-mode)
- [Amap map in local dev — 127.0.0.1 only](#amap-map-in-local-dev--127001-only)
    - [Register Key + jscode](#register-key--jscode)
    - [Local URL must be 127.0.0.1](#local-url-must-be-127001)
    - [Where to paste the credentials](#where-to-paste-the-credentials)
- [Clarity in local mode](#clarity-in-local-mode)
- [Troubleshooting](#troubleshooting)
- [Related docs](#related-docs)

## Why `file://` doesn't work

The translation loader in `js/main.js:74` uses:

```js
const response = await fetch(`locales/${lang}.json`);
```

`fetch()` over `file://` is blocked by the browser's same-origin / CORS policy
(some browsers refuse outright, others allow the request but fail on JSON
parsing). When the fetch fails, `loadTranslations()` falls back to
`inlineFallback[lang]` — a tiny object inlined at the top of `js/main.js` with
only the most critical ~20 keys, not the full 386. Most `data-i18n` nodes
therefore keep the English default written into the HTML.

### What you actually see when it breaks

- The language selector still works (its click handler runs).
- But switching to ZH/FR/DE only translates a small subset — "Send",
  "Thank you", theme names — and leaves hero / bio / publications / news in
  English.
- DevTools console shows:
  ```
  Could not load translations for zh, using inline fallback: Failed to fetch
  ```

If you see the above, you opened the file via `file://`. Switch to HTTP.

## Run the site locally

Any local HTTP server works. Pick whichever is already installed.

### Option A: Python (zero install — recommended)

```bash
cd /path/to/jajupmochi.github.io
python3 -m http.server 8000
```

Open <http://localhost:8000/index_en.html>. Ctrl+C to stop.

### Option B: Node-based servers

```bash
npx serve . -l 8000       # serves the current directory on port 8000
# or
npx http-server -p 8000
```

### Option C: IDE plugins

- **VS Code**: install **Live Server** → right-click `index_en.html` → *Open
  with Live Server*. Auto-reloads on file save.
- **JetBrains** (IntelliJ / PyCharm / WebStorm): built-in preview — right-click
  `index_en.html` → *Open In* → Browser.

## Switching locales

### Precedence order

When the page loads, the starting language is resolved in this order (first
non-empty wins):

1. **URL parameter** `?lang=en|zh|fr|de` (highest — also what `sitemap.xml`
   uses for SEO `hreflang` alternates).
2. **`localStorage.preferredLang`** (set by a previous visit's language click).
3. **`navigator.language`** — if it starts with `zh` / `fr` / `de`, use that;
   otherwise fall back to `en`.

### Example URLs

```
http://localhost:8000/index_en.html             # → your browser's language
http://localhost:8000/index_en.html?lang=en     # force English
http://localhost:8000/index_en.html?lang=zh     # force Chinese
http://localhost:8000/index_en.html?lang=fr     # force French
http://localhost:8000/index_en.html?lang=de     # force German
```

Bookmark a `?lang=` URL to lock a language for dev testing.

## Debugging the welcome popup

The welcome postcard only shows for first-time visitors. Once you dismiss it,
it's gated by `localStorage.hasVisitedBefore = "true"`.

To force it back:

1. Open the site in Chrome / Firefox / Safari.
2. DevTools → **Application** tab → **Storage → Local Storage** → your origin.
3. Delete the `hasVisitedBefore` key (or click *Clear storage* to wipe all
   keys at once).
4. Reload. Popup reappears.

If the GAS backend URL in `js/main.js:282` is still the `PASTE_...`
placeholder, submissions are discarded with a console notice:

```
[welcome-form] endpoint not configured — submission discarded { name: ..., ... }
```

Filter the DevTools console for `[welcome-form]` to see every submission body
during local testing.

## Visit map in local mode

The *Where visitors come from* choropleth in the About section is driven by
`data/analytics/clarity-YYYY-MM-DD.json` snapshots — produced by the weekly
`backup-analytics.yml` GH Actions workflow. If no snapshot exists locally,
the block stays hidden (`<div id="visitMapBlock" hidden>`).

To see the map locally, copy a snapshot from the deployed site:

```bash
curl -sSL "https://jajupmochi.github.io/data/analytics/" \
  | grep -oE 'clarity-[0-9-]+\.json' | tail -1 \
  | xargs -I{} curl -sSL "https://jajupmochi.github.io/data/analytics/{}" -o "data/analytics/{}"
```

Or run `scripts/fetch_clarity.py` once with your Clarity API token.

## Amap map in local dev — 127.0.0.1 only

The contact map uses Google Maps by default and swaps to **Amap (高德地图)** for
visitors in mainland China (see `applyChinaMap()` in `js/main.js`). Amap's JS
API is the only map provider that renders reliably from inside the GFW, so it
is embedded inline rather than behind a "open map" button.

Two non-obvious constraints apply specifically to local development:

### Register Key + jscode

1. Sign in at <https://console.amap.com/dev/key/app> and create a Web
   (JS API) application. Copy both the **Key** and the **安全密钥（jscode）** —
   since 2021 Amap requires *both* for any JS API call.
2. Keep the credentials in a password manager, not in git. They map 1-to-1 to
   Linlin's Amap account and the site's domain whitelist.

### Local URL must be 127.0.0.1

Amap's domain whitelist does **not** accept the literal string `localhost`. If
you load the site via `http://localhost:8000/…`, every JS API call is rejected
with `INVALID_USER_DOMAIN` and the map renders as a blank grey tile.

Use `127.0.0.1` instead:

```bash
cd /path/to/jajupmochi.github.io
python3 -m http.server 8000
# then open
http://127.0.0.1:8000/index_en.html
```

And in the Amap console domain whitelist for your Key, add:

```
127.0.0.1
127.0.0.1:8000          # include the exact port if the console asks for it
jajupmochi.github.io    # production domain
```

Linlin uses port 8000 by convention (`python3 -m http.server 8000`); if you
switch ports, whitelist that too or the local map goes dark again.

### Where to paste the credentials

The Amap init code reads two constants near the top of `js/main.js`
(search for `AMAP_KEY` / `AMAP_JSCODE`). Paste the values there **only for
local testing** — for production, these should be injected at deploy time so
they don't sit in public git history. If you ever commit a real key by
accident, rotate it in the Amap console immediately.

## Clarity in local mode

Microsoft Clarity is injected at the end of `index_en.html` (around line
1840). On `localhost`, Clarity's tag server accepts pageviews but the
dashboard filters dev traffic by default — don't worry if you don't see
yourself during local testing.

If you're behind a strict firewall, the `https://www.clarity.ms/tag/...`
request may fail in the console. This does **not** break the site; Clarity
is load-deferred and all other features degrade gracefully.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Most text stays English after switching locale | Opened via `file://` | Use `http://localhost:...` instead |
| Welcome popup never reappears | `hasVisitedBefore` sticks in localStorage | DevTools → Application → Local Storage → delete the key |
| Network errors for `www.clarity.ms` | Corporate firewall blocks Clarity | Expected; site still works |
| Visit map section never shows | No `data/analytics/clarity-*.json` locally | Copy a snapshot from the deployed site |
| Amap map grey / `INVALID_USER_DOMAIN` in console | You opened the site as `localhost` or port is not whitelisted | Use `http://127.0.0.1:8000/…` and add `127.0.0.1` (+ port) to the Amap Key whitelist |
| `Address already in use :8000` | Another dev server running | Pick another port: `python3 -m http.server 8001` |
| `locales/*.json` 404 in Network tab | You're serving a parent dir, not the repo root | `cd` into the repo root before starting the server |

## Related docs

- Welcome form backend: [form-backend-google-sheets.md](form-backend-google-sheets.md)
- Clarity setup: [analytics-clarity.md](analytics-clarity.md)
- Security headers (CSP): [security-headers.md](security-headers.md)
- Full deploy checklist: [README.md](README.md)
