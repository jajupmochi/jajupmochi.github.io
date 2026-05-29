# Linking blog ↔ homepage — research & report (2026-05-29)

> Linlin asked: a feature that **threads the blog and the personal homepage
> together** — possibly a Zhihu-style **合集 / collection**, or a **graph-form
> UI/UX** like the "living graph" we designed earlier for the homepage. This
> reports the options, ties them to existing prior art in the repo, and
> recommends a path. **Status: report for Linlin's decision.**

## Master TOC

- [1. What "linking" means here](#1-what-linking-means-here)
- [2. Prior art already in the repo](#2-prior-art-already-in-the-repo)
- [3. Option A — Zhihu-style collections (合集)](#3-option-a--zhihu-style-collections-合集)
- [4. Option B — knowledge graph (living-graph motif)](#4-option-b--knowledge-graph-living-graph-motif)
- [5. Option C — lightweight cross-links (the connective tissue)](#5-option-c--lightweight-cross-links-the-connective-tissue)
- [6. Comparison & recommendation](#6-comparison--recommendation)
- [7. Shared data model](#7-shared-data-model)
- [8. Roadmap](#8-roadmap)
- [9. Decisions for Linlin](#9-decisions-for-linlin)

## 1. What "linking" means here

Today the blog and homepage are **siblings that barely reference each other**:
nav links only. Three kinds of connective tissue are possible, increasing in
ambition:

- **Collections** — curate ordered groups ("this post is part 2 of the fcitx5
  series"; "posts behind the LIULIAN project"). Editorial, low-tech.
- **Cross-links** — a post ↔ the homepage project/paper it's about; a project ↔
  the posts that document it. Bidirectional, data-driven.
- **Graph** — a visual knowledge graph where posts, projects, papers, grants are
  nodes and "is-about / part-of / cites / same-topic" are edges. The
  graph-ML-flavored, on-brand version.

These compose: collections + cross-links are the **data**; the graph is one
**view** of that same data. Build the data once, render it as a list (合集) and
as a graph.

## 2. Prior art already in the repo

- **`docs/vibe/mindstorm-02-magic-grimoire-theme.md §4 "Living Graph"`** — the
  "graph form" Linlin remembers. Two variants were designed:
  - **4.A Full-page force-graph** (d3-force + three.js; whole site IS a graph).
    Verdict then: *distinctive but heavy* — 4–8 wk, kills mobile/SEO, recruiter
    10-second scan fails. Recommended **against** as default.
  - **4.B Edge-on-Engagement** (chosen): page stays a normal scroll document
    (keeps SEO + recruiter-friendliness), but each card "knows" its 1–5 related
    neighbours (`data-related` + `data-related-strength`); on hover/dwell, 1–3
    edges *grow* from it (ink-vines by day, circuit-traces by night), with
    offscreen-neighbour thumbnail cards. Verdict: **adopt 4.B**, keep 4.A as a
    Cmd+G "open node graph" easter-egg modal.
  - A prototype exists: **`new_web_test.html`** (D3 force-graph reference).
- **`docs/strategy/blog-roadmap-research-2026-05-14.md`** — already lists
  **"Series/collections — group multi-part posts; part 2 of 3 nav"** and
  **"Backlinks graph — D3 force graph of which posts cite which (ties to the
  homepage's graph-ML motif)"**. So this direction is pre-blessed.
- **`PLAN.md` G1 — "Live Citation Graph" `[ ]`** — a planned homepage graph of
  publications/citations. Same family; a blog↔homepage graph is its sibling.
- **Existing data**: `js/projects-data.js` (`window.PROJECTS`, the shared
  project source) + `blog-posts/registry.json` (posts, tags). The two just need
  a relation between them.

**Takeaway:** the graph idea is not new — it's a designed-but-unbuilt homepage
feature (4.B). Linking the blog into it is the natural first concrete payload
for that design, at low risk (the blog has few nodes).

## 3. Option A — Zhihu-style collections (合集)

A **collection** = an ordered, titled set of items that can mix **posts and
homepage entities** (projects/papers). Zhihu 合集 / Notion-gallery / Wikipedia
"series box" flavor.

- **Data**: a `collections` array (slug, title{i18n}, cover, ordered `items[]`
  where each item is `{type:'post'|'project'|'paper', ref}`).
- **UI**: a `/blog.html?collection=<slug>` view (reuses the blog list render) +
  an in-post "📚 Part 2 of *Building this site* · ‹prev | next›" band + a
  homepage "Writing about this project" strip on a project card linking to its
  posts.
- **Effort**: low–medium, fully static, i18n-native, SEO-friendly.
- **Value**: immediately useful for the 3 existing "build-this-site / blog /
  fcitx5" posts and the LIULIAN/project write-ups; recruiter-legible.

## 4. Option B — knowledge graph (living-graph motif)

A visual graph tying **posts ↔ projects ↔ papers ↔ grants**. Two sub-forms,
straight from mindstorm-02:

- **B1 — Edge-on-Engagement (recommended, 4.B)**: keep blog + homepage as scroll
  docs; add a `data-related` map so hovering a post (or a project) sprouts
  ink-vine/circuit edges to its related nodes, with offscreen thumbnail cards
  and click-to-navigate (lenis + gsap). On-brand ("spells you summon"), mobile-
  friendly, SEO-safe. ~1–2 wk for the homepage; the blog reuses the same engine.
- **B2 — Full force-graph view (4.A as easter-egg)**: a Cmd+G / "🕸 Map" modal
  that renders the whole post+project+paper graph with d3-force (seed from
  `new_web_test.html`). Optional, geeky, not the default.
- **Edges to compute** (cheap, from existing data): post→project/paper it's
  *about* (explicit `relates` field), post↔post *same primary tag*,
  project↔paper *already in projects-data*, post↔post *cites* (links between
  posts). Reuses the **Backlinks-graph** idea.

## 5. Option C — lightweight cross-links (the connective tissue)

Independent of A/B, the **data** that powers both:

- Add `relates: [{type, ref}]` to each post in `registry.json` (e.g. fcitx5
  post → nothing; "how I built this site/blog" → project `homepage`).
- Add the inverse on `window.PROJECTS` (`posts: [<slug>]`) or derive it.
- Render now as plain "Related" chips (post → its project/paper; project → its
  posts). This is the **MVP backbone**; collections (A) and graph (B) are richer
  views of it.

## 6. Comparison & recommendation

| Dimension | A · Collections | B1 · Edge-on-Engagement | B2 · Full force-graph | C · Cross-links |
|---|---|---|---|---|
| Effort | low–med | med (1–2 wk) | high (4–8 wk) | low |
| Mobile | ✅ | ✅ (degrades to tap) | ⚠️ rebuild | ✅ |
| SEO | ✅ | ✅ | ❌ | ✅ |
| Recruiter-legible | ✅ | ✅ | ❌ | ✅ |
| On-brand (graph-ML) | ➖ | ✅✅ | ✅✅✅ | ➖ |
| Maintenance | curate lists | add `data-related` | per-node edits | add `relates` |
| Reuses prior art | roadmap | **mindstorm-02 4.B** | `new_web_test.html` | data only |

**Recommendation — build C → A → B1, in that order:**

1. **C (cross-links)** first: add the `relates` relation + "Related" chips on
   posts and projects. Tiny, immediately useful, and it's the data layer
   everything else reads.
2. **A (collections)** next: the Zhihu 合集 view + part-of nav. Static,
   high-value for the existing post clusters.
3. **B1 (Edge-on-Engagement graph)** as the flagship: implement the chosen 4.B
   design on the homepage *and* the blog, reading the same `relates` data;
   keep **B2** (full force-graph) as a Cmd+G easter-egg seeded from
   `new_web_test.html`.

This sequences low-risk/high-value first and lets the graph (the ambitious,
on-brand piece) stand on a data layer that's already proven useful — rather than
building a heavy graph nobody's data feeds yet.

## 7. Shared data model

One relation, read by all three views (keeps the DRY principle from the
projects refactor):

```jsonc
// registry.json post
"relates": [
  { "type": "project", "ref": "homepage" },     // → js/projects-data.js id
  { "type": "post",    "ref": "how-i-built-this-blog" },
  { "type": "paper",   "ref": "#publications" }
]
// collections (new top-level array in registry.json)
"collections": [
  { "slug": "building-this-site", "title": { "en": "Building this site", "zh": "搭建这个网站" },
    "items": [ {"type":"post","ref":"how-i-built-this-site"},
               {"type":"post","ref":"how-i-built-this-blog"},
               {"type":"project","ref":"homepage"} ] }
]
```

`window.PROJECTS` already has ids (`liulian`, `homepage`, …) to point at. The
graph (B) builds nodes = posts ∪ projects ∪ papers, edges = `relates` ∪
same-tag ∪ projects-data's own project↔paper links.

## 8. Roadmap

- **v1 (C)** — `relates` field + "Related" chips on post foot and project cards.
  Static, ~half a day.
- **v2 (A)** — `collections` + `?collection=<slug>` view + part-of nav band.
- **v3 (B1)** — Edge-on-Engagement on homepage + blog (the mindstorm-02 4.B
  spec); shared `data-related`. Flagship, gets its own multi-round redesign doc.
- **v3+ (B2)** — Cmd+G full force-graph easter-egg from `new_web_test.html`.

## 9. Decisions for Linlin

1. **Sequence** — agree with C → A → B1 (data → collections → graph)? Or jump
   straight to the graph?
2. **Graph scope** — when we reach B, default to **B1 (Edge-on-Engagement,
   on-brand, light)** with B2 as an easter-egg, per mindstorm-02's verdict?
3. **First collection** — seed "Building this site" (the 2 build posts +
   homepage project) as the worked example?
4. Should B1 be folded into the larger **homepage grimoire redesign**
   (mindstorm-02) rather than shipped blog-first?
