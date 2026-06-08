# Homepage 10-Round Optimization — Delivery

> **Language:** English | [中文](DELIVERY.zh.md)
>
> One-page summary of the deep 10-round homepage optimization pass (2026-06-05),
> done in-place on the live `index_en.html` for the launch.

## Master TOC

- [What got built](#what-got-built)
- [How to view](#how-to-view)
- [Per-round result](#per-round-result)
- [Flagged for Linlin](#flagged-for-linlin)
- [File map](#file-map)

## What got built

A round-by-round audit + optimization of the live homepage, each round one lens,
screenshot-verified, committed separately (commits `29e5ec0` → r10). The page was
already mature, so the honest outcome is a mix of **real fixes** and **audit
confirmations** (an area checked thoroughly and found sound, with a focused low-risk
improvement instead of churn). Net: 6 concrete code improvements + 4 verified-sound
audits + several findings flagged for Linlin's judgment.

## How to view

```
python3 -m http.server 8000
# then open http://localhost:8000/index_en.html
```

Round screenshots: `r1-after-*.png`, `r2-anchor-jump-fixed.png`, `r3-pub-titles.png`,
`r4-focus-ring.png`, `r8-mobile-publications.png`, `r9-fonts-merged.png` in this folder.

## Per-round result

| R | Lens | Outcome |
|---|------|---------|
| 1 | Above-the-fold | **Fix**: "read my CV ↗" recruiter path + "130+ citations" credibility line |
| 2 | Hierarchy | **Fix**: anchor-jump no longer hidden under the navbar (`scroll-padding-top`) |
| 3 | Typography | **Fix**: pub-title legibility; body font kept (deliberate), tradeoff flagged |
| 4 | Colour/contrast | Audit sound (18:1); **Fix**: on-brand maroon focus ring |
| 5 | Spacing | Audit sound (consistent 36px); optional bump flagged |
| 6 | Credibility | Audit sound; **Fix**: H-index 6 → 7 (verified) |
| 7 | Motion | Audit sound (reduced-motion comprehensive); PLAN item closed |
| 8 | Mobile | Audit sound (no overflow); **Fix**: CV-link tap target ≥ AA |
| 9 | Performance | **Fix**: 2 font requests → 1, dropped unused ZCOOL XiaoWei |
| 10 | Final QA | gates pass; **Fix**: CSP un-blocks Clarity analytics |

## Flagged for Linlin

- **Body font (R3):** Indie Flower is friendly but bubbly on credibility content; if
  you want more "serious researcher", switch long-form CONTENT to the neater Patrick
  Hand while keeping the name / headings / accents handwritten. (Not changed.)
- **zh page fonts (R9):** `index_en_clear.html` never loads the parchment handwriting
  fonts, so its Latin text falls back to system fonts. (Not changed; out of scope.)
- **Opaque 404×5 (R10):** not a missing local asset; cross-origin, pre-existing —
  check the deployed-site console. Likely a third-party/API endpoint.
- **Map dedup (R9):** PLAN H1.M3.G4.T4 (Leaflet + Google Maps both loaded) still open.
- **Optional spacing bump (R5):** `#about.section ~ .section` padding `2.25rem → ~2.6rem`.

## File map

- `index_en.html` — hero CV link + citations, H-index, font merge, CSP (R1/R6/R9/R10)
- `index_en_clear.html` — H-index, ZCOOL drop, CSP (R6/R9/R10)
- `css/main.css` — scroll-padding-top, pub-title (R2/R3)
- `css/parchment-overrides.css` — focus ring, CV-link style + tap target (R4/R1/R8)
- `docs/PLAN.md` — closed H1.M3.G4.T1/T2/T3
- `docs/strategy/homepage-redesign-2026-06-05/` — plan, round notes, this delivery, screenshots
