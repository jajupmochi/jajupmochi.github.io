# Per-paragraph annotation — design (2026-05-29)

> Design for Medium / Hypothesis / Zhihu-划线-style **per-paragraph (and
> select-to-comment) annotation** on the static blog, layered on the giscus
> comments that just went live. Built around giscus
> [ADVANCED-USAGE](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md).
> **Status: awaiting Linlin's approval before implementation.**

## Master TOC

- [1. Goal & the two annotation kinds](#1-goal--the-two-annotation-kinds)
- [2. What giscus advanced usage gives us](#2-what-giscus-advanced-usage-gives-us)
- [3. Anchoring: how a note sticks to a paragraph](#3-anchoring-how-a-note-sticks-to-a-paragraph)
- [4. Architecture (tiered A→D)](#4-architecture-tiered-ad)
- [5. The reader flow (margin pins + drawer)](#5-the-reader-flow-margin-pins--drawer)
- [6. Visual design (parchment marginalia)](#6-visual-design-parchment-marginalia)
- [7. Constraints & mitigations](#7-constraints--mitigations)
- [8. Implementation plan + file map](#8-implementation-plan--file-map)
- [9. MVP → roadmap](#9-mvp--roadmap)
- [10. Decisions for Linlin](#10-decisions-for-linlin)

## 1. Goal & the two annotation kinds

Linlin's vision (from the blog brainstorm + the cleared session): *"对某句话评论，
像手写稿批注那样显示"* — comment on a specific sentence/paragraph, shown like
handwritten marginalia. Two distinct kinds, worth keeping separate:

- **(A) Author side-notes** — *Linlin's own* margin annotations on her text
  (Tufte-style sidenotes / 批注): asides, corrections, "edited 2026-05 — this
  changed". **Static, no backend, authored in the source.** Instant, always
  visible (or hover-revealed) in the margin.
- **(B) Reader annotations** — *visitors* commenting on a specific paragraph or
  a selected phrase, threaded — the per-paragraph extension of the post-level
  giscus thread. Needs a store → **giscus / GitHub Discussions** (no new backend).

Both render as **marginalia** in the parchment aesthetic; they differ in source
(author vs reader) and storage (static vs giscus).

## 2. What giscus advanced usage gives us

From ADVANCED-USAGE.md, the levers that make per-paragraph feasible without N iframes:

- **Client API via `postMessage`** — `iframe.contentWindow.postMessage({ giscus:
  { setConfig: { term, ... } } }, 'https://giscus.app')` changes the **term
  without reloading** the iframe. → one giscus instance can be re-pointed at
  `post:<slug>#p:<id>` as the reader opens different paragraphs.
- **`data-mapping="specific"` + `data-term`** — arbitrary per-thread keys. We
  already use `post:<slug>`; paragraph threads become `post:<slug>#p:<hash>`.
- **`data-emit-metadata="1"` + `message` listener** — giscus posts back
  `{ discussion, viewer }`; gives the live comment/reaction count for the
  currently-loaded term (used to label the open paragraph's pin).
- **`giscus:backlink` meta tag** — controls the URL giscus writes when it
  *creates* a discussion; set it to the paragraph permalink
  (`?post=<slug>&prg=<id>`) so a discussion opened from a paragraph links back
  to that paragraph.
- **`data-theme="<URL>"`** — a **custom parchment giscus theme** hosted at
  `https://jajupmochi.github.io/css/giscus-parchment.css` so the comment box
  matches the notebook (T-C / polish).

Caveat ADVANCED-USAGE makes explicit: there's **no API to bulk-read counts for
many terms** from the widget — counts come one term at a time as each loads. So
showing "💬 3" on *every* paragraph at once needs a separate GraphQL prefetch
(Tier C), not the widget.

## 3. Anchoring: how a note sticks to a paragraph

The hard problem (same as Hypothesis/Medium): keep a note attached when the text
is later edited. Options, simplest → most robust:

1. **Ordinal id** (`p-7`) — 7th block. Trivial, but reordering/inserting a
   paragraph silently misattaches notes. Reject for anything persistent.
2. **Content-hash id** (`p-<sha1(normalized text)[:8]>`) — stable across
   reordering; only breaks when *that* paragraph's text changes (acceptable —
   an edited paragraph arguably should re-anchor). **Recommended default.**
   Computed in `postProcess()` when assigning ids, mirrors the existing
   GitHub-style heading slugger.
3. **W3C Web Annotation `TextQuoteSelector`** (prefix/exact/suffix) — what
   Hypothesis uses; survives most edits and supports **sub-paragraph / phrase**
   selection. More code (fuzzy re-anchoring). Tier D, for select-to-comment.

Plan: content-hash paragraph ids for MVP (B), add text-quote selectors when we
do phrase-level select-to-comment (D).

## 4. Architecture (tiered A→D)

| Tier | What | Store | giscus features | Cost |
|---|---|---|---|---|
| **A** | **Author side-notes** in the margin (`[^note]`-style or `:::note` blocks in the `.md`, or a `sidenotes` map in registry) | static (md/registry) | — | low |
| **B** | **Reader per-paragraph comments**: margin pin per paragraph → drawer hosts the single giscus iframe re-pointed via `setConfig({term:'post:slug#p:<hash>'})` | giscus | client API, specific mapping, backlink | medium |
| **C** | **Counts on pins** ("💬 3" without opening): one GraphQL query per post for discussions matching `post:slug#p:*`, cached in localStorage | GitHub GraphQL (read) | emit-metadata for the open one | medium |
| **D** | **Select-to-comment on a phrase** (highlight text → "comment"), text-quote anchored, highlights re-painted on load | giscus + annotation index | text-quote selectors | high |
| **T-C** | **Custom parchment giscus theme** (`data-theme` URL) so the box matches the notebook | — | data-theme | low |

Tiers are progressive and all reuse the **one** giscus iframe + GitHub
Discussions — no new backend at any tier.

## 5. The reader flow (margin pins + drawer)

1. `postProcess()` assigns each top-level block (`p`, `li`, `blockquote`,
   `pre`) a content-hash id and injects a **margin pin** (a small ✍️ / 💬
   affordance in the gutter, revealed on row hover — Medium-style).
2. Click a pin → a **margin drawer** (right gutter on wide screens, bottom sheet
   on mobile) opens, the paragraph is highlighted, and the **single giscus
   iframe is moved into the drawer and `setConfig`'d** to `term:
   post:<slug>#p:<hash>` + `backlink` = the paragraph permalink.
3. A header in the drawer: "Note on this paragraph · back to all comments" →
   resets term to `post:<slug>` and returns the iframe to the foot.
4. `?post=slug&prg=<hash>` permalink deep-links straight into a paragraph's
   notes (mirrors the version-history `?rev=`).
5. Tier C: on load, one GraphQL call fetches counts for this post's paragraph
   discussions → pins with ≥1 note render "💬 N"; empty paragraphs show the
   faint "add a note" pin only on hover.

Single-iframe + setConfig is the key efficiency trick (ADVANCED-USAGE) — no
iframe-per-paragraph, so no rate-limit / perf blowup.

## 6. Visual design (parchment marginalia)

- **Author side-notes (A)**: small handwriting-font (LXGW WenKai / Patrick Hand)
  notes in the right margin on wide screens, numbered superscript refs inline;
  on mobile they collapse to tap-to-expand footnotes. Ink-brown, slightly
  rotated, like a real marginal scribble.
- **Reader pins (B)**: a faint gutter ✍️ that ink-blooms on row hover; active
  paragraph gets a soft highlight (washi-tape underline, not a loud background).
- **Drawer**: parchment panel, dashed left edge (torn-paper), giscus inside
  themed by the custom CSS (T-C).
- Respects `prefers-reduced-motion`; full keyboard path (pins are buttons,
  focusable; Tab to a paragraph reveals its pin).

## 7. Constraints & mitigations

- **GitHub rate limit (Tier C)** — one GraphQL query per post (not per
  paragraph), cached in localStorage with a short TTL + ETag. Lazy: only when a
  post opens. Unauthenticated 60/hr is fine for read; counts degrade gracefully
  to "no count" on 403.
- **Discussion sprawl** — many paragraph threads = many discussions in one
  category. Mitigate: keep them in a dedicated **"Annotations" category** (not
  Announcements), and only *create* one when a reader actually submits (giscus
  already lazy-creates). A `post:<slug>#p:<hash>` term is self-documenting.
- **CSP** — Tier C adds `https://api.github.com` to `connect-src`; the custom
  theme (T-C) is same-origin CSS, no CSP change.
- **Anchor drift** — content-hash means an edited paragraph starts a fresh
  thread; the old thread isn't lost (still in Discussions, linked by its
  backlink) — acceptable and honest ("this paragraph changed since those notes").
- **Spam / moderation** — same as post-level giscus: GitHub account required to
  comment; Linlin moderates via GitHub Discussions; lock a thread to freeze it.
- **Privacy** — giscus loads only when a reader opens a paragraph drawer (and
  the post foot); no third-party until then.

## 8. Implementation plan + file map

- `js/blog.js`
  - `postProcess()`: assign content-hash ids + inject margin pins on block
    elements; build the author-sidenote layer from `:::note` blocks / registry.
  - `mountGiscus(post)`: keep the post-level mount; add `moveGiscusTo(term, el,
    backlink)` using the client-API `setConfig` (re-point, don't recreate).
  - new `initParagraphNotes(post, cl)`: pins, drawer, `?prg=` deep-link,
    emit-metadata listener for the open count.
  - Tier C: `fetchParagraphCounts(slug)` (GraphQL, cached).
- `css/blog.css`: `.prg-pin`, `.prg-drawer`, `.sidenote`, active-paragraph
  highlight (parchment).
- `blog.html`: (Tier C only) `connect-src += api.github.com`; (T-C) ship
  `css/giscus-parchment.css` + set `data-theme` to its URL.
- `blog-posts/registry.json`: optional `sidenotes` per post for Tier A (or
  author them inline in the `.md` as `:::note` fences).
- **No new backend, no new heavy dependency** (reuses giscus + marked + the
  existing GraphQL-capable `gh`-style fetch).

## 9. MVP → roadmap

- **MVP**: Tier A (author side-notes, fully static) + Tier B (reader
  per-paragraph via single-iframe `setConfig`) + `?prg=` permalink. This already
  delivers "comment on this paragraph, shown in the margin".
- **v2**: Tier C (counts on pins) + T-C (parchment giscus theme).
- **v3**: Tier D (select-a-phrase highlight annotations, text-quote anchored) —
  the full Hypothesis-style experience.
- **Alternative considered & not chosen for default**: embedding **Hypothesis**
  (`hypothes.is`) wholesale — one script, instant select-to-annotate, but its
  own non-parchment UI + account system + an external dependency on someone
  else's service. Keep as a power-user opt-in at most; the giscus-based design
  stays on-brand and on our own data.

## 10. Decisions for Linlin

1. **Scope now**: MVP = A + B, or also C (counts) / T-C (themed box)?
2. **Author side-notes source**: inline `:::note` fences in the `.md`
   (write-where-you-read) vs a `sidenotes` map in `registry.json` (keeps prose
   clean)?
3. **Annotations category**: make a new GitHub Discussions **"Annotations"**
   category for paragraph threads (keeps Announcements clean) — OK to create?
4. **Phrase-level (Tier D)** now or later? It's the biggest lift.
