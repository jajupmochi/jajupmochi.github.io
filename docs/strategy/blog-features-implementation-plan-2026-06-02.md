# Blog features — implementation plan (the 4 picked) + more feature research

> Companion to `blog-features-research-2026-06-02.md`. Linlin picked Share, Related,
> Bookmark, and a Like — but wants the Like to be a **dedicated button** (giscus may
> back it). This is the concrete build plan for each, then a survey of *other* common
> features to consider. Nothing built yet. Dated 2026-06-02.

## Master TOC

- [Build plan: the 4 picked](#build-plan-the-4-picked)
    - [A. Share](#a-share)
    - [B. Related posts](#b-related-posts)
    - [C. Bookmark / 收藏](#c-bookmark--收藏)
    - [D. Like — dedicated button](#d-like--dedicated-button)
- [Where they live + shared module](#where-they-live--shared-module)
- [More common features to consider](#more-common-features-to-consider)
- [Sources](#sources)

## Build plan: the 4 picked

All four are **client-only** except the Like's count store. New file `js/blog-actions.js`
(loaded by `blog.html`), styles in `css/blog.css`, strings added to the 4-locale i18n
block already in `js/blog.js`. A shared **action bar** under the title hosts them.

### A. Share

- **Primary:** `navigator.share({ title, text, url })` on a "Share" button — opens the OS
  share sheet on mobile/supported desktops (HTTPS + click gesture; we have both).
- **Fallback menu** (when `navigator.share` is absent, i.e. most desktops): a small popover
  with intent links, opened with `window.open(..., 'share', 'width=600,height=520')`:
    - Weibo `https://service.weibo.com/share/share.php?url=…&title=…`
    - X `https://twitter.com/intent/tweet?text=…&url=…`
    - LinkedIn `https://www.linkedin.com/sharing/share-offsite/?url=…`
    - Email `mailto:?subject=…&body=…`
    - **WeChat** → a **QR code** of the post URL (render with a tiny client-side lib, e.g.
      `qrcode` ~4KB, or a `<canvas>` generator) so the reader scans it in the app.
    - **Copy link** (always) via `navigator.clipboard.writeText`.
- All URLs built from `location.href` + the post title; no third-party at view time.
- Effort: ~half a day. Risk: none (client-only).

### B. Related posts

- At the post foot, score every *other* post in `window.PROJECTS`-equivalent blog registry
  by **shared-tag count**, tie-break by recency; take the top 3.
- Render the existing blog-card markup (cover + title + tags) so it matches the list.
- Pure client-side from `blog-posts/registry.json`; instant; China-robust.
- Effort: ~2-3 h.

### C. Bookmark / 收藏

- A "🔖 Save" toggle in the action bar writes the slug to `localStorage` (`blog:saved`,
  a JSON array). Toggling updates the icon + an aria-pressed state.
- A **"Saved" filter** on the blog list (a new pill next to the tag filters) shows only
  saved posts, read from `localStorage`. Empty state: "No saved posts yet."
- Per-device (no account/sync) — acceptable for a personal blog; fully offline + private.
- Effort: ~3 h.

### D. Like — dedicated button

The honest constraint: a "like" needs a **shared counter**, and GitHub reactions (giscus)
need the user **logged in + clicking inside the giscus iframe**. So there are two builds;
pick one:

- **D1 — giscus-backed (no new infra, recommended to start).** A prominent `♥ Like`
  button in the action bar that:
    1. shows the **👍/❤️ count** read from giscus via `data-emit-metadata=1` (giscus
       `postMessage`s `{ discussion: { reactionCount }}`); and
    2. on click, smooth-scrolls to + pulses the giscus reaction bar, where the logged-in
       reader taps the reaction (that's where GitHub records it).
  Pro: zero new services, real counts. Con: the actual "like" is a 2-step (login + iframe
  click), not a true 1-click; counts refresh when giscus loads.
- **D2 — true one-click anonymous like (needs a tiny serverless).** A Cloudflare Worker
  + KV (free tier) stores `slug → count`; the button does one `fetch` to increment and
  one to read. One tap, no login. Con: introduces one piece of (free) infra you host, and
  a view-time call (cache it; China-reachability of `*.workers.dev` is unverified).

Recommendation: ship **D1** now (matches "可以用 giscus 后台"); add **D2** later if you
want true one-click. Either way the button is the same dedicated UI.

## Where they live + shared module

- A new **`.blog-actions` bar** directly under the post title: `♥ Like · 🔖 Save · ⤴ Share`
  (+ the reading-time/updated meta that's already there). Mirrors the parchment button
  style; icons from the existing Font Awesome.
- One new `js/blog-actions.js` wires all four; `buildPostFoot` already runs per post, so it
  hooks in there. Related posts render at the foot; Share/Save/Like at the top bar.
- i18n: ~8 new keys × 4 locales (share, copy, copied, save, saved, like, liked, related).

## More common features to consider

Beyond the four, common in Medium / Zhihu / dev.to / Ghost / 公众号 and *not yet* on the
site (roughly high→low value for this blog):

1. **Per-post share-preview image (OG / Twitter card).** Without a per-post `og:image`,
   shares look bare. Generate a parchment card (title + author) per post at build time in
   CI, or one nice default. Pairs directly with Share. Medium-high value.
2. **In-post image lightbox / zoom.** Click a figure to zoom (we lazy-load already, but
   no zoom). The gallery already has a lightbox to reuse. Medium.
3. **Back-to-top button** on long posts. Trivial.
4. **Footnotes + callout/admonition blocks** (note/warning/tip) in the Markdown pipeline.
   Good for technical posts. Medium.
5. **Post series / collections** (a `series` field; "Part 2 of N" + prev/next). Medium.
6. **Donate / 赞赏** (Ko-fi / Buy-me-a-coffee / a WeChat 赞赏码 image). Low effort, optional.
7. **Listen / text-to-speech** (Web Speech API `speechSynthesis`, client-only). Novelty.
8. **Webmentions** (IndieWeb: show likes/replies from Mastodon/elsewhere via webmention.io).
   Niche; dev audience.
9. **"Updated N days ago" relative time**, **word count**, **estimated reading time on the
   list** (we have the data). Trivial polish.
10. **Print / save-as-PDF stylesheet** (`@media print`) so a post prints cleanly. Low.

Suggested next pick after the four: **#1 OG share image** (multiplies the Share feature) and
**#2 image lightbox**.

## Sources

- Web Share API — <https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API> · <https://w3c.github.io/web-share/>
- Progressive share with intent-URL fallbacks — <https://blog.logrocket.com/how-to-improve-social-engagement-with-the-web-share-api/>
- `harttle/social-share` (wechat/weibo/linkedin/twitter) — <https://github.com/harttle/social-share>
- Preloading giscus comment/reaction counts (emit-metadata) — <https://stuartlau.github.io/blogs/tech/2026/2026-01-21-preload-giscus-stats-on-static-site>
- GitHub Discussions reactions on a static site — <https://www.thomasledoux.be/blog/hosting-blog-comments-reactions-github-discussions>
