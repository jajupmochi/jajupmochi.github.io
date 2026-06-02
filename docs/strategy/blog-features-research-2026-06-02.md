# Blog / posting-tool features: what they are and how to add them to this static, no-backend site

> Research note for `jajupmochi.github.io` (GitHub Pages, pure static HTML/CSS/JS, no
> server). Surveys the features common in blog / posting tools (view count, likes,
> bookmarks, share, RSS, related posts, …) and, for each, the realistic ways to build
> it here, with tradeoffs and a recommendation. Dated 2026-06-02.

## Master TOC

- [TL;DR](#tldr)
- [What the site already has](#what-the-site-already-has)
- [The one hard constraint: no backend](#the-one-hard-constraint-no-backend)
- [Feature by feature](#feature-by-feature)
    - [1. View / read count](#1-view--read-count)
    - [2. Likes / reactions](#2-likes--reactions)
    - [3. Bookmark / 收藏](#3-bookmark--收藏)
    - [4. Share to other platforms](#4-share-to-other-platforms)
    - [5. Comment / reaction count on the list](#5-comment--reaction-count-on-the-list)
    - [6. RSS / subscribe / follow](#6-rss--subscribe--follow)
    - [7. Related / recommended posts](#7-related--recommended-posts)
    - [8. Smaller touches](#8-smaller-touches)
- [Recommended roadmap](#recommended-roadmap)
- [Sources](#sources)

## TL;DR

- The biggest lever for **robustness in China** and zero new dependencies is to prefer
  **fully client-side** features (bookmark via `localStorage`, related posts from the
  registry, share via `navigator.share` + intent URLs). These can't be slow or blocked
  because nothing third-party runs at view time.
- **View count** and **public like count** are the only two that genuinely need an
  external service (there is no honest no-backend way to *persist* a global counter).
  Best fit: **GoatCounter** (hosted, free, one script, works on `github.io`).
- **Reactions already exist** via giscus (GitHub Discussions). The cheap win is to
  *surface* them (a 👍/❤️ count) rather than add a second like system.
- **Share to Weibo / WeChat / Zhihu** is high-value for the zh audience and is pure
  client-side (intent URLs + a WeChat QR). Do this early.
- Recommendation order is in [Recommended roadmap](#recommended-roadmap).

## What the site already has

So we don't rebuild what exists:

- **Comments + emoji reactions** — giscus (GitHub Discussions). Reactions are already on.
- **Version history** — per-post edit log + view-old-version + in-page diff.
- **Analytics** — Microsoft Clarity is wired in, but it is *private* (dashboards for the
  owner), not a *public* per-post view count.
- **Reading affordances** — multi-level TOC, reading-progress bar, reading-time
  (`readingMinutes` in the registry), reading-size toggle, search, tag filter, sort,
  three list view modes, four languages, foldable Cite + Edit-history modules.

So the genuinely *missing* candidates are: public view count, a surfaced like, bookmark,
share buttons, RSS, related posts, and per-post counts on the list.

## The one hard constraint: no backend

GitHub Pages serves static files only. There is **no server to store state**. That
splits every feature into two kinds:

- **Client-only (no shared state needed)** — share, bookmark (per-device), related
  posts, RSS (built at deploy time). These are robust, private, and free. Prefer these.
- **Needs shared/global state** — view count, public like count, comment counts. These
  *must* call an external service (a hosted counter, a serverless function, or the
  GitHub API). Pick one with care for privacy and China-accessibility.

A note on **China-accessibility**: this site has a Chinese audience, and we just saw
giscus.app throw a backend error ("Valkey server"). Any third-party that runs at *view
time* (a counter script, a comment iframe) can be slow or blocked from China; a feature
that only runs *at build time* (RSS) or *in the browser with no network* (bookmark) can't.
I have **not verified** GoatCounter's reachability from China — treat that as an open
question before relying on it for the zh audience.

## Feature by feature

### 1. View / read count

What it is: "🔥 1,234 reads" on a post (and maybe on the list).

Options:

| Option | How | Privacy | China | Effort |
|---|---|---|---|---|
| **GoatCounter** (recommended) | One `<script>`; read the count back with its `count.js` / JSON endpoint and render "N views". Free hosted, no cookies, works on `github.io`. | Excellent (no PII, no cookies) | Unverified | Low |
| Cloudflare Web Analytics | Free, but it expects you to **own the domain**; `github.io` isn't ownable, so counts/embedding don't fit. | Excellent | Unverified | N/A here |
| CloudCounter / self-host GoatCounter / umami | Same data model on your own Cloudflare/VPS. More control, but now you run infra. | Excellent | You choose host | Medium-High |
| Busuanzi (不蒜子) | The classic zh static-blog counter. **Per-page counts are now broken** by browser anti-tracking (cross-origin); only site-wide total is reliable. Self-hosted `busuanzi-docker` fixes it but needs a server. | OK | Designed for zh, but per-page broken | Low (but broken) / High (self-host) |
| Google Analytics + Cloudflare Worker | A worker reads the GA Data API and returns a number to display. Works, but pulls in GA (heavier, privacy). | Weaker (GA) | Unverified | Medium |

Recommendation: **GoatCounter**, display the number client-side. It's the cleanest
no-infra option. Confirm China reachability first; if it's blocked, self-host a tiny
counter (CloudCounter on Cloudflare) or accept site-wide-only (busuanzi total).

### 2. Likes / reactions

What it is: a 👍 / ❤️ a reader can tap, with a count.

Options:

- **Surface the giscus reactions we already have (recommended).** giscus supports
  `data-reactions-enabled=1` (on) and `data-emit-metadata=1`, after which the iframe
  `postMessage`s a payload including `reactionCount`. Read it and show a "❤️ N" near the
  title; clicking scrolls to the giscus reaction bar. Zero new services.
- **A dedicated serverless like** (e.g., Lyket, or a small Cloudflare Worker + KV). A
  true one-tap like with its own counter, independent of comments. Adds a dependency.
- **No-auth "clap" via a counter service** — some counters can double as a like by
  incrementing on click. Hacky.

Recommendation: **surface giscus reactions** (no new backend). Only add a separate like
service if you want one-tap-without-GitHub-login.

### 3. Bookmark / 收藏

What it is: a reader saves a post to read later; a "Saved" view lists them.

Option (recommended, pure client-side): a "🔖 Save" button that toggles the slug in
`localStorage`; a "Saved posts" filter/section reads the list and renders cards. **No
backend, no privacy issue, works offline, robust in China.** Limitation: per-device (no
cross-device sync) — acceptable for a personal blog. Cross-device sync would need an
account system (out of scope).

Effort: Low. Fits the existing registry-driven card render.

### 4. Share to other platforms

What it is: share a post to X/Twitter, LinkedIn, Weibo, WeChat, Zhihu, email, or the OS
share sheet.

Option (recommended, pure client-side):

- **Primary: Web Share API** — `navigator.share({title, url})` opens the OS native share
  sheet on mobile (and some desktops). Requires HTTPS (we have it) and a user gesture.
- **Fallback / desktop + Chinese platforms: intent URLs** — open a share dialog per
  platform:
    - X/Twitter: `https://twitter.com/intent/tweet?text=…&url=…`
    - LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=…`
    - Weibo: `https://service.weibo.com/share/share.php?url=…&title=…`
    - Email: `mailto:?subject=…&body=…`
    - WeChat / Zhihu: WeChat has no web-share URL → show a **QR code** (a tiny client-side
      QR lib) that opens the post in the WeChat app; Zhihu sharing is usually
      copy-link + paste. A library like `harttle/social-share` bundles wechat/weibo/
      linkedin/twitter if you don't want to hand-roll.
- Always include a **copy-link** button as the universal fallback.

This is high-value for the zh audience and has **no view-time third-party dependency**
(the intent URLs only open when clicked). Effort: Low-Medium.

### 5. Comment / reaction count on the list

What it is: "💬 3 · ❤️ 5" on each blog-list card.

Options:

- **GitHub GraphQL at build time (recommended)** — a GitHub Action (we already run one
  for the registry) queries each post's Discussion for `totalCommentCount` +
  `reactionCount` and writes them into `registry.json`; the list renders them statically.
  No view-time calls, robust in China, but counts are as fresh as the last build.
- **Client-side via the giscus/GitHub API or a CORS proxy** (e.g., allorigins) — live
  counts, but a view-time third-party call (slower, China risk, rate limits).

Recommendation: **build-time into the registry** (matches the existing CI pattern).

### 6. RSS / subscribe / follow

What it is: an RSS/Atom feed so readers can follow in a reader; "subscribe" affordances.

Options:

- **RSS/Atom feed (recommended)** — we're not Jekyll, so no `jekyll-feed`. Instead a
  GitHub Action script generates `feed.xml` (Atom) from `registry.json` on each content
  push (same pattern as the registry updater). Add `<link rel="alternate"
  type="application/atom+xml">` in `<head>`. Pure build-time, robust, free.
- **Email subscribe** — needs a third-party (Buttondown, Substack, Mailchimp). Real
  backend/service + GDPR; heavier. Defer unless you want a mailing list.
- **Follow** — RSS + "Watch the repo on GitHub" covers the dev audience for free.

Recommendation: **generate an Atom feed in CI**. Skip email subscribe for now.

### 7. Related / recommended posts

What it is: "You might also like" at the foot of a post.

Option (recommended, pure client-side): score other posts by **tag overlap** (and
recency) from `registry.json`, show the top 3 as cards. No backend, instant, robust.
Effort: Low. (We already have tags + the card renderer.)

### 8. Smaller touches

- **Back-to-top button**, **estimated reading-time on the list** (already have the data),
  **"updated" relative time** — all trivial client-side polish.
- **Text-highlight / margin notes (Medium-style)** — giscus's `setConfig({term})` can
  serve a per-paragraph thread (`post:slug#p:hash`); the giscus post already notes this
  as designed-not-built. High effort; defer.
- **Series / collections** — group posts by a `series` field in the registry; client-side.

## Recommended roadmap

Ordered by value ÷ effort, and biased toward China-robust (client-only) wins first:

1. **Share buttons** (Web Share + Weibo/X/LinkedIn/email/copy + WeChat QR) — client-only,
   high value for the zh audience, low effort.
2. **Related posts** (tag overlap from the registry) — client-only, low effort.
3. **Bookmark / 收藏** (`localStorage` + a Saved view) — client-only, low effort.
4. **Surface giscus reactions as a like** (read `reactionCount` via emit-metadata) — no
   new service, low-medium effort.
5. **List comment/reaction counts** (GitHub GraphQL → registry in CI) — matches existing
   CI, medium effort.
6. **RSS/Atom feed** (CI-generated from the registry) — build-time, medium effort.
7. **View count** (GoatCounter) — only external dependency; **verify China reachability
   first**; medium effort.
8. *Defer:* email subscribe, per-paragraph margin notes.

Items 1–3 and 7 are independent and could be picked à la carte. Tell me which to build
and I'll implement them in the parchment style.

## Sources

- GoatCounter — open-source, privacy-friendly analytics: <https://www.goatcounter.com/> · <https://github.com/arp242/goatcounter>
- Why GoatCounter for a GitHub Pages site (DEV): <https://dev.to/iam_pbk/why-i-chose-goatcounter-for-my-github-pages-site-7k8>
- CloudCounter (GoatCounter port on Cloudflare Pages + D1): <https://github.com/philippdubach/cloudcounter>
- Busuanzi self-host fix (per-page counts broken by anti-tracking): <https://github.com/omltcat/busuanzi-docker>
- Page views via Google Analytics + Cloudflare Worker: <https://toknow.ai/posts/display-google-analytics-views-using-cloudflare-worker/index.html>
- Web Share API (spec): <https://w3c.github.io/web-share/> · (MDN): <https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API>
- Progressive share button with intent-URL fallbacks: <https://blog.logrocket.com/how-to-improve-social-engagement-with-the-web-share-api/>
- `harttle/social-share` (wechat/weibo/linkedin/twitter widget): <https://github.com/harttle/social-share>
- Preloading giscus comment/reaction counts on a static list: <https://stuartlau.github.io/blogs/tech/2026/2026-01-21-preload-giscus-stats-on-static-site>
- GitHub Discussions for comments + reactions (Astro): <https://www.thomasledoux.be/blog/hosting-blog-comments-reactions-github-discussions>
