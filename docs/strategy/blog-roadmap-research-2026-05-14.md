# Blog roadmap — research & options (2026-05-14)

> Decision document. The core blog (static, client-rendered, 4-language,
> Markdown/LaTeX/Jupyter/Mermaid) is **shipped**. This file lays out the
> *optional* next layers — comments, novel annotation/display, multilingual
> fusion, analytics, and fun extras — with feasibility on a **static GitHub
> Pages** host (no backend of our own). Pick what you want; nothing here is
> built yet.

## Master TOC

- [Hard constraint: static hosting](#hard-constraint-static-hosting)
- [A. Comment / discussion systems](#a-comment--discussion-systems)
- [B. Novel commenting & annotation display](#b-novel-commenting--annotation-display)
- [C. Real-time stats / analytics / visualization](#c-real-time-stats--analytics--visualization)
- [D. Multilingual display systems](#d-multilingual-display-systems)
- [E. Fun / novel extras](#e-fun--novel-extras)
- [Recommended starter bundle](#recommended-starter-bundle)

## Hard constraint: static hosting

GitHub Pages serves files only — no server we control. So any "dynamic"
feature is one of:

1. **Third-party embed** (their server holds data): Giscus, Hypothesis, etc.
2. **Serverless backend we add**: Supabase / Firebase free tier, or extend the
   **Google Apps Script + Sheets** path the site already uses for the welcome form.
3. **GitHub-as-backend**: Discussions / Issues / PRs via their API (audience is
   developers, so GitHub login is low-friction).
4. **Pure client-side**: localStorage, no persistence across users.

---

## A. Comment / discussion systems

| Option | Backend | Login | Pros | Cons | Fit |
|---|---|---|---|---|---|
| **Giscus** ⭐ | GitHub Discussions | GitHub | free, no DB, markdown, reactions, threads, theme-able, no tracking | requires GitHub account to post | ★★★★★ dev/research audience |
| Utterances | GitHub Issues | GitHub | lighter than Giscus | Issues clutter, no nested threads | ★★★★ |
| Cusdis | self-host/their cloud | none (anon) | tiny (~5 kb), privacy-first, email moderation | needs a Vercel/host; less rich | ★★★ |
| Supabase comments | Supabase (Postgres) | optional | full control, realtime, powers B/C below | we build the UI; free-tier limits | ★★★★ if we want custom |
| GAS + Sheets | Google Apps Script | none | reuse existing infra, zero new accounts | no realtime, manual moderation | ★★★ |
| Disqus | Disqus | Disqus | turnkey | ads, heavy, privacy-hostile | ✗ avoid |

**Take:** Giscus is the obvious low-effort, on-brand pick (free, private,
themed to parchment). Choose Supabase instead only if you want the novel
sentence-level / realtime features in B & C with one shared backend.

---

## B. Novel commenting & annotation display

The "对某句话评论 / 手写批注 / 直接改原文 / 版本迭代" ideas:

- **B1 — Sentence/range annotation (highlight any text → comment).**
  - *Hypothesis (hypothes.is):* drop-in W3C Web-Annotation layer; readers select
    text, comment, thread. Their store, or self-host. Fast to add.
  - *Custom (Supabase + TextQuote anchors):* we store `{quote, prefix, suffix,
    note}` and re-anchor on load. Full control over look (see B2).
- **B2 — Handwritten-margin "批注" aesthetic (very on-brand).**
  Render reader/author notes as **parchment sticky-notes / margin scribbles**
  pinned beside the line (reuse the OTW washi-tape sticky-note components).
  Use **rough-notation** (animated hand-drawn underline/circle/highlight) to
  mark annotated spans. Hovering a span flips open its note like a manuscript gloss.
- **B3 — "Suggest an edit" → GitHub PR (版本迭代, zero DB).**
  Each post has an *Edit this page* button → opens a PR on `blog-posts/<slug>/<lang>.md`.
  GitHub is the user system + version history. Show a **revision timeline** from
  the file's git log via the GitHub API ("revised 3×, see diffs").
- **B4 — CriticMarkup rendering.** Author/editor changes encoded inline
  (`{++add++}`, `{--del--}`, `{~~old~>new~~}`, `{==hi==}{>>note<<}`) → render as
  tracked-changes. Doubles as the AI-vs-human diff in D2.
- **B5 — Per-paragraph emoji reactions / "was this helpful?"** (Supabase/GAS).

---

## C. Real-time stats / analytics / visualization

- Already live: **Microsoft Clarity** (cookieless heatmaps + session replay +
  scroll depth).
- **Per-post view counter:** GoatCounter (free, privacy-first) or a GAS+Sheets
  counter. Render as an ink-stamp on each card.
- **Annotation heat-strip:** a thin margin rail beside the article tinted where
  readers annotated/dwelled most (needs B1 data or Clarity scroll data).
- **Live presence** ("3 reading now") via Supabase realtime — ephemeral, fun.
- **Dashboard page:** small D3/Chart.js board — views over time, top posts,
  language split, comment volume. Reuse the homepage's hand-drawn chart vibe.

---

## D. Multilingual display systems

Current state: per-post `langs` + `translationStatus` (human/ai/checked/pending)
already in `registry.json`; UI shows availability + a status badge.

- **D1 — Parallel / fused display.**
  - *Side-by-side columns* (lang A | lang B), synced scroll.
  - *Interleaved* (paragraph A then its translation beneath), toggle.
  - *Hover-align* — hover a sentence → its counterpart highlights. Needs
    **sentence-aligned IDs**: author the `.md` so matching units carry
    `<span data-seg="N">` (or store parallel sentence arrays). More authoring,
    but unlocks all three modes.
- **D2 — Translation provenance (AI vs human), finer-grained.**
  Mark spans `data-prov="ai|checked|human"`; render with subtle styles
  (dotted blue underline = raw AI, solid green = human-checked). Legend + toggle.
  Optional **diff view**: what the human changed from the raw AI draft
  (CriticMarkup / B4). Novel + trust-building.
- **D3 — Language-learning extras.** Inline pinyin/romanization toggle for zh;
  domain-term glossary tooltips consistent across languages.

---

## E. Fun / novel extras

- **Reading-progress bar** — parchment ink slowly fills the top rule as you scroll.
- **Floating TOC w/ scroll-spy** — reuse the homepage scroll-spy; sidebar on desktop.
- **Copy-code buttons** + per-block language tag.
- **"Cite this post"** — BibTeX / APA generator (researcher audience).
- **RSS / Atom feed** — regenerate `feed.xml` for the new blog (the legacy
  Jekyll blog had one); lets people subscribe.
- **Webmentions (IndieWeb)** — likes/replies from Mastodon/Twitter show up under
  posts via brid.gy; decentralized, no DB.
- **Running-dog easter egg** — the post's mascot dashes across the footer on a
  Konami-style trigger or when the page finishes loading.
- **Day/night parchment** — warm daylight parchment ↔ candle-lit night ink.
- **Series/collections** — group multi-part posts; "part 2 of 3" nav.
- **Backlinks graph** — D3 force graph of which posts cite which (ties to the
  homepage's graph-ML motif).
- **Print-to-PDF** — clean print stylesheet; "save as PDF" button.
- **Page-weight / CO₂ badge** — eco-web movement; shows the page is light.
- **Ask-AI-about-this-passage** — select text → ask Claude (needs an API proxy;
  heavier, but extremely on-theme for a human×AI blog).

---

## Recommended starter bundle

Lowest effort, highest on-brand payoff, all static-friendly:

1. **Giscus comments** (GitHub Discussions) — themed to parchment.
2. **"Suggest an edit" → GitHub PR** + git-log revision timeline (B3).
3. **Reading-progress ink bar + floating scroll-spy TOC + copy-code buttons** (E).
4. **Finer translation-provenance badges** building on what's already in the
   registry (D2, display-only — no backend).
5. **RSS/Atom feed** (E) — cheap, high value for a research audience.

Then, if you want the *wow* layer and accept one serverless dependency
(Supabase free tier as the single backend for all of it):

6. **Sentence-range annotation with handwritten parchment margin notes** (B1+B2).
7. **Live view counts + a small analytics dashboard** (C).
8. **Hover-aligned bilingual reading** (D1) — needs sentence-aligned authoring.
