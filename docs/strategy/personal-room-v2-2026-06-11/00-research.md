# Personal 3D Room v2 — Research

> One-sentence purpose: ground the room redesign in (a) why v1 fails, (b) the techniques and references for a parchment-true paper-craft diorama.

## Master TOC

- [Why v1 fails (diagnosis)](#why-v1-fails-diagnosis)
- [Design-direction candidates](#design-direction-candidates)
- [Technique research (web)](#technique-research-web)
- [Resource-bank check](#resource-bank-check)
- [Decisions](#decisions)

## Why v1 fails (diagnosis)

Baseline: `r0-baseline.png` (2026-06-11, 1440×980).

1. **Palette mismatch.** Saturated orange floor (`0x9c6b3f`), grey-beige walls, red/yellow rug — a generic "first three.js room". The site is cream parchment + ink + cinnabar/gilt/qing accents.
2. **Lighting mismatch.** A harsh PointLight hotspot on the wall; murky corners. The site feels like warm flat daylight on paper.
3. **No shared visual language.** The site is hand-drawn: ink outlines, washi tape, wobbly hand-cut edges, handwritten labels. The room has machine-straight geometry, zero outlines, MeshStandardMaterial realism ambitions at low fidelity (worst of both).
4. **Content mismatch** (user's explicit point): desk→Apps and bookshelf→Publications are professional surfaces; this page should be only the person — travel, dancing, hiking, photos.
5. **Room-box framing wastes the medium**: two wall planes + floor reads as an unfinished video-game room, not an object you want to orbit.

## Design-direction candidates

| Direction | Fit to parchment site | Risk |
|---|---|---|
| A. Paper pop-up book diorama (room rises from an open book's pages; everything hand-cut paper + ink outlines) | 1:1 — the whole site IS a manuscript/notebook | needs care to avoid clutter |
| B. Ink-sketch toon room (toon + outline pass, sepia) | high | still "a room", keeps the box framing |
| C. Generic low-poly cozy room (the freeCodeCamp/Awwwards genre) | low — pretty but belongs to a different site | looks templated, "AI-slop adjacent" |

**Chosen: A**, executed with B's shading techniques. The pop-up book also explains *why* the world is small and orbit-able (a diorama you hold), and gives a natural entrance animation (the pages' world pops up).

## Technique research (web)

Searched 2026-06-11:

- **Toon/cel shading**: `MeshToonMaterial` + a small `DataTexture` gradient map (2–3 steps) is the standard flat-paper look; tutorial: [maya-ndljk basic toon shader](https://www.maya-ndljk.com/blog/threejs-basic-toon-shader), [sbcode MeshToonMaterial](https://sbcode.net/threejs/meshtoonmaterial/).
- **Outlines**: two standard families — inverted-hull (draw twice, BackSide, scaled) per [Josh Marinacci's cartoon outline](https://medium.com/@joshmarinacci/cartoon-outline-effect-6c4e95545537) / [piousbox](https://piousbox.com/2022/06/cartoon-outline-effect), or pixel post-processing (OutlinePass). For a static-geometry paper diorama the cheapest, crispest is **`EdgesGeometry` + `LineSegments`** (ink lines exactly on the cut edges — literally "drawn"); forum overview: [smooth cartoon style with outlines](https://discourse.threejs.org/t/how-to-create-this-smooth-cartoon-style-with-outlines-in-three-js/60862).
- **Diorama / room-portfolio genre** (for what to avoid + camera framing): [freeCodeCamp cute room portfolio](https://www.freecodecamp.org/news/create-a-cute-room-portfolio-with-threejs-blender-javascript/), [three.js forum room-portfolio showcases](https://discourse.threejs.org/t/my-personal-portfolio-website-3d-room/63822). These bake lighting in Blender; we stay procedural (no model downloads, CSP stays tight) and get the flat look from toon shading instead.

## Resource-bank check

From the user-level frontend resource bank: **Three.js** (already the engine, r0.160 importmap via jsDelivr — keep); **anime.js** considered for the pop-up entrance but rejected (one more CDN dep for a 1s effect; a 20-line ease in the existing rAF loop does it). No icon/asset needs beyond Font Awesome already loaded.

## Decisions

1. Engine stays three.js r160 module importmap (no new deps, CSP unchanged).
2. Shading: `MeshToonMaterial` + 3-step gradient map; `EdgesGeometry` ink outlines (threshold ~25°) on every paper piece; per-piece ±1.5° rotation jitter for hand-cut feel.
3. Lighting: warm HemisphereLight (high) + one soft shadow DirectionalLight. No PointLights.
4. Stage: an open book (maroon cover, cream pages with ink ruled-lines canvas texture) on a parchment table; world pops from the pages.
5. Content: ONLY personal — travel / hiking / dancing / photo garland + decorative tea set, plant, cat. Desk/Apps and bookshelf/Publications removed everywhere (scene, panels, fallback cards, explore menu).
6. Keep: fallback mechanism, CSS2D labels (restyled washi), side panel, lightbox, explore menu, raycast, reduced-motion paths.
