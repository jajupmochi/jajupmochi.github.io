# Security headers on GitHub Pages

> **Language:** English | [中文](security-headers.zh.md)

GitHub Pages does not let us set arbitrary HTTP response headers — so we use
`<meta http-equiv>` tags where the browser accepts them. This covers most of
the practical XSS / clickjacking / content-sniffing mitigations.

## Master TOC

- [What we set (in `index_en.html` head)](#what-we-set-in-index_enhtml-head)
    - [Content-Security-Policy](#content-security-policy)
    - [`unsafe-inline` — why it stays](#unsafe-inline--why-it-stays)
    - [What doesn't work via meta (limitations)](#what-doesnt-work-via-meta-limitations)
    - [`<meta name="referrer" content="strict-origin-when-cross-origin">`](#meta-namereferrer-contentstrict-origin-when-cross-origin)
    - [`<meta http-equiv="X-Content-Type-Options" content="nosniff">`](#meta-http-equivx-content-type-options-contentnosniff)
- [Verifying](#verifying)
- [If you add a third-party script later](#if-you-add-a-third-party-script-later)

PLAN.md cross-ref: this is relevant whenever you land a new CDN / external script. See tasks under `H1.M2` (SEO schema deps) and `H2.M1.G1/G2` (Sheets / Clarity origins).

## What we set (in `index_en.html` head)

### Content-Security-Policy

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://www.clarity.ms https://c.clarity.ms;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net;
font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net;
img-src 'self' data: https:;
connect-src 'self' https://script.google.com https://script.googleusercontent.com https://*.clarity.ms;
frame-src https://www.google.com;
form-action 'self' https://script.google.com https://script.googleusercontent.com;
base-uri 'self';
object-src 'none';
upgrade-insecure-requests
```

Why each line:

| Directive | Allowed origins | Why |
|---|---|---|
| `default-src 'self'` | same-origin | Conservative fallback for any future fetch type |
| `script-src` | self + inline + jsdelivr + clarity | Inline `<script>` blocks exist throughout; canvas-confetti is on jsdelivr; Clarity tag is on clarity.ms |
| `style-src` | self + inline + googleapis + cdnjs + jsdelivr | Inline `<style>` blocks throughout; Google Fonts; Font Awesome; academicons |
| `font-src` | gstatic + cdnjs + jsdelivr + data: | Google Fonts binaries; Font Awesome webfonts |
| `img-src` | self + data: + any https | Many external thumbnails + data-URI favicons |
| `connect-src` | self + script.google.com + clarity | Welcome-form POST goes to Google Apps Script; Clarity beacons go to `*.clarity.ms` |
| `frame-src` | google.com | Google Maps iframe |
| `form-action` | self + script.google.com | Form posts — explicit allowlist |
| `base-uri 'self'` | — | Prevents `<base>` tag injection attacks |
| `object-src 'none'` | — | No `<object>/<embed>` needed |
| `upgrade-insecure-requests` | — | Auto-upgrades any stray http:// to https:// |

### `unsafe-inline` — why it stays

The HTML has many inline `<script>` blocks (initialization, page router, welcome
form handler, etc.) and inline `style=` attributes. Removing them is a large
refactor (CSS-in-separate-file, external JS modules, nonces) and would not
improve security substantially for a single-author static site. Keep
`unsafe-inline` for now; revisit if the codebase moves to a build step.

### What doesn't work via meta (limitations)

| Header | Why skipped |
|---|---|
| `X-Frame-Options` / `frame-ancestors` | Not enforceable via `<meta>` — requires real HTTP header. Replaced with partial mitigation below. |
| Strict `Referrer-Policy` | We set it via `<meta name="referrer">` — supported by all modern browsers. |
| `Permissions-Policy` | Limited via meta; meaningful use needs HTTP headers. Skipped. |
| HSTS | GH Pages already sends this for the `*.github.io` apex. |

### `<meta name="referrer" content="strict-origin-when-cross-origin">`

Strip path/query from the Referer header when navigating to a different origin
— limits the leak of exact URLs to analytics / external links.

### `<meta http-equiv="X-Content-Type-Options" content="nosniff">`

Prevents browsers from MIME-sniffing responses — blunts an old vector where a
text file could be reinterpreted as a script.

## Verifying

1. Load the site in DevTools → **Console**. Any CSP violation appears as a red
   error beginning with `Refused to ...`.
2. **Network** tab → reload → click on the HTML document → **Headers** tab →
   under "Response Headers" you won't see the meta-set CSP (it's only parsed by
   the client), but DevTools → **Application → Frames → top → CSP summary** does
   reflect the active policy.
3. If a violation appears, either
   - Add the origin to the matching directive in the meta tag, OR
   - Remove the call entirely if it's not meant to be there.
4. Test **all 4 themes** — some themes load different fonts or icons that may
   change the origins needed.

## If you add a third-party script later

Add its origin to **both** `script-src` and `connect-src` (the latter for any
XHR/fetch it does). Test in an incognito window with cache disabled.
