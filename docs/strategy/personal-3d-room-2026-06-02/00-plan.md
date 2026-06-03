# Personal-space 3D room — design & 10-round plan

> The `personal` section becomes a cozy three.js study/living-room you can orbit and
> click. Each object is skeuomorphic and maps to real content / a hobby. Built from
> procedural primitives in the parchment palette (see `00-research.md`). Standalone
> page `personal.html`, wired to the navbar "Personal". Dated 2026-06-02.

## Master TOC

- [Concept](#concept)
- [Palette + materials](#palette--materials)
- [Elements → skeuomorphic form → content](#elements--skeuomorphic-form--content)
- [Interaction model](#interaction-model)
- [The 10 rounds (one lens each)](#the-10-rounds-one-lens-each)
- [Validation gates](#validation-gates)

## Concept

A warm scholar's study at golden hour: a corner room (two walls + floor), a window
throwing warm light, a desk-and-shelf work nook, and hobby vignettes (hiking, dancing,
photos, travel). Low-poly but warm and hand-made, not game-y. The camera starts in a
slow auto-orbit; click an object to focus it and open a parchment panel.

This is the "human behind the researcher": the homepage is the CV; this room is the
person (mountains, music, photos, tea, a cat).

## Palette + materials

Reuse the site tokens (OKLCH → hex for three.js):
- cream / parchment walls `#efe6d2`, floor warm wood `#9c6b3f` planks, rug cinnabar `#b1442f`.
- ink `#2e2a25`, gilt `#c79a3b`, qing/teal accent `#3f7d77`, maroon `#7c3a2e`.
- Materials: `MeshStandardMaterial` with low metalness, mid roughness; a warm key light
  (the window) + soft fill + ambient; `ACESFilmic` tone-mapping for a filmic warmth.

## Elements → skeuomorphic form → content

| Element | Skeuomorphic form | Maps to / on click |
|---|---|---|
| **Photo board** | a framed cork/parchment board on the wall with pinned snapshots + washi tape | photo **album lightbox** (personal photos) |
| **Bookshelf** | wooden shelf, colored book spines (some are her papers) + a tiny thesis | **Publications** (link to site `#publications`) |
| **Desk + laptop** | wood desk, open laptop showing a graph plot, mug, papers, pen pot | **Apps / Projects** (link to `apps-deck.html`) |
| **Hiking nook** | a backpack on a wall hook, boots on the floor, a framed mountain photo, a hanging trail map | **Hiking** hobby panel (photos + a line) |
| **Record player** | a turntable + a vinyl + a small framed dance poster, dancing shoes | **Dancing** hobby panel |
| **Globe** | a desk globe on a stand | **Travel** (visited places; ties to the homepage Visit Map) |
| **Window** | warm rectangle of light + sill plant | ambiance (light source) |
| **Cozy props** | rug, floor lamp (glow), potted plants, tea cup, a sleeping cat | ambiance / a tiny easter-egg on the cat |
| **Nameplate** | a small desk plaque "Linlin's study" | intro / about |

## Interaction model

- **Orbit**: drag to rotate, wheel to zoom; damped; clamped so you stay above the floor
  and within a tasteful arc. Idle auto-orbit until first interaction.
- **Hover**: raycast → the object lifts slightly / emissive warm glow + cursor `pointer`
  + a CSS2D parchment label ("Photos", "Hiking", …).
- **Click**: tween camera to a per-object framing + open a **parchment info panel**
  (photo album, hobby blurb, or a link out). "↩" returns to the orbit.
- **Keyboard / SR**: a visually-hidden "Explore the room" list of buttons triggers the
  same focus+panel, so the content is fully reachable without WebGL pointer use.

## The 10 rounds (one lens each)

1. **Scaffold** — renderer + camera + OrbitControls + lights; room shell (floor, 2 walls);
   placeholder desk + shelf boxes. Goal: it renders, you can orbit, 0 console errors.
2. **Furniture layout** — desk, chair, bookshelf, sideboard, window, rug; proportions and
   a believable corner-room layout.
3. **Warm lighting & material** — parchment palette, window key-light + fill + ambient,
   soft shadows, tone-mapping, subtle vignette/fog. The "golden-hour cozy" lens.
4. **Hobby objects** — hiking (backpack/boots/map/mountain photo), dancing (turntable/
   vinyl/shoes), photo board, globe. Placement + scale.
5. **Skeuomorphic detail** — book spines, framed photos (real images via texture), plant
   leaves, lamp glow, rug pattern, mug, pen pot, cat. Density + craft.
6. **Hover interactivity** — raycast hover highlight + CSS2D labels + cursor + the
   visually-hidden explore menu.
7. **Click → panels / lightbox** — parchment info panels + photo album lightbox; content
   copy for each hotspot; links out (publications, apps).
8. **Camera choreography** — intro auto-orbit, click-to-focus tween, back-to-room; easing.
9. **Perf / a11y / mobile** — pixelratio cap, pause-when-hidden, reduced-motion, keyboard,
   loading state, mobile fallback (simplified or static + hotspots).
10. **Production lock** — final palette/lighting/copy tuning, the site nav + fonts, verify
    0 console errors at 1440×980, write the spec + DELIVERY.

## Validation gates (per round)

- Render PNG at 1440×980; 0 console errors/warnings.
- No `impeccable` absolute bans (gradient text, glassmorphism-as-default, emoji in UI copy,
  em-dashes in copy, generic SaaS clichés).
- Stays on-brand (parchment palette, hand-made warmth), not game-y/stocky.
- Each round renders the FULL scene (never a partial).
