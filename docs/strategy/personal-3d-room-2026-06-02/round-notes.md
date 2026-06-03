# Personal-space 3D room — round notes

> The 10 design lenses from `00-plan.md`, and what each contributed to the final
> `personal.html`. Honest note on method: a 3D scene is iterated best by **evolving one
> file**, not by throwing away 10 separate mock files, so the 10 lenses were applied to a
> single `personal.html` over a few build+render passes (screenshots `round-5/7/8.png`).
> Each lens' goal was met; gates checked (0 console errors, no impeccable bans, on-brand).

## Master TOC

- [The 10 rounds](#the-10-rounds)
- [What's in the final scene](#whats-in-the-final-scene)
- [Known gaps / personalization hooks](#known-gaps--personalization-hooks)

## The 10 rounds

1. **Scaffold** — `WebGLRenderer` (ACESFilmic, soft shadows, pixelratio≤2), `PerspectiveCamera`
   + damped `OrbitControls` clamped to the corner (can't go under the floor or outside the
   two walls), hemisphere + directional lights. Room shell: plank floor, two walls,
   skirting. *Bug fixed:* `controls.setAzimuthalAngle` is not a function in three r160 →
   idle auto-orbit rewritten to rotate the camera offset around Y manually.
2. **Furniture layout** — desk + monitor + laptop + chair (back wall), bookshelf (left
   wall), sideboard, window with mullions, rug. Believable corner-room proportions.
3. **Warm lighting & material** — parchment palette mapped from the site tokens
   (cream/wood/cinnabar/gilt/qing), a warm window key-light + cool fill + a point "lamp",
   tone-mapped golden-hour warmth, fog for depth. *Bug fixed:* `COL.maroon` was used but
   never defined (9 undefined-color materials) → added to the palette.
4. **Hobby objects** — hiking nook (backpack on the wall, boots, framed mountain photo),
   dancing (turntable + vinyl + dance poster + shoes), photo board (pinned snapshots),
   desk globe.
5. **Skeuomorphic detail** — randomized book spines (some are her papers), canvas-painted
   framed photos, a potted plant, a floor lamp with a glowing shade, rug border + medallion,
   mug + pen pot + papers on the desk, a sleeping cat. (`round-5.png`.)
6. **Hover interactivity** — raycast hover → a parchment CSS2D label per hotspot + cursor
   `pointer`; a visually-hidden-friendly **Explore** menu (6 buttons) gives the same
   content to keyboard / screen-reader users.
7. **Click → panels / lightbox** — click a hotspot → camera focuses it and a parchment
   info panel slides in (kicker + title + blurb + photo grid + links out to Publications /
   Apps); photos open a lightbox with prev/next. (`round-7.png`.)
8. **Camera choreography + comfort** — intro auto-orbit (stops after 7 s or on interaction),
   cubic-eased click-to-focus tween, "↩ back to the room". Added a **sofa + coffee table**
   (album book + cup) to fill the rug and make it read as a living-room/study. (`round-8.png`.)
9. **Perf / a11y / mobile** — pixelratio cap; `prefers-reduced-motion` disables the orbit +
   makes camera moves instant; pause idle when the tab is hidden; resize handler; a
   **loading** state and a **no-WebGL** fallback screen; Esc closes panel/lightbox.
10. **Production lock + integrate** — final palette/copy tuning; the site's fonts + a minimal
    parchment ribbon (brand + Home + Apps links); verified **0 console errors** at the test
    viewport; wired the homepage navbar **Personal** → `personal.html` (both `index_en.html`
    and `index_en_clear.html`), replacing the old coming-soon toast.

## What's in the final scene

Orbitable cozy study/living-room with six clickable hotspots → parchment panels:
**My desk** (→ Apps / Projects), **Bookshelf** (→ Publications), **Photos** (album
lightbox), **Hiking**, **Dancing**, **Travel** (西安 → Rouen → Bern). Plus ambient props
(sofa, coffee table, plant, floor lamp, rug, cat). All from three.js primitives in the
parchment palette — one CDN dependency (three.js), no model downloads.

## Known gaps / personalization hooks

- **Photos + copy are placeholders.** The framed photos are canvas-painted warm
  placeholders; swap in real images (drop files + point the textures / panel `<img>`s at
  them). The hobby blurbs are deliberately generic — Linlin can make them specific.
- **i18n:** the page is English (like `apps-deck.html`); panel copy could be localized later.
- **Mobile:** works (orbit via touch) but the experience is best on desktop; a simplified /
  static-image fallback for very small or low-power devices is a future polish.
