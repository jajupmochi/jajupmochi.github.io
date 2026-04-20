# Analytics — Microsoft Clarity (cookie-consent-free)

Microsoft Clarity (free, unlimited) gives heatmaps, session recordings, rage-click
detection, and basic visitor stats. It is injected via a tiny script in
`index_en.html` (right before `</body>`).

**Goal: run Clarity without showing the visitor a cookie-consent banner.**

Clarity supports a *cookie-less* mode — when enabled, it stores the visitor ID in
`localStorage` only, no HTTP cookies are set, and under most jurisdictions
(including EU/CH ePrivacy rules) a cookie banner is then not legally required.
You still need a plain privacy-policy mention, but no click-through gate.

## 1. Create the Clarity project (~2 min)

1. Go to <https://clarity.microsoft.com/> → sign in with a Microsoft account.
2. **+ New project**.
   - **Name**: `jajupmochi-github-io`
   - **Website URL**: `https://jajupmochi.github.io`
   - **Site category**: Personal / Portfolio
3. On the project landing page, copy the **Project ID** — it's a 10-char string
   shown at the top (also visible in Settings → Setup).

## 2. Paste the project id into the site

Open `index_en.html`. Near the bottom find:

```js
})(window, document, "clarity", "script", "PASTE_CLARITY_PROJECT_ID");
```

Replace `PASTE_CLARITY_PROJECT_ID` with the id from step 1.3. Commit.

## 3. Enable cookie-less / consent-not-required mode

In the Clarity dashboard for this project:

1. **Settings → Setup → Cookies**.
2. Toggle **"Remove Clarity cookies"** (label may read "Use localStorage only"
   or "Cookie-less mode" depending on dashboard version) → **ON**.
3. Save.

That's the only switch. Once enabled:

- No `_clck` / `_clsk` cookies are written.
- The visitor-id is stored in `localStorage` under the `clarity.microsoft.com` domain.
- A browser reset/clear will count as a new visitor (fine for a personal site).

## 4. Privacy-policy mention (one-time)

Even without a cookie banner, GDPR/ePrivacy expect a short disclosure. Add a line
like this to the site's privacy footer / about page:

> "This site uses Microsoft Clarity (cookie-less mode) for anonymous heatmaps
> and session replay. No personal data is stored; recordings are masked by
> default. See Microsoft's privacy statement at
> <https://privacy.microsoft.com/en-us/privacystatement>."

## 5. Masking — sanity check

Clarity masks form inputs and any element with `data-clarity-mask="true"` by
default. Double-check that sensitive fields (if any) are masked in Settings →
Privacy → Masking. Our postcard form inputs are plain text so are already safe,
but for peace of mind you can add `data-clarity-mask="true"` to the whole modal.

## 6. Verify

1. Deploy the site (push to `master` — GitHub Pages auto-deploys).
2. Visit the live URL in an incognito window.
3. Clarity dashboard → **Live** tab: your session should appear within 1–2 minutes.
4. Browser DevTools → **Application → Cookies**: no `_clck` / `_clsk` entries
   under `.clarity.ms` if cookie-less mode took effect.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Nothing in dashboard after 5 min | Project id still placeholder | Redo step 2 |
| Cookies still appear in DevTools | Cookie-less toggle not saved | Redo step 3, hard refresh |
| Heatmaps empty on launch | Needs ~10 visits for heatmap samples | Wait — expected |
| CSP blocks Clarity | Strict CSP in place | Allow `script-src https://www.clarity.ms 'self' 'unsafe-inline'` and `connect-src https://*.clarity.ms` (see setup/security-headers.md) |
