# Personal-space 3D room — research & resources

> For the site's `personal` section: an interactive three.js skeuomorphic home
> (cozy study / living room) surfacing Linlin's hobbies + photos. This doc gathers
> the reusable resources (libraries, examples, CC0 model kits) and the technique
> options, then a build decision. Dated 2026-06-02.

## Master TOC

- [Decision: primitives over downloaded models](#decision-primitives-over-downloaded-models)
- [Library + loaders](#library--loaders)
- [Open-source room-portfolio examples (read for technique)](#open-source-room-portfolio-examples-read-for-technique)
- [CC0 model kits (if we want real furniture later)](#cc0-model-kits-if-we-want-real-furniture-later)
- [Interaction + motion patterns](#interaction--motion-patterns)
- [Performance + a11y + mobile](#performance--a11y--mobile)
- [Sources](#sources)

## Decision: primitives over downloaded models

Build the room from **three.js procedural primitives** (boxes / cylinders / planes
+ procedural materials), **not** external GLB downloads. Why:

1. **Robustness & China-access.** The site is static on GitHub Pages and already hit a
   third-party-at-runtime problem (the giscus Valkey outage). Downloading GLB models from
   a CDN at view time adds the same class of risk (slow / blocked / 404). Primitives ship
   in our own one file; only `three.js` loads from a CDN (and can be self-hosted).
2. **Aesthetic match.** The site is a warm parchment / hand-crafted world (Patrick Hand,
   cinnabar, gilt, cream). Kenney / Quaternius kits have their own game-y low-poly look
   that would clash. Procedural geometry lets us hit our exact palette → skeuomorphic and
   on-brand.
3. **Size & perf.** No model fetches; a few hundred triangles; instant.
4. **Control.** Every object is ours to make a clickable hotspot mapped to real content.

CC0 kits (below) stay as a documented fallback if we later want richer furniture.

## Library + loaders

- **three.js** (`MIT`) — `https://cdn.jsdelivr.net/npm/three@<v>/build/three.module.js`
  via an `importmap`. Add-ons (`OrbitControls`, `CSS2DRenderer`, `RoomEnvironment`,
  `GLTFLoader` if needed) from `three@<v>/examples/jsm/…`.
- Render: `WebGLRenderer({ antialias:true })`, `outputColorSpace = SRGB`,
  `ACESFilmicToneMapping`, soft `PCFSoftShadowMap`.
- `OrbitControls` (drag-orbit + wheel-zoom, damped, clamped polar/azimuth so you can't go
  under the floor).
- `CSS2DRenderer` for HTML labels pinned to 3D objects (parchment tooltips).

## Open-source room-portfolio examples (read for technique)

- maxime-mrl/3D-room-portfolio — Blender room + click/hover interactions: <https://github.com/maxime-mrl/3D-room-portofolio>
- Zivgl66/Portfolio-Room3D — Blender room → three.js, interactive work display: <https://github.com/Zivgl66/Portfolio-Room3D>
- DanieloM83/THREE.js-Interactive-Isometric — small interactive isometric scene: <https://github.com/DanieloM83/THREE.js-Interactive-Isometric>
- adrianhajdin/threejs-portfolio + 3d-portfolio — tutorial-grade 3D sites: <https://github.com/adrianhajdin/threejs-portfolio>
- three.js forum "3D Room" showcase (camera transitions, focus): <https://discourse.threejs.org/t/my-personal-portfolio-website-3d-room/63822>
- GitHub topic `3d-portfolio`: <https://github.com/topics/3d-portfolio>

## CC0 model kits (if we want real furniture later)

- **Kenney Furniture Kit** — 140 CC0 low-poly furniture GLB assets: <https://kenney.nl/assets/furniture-kit>
- **Quaternius LowPoly House Interior** — 120+ CC0 interior models: <https://quaternius.com/>
- **Poly Pizza** — searchable CC0/CC-BY model aggregator (GLB), good for one-off props.
- **awesome-cc0** — curated CC0 asset index: <https://github.com/madjin/awesome-cc0>
- OpenGameArt LowPoly House Interior Pack: <https://opengameart.org/content/lowpoly-house-interior-pack>

## Interaction + motion patterns

- **Raycasting** from the pointer → hover-highlight (emissive lift / outline) + cursor
  `pointer` + a CSS2D label; click → focus + open a parchment info panel / photo lightbox.
- **Click-to-focus camera**: tween `camera.position` + `controls.target` to a per-hotspot
  framing (GSAP, already in the frontend resource bank; or a hand-rolled lerp to avoid a
  dep). A "↩ back" returns to the establishing orbit.
- **Idle**: a slow auto-orbit until the user interacts (like the deck's intro).
- **Hotspots → content**: photo board → photo album lightbox; bookshelf → publications;
  desk/laptop → graphkit-learn / apps; backpack+boots+map → hiking; vinyl/record player →
  dancing; globe → travel/map; tea + plant → ambiance.

## Performance + a11y + mobile

- Cap `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`; pause the RAF loop when the
  tab/section is hidden (`IntersectionObserver` / `visibilitychange`).
- `prefers-reduced-motion` → no auto-orbit, instant camera moves.
- a11y: every hotspot also reachable as a list of buttons (a visually-hidden "Explore"
  menu) so keyboard/SR users get the same content; `aria-label`s.
- Mobile / no-WebGL: a graceful fallback (a static rendered image of the room with
  clickable hotspot regions, or a simplified scene) + a "best on desktop" note.
- A short **loading** state while three.js initialises.

## Sources

- three.js: <https://threejs.org/> · docs <https://threejs.org/docs/> · examples <https://threejs.org/examples/>
- Room portfolio examples + CC0 kits: see links above (GitHub, kenney.nl, quaternius.com).
