# Blog version history — design & research (2026-05-29)

> Research + design for a Zhihu/Wikipedia-style edit-history feature on the
> static, git-backed blog. Triggered by the `ubuntu-fcitx5-pinyin` post now
> having two versions (commits `ab8c9f7` → `cdebc55`).

## Master TOC

- [1. Context & key insight](#1-context--key-insight)
- [2. Prior art (what to borrow)](#2-prior-art-what-to-borrow)
- [3. Feature menu (tiered)](#3-feature-menu-tiered)
- [4. Constraints & mitigations](#4-constraints--mitigations)
- [5. Recommended architecture](#5-recommended-architecture)
- [6. Implementation plan](#6-implementation-plan)
- [7. MVP → roadmap](#7-mvp--roadmap)
- [8. Decisions for Linlin](#8-decisions-for-linlin)

## 1. Context & key insight

- The blog is a **pure static site on GitHub Pages**. No backend, no DB. Posts
  are markdown files in git: `blog-posts/<slug>/{en,zh,...}.md`, rendered
  client-side by `js/blog.js` + `marked`.
- **The version store already exists: it's git.** Every edit to a post is a
  commit touching its `.md`. The `ubuntu-fcitx5-pinyin` post has two commits
  today; `git log --follow -- blog-posts/<slug>/<lang>.md` is its full history.
- So "version history" needs **no new storage** — only a way to *surface* git
  history (a list of revisions) and to *view* old content / diffs.
- Constraint that shapes everything: **blog.html CSP `connect-src` is
  `'self' https://*.clarity.ms`** — `api.github.com` is not allowed today, so
  any in-page GitHub-API fetch needs a CSP line added. Plain *links* to GitHub
  need nothing.

## 2. Prior art (what to borrow)

- **Wikipedia page history**: a revision list — each row = timestamp ·
  contributor · resulting size · net byte delta · edit summary. Pick any two
  revisions (radio buttons) → "Compare selected revisions" → a diff view
  (old left / new right, unchanged text greyed). Plus: revert, contributors,
  permalinks to a revision.
- **Zhihu「编辑记录」**: a simpler timeline — version list with who/when, inline
  added/removed highlighting, click a version to read it.
- **GitHub**: per-file "History" button → commits list; per-commit and
  `compare/A...B` diff views (syntax-highlighted, side-by-side). This is free
  and already hosts our data.
- Common primitives worth having: (a) **"last updated" stamp**, (b) a
  **revision list**, (c) **view an old version**, (d) **diff two versions**,
  (e) **contributors**, (f) **per-revision permalink**.

## 3. Feature menu (tiered)

| Tier | Feature | How | Cost | API/CSP? |
|---|---|---|---|---|
| **T0** | "Last updated · edited N times · full history ↗" stamp linking to GitHub | static link to `…/commits/main/blog-posts/<slug>/<lang>.md` | trivial | none |
| **T1** | In-page **编辑记录 / Edit history** panel (date · summary · author per revision) | curated `revisions[]` in `registry.json` **(recommended)** or GitHub commits API | low | none (registry) / yes (API) |
| **T2** | Each revision deep-links to its **GitHub diff/commit** | `…/commit/<sha>` per revision | trivial | none |
| **T3** | **View an old version in-page** (render the md at a SHA) | GitHub raw/contents API → existing `marked` pipeline | medium | API + CSP |
| **T4** | **In-page diff** (Zhihu/Wiki-style, side-by-side) | `jsdiff` → `diff2html` (reuses the already-loaded highlight.js) | medium | API + CSP |
| **T4+** | Contributors (**human × Claude**), revert-via-PR link, per-revision permalink (`?post=X&rev=<sha>`), edits RSS | parse author + `Co-Authored-By`; GitHub edit/PR URLs | low–med | mixed |

## 4. Constraints & mitigations

- **CSP** — for any in-page API (T3/T4) add to blog.html `connect-src`:
  `https://api.github.com https://raw.githubusercontent.com`. T0–T2 need nothing.
- **GitHub API rate limit** — 60 req/hr per IP unauthenticated. Mitigate:
  fetch **only when the History panel is opened** (lazy), **cache in
  localStorage** with a TTL (commit lists change rarely), and use **ETag /
  `If-None-Match`** (a 304 doesn't count against the limit). A registry-driven
  list (T1) avoids the API entirely for the common case.
- **Edit-summary quality** — repo commits are conventional-commit, repo-wide
  (e.g. `docs(blog): link published repo…`), not reader-facing per-post notes.
  Best result: a **curated `revisions[]`** in `registry.json` with bilingual
  one-line summaries (few edits per post → hand-curation is cheap and reads far
  better than commit subjects, and it's i18n-native). Fall back to commit
  subjects only if uncurated.
- **i18n** — history is per-`.md` (per language). Show the history of the
  currently-viewed language; revision summaries live in the registry per locale.
- **Authorship** — the blog already distinguishes human vs Claude. Parse the
  commit author + `Co-Authored-By: …Claude…` (or store `author` in the
  revision) to render "林林 × Claude" / "Linlin" per revision — on-brand.
- **`updated` field** — `js/blog.js` already references an `updated` concept;
  wire the post's "last updated" to the newest revision date.

## 5. Recommended architecture

**Registry-driven version log + GitHub for the heavy lifting.** Static,
bilingual, no rate limit, no CSP change for the core:

1. Add an optional **`revisions`** array to each post in `registry.json`:
   ```json
   "revisions": [
     { "date": "2026-05-29", "sha": "cdebc55",
       "summary": { "zh": "接入已发布的代码仓库，修复资源/zip 链接",
                    "en": "Link the published repo; fix resource/zip links" },
       "by": "Linlin × Claude" },
     { "date": "2026-05-27", "sha": "ab8c9f7",
       "summary": { "zh": "首次发布", "en": "First published" },
       "by": "Linlin × Claude" }
   ]
   ```
2. `js/blog.js` renders a collapsible **「编辑记录 / Edit history」** panel under
   the post: newest-first list of `date · summary(localized) · by`, with a
   "diff ↗" link per row → `https://github.com/jajupmochi/jajupmochi.github.io/commit/<sha>`
   and a "full history ↗" link → the file's commits page. A "**Last updated
   <date> · edited N×**" stamp goes near the post title.
3. **Optional later (T3/T4)**: an in-page "view this version" / side-by-side
   diff using the GitHub raw + commits API (lazy, cached) + `diff2html`. Gate
   behind the CSP addition.

Why this wins for a personal static blog: zero backend, bilingual polished
summaries, no API/rate-limit/CSP cost for the everyday view, and deep dives
reuse GitHub's excellent diff UI. The registry stays the single source of truth
(consistent with how posts are already described).

## 6. Implementation plan

- **Data**: add `revisions[]` to `blog-posts/registry.json` (start with the
  fcitx5 post's two). Convention: prepend a row on every post edit (cheap; can
  be semi-automated from `git log --follow`).
- **`js/blog.js`**: after `renderPost`, build the history panel from
  `post.revisions` (localized `summary`), render the "last updated · N×" stamp.
  ~40–60 lines, no new deps.
- **CSS**: a small `.blog-history` block in the parchment style (matches the
  notebook aesthetic — e.g. a margin-note / ledger look).
- **T3/T4 (optional)**: `connect-src += api.github.com raw.githubusercontent.com`;
  add `jsdiff` + `diff2html` (CDN, like the other blog libs); fetch raw md at a
  SHA → `marked` render or `jsdiff`→`diff2html` side-by-side (highlight.js is
  already loaded). localStorage cache keyed by `<path>@<sha>`.
- **Author mapping**: store `by` in the revision (simplest) or derive from the
  GitHub commit author + Co-Authored-By.

## 7. MVP → roadmap

- **MVP (ship first)**: T0 stamp + T1 registry `revisions[]` panel + T2 per-row
  GitHub diff link. Fully static, bilingual, ~1 file of JS + a little CSS + a
  registry field. Immediately gives the "this post has been edited, here's
  what changed and when, see the diff" experience.
- **v2**: T3 in-page old-version view + T4 side-by-side diff (diff2html) behind
  the CSP change; per-revision permalink `?post=X&rev=<sha>`.
- **v3**: contributors line, edits RSS/Atom, "suggest an edit → PR" link.

## 8. Decisions for Linlin

1. **Scope**: ship the static MVP (T0–T2, registry-driven) now, or go straight
   to in-page diffs (T3/T4, needs the CSP change + GitHub API)?
2. **Edit summaries**: hand-curated bilingual notes in the registry
   (recommended, prettier) vs auto from commit subjects (zero upkeep)?
3. **Authorship label**: show "林林 × Claude" per revision (on-brand) or just a
   date?
