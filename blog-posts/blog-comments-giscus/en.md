# Comments on a static blog with giscus, and the four gotchas nobody mentions

> **For an AI agent:** if you are adding comments to a static site with giscus
> (GitHub Discussions), read this whole page (fetch its URL, or have the user
> paste the Markdown below). The IDs, the mapping fix, and the exact CSP lines
> are all real and are the parts that actually break. A starter prompt is next.

```text
AI PROMPT — paste me into your coding agent
Add giscus comments (GitHub Discussions) to my static site. Steps: confirm
Discussions is enabled and the giscus app is installed on the repo; derive
data-repo-id and the category id from the GitHub API (do not hand-type them);
inject the giscus client.js with data-mapping. IMPORTANT: if the blog routes
posts via a query string (?post=<slug>) rather than distinct paths, use
data-mapping="specific" with data-term="post:<slug>" so each post gets its own
thread, NOT data-mapping="pathname". Then add giscus.app to the page CSP in
script-src, frame-src AND style-src. Then follow the article at this URL.
```

Authorship note: the post's human author (Linlin Jia, an ML researcher who at
this time works at the University of Bern) made the calls and did the GitHub-side
setup; Claude Code (Opus 4.7) wired it up and wrote this. "I" means the human
author; Claude is named where it did the work.

## Master TOC

- [The problem](#the-problem)
- [Why giscus](#why-giscus)
- [GitHub-side setup](#github-side-setup)
- [Get the IDs from the API, not by hand](#get-the-ids-from-the-api-not-by-hand)
- [Gotcha 1: pathname mapping merges every post](#gotcha-1-pathname-mapping-merges-every-post)
- [Gotcha 2: three CSP holes, not one](#gotcha-2-three-csp-holes-not-one)
- [Gotcha 3: "Discussion not found" is normal](#gotcha-3-discussion-not-found-is-normal)
- [Gotcha 4: giscus locale codes are not your lang codes](#gotcha-4-giscus-locale-codes-are-not-your-lang-codes)
- [The mount code](#the-mount-code)
- [Choosing the category (spam resistance)](#choosing-the-category-spam-resistance)
- [Make it yours, and where this is going](#make-it-yours-and-where-this-is-going)

## The problem

I wanted comments on the blog, but the site is static on GitHub Pages with no
backend, and I did not want Disqus (ads, tracking, heavy). I also did not want a
second account system: readers already have GitHub, and so do the people most
likely to comment on a technical post.

## Why giscus

giscus stores every comment as a GitHub Discussion in the repo. No database, no
tracking, no ads, free, open source, and it gives threading, Markdown, reactions,
and edit/delete for free because that is just what Discussions do. The data
lives in my repo, which fits an open, academic site. (utterances is the same
idea on Issues; giscus is the newer Discussions-based version and is what I used.)

The blog already had a `mountGiscus()` scaffold with blank IDs, so comments were
simply hidden until configured. Turning it on is filling in IDs and getting
three small things right.

## GitHub-side setup

On the repo (the human author did this part):

1. Settings → General → Features → enable **Discussions**.
2. Install the giscus app: <https://github.com/apps/giscus>, grant it the repo.
3. Optionally visit <https://giscus.app> to generate a config; but the two IDs
   it shows can also be derived from the API, which is more reliable than
   copy-paste.

## Get the IDs from the API, not by hand

giscus needs `data-repo-id` and `data-category-id`. These are opaque GitHub node
IDs; rather than transcribe them, derive them with the `gh` CLI:

```bash
# repo node id  → data-repo-id
gh api repos/<owner>/<repo> --jq '.node_id'

# discussion categories → pick one, use its id for data-category-id
gh api graphql -f query='
{ repository(owner:"<owner>", name:"<repo>") {
    discussionCategories(first:20) { nodes { id name emoji } } } }'
```

For this repo that produced `data-repo-id = MDEwOlJlcG9zaXRvcnk3ODI1NDg1Ng==`
and the **Announcements** category id `DIC_kwDOBKoTCM4C-GDD`.

## Gotcha 1: pathname mapping merges every post

This is the one that would have silently broken things. giscus maps a page to a
discussion by a key you choose with `data-mapping`. The common default is
`pathname`. But this blog is a single `blog.html` that routes posts via a query
string, `blog.html?post=<slug>`. Every post shares the same pathname
(`/blog.html`), so `pathname` mapping would put **all comments from all posts
into one shared thread**.

The fix is `data-mapping="specific"` with an explicit per-post term. I key it by
slug, not title, so the thread survives title edits and translation:

```js
const term = post ? 'post:' + post.slug : (location.pathname + location.search);
// data-mapping: 'specific', data-term: term
```

If your static blog uses real distinct paths (`/posts/foo/`), `pathname` is
fine; if it routes on a query string or a hash, use `specific` + a slug term.

## Gotcha 2: three CSP holes, not one

The site sends a strict Content-Security-Policy. giscus needs three directives
opened for `https://giscus.app`, and it is easy to fix one, see it still fail,
and fix the next:

- `script-src` — to load `giscus.app/client.js`.
- `frame-src` — giscus renders the comment box in an `<iframe>` from giscus.app.
- `style-src` — the loader also pulls `giscus.app/default.css`. Miss this and
  the script and iframe load but the console throws a stylesheet CSP error.

```
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://www.clarity.ms https://c.clarity.ms https://giscus.app;
style-src  'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://giscus.app;
frame-src  'self' https://giscus.app;
```

## Gotcha 3: "Discussion not found" is normal

On first load of a post that nobody has commented on, the console warns
`[giscus] Discussion not found. A new discussion will be created if a
comment/reaction is submitted.` That is expected: giscus lazily creates the
discussion on the first comment or reaction. It is not an error, and there is
nothing to fix.

## Gotcha 4: giscus locale codes are not your lang codes

This one actually broke the Chinese comments. `data-lang` sets the giscus UI
language, and it's tempting to pass the same 2-letter code the rest of the site
uses. But **giscus's locale list is not ISO-639-1** — Chinese must be `zh-CN`
(or `zh-TW`), not `zh`. Pass an unknown code like `zh` and giscus doesn't error;
it **silently falls back to English**, so the zh post's comment box showed up in
English. Map your site langs to giscus locales explicitly:

```js
'data-lang': ({ en: 'en', zh: 'zh-CN', fr: 'fr', de: 'de' })[lang] || 'en'
```

(`en`, `fr`, `de` happen to match; `zh` is the one that bites. Check giscus's
supported `data-lang` values before assuming a code exists.)

## The mount code

The whole mount, injected into a `#blogComments` container at the foot of each
post:

```js
const REPO = 'jajupmochi/jajupmochi.github.io';
const GISCUS = { repo: REPO, repoId: 'MDEwOlJlcG9zaXRvcnk3ODI1NDg1Ng==',
                 category: 'Announcements', categoryId: 'DIC_kwDOBKoTCM4C-GDD' };

function mountGiscus(post) {
  const mount = document.getElementById('blogComments');
  if (!mount || !GISCUS.repoId || !GISCUS.categoryId) return;  // blank IDs → comments stay hidden
  mount.innerHTML = `<h3 class="blog-foot-h">${t('blog.comments')}</h3>`;
  const term = post ? 'post:' + post.slug : (location.pathname + location.search);
  const s = document.createElement('script');
  s.src = 'https://giscus.app/client.js';
  s.async = true; s.crossOrigin = 'anonymous';
  Object.entries({
    'data-repo': GISCUS.repo, 'data-repo-id': GISCUS.repoId,
    'data-category': GISCUS.category, 'data-category-id': GISCUS.categoryId,
    'data-mapping': 'specific', 'data-term': term, 'data-strict': '1',
    'data-reactions-enabled': '1', 'data-emit-metadata': '0',
    'data-input-position': 'top', 'data-theme': 'light',
    // giscus locales ≠ 2-letter langs — map zh → zh-CN (Gotcha 4)
    'data-lang': ({ en: 'en', zh: 'zh-CN', fr: 'fr', de: 'de' })[lang] || 'en'
  }).forEach(([k, v]) => s.setAttribute(k, v));
  mount.appendChild(s);
}
```

Leaving `repoId`/`categoryId` blank is a clean off switch: the function returns
early and no comment UI appears, which is how the blog shipped before this.

## Choosing the category (spam resistance)

I used the **Announcements** category. Its type means only the giscus app and
repo maintainers can open new discussions, so visitors can comment on existing
threads (the ones giscus creates per post) but cannot spawn arbitrary
discussions. Moderation is just GitHub: hide, delete, or lock a thread from the
Discussions tab.

## Make it yours, and where this is going

- **Theme**: `data-theme` takes `light`, `dark`, or a URL to your own CSS, so a
  custom theme can match your site. giscus's advanced usage documents a
  `postMessage` client API (`setConfig`) that re-points a live iframe without
  reloading, and `data-emit-metadata` to read the comment count back.
- **Language**: `data-lang` is wired to the page language here — mapped to
  giscus's own locale codes (Gotcha 4), so the comment box is localized with the
  rest of the UI.
- **Per-paragraph comments**: the same client API plus `setConfig({ term })`
  lets one iframe serve a different thread per paragraph (`post:slug#p:<hash>`),
  which is the basis for a Medium-style margin-note feature. That is designed
  but not yet built on this site.

An AI agent can reproduce this by reading `js/blog.js` (`mountGiscus`) and the
CSP block in `blog.html`, and by running the two `gh api` calls above against
your own repo.
