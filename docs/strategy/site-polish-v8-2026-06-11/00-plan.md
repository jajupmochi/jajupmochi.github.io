# Site Polish v8 — Plan

> One-sentence purpose: 5 full-site optimization rounds (readability · coherence · personality · interviewer flow · QA), built entirely in NEW v8 files; originals untouched until Linlin approves the swap.

## Master TOC

- [File architecture (approval-gated)](#file-architecture-approval-gated)
- [The 5 rounds](#the-5-rounds)
- [Per-round loop](#per-round-loop)
- [Swap procedure (after approval)](#swap-procedure-after-approval)
- [Constraints](#constraints)

## File architecture (approval-gated)

- Working copies: `index_en_v8.html`, `index_en_clear_v8.html`, `blog_v8.html`, `apps-deck_v8.html`, `apps-gallery_v8.html`, `personal_v8.html`. Internal links keep ORIGINAL names (drop-in correct at swap; preview jumps to originals are acceptable).
- New additive stylesheets (loaded AFTER the existing ones, version-neutral names so the swap is a pure file copy): `css/polish.css` (parchment pages), `css/blog-polish.css` (blog), `css/clear-polish.css` (zh page, own system).
- Shared files **not** modified pre-approval: `css/main.css`, `css/parchment-overrides.css`, `css/blog.css`, `js/*`, `locales/*.json`, `data/*`. i18n copy changes are collected in [pending-locale-edits](#pending-locale-edits) inside `round-notes.md` and applied only at swap.
- Per-round history: screenshots + `round-notes.md`; local commits per round (no push until approval).

## The 5 rounds

| R | Lens | Core moves |
|---|------|-----------|
| 1 | **可读性 Readability** | content prose → Spectral ≥16px/1.55 site-wide (handwriting stays for headings/labels/accents); line-length caps; blog post body is the flagship fix; list hierarchy |
| 2 | **主题 Coherence** | one nav/footer language on parchment pages; gallery+blog raised to homepage theme intensity; deck/personal aligned; zh page polished within its own clean system |
| 3 | **个性 Personality** | hand-drawn micro-details + micro-interactions (marginalia, ink flourishes, hover feedback, 旺财 cameo), leaning into the 2026 tactile trend |
| 4 | **面试官 Flow** | 30-second rule: sharper value-prop; every page ends with a hand-drawn "where next" signpost; ≤3 clicks to proof (CV/publications/apps) from anywhere |
| 5 | **QA lock** | mobile pass all pages, a11y on new elements, consistency sweep, perf sanity, final montage + swap checklist |

## Per-round loop

1. Apply the lens across ALL v8 pages (en home, zh home, blog list+post, deck, gallery, personal).
2. Verify in browser (targeted screenshots; 0 console errors).
3. Append per-round notes (changes, critique, pending locale edits).
4. Local commit `feat(v8): rN <lens>` — no push.

## Swap procedure (after approval)

1. `cp X_v8.html X.html` for each approved page (links already point at original names).
2. `css/polish.css` / `css/blog-polish.css` / `css/clear-polish.css` are already standalone — no rename needed.
3. Apply the pending locale edits to `locales/*.json` (+ parity check).
4. Full visual re-verify on originals, UPDATES/PLAN entries, commit+push.
5. v8 working copies remain as history (per repo convention).

## Constraints

- Hard bans hold (no gradient text / glass / emoji-in-chrome / em-dash in copy).
- 4-theme safety: polish.css keys off the parchment default; theme-switch spot-check in R5.
- JSON validity + i18n parity untouched until swap (no locale edits pre-approval).
