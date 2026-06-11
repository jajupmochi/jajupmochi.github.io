# Personal 3D Room v2 — Plan

> One-sentence purpose: rebuild `personal.html`'s scene as a paper pop-up-book diorama, personal content only, multi-round verified, NOT committed (per Linlin).

## Master TOC

- [Concept](#concept)
- [Scene layout](#scene-layout)
- [Implementation map](#implementation-map)
- [Rounds & validation](#rounds--validation)
- [Out of scope](#out-of-scope)

## Concept

**纸艺立体书 (paper pop-up book).** An open hardcover book lies on a parchment desk; out of its two pages rises a tiny hand-cut paper world of Linlin's life outside work. Cream paper + ink-line edges + cinnabar/gilt/qing accents = the homepage's manuscript language in 3D. Orbit is free 360° (it's a diorama you hold). Clicking a corner zooms in and opens the existing parchment side panel.

## Scene layout

Top view (book ≈ 8.6 × 6.2, gutter at x=0):

```
        z-                       z-
  [Travel 旅行]            [Hiking 徒步]
  suitcase + postcards     paper mountains + pines
  + dashed route 西安→Bern   + flag + backpack
        (left page)              (right page)
  [Photos 相册]            [Dancing 跳舞]
  photo garland on posts   record player + notes
  + hanging postcards      + dance shoes
        z+                       z+
   center gutter: teapot + cup, plant, sleeping cat (decor only)
```

4 hotspots (was 6): Travel, Hiking, Dancing, Photos. Desk→Apps and Bookshelf→Publications **removed** (scene + panels + fallback cards + explore menu). Panel links to site sections removed; panels are stories + postcard photos only.

## Implementation map

All in `personal.html` (single file, no new deps):

1. **CSS**: body bg `#e7dcc2`; `.hot-label` → washi-tape chip (Patrick Hand, slight rotate, tape gradient); loader copy; ribbon hint "drag to spin the book"; brand "Linlin's little world".
2. **Meta/fallback**: description; `#nowebgl` cards → 4 personal + tea/cat decor lines, no Apps/Publications links.
3. **Scene core** (replaces lines ≈194–264): cream bg+fog; free-orbit controls (full azimuth); Hemi+1 soft Dir light; toon gradient map; `pmat()/pbox()/pcyl()/pcone()` helpers with `EdgesGeometry` ink lines + jitter; postcard-style `photoTex` (ink-and-wash canvas).
4. **Stage**: book cover (maroon) + 2 pages (cream, ruled-lines canvas) + handwritten page annotations; parchment ground + soft contact shadow.
5. **Corners** (replaces hotspot section ≈266–371): travel / hiking / dancing / photos groups as registry entries with new views + panels; center decor (tea, plant, cat).
6. **Pop-up entrance**: corner groups scaleY 0.01→1 staggered back-out ease inside the existing rAF loop; skipped under reduced-motion.

## Rounds & validation

- R1 build → screenshot desktop 1440×980 (HOME view) + diagnose vs 4 axes (color / typography / spacing-composition / ornamentation).
- R2+ iterate: corner detail, label legibility, camera bounds, hover/click, panel content, mobile 390×844 (page chrome reflows; canvas is fullscreen).
- Each round: 0 console errors; final round: click-through all 4 hotspots + album lightbox + ESC paths + explore menu.
- Deliverable: final screenshots to Linlin. **No commit** (explicit instruction).

## Out of scope

- Real photos (none in repo; postcard placeholders stay drop-in replaceable).
- Updating `res/portfolio/img/personal-room.png` (homepage teaser) — re-shoot when this ships (it IS committed/live; changing it is a commit-time decision).
- i18n of the page (it ships EN-only today, like v1).
